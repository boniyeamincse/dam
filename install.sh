#!/bin/bash

# Installation script for Laravel Docker Compose setup
# This script sets up the entire Laravel application with Docker

echo "Laravel Docker Setup Installation Script"
echo "========================================"

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "Docker and Docker Compose are installed. Proceeding..."

# Copy environment file
if [ ! -f .env ]; then
    echo "Copying .env.example to .env..."
    cp .env.example .env
else
    echo ".env file already exists. Skipping copy."
fi

# Generate application key if not set
if grep -q "APP_KEY=" .env && ! grep -q "APP_KEY=base64:" .env; then
    echo "Generating Laravel application key..."
    docker-compose run --rm app php artisan key:generate
fi

# Install PHP dependencies
echo "Installing PHP dependencies..."
docker-compose run --rm app composer install --optimize-autoloader --no-dev

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Build assets
echo "Building assets..."
npm run build

# Start the containers
echo "Starting Docker containers..."
docker-compose up -d

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
sleep 30

# Run database migrations
echo "Running database migrations..."
docker-compose exec app php artisan migrate

# Seed the database (optional)
echo "Seeding the database..."
docker-compose exec app php artisan db:seed

# Install Horizon (if using Laravel Horizon)
echo "Installing Laravel Horizon..."
docker-compose exec app php artisan horizon:install

# Optimize Laravel
echo "Optimizing Laravel application..."
docker-compose exec app php artisan config:cache
docker-compose exec app php artisan route:cache
docker-compose exec app php artisan view:cache

echo "Installation completed successfully!"
echo ""
echo "Your Laravel application is now running at:"
echo "http://localhost"
echo ""
echo "Useful commands:"
echo "- View logs: docker-compose logs -f"
echo "- Stop containers: docker-compose down"
echo "- Run artisan commands: docker-compose exec app php artisan <command>"
echo "- Access MySQL: docker-compose exec mysql mysql -u laravel_user -psecret laravel"
echo "- Access Redis: docker-compose exec redis redis-cli"