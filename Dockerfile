# Use the official Node.js image as the base image
FROM node:14-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app files
COPY . .

# Set the NODE_ENV environment variable to "production" by default
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Build the production assets (only when NODE_ENV is set to "production")
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build; \
    fi

# Expose port 3000 to the host machine
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
