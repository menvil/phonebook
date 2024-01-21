Installation

git clone git@github.com/menvil/phonebook.git

cd phonebook

cp .env.example .env

composer install

./vendor/bin/sail up -d

./vendor/bin/sail npm install

./vendor/bin/sail npm run build

./vendor/bin/sail php artisan config:cache

./vendor/bin/sail php artisan config:clear

./vendor/bin/sail php artisan migrate

./vendor/bin/sail php artisan db:seed

./vendor/bin/sail php artisan test

./vendor/bin/sail npm run test

./vendor/bin/sail npm run dev

http://localhost
