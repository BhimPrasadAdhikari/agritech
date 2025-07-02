# Use Node.js LTS version
FROM node:20-alpine

# Install dependencies for native modules and file watching
RUN apk add --no-cache openssl libc6-compat

# Set working directory
WORKDIR /app

# Install dependencies (do not cache node_modules for dev)
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variable for Next.js file watching in Docker
ENV CHOKIDAR_USEPOLLING=true

# Generate Prisma Client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]