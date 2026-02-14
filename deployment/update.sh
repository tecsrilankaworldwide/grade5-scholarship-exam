#!/bin/bash
# Quick update script - pull and deploy without full rebuild

set -e

APP_DIR="/var/www/grade5-scholarship-exam"

echo "Quick Update - Education Reforms Bureau"

cd $APP_DIR
git pull origin main

# Only rebuild frontend if there are changes
cd frontend
yarn install --frozen-lockfile
yarn build

# Restart backend
systemctl restart grade5-backend
nginx -t && systemctl reload nginx

echo "Update complete!"
