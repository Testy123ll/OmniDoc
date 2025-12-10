# OmniDoc Deployment Guide

## Prerequisites
- Render.com account (free tier available)
- Vercel account (connected to GitHub)
- GitHub repository with OmniDoc code
- MongoDB Atlas account (already configured)
- Google OAuth credentials

## Part 1: Backend Deployment (Render)

### Step 1: Prepare for Render Deployment

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - OmniDoc ready for deployment"
   git push origin main
   ```

2. **Create Render account** at https://render.com
   - Sign up with GitHub

3. **Create Web Service on Render**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure settings:
     - **Name:** omnidoc-api
     - **Environment:** Node
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `node dist/server.js`
     - **Plan:** Free (or paid for better performance)

### Step 2: Configure Environment Variables on Render

In the Render dashboard, add these environment variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://OMNIDOC:obaoba1234@cluster0.ws4dcfr.mongodb.net/?appName=Cluster0
JWT_SECRET=your-production-jwt-secret-change-this
FRONTEND_URL=https://omnidoc.vercel.app
GEMINI_API_KEY=AIzaSyCEg5IL_lA7TAuye-gFrim9eATH9weIYcs
EMAIL_USER=testimonyojo86@gmail.com
EMAIL_PASSWORD=qyri srye tlzz nnnk
```

**Important:** Generate a new JWT_SECRET for production:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Update MongoDB IP Whitelist

1. Go to MongoDB Atlas dashboard
2. Navigate to Network Access
3. Add Render IP: `0.0.0.0/0` (or specific Render IP if available)
4. Or use Database Access → IP Whitelist and add: `0.0.0.0/0`

**Note:** For production, use Render's specific IP when available

### Step 4: Deploy Backend

- Render will auto-deploy when you push to GitHub
- Monitor deployment in Render dashboard
- Once deployed, you'll get a URL like: `https://omnidoc-api.onrender.com`

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Prepare vercel.json

The `vercel.json` file should already be in the frontend directory.

### Step 2: Update Frontend Environment

Update `frontend/.env.local` with production API URL:

```
NEXT_PUBLIC_API_URL=https://omnidoc-api.onrender.com/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=222140289362-ban0r8drld9pnha7jdcjau8hpb55uv1t.apps.googleusercontent.com
```

### Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Select the `frontend` directory as root
5. Add environment variables (same as above)
6. Click "Deploy"

Once deployed, you'll get a URL like: `https://omnidoc.vercel.app`

---

## Part 3: Post-Deployment Configuration

### Step 1: Update Google OAuth Redirect URI

1. Go to Google Cloud Console
2. Update the authorized redirect URIs:
   - `https://omnidoc.vercel.app/api/auth/callback/google`
   - `https://omnidoc.vercel.app`

### Step 2: Test Production Deployment

```bash
# Test health endpoint
curl https://omnidoc-api.onrender.com/api/health

# Test registration
curl -X POST https://omnidoc-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}'

# Test login
curl -X POST https://omnidoc-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

### Step 3: Monitor Deployment

- **Render:** Check backend logs in dashboard
- **Vercel:** Check frontend logs in dashboard
- **MongoDB:** Monitor connection in Atlas dashboard

---

## Troubleshooting

### Backend won't start on Render
- Check logs in Render dashboard
- Verify all environment variables are set
- Check MongoDB IP whitelist allows Render IPs

### Frontend can't connect to API
- Verify `NEXT_PUBLIC_API_URL` environment variable
- Check CORS settings in backend
- Check frontend/backend URLs in allowed origins

### Email not sending in production
- Verify Gmail credentials in environment variables
- Check Gmail app password (not regular password)
- Verify from address is correct

### MongoDB connection timeout
- Check IP whitelist includes Render server IP
- Verify MongoDB username/password
- Check connection string format

---

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Backend deployed to Render
- [ ] Environment variables set on Render
- [ ] MongoDB IP whitelist updated
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set on Vercel
- [ ] Google OAuth URIs updated
- [ ] Production deployment tested
- [ ] Email verification tested
- [ ] Login/authentication tested
- [ ] AI features tested

---

## Production Recommendations

1. **Security:**
   - Change JWT_SECRET to a unique value
   - Rotate credentials regularly
   - Enable HTTPS (automatic on Vercel/Render)
   - Add rate limiting to API

2. **Monitoring:**
   - Set up error tracking (e.g., Sentry)
   - Monitor API performance
   - Track user analytics

3. **Database:**
   - Enable MongoDB backups
   - Set up database replication
   - Monitor storage usage

4. **Scaling:**
   - Use Render's paid plans if needed
   - Consider caching layer (Redis)
   - Optimize API performance

---

## Support

For issues:
1. Check Render logs: https://dashboard.render.com
2. Check Vercel logs: https://vercel.com/dashboard
3. Check MongoDB logs: https://www.mongodb.com/cloud/atlas
4. Review error messages in application logs
