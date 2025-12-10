# Cloudinary Setup Guide

## What is Cloudinary?

Cloudinary is a cloud-based service for managing, optimizing, and delivering images and videos. It's perfect for:
- File uploads (images, PDFs, documents)
- Image optimization
- Video streaming
- File storage and delivery

## Step-by-Step Setup

### 1. Create Cloudinary Account

1. Go to https://cloudinary.com/users/register/free
2. Sign up with email or Google account
3. Verify your email
4. Create an account

### 2. Get Your Credentials

1. Log in to https://cloudinary.com/console
2. You'll see your **Cloud Name** on the dashboard
3. Scroll down to see your **API Key** and **API Secret**
4. Copy these three values:
   - **Cloud Name** (e.g., `dxxxxxx`)
   - **API Key** (e.g., `123456789`)
   - **API Secret** (e.g., `AbCdEfGhIjKlMnOpQrStUvW`)

### 3. Update Environment Variables

#### For Local Development

Update `backend/.env`:

```env
CLOUDINARY_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

#### For Production (Render)

1. Go to https://dashboard.render.com
2. Select your backend service
3. Click "Environment"
4. Add these variables:
   ```
   CLOUDINARY_NAME=your_cloud_name_here
   CLOUDINARY_API_KEY=your_api_key_here
   CLOUDINARY_API_SECRET=your_api_secret_here
   ```
5. Save and redeploy

#### For Production (Frontend in Vercel)

No need to add Cloudinary to Vercel - the frontend will call the backend API which will handle uploads.

---

## Example Credentials Format

```
Cloud Name: dq1a2b3c4
API Key: 123456789012345
API Secret: AbCdEfGhIjKlMnOpQrStUvWxYz
```

## Testing Cloudinary Integration

After setup, test with:

```bash
curl -X POST http://localhost:5004/api/files/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@your_file.pdf"
```

## Security Notes

- **NEVER** commit API credentials to GitHub
- Use environment variables only
- Keep API Secret private
- Rotate credentials if compromised
- Use restricted API keys in production

## File Upload Features Enabled

Once Cloudinary is set up, these features work:

- ✅ PDF uploads
- ✅ Image uploads
- ✅ Document uploads
- ✅ File optimization
- ✅ Automatic resizing
- ✅ CDN delivery

## Cloudinary Free Tier Includes

- 25 GB storage
- 25 GB bandwidth/month
- Unlimited uploads
- Image optimization
- API access
- No credit card required

## Troubleshooting

### "Invalid credentials"
- Check CLOUDINARY_NAME is correct
- Verify API_KEY and API_SECRET match exactly
- Regenerate keys if needed

### "Upload failed"
- Check file size (MAX_FILE_SIZE = 50MB)
- Verify JWT token is valid
- Check network connectivity

### Files not appearing
- Check Cloudinary Media Library dashboard
- Verify folder structure
- Check transformation settings

## Need Help?

- Cloudinary Docs: https://cloudinary.com/documentation
- Community Support: https://support.cloudinary.com
- Dashboard: https://cloudinary.com/console

---

## Quick Start (3 Steps)

1. **Sign up** at https://cloudinary.com/users/register/free
2. **Copy credentials** from dashboard
3. **Add to .env file** (or Render environment variables)

That's it! File uploads are ready to use. 🚀

---

**Status:** Ready to configure
**Estimated Time:** 5 minutes
**Cost:** FREE (25 GB/month included in free tier)
