#!/bin/bash

# Quick Deploy Script for DigitalOcean
# Usage: bash QUICK_DEPLOY.sh

set -e

echo "=================================="
echo "Grade 5 Exam Platform - Quick Deploy"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then
  echo -e "${RED}Please do not run as root. Run as your application user (e.g., examadmin)${NC}"
  exit 1
fi

echo -e "${GREEN}Step 1: Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

echo -e "${GREEN}Step 2: Installing required software...${NC}"
# Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Yarn
sudo npm install -g yarn

# Python 3.11
sudo apt install -y software-properties-common
sudo add-apt-repository -y ppa:deadsnakes/ppa
sudo apt update
sudo apt install -y python3.11 python3.11-venv python3.11-dev

# Nginx
sudo apt install -y nginx

# PM2
sudo npm install -g pm2

# Build tools
sudo apt install -y build-essential libssl-dev libffi-dev

# Certbot
sudo apt install -y certbot python3-certbot-nginx

echo -e "${GREEN}Step 3: Creating application directory...${NC}"
mkdir -p ~/grade5-exam-app
cd ~/grade5-exam-app

echo -e "${YELLOW}Step 4: Clone your repository${NC}"
echo "Run: git clone https://github.com/tecsrilankaworldwide/grade5-scholarship-exam.git ."
echo "Or upload your code via SCP"
echo "Press enter when code is ready..."
read

if [ ! -f "backend/server.py" ]; then
  echo -e "${RED}Error: backend/server.py not found. Please clone/upload the code first.${NC}"
  exit 1
fi

echo -e "${GREEN}Step 5: Setting up backend...${NC}"
cd ~/grade5-exam-app/backend
python3.11 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo -e "${YELLOW}Step 6: Configure backend .env${NC}"
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo -e "${RED}IMPORTANT: Edit backend/.env with your MongoDB Atlas URL and SECRET_KEY${NC}"
  echo "Press enter when done..."
  read
fi

echo -e "${GREEN}Step 7: Setting up frontend...${NC}"
cd ~/grade5-exam-app/frontend
yarn install

echo -e "${YELLOW}Step 8: Configure frontend .env${NC}"
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo -e "${RED}IMPORTANT: Edit frontend/.env with your production domain${NC}"
  echo "Press enter when done..."
  read
fi

echo -e "${GREEN}Step 9: Building frontend...${NC}"
yarn build

echo -e "${GREEN}Step 10: Creating PM2 ecosystem...${NC}"
cd ~/grade5-exam-app

cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'exam-backend',
    cwd: process.env.HOME + '/grade5-exam-app/backend',
    script: 'venv/bin/uvicorn',
    args: 'server:app --host 0.0.0.0 --port 8001 --workers 4',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    error_file: process.env.HOME + '/grade5-exam-app/logs/backend-error.log',
    out_file: process.env.HOME + '/grade5-exam-app/logs/backend-out.log'
  }]
};
EOF

mkdir -p ~/grade5-exam-app/logs

echo -e "${GREEN}Step 11: Starting backend with PM2...${NC}"
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo -e "${YELLOW}Run the command above (if any) to enable PM2 startup${NC}"
echo "Press enter to continue..."
read

echo -e "${GREEN}Step 12: Configuring Nginx...${NC}"
DOMAIN="educationreforms.cloud"

sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null << 'EOF'
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

upstream backend_api {
    server 127.0.0.1:8001;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name educationreforms.cloud www.educationreforms.cloud;

    client_max_body_size 50M;
    root ~/grade5-exam-app/frontend/build;
    index index.html;

    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass http://backend_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Fix the root path
sudo sed -i "s|~/grade5-exam-app|$HOME/grade5-exam-app|g" /etc/nginx/sites-available/$DOMAIN

sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

echo -e "${GREEN}Step 13: Configuring firewall...${NC}"
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo -e "${GREEN}Step 14: Setting up SSL...${NC}"
echo "Run: sudo certbot --nginx -d educationreforms.cloud -d www.educationreforms.cloud"
echo "Press enter when done..."
read

echo ""
echo -e "${GREEN}==================================${NC}"
echo -e "${GREEN}Deployment Complete! 🎉${NC}"
echo -e "${GREEN}==================================${NC}"
echo ""
echo "Your application should now be running at:"
echo "https://educationreforms.cloud"
echo ""
echo "Useful commands:"
echo "  pm2 status              - Check backend status"
echo "  pm2 logs exam-backend   - View backend logs"
echo "  pm2 restart exam-backend - Restart backend"
echo "  sudo systemctl status nginx - Check nginx status"
echo ""
echo "Test credentials:"
echo "  Student: student@test.com / student123"
echo "  Teacher: teacher@test.com / teacher123"
echo "  Parent: parent@test.com / parent123"
echo "  Admin: admin@test.com / admin123"
echo ""
