# /nginx/Dockerfile

FROM nginx:alpine

# Log the contents of the root directory
RUN echo "Contents of /:" && ls -la /

# Log the contents of the /etc/nginx/conf.d directory
RUN echo "Contents of /etc/nginx/conf.d:" && ls -la /etc/nginx/conf.d

# Log the contents of the /client directory
RUN echo "Contents of /client:" && ls -la /client

# Log the contents of the /client/dist directory
RUN echo "Contents of /client/dist:" && ls -la /client/dist

# Copy custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the build output to the Nginx HTML directory
COPY ./client/dist /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]