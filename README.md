# Grade 5 Scholarship Examination Platform 🎓

A comprehensive digital examination system for Grade 5 scholarship exam preparation in Sri Lanka.

## 🌟 Features

### For Students
- **MCQ Exams**: Timed 60-question exams with auto-grading
- **Real-time Timer**: 60-minute countdown with auto-submit
- **Skill Tracking**: Performance across 10 skill areas
- **Progress Reports**: Detailed results with skill breakdowns
- **Resume Support**: Continue exams if connection drops

### For Teachers
- **Exam Creation**: Build exams with 60 MCQ questions
- **Skill Mapping**: Tag questions to 10 skill areas
- **Paper 2 Marking**: Manual marking for essay and short answers
- **Student Analytics**: Track class performance

### For Parents
- **Progress Dashboard**: "Blood-report" style skill tracking
- **Monthly Trends**: View child's improvement over time
- **Strength/Weakness Analysis**: Identify areas needing focus

### For Admins
- **User Management**: Manage students, teachers, parents
- **Exam Scheduling**: Monthly exam configuration
- **Data Export**: CSV exports for reporting

## 🎯 10 Skill Areas Tracked

1. Mathematical Reasoning
2. Language Proficiency
3. General Knowledge
4. Comprehension Skills
5. Problem Solving
6. Logical Thinking
7. Spatial Reasoning
8. Memory & Recall
9. Analytical Skills
10. Critical Thinking

## 🛠️ Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: React.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Charts**: Recharts

## 📋 Prerequisites

- Python 3.11+
- Node.js 18+
- MongoDB
- Yarn

## 🚀 Quick Start

### Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URL

# Create sample data
python create_sample_data.py

# Run server
uvicorn server:app --host 0.0.0.0 --port 8002 --reload
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install

# Configure environment
# Create .env file with:
# REACT_APP_BACKEND_URL=http://localhost:8002
# PORT=3001

# Run development server
yarn start
```

## 🔑 Test Credentials

After running `create_sample_data.py`:

- **Admin**: admin@exambureau.com / admin123
- **Teacher**: teacher@exambureau.com / teacher123
- **Student**: student@test.com / student123
- **Parent**: parent@test.com / parent123

## 📚 API Documentation

Once the backend is running, visit: `http://localhost:8002/docs`

## 🎨 Key Features Details

### Paper 1 (MCQ)
- 60 questions with 5 options each
- Auto-grading with immediate results
- Per-skill score calculation
- Timer with auto-submit
- Question flagging for review
- Progress tracking

### Paper 2 (Essay + Short Answers)
- Submitted via WhatsApp (external)
- Teacher manual marking interface
- Essay (20 marks) + 10 short answers (20 marks)
- Comments and feedback support

### Progress Tracking
- Monthly performance graphs
- Skill-wise trend analysis
- Strength/weakness identification
- Historical data retention

## 📱 Screenshots

### Student Exam Interface
- Clean, distraction-free design
- Large, readable text
- Color-coded question navigation
- Persistent timer display

### Parent Dashboard
- Line graphs showing skill trends
- Easy-to-understand visual reports
- Month-over-month comparisons

## 🔒 Security

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Secure MongoDB connections

## 📦 Project Structure

```
.
├── backend/
│   ├── server.py              # Main FastAPI application
│   ├── create_sample_data.py  # Sample data generator
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   └── AuthContext.js    # Authentication context
│   └── package.json          # Node dependencies
└── README.md
```

## 🤝 Contributing

This is a private educational platform. For questions or support, contact TEC Sri Lanka Worldwide.

## 📄 License

Proprietary - © 2026 TEC Sri Lanka Worldwide (Pvt.) Ltd

## 📞 Contact

- **Organization**: TEC Sri Lanka Worldwide (Pvt.) Ltd
- **Established**: 1982 (42 Years of Educational Excellence)
- **Website**: www.tecaikids.com

---

Built with ❤️ for Sri Lankan students preparing for Grade 5 Scholarship Exams
