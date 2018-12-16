FROM php:7.2-fpm

RUN docker-php-ext-install pdo_mysql

RUN pecl install apcu-5.1.8
RUN docker-php-ext-enable apcu

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /usr/src/app

COPY app /usr/src/app

RUN PATH=$PATH:/usr/src/apps/vendor/bin:bin
