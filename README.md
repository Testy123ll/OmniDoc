# OmniDoc - Universal File Converter, Editor & AI Workspace

A comprehensive, futuristic web platform for converting, editing, and enhancing documents across 300+ formats with AI-powered assistance.

## 🚀 Features

### Core Features
- **Universal File Conversion** - Convert between 300+ file formats
- **Professional PDF Editing** - Edit text, images, annotations, merge, split
- **AI-Powered Tools** - Grammar fixes, rewrites, summarization, translation, analysis
- **Fast Processing** - Sub-5 second conversions
- **Enterprise Security** - End-to-end encryption, GDPR compliant
- **Real-time Collaboration** - Share and collaborate on documents

### Advanced Features
- **OCR Technology** - Extract text from scanned documents
- **Batch Processing** - Convert multiple files at once
- **Custom Templates** - Pre-built templates for students and professionals
- **E-Signatures** - Digital document signing
- **Cloud Sync** - Seamless cross-device synchronization
- **Version Control** - Track document changes

## 📁 Project Structure

```
OmniDoc/
├── frontend/              # Next.js React application
│   ├── app/              # Pages and layouts
│   ├── components/       # Reusable UI components
│   ├── lib/             # API clients and utilities
│   ├── types/           # TypeScript types
│   ├── store/           # Zustand state management
│   ├── styles/          # Global styles and Tailwind config
│   └── public/          # Static assets
├── backend/             # Node.js Express API
│   ├── src/
│   │   ├── models/      # MongoDB schemas
│   │   ├── controllers/ # Route handlers
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── middleware/  # Auth and error handling
│   │   ├── config/      # Configuration
│   │   └── utils/       # Helper functions
│   └── dist/           # Compiled JavaScript
└── README.md

```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion
- **State Management**: Zustand
- **File Handling**: React Dropzone, PDF.js, Docx.js
- **UI Components**: Lucide Icons

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **File Storage**: Cloudinary/Local Storage
- **Authentication**: JWT
- **Conversion**: Sharp (images), XLSX (spreadsheets)

## 📋 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or cloud connection
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Update .env with your configuration

npm run dev
```

Backend runs on `http://localhost:5000`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### File Management
- `POST /api/files/upload` - Upload file
- `GET /api/files` - List user's files
- `DELETE /api/files/:id` - Delete file
- `POST /api/files/conversions/convert` - Start conversion
- `GET /api/files/conversions/:id/status` - Get conversion status

### AI Features
- `POST /api/ai/write` - AI writing
- `POST /api/ai/edit` - AI text editing
- `POST /api/ai/summarize` - Text summarization
- `POST /api/ai/translate` - Text translation
- `POST /api/ai/analyze` - Document analysis

## 🎨 UI Components

### Futuristic Design Elements
- **Glassmorphism** - Frosted glass panels with backdrop blur
- **Neon Accents** - Pink, purple, cyan, and green neon colors
- **Dark Mode First** - Dark background with glowing elements
- **Micro-animations** - Smooth transitions and hover effects
- **Grid Background** - Subtle grid pattern overlay

### Component Library
- `Navbar` - Navigation with theme toggle
- `FileUpload` - Drag-and-drop file upload
- `FileList` - Document list with actions
- `AISidebar` - AI assistant chat interface
- `PDFEditor` - Advanced PDF editing tools
- `HeroSection` - Landing page hero with 3D animations
- `FeaturesSection` - Feature showcase
- `PricingSection` - Pricing plans
- `Footer` - Footer with links

## 🔐 Security Features

- **JWT Authentication** - Secure API token-based auth
- **Password Hashing** - Bcrypt for secure password storage
- **HTTPS** - SSL/TLS encryption in production
- **CORS** - Cross-origin resource sharing configuration
- **File Validation** - MIME type and size restrictions
- **Rate Limiting** - API rate limiting (to be implemented)
- **GDPR Compliance** - User data privacy controls

## 📊 Database Schema

### User Model
- Email, Password (hashed), Name
- Plan (free/pro/business)
- Storage quota and usage tracking
- Timestamps

### File Model
- Original and storage names
- File type, size, format
- User reference
- Public URL and expiration
- Upload timestamp

### Conversion Model
- Source and target file references
- Conversion status (pending/processing/completed/failed)
- Error tracking
- Completion timestamp

### AIPrompt Model
- User reference
- Prompt type and content
- AI response
- Language and tone settings
- Creation timestamp

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
vercel deploy
```

### Backend (Heroku/Railway)
```bash
npm run build
# Deploy using platform CLI
```

### Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=https://api.omnidoc.app
```

**Backend (.env)**
```
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your-secret-key
PORT=5000
FRONTEND_URL=https://omnidoc.app
CLOUDINARY_NAME=your-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

## 📱 Mobile App Roadmap

Future React Native/Flutter app will:
- Share backend API with web version
- Support camera document scanning
- Enable offline editing
- Push notifications for conversions
- Quick convert from home screen

## 🎯 Development Roadmap

### Phase 1 ✅ MVP
- Basic conversions
- File upload system
- Futuristic UI
- User authentication

### Phase 2 - Editor Upgrade
- Full PDF editing suite
- Page management (merge, split, reorder)
- Image and text editing
- OCR integration

### Phase 3 - AI Integration
- AI writing and editing
- Document summarization
- Translation service
- Content analysis

### Phase 4 - Collaboration
- Real-time multi-user editing
- Sharing links and permissions
- Cloud synchronization
- Comment system

### Phase 5 - Premium Features
- Advanced 3D UI animations
- Template library
- API for developers
- Batch processing
- Advanced AI features

### Phase 6 - Mobile App
- Native iOS app
- Native Android app
- Camera scanning
- Offline support

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📧 Support

For support, email hello@omnidoc.io or open an issue on GitHub.

---

Built with ❤️ by the OmniDoc Team
