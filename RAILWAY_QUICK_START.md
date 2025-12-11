# Quick Railway Deployment Setup

## 🚀 Deploy in 5 Minutes

### Step 1: Go to Railway
Visit https://railway.app and sign up with GitHub

### Step 2: Create New Project
Click **"New Project"** → **"Deploy from GitHub repo"**

### Step 3: Select Your Repository
Search for and select: `Testy123ll/OmniDoc`

### Step 4: Railway Auto-Detects
- ✅ Detects Node.js monorepo
- ✅ Finds workspaces (frontend + backend)
- ✅ Automatically configures build & start commands

### Step 5: Add Environment Variables
In Railway Dashboard:
1. Go to your project
2. Click **Variables** tab
3. Add the variables from `.env.railway.example`
4. Replace with your actual credentials

Key variables to add:
```
NODE_ENV=production
MONGODB_URI=your_database_url
JWT_SECRET=your_secret_key
GOOGLE_AI_API_KEY=your_api_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

### Step 6: Deploy
Click **Deploy** and wait 2-5 minutes

### Step 7: Get Your URLs
- Frontend: `https://your-project.railway.app`
- Backend API: `https://your-project.railway.app/api`

---

## 📝 Detailed Guide
See `RAILWAY_DEPLOYMENT.md` for complete documentation

## 🐳 Local Testing (Optional)
Before deploying, test locally:
```bash
docker-compose up
```

This starts:
- Frontend on http://localhost:3000
- Backend on http://localhost:5000
- MongoDB on http://localhost:27017
- Redis on http://localhost:6379

## ✅ Post-Deployment Checklist
- [ ] Frontend loads at your Railway URL
- [ ] Backend API responds at `/api/health`
- [ ] Environment variables are set
- [ ] Database migrations completed
- [ ] Email service working
- [ ] File uploads to Cloudinary working
- [ ] Google AI API responding

## 🆘 Troubleshooting
If deployment fails:
1. Check **Build Logs** for errors
2. Verify all environment variables are set
3. Check **Runtime Logs** for application errors
4. Ensure Node.js version is 22+ (auto-detected)

## 🔄 Auto-Deployment
After initial setup, every push to `main` branch automatically:
1. Triggers a new build
2. Runs tests (if configured)
3. Deploys new version
4. No downtime with Railway's rolling deployments

---

## 💰 Estimated Costs
- **Free Tier**: $5 credit/month
- **Small Project**: $5-15/month
- **Medium Project**: $15-30/month
- Includes: Compute, Database, Bandwidth

---

**Ready to deploy? Start at https://railway.app** 🎉
