# /client/Dockerfile

# Stage 1: Build the Vite app
FROM node:16-slim AS build

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port Nginx will run on
EXPOSE 5173

CMD ["npm", "run", "build"]