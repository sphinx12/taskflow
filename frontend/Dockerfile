FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom reverse proxy config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static frontend assets
COPY src/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
