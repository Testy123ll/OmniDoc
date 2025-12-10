# OmniDoc - Getting Started Quick Guide

## Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- Git

## 1️⃣ Installation

```bash
# Clone and navigate
git clone <repo-url>
cd OmniDoc

# Install all dependencies
npm run install-all
```

## 2️⃣ Environment Setup

**Backend Configuration:**

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
DATABASE_URL=mongodb://localhost:27017/omnidoc
JWT_SECRET=your-secret-key-here
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=52428800
```

**Frontend Configuration:**

Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 3️⃣ Start Development

```bash
# Start both frontend and backend
npm run dev

# Or start separately in different terminals:
# Terminal 1 - Frontend
npm run dev -w frontend

# Terminal 2 - Backend
npm run dev -w backend
```

**URLs:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- API Docs: `http://localhost:5000/api/health`

## 4️⃣ First Steps

1. Visit `http://localhost:3000`
2. Explore the landing page
3. Click "Get Started" or "Start Converting"
4. Upload a document to test

## 📦 Project Includes

### Frontend
- ✅ Futuristic UI with glassmorphism
- ✅ Dark mode by default
- ✅ File upload with drag-drop
- ✅ PDF editor interface
- ✅ AI chat sidebar
- ✅ Responsive design
- ✅ Animation framework (Framer Motion)

### Backend
- ✅ Express.js API
- ✅ MongoDB models
- ✅ JWT authentication
- ✅ File upload handling
- ✅ Conversion service
- ✅ AI integration endpoints
- ✅ Error handling middleware

### Database
- ✅ User model
- ✅ File model
- ✅ Conversion model
- ✅ AI Prompt model

## 🔑 Key Features Implemented

- File upload with validation
- Multiple format support structure
- User authentication system
- AI service integration points
- Real-time file list management
- Modern, animated UI
- Modular architecture

## 📚 Documentation

- `README.md` - Full project overview
- `DEVELOPMENT.md` - Detailed development guide
- `API_DOCS.md` (to be created) - API endpoints reference

## 🚀 Next Steps

1. Connect MongoDB Atlas (update DATABASE_URL)
2. Add file storage (Cloudinary or AWS S3)
3. Integrate AI APIs (OpenAI, Anthropic, etc.)
4. Implement real file conversions
5. Add testing suite
6. Deploy to production

## 🐛 Troubleshooting

**Port 3000/5000 already in use?**
```bash
# Find and kill process
# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

**MongoDB connection error?**
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas: Update DATABASE_URL

**Dependencies not installing?**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

Check `DEVELOPMENT.md` for detailed API documentation and advanced setup.

---

Happy building! 🚀
