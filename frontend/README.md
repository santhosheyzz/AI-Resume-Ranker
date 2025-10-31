# 🚀 Maharaj AI Resume Analyzer - Frontend

A futuristic, premium web interface for the Maharaj AI Resume Analyzer with immersive 3D backgrounds, glassmorphism effects, and smooth animations.

## ✨ Features

- **3D Spline Background**: Immersive motion trails background
- **Glassmorphism UI**: Premium glass panels with blur effects
- **Neon Glow Effects**: Cyan and blue gradient glows throughout
- **GSAP Animations**: Smooth scroll-triggered animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Analysis**: Live progress tracking with animated steps
- **Interactive Charts**: Beautiful data visualizations with Chart.js
- **AI Insights**: Chat-style Gemini AI observations

## 🎨 Design System

### Colors
- **Deep Navy**: `#0B132B` - Background
- **Cyan Bright**: `#00FFFF` - Primary accent
- **Blue Electric**: `#0066FF` - Secondary accent
- **Purple Glow**: `#9D4EDD` - Tertiary accent

### Typography
- **Primary Font**: Inter (300, 400, 500, 600, 700)
- **Display Font**: Orbitron (400-900)

### Effects
- Glassmorphism with backdrop blur
- Neon glow shadows
- Floating particle system
- 3D card tilt on hover
- Smooth GSAP transitions

## 📁 Project Structure

```
frontend/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles with glassmorphism
├── js/
│   ├── main.js            # Main application logic
│   ├── api.js             # API integration
│   ├── animations.js      # GSAP animations
│   └── particles.js       # Particle system
└── README.md              # This file
```

## 🚀 Quick Start

### Option 1: Direct File Access (Recommended for Demo)

1. **Open the HTML file directly**:
   ```bash
   # Navigate to the frontend directory
   cd maharaj/v2/frontend
   
   # Open index.html in your browser
   # On Windows:
   start index.html
   
   # On macOS:
   open index.html
   
   # On Linux:
   xdg-open index.html
   ```

2. **The frontend will work in demo mode** with simulated API responses

### Option 2: With Backend API

1. **Start the backend API**:
   ```bash
   # From the v2 directory
   cd maharaj/v2
   python backend_api.py
   ```

2. **Serve the frontend** (using Python's built-in server):
   ```bash
   cd frontend
   python -m http.server 8080
   ```

3. **Open in browser**:
   ```
   http://localhost:8080
   ```

### Option 3: Using Live Server (VS Code)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🔧 Configuration

### API Endpoint

Edit `js/api.js` to change the backend URL:

```javascript
const API_CONFIG = {
    baseURL: 'http://localhost:5000/api',  // Change this
    endpoints: {
        analyze: '/analyze',
        health: '/health'
    }
};
```

### Demo Mode

The frontend includes a built-in demo mode that simulates API responses. This is perfect for:
- Testing the UI without backend
- Demonstrations
- Development

To disable demo mode and use real API:
1. Open `js/api.js`
2. Comment out the `simulateAnalysis` call
3. Uncomment the actual API fetch call

## 📖 Usage

### 1. Enter Job Description
Paste a complete job description in the text area including:
- Required skills
- Experience requirements
- Job responsibilities
- Qualifications

### 2. Upload Resumes
Drag and drop or click to upload:
- PDF files
- DOCX files
- JPG/PNG images (scanned resumes)

### 3. Analyze
Click "Analyze Now" to start the AI-powered analysis

### 4. View Results
- **Ranked Cards**: See candidates sorted by match score
- **Score Breakdown**: BM25, FAISS, and Gemini AI scores
- **Skills**: Extracted technical skills
- **AI Insights**: Gemini AI recommendations
- **Charts**: Visual comparison of top candidates

## 🎯 Key Interactions

### Navigation
- Smooth scroll to sections
- Animated nav links
- Mobile-responsive menu

### Upload Area
- Drag and drop support
- File type validation
- Visual feedback on hover
- File list with remove option

### Progress Tracking
- Animated progress bar
- Step-by-step indicators
- Real-time percentage updates

### Results
- 3D card tilt on hover
- Glow effects on interaction
- Expandable details
- Downloadable reports (future)

## 🎨 Customization

### Change Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --navy-deep: #0B132B;
    --cyan-bright: #00FFFF;
    --blue-electric: #0066FF;
    --purple-glow: #9D4EDD;
}
```

### Adjust Animations

Modify GSAP timelines in `js/animations.js`:

```javascript
gsap.from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1,  // Change duration
    ease: 'power3.out'  // Change easing
});
```

### Change Spline Background

Replace the iframe src in `index.html`:

```html
<iframe src='YOUR_SPLINE_URL_HERE' frameborder='0' width='100%' height='100%'></iframe>
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🔌 API Integration

### Analyze Endpoint

**POST** `/api/analyze`

**Request**:
```javascript
FormData {
    job_description: string,
    resumes: File[]
}
```

**Response**:
```javascript
{
    success: true,
    results: [
        {
            name: string,
            rank: number,
            final_score: number,
            bm25_score: number,
            faiss_score: number,
            gemini_score: number,
            skills: string[],
            experience_years: number,
            gemini_analysis: {
                match_percentage: number,
                matching_skills: string[],
                missing_requirements: string[],
                strengths: string[],
                concerns: string[],
                recommendation: string
            }
        }
    ],
    summary: {
        total_resumes: number,
        average_score: number,
        best_match: string,
        best_score: number
    }
}
```

## 🐛 Troubleshooting

### Animations not working
- Check browser console for GSAP errors
- Ensure GSAP CDN is loading
- Clear browser cache

### Spline background not showing
- Check internet connection
- Verify Spline URL is correct
- Try a different browser

### API calls failing
- Ensure backend is running on port 5000
- Check CORS settings
- Verify API endpoint URL

### Styles not applying
- Clear browser cache
- Check CSS file path
- Inspect element for conflicts

## 🚀 Performance Tips

1. **Optimize Images**: Compress any custom images
2. **Lazy Load**: Consider lazy loading for heavy sections
3. **Debounce**: Debounce scroll events if needed
4. **Cache**: Enable browser caching for production

## 📄 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎓 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript ES6+**: Modern syntax
- **GSAP 3.12**: Animation library
- **Chart.js 4.4**: Data visualization
- **Locomotive Scroll**: Smooth scrolling
- **Spline**: 3D backgrounds

## 📝 License

This project is part of the Maharaj AI Resume Analyzer system.

## 🤝 Contributing

To contribute to the frontend:
1. Follow the existing code style
2. Test on multiple browsers
3. Ensure responsive design works
4. Document any new features

---

**Version**: 2.0  
**Last Updated**: 2025-10-30  
**Status**: Production Ready 🚀

