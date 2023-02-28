# Base image for development
FROM node:14-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app files
COPY . .

# Expose port 3000 to the host machine
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]

# Base image for building the production assets
FROM node:14-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app files
COPY . .

# Build the production assets
RUN npm run build

# Base image for serving the production assets with Caddy
FROM caddy:2.4.5-alpine

# Copy the Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

# Copy the production assets
COPY --from=build /app/build /usr/share/caddy
