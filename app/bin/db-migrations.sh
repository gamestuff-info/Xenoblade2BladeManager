#!/usr/bin/env bash

php -i
pwd
ls -l
php /var/www/html/bin/console doctrine:migrations:migrate --no-interaction
