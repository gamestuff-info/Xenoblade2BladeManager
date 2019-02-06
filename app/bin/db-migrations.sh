#!/usr/bin/env bash

php /var/www/html/bin/console doctrine:migrations:migrate --no-interaction
