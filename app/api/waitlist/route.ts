import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simple environment check without Google API call
    const envCheck = {
      GOOGLE_SHEETS_ID: !!process.env.GOOGLE_SHEETS_ID,
      GOOGLE_SHEETS_CLIENT_EMAIL: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      GOOGLE_SHEETS_PRIVATE_KEY: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    };

    // Only test Google connection if all env vars are present
    if (!envCheck.GOOGLE_SHEETS_ID || !envCheck.GOOGLE_SHEETS_CLIENT_EMAIL || !envCheck.GOOGLE_SHEETS_PRIVATE_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        env_check: envCheck,
        message: 'Please check Vercel environment variables'
      }, { status: 500 });
    }

    // Test Google Sheets connection
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    // Try to get spreadsheet metadata
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    return NextResponse.json({
      success: true,
      message: 'Google Sheets connection successful!',
      spreadsheetTitle: spreadsheet.data.properties.title,
      sheets: spreadsheet.data.sheets.map((sheet: any) => sheet.properties.title),
      env_check: envCheck
    });
  } catch (error: any) {
    console.error('Google Sheets test failed:', error);
    return NextResponse.json({
      success: false,
      error: 'Google Sheets connection failed',
      details: error?.message || 'Unknown error',
      env_check: {
        GOOGLE_SHEETS_ID: !!process.env.GOOGLE_SHEETS_ID,
        GOOGLE_SHEETS_CLIENT_EMAIL: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        GOOGLE_SHEETS_PRIVATE_KEY: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      }
    }, { status: 500 });
  }
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
    } catch (authError: any) {
      console.error('Google Auth initialization failed:', authError);
      return NextResponse.json({
        success: false,
        error: 'Authentication setup failed. Please try again later.'
      }, { status: 500 });
    }

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    // Get spreadsheet info to find the correct sheet name
    const spreadsheetInfo = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    const sheetName = spreadsheetInfo.data.sheets[0].properties.title;
    console.log('Using sheet name:', sheetName);

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
        range: `${sheetName}!A1:H1`,
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
          range: `${sheetName}!A1:H1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers],
          },
        });
      }
    } catch (headerError: any) {
      console.error('Error checking/creating headers:', headerError);
      // Continue even if header check fails
    }

    // Append the new row
    try {
      console.log('Attempting to append data to Google Sheets...');
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A:H`,
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
    } catch (appendError: any) {
      console.error('Error appending to Google Sheets:', appendError);
      return NextResponse.json({
        success: false,
        error: 'Failed to save data. Please check Google Sheets permissions.'
      }, { status: 500 });
    }

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