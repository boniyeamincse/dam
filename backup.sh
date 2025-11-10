#!/bin/bash

# Backup script for Laravel Docker Compose setup
# This script creates backups of MySQL database and Redis data

# Set variables
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
MYSQL_CONTAINER="laravel_mysql"
REDIS_CONTAINER="laravel_redis"

# Create backup directory
mkdir -p $BACKUP_DIR

echo "Starting backup process..."

# Backup MySQL database
echo "Backing up MySQL database..."
docker exec $MYSQL_CONTAINER mysqldump -u laravel_user -psecret laravel > $BACKUP_DIR/mysql_backup_$DATE.sql

if [ $? -eq 0 ]; then
    echo "MySQL backup completed: $BACKUP_DIR/mysql_backup_$DATE.sql"
else
    echo "MySQL backup failed!"
    exit 1
fi

# Backup Redis data
echo "Backing up Redis data..."
docker exec $REDIS_CONTAINER redis-cli --rdb $BACKUP_DIR/redis_backup_$DATE.rdb

if [ $? -eq 0 ]; then
    echo "Redis backup completed: $BACKUP_DIR/redis_backup_$DATE.rdb"
else
    echo "Redis backup failed!"
fi

# Compress backups
echo "Compressing backups..."
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz -C $BACKUP_DIR mysql_backup_$DATE.sql redis_backup_$DATE.rdb

if [ $? -eq 0 ]; then
    echo "Backup archive created: $BACKUP_DIR/backup_$DATE.tar.gz"
    # Remove individual files after compression
    rm $BACKUP_DIR/mysql_backup_$DATE.sql $BACKUP_DIR/redis_backup_$DATE.rdb
else
    echo "Compression failed!"
fi

echo "Backup process completed!"

# Optional: Clean up old backups (keep last 7 days)
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete
echo "Old backups cleaned up (kept last 7 days)"