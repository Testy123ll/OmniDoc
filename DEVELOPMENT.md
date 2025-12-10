# OmniDoc Development Guide

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd OmniDoc
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Setup environment variables**
   
   Backend:
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Update `.env` with your MongoDB URI and other configuration.

4. **Start development servers**
   ```bash
   npm run dev
   ```

   Or start them separately:
   ```bash
   npm run dev -w frontend
   npm run dev -w backend
   ```

## Project Structure Details

### Frontend (`/frontend`)

**Pages:**
- `/` - Landing page with hero section
- `/app` - Document workspace
- `/app/editor/[id]` - PDF editor interface
- `/about` - About page
- `/contact` - Contact page

**Components:**
- `common/` - Navbar, Footer, reusable UI
- `home/` - Homepage sections
- `editor/` - File upload, file list
- `ai/` - AI sidebar and chat

**Key Technologies:**
- Next.js for framework
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management

### Backend (`/backend`)

**Models:**
- User - User accounts and profiles
- File - Uploaded documents
- Conversion - Conversion jobs
- AIPrompt - AI request history

**Services:**
- AIService - AI operations (write, edit, summarize, translate, analyze)
- ConversionService - File format conversions

**Routes:**
- `/api/auth` - Authentication endpoints
- `/api/files` - File management
- `/api/ai` - AI operations

## Key Features Implementation

### File Upload
- Drag-and-drop interface in `FileUpload.tsx`
- Multer middleware for server-side handling
- File validation and size limits

### Conversions
- Async job processing with status tracking
- Support for multiple formats
- Result file generation and storage

### AI Integration
- Sidebar chat interface in `AISidebar.tsx`
- Multiple AI modes (summarize, rewrite, grammar, etc.)
- Request history tracking

### PDF Editing
- Editor interface in `PDFEditor` page
- Toolbar with zoom, rotation, tools
- Page thumbnails sidebar
- Properties panel

## Styling System

### Colors
- `dark-bg`: #0a0e27 (main background)
- `neon-pink`: #ff006e
- `neon-purple`: #8338ec
- `neon-cyan`: #00f5ff
- `neon-green`: #00ff41

### Components
- `glass-panel` - Glassmorphism container
- `glass-button` - Interactive button
- `gradient-text` - Text with gradient
- `neon-glow` - Text shadow glow effect

## API Documentation

### Authentication

**Register:**
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure-password",
  "name": "User Name"
}

Response: { token, user }
```

**Login:**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}

Response: { token, user }
```

### Files

**Upload:**
```
POST /api/files/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary>

Response: { id, url, name, size, format }
```

**List:**
```
GET /api/files
Authorization: Bearer <token>

Response: [{ id, name, type, size, url, uploadedAt }]
```

### Conversions

**Start Conversion:**
```
POST /api/files/conversions/convert
Authorization: Bearer <token>
Content-Type: application/json

{
  "sourceId": "file-id",
  "targetFormat": "pdf"
}

Response: { conversionId, status }
```

**Check Status:**
```
GET /api/files/conversions/{conversionId}/status
Authorization: Bearer <token>

Response: { status, error }
```

### AI

**Summarize:**
```
POST /api/ai/summarize
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Long text to summarize..."
}

Response: { result }
```

**Edit:**
```
POST /api/ai/edit
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Text to edit...",
  "editType": "grammar|rewrite|expand|simplify",
  "tone": "formal|casual|academic|friendly"
}

Response: { result }
```

## Development Tips

1. **Component Development**
   - Use Framer Motion for animations
   - Apply glass-panel class for consistency
   - Always use gradient-text for headings

2. **API Integration**
   - Update `lib/api.ts` for new endpoints
   - Use `apiClient` instance for consistency
   - Add try-catch for error handling

3. **State Management**
   - Use Zustand store in `store/app.ts`
   - Import hooks with `useAppStore()`
   - Keep store focused on global state

4. **TypeScript**
   - Define types in `types/index.ts`
   - Use interfaces for component props
   - Avoid `any` type

## Testing

Run tests (when added):
```bash
npm test
```

## Building for Production

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Backend
```bash
cd backend
npm run build
npm start
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Build successful locally
- [ ] All tests passing
- [ ] Security headers configured
- [ ] CORS properly set
- [ ] SSL/TLS certificates
- [ ] Backup strategy in place

## Troubleshooting

### Port Already in Use
```bash
# Frontend (3000)
lsof -i :3000

# Backend (5000)
lsof -i :5000
```

### Database Connection Issues
- Check MongoDB is running
- Verify connection string in .env
- Check network access if using MongoDB Atlas

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB](https://www.mongodb.com/)

## Support

For issues or questions, please open a GitHub issue or contact the team.
