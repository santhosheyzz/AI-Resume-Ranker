# 🚀 Maharaj AI Resume Analyzer - Complete Setup Guide

This guide will help you set up both the **futuristic frontend** and the **backend API** for the Maharaj AI Resume Analyzer.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start (Demo Mode)](#quick-start-demo-mode)
3. [Full Setup (With Backend)](#full-setup-with-backend)
4. [Running the Application](#running-the-application)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Software
- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Modern Web Browser** (Chrome, Firefox, Safari, or Edge)
- **Text Editor** (VS Code recommended)

### Optional (for full functionality)
- **Google Cloud Account** (for Vision API)
- **Gemini API Key** (from Google AI Studio)

---

## ⚡ Quick Start (Demo Mode)

**Perfect for testing the UI without backend setup!**

### Step 1: Open the Frontend

```bash
# Navigate to the frontend directory
cd maharaj/v2/frontend

# Option A: Direct file access (easiest)
# Just double-click index.html in your file explorer
# OR use command line:

# Windows:
start index.html

# macOS:
open index.html

# Linux:
xdg-open index.html
```

### Step 2: Use the Application

The frontend will work in **demo mode** with simulated AI responses:
1. Enter a job description
2. Upload resume files (any PDF, DOCX, or images)
3. Click "Analyze Now"
4. See beautiful animated results!

**Note**: In demo mode, the analysis is simulated but the UI is fully functional.

---

## 🏗️ Full Setup (With Backend)

### Step 1: Install Python Dependencies

```bash
# Navigate to the v2 directory
cd maharaj/v2

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Install all dependencies
pip install -r requirements.txt

# Download spaCy language model
python -m spacy download en_core_web_sm
```

### Step 2: Configure API Keys

#### Option A: Using .env file (Recommended)

1. Create a `.env` file in the `maharaj/v2` directory:

```bash
# Create .env file
# Windows:
copy .env.example .env

# macOS/Linux:
cp .env.example .env
```

2. Edit `.env` and add your keys:

```env
# Google Cloud Vision API
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-key.json

# Gemini API Key
GEMINI_API_KEY=your-gemini-api-key-here

# Optional: Customize weights
WEIGHT_BM25=0.3
WEIGHT_FAISS=0.3
WEIGHT_GEMINI=0.4
```

#### Option B: Edit backend_api.py directly

Open `backend_api.py` and update:

```python
GEMINI_API_KEY = "your-actual-api-key-here"
```

### Step 3: Get API Keys

#### Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

#### Google Cloud Vision API (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Cloud Vision API"
4. Create service account and download JSON key
5. Set environment variable:

```bash
# Windows (PowerShell):
$env:GOOGLE_APPLICATION_CREDENTIALS="path\to\key.json"

# Windows (CMD):
set GOOGLE_APPLICATION_CREDENTIALS=path\to\key.json

# macOS/Linux:
export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"
```

---

## 🎮 Running the Application

### Method 1: Separate Terminal Windows (Recommended)

**Terminal 1 - Backend API:**
```bash
cd maharaj/v2
python backend_api.py
```

You should see:
```
============================================================
Maharaj AI Resume Analyzer - Backend API
============================================================
Starting server on http://localhost:5000
API Endpoints:
  - GET  /api/health   - Health check
  - POST /api/analyze  - Analyze resumes
  - GET  /api/config   - Get configuration
============================================================
```

**Terminal 2 - Frontend Server:**
```bash
cd maharaj/v2/frontend
python -m http.server 8080
```

**Open in Browser:**
```
http://localhost:8080
```

### Method 2: Using VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Open `maharaj/v2/frontend/index.html`
3. Right-click and select "Open with Live Server"
4. In another terminal, run the backend:
   ```bash
   cd maharaj/v2
   python backend_api.py
   ```

### Method 3: Direct File Access (Frontend Only)

If you just want to test the frontend:
```bash
cd maharaj/v2/frontend
# Double-click index.html or:
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

---

## 🎯 Using the Application

### 1. **Hero Section**
- Click "Try Demo" to scroll to upload section
- Click "View Architecture" to see system details

### 2. **Upload & Analyze**
- **Job Description**: Paste complete job requirements
- **Upload Resumes**: 
  - Drag & drop files
  - Or click to browse
  - Supports: PDF, DOCX, JPG, PNG
- **Analyze**: Click the glowing "Analyze Now" button

### 3. **View Results**
- **Ranked Cards**: Candidates sorted by AI score
- **Score Breakdown**: See BM25, FAISS, and Gemini scores
- **Skills**: Extracted technical skills
- **AI Insights**: Gemini recommendations
- **Charts**: Visual comparison

### 4. **Explore**
- Hover over cards for 3D tilt effect
- Scroll to see smooth animations
- Check AI observations panel

---

## 🐛 Troubleshooting

### Frontend Issues

**Problem**: Animations not working
```
Solution:
- Check browser console (F12)
- Ensure GSAP CDN is loading
- Try clearing browser cache
- Use a modern browser (Chrome/Firefox)
```

**Problem**: Spline background not showing
```
Solution:
- Check internet connection
- Verify Spline URL in index.html
- Try disabling ad blockers
```

**Problem**: Styles look broken
```
Solution:
- Clear browser cache (Ctrl+Shift+Delete)
- Check if style.css is loading
- Verify file paths are correct
```

### Backend Issues

**Problem**: Backend won't start
```
Solution:
- Ensure virtual environment is activated
- Install dependencies: pip install -r requirements.txt
- Check Python version: python --version (need 3.8+)
```

**Problem**: API calls failing
```
Solution:
- Verify backend is running on port 5000
- Check CORS settings in backend_api.py
- Update API URL in frontend/js/api.js
```

**Problem**: Gemini API errors
```
Solution:
- Verify API key is correct
- Check API quota in Google AI Studio
- Ensure internet connection is stable
```

**Problem**: Vision API not working
```
Solution:
- Verify GOOGLE_APPLICATION_CREDENTIALS is set
- Check Vision API is enabled in Google Cloud
- Ensure service account has permissions
```

**Problem**: spaCy model missing
```
Solution:
python -m spacy download en_core_web_sm
```

**Problem**: FAISS installation fails
```
Solution:
pip install faiss-cpu --no-cache-dir
```

### Common Errors

**Error**: `ModuleNotFoundError: No module named 'flask'`
```bash
Solution:
pip install flask flask-cors
```

**Error**: `Port 5000 already in use`
```bash
Solution:
# Change port in backend_api.py (last line):
app.run(debug=True, host='0.0.0.0', port=5001)

# Update API URL in frontend/js/api.js:
baseURL: 'http://localhost:5001/api'
```

**Error**: CORS errors in browser console
```bash
Solution:
# Ensure flask-cors is installed:
pip install flask-cors

# Verify CORS is enabled in backend_api.py:
from flask_cors import CORS
CORS(app)
```

---

## 🎨 Customization

### Change Colors

Edit `frontend/css/style.css`:
```css
:root {
    --navy-deep: #0B132B;
    --cyan-bright: #00FFFF;
    --blue-electric: #0066FF;
    --purple-glow: #9D4EDD;
}
```

### Change Spline Background

Edit `frontend/index.html`:
```html
<iframe src='YOUR_SPLINE_URL_HERE' ...></iframe>
```

### Adjust Scoring Weights

Edit `backend_api.py`:
```python
WEIGHTS = {
    "bm25": 0.3,
    "faiss": 0.3,
    "gemini": 0.4
}
```

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────┐
│     Frontend (HTML/CSS/JS)              │
│  - Glassmorphism UI                     │
│  - GSAP Animations                      │
│  - 3D Spline Background                 │
└─────────────────┬───────────────────────┘
                  │ HTTP/REST API
┌─────────────────▼───────────────────────┐
│     Backend API (Flask)                 │
│  - File Upload Handling                 │
│  - Text Extraction                      │
│  - Score Calculation                    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│     AI Processing Engine                │
│  ┌──────────┬──────────┬──────────┐    │
│  │   BM25   │  FAISS   │  Gemini  │    │
│  │   30%    │   30%    │   40%    │    │
│  └──────────┴──────────┴──────────┘    │
└─────────────────────────────────────────┘
```

---

## 🚀 Production Deployment

### Frontend
- Host on: Netlify, Vercel, GitHub Pages
- Update API URL in `js/api.js`
- Enable HTTPS

### Backend
- Deploy to: Heroku, AWS, Google Cloud
- Set environment variables
- Enable CORS for your domain
- Use production WSGI server (gunicorn)

---

## 📝 Next Steps

1. ✅ Test the demo mode
2. ✅ Set up backend API
3. ✅ Configure API keys
4. ✅ Upload real resumes
5. ✅ Customize colors/branding
6. ✅ Deploy to production

---

## 🤝 Support

For issues or questions:
1. Check this troubleshooting guide
2. Review browser console for errors
3. Check backend terminal for logs
4. Verify all dependencies are installed

---

**Version**: 2.0  
**Last Updated**: 2025-10-30  
**Status**: Production Ready 🚀

Enjoy your futuristic AI-powered resume analyzer! 🎉

