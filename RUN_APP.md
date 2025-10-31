# 🚀 Run Maharaj AI Resume Analyzer - Single Command

## ⚡ Quick Start

### **One Command to Rule Them All!**

Just run this in your terminal:

```bash
python run.py
```

That's it! 🎉

---

## 📋 What Happens

When you run `python run.py`, it will:

1. ✅ Check if Flask is installed (installs if needed)
2. 🚀 Start the Backend API on `http://localhost:5000`
3. 🌐 Start the Frontend Server on `http://localhost:8080`
4. 🌍 Open your browser automatically
5. ⚡ Ready to analyze resumes!

---

## 🎯 Step-by-Step

### **Option 1: Using Python (Recommended)**

```bash
# Navigate to the v2 directory
cd maharaj/v2

# Run the application
python run.py
```

### **Option 2: Using Batch File (Windows)**

```bash
# Just double-click this file:
start_frontend.bat

# Or run in terminal:
start_frontend.bat
```

### **Option 3: Using Shell Script (macOS/Linux)**

```bash
# Make it executable (first time only)
chmod +x start_frontend.sh

# Run it
./start_frontend.sh
```

---

## 🛑 How to Stop

Press **Ctrl+C** in the terminal to stop all servers.

The script will automatically:
- Stop the backend API
- Stop the frontend server
- Clean up processes

---

## 📺 What You'll See

```
============================================================
🤖 Maharaj AI Resume Analyzer
============================================================

✅ Flask dependencies found
🚀 Starting servers...

📡 Starting Backend API on http://localhost:5000
🌐 Starting Frontend Server on http://localhost:8080

============================================================
✅ Application Started Successfully!
============================================================

📍 URLs:
   Frontend:  http://localhost:8080
   Backend:   http://localhost:5000

🎯 Opening browser...

============================================================
⚡ Application is running!
============================================================

📝 Instructions:
   1. Enter a job description
   2. Upload resume files (PDF, DOCX, images)
   3. Click 'Analyze Now'
   4. View AI-powered results!

🛑 Press Ctrl+C to stop all servers
============================================================
```

---

## 🔧 Troubleshooting

### **Problem**: Port already in use

```bash
# Kill processes on port 5000 and 8080
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
lsof -ti:8080 | xargs kill -9
```

### **Problem**: Flask not installed

The script will automatically install Flask and Flask-CORS.

Or install manually:
```bash
pip install flask flask-cors
```

### **Problem**: Browser doesn't open

Manually open: `http://localhost:8080`

---

## 🎨 Features

Once the app is running, you can:

- ✨ Upload multiple resumes (PDF, DOCX, images)
- 🤖 Get AI-powered analysis with Gemini
- 📊 See BM25, FAISS, and Gemini scores
- 🎯 View ranked candidates
- 💡 Read AI insights and recommendations
- 📈 Visualize scores with interactive charts

---

## 📁 Files

- **run.py** - Main launcher script
- **start_frontend.bat** - Windows shortcut
- **start_frontend.sh** - Unix shortcut
- **backend_api.py** - Flask REST API
- **frontend/** - Web interface

---

## 🎓 Advanced Usage

### Run with custom ports

Edit `run.py` and change:
```python
# Backend port (default: 5000)
backend_process = subprocess.Popen(
    [sys.executable, "backend_api.py", "--port", "5001"],
    ...
)

# Frontend port (default: 8080)
frontend_process = subprocess.Popen(
    [sys.executable, "-m", "http.server", "8081"],
    ...
)
```

### Run in background

```bash
# Windows:
start /B python run.py

# macOS/Linux:
nohup python run.py &
```

---

## ✅ Summary

**Single Command:**
```bash
python run.py
```

**What it does:**
- Starts backend API
- Starts frontend server
- Opens browser
- Ready to use!

**To stop:**
- Press Ctrl+C

---

**That's it! Enjoy your AI Resume Analyzer!** 🚀✨

**Version**: 2.0  
**Status**: Production Ready 🎊

