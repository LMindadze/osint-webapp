# Use Node.js image as the base for the client
FROM node:16-alpine as client

# Set the working directory in the container
WORKDIR /app

# Copy the React app code into the container
COPY . .

# Install NPM dependencies
RUN npm install

# Expose the port the React app runs on
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]