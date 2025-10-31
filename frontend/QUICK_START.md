# 🚀 Quick Start - Maharaj AI Resume Analyzer

## ⚡ Fastest Way to Get Started (30 seconds)

### Just Want to See It?

**Double-click `index.html`** in the `frontend` folder!

That's it! The frontend works in demo mode with simulated AI responses.

---

## 🎯 What You'll See

### 1. **Hero Section**
- Futuristic 3D background with motion trails
- Glowing "Maharaj" logo
- Two action buttons with neon effects

### 2. **Upload & Analyze Section**
- Glassmorphic upload area (drag & drop)
- Job description input
- Glowing "Analyze Now" button
- Animated progress tracker

### 3. **Results Section**
- Ranked candidate cards with scores
- BM25, FAISS, and Gemini AI breakdown
- Skills tags
- Interactive charts

### 4. **AI Insights Panel**
- Gemini AI observations
- Strengths and concerns
- Recommendations

### 5. **Architecture Section**
- Visual explanation of the 3-model system
- Scoring weights display

---

## 🎮 How to Use (Demo Mode)

### Step 1: Enter Job Description
```
Example:
We are looking for a Senior Python Developer with 5+ years of experience.
Required skills: Python, Django, REST API, AWS, Docker, PostgreSQL.
Experience with machine learning is a plus.
```

### Step 2: Upload Resumes
- Click the upload area OR drag & drop files
- Supports: PDF, DOCX, JPG, PNG
- Upload 1-10 resumes

### Step 3: Click "Analyze Now"
- Watch the animated progress bar
- See step-by-step processing
- Wait for results (simulated ~5 seconds)

### Step 4: View Results
- Scroll down to see ranked candidates
- Hover over cards for 3D tilt effect
- Check the score breakdown chart
- Read AI insights

---

## 🔥 Cool Features to Try

### Interactive Elements
1. **Hover over cards** - See 3D tilt effect
2. **Hover over buttons** - Watch the glow intensify
3. **Scroll down** - Smooth animations reveal content
4. **Move your mouse** - Particles follow your cursor

### Visual Effects
- Glassmorphism panels with blur
- Neon cyan/blue glows
- Gradient text effects
- Floating particles
- 3D Spline background

---

## 🛠️ Want Real AI Analysis?

### Quick Setup (5 minutes)

1. **Install Python dependencies**:
   ```bash
   cd maharaj/v2
   pip install -r requirements.txt
   ```

2. **Get Gemini API Key**:
   - Go to: https://makersuite.google.com/app/apikey
   - Create API key
   - Copy it

3. **Edit `backend_api.py`**:
   ```python
   GEMINI_API_KEY = "paste-your-key-here"
   ```

4. **Run the launcher**:
   ```bash
   # Windows:
   start_frontend.bat
   
   # macOS/Linux:
   ./start_frontend.sh
   ```

5. **Open browser**:
   ```
   http://localhost:8080
   ```

Now you have real AI-powered analysis! 🎉

---

## 📁 File Structure

```
frontend/
├── index.html          ← Open this file!
├── css/
│   └── style.css       ← All the beautiful styles
├── js/
│   ├── main.js         ← Main app logic
│   ├── api.js          ← Backend communication
│   ├── animations.js   ← GSAP animations
│   └── particles.js    ← Particle effects
└── QUICK_START.md      ← You are here
```

---

## 🎨 Customization

### Change Colors
Edit `css/style.css`:
```css
:root {
    --cyan-bright: #00FFFF;    /* Change to your color */
    --blue-electric: #0066FF;  /* Change to your color */
}
```

### Change Background
Edit `index.html` (line 30):
```html
<iframe src='YOUR_SPLINE_URL_HERE' ...></iframe>
```

---

## 🐛 Troubleshooting

**Problem**: Animations not working
- **Solution**: Use Chrome, Firefox, or Edge (latest version)

**Problem**: 3D background not showing
- **Solution**: Check internet connection (Spline loads from CDN)

**Problem**: Styles look broken
- **Solution**: Clear browser cache (Ctrl+Shift+Delete)

---

## 📱 Mobile Support

The interface is fully responsive!
- Works on phones and tablets
- Touch-friendly interactions
- Optimized layouts

---

## 🎓 Learn More

- **Full Setup Guide**: See `FRONTEND_SETUP.md`
- **Complete Documentation**: See `README.md`
- **Project Summary**: See `FRONTEND_COMPLETE.md`

---

## 🎉 That's It!

You now have a **futuristic, AI-powered resume analyzer** with:
- ✅ Beautiful glassmorphism UI
- ✅ 3D animated backgrounds
- ✅ Real-time analysis
- ✅ AI-powered insights
- ✅ Responsive design

**Enjoy!** 🚀✨

---

**Need Help?**
- Check the browser console (F12) for errors
- Read the full documentation
- Verify all files are in the correct folders

**Version**: 2.0  
**Status**: Ready to Use! 🎊

