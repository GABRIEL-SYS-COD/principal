# Use an official lightweight Nginx image
FROM nginx:alpine

# Copy the static website files to the Nginx server
COPY . /usr/share/nginx/html/

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]