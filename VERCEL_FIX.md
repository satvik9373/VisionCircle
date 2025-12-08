# Vercel Deployment Fix Guide

## Critical Steps to Fix the Waitlist Form on Vercel

### 1. **Environment Variables in Vercel Dashboard**

Go to your Vercel project settings → Environment Variables and ensure:

#### GOOGLE_SHEETS_ID
```
10NP2XlOY0AH0j0yEoaRM4bkL_xyrT-eC7AR47fpgDkQ
```

#### GOOGLE_SHEETS_CLIENT_EMAIL
```
visioncircle-waitlist-446@visioncircle.iam.gserviceaccount.com
```

#### GOOGLE_SHEETS_PRIVATE_KEY (CRITICAL - Multiple Format Options)

**Option 1: Single Line with \\n (Recommended for Vercel)**
```
-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDxAooksUdPqApr\nKFj4GgaAP93w6VVdhI+tsNH91St1Z9l8aZUeg3Ndhkpc0wy/jO7ufo081JSCmwPk\nODFRAjQUFaH937TcdKUSjK9uqo1Yq/aYo6+bEjZCuADyh+gTBJa/MgTJIEE+Ct6q\nLkXp7QiJC1M9HPGu+6cw+FGw8Dwzq6m6it8Y4MdAQCgpUrKC9Dz5xhI1uCj9Cy7s\nHhVpfCDFPKHPizczy9J85dhHr6b4iUiKBGquOA9qDLzqBSlAIyFe+nXtnsI/AUa7\nxRBNFo+7Kut4DAYZvCRswINRAb3pvSr3vKqQQ9ssJsNVOZ5eYpV10EBx6bClkwAB\nAa+jvS/hAgMBAAECggEADpLjvaJGuKdlseMntiEEwZ6bEiVZ9yS793nYyOuqDBhy\ni1ZrIQQ75qznNEPC4pZoIF3gtov4SwmKq7NGMCrc8VX5jLuJWUdob/234g5IK9OC\nPuqvBMaOJ2yvCftz6ip93yPsLClaKKFJo6rWqXWe7YKUzv5AEx++lXR+pB9y1IDv\n4O+WjdNUWiTgc/XNH6vgcAllo1Zq11BaNRG9yRKisSymXixoFoGQNGnAVRh/nbDE\nyVqudVnvIOlu8jukHoKI+gzIBHteoPEIHV1GpmU6Kxh58opIqJOHcsP2qdjiBEpr\nohfFDm6ZWh1zJ2Xsdo8RRBkvNO25/3al0+tNWNmTEQKBgQD6AD3ZoHkXf1MGabhk\n70xMf24o7VZuZEuIazVHlhVTIJiOfY6HmsYFDiltQTnSyKvuFPmET9UEOM5VmYR3\nRJ+Ow3++hfrYR38cRSO21+6ut7KQIg+Z9GuKTPYxejnmXvou7FhcfwuE2uM62sxB\nb6KglxtMyXNl46flcaN8+rFblQKBgQD2yxDp/Vqw4sK3oBAPFJe35WRmS81FsUh/\nt8GJwIMML5FvtMVwKyowhtVvCkhOZK47HpSy0VhaqEK9o2hyy90CQjig+PWv8CqR\naAGIw6ZTEmpFkME8/6Rys156jDMlsZ8CNnPMeLpBurMj6OJLIxqpqu9kkTYWOjjL\ntuSsORqQHQKBgQDr9ohqPYWtwPZ7ShPJ6PdqCKjQJlt67F1CkHYEcEsGX/C+JRH/\nOf2HTfuZ7IOISPHGULPFx5f2WSufLbwS2omDNVEAYfMGak02QKfZ72uQK0B1vEBf\nfox2R/fjcUru/lxDJ76q5xrXNcZdiaBabuTfkGArFMU/uSWCccTutKvsFQKBgQCH\nigUTDVL2nMNmB+Fp9txQYgqe5/in0vLHOgtv9SvD0IgmeniI3xv/pL2pi1MkwsSx\nsVznTHQi7hAhiJI/odkSeX4SYkjExLkMPLvC+fjp3M5CwHpwXtJZMEuuMDuS8xcq\nJu+4F4HrwXbLPQazT2dAUaHCcMHsuTMiJqM2NvJwvQKBgGtLKCFr7UTq3fg8Hijp\ngeCG3rRkAj8PxNko5NRTqSjBnWCi7rA3YWTX8X5h5YPx6QbTOnUS4nwA4mF9/4c5\neewfEPw03cDiormy6jh6LYHHcEoewIjWAgI17b1ZSWSNeE0SrCzNyoNnGWIDCxBN\nCFiHrojAReJd5bV9vV5aVXi/\n-----END PRIVATE KEY-----
```

**Option 2: Without Quotes**
If Vercel is wrapping your key with extra quotes, paste it WITHOUT the outer quotes.

**Option 3: Use Vercel CLI to set**
```bash
vercel env add GOOGLE_SHEETS_PRIVATE_KEY
```
Then paste the entire key INCLUDING newlines when prompted.

### 2. **Important: Set for ALL Environments**
Make sure each environment variable is checked for:
- ✅ Production
- ✅ Preview
- ✅ Development

### 3. **Redeploy After Setting Variables**
After updating environment variables, you MUST redeploy:
```bash
git add .
git commit -m "fix: update API route with better error handling"
git push
```

Or trigger a redeploy from Vercel Dashboard.

### 4. **Verify Google Sheets Permissions**
Make sure the service account email has Editor access to your Google Sheet:
1. Open your Google Sheet
2. Click "Share"
3. Add: `visioncircle-waitlist-446@visioncircle.iam.gserviceaccount.com`
4. Give it "Editor" permissions

### 5. **Test the API Endpoint**
After deployment, test the endpoint:
```
https://your-domain.vercel.app/api/waitlist
```

You should see a success message with spreadsheet details.

### 6. **Check Vercel Logs**
If it still doesn't work:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Click "Functions" tab
4. Find `/api/waitlist` and check the logs

## Common Issues and Solutions

### Issue 1: "Missing environment variables"
**Solution**: Make sure all three env vars are set in Vercel and marked for Production environment.

### Issue 2: "Invalid private key"
**Solution**: The private key needs proper newline handling. Use the single-line format with `\n` characters.

### Issue 3: "Permission denied"
**Solution**: The service account email must have Editor access to the Google Sheet.

### Issue 4: Works on localhost but not production
**Solution**: This is usually due to environment variables not being set correctly in Vercel. Double-check all three variables.

## Updated Code Features
The API route now includes:
- ✅ Better CORS headers
- ✅ Multiple private key format handling
- ✅ Detailed error logging
- ✅ Better error messages with debug info
- ✅ Proper string conversion for all fields
- ✅ Enhanced validation
- ✅ OPTIONS handler for CORS preflight

## Need More Help?
Check the Vercel function logs for detailed error messages that will help identify the exact issue.
