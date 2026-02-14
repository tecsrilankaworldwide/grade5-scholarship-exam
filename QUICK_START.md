# 🚀 Quick Start - Deploy in 15 Minutes

## Prerequisites Checklist
- [ ] DigitalOcean Account (https://digitalocean.com)
- [ ] MongoDB Atlas Account (https://mongodb.com/cloud/atlas)
- [ ] GitHub Token (for DigitalOcean)

---

## Step 1: MongoDB Atlas (5 minutes)
1. Create M10 Cluster in Singapore region
2. Allow access from anywhere (0.0.0.0/0)
3. Create database user: `examadmin`
4. Copy connection string: `mongodb+srv://examadmin:PASSWORD@...`

**Cost: $57/month**

---

## Step 2: DigitalOcean (8 minutes)
1. Create App from GitHub
2. Select: `tecsrilankaworldwide/grade5-scholarship-exam`
3. Configure Backend:
   - 3 instances @ Professional XS
   - Add environment variables (see below)
4. Configure Frontend:
   - 1 instance @ Basic XXS
5. Deploy!

**Cost: $41/month**

---

## Step 3: Environment Variables (2 minutes)

### Backend Variables:
```bash
MONGO_URL=mongodb+srv://examadmin:YOUR_PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME_EXAM=exam_bureau_db
SECRET_KEY=<run: python -c "import secrets; print(secrets.token_urlsafe(32))">
CORS_ORIGINS=*
```

### Frontend Variables:
```bash
REACT_APP_BACKEND_URL=${backend.PUBLIC_URL}
```

---

## Step 4: Initialize Data (2 minutes)
In DigitalOcean Console:
```bash
python create_sample_data.py
```

---

## ✅ Done! Your App is Live

**Total Cost: $98/month**
**Capacity: 1000+ concurrent users**
**Region: Singapore (low latency for Sri Lanka)**

**Test Credentials:**
- Student: student@test.com / student123
- Teacher: teacher@exambureau.com / teacher123
- Parent: parent@test.com / parent123
- Admin: admin@exambureau.com / admin123

---

## Quick Links
- 📖 Full Guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- 🐙 Repository: https://github.com/tecsrilankaworldwide/grade5-scholarship-exam
- 🎯 DigitalOcean: https://cloud.digitalocean.com
- 🍃 MongoDB Atlas: https://cloud.mongodb.com

---

## Troubleshooting

**App won't start?**
→ Check environment variables are set correctly

**Database connection error?**
→ Verify MongoDB Atlas network access allows 0.0.0.0/0

**Frontend can't connect to backend?**
→ Verify REACT_APP_BACKEND_URL is set to ${backend.PUBLIC_URL}

**Slow performance?**
→ Check if backend scaled up (should auto-scale to 6 instances under load)

---

## Support
- DigitalOcean Support: https://digitalocean.com/support
- MongoDB Support: https://support.mongodb.com
- GitHub Issues: https://github.com/tecsrilankaworldwide/grade5-scholarship-exam/issues
