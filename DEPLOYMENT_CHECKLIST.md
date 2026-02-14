# 🚀 AWS Deployment Checklist
## Grade 5 Scholarship Exam Platform → educationreforms.cloud

---

## Pre-Deployment Preparation

### ✅ Phase 1: Database Setup (MongoDB Atlas)
- [ ] Create MongoDB Atlas account
- [ ] Create M10 Cluster in Singapore (ap-southeast-1)
- [ ] Configure Network Access (0.0.0.0/0)
- [ ] Create database user: `exam_admin`
- [ ] Save connection string securely
- [ ] Test connection from local machine

**Estimated Time:** 15 minutes  
**Cost:** $57/month

---

### ✅ Phase 2: AWS Account Setup
- [ ] Create/login to AWS account
- [ ] Enable billing alerts
- [ ] Choose Singapore region (ap-southeast-1)
- [ ] Create IAM user with appropriate permissions (if needed)
- [ ] Generate EC2 key pair for SSH access

**Estimated Time:** 10 minutes  
**Cost:** Free

---

### ✅ Phase 3: SSL Certificate Request
- [ ] Go to AWS Certificate Manager (us-east-1 region)
- [ ] Request certificate for:
  - `educationreforms.cloud`
  - `*.educationreforms.cloud`
- [ ] Choose DNS validation
- [ ] Copy CNAME records
- [ ] Add CNAME records to Hostinger DNS
- [ ] Wait for validation (5-30 minutes)

**Estimated Time:** 30-45 minutes (mostly waiting)  
**Cost:** Free

---

## Backend Deployment

### ✅ Phase 4: EC2 Template Instance
- [ ] Launch EC2 instance (Ubuntu 22.04, t3.medium)
- [ ] Configure security group (ports: 22, 80, 443, 8002)
- [ ] SSH into instance
- [ ] Install dependencies (Python 3.11, Nginx, Git)
- [ ] Clone GitHub repository
- [ ] Create Python virtual environment
- [ ] Install requirements.txt
- [ ] Create `.env` file with production variables
- [ ] Create systemd service file
- [ ] Start backend service
- [ ] Configure Nginx reverse proxy
- [ ] Test backend: `curl http://localhost:8002/api/health`

**Estimated Time:** 30-45 minutes  
**Cost:** ~$30/month (per instance)

---

### ✅ Phase 5: Create AMI & Auto Scaling
- [ ] Stop running applications on template instance
- [ ] Create AMI from template instance
- [ ] Wait for AMI creation (5-10 minutes)
- [ ] Create Application Load Balancer
- [ ] Create Target Group (health check: `/api/health`)
- [ ] Create Launch Template using AMI
- [ ] Create Auto Scaling Group:
  - Desired: 2
  - Min: 2
  - Max: 6
  - Target: 70% CPU
- [ ] Wait for instances to launch (5 minutes)
- [ ] Verify instances are healthy in target group

**Estimated Time:** 30 minutes  
**Cost:** $60-180/month (2-6 instances) + $20/month (ALB)

---

## Frontend Deployment

### ✅ Phase 6: Build & Deploy React App
- [ ] Update `/frontend/.env.production`:
  ```
  REACT_APP_BACKEND_URL=https://api.educationreforms.cloud
  ```
- [ ] Run `yarn build` locally
- [ ] Create S3 bucket: `educationreforms-cloud-frontend`
- [ ] Enable static website hosting
- [ ] Add bucket policy (public read access)
- [ ] Upload build files to S3
- [ ] Test S3 website URL

**Estimated Time:** 15 minutes  
**Cost:** $1-5/month

---

### ✅ Phase 7: CloudFront CDN
- [ ] Create CloudFront distribution
- [ ] Set S3 bucket as origin
- [ ] Add alternate domains:
  - `educationreforms.cloud`
  - `www.educationreforms.cloud`
- [ ] Attach SSL certificate from ACM
- [ ] Configure custom error responses (403/404 → index.html)
- [ ] Wait for deployment (10-15 minutes)
- [ ] Copy CloudFront distribution domain

**Estimated Time:** 20 minutes  
**Cost:** $5-10/month

---

## DNS Configuration

### ✅ Phase 8: Update Hostinger DNS
- [ ] Login to Hostinger
- [ ] Go to educationreforms.cloud → DNS settings
- [ ] Delete existing A records (if any)
- [ ] Add CNAME records:

| Type  | Name | Value                                           |
|-------|------|-------------------------------------------------|
| CNAME | @    | d1234abcd.cloudfront.net                        |
| CNAME | www  | d1234abcd.cloudfront.net                        |
| CNAME | api  | exam-backend-alb-xxx.ap-southeast-1.elb.amazonaws.com |

- [ ] Save DNS changes
- [ ] Wait for propagation (15 mins - 48 hours)
- [ ] Test with: https://dnschecker.org

**Estimated Time:** 10 minutes (+ propagation wait)  
**Cost:** $0

---

## Production Initialization

### ✅ Phase 9: Database Initialization
- [ ] SSH into any backend EC2 instance
- [ ] Navigate to backend directory
- [ ] Activate virtual environment
- [ ] Run: `python create_sample_data.py`
- [ ] Verify sample data in MongoDB Atlas dashboard
- [ ] Test API endpoints:
  ```bash
  curl https://api.educationreforms.cloud/api/health
  curl -X POST https://api.educationreforms.cloud/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"student@test.com","password":"student123"}'
  ```

**Estimated Time:** 10 minutes  
**Cost:** $0

---

## Testing & Verification

### ✅ Phase 10: End-to-End Testing
- [ ] Open: `https://educationreforms.cloud`
- [ ] Verify SSL certificate (green padlock)
- [ ] Test login as Student (`student@test.com` / `student123`)
- [ ] Take a sample exam
- [ ] Submit exam and check results
- [ ] Test login as Teacher (`teacher@test.com` / `teacher123`)
- [ ] Create a new exam
- [ ] Mark Paper 2 submissions
- [ ] Test login as Parent (`parent@test.com` / `parent123`)
- [ ] View child's progress reports
- [ ] Test login as Admin (`admin@test.com` / `admin123`)
- [ ] Manage users
- [ ] View analytics
- [ ] Test on mobile devices
- [ ] Test with 10-20 concurrent users

**Estimated Time:** 1-2 hours  
**Cost:** $0

---

### ✅ Phase 11: Load Testing (Optional)
- [ ] Install load testing tool (Locust/JMeter)
- [ ] Create test scenarios
- [ ] Run load test with 100 users
- [ ] Monitor CloudWatch metrics
- [ ] Verify Auto Scaling triggers
- [ ] Test with 500 users
- [ ] Test with 1000 users
- [ ] Document performance metrics

**Estimated Time:** 2-3 hours  
**Cost:** $0

---

## Monitoring & Security

### ✅ Phase 12: Setup Monitoring
- [ ] Configure CloudWatch alarms:
  - EC2 CPU > 80%
  - ALB 5xx errors > 10
  - ALB response time > 2s
  - Auto Scaling instance count
- [ ] Setup SNS notifications (email/SMS)
- [ ] Enable CloudWatch Logs for backend
- [ ] Configure MongoDB Atlas alerts
- [ ] Setup log retention policies

**Estimated Time:** 30 minutes  
**Cost:** $5-10/month

---

### ✅ Phase 13: Security Hardening
- [ ] Change all default passwords
- [ ] Generate new SECRET_KEY
- [ ] Restrict SSH access to your IP only
- [ ] Enable AWS WAF on ALB (optional)
- [ ] Configure rate limiting
- [ ] Enable MongoDB Atlas backup
- [ ] Review IAM permissions
- [ ] Enable MFA for AWS account

**Estimated Time:** 30 minutes  
**Cost:** $0-20/month (WAF if enabled)

---

## Documentation & Handoff

### ✅ Phase 14: Create Documentation
- [ ] Document all AWS resources created
- [ ] Save all credentials securely
- [ ] Create troubleshooting guide
- [ ] Document backup procedures
- [ ] Create user onboarding guide
- [ ] Document scaling procedures
- [ ] Create incident response plan

**Estimated Time:** 1-2 hours  
**Cost:** $0

---

## Summary

### Total Deployment Time
- **Hands-on work:** 6-8 hours
- **Waiting time:** 1-2 hours (DNS, deployments)
- **Testing:** 2-3 hours
- **Total:** 9-13 hours (can be done in 1-2 days)

### Monthly Cost Breakdown
| Service | Cost |
|---------|------|
| MongoDB Atlas M10 | $57 |
| EC2 Auto Scaling (avg 3 instances) | $90 |
| Application Load Balancer | $20 |
| S3 + CloudFront | $10 |
| Route 53 (optional) | $5 |
| CloudWatch | $5 |
| **Total** | **$187/month** |

### Capacity
- ✅ **1000+ concurrent users**
- ✅ **Auto-scaling (2-6 instances)**
- ✅ **High availability (multi-AZ)**
- ✅ **Global CDN delivery**
- ✅ **99.9% uptime SLA**

---

## Quick Commands Reference

### SSH to Backend
```bash
ssh -i your-key.pem ubuntu@<EC2_IP>
```

### Check Backend Service
```bash
sudo systemctl status exam-backend
sudo journalctl -u exam-backend -f
```

### Update Backend Code
```bash
cd /home/ubuntu/grade5-scholarship-exam
git pull origin main
sudo systemctl restart exam-backend
```

### Upload Frontend
```bash
cd frontend
yarn build
aws s3 sync build/ s3://educationreforms-cloud-frontend --delete
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```

### Test API
```bash
curl https://api.educationreforms.cloud/api/health
```

---

## Support Contacts

- **AWS Support:** https://aws.amazon.com/support
- **MongoDB Atlas:** https://support.mongodb.com
- **Hostinger:** https://hostinger.com/contact
- **GitHub Repo:** https://github.com/tecsrilankaworldwide/grade5-scholarship-exam

---

## 🎉 Ready to Deploy!

Follow this checklist step by step, and you'll have a production-ready exam platform deployed on AWS in 1-2 days!

**Good luck! 🚀**
