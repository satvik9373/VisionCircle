import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'Waitlist API is working!',
    env_check: {
      GOOGLE_SHEETS_ID: !!process.env.GOOGLE_SHEETS_ID,
      GOOGLE_SHEETS_CLIENT_EMAIL: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      GOOGLE_SHEETS_PRIVATE_KEY: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    }
  });
}

export async function POST(request: NextRequest) {
  console.log('API route called!');
  try {
    // Validate required environment variables
    const requiredEnvVars = [
      'GOOGLE_SHEETS_ID',
      'GOOGLE_SHEETS_CLIENT_EMAIL',
      'GOOGLE_SHEETS_PRIVATE_KEY'
    ];
    
    console.log('Environment variables check:', {
      GOOGLE_SHEETS_ID: !!process.env.GOOGLE_SHEETS_ID,
      GOOGLE_SHEETS_CLIENT_EMAIL: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      GOOGLE_SHEETS_PRIVATE_KEY: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    });

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(`Missing environment variable: ${envVar}`);
        return NextResponse.json({
          success: false,
          error: 'Server configuration error. Please try again later.'
        }, { status: 500 });
      }
    }

    // Extract and validate form data
    const body = await request.json();
    const {
      phoneNumber,
      workEmail,
      whyJoin,
      currentRole,
      linkedinProfile,
      instagramHandle,
      hopingToGain,
      skillsContribution
    } = body;

    // Validate required fields
    const requiredFields = {
      phoneNumber,
      workEmail,
      whyJoin,
      currentRole,
      linkedinProfile,
      hopingToGain,
      skillsContribution
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value || value.trim() === '') {
        return NextResponse.json({
          success: false,
          error: `Missing required field: ${field}`
        }, { status: 400 });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Set up Google Sheets authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    // Prepare the row data
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      phoneNumber.trim(),
      workEmail.trim(),
      whyJoin.trim(),
      currentRole.trim(),
      linkedinProfile.trim(),
      instagramHandle?.trim() || '', // Optional field
      hopingToGain.trim(),
      skillsContribution.trim()
    ];

    // Check if headers exist, if not create them
    try {
      const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A1:I1',
      });

      // If no headers exist, add them
      if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
        const headers = [
          'Timestamp',
          'Phone Number',
          'Work Email',
          'Why Join Vision Circle',
          'Current Role/Venture',
          'LinkedIn Profile',
          'Instagram Handle',
          'Hoping To Gain',
          'Skills/Contribution'
        ];

        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'Sheet1!A1:I1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers],
          },
        });
      }
    } catch (headerError) {
      console.error('Error checking/creating headers:', headerError);
      // Continue even if header check fails
    }

    // Append the new row
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:I',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    // Success response
    console.log('Successfully added row to Google Sheets:', response.data.updates);
    
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      data: {
        updatedRows: response.data.updates?.updatedRows,
        updatedRange: response.data.updates?.updatedRange
      }
    });

  } catch (error: any) {
    console.error('Google Sheets API Error:', error);

    // Handle specific Google API errors
    if (error.code === 403) {
      return NextResponse.json({
        success: false,
        error: 'Permission denied. Please check Google Sheets sharing settings.'
      }, { status: 500 });
    }

    if (error.code === 404) {
      return NextResponse.json({
        success: false,
        error: 'Google Sheet not found. Please verify the sheet ID.'
      }, { status: 500 });
    }

    // Generic error response
    return NextResponse.json({
      success: false,
      error: 'Failed to join waitlist. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}