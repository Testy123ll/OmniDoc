# Multi-stage build for OmniDoc monorepo
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build both frontend and backend
RUN npm run build

# Production image
FROM node:22-alpine

WORKDIR /app

# Install production dependencies only
COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

RUN npm ci --only=production

# Copy built artifacts
COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/backend/dist ./backend/dist

# Copy other necessary files
COPY frontend/next.config.js ./frontend/
COPY frontend/tsconfig.json ./frontend/
COPY backend/tsconfig.json ./backend/

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["npm", "start"]

# Expose ports
EXPOSE 5000 3000
