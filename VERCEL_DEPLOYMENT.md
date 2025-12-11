# Vercel Deployment Guide for OmniDoc

## Overview
This guide covers deploying OmniDoc's frontend and backend separately on Vercel.

## Architecture
- **Frontend**: Deployed on Vercel (Next.js optimized)
- **Backend**: Deployed on Vercel Serverless Functions
- **Database**: Managed separately (MongoDB Atlas, Supabase, etc.)

---

## Part 1: Frontend Deployment

### Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub account with OmniDoc repository

### Step 1: Connect GitHub to Vercel

1. Go to https://vercel.com
2. Click **"New Project"**
3. Select **"Import Git Repository"**
4. Authorize Vercel with GitHub
5. Search for and select `Testy123ll/OmniDoc`

### Step 2: Configure Frontend Project

1. In Vercel dashboard:
   - **Project Name**: `omnidoc-frontend` (or your choice)
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

2. Click **"Deploy"**

Vercel will automatically:
- Detect Next.js framework
- Build your frontend
- Deploy to a live URL
- Set up preview deployments for PRs

### Step 3: Add Environment Variables

After deployment, configure variables:

1. Go to your project settings
2. Click **"Environment Variables"**
3. Add these variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Redeploy to apply changes

**Frontend is now live!** 🎉

---

## Part 2: Backend Deployment

### Backend Setup for Vercel

The backend needs to be converted to work with Vercel's serverless environment:

#### 1. Create API Routes Structure

Vercel serves Node.js apps through the `/api` directory. Modify your backend:

```
backend/
├── api/
│   ├── health.ts
│   ├── auth/
│   │   ├── login.ts
│   │   ├── signup.ts
│   │   └── verify.ts
│   ├── files/
│   │   ├── upload.ts
│   │   └── convert.ts
│   └── [...route].ts  (catch-all)
├── src/
│   ├── middleware/
│   ├── utils/
│   ├── models/
│   └── services/
├── vercel.json
└── package.json
```

#### 2. Update package.json

Ensure your backend's package.json has:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "engines": {
    "node": "22.x"
  }
}
```

#### 3. Environment Variables for Backend

In Vercel dashboard for backend project:

1. Go to **Settings** → **Environment Variables**
2. Add all backend environment variables:

```
NODE_ENV=production
PORT=3000
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
GOOGLE_AI_API_KEY=your_key
CLOUDINARY_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
```

### Step 4: Deploy Backend

1. Create new Vercel project for backend:
   - Go to https://vercel.com/new
   - Select `Testy123ll/OmniDoc` repository
   - Set **Root Directory** to `backend`
   - Click **"Deploy"**

2. Vercel will auto-detect and build your backend

3. You'll get a URL like: `https://omnidoc-backend.vercel.app`

**Backend is now live!** 🎉

---

## Step 5: Connect Frontend to Backend

Update frontend environment variables:

1. Go to frontend project settings
2. Update `NEXT_PUBLIC_API_URL`:
   ```
   NEXT_PUBLIC_API_URL=https://omnidoc-backend.vercel.app/api
   ```
3. Redeploy frontend

---

## Verification Checklist

### Frontend
- [ ] Frontend loads at `https://omnidoc-frontend.vercel.app`
- [ ] All pages render correctly
- [ ] API calls are routed to backend

### Backend
- [ ] API responds at `https://omnidoc-backend.vercel.app/api/health`
- [ ] Database connection works
- [ ] All routes are accessible

### Integration
- [ ] Frontend makes successful API calls to backend
- [ ] Authentication works end-to-end
- [ ] File uploads complete successfully
- [ ] AI features respond correctly

---

## Auto-Deployment

After setup, Vercel automatically:

1. **On every push to `main`**:
   - Triggers a new build
   - Runs TypeScript/ESLint checks
   - Deploys to production

2. **For pull requests**:
   - Creates preview deployments
   - Shares preview URL for review
   - Deletes preview after PR is merged

3. **Rollback**:
   - Easy rollback to previous deployments
   - Available in "Deployments" tab

---

## Performance Optimization

### Frontend (Next.js)
- Automatic code splitting
- Image optimization
- Edge caching
- Incremental Static Regeneration (ISR)

### Backend (Serverless)
- Auto-scaling based on traffic
- Cold start optimization
- Request caching
- Region selection for latency

---

## Monitoring & Debugging

### Vercel Dashboard
- **Deployments**: View all deployments and builds
- **Logs**: Real-time application logs
- **Analytics**: Traffic patterns and performance metrics
- **Errors**: Error tracking and alerts

### View Logs
1. Go to project dashboard
2. Click **"Deployments"** tab
3. Select a deployment
4. Click **"Logs"** to see build and runtime logs

---

## Troubleshooting

### Build Fails

**Issue**: "Build failed"
- Check **Build Logs** tab for specific error
- Verify all dependencies in package.json
- Ensure Node.js version matches

**Solution**:
```bash
npm install  # Install dependencies locally
npm run build  # Test build locally
```

### 502/503 Errors

**Issue**: Backend returns 502/503
- Cold start issue (function initialization)
- Environment variables not set
- Database connection timeout

**Solution**:
1. Add environment variables in Vercel
2. Check database connection string
3. Increase function timeout (if available)

### CORS Errors

**Issue**: Frontend can't reach backend
- `NEXT_PUBLIC_API_URL` points to wrong URL
- Backend doesn't have CORS enabled
- Credentials not being sent

**Solution**:
```typescript
// In backend
app.use(cors({
  origin: 'https://omnidoc-frontend.vercel.app',
  credentials: true
}));

// In frontend - update API client
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});
```

---

## Cost Estimation

### Free Tier
- Unlimited deployments
- 1 concurrent build
- Edge Network
- 100 GB/month bandwidth

### Pro Plan ($20/month)
- 3 concurrent builds
- Better support
- Advanced analytics
- Team collaboration

**Most projects fit in free tier!**

---

## Custom Domain

1. Go to project **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records
4. Vercel provides SSL certificate automatically

---

## Database Options

Choose your database hosting:

### MongoDB
- **Atlas** (free tier): https://www.mongodb.com/cloud/atlas
- Managed service, easy setup

### PostgreSQL/MySQL
- **Supabase**: https://supabase.com
- **Railway**: https://railway.app
- **PlanetScale**: https://planetscale.com

### Redis Cache
- **Upstash**: https://upstash.com (Vercel recommended)
- **Redis Cloud**: https://redis.com/cloud

---

## Next Steps

1. ✅ Deploy frontend on Vercel
2. ✅ Deploy backend on Vercel
3. ✅ Configure environment variables
4. ✅ Test end-to-end integration
5. ⬜ Set up custom domain (optional)
6. ⬜ Configure monitoring & alerts
7. ⬜ Set up CI/CD workflows

---

## Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/learn/basics/deploying-nextjs-app
- Vercel CLI: https://vercel.com/cli
- Serverless Functions: https://vercel.com/docs/concepts/functions/serverless-functions

---

## Support

- Vercel Docs: https://vercel.com/support
- Vercel Community: https://github.com/vercel/next.js/discussions
- Email: support@vercel.com

**Happy deploying!** 🚀
