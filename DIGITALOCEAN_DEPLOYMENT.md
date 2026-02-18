# DigitalOcean Production Deployment Guide
## Grade 5 Scholarship Examination Platform

**Target Domain:** educationreforms.cloud  
**Expected Load:** 1000+ concurrent users  
**Tech Stack:** FastAPI (Python), React (JavaScript), MongoDB Atlas

---

## Prerequisites

1. **DigitalOcean Droplet:**
   - Minimum: 4 GB RAM / 2 vCPUs / 80 GB SSD
   - Recommended: 8 GB RAM / 4 vCPUs / 160 GB SSD (for 1000+ users)
   - OS: Ubuntu 22.04 LTS

2. **Domain:**
   - Domain name pointed to your droplet IP
   - DNS A records configured

3. **MongoDB Atlas:**
   - M10 or higher cluster (for production workload)
   - Connection string ready

4. **SSL Certificate:**
   - Let's Encrypt (free) via Certbot

---

## Step 1: Initial Server Setup

### 1.1 Connect to Your Droplet

```bash
ssh root@YOUR_DROPLET_IP
```

### 1.2 Update System

```bash
apt update && apt upgrade -y
```

### 1.3 Create Application User

```bash
adduser examadmin
usermod -aG sudo examadmin
su - examadmin
```

### 1.4 Install Required Software

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
sudo npm install -g yarn

# Install Python 3.11
sudo apt install -y software-properties-common
sudo add-apt-repository -y ppa:deadsnakes/ppa
sudo apt update
sudo apt install -y python3.11 python3.11-venv python3.11-dev

# Install nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Install PM2 for process management
sudo npm install -g pm2

# Install build essentials
sudo apt install -y build-essential libssl-dev libffi-dev
```

---

## Step 2: Deploy Application Code

### 2.1 Create Application Directory

```bash
cd /home/examadmin
mkdir -p grade5-exam-app
cd grade5-exam-app
```

### 2.2 Clone or Upload Your Code

**Option A: Git Clone (if you have a private repo)**
```bash
git clone https://github.com/tecsrilankaworldwide/grade5-scholarship-exam.git .
```

**Option B: Upload via SCP from your local machine**
```bash
# From your local machine
scp -r /path/to/your/app/* examadmin@YOUR_DROPLET_IP:/home/examadmin/grade5-exam-app/
```

### 2.3 Set Up Backend

```bash
cd /home/examadmin/grade5-exam-app/backend

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

### 2.4 Configure Backend Environment

```bash
# Create production .env file
cp .env.production .env
nano .env
```

**Edit `.env` with your production values:**
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME_EXAM=exam_bureau_db
SECRET_KEY=CHANGE-TO-RANDOM-STRING-MIN-32-CHARS-USE-openssl-rand-hex-32
CORS_ORIGINS=https://educationreforms.cloud,https://www.educationreforms.cloud
```

**Generate a secure SECRET_KEY:**
```bash
openssl rand -hex 32
```

### 2.5 Set Up Frontend

```bash
cd /home/examadmin/grade5-exam-app/frontend

# Create production .env file
cp .env.production .env
nano .env
```

**Edit `.env`:**
```env
REACT_APP_BACKEND_URL=https://educationreforms.cloud
```

**Install dependencies and build:**
```bash
yarn install
yarn build
```

This creates a production build in `/home/examadmin/grade5-exam-app/frontend/build`

---

## Step 3: Configure PM2 for Backend

### 3.1 Create PM2 Ecosystem File

```bash
cd /home/examadmin/grade5-exam-app
nano ecosystem.config.js
```

**Content:**
```javascript
module.exports = {
  apps: [{
    name: 'exam-backend',
    cwd: '/home/examadmin/grade5-exam-app/backend',
    script: 'venv/bin/uvicorn',
    args: 'server:app --host 0.0.0.0 --port 8001 --workers 4',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PYTHONPATH: '/home/examadmin/grade5-exam-app/backend'
    },
    error_file: '/home/examadmin/grade5-exam-app/logs/backend-error.log',
    out_file: '/home/examadmin/grade5-exam-app/logs/backend-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

### 3.2 Create Logs Directory

```bash
mkdir -p /home/examadmin/grade5-exam-app/logs
```

### 3.3 Start Backend with PM2

```bash
cd /home/examadmin/grade5-exam-app
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Run the command that PM2 outputs for startup script.

### 3.4 Verify Backend is Running

```bash
pm2 status
pm2 logs exam-backend
curl http://localhost:8001/api/
```

Should return: `{"message":"Examination Evaluation Bureau API","version":"1.0.0","status":"operational"}`

---

## Step 4: Configure Nginx

### 4.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/educationreforms.cloud
```

**Content:**
```nginx
# Rate limiting zone
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

# Upstream backend
upstream backend_api {
    server 127.0.0.1:8001;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name educationreforms.cloud www.educationreforms.cloud;

    # Redirect HTTP to HTTPS (will be configured after SSL)
    # return 301 https://$server_name$request_uri;

    # Client upload size (for PDF uploads)
    client_max_body_size 50M;

    # Frontend static files
    root /home/examadmin/grade5-exam-app/frontend/build;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # API Backend proxy
    location /api/ {
        # Rate limiting
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
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Frontend React app
    location / {
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

### 4.2 Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/educationreforms.cloud /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4.3 Test HTTP Access

Visit `http://YOUR_DROPLET_IP` in browser. You should see the application.

---

## Step 5: SSL Configuration with Let's Encrypt

### 5.1 Obtain SSL Certificate

```bash
sudo certbot --nginx -d educationreforms.cloud -d www.educationreforms.cloud
```

Follow prompts:
- Enter email
- Agree to terms
- Choose to redirect HTTP to HTTPS (option 2)

### 5.2 Verify SSL

Certbot automatically modifies nginx config. Check:
```bash
sudo nano /etc/nginx/sites-available/educationreforms.cloud
```

You should see SSL configuration added.

### 5.3 Test Auto-Renewal

```bash
sudo certbot renew --dry-run
```

---

## Step 6: Firewall Configuration

### 6.1 Configure UFW

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## Step 7: MongoDB Atlas Setup

### 7.1 Whitelist Droplet IP

1. Go to MongoDB Atlas dashboard
2. Network Access → Add IP Address
3. Add your droplet's public IP
4. Or add `0.0.0.0/0` (less secure but simpler for testing)

### 7.2 Create Database User

1. Database Access → Add New Database User
2. Create user with read/write permissions
3. Save credentials

### 7.3 Get Connection String

1. Clusters → Connect → Connect your application
2. Copy connection string
3. Replace `<password>` with actual password
4. Update in `/home/examadmin/grade5-exam-app/backend/.env`

### 7.4 Restart Backend

```bash
pm2 restart exam-backend
pm2 logs exam-backend
```

Check logs for "Database indexes created" message.

---

## Step 8: Testing & Verification

### 8.1 Health Checks

```bash
# Backend API
curl https://educationreforms.cloud/api/

# Frontend
curl https://educationreforms.cloud/

# PM2 status
pm2 status
pm2 monit
```

### 8.2 Test Login

1. Visit `https://educationreforms.cloud`
2. Login with test credentials:
   - Student: student@test.com / student123
   - Teacher: teacher@test.com / teacher123
   - Parent: parent@test.com / parent123
   - Admin: admin@test.com / admin123

### 8.3 Monitor Logs

```bash
# Backend logs
pm2 logs exam-backend --lines 100

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Step 9: Performance Optimization

### 9.1 Enable Nginx Caching

```bash
sudo nano /etc/nginx/nginx.conf
```

Add inside `http` block:
```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=100m inactive=60m use_temp_path=off;
```

### 9.2 Increase Backend Workers

For 1000+ concurrent users, edit ecosystem.config.js:
```javascript
args: 'server:app --host 0.0.0.0 --port 8001 --workers 8',
```

Restart:
```bash
pm2 restart exam-backend
```

### 9.3 Enable HTTP/2

Edit nginx config:
```nginx
listen 443 ssl http2;
listen [::]:443 ssl http2;
```

---

## Step 10: Backup Strategy

### 10.1 MongoDB Atlas Automatic Backups

- Enable in Atlas dashboard (usually enabled by default on M10+)
- Configure retention period (7-30 days)

### 10.2 Application Code Backup

```bash
# Create backup script
nano /home/examadmin/backup.sh
```

**Content:**
```bash
#!/bin/bash
BACKUP_DIR="/home/examadmin/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/exam-app-$DATE.tar.gz /home/examadmin/grade5-exam-app

# Keep only last 7 backups
cd $BACKUP_DIR
ls -t | tail -n +8 | xargs -r rm
```

```bash
chmod +x /home/examadmin/backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
```

Add line:
```
0 2 * * * /home/examadmin/backup.sh
```

---

## Step 11: Monitoring & Maintenance

### 11.1 Set Up PM2 Monitoring

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### 11.2 Resource Monitoring

```bash
# Install htop
sudo apt install -y htop

# Monitor resources
htop

# Check disk usage
df -h

# Check memory
free -h
```

### 11.3 Set Up Alerts (Optional)

Use DigitalOcean monitoring or tools like:
- UptimeRobot (free, monitors uptime)
- New Relic (application performance)
- Datadog (infrastructure monitoring)

---

## Common Issues & Solutions

### Issue 1: 502 Bad Gateway

**Cause:** Backend not running

**Solution:**
```bash
pm2 restart exam-backend
pm2 logs exam-backend
```

### Issue 2: Frontend Shows 404

**Cause:** React router not configured in nginx

**Solution:** Check `try_files` directive in nginx config

### Issue 3: CORS Errors

**Cause:** Domain not in CORS_ORIGINS

**Solution:**
```bash
cd /home/examadmin/grade5-exam-app/backend
nano .env
# Update CORS_ORIGINS=https://educationreforms.cloud,https://www.educationreforms.cloud
pm2 restart exam-backend
```

### Issue 4: MongoDB Connection Failed

**Cause:** IP not whitelisted or wrong credentials

**Solution:**
1. Check Atlas Network Access
2. Verify connection string in .env
3. Test connection: `mongo "your-connection-string"`

### Issue 5: Out of Memory

**Cause:** Droplet too small for load

**Solution:**
1. Upgrade droplet size
2. Or reduce PM2 workers
3. Add swap space:
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## Updating Application

### Update from Git:

```bash
cd /home/examadmin/grade5-exam-app
git pull origin main

# Update backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
pm2 restart exam-backend

# Update frontend
cd ../frontend
yarn install
yarn build

# No need to restart nginx - static files are updated
```

---

## Production Checklist

- [ ] Domain DNS configured and propagated
- [ ] MongoDB Atlas M10+ cluster created
- [ ] Droplet sized appropriately (8GB+ for 1000 users)
- [ ] SSL certificate installed and auto-renewal configured
- [ ] Firewall (UFW) configured
- [ ] SECRET_KEY changed from default
- [ ] CORS_ORIGINS configured with production domain
- [ ] PM2 startup script enabled
- [ ] Nginx rate limiting configured
- [ ] Backup strategy implemented
- [ ] Test accounts created for all roles
- [ ] Sample exams created and published
- [ ] Monitoring tools set up
- [ ] Load testing performed
- [ ] All features tested on production URL

---

## Support

For issues:
1. Check PM2 logs: `pm2 logs exam-backend`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Check application is responding: `curl http://localhost:8001/api/`

---

**Deployment completed!** 🎉

Your application should now be live at: https://educationreforms.cloud
