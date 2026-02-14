# Education Reforms Bureau - Deployment Guide
## Hostinger VPS Deployment

### Prerequisites
1. Hostinger VPS KVM 1 or higher ($4.99/month)
2. Domain: educationreforms.cloud
3. MongoDB Atlas account (free tier)

---

## Step 1: Initial VPS Setup

After purchasing Hostinger VPS, SSH into your server:

```bash
ssh root@YOUR_VPS_IP
```

### Run the setup script:
```bash
wget https://raw.githubusercontent.com/tecsrilankaworldwide/grade5-scholarship-exam/main/deployment/setup-vps.sh
chmod +x setup-vps.sh
./setup-vps.sh
```

---

## Step 2: Configure Environment

### Backend (.env)
```bash
cd /var/www/grade5-scholarship-exam/backend
nano .env
```

Add:
```
MONGO_URL=mongodb+srv://YOUR_ATLAS_URL
SECRET_KEY=your-super-secret-key-change-this
CORS_ORIGINS=https://educationreforms.cloud
```

### Frontend (.env)
```bash
cd /var/www/grade5-scholarship-exam/frontend
nano .env
```

Add:
```
REACT_APP_BACKEND_URL=https://educationreforms.cloud/api
```

---

## Step 3: Build and Deploy

```bash
cd /var/www/grade5-scholarship-exam
./deployment/deploy.sh
```

---

## Step 4: SSL Certificate (Free with Let's Encrypt)

```bash
sudo certbot --nginx -d educationreforms.cloud -d www.educationreforms.cloud
```

---

## Useful Commands

### Check service status:
```bash
sudo systemctl status grade5-backend
sudo systemctl status nginx
```

### View logs:
```bash
sudo journalctl -u grade5-backend -f
```

### Restart services:
```bash
sudo systemctl restart grade5-backend
sudo systemctl restart nginx
```

---

## MongoDB Atlas Setup (Free Tier)

1. Go to https://cloud.mongodb.com
2. Create free cluster (M0)
3. Whitelist your VPS IP address
4. Create database user
5. Get connection string

---

## Domain DNS Setup (Hostinger)

1. Go to Hostinger DNS settings for educationreforms.cloud
2. Add A record:
   - Name: @
   - Points to: YOUR_VPS_IP
3. Add A record:
   - Name: www
   - Points to: YOUR_VPS_IP
4. Wait 10-30 minutes for DNS propagation

---

## Performance Optimizations

The app is already optimized for 1000 concurrent users:
- MongoDB connection pooling (100 connections)
- In-memory caching (TTLCache)
- Nginx reverse proxy with caching
- Gzip compression enabled

---

## Support

For issues, contact: admin@educationreforms.cloud
