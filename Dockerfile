# Dockerfile

# Use the official Node.js image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
#COPY src ./src
#COPY public ./public
#COPY scripts ./scripts
#COPY materialize ./materialize
#COPY config ./config

#RUN node scripts/build.js
# Build the production-ready version of your React app
#RUN npm run build
#RUN npm install -g serve
# Expose the port your React app runs on
EXPOSE 7165

# Start the app when the container is run
CMD ["node", "scripts/start.js"]
