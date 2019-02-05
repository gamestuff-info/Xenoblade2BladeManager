FROM wodby/nginx

COPY --chown=wodby:wodby app/public /var/www/html/public
