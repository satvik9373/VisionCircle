#!/usr/bin/env node

/**
 * Google Sheets API Test Script
 * Run this to verify your Google Sheets credentials work correctly
 * 
 * Usage: node test-google-sheets.js
 */

const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function testGoogleSheetsConnection() {
  console.log('\n🔍 Testing Google Sheets Connection...\n');
  
  // Check environment variables
  console.log('1️⃣ Checking Environment Variables:');
  const envVars = {
    'GOOGLE_SHEETS_ID': process.env.GOOGLE_SHEETS_ID,
    'GOOGLE_SHEETS_CLIENT_EMAIL': process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    'GOOGLE_SHEETS_PRIVATE_KEY': process.env.GOOGLE_SHEETS_PRIVATE_KEY ? '✓ Present' : '✗ Missing'
  };
  
  console.table(envVars);
  
  if (!process.env.GOOGLE_SHEETS_ID || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    console.error('\n❌ Missing environment variables! Check your .env.local file.');
    process.exit(1);
  }
  
  try {
    // Process the private key
    console.log('\n2️⃣ Processing Private Key...');
    let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    
    // Remove quotes if present
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
      console.log('   Removed surrounding quotes');
    }
    
    // Replace literal \n with actual newlines
    privateKey = privateKey.replace(/\\n/g, '\n');
    console.log('   Replaced \\n with newlines');
    
    console.log('   Key length:', privateKey.length);
    console.log('   Starts with BEGIN:', privateKey.startsWith('-----BEGIN'));
    console.log('   Ends with END:', privateKey.trim().endsWith('-----'));
    
    // Set up authentication
    console.log('\n3️⃣ Initializing Google Auth...');
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log('   ✓ Auth initialized');
    
    // Create sheets instance
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    
    // Test connection by getting spreadsheet info
    console.log('\n4️⃣ Testing Connection to Google Sheets...');
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    
    console.log('   ✓ Connection successful!');
    console.log('\n📊 Spreadsheet Info:');
    console.log('   Title:', spreadsheet.data.properties.title);
    console.log('   Sheets:', spreadsheet.data.sheets.map(s => s.properties.title).join(', '));
    
    // Test reading data
    console.log('\n5️⃣ Testing Read Access...');
    const sheetName = spreadsheet.data.sheets[0].properties.title;
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:H1`,
    });
    
    console.log('   ✓ Read access successful');
    if (readResponse.data.values && readResponse.data.values.length > 0) {
      console.log('   Headers:', readResponse.data.values[0]);
    }
    
    // Test write access
    console.log('\n6️⃣ Testing Write Access...');
    const testRow = [
      new Date().toISOString(),
      'Test Name',
      '25',
      '+1234567890',
      '@testuser',
      'Test project',
      'Test goal',
      'yes'
    ];
    
    const writeResponse = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:H`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [testRow],
      },
    });
    
    console.log('   ✓ Write access successful');
    console.log('   Updated rows:', writeResponse.data.updates.updatedRows);
    
    console.log('\n✅ All tests passed! Your Google Sheets integration is working correctly.\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.code) {
      console.error('   Error Code:', error.code);
    }
    if (error.errors) {
      console.error('   Details:', error.errors);
    }
    console.error('\n💡 Common solutions:');
    console.error('   - Make sure the service account has Editor access to the sheet');
    console.error('   - Verify the GOOGLE_SHEETS_ID is correct');
    console.error('   - Check that the private key is properly formatted');
    process.exit(1);
  }
}

testGoogleSheetsConnection();
