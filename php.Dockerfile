FROM wodby/php:7.2

USER wodby:wodby
COPY --chown=wodby:wodby app /var/www/html
USER root
RUN mkdir /var/www/html/var && \
    chown -R www-data:www-data /var/www/html/var
USER wodby:wodby
