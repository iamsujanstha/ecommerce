FROM node:20-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json from the host to the container
COPY package*.json ./

# Conditionally install dependencies based on the NODE_ENV value
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
    fi

# Install TypeScript globally (optional if not included in package.json)
RUN npm install -g typescript tsc

# Copy all source files to the container
COPY . ./

# Expose port 5000 (or whatever port your app uses)
EXPOSE 5000

# Run the compiled JavaScript file
CMD ["node", "dist/server.js"]
