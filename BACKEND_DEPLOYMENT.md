# Backend Deployment on Vercel - Step by Step

## ✅ Backend Configuration is Ready

Your backend `vercel.json` and `package.json` are properly configured for Vercel deployment.

---

## 🚀 Backend Deployment Steps

### Step 1: Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### Step 2: Create New Project
1. Click **"New Project"**
2. Click **"Import Git Repository"**
3. Search for `Testy123ll/OmniDoc`
4. Select it

### Step 3: Configure Backend Project

In the import dialog:

| Setting | Value |
|---------|-------|
| **Project Name** | `omnidoc-backend` |
| **Root Directory** | `backend` |
| **Framework** | Other (auto-detected) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Step 4: Deploy
Click **"Deploy"**

Wait 2-3 minutes for the build to complete.

✅ **Your backend is now live!**
Example URL: `https://omnidoc-backend.vercel.app`

---

## 🔑 Add Environment Variables

After deployment, add your environment variables:

### Step 1: Go to Project Settings
1. In your backend project dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** (left sidebar)

### Step 2: Add Variables

Add each variable one by one:

```
NODE_ENV = production
PORT = 3000
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key_min_32_chars
JWT_EXPIRE = 7d
BCRYPT_ROUNDS = 10
GOOGLE_AI_API_KEY = your_google_ai_key
CLOUDINARY_NAME = your_cloudinary_name
CLOUDINARY_KEY = your_cloudinary_api_key
CLOUDINARY_SECRET = your_cloudinary_secret
SUPABASE_URL = your_supabase_url
SUPABASE_KEY = your_supabase_key
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your_email@gmail.com
SMTP_PASSWORD = your_app_password
CORS_ORIGIN = https://omnidoc-frontend.vercel.app
```

### Step 3: Redeploy
1. Go to **"Deployments"** tab
2. Click on the latest deployment
3. Click **"Redeploy"** button

Wait for the redeploy to complete (~1-2 minutes)

✅ **Backend is now configured with environment variables!**

---

## ✅ Verify Backend is Working

### Test Health Check
Open in your browser:
```
https://omnidoc-backend.vercel.app/api/health
```

You should see a response like:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### Check Logs
If something doesn't work:
1. Go to **"Deployments"** tab
2. Click latest deployment
3. Click **"Logs"** to see build/runtime logs
4. Look for error messages

---

## 🔗 Connect Frontend to Backend

### Update Frontend Variables

1. Go to your **frontend project** on Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Add/Update:
   ```
   NEXT_PUBLIC_API_URL=https://omnidoc-backend.vercel.app/api
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```
4. Click **"Save"**

### Redeploy Frontend

1. Go to frontend **"Deployments"** tab
2. Click latest deployment
3. Click **"Redeploy"**

✅ **Frontend and backend are now connected!**

---

## 🧪 Test the Integration

### Test Login
1. Go to frontend: `https://omnidoc-frontend.vercel.app/signin`
2. Try to sign in
3. Check if it works without errors

### Test API Call
Open browser console (F12) and check for:
- ✅ No CORS errors
- ✅ Requests to backend are successful
- ✅ Response data is received

### Test File Upload
1. Go to dashboard
2. Try to upload a file
3. Verify it uploads successfully to backend

---

## 🆘 Common Issues

### "502 Bad Gateway"
- Check environment variables are set in Vercel
- Verify database connection string is correct
- Check backend logs for errors

**Fix:**
1. Go to backend project
2. Re-add all environment variables
3. Click "Redeploy"

### "CORS error in console"
- Frontend `NEXT_PUBLIC_API_URL` might be wrong
- Backend CORS settings might be missing

**Fix:**
1. Verify `NEXT_PUBLIC_API_URL` in frontend env vars
2. Make sure it matches your backend Vercel URL
3. Check backend CORS middleware

### "Cannot find module"
- Missing dependency in package.json
- Build failed

**Fix:**
1. Check build logs
2. Add missing dependency: `npm install <package>`
3. Commit and push
4. Vercel auto-redeploys

---

## 📊 Monitor Your Backend

### View Logs
1. Go to backend project → **"Deployments"**
2. Select a deployment
3. Click **"Logs"**

### Check Performance
1. Go to **"Analytics"** tab
2. View request count and response times
3. Monitor bandwidth usage

---

## 🔄 What Happens on Git Push

After initial setup:
1. You push to `main` branch on GitHub
2. Vercel detects the change
3. Vercel builds and tests your code
4. Vercel deploys the new version
5. Your new backend is live!

**No manual deployment needed!**

---

## 🎉 You're Done!

Your OmniDoc backend is now:
- ✅ Live on Vercel
- ✅ Auto-deploying on git push
- ✅ Configured with environment variables
- ✅ Connected to frontend
- ✅ Ready for production

---

## 📚 Next Steps

1. **Test thoroughly**
   - Test all API endpoints
   - Test authentication flow
   - Test file uploads
   - Test AI features

2. **Monitor performance**
   - Watch the Analytics tab
   - Monitor response times
   - Check error logs

3. **Optional enhancements**
   - Add custom domain
   - Set up monitoring alerts
   - Configure webhooks
   - Optimize cold starts

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Backend Guide**: `VERCEL_DEPLOYMENT.md`
- **Common Issues**: Check console logs
- **Support**: https://vercel.com/support

**Your backend is now production-ready!** 🚀
