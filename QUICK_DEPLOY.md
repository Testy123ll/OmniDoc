# OmniDoc Quick Deployment Guide

## TL;DR - Deploy in 20 Minutes

### Prerequisite
- GitHub account with code pushed
- MongoDB Atlas running (✅ already set up)
- Gemini API key (✅ already set up)
- Gmail account (✅ already set up)

### Backend Deployment (Render) - 10 minutes

1. Go to https://render.com and sign up with GitHub
2. Create new Web Service
3. Select your GitHub repo
4. Configure:
   ```
   Build: npm install && npm run build
   Start: node dist/server.js
   ```
5. Add environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://OMNIDOC:obaoba1234@cluster0.ws4dcfr.mongodb.net/?appName=Cluster0
   JWT_SECRET=<generate new random string>
   FRONTEND_URL=https://omnidoc.vercel.app
   GEMINI_API_KEY=AIzaSyCEg5IL_lA7TAuye-gFrim9eATH9weIYcs
   EMAIL_USER=testimonyojo86@gmail.com
   EMAIL_PASSWORD=qyri srye tlzz nnnk
   ```
6. Deploy and wait for completion
7. **Note the URL** (e.g., omnidoc-api.onrender.com)

### Frontend Deployment (Vercel) - 10 minutes

1. Go to https://vercel.com and sign up with GitHub
2. Import project
3. Set root directory to `./frontend`
4. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://omnidoc-api.onrender.com/api
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=222140289362-ban0r8drld9pnha7jdcjau8hpb55uv1t.apps.googleusercontent.com
   ```
5. Deploy
6. **Note the URL** (e.g., omnidoc.vercel.app)

### Test (2 minutes)

```bash
# Test backend
curl https://omnidoc-api.onrender.com/api/health

# Test frontend
Visit: https://omnidoc.vercel.app
```

## How to Generate JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then copy the output and use it as JWT_SECRET in Render environment variables.

## Full Documentation Files

For detailed instructions, see:
- `DEPLOYMENT_GUIDE.md` - Complete step-by-step guide
- `DEPLOYMENT_CHECKLIST.md` - Detailed checklist with tests
- `ENVIRONMENT_VARIABLES.md` - Environment variable reference
- `MONGODB_WHITELIST.md` - MongoDB IP whitelist setup

## Key URLs After Deployment

- **Frontend:** https://omnidoc.vercel.app
- **Backend API:** https://omnidoc-api.onrender.com
- **API Docs:** https://omnidoc-api.onrender.com/api/health
- **Render Dashboard:** https://dashboard.render.com
- **Vercel Dashboard:** https://vercel.com/dashboard

## Support

If you get stuck:
1. Check the full DEPLOYMENT_CHECKLIST.md
2. Review Render logs: https://dashboard.render.com
3. Review Vercel logs: https://vercel.com/dashboard
4. Check MongoDB Atlas: https://www.mongodb.com/cloud/atlas

---

**Status:** ✅ Ready to Deploy
**Estimated Time:** 20 minutes
**Difficulty:** Easy (mostly clicking and pasting)
