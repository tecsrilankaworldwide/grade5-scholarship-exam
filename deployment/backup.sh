#!/bin/bash
# Education Reforms Bureau - Backup Script
# Run this weekly via cron

BACKUP_DIR="/var/backups/grade5-exam"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

echo "Creating backup: $DATE"

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/grade5-scholarship-exam --exclude='node_modules' --exclude='venv' --exclude='build'

# Keep only last 7 backups
ls -t $BACKUP_DIR/app_*.tar.gz | tail -n +8 | xargs -r rm

echo "Backup complete: $BACKUP_DIR/app_$DATE.tar.gz"

# For MongoDB backups, use mongodump with your Atlas connection string:
# mongodump --uri="mongodb+srv://..." --out=$BACKUP_DIR/db_$DATE
