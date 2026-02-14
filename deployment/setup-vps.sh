#!/bin/bash
# Education Reforms Bureau - VPS Setup Script
# For Hostinger VPS (Ubuntu 22.04)

set -e

echo "========================================"
echo "Education Reforms Bureau - VPS Setup"
echo "========================================"

# Update system
echo "[1/8] Updating system..."
apt update && apt upgrade -y

# Install essential packages
echo "[2/8] Installing essential packages..."
apt install -y curl wget git nginx python3 python3-pip python3-venv nodejs npm certbot python3-certbot-nginx ufw

# Install Node.js 18 LTS
echo "[3/8] Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
npm install -g yarn

# Configure firewall
echo "[4/8] Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Create app directory
echo "[5/8] Setting up application directory..."
mkdir -p /var/www
cd /var/www

# Clone repository
echo "[6/8] Cloning repository..."
git clone https://github.com/tecsrilankaworldwide/grade5-scholarship-exam.git
cd grade5-scholarship-exam

# Setup Python virtual environment
echo "[7/8] Setting up Python environment..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate

# Setup Node.js frontend
echo "[8/8] Building frontend..."
cd ../frontend
yarn install
yarn build

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Configure /var/www/grade5-scholarship-exam/backend/.env"
echo "2. Configure /var/www/grade5-scholarship-exam/frontend/.env"
echo "3. Run: ./deployment/deploy.sh"
echo "4. Setup SSL: sudo certbot --nginx -d educationreforms.cloud"
echo ""
