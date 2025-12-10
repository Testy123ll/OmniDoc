# OmniDoc Production Deployment Checklist

## Pre-Deployment (Complete Before Starting)

### Code & Repository
- [ ] All code committed and pushed to GitHub
- [ ] No sensitive data in committed files
- [ ] `.env` files are in `.gitignore`
- [ ] All features tested locally
- [ ] Frontend builds without errors: `npm run build`
- [ ] Backend builds without errors: `npm run build`

### Credentials & Secrets
- [ ] MongoDB Atlas credentials verified
- [ ] Gemini API key verified
- [ ] Gmail credentials verified
- [ ] Google OAuth Client ID ready
- [ ] Generated production JWT_SECRET (see ENVIRONMENT_VARIABLES.md)
- [ ] All credentials stored securely (not in code)

### Testing
- [ ] ✅ Registration endpoint working locally
- [ ] ✅ Login endpoint working locally
- [ ] ✅ Email sending working locally
- [ ] ✅ Protected routes working locally
- [ ] ✅ AI features working locally
- [ ] MongoDB connection stable
- [ ] Frontend can connect to backend

---

## Deployment Steps

### Step 1: MongoDB Configuration (5 minutes)
- [ ] Log into MongoDB Atlas
- [ ] Go to Network Access
- [ ] Confirm IP whitelist includes: `0.0.0.0/0` (for initial setup)
- [ ] Test connection from local machine
- [ ] Document MongoDB connection string

**MongoDB Connection Test:**
```bash
curl https://omnidoc-api.onrender.com/api/health
```

---

### Step 2: Backend Deployment to Render (10 minutes)

#### Create Render Account
- [ ] Go to https://render.com
- [ ] Sign up with GitHub account
- [ ] Authorize GitHub access

#### Deploy Backend Service
- [ ] Click "New +" → "Web Service"
- [ ] Select your GitHub repository
- [ ] Configure:
  - **Name:** `omnidoc-api`
  - **Environment:** `Node`
  - **Build Command:** `npm install && npm run build`
  - **Start Command:** `node dist/server.js`
  - **Plan:** Free (Paid optional)
  
#### Add Environment Variables
- [ ] `PORT` = `5000`
- [ ] `NODE_ENV` = `production`
- [ ] `MONGODB_URI` = Your MongoDB connection string
- [ ] `JWT_SECRET` = Generated secure string
- [ ] `FRONTEND_URL` = `https://omnidoc.vercel.app` (update after Vercel setup)
- [ ] `GEMINI_API_KEY` = Your Gemini key
- [ ] `EMAIL_USER` = testimonyojo86@gmail.com
- [ ] `EMAIL_PASSWORD` = Gmail app password

#### Deploy
- [ ] Review all settings
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete (3-5 minutes)
- [ ] Note the deployed URL (e.g., `https://omnidoc-api.onrender.com`)

**Test Backend:**
```bash
curl https://omnidoc-api.onrender.com/api/health
```
Expected response: `{"status":"OK","timestamp":"..."}`

---

### Step 3: Frontend Deployment to Vercel (10 minutes)

#### Create Vercel Account
- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub account
- [ ] Authorize GitHub access

#### Deploy Frontend
- [ ] Click "Add New..." → "Project"
- [ ] Select your GitHub repository
- [ ] Configure:
  - **Project Name:** `omnidoc`
  - **Framework:** Next.js (auto-detected)
  - **Root Directory:** `./frontend`
  
#### Add Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` = `https://omnidoc-api.onrender.com/api`
- [ ] `NEXT_PUBLIC_GOOGLE_CLIENT_ID` = Your Google Client ID

#### Deploy
- [ ] Review settings
- [ ] Click "Deploy"
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Note the deployed URL (e.g., `https://omnidoc.vercel.app`)

**Test Frontend:**
```
Visit: https://omnidoc.vercel.app
```
Should load the app and show the interface.

---

### Step 4: Update Backend Configuration (5 minutes)

#### Update Render Environment Variable
- [ ] Go to Render dashboard → omnidoc-api service
- [ ] Click "Environment"
- [ ] Update `FRONTEND_URL` = `https://omnidoc.vercel.app`
- [ ] Save and redeploy

---

### Step 5: Update Google OAuth (5 minutes)

#### Configure Google Cloud Console
- [ ] Go to https://console.cloud.google.com
- [ ] Select your project
- [ ] Go to "APIs & Services" → "Credentials"
- [ ] Edit your OAuth 2.0 Client ID
- [ ] Add Authorized JavaScript origins:
  - [ ] `https://omnidoc.vercel.app`
- [ ] Add Authorized redirect URIs:
  - [ ] `https://omnidoc.vercel.app`
  - [ ] `https://omnidoc.vercel.app/api/auth/callback/google`
- [ ] Save changes

---

## Post-Deployment Verification

### Test All Endpoints

#### 1. Health Check
```bash
curl https://omnidoc-api.onrender.com/api/health
```
Expected: `{"status":"OK","timestamp":"..."}`

#### 2. Registration
```bash
curl -X POST https://omnidoc-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"deploy-test@example.com","password":"Test123!","name":"Deploy Test"}'
```
Expected: `{"message":"Registration successful...","user":{...}}`

#### 3. Login
```bash
curl -X POST https://omnidoc-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"deploy-test@example.com","password":"Test123!"}'
```
Expected: `{"token":"eyJhbG...","user":{...}}`

#### 4. Protected Route
```bash
# Use token from login response
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://omnidoc-api.onrender.com/api/auth/me
```
Expected: `{"user":{...}}`

#### 5. Frontend Access
```
Visit: https://omnidoc.vercel.app
```
- [ ] App loads without errors
- [ ] Can navigate to sign-up page
- [ ] Can navigate to sign-in page
- [ ] Sign-up form is functional

---

## Post-Deployment Checks

### Monitoring
- [ ] Check Render logs for errors: Dashboard → Logs
- [ ] Check Vercel logs for errors: Dashboard → Logs
- [ ] Monitor MongoDB connection status
- [ ] Set up error alerts (optional)

### Performance
- [ ] Frontend loads in < 3 seconds
- [ ] API responses in < 500ms
- [ ] No console errors in browser
- [ ] Mobile responsive works

### Security
- [ ] HTTPS enforced (automatic on Vercel/Render)
- [ ] Sensitive data not in logs
- [ ] Credentials only in environment variables
- [ ] No hardcoded secrets in code

### Testing
- [ ] Complete registration → verification → login flow
- [ ] Email verification works (check Gmail inbox)
- [ ] JWT token valid and refreshable
- [ ] Protected routes require authentication
- [ ] Error messages are appropriate
- [ ] User data persists correctly

---

## Troubleshooting

### Backend Won't Start
- [ ] Check Render logs for errors
- [ ] Verify all environment variables set
- [ ] Check MongoDB connection string
- [ ] Verify build command works locally

### Frontend Can't Connect to API
- [ ] Check NEXT_PUBLIC_API_URL in Vercel environment variables
- [ ] Verify backend URL is correct
- [ ] Check CORS settings in backend
- [ ] Test API endpoint directly with curl

### Email Not Sending
- [ ] Verify EMAIL_USER and EMAIL_PASSWORD
- [ ] Check Gmail has 2FA enabled
- [ ] Use correct Gmail app password (not regular password)
- [ ] Check email logs for delivery status

### MongoDB Connection Issues
- [ ] Verify IP whitelist includes Render IPs
- [ ] Check MongoDB credentials are correct
- [ ] Verify connection string format
- [ ] Check MongoDB Atlas activity logs

### Slow Performance
- [ ] Check Render resource usage
- [ ] Optimize database queries
- [ ] Enable caching where possible
- [ ] Consider upgrading Render plan

---

## Success Criteria

✅ **Deployment Complete When:**
- [ ] Backend health endpoint responds
- [ ] Frontend loads successfully
- [ ] Registration endpoint works
- [ ] Login endpoint works
- [ ] Protected routes accessible
- [ ] Email verification working
- [ ] No 5xx errors in logs
- [ ] Frontend connects to backend
- [ ] All environment variables configured
- [ ] MongoDB storing data correctly

---

## Rollback Plan

If something goes wrong:

1. **Render Backend:**
   - Go to Deployments tab
   - Click "Redeploy" on previous version
   - Or delete service and redeploy

2. **Vercel Frontend:**
   - Go to Deployments tab
   - Click the three dots on previous deployment
   - Click "Redeploy"

3. **Database:**
   - MongoDB Atlas has automatic backups
   - Can restore from a previous snapshot if needed

---

## Next Steps After Deployment

1. **Monitor in Production**
   - Set up error tracking (Sentry.io)
   - Monitor performance metrics
   - Watch deployment logs daily

2. **User Feedback**
   - Gather user feedback
   - Monitor error reports
   - Track feature usage

3. **Maintenance**
   - Regular security updates
   - Database optimization
   - Performance monitoring

4. **Scaling**
   - Monitor growth
   - Upgrade resources as needed
   - Plan for increased load

---

## Contacts & Resources

- **Render Support:** https://render.com/docs
- **Vercel Support:** https://vercel.com/support
- **MongoDB Support:** https://www.mongodb.com/support
- **Google Cloud Support:** https://cloud.google.com/support

---

**Last Updated:** December 10, 2025
**Status:** Ready for Production Deployment
