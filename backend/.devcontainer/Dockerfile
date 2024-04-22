# Define the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Expose port 1909 (or the port your backend service runs on)
EXPOSE 1909

# Command to run the application
CMD ["npm", "run", "dev"]
