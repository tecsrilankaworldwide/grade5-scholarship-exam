# AWS Deployment Guide - Grade 5 Scholarship Exam Platform
## For educationreforms.cloud domain | 1000+ Peak Users

---

## 🎯 Architecture Overview

**AWS Services Used:**
- **EC2 + Auto Scaling Group**: Backend (FastAPI) - handles 1000+ concurrent users
- **S3 + CloudFront**: Frontend (React) - global CDN delivery
- **MongoDB Atlas**: Database (Singapore region)
- **Route 53**: DNS management for educationreforms.cloud
- **Application Load Balancer**: Distributes traffic across backend instances
- **ElastiCache (Optional)**: Redis for session caching

**Estimated Monthly Cost:** ~$120-150 for 1000+ users

---

## 📋 Prerequisites Checklist

Before you start, ensure you have:

- [ ] AWS Account with billing enabled
- [ ] MongoDB Atlas account (M10 cluster in Singapore)
- [ ] Access to Hostinger domain settings (educationreforms.cloud)
- [ ] GitHub repository access
- [ ] AWS CLI installed (optional but recommended)

---

## Step 1: Setup MongoDB Atlas Database

### 1.1 Create MongoDB Atlas Cluster

1. Go to https://cloud.mongodb.com
2. Create a **M10 Cluster** ($57/month)
   - **Region**: Singapore (ap-southeast-1) - closest to your AWS region
   - **Provider**: AWS
   - **Cluster Name**: `grade5-exam-prod`

### 1.2 Configure Network Access

1. Click **"Network Access"** → **"Add IP Address"**
2. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Note: We'll restrict this to AWS IPs after deployment
3. Click **"Confirm"**

### 1.3 Create Database User

1. Click **"Database Access"** → **"Add New Database User"**
2. **Username**: `exam_admin`
3. **Password**: Generate strong password (SAVE THIS!)
4. **Privileges**: "Read and write to any database"
5. Click **"Add User"**

### 1.4 Get Connection String

1. Click **"Database"** → **"Connect"** → **"Connect your application"**
2. Copy the connection string:
   ```
   mongodb+srv://exam_admin:<password>@grade5-exam-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
3. Replace `<password>` with actual password
4. **SAVE THIS SECURELY!**

---

## Step 2: Prepare Application for Production

### 2.1 Create Production Environment Files

**Backend Environment Variables** (save these, you'll need them):

```bash
# MongoDB
MONGO_URL=mongodb+srv://exam_admin:<password>@grade5-exam-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority
DB_NAME_EXAM=exam_bureau_prod

# Security
SECRET_KEY=<generate-with-command-below>
CORS_ORIGINS=https://educationreforms.cloud,https://www.educationreforms.cloud

# Optional Integrations (if using)
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
EMERGENT_LLM_KEY=your_llm_key_if_using
```

**Generate SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

**Frontend Environment Variables:**
```bash
REACT_APP_BACKEND_URL=https://api.educationreforms.cloud
```

### 2.2 Create Production Build Scripts

These files are already in your repo, but verify they exist:

**Backend**: `/backend/gunicorn.conf.py` ✓
**Frontend**: Standard React build ✓

---

## Step 3: Deploy Backend to AWS EC2 with Auto Scaling

### 3.1 Launch EC2 Instance (Template Instance)

1. **Go to AWS Console** → **EC2** → **Launch Instance**

2. **Configure Instance:**
   - **Name**: `exam-backend-template`
   - **AMI**: Ubuntu Server 22.04 LTS
   - **Instance Type**: `t3.medium` (2 vCPU, 4GB RAM)
   - **Region**: Singapore (ap-southeast-1)

3. **Network Settings:**
   - **VPC**: Default VPC
   - **Subnet**: Public subnet
   - **Auto-assign Public IP**: Yes
   - **Security Group**: Create new
     - Name: `exam-backend-sg`
     - Rules:
       - SSH (22) - Your IP only
       - HTTP (80) - 0.0.0.0/0
       - HTTPS (443) - 0.0.0.0/0
       - Custom TCP (8002) - 0.0.0.0/0 (ALB will use this)

4. **Storage**: 30 GB gp3 SSD

5. **Key Pair**: Create new or use existing (SAVE THE .pem FILE!)

6. Click **"Launch Instance"**

### 3.2 Setup Backend on EC2

**SSH into your instance:**
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
```

**Install Dependencies:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python 3.11
sudo apt install -y python3.11 python3.11-venv python3-pip git nginx

# Install Node.js (for any build tools if needed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Clone your repository
cd /home/ubuntu
git clone https://github.com/tecsrilankaworldwide/grade5-scholarship-exam.git
cd grade5-scholarship-exam/backend

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install Python packages
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn
```

**Create Environment File:**
```bash
nano /home/ubuntu/grade5-scholarship-exam/backend/.env
```

Paste your production environment variables (from Step 2.1), then save (Ctrl+X, Y, Enter)

**Create Systemd Service:**
```bash
sudo nano /etc/systemd/system/exam-backend.service
```

Paste:
```ini
[Unit]
Description=Grade 5 Exam Backend
After=network.target

[Service]
Type=notify
User=ubuntu
WorkingDirectory=/home/ubuntu/grade5-scholarship-exam/backend
Environment="PATH=/home/ubuntu/grade5-scholarship-exam/backend/venv/bin"
ExecStart=/home/ubuntu/grade5-scholarship-exam/backend/venv/bin/gunicorn -c gunicorn.conf.py server:app
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true
Restart=always

[Install]
WantedBy=multi-user.target
```

**Start the Service:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable exam-backend
sudo systemctl start exam-backend
sudo systemctl status exam-backend
```

**Configure Nginx as Reverse Proxy:**
```bash
sudo nano /etc/nginx/sites-available/exam-backend
```

Paste:
```nginx
server {
    listen 80;
    server_name api.educationreforms.cloud;

    location / {
        proxy_pass http://127.0.0.1:8002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts for long-running requests
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/exam-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Test Backend:**
```bash
curl http://localhost:8002/api/health
```

### 3.3 Create AMI from Template Instance

1. **AWS Console** → **EC2** → **Instances**
2. Select `exam-backend-template`
3. **Actions** → **Image and templates** → **Create image**
   - **Name**: `exam-backend-ami-v1`
   - **Description**: "Grade 5 Exam Backend - Production Ready"
4. Click **"Create image"** (takes 5-10 minutes)

### 3.4 Create Application Load Balancer

1. **EC2** → **Load Balancers** → **Create Load Balancer**
2. **Choose**: Application Load Balancer
3. **Configure:**
   - **Name**: `exam-backend-alb`
   - **Scheme**: Internet-facing
   - **IP address type**: IPv4
   - **VPC**: Default VPC
   - **Subnets**: Select at least 2 availability zones

4. **Security Group:**
   - Create new: `exam-alb-sg`
   - Rules:
     - HTTP (80) - 0.0.0.0/0
     - HTTPS (443) - 0.0.0.0/0

5. **Target Group:**
   - **Name**: `exam-backend-tg`
   - **Protocol**: HTTP
   - **Port**: 80
   - **VPC**: Default VPC
   - **Health check path**: `/api/health`
   - **Health check interval**: 30 seconds
   - **Healthy threshold**: 2
   - **Unhealthy threshold**: 3

6. Click **"Create"**

### 3.5 Create Launch Template

1. **EC2** → **Launch Templates** → **Create launch template**
2. **Configure:**
   - **Name**: `exam-backend-lt`
   - **AMI**: Select `exam-backend-ami-v1` (from 3.3)
   - **Instance type**: `t3.medium`
   - **Key pair**: Your SSH key
   - **Security groups**: `exam-backend-sg`
   - **Storage**: 30 GB gp3

3. **Advanced Details** → **User data** (optional, for auto-updates):
```bash
#!/bin/bash
cd /home/ubuntu/grade5-scholarship-exam
git pull origin main
sudo systemctl restart exam-backend
```

4. Click **"Create launch template"**

### 3.6 Create Auto Scaling Group

1. **EC2** → **Auto Scaling Groups** → **Create Auto Scaling group**
2. **Configure:**
   - **Name**: `exam-backend-asg`
   - **Launch template**: `exam-backend-lt`
   
3. **Network:**
   - **VPC**: Default VPC
   - **Subnets**: Select 2+ availability zones

4. **Load Balancing:**
   - Attach to: `exam-backend-alb`
   - Target group: `exam-backend-tg`
   - Health check type: ELB
   - Health check grace period: 300 seconds

5. **Group size:**
   - **Desired**: 2
   - **Minimum**: 2
   - **Maximum**: 6

6. **Scaling Policies:**
   - **Target tracking scaling**
   - **Metric**: Average CPU Utilization
   - **Target value**: 70%
   - **Instances need**: 300 seconds warm-up

7. Click **"Create Auto Scaling group"**

**Your backend is now deployed with auto-scaling! 🎉**

---

## Step 4: Deploy Frontend to S3 + CloudFront

### 4.1 Build React App for Production

**On your local machine:**
```bash
cd frontend

# Update .env.production
echo "REACT_APP_BACKEND_URL=https://api.educationreforms.cloud" > .env.production

# Install dependencies and build
yarn install
yarn build
```

This creates a `/build` folder with optimized production files.

### 4.2 Create S3 Bucket

1. **AWS Console** → **S3** → **Create bucket**
2. **Configure:**
   - **Name**: `educationreforms-cloud-frontend` (must be unique)
   - **Region**: Singapore (ap-southeast-1)
   - **Block all public access**: UNCHECK (we need public access)
   - Acknowledge the warning

3. Click **"Create bucket"**

### 4.3 Enable Static Website Hosting

1. Click on your bucket → **Properties** tab
2. Scroll to **Static website hosting** → **Edit**
3. **Enable** static website hosting
4. **Index document**: `index.html`
5. **Error document**: `index.html` (for React Router)
6. Click **"Save changes"**

### 4.4 Add Bucket Policy

1. **Permissions** tab → **Bucket Policy** → **Edit**
2. Paste:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::educationreforms-cloud-frontend/*"
        }
    ]
}
```
3. Click **"Save changes"**

### 4.5 Upload Build Files

**Using AWS CLI (recommended):**
```bash
aws s3 sync build/ s3://educationreforms-cloud-frontend --delete
```

**Or manually:**
1. Go to bucket → **Objects** tab
2. Click **"Upload"** → **Add files/folders**
3. Upload entire `/build` folder contents
4. Click **"Upload"**

### 4.6 Create CloudFront Distribution

1. **AWS Console** → **CloudFront** → **Create distribution**
2. **Origin:**
   - **Origin domain**: Select your S3 bucket
   - **Origin access**: Legacy access identities
   - Create new OAI (Origin Access Identity)

3. **Default cache behavior:**
   - **Viewer protocol policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP methods**: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - **Cache policy**: CachingOptimized
   - **Origin request policy**: CORS-S3Origin

4. **Settings:**
   - **Price class**: Use all edge locations (best performance)
   - **Alternate domain names (CNAMEs)**: 
     - `educationreforms.cloud`
     - `www.educationreforms.cloud`
   - **Custom SSL certificate**: Request certificate (see Step 5)
   - **Default root object**: `index.html`

5. **Custom error responses** (for React Router):
   - Error code: 403
   - Response page path: `/index.html`
   - HTTP response code: 200
   
   - Error code: 404
   - Response page path: `/index.html`
   - HTTP response code: 200

6. Click **"Create distribution"** (takes 10-15 minutes to deploy)

---

## Step 5: SSL Certificate with AWS Certificate Manager

### 5.1 Request SSL Certificate

1. **AWS Console** → **Certificate Manager** (in N. Virginia region - us-east-1)
2. Click **"Request certificate"** → **"Request a public certificate"**
3. **Domain names:**
   - `educationreforms.cloud`
   - `*.educationreforms.cloud` (wildcard for subdomains)
4. **Validation method**: DNS validation
5. Click **"Request"**

### 5.2 Validate Domain

1. Click on your certificate
2. For each domain, click **"Create records in Route 53"** (if using Route 53)
   
   **OR manually add CNAME records in Hostinger:**
   - Copy the CNAME name and value from ACM
   - Go to Hostinger DNS settings
   - Add CNAME records as shown

3. Wait for validation (5-30 minutes)

### 5.3 Attach Certificate to CloudFront

1. Go back to CloudFront distribution → **Edit**
2. **Custom SSL certificate**: Select your validated certificate
3. Click **"Save changes"**

---

## Step 6: Configure DNS (Hostinger → AWS)

### 6.1 Get AWS Endpoints

**CloudFront Domain:**
- Go to CloudFront distribution
- Copy the **Distribution domain name**: `d1234abcd.cloudfront.net`

**Application Load Balancer DNS:**
- Go to EC2 → Load Balancers
- Copy the **DNS name**: `exam-backend-alb-1234567890.ap-southeast-1.elb.amazonaws.com`

### 6.2 Update Hostinger DNS Records

1. **Log in to Hostinger** → **Domains** → **educationreforms.cloud** → **DNS**

2. **Delete default A records** (if any exist for @ and www)

3. **Add these records:**

| Type  | Name               | Value                                           | TTL  |
|-------|--------------------|-------------------------------------------------|------|
| CNAME | @                  | d1234abcd.cloudfront.net                        | 3600 |
| CNAME | www                | d1234abcd.cloudfront.net                        | 3600 |
| CNAME | api                | exam-backend-alb-xxx.ap-southeast-1.elb.amazonaws.com | 3600 |

**Note:** 
- Replace `d1234abcd.cloudfront.net` with your actual CloudFront domain
- Replace ALB DNS with your actual Load Balancer DNS
- Some DNS providers don't allow CNAME for root (@). If that's the case, use ALIAS or ANAME if available, or use Route 53.

### 6.3 Wait for DNS Propagation

- DNS changes take 15 minutes - 48 hours
- Check propagation: https://dnschecker.org

---

## Step 7: Initialize Production Database

### 7.1 SSH into Backend Instance

```bash
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
cd /home/ubuntu/grade5-scholarship-exam/backend
source venv/bin/activate
```

### 7.2 Run Sample Data Script

```bash
python create_sample_data.py
```

This creates:
- Default admin account
- Sample teachers, students, parents
- Sample exams

### 7.3 Verify Database

```bash
# Test backend API
curl http://localhost:8002/api/health

# Check MongoDB Atlas dashboard
# You should see the collections populated
```

---

## Step 8: Test Production Deployment

### 8.1 Test Backend API

```bash
# Test health endpoint
curl https://api.educationreforms.cloud/api/health

# Test authentication
curl -X POST https://api.educationreforms.cloud/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'
```

### 8.2 Test Frontend

1. Open browser: `https://educationreforms.cloud`
2. Login with test credentials:
   - Email: `student@test.com`
   - Password: `student123`
3. Take a sample exam
4. Check progress reports
5. Test all user roles (student, teacher, parent, admin)

### 8.3 Load Testing (Optional)

Use tools like Apache JMeter or Locust to simulate 1000+ users:

```bash
# Install locust
pip install locust

# Create load test script (locustfile.py)
# Run load test
locust -f locustfile.py --host=https://api.educationreforms.cloud
```

---

## 📊 Cost Breakdown (Monthly)

| Service | Configuration | Cost |
|---------|---------------|------|
| **EC2 Auto Scaling** | 2-6 x t3.medium | $60-180 |
| **Application Load Balancer** | Standard ALB | $20 |
| **S3 + CloudFront** | 10GB storage + CDN | $5-10 |
| **MongoDB Atlas** | M10 Cluster (Singapore) | $57 |
| **Route 53** | Hosted zone + queries | $5 |
| **Data Transfer** | 100GB/month | $10 |
| **Total Estimated** | | **$157-282/month** |

**For 1000+ concurrent users:** ~$180-200/month average

---

## 🔐 Security Checklist

- [ ] Change all default passwords in MongoDB
- [ ] Use strong SECRET_KEY (randomly generated)
- [ ] Restrict SSH access to your IP only
- [ ] Enable AWS CloudWatch monitoring
- [ ] Setup automated backups in MongoDB Atlas
- [ ] Configure AWS WAF (Web Application Firewall) on ALB
- [ ] Enable HTTPS everywhere
- [ ] Regularly update dependencies

---

## 📈 Monitoring & Maintenance

### AWS CloudWatch Alarms

Set up alarms for:
1. EC2 CPU > 80%
2. ALB 5xx errors > 10
3. ALB response time > 2 seconds
4. Auto Scaling group instance count

### MongoDB Atlas Monitoring

Monitor:
1. Database operations/second
2. Query performance
3. Storage usage
4. Connection count

### Log Management

- **Backend logs**: CloudWatch Logs (via CloudWatch agent)
- **ALB logs**: S3 bucket
- **MongoDB logs**: MongoDB Atlas interface

---

## 🚀 Scaling for Growth

### 2000+ Users:
- Increase Auto Scaling max to 10 instances
- Upgrade to t3.large instances
- MongoDB M20 cluster ($145/month)

### 5000+ Users:
- Use t3.xlarge instances
- MongoDB M30 cluster ($270/month)
- Add ElastiCache Redis for session management
- Consider multi-region deployment

---

## 🆘 Troubleshooting

### Issue: Backend not starting
```bash
# Check logs
sudo journalctl -u exam-backend -n 50

# Restart service
sudo systemctl restart exam-backend
```

### Issue: Frontend not loading
1. Check CloudFront distribution status
2. Verify S3 bucket policy
3. Check DNS propagation
4. Clear CloudFront cache

### Issue: Database connection errors
1. Verify MongoDB Atlas network access (0.0.0.0/0)
2. Check MONGO_URL environment variable
3. Test connection from EC2:
```bash
python -c "from pymongo import MongoClient; client = MongoClient('your-mongo-url'); print(client.server_info())"
```

### Issue: SSL certificate not working
1. Ensure certificate is validated in ACM
2. Verify CloudFront is using the certificate
3. Check DNS CNAME records point to CloudFront

---

## 📞 Support Resources

- **AWS Support**: https://aws.amazon.com/support
- **MongoDB Atlas Support**: https://support.mongodb.com
- **Hostinger Support**: https://hostinger.com/contact

---

## ✅ Deployment Complete!

Your Grade 5 Scholarship Exam Platform is now live at:
- **Frontend**: https://educationreforms.cloud
- **Backend API**: https://api.educationreforms.cloud
- **Database**: MongoDB Atlas (Singapore)

**Configured for:**
- ✅ 1000+ concurrent users
- ✅ Auto-scaling (2-6 instances)
- ✅ High availability (multi-AZ)
- ✅ Global CDN delivery
- ✅ HTTPS encryption
- ✅ Automatic backups

**Total Deployment Time:** 2-3 hours
**Monthly Cost:** $180-200 (for 1000+ users)

---

**🎉 Congratulations! Your exam platform is production-ready!**
