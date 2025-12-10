# Complete Environment Variables for OmniDoc

## Backend Environment Variables (.env in backend/ directory)

```env
# DATABASE
MONGODB_URI="mongodb+srv://OMNIDOC:obaoba1234@cluster0.ws4dcfr.mongodb.net/?appName=Cluster0"

# JWT CONFIGURATION
JWT_SECRET="your-super-secret-key-here-change-in-production"

# EMAIL CONFIGURATION (Gmail)
EMAIL_USER="testimonyojo86@gmail.com"
EMAIL_PASSWORD="qyri srye tlzz nnnk"

# SERVER CONFIGURATION
NODE_ENV="development"
PORT=5004
FRONTEND_URL="http://localhost:3002"

# AI API (Gemini)
GEMINI_API_KEY="AIzaSyCEg5IL_lA7TAuye-gFrim9eATH9weIYcs"

# CLOUDINARY (For file uploads)
CLOUDINARY_NAME="your_cloud_name_here"
CLOUDINARY_API_KEY="your_api_key_here"
CLOUDINARY_API_SECRET="your_api_secret_here"

# FILE LIMITS
MAX_FILE_SIZE=52428800

# GOOGLE OAUTH (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

---

## Frontend Environment Variables (.env.local in frontend/ directory)

```env
# API CONFIGURATION
NEXT_PUBLIC_API_URL="http://localhost:5004/api"

# GOOGLE OAUTH
NEXT_PUBLIC_GOOGLE_CLIENT_ID="222140289362-ban0r8drld9pnha7jdcjau8hpb55uv1t.apps.googleusercontent.com"
```

---

## Production Environment Variables (Render Backend)

When deploying to Render, add these in the Environment section:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://OMNIDOC:obaoba1234@cluster0.ws4dcfr.mongodb.net/?appName=Cluster0
JWT_SECRET=<generate-new-random-string>
FRONTEND_URL=https://omnidoc.vercel.app
GEMINI_API_KEY=AIzaSyCEg5IL_lA7TAuye-gFrim9eATH9weIYcs
EMAIL_USER=testimonyojo86@gmail.com
EMAIL_PASSWORD=qyri srye tlzz nnnk
CLOUDINARY_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
MAX_FILE_SIZE=52428800
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## Production Environment Variables (Vercel Frontend)

When deploying to Vercel, add these in Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://omnidoc-api.onrender.com/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=222140289362-ban0r8drld9pnha7jdcjau8hpb55uv1t.apps.googleusercontent.com
```

---

## 🔑 Variable Descriptions

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT signing | Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `EMAIL_USER` | Gmail account for sending emails | `testimonyojo86@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password | `qyri srye tlzz nnnk` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `5000` (production) or `5004` (development) |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3002` (dev) or `https://omnidoc.vercel.app` (prod) |
| `GEMINI_API_KEY` | Google Gemini AI API key | `AIzaSyCEg5IL_lA7...` |
| `CLOUDINARY_NAME` | Cloudinary cloud name | From cloudinary.com dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API key | From cloudinary.com dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | From cloudinary.com dashboard |
| `MAX_FILE_SIZE` | Max file upload size in bytes | `52428800` (50 MB) |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL (PUBLIC) | `http://localhost:5004/api` (dev) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID (PUBLIC) | `222140289362-...` |

---

## 🚀 How to Setup Cloudinary

### Quick Steps:

1. **Sign up:** https://cloudinary.com/users/register/free
2. **Get credentials** from https://cloudinary.com/console
3. **Add to .env** file with these values:
   - `CLOUDINARY_NAME` = Cloud Name
   - `CLOUDINARY_API_KEY` = API Key
   - `CLOUDINARY_API_SECRET` = API Secret

### For Production:

Add the same three variables to Render dashboard Environment section.

See **[CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md)** for detailed instructions.

---

## 🔐 Security Best Practices

✅ **DO:**
- Keep `.env` files in `.gitignore`
- Never commit credentials to GitHub
- Use environment variables in dashboards
- Rotate credentials regularly
- Use app passwords for Gmail (not regular password)
- Generate new JWT_SECRET for production

❌ **DON'T:**
- Hardcode credentials in code
- Share credentials via email/chat
- Use same password everywhere
- Commit `.env` to GitHub
- Share API keys publicly

---

## 📝 Setup Checklist

### Local Development
- [ ] MongoDB URI configured
- [ ] JWT_SECRET configured
- [ ] Gmail credentials added
- [ ] Gemini API key added
- [ ] Cloudinary credentials added (optional for dev)
- [ ] Google Client ID added (optional)

### Production (Render Backend)
- [ ] Generate new JWT_SECRET
- [ ] All backend variables added to Render
- [ ] Cloudinary configured in Render
- [ ] MongoDB IP whitelist updated
- [ ] Test health endpoint

### Production (Vercel Frontend)
- [ ] NEXT_PUBLIC_API_URL points to Render API
- [ ] Google Client ID added
- [ ] Test frontend loads

---

## 🆘 Troubleshooting

### "Cannot find module '@gmail/nodemailer'"
→ Email variables not set correctly

### "MongoDB connection failed"
→ Check MONGODB_URI and IP whitelist

### "Cloudinary upload failed"
→ Check CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

### "CORS error"
→ Update FRONTEND_URL in backend environment

### "JWT token invalid"
→ Generate new JWT_SECRET with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## 📞 Getting Help

- **MongoDB:** https://docs.mongodb.com
- **Cloudinary:** https://cloudinary.com/documentation
- **Gemini API:** https://ai.google.dev/docs
- **Gmail:** https://support.google.com/mail
- **This Project:** See DEPLOYMENT_GUIDE.md

---

## ✨ Next Steps

1. **Set up Cloudinary** (see CLOUDINARY_SETUP.md)
2. **Add all variables** to backend/.env
3. **Test locally** with `npm run dev`
4. **Deploy to production** (see QUICK_DEPLOY.md)

---

**Last Updated:** December 10, 2025
**Status:** Ready for Configuration
