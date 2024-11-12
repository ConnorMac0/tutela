# Stage-1: Build
FROM node:latest AS builder

# Create a directory and set it as the working directory
WORKDIR /tutela

# Copy the package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy other files to the working directory
COPY . .

# Build and optimize static files
RUN npm run build

# Stage-2: Serve with Nginx
FROM nginx:alpine

COPY ./nginx/ssl /etc/nginx/ssl/

# Copy the static files from the builder stage to the Nginx folder
COPY --from=builder /tutela/dist /usr/share/nginx/html

# Open the port for Nginx
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]