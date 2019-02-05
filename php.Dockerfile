FROM wodby/php:7.2

USER wodby:wodby
COPY --chown=wodby:wodby app /var/www/html
USER root
ARG var_owner=www-data:www-data
RUN mkdir /var/www/html/var && \
    chown -R ${var_owner} /var/www/html/var
USER wodby:wodby
