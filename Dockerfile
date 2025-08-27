FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "server.js"]
