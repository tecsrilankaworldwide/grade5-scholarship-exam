#!/bin/bash
# Education Reforms Bureau - Deployment Script

set -e

APP_DIR="/var/www/grade5-scholarship-exam"

echo "========================================"
echo "Deploying Education Reforms Bureau"
echo "========================================"

cd $APP_DIR

# Pull latest changes
echo "[1/5] Pulling latest changes..."
git pull origin main

# Update backend
echo "[2/5] Updating backend..."
cd backend
source venv/bin/activate
pip install -r requirements.txt
deactivate

# Build frontend
echo "[3/5] Building frontend..."
cd ../frontend
yarn install
yarn build

# Setup systemd service
echo "[4/5] Configuring systemd service..."
cat > /etc/systemd/system/grade5-backend.service << 'EOF'
[Unit]
Description=Grade 5 Scholarship Exam Backend
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/grade5-scholarship-exam/backend
EnvironmentFile=/var/www/grade5-scholarship-exam/backend/.env
ExecStart=/var/www/grade5-scholarship-exam/backend/venv/bin/uvicorn server:app --host 0.0.0.0 --port 8001 --workers 4
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# Setup nginx
echo "[5/5] Configuring Nginx..."
cat > /etc/nginx/sites-available/educationreforms << 'EOF'
server {
    listen 80;
    server_name educationreforms.cloud www.educationreforms.cloud;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;

    # Frontend - React build files
    location / {
        root /var/www/grade5-scholarship-exam/frontend/build;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/educationreforms /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Set permissions
chown -R www-data:www-data /var/www/grade5-scholarship-exam

# Reload services
systemctl daemon-reload
systemctl enable grade5-backend
systemctl restart grade5-backend
nginx -t && systemctl restart nginx

echo "========================================"
echo "Deployment Complete!"
echo "========================================"
echo ""
echo "Your site should be live at:"
echo "http://educationreforms.cloud"
echo ""
echo "Don't forget to setup SSL:"
echo "sudo certbot --nginx -d educationreforms.cloud -d www.educationreforms.cloud"
echo ""
