#!/usr/bin/env bash

php -i
php /var/www/html/bin/console doctrine:migrations:migrate --no-interaction
