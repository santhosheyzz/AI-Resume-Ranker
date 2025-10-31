# 🚀 Quick Start Guide - Enhanced Resume Matcher v2.0

Get up and running in 5 minutes!

## Prerequisites Checklist

- [ ] Python 3.8 or higher installed
- [ ] Google Cloud account (for Vision API)
- [ ] Gemini API key from Google AI Studio

## Step-by-Step Setup

### 1️⃣ Install Dependencies

**Windows:**
```bash
# Run the automated setup script
setup.bat
```

**macOS/Linux:**
```bash
# Make the script executable
chmod +x setup.sh

# Run the setup script
./setup.sh
```

**Manual Installation:**
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm
```

### 2️⃣ Configure Google Cloud Vision API

1. **Create a Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Click "Select a project" → "New Project"
   - Name your project (e.g., "resume-matcher")

2. **Enable Vision API:**
   - In the Cloud Console, go to "APIs & Services" → "Library"
   - Search for "Cloud Vision API"
   - Click "Enable"

3. **Create Service Account:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in the details and click "Create"
   - Grant role: "Cloud Vision API User"
   - Click "Done"

4. **Download JSON Key:**
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON" format
   - Save the file securely (e.g., `service-account-key.json`)

5. **Set Environment Variable:**

   **Windows (PowerShell):**
   ```powershell
   $env:GOOGLE_APPLICATION_CREDENTIALS="D:\path\to\service-account-key.json"
   ```

   **Windows (Command Prompt):**
   ```cmd
   set GOOGLE_APPLICATION_CREDENTIALS=D:\path\to\service-account-key.json
   ```

   **macOS/Linux:**
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
   ```

   **Permanent Setup (Windows):**
   - Right-click "This PC" → "Properties"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "User variables", click "New"
   - Variable name: `GOOGLE_APPLICATION_CREDENTIALS`
   - Variable value: Full path to your JSON key file

### 3️⃣ Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated API key

**Option A: Use .env file (Recommended)**
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key
GEMINI_API_KEY=your-actual-api-key-here
```

**Option B: Edit app.py directly**
```python
# Open app.py and find this line:
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "your-api-key-here")

# Replace with your actual key:
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSy...")
```

### 4️⃣ Run the Application

```bash
# Make sure virtual environment is activated
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Run Streamlit app
streamlit run app.py
```

The app will automatically open in your browser at `http://localhost:8501`

## 📝 First Test Run

1. **Prepare Test Data:**
   - Create a sample job description (or use one from a job board)
   - Gather 2-3 sample resumes (PDF, DOCX, or images)

2. **In the Application:**
   - Paste the job description in the text area
   - Upload the resume files
   - Click "🚀 Start Enhanced Analysis"

3. **Review Results:**
   - Check the ranked results
   - Explore AI analysis for each resume
   - Download the Excel report

## 🔧 Troubleshooting

### "Vision API not available" Warning
- **Cause**: `GOOGLE_APPLICATION_CREDENTIALS` not set or invalid
- **Fix**: Verify the environment variable points to a valid JSON key file
- **Test**: Run `echo %GOOGLE_APPLICATION_CREDENTIALS%` (Windows) or `echo $GOOGLE_APPLICATION_CREDENTIALS` (macOS/Linux)

### "Gemini API error"
- **Cause**: Invalid or missing API key
- **Fix**: Check your API key in `.env` or `app.py`
- **Verify**: Ensure the key starts with `AIzaSy...`

### "spaCy model not found"
```bash
python -m spacy download en_core_web_sm
```

### "Module not found" errors
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Port 8501 already in use
```bash
# Use a different port
streamlit run app.py --server.port 8502
```

## 🎯 Usage Tips

### For Best Results:

1. **Job Descriptions:**
   - Include detailed requirements
   - List specific skills and technologies
   - Mention experience levels
   - Add qualifications and certifications

2. **Resumes:**
   - Use clear, well-formatted documents
   - Ensure text is readable (not too small)
   - For images: good lighting, high contrast
   - For scanned PDFs: 300 DPI or higher

3. **Batch Processing:**
   - Process 5-10 resumes at a time for faster results
   - For large batches (20+), expect longer processing times due to Gemini API

### Understanding Scores:

- **🟢 70-100%**: Strong match - Highly recommended for interview
- **🟡 50-69%**: Moderate match - Review AI analysis for decision
- **🔴 0-49%**: Weak match - May not meet core requirements

### Score Components:

- **BM25 Score**: Keyword matching (technical skills, job titles)
- **FAISS Score**: Semantic similarity (context and meaning)
- **Gemini Score**: AI understanding (experience fit, potential)

## 📊 Sample Workflow

```
1. Recruiter receives 50 resumes for a Python Developer role
   ↓
2. Upload job description + all 50 resumes
   ↓
3. System processes and ranks all candidates
   ↓
4. Review top 10 candidates (70%+ match)
   ↓
5. Read AI analysis for insights and concerns
   ↓
6. Download Excel report for team review
   ↓
7. Schedule interviews with top candidates
```

## 🔐 Security Best Practices

1. **Never commit API keys to Git:**
   ```bash
   # Add to .gitignore
   echo ".env" >> .gitignore
   echo "service-account-key.json" >> .gitignore
   ```

2. **Use environment variables in production**

3. **Rotate API keys regularly**

4. **Set up API quotas and alerts in Google Cloud Console**

5. **Restrict service account permissions to minimum required**

## 📚 Next Steps

- [ ] Customize scoring weights in `.env`
- [ ] Add domain-specific skills to `extract_skills()` function
- [ ] Modify Gemini prompts for your industry
- [ ] Set up automated batch processing
- [ ] Integrate with your ATS (Applicant Tracking System)

## 🆘 Getting Help

1. Check the main [README.md](README.md) for detailed documentation
2. Review [Google Cloud Vision API docs](https://cloud.google.com/vision/docs)
3. Check [Gemini API documentation](https://ai.google.dev/docs)
4. Verify all dependencies are installed: `pip list`

## 🎉 You're Ready!

Your Enhanced Resume Matcher v2.0 is now set up and ready to use. Happy recruiting! 🚀

---

**Need help?** Check the troubleshooting section or review the detailed README.md

