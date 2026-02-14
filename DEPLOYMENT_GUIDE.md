# DigitalOcean Deployment Guide - Grade 5 Scholarship Exam Platform

## 🚀 Quick Deployment Steps

### Prerequisites
1. DigitalOcean Account: https://digitalocean.com
2. MongoDB Atlas Account: https://mongodb.com/cloud/atlas
3. GitHub repository: https://github.com/tecsrilankaworldwide/grade5-scholarship-exam

---

## Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Cluster
1. Go to https://mongodb.com/cloud/atlas
2. Sign up / Login
3. Click "Build a Database"
4. Select **M10 Cluster** ($57/month)
   - Region: **Singapore** (sgp1) - closest to Sri Lanka
   - Provider: AWS
5. Cluster Name: `grade5-exam-cluster`

### 1.2 Configure Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.3 Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Username: `examadmin`
4. Password: Generate strong password (save it!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### 1.4 Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string:
   ```
   mongodb+srv://examadmin:<password>@grade5-exam-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Save this connection string securely!

---

## Step 2: Deploy to DigitalOcean App Platform

### 2.1 Create App
1. Go to https://cloud.digitalocean.com
2. Click "Create" → "Apps"
3. Select "GitHub" as source
4. Authorize DigitalOcean to access your GitHub
5. Select repository: `tecsrilankaworldwide/grade5-scholarship-exam`
6. Branch: `main`
7. Auto-deploy on push: **Enabled**

### 2.2 Configure Backend Service
1. DigitalOcean will detect your app structure
2. Configure Backend:
   - **Name:** backend
   - **Source Directory:** `/backend`
   - **Build Command:** (leave empty)
   - **Run Command:** `gunicorn -c gunicorn.conf.py server:app`
   - **HTTP Port:** 8002
   - **HTTP Routes:** `/api`
   - **Instance Size:** Professional XS ($12/month)
   - **Instance Count:** 3 (for load balancing)

3. Add Environment Variables (click "Edit" next to backend):
   ```
   MONGO_URL = mongodb+srv://examadmin:<password>@grade5-exam-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   DB_NAME_EXAM = exam_bureau_db
   SECRET_KEY = <generate-random-string-here>
   CORS_ORIGINS = *
   ```

   To generate SECRET_KEY, use:
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```

### 2.3 Configure Frontend Service
1. Configure Frontend:
   - **Name:** frontend
   - **Source Directory:** `/frontend`
   - **Build Command:** `yarn build`
   - **Run Command:** (leave default)
   - **HTTP Port:** 3000
   - **HTTP Routes:** `/`
   - **Instance Size:** Basic XXS ($5/month)
   - **Instance Count:** 1

2. Add Environment Variable:
   ```
   REACT_APP_BACKEND_URL = ${backend.PUBLIC_URL}
   ```
   (This automatically gets backend URL)

### 2.4 Configure Region
1. Select Region: **Singapore (sgp1)** - closest to Sri Lanka for low latency

### 2.5 Review & Deploy
1. Review your configuration:
   - Backend: 3 instances @ $12 = $36/month
   - Frontend: 1 instance @ $5 = $5/month
   - **Total: ~$41/month** + MongoDB Atlas ($57/month) = **$98/month**

2. Click "Create Resources"
3. Wait 5-10 minutes for deployment

---

## Step 3: Initialize Database with Sample Data

### 3.1 Access Backend Console
1. In DigitalOcean dashboard, go to your app
2. Click on "backend" component
3. Click "Console" tab
4. Click "Launch Console"

### 3.2 Run Sample Data Script
```bash
python create_sample_data.py
```

This creates:
- Admin: admin@exambureau.com / admin123
- Teacher: teacher@exambureau.com / teacher123
- Student: student@test.com / student123
- Parent: parent@test.com / parent123
- Sample exam with 60 questions

---

## Step 4: Access Your Application

Your app will be available at:
```
https://<your-app-name>-xxxxx.ondigitalocean.app
```

**Test it:**
1. Open the URL
2. Login with student credentials
3. Take a test exam
4. Verify everything works!

---

## Step 5: Custom Domain (Optional)

### 5.1 Add Domain
1. In DigitalOcean App settings
2. Go to "Settings" → "Domains"
3. Click "Add Domain"
4. Enter your domain: `exams.tecaikids.com`
5. Add DNS records as shown:
   ```
   Type: CNAME
   Name: exams
   Value: <your-app>.ondigitalocean.app
   ```

### 5.2 Enable HTTPS
- DigitalOcean automatically provides free SSL certificate
- Wait 5-10 minutes for SSL to activate

---

## Step 6: Performance Optimization

### 6.1 Enable CDN (Free)
1. In App settings → "Settings"
2. Enable "Static Asset Caching"
3. This caches frontend files globally

### 6.2 Monitor Performance
1. Go to "Insights" tab in DigitalOcean
2. Monitor:
   - CPU usage
   - Memory usage
   - Request rate
   - Response times

### 6.3 Auto-Scaling Setup
Your backend already has auto-scaling configured:
- Min instances: 2
- Max instances: 6
- Scales up when CPU > 80%

---

## Step 7: Testing with 1000+ Users

### Load Testing Recommendations:
1. Use tools like Apache JMeter or Locust
2. Simulate exam-taking scenarios:
   - Login
   - Start exam
   - Answer questions (auto-save every 30 seconds)
   - Submit exam

### Expected Performance:
- 1000 concurrent users: Smooth operation
- Response time: < 200ms for API calls
- Auto-save: < 100ms
- Exam submission: < 500ms

---

## Estimated Monthly Costs

| Service | Configuration | Cost |
|---------|---------------|------|
| **DigitalOcean Backend** | 3x Professional XS | $36/month |
| **DigitalOcean Frontend** | 1x Basic XXS | $5/month |
| **MongoDB Atlas** | M10 Cluster | $57/month |
| **Bandwidth** | First 1TB Free | $0 |
| **CDN** | Included | $0 |
| **SSL Certificate** | Included | $0 |
| **Total** | | **$98/month** |

### Cost per User:
- With 1000 users: **$0.098 per user/month**
- Very affordable for educational platform!

---

## Backup & Disaster Recovery

### MongoDB Atlas Automatic Backups:
- Continuous backups every 6-24 hours
- Point-in-time recovery
- Download backups anytime
- Keep backups for 30 days

### DigitalOcean App Backups:
- GitHub integration means your code is always backed up
- Re-deploy from GitHub anytime
- Rollback to previous deployments easily

---

## Support & Monitoring

### DigitalOcean Support:
- 24/7 ticket support
- Live chat for urgent issues
- Community forums

### MongoDB Atlas Support:
- 24/7 ticket support for paid clusters
- Comprehensive documentation

### Set up Alerts:
1. In DigitalOcean: Settings → Alerts
2. Add alerts for:
   - CPU > 80%
   - Memory > 90%
   - HTTP 5xx errors
   - Deployment failures

---

## Security Best Practices

✅ Already Implemented:
- MongoDB authentication required
- JWT token authentication
- Password hashing with bcrypt
- HTTPS enabled
- CORS configured

🔒 Additional Recommendations:
1. Change all default passwords after deployment
2. Use strong SECRET_KEY (generated randomly)
3. Regularly update dependencies
4. Monitor access logs
5. Enable MongoDB IP whitelist (optional)

---

## Troubleshooting

### Issue: Backend won't start
**Solution:**
- Check environment variables are set correctly
- Verify MONGO_URL connection string
- Check backend logs in DigitalOcean console

### Issue: Frontend can't connect to backend
**Solution:**
- Verify REACT_APP_BACKEND_URL is set
- Check CORS_ORIGINS includes frontend domain
- Rebuild frontend

### Issue: Database connection errors
**Solution:**
- Verify MongoDB Atlas network access allows 0.0.0.0/0
- Check database user credentials
- Test connection string manually

### Issue: Slow performance
**Solution:**
- Check MongoDB Atlas metrics
- Increase backend instances (scale up to 6)
- Enable CDN for frontend
- Optimize database queries

---

## Scaling for Growth

### 2000+ Users:
- Increase backend to 4-6 instances
- Upgrade MongoDB to M20 ($145/month)
- Total: ~$180/month

### 5000+ Users:
- Increase backend to 8-10 instances
- Upgrade MongoDB to M30 ($270/month)
- Consider dedicated load balancer
- Total: ~$400/month

---

## Next Steps After Deployment

1. ✅ Test all user flows
2. ✅ Conduct load testing
3. ✅ Set up monitoring alerts
4. ✅ Train teachers and admins
5. ✅ Create user documentation
6. ✅ Plan marketing/launch
7. ✅ Collect user feedback

---

## Quick Reference - Important URLs

- **DigitalOcean Dashboard:** https://cloud.digitalocean.com
- **MongoDB Atlas:** https://cloud.mongodb.com
- **GitHub Repository:** https://github.com/tecsrilankaworldwide/grade5-scholarship-exam
- **Your App URL:** Will be provided after deployment

---

## Support Contacts

**For Deployment Issues:**
- DigitalOcean Support: https://digitalocean.com/support
- MongoDB Support: https://support.mongodb.com

**For Application Issues:**
- GitHub Issues: https://github.com/tecsrilankaworldwide/grade5-scholarship-exam/issues

---

**Deployment Ready! 🚀**

Your exam platform is now configured for:
- ✅ 1000+ concurrent users
- ✅ Auto-scaling
- ✅ High availability
- ✅ Low latency (Singapore region)
- ✅ Secure authentication
- ✅ Automatic backups

**Total Time to Deploy: 15-20 minutes**
