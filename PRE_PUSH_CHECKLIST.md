# Pre-Push Checklist

## ✅ Before Pushing to GitHub

### 1. Sensitive Files Check
- [ ] Verify `.gitignore` is present and configured
- [ ] Confirm `.env` files are NOT being committed
- [ ] Check no hardcoded secrets in code
- [ ] Verify `backend/.env.example` and `frontend/.env.example` exist

### 2. Code Quality
- [ ] All deployment blockers fixed
- [ ] Backend port set to 8001 (not 8002)
- [ ] File paths use environment variables (not hardcoded)
- [ ] CORS configured to accept production domain

### 3. Documentation
- [ ] README.md is complete and accurate
- [ ] DIGITALOCEAN_DEPLOYMENT.md is present
- [ ] All setup instructions are clear

### 4. Files to Include
- [ ] backend/server.py
- [ ] backend/requirements.txt
- [ ] backend/.env.example (NOT .env)
- [ ] backend/Dockerfile
- [ ] frontend/src/ (all files)
- [ ] frontend/package.json
- [ ] frontend/.env.example (NOT .env)
- [ ] frontend/Dockerfile
- [ ] frontend/nginx.conf
- [ ] docker-compose.yml
- [ ] README.md
- [ ] DIGITALOCEAN_DEPLOYMENT.md
- [ ] .gitignore

### 5. Files to EXCLUDE (should be in .gitignore)
- [ ] backend/.env
- [ ] frontend/.env
- [ ] backend/venv/
- [ ] frontend/node_modules/
- [ ] frontend/build/
- [ ] backend/__pycache__/
- [ ] *.log files
- [ ] test_reports/

---

## 🚀 Push to GitHub Commands

```bash
cd /app

# Check what files will be committed
git status

# Add all files (respecting .gitignore)
git add .

# Review what's being committed (make sure no .env files!)
git status

# Commit changes
git commit -m "Complete Grade 5 Scholarship Exam Platform v2.0

- Added all features: MCQ exams, Paper 2 marking, progress tracking
- Implemented student, teacher, parent, admin, typesetter dashboards
- Added skill tracking across 10 areas
- Multi-language support (Sinhala, Tamil, English)
- Production-ready with DigitalOcean deployment guide
- Fixed all deployment blockers
- Added Docker support
- Created comprehensive documentation"

# Push to GitHub
git push origin main
```

---

## 📦 After Pushing to GitHub

### Deploy to DigitalOcean Droplet (139.59.254.77)

```bash
# SSH into your droplet
ssh root@139.59.254.77

# Create application user if not exists
adduser examadmin
usermod -aG sudo examadmin
su - examadmin

# Clone repository
cd ~
git clone https://github.com/tecsrilankaworldwide/grade5-scholarship-exam.git grade5-exam-app
cd grade5-exam-app

# Run quick deploy script
bash QUICK_DEPLOY.sh

# Or follow manual steps in DIGITALOCEAN_DEPLOYMENT.md
```

---

## 🔑 MongoDB Atlas Setup (Before Deployment)

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Create M10 cluster (Singapore region recommended for Sri Lanka)
3. Database Access → Create user with read/write permissions
4. Network Access → Add IP: `139.59.254.77` (your droplet)
5. Get connection string (Clusters → Connect → Connect your application)
6. Example: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`

---

## ⚙️ Environment Variables for Production

**backend/.env:**
```env
MONGO_URL=mongodb+srv://your-atlas-connection-string
DB_NAME_EXAM=exam_bureau_db
SECRET_KEY=<generate-with-openssl-rand-hex-32>
CORS_ORIGINS=https://educationreforms.cloud,https://www.educationreforms.cloud
```

**frontend/.env:**
```env
REACT_APP_BACKEND_URL=https://educationreforms.cloud
```

**Generate SECRET_KEY:**
```bash
openssl rand -hex 32
```

---

## 🎯 Final Verification

### On Production:
1. Visit: https://educationreforms.cloud
2. Test login with all roles
3. Test exam taking flow
4. Test exam creation
5. Check progress dashboard
6. Verify PDF upload
7. Test on mobile devices

### Monitoring:
```bash
# Check backend status
pm2 status
pm2 logs exam-backend

# Check nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log

# Check resources
htop
df -h
```

---

## 🚨 Emergency Rollback

If deployment fails:

```bash
# Stop services
pm2 stop exam-backend

# Check logs
pm2 logs exam-backend --lines 100

# Revert code
git reset --hard HEAD~1

# Rebuild and restart
cd frontend && yarn build
pm2 restart exam-backend
```

---

## ✅ Post-Deployment Checklist

- [ ] Application loads at https://educationreforms.cloud
- [ ] SSL certificate is active (green padlock)
- [ ] All user roles can login
- [ ] Students can take exams
- [ ] Teachers can create exams
- [ ] Parents can view progress
- [ ] Admin can manage users
- [ ] Typesetters can upload PDFs
- [ ] Multi-language switcher works
- [ ] Mobile responsive
- [ ] PM2 startup enabled
- [ ] Firewall configured
- [ ] Backups scheduled

---

**Ready to push to GitHub and deploy!** 🚀
