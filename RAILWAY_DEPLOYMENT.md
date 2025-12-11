# Railway Deployment Guide for OmniDoc

## Prerequisites
- GitHub account with OmniDoc repository
- Railway account (free at https://railway.app)

## Step 1: Create a Railway Account
1. Go to https://railway.app
2. Sign up with GitHub (recommended for easy integration)
3. Create a new project

## Step 2: Deploy Using Railway Dashboard

### Option A: Connect GitHub (Recommended)
1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Authorize Railway to access your GitHub account
4. Select `Testy123ll/OmniDoc` repository
5. Railway will automatically detect it's a monorepo with workspaces

### Option B: Deploy from CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway init

# Deploy
railway up
```

## Step 3: Configure Environment Variables

Railway will need these environment variables:

### Frontend Environment Variables
```
NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### Backend Environment Variables
```
# Database
MONGODB_URI=your_mongodb_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# Authentication
JWT_SECRET=your_jwt_secret
BCRYPT_ROUNDS=10

# Email
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_email_password

# AI
GOOGLE_AI_API_KEY=your_google_ai_key

# File Upload
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

# Node Environment
NODE_ENV=production
PORT=5000
```

## Step 4: Add Environment Variables in Railway

### In Railway Dashboard:
1. Go to your project
2. Click on the service (Frontend or Backend)
3. Go to "Variables" tab
4. Add all the variables listed above
5. Repeat for both services

## Step 5: Configure Build & Deployment Settings

### For the project:
1. Go to "Settings" in Railway
2. Set the following:
   - **Root Directory**: Leave empty (monorepo support)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### Railway should auto-detect:
- Node.js environment
- Monorepo structure
- Build and start scripts

## Step 6: Deploy
1. Go to "Deployments" tab
2. Click "Deploy" or wait for auto-deploy on git push
3. Monitor the build logs
4. Once deployed, you'll get a public URL

## Step 7: Verify Deployment
- Frontend should be accessible at `https://your-project.railway.app`
- Backend API should be at `https://your-project.railway.app/api`
- Check logs for any errors: Click on service → "Logs" tab

## Updating Code

After deploying:
1. Simply push to GitHub main branch
2. Railway will automatically detect changes
3. Automatically rebuild and redeploy

## Scaling & Monitoring

In Railway Dashboard:
- **Replicas**: Scale the number of instances
- **Memory/CPU**: Adjust resources
- **Logs**: Monitor application logs in real-time
- **Metrics**: View performance graphs

## Troubleshooting

### Build Fails
- Check "Build Logs" tab for specific errors
- Ensure all dependencies are in package.json
- Verify Node.js version is 18+

### Application Crashes
- Check "Logs" tab for runtime errors
- Verify all environment variables are set
- Check PORT configuration

### Deployment Won't Start
- Ensure build command completes successfully
- Check that start command is correct
- Verify NODE_ENV is set to production

## Cost Estimate
- **Free tier**: Excellent for small projects
- **Typical cost**: $5-20/month depending on traffic
- **Includes**: 
  - 500 execution hours per month free
  - PostgreSQL database (free tier available)
  - Bandwidth included

## Next Steps
1. Configure custom domain (optional)
2. Set up monitoring and alerting
3. Configure backups for database
4. Set up CI/CD webhooks

---

For more help, visit: https://docs.railway.app
