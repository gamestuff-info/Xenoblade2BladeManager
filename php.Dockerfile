FROM wodby/php:7.2

USER wodby:wodby
COPY --chown=wodby:wodby app /var/www/html
RUN mkdir /var/www/html/var && \
    chown -R www-data:www-data /var/www/html/var
