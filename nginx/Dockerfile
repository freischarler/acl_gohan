# /nginx/Dockerfile

FROM nginx:alpine

# Copy custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Log the contents of the root directory
RUN echo "Contents of /:" && ls -la /

# Log the contents of the /etc/nginx/conf.d directory
RUN echo "Contents of /etc/nginx/conf.d:" && ls -la /etc/nginx/conf.d

# Log the contents of the /frontend directory
RUN echo "Contents of /frontend:" && ls -la /frontend

# Log the contents of the /frontend/dist directory
RUN echo "Contents of /frontend/dist:" && ls -la /frontend/dist

# Copy the build output to the Nginx HTML directory
COPY ./frontend/dist /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]