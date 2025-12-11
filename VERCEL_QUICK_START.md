# Vercel Quick Start - Deploy in 10 Minutes

## 🚀 Fast Track Deployment

### Frontend Deployment (3 minutes)

#### Step 1: Go to Vercel
```
https://vercel.com
```

#### Step 2: Create Project
- Click **"New Project"**
- Click **"Import Git Repository"**
- Select `Testy123ll/OmniDoc`

#### Step 3: Configure
- **Root Directory**: `frontend`
- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- Click **"Deploy"**

✅ Frontend deployed in ~2-3 minutes

**Your Frontend URL**: `https://omnidoc-frontend.vercel.app`

---

### Backend Deployment (5 minutes)

#### Step 1: Create Another Vercel Project
- Go to https://vercel.com/new
- Select `Testy123ll/OmniDoc` again

#### Step 2: Configure
- **Root Directory**: `backend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- Click **"Deploy"**

#### Step 3: Add Environment Variables
After deployment:
1. Go to project **Settings** → **Environment Variables**
2. Add these variables:

```
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_AI_API_KEY=your_google_ai_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

3. Click **"Redeploy"** to apply variables

✅ Backend deployed in ~3-4 minutes

**Your Backend URL**: `https://omnidoc-backend.vercel.app`

---

### Connect Frontend to Backend (2 minutes)

#### Step 1: Update Frontend Variables
Go to Frontend project → **Settings** → **Environment Variables**

Add/Update:
```
NEXT_PUBLIC_API_URL=https://omnidoc-backend.vercel.app/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

#### Step 2: Redeploy Frontend
- Click **"Deployments"**
- Click the last deployment
- Click **"Redeploy"**

✅ Everything connected!

---

## ✅ Test Your Deployment

### Frontend
Visit: `https://omnidoc-frontend.vercel.app`
- Check if pages load
- Check console for errors

### Backend API
Visit: `https://omnidoc-backend.vercel.app/api/health`
- Should return `{"status": "ok"}`

### Integration Test
In frontend, try:
- Login/Signup
- Upload a file
- Use AI features

---

## 📊 Monitor Your Deployment

### View Logs
1. Go to project dashboard
2. Click **"Deployments"** tab
3. Select a deployment
4. Click **"Logs"**

### Check Performance
1. Click **"Analytics"** tab
2. View request counts
3. Monitor response times
4. Check bandwidth usage

### Handle Errors
- Read error messages in logs
- Check environment variables are set
- Verify database connection
- Test API endpoints

---

## 🔄 Auto-Deployment

After initial setup:
- Every push to `main` branch auto-deploys
- Preview deployments for pull requests
- Automatic SSL certificates
- No manual deployments needed

### How It Works:
```
You push to GitHub
        ↓
Vercel detects change
        ↓
Vercel builds & tests
        ↓
Vercel deploys automatically
        ↓
New version is live
```

---

## 🆘 Common Issues

### "Build failed"
- Check **Build Logs**
- Run `npm install && npm run build` locally
- Verify all dependencies

### "502 Bad Gateway"
- Check environment variables
- Verify database connection
- Check backend logs

### "CORS error"
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend CORS configuration
- Ensure credentials are being sent

### "Page not found"
- Verify routes are correct
- Check Next.js configuration
- Clear browser cache

---

## 💰 Pricing

### Free Tier (Plenty!)
- ✅ Unlimited deployments
- ✅ 100 GB/month bandwidth
- ✅ Auto scaling
- ✅ SSL certificate
- ✅ Custom domain

### Pro ($20/month)
- ✅ All free tier features
- ✅ 3 concurrent builds
- ✅ Advanced analytics
- ✅ Priority support

**You probably don't need Pro!**

---

## 🎉 You're Done!

Your OmniDoc is now live:
- **Frontend**: https://omnidoc-frontend.vercel.app
- **Backend**: https://omnidoc-backend.vercel.app
- **Auto-deploys**: On every git push
- **Free hosting**: Up to generous limits

### Next (Optional):
- [ ] Add custom domain
- [ ] Set up monitoring alerts
- [ ] Configure DNS
- [ ] Optimize performance

---

**Questions?** Check full guide: `VERCEL_DEPLOYMENT.md`

**Need help?** Visit: https://vercel.com/support
