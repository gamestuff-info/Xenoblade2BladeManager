#######################################
# BASE IMAGE
#######################################
FROM php:7.4-fpm-alpine as base

WORKDIR /var/www

# Install dependencies
RUN set -xe \
    && apk add --no-cache bash icu-dev libxml2-dev postgresql-dev \
    && docker-php-ext-install intl iconv json pdo pcntl pdo_pgsql xml

COPY docker/app/entrypoint.sh /usr/local/bin/php-entrypoint

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

CMD ["/usr/local/bin/php-entrypoint"]

#######################################
# COMPOSER
#######################################
FROM composer:1 as composer

RUN rm -rf /var/www && mkdir /var/www
WORKDIR /var/www

COPY app/composer.* /var/www/

ARG APP_ENV=prod

RUN set -xe \
    && if [ "$APP_ENV" = "prod" ]; then export ARGS="--no-dev"; fi \
    && composer install --prefer-dist --no-scripts --no-progress --no-suggest --no-interaction $ARGS

COPY app/. /var/www

RUN composer dump-autoload --classmap-authoritative

#######################################
# APPLICATION
#######################################
FROM base as app

ARG APP_ENV=prod
ARG APP_DEBUG=0
ARG BUILD_NUMBER=debug

ENV APP_ENV $APP_ENV
ENV APP_DEBUG $APP_DEBUG
ENV SENTRY_DSN $SENTRY_DSN
ENV BUILD_NUMBER $BUILD_NUMBER

COPY --from=composer /var/www/ /var/www/

RUN mkdir -p var/cache \
    && chown -R www-data:www-data var

#######################################
# DEVELOPMENT SUPPORT
#######################################
FROM app as app_dev

RUN set -xe \
    && apk add --no-cache $PHPIZE_DEPS \
    && pecl install xdebug-2.9.8 \
    && docker-php-ext-enable xdebug

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

VOLUME /var/www
