# Use official Node.js LTS image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
