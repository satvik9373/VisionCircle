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
      name,
      age,
      phoneNumber,
      instagramHandle,
      currentlyBuilding,
      thirtyDayGoal,
      shareWins
    } = body;

    // Validate required fields
    const requiredFields = {
      name,
      age,
      phoneNumber,
      currentlyBuilding,
      thirtyDayGoal,
      shareWins
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value || value.trim() === '') {
        return NextResponse.json({
          success: false,
          error: `Missing required field: ${field}`
        }, { status: 400 });
      }
    }

    // Set up Google Sheets authentication
    let auth;
    try {
      auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      console.log('Google Auth initialized successfully');
    } catch (authError) {
      console.error('Google Auth initialization failed:', authError);
      return NextResponse.json({
        success: false,
        error: 'Authentication setup failed. Please try again later.'
      }, { status: 500 });
    }

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    // Prepare the row data
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      name.trim(),
      age.trim(),
      phoneNumber.trim(),
      instagramHandle.trim(),
      currentlyBuilding.trim(),
      thirtyDayGoal.trim(),
      shareWins.trim()
    ];

    // Check if headers exist, if not create them
    try {
      const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A1:H1',
      });

      // If no headers exist, add them
      if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
        const headers = [
          'Timestamp',
          'Name',
          'Age',
          'Phone Number',
          'Instagram Handle',
          'Currently Building',
          '30 Day Goal',
          'Share Wins'
        ];

        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'Sheet1!A1:H1',
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
    try {
      console.log('Attempting to append data to Google Sheets...');
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:H',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [rowData],
        },
      });

      console.log('Successfully added row to Google Sheets:', response.data.updates);
      
      return NextResponse.json({
        success: true,
        message: 'Successfully joined the waitlist!',
        data: {
          updatedRows: response.data.updates?.updatedRows,
        },
      });
    } catch (appendError) {
      console.error('Error appending to Google Sheets:', appendError);
      return NextResponse.json({
        success: false,
        error: 'Failed to save data. Please check Google Sheets permissions.'
      }, { status: 500 });
    }
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