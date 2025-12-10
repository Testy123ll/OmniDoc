# OmniDoc Production Environment Variables

## Backend (.env in backend/ directory)

# Database
MONGODB_URI="mongodb+srv://OMNIDOC:obaoba1234@cluster0.ws4dcfr.mongodb.net/?appName=Cluster0"

# JWT Configuration
JWT_SECRET="CHANGE_THIS_TO_A_SECURE_RANDOM_STRING"

# Server Configuration
PORT=5000
NODE_ENV="production"
FRONTEND_URL="https://omnidoc.vercel.app"

# Email Configuration
EMAIL_USER="testimonyojo86@gmail.com"
EMAIL_PASSWORD="qyri srye tlzz nnnk"

# AI API (Gemini)
GEMINI_API_KEY="AIzaSyCEg5IL_lA7TAuye-gFrim9eATH9weIYcs"

# Cloudinary (if file uploads are enabled)
CLOUDINARY_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

---

## Frontend (.env.local in frontend/ directory)

# API Configuration
NEXT_PUBLIC_API_URL="https://omnidoc-api.onrender.com/api"

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID="222140289362-ban0r8drld9pnha7jdcjau8hpb55uv1t.apps.googleusercontent.com"

---

## How to Generate JWT_SECRET

Run this command in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as JWT_SECRET in production environment.

---

## Render.com Dashboard Configuration

1. Go to https://dashboard.render.com
2. Select your backend service
3. Click "Environment"
4. Add these environment variables with their respective values

---

## Vercel Dashboard Configuration

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click "Settings" → "Environment Variables"
4. Add these environment variables:
   - NEXT_PUBLIC_API_URL
   - NEXT_PUBLIC_GOOGLE_CLIENT_ID

---

## Security Notes

- Never commit real environment variables to GitHub
- Use `.env.local` for local development (already in .gitignore)
- Rotate JWT_SECRET periodically in production
- Store sensitive values in dashboard only
- Use long, random values for secrets
- Change default MongoDB credentials if possible
