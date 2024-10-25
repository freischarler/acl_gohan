# /nginx/Dockerfile

FROM nginx:alpine

# Copy custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]