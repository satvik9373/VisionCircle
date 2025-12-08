# 🔧 Troubleshooting Guide

## The Issue
Your waitlist form works on **localhost** but fails on **Vercel (live site)**.

## Root Causes (Most Likely)

### 1. Environment Variables Not Set in Vercel ⚠️ MOST COMMON
**Symptom**: Form submits but shows "Server configuration error"

**Fix**:
```bash
# In Vercel Dashboard → Settings → Environment Variables
# Add all 3 variables and CHECK all environments:
# ✅ Production
# ✅ Preview  
# ✅ Development

# After adding, MUST redeploy!
```

### 2. Private Key Formatting Issues
**Symptom**: "Invalid private key" or "Authentication failed"

**The Problem**: The private key contains newline characters that need special handling in Vercel.

**Fix Options**:

**Option A: Single Line (Recommended)**
```
-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG...\n-----END PRIVATE KEY-----
```

**Option B: Use Vercel CLI**
```bash
vercel env add GOOGLE_SHEETS_PRIVATE_KEY production
# Then paste the multi-line key when prompted
```

**Option C: Check for Extra Quotes**
Sometimes Vercel wraps keys in quotes. If you see:
```
"-----BEGIN PRIVATE KEY-----\n..."
```
Remove the outer quotes.

### 3. Google Sheet Access Denied
**Symptom**: "Permission denied" or 403 errors

**Fix**:
1. Open your Google Sheet
2. Click **Share**
3. Add: `visioncircle-waitlist-446@visioncircle.iam.gserviceaccount.com`
4. Set permission to: **Editor**
5. Click **Done**

### 4. Incorrect Spreadsheet ID
**Symptom**: "Sheet not found" or 404 errors

**Fix**:
The correct ID is: `10NP2XlOY0AH0j0yEoaRM4bkL_xyrT-eC7AR47fpgDkQ`

From URL: `https://docs.google.com/spreadsheets/d/[THIS_PART]/edit`

## Step-by-Step Debugging

### Step 1: Verify Local Works
```bash
npm run test:sheets
```
If this fails, your .env.local is wrong. If it succeeds, the issue is in Vercel.

### Step 2: Check Vercel Environment Variables
```bash
# List all env vars
vercel env ls

# Should show:
# GOOGLE_SHEETS_ID
# GOOGLE_SHEETS_CLIENT_EMAIL
# GOOGLE_SHEETS_PRIVATE_KEY
```

### Step 3: Test Production API
```bash
# Visit in browser:
https://your-domain.vercel.app/api/waitlist

# Should return JSON with success: true
# If you see error, read the error message
```

### Step 4: Check Vercel Logs
1. Vercel Dashboard → Your Project
2. Deployments → Latest Deployment
3. Functions → `api/waitlist`
4. Read the logs - they will show the exact error

### Step 5: Test Form Submission
Open browser console (F12) and check:
1. Network tab - see the API request
2. Console tab - see any JavaScript errors
3. Response tab - see the exact error from API

## Quick Fixes

### If you see: "Missing environment variables"
```bash
# Redeploy after setting env vars
git commit --allow-empty -m "redeploy"
git push
```

### If you see: "Invalid format"
The private key needs to be exactly as in `.env.local`:
```bash
# Copy from your working local file
cat .env.local | grep GOOGLE_SHEETS_PRIVATE_KEY
# Paste EXACTLY that into Vercel
```

### If you see: "Permission denied"
```bash
# Check the service account has access
# Go to Google Sheet → Share → Verify the email is listed
```

### Force Refresh Vercel
```bash
# Sometimes Vercel caches old env vars
# In dashboard, go to: Settings → Environment Variables
# Delete all 3 variables
# Add them again
# Redeploy
```

## Testing Checklist

- [ ] Local test works: `npm run test:sheets`
- [ ] All 3 env vars are in Vercel Dashboard
- [ ] All env vars are checked for Production environment
- [ ] Private key is in correct format (single line with `\n`)
- [ ] Service account has Editor access to sheet
- [ ] Redeployed after setting env vars
- [ ] API endpoint returns success: `/api/waitlist`
- [ ] Can see detailed logs in Vercel Functions
- [ ] Browser console shows no CORS errors
- [ ] Form submission works on live site

## Still Not Working?

### Get Detailed Debug Info

1. **Enable Debug Mode**
   - The API already returns detailed error messages
   - Check browser console for full error object
   - Check Vercel function logs for server-side errors

2. **Compare Environments**
   ```bash
   # Local (working)
   curl -X POST http://localhost:3000/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","age":"25","phoneNumber":"123","instagramHandle":"@test","currentlyBuilding":"test","thirtyDayGoal":"test","shareWins":"yes"}'
   
   # Production (not working)
   curl -X POST https://your-domain.vercel.app/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","age":"25","phoneNumber":"123","instagramHandle":"@test","currentlyBuilding":"test","thirtyDayGoal":"test","shareWins":"yes"}'
   
   # Compare the responses
   ```

3. **Check Response Headers**
   ```bash
   curl -I https://your-domain.vercel.app/api/waitlist
   ```

## Emergency Fix: Use Vercel CLI

If nothing works, set env vars via CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables
vercel env add GOOGLE_SHEETS_ID production
vercel env add GOOGLE_SHEETS_CLIENT_EMAIL production
vercel env add GOOGLE_SHEETS_PRIVATE_KEY production

# Deploy
vercel --prod
```

## Contact Info for Support

When asking for help, provide:
1. Vercel function logs (screenshot)
2. Browser console errors (screenshot)
3. Network tab response (screenshot)
4. Confirmation that env vars are set in Vercel

---

**Last Updated**: December 8, 2025
