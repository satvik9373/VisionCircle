# 🚀 Vercel Deployment Checklist

## Before You Deploy

### ✅ Step 1: Verify Local Environment
```bash
# Test the Google Sheets connection locally
node test-google-sheets.js
```

### ✅ Step 2: Check Git Status
```bash
git status
git add .
git commit -m "fix: enhance API error handling and CORS support"
```

### ✅ Step 3: Push to GitHub
```bash
git push origin main
```

## Vercel Dashboard Configuration

### ✅ Step 4: Set Environment Variables
Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these three variables (make sure to check **Production**, **Preview**, and **Development**):

1. **GOOGLE_SHEETS_ID**
   ```
   10NP2XlOY0AH0j0yEoaRM4bkL_xyrT-eC7AR47fpgDkQ
   ```

2. **GOOGLE_SHEETS_CLIENT_EMAIL**
   ```
   visioncircle-waitlist-446@visioncircle.iam.gserviceaccount.com
   ```

3. **GOOGLE_SHEETS_PRIVATE_KEY**
   
   ⚠️ **CRITICAL**: Paste the ENTIRE private key in ONE LINE with `\n` for newlines:
   ```
   -----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDxAooksUdPqApr\n...entire key...\n-----END PRIVATE KEY-----
   ```
   
   **DO NOT** wrap it in quotes unless Vercel requires it.

### ✅ Step 5: Verify Google Sheet Permissions
1. Open: https://docs.google.com/spreadsheets/d/10NP2XlOY0AH0j0yEoaRM4bkL_xyrT-eC7AR47fpgDkQ
2. Click **Share** button
3. Make sure `visioncircle-waitlist-446@visioncircle.iam.gserviceaccount.com` has **Editor** access

### ✅ Step 6: Redeploy
After setting environment variables, you **MUST** redeploy:
- Option A: Push a new commit to trigger auto-deploy
- Option B: Go to Vercel Dashboard → Deployments → Click "..." → Redeploy

## Testing After Deployment

### ✅ Step 7: Test API Endpoint
Visit: `https://your-domain.vercel.app/api/waitlist`

You should see:
```json
{
  "success": true,
  "message": "Google Sheets connection successful!",
  "spreadsheetTitle": "...",
  "sheets": ["Sheet1"]
}
```

### ✅ Step 8: Test Form Submission
1. Go to your live site
2. Click "Join Waitlist"
3. Fill out the form
4. Submit
5. Check Google Sheet for new entry

### ✅ Step 9: Check Vercel Function Logs
If something fails:
1. Go to: **Vercel Dashboard → Your Project → Deployments**
2. Click on latest deployment
3. Click **Functions** tab
4. Click on `api/waitlist`
5. Review logs for errors

## Common Issues & Solutions

### ❌ "Missing environment variables"
**Solution**: Make sure all 3 env vars are set in Vercel and selected for all environments (Production, Preview, Development)

### ❌ "Invalid private key format"
**Solution**: 
1. Copy the private key from `.env.local`
2. Make sure it's in one line with `\n` characters
3. Don't add extra quotes
4. Paste directly in Vercel dashboard

### ❌ "Permission denied" (403 error)
**Solution**: Share the Google Sheet with the service account email with Editor permissions

### ❌ "Sheet not found" (404 error)
**Solution**: Verify the `GOOGLE_SHEETS_ID` is correct

### ❌ Works locally but not on Vercel
**Solution**: Environment variables are probably not set correctly in Vercel. Delete and re-add them.

## Verification Commands

```bash
# Check if site is accessible
curl https://your-domain.vercel.app/api/waitlist

# Check form submission (replace with your domain)
curl -X POST https://your-domain.vercel.app/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "age": "25",
    "phoneNumber": "+1234567890",
    "instagramHandle": "@test",
    "currentlyBuilding": "Test project",
    "thirtyDayGoal": "Test goal",
    "shareWins": "yes"
  }'
```

## Need Help?

Check the following in order:
1. Vercel Function Logs (most detailed)
2. Browser Console (F12)
3. Network Tab in DevTools
4. This checklist

## Final Notes

- Environment variables changes require a redeploy
- Make sure to test in Production environment
- Keep your `.env.local` file secure and never commit it to Git
- The test script `test-google-sheets.js` only works locally, not in Vercel

---

**Last Updated**: December 8, 2025
