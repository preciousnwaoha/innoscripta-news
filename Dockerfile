# Use an official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the package manager files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the Vite project
RUN npm run build

# Install serve globally to serve the build
RUN npm install -g serve

# Expose the port serve will use
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "dist", "-l", "3000"]