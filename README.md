# 🤖 Enhanced AI-Powered Resume Matcher v2.0

A powerful NLP and AI tool that matches resumes against job descriptions using **Google Cloud Vision API**, **Gemini AI**, **BM25**, and **FAISS** for comprehensive candidate evaluation.

## ✨ Features

✅ **Multi-format Support**: Upload PDF, DOCX, and image files (JPG, PNG)  
✅ **Google Cloud Vision OCR**: Extract text from scanned documents and images  
✅ **Gemini AI Analysis**: Contextual understanding and intelligent recommendations  
✅ **Triple Scoring System**: BM25 (30%) + FAISS (30%) + Gemini AI (40%)  
✅ **Visual Analytics**: Color-coded bar charts and detailed insights  
✅ **Excel Export**: Download comprehensive results with AI analysis  
✅ **Skills Extraction**: Automatically identify technical skills and experience  
✅ **Smart Recommendations**: AI-powered hiring suggestions with reasoning  

## 🆕 What's New in v2.0

- **Google Cloud Vision Integration**: OCR support for images and scanned PDFs
- **Gemini AI Analysis**: Deep contextual understanding beyond keyword matching
- **Enhanced Scoring**: Triple-model ensemble for more accurate matching
- **Detailed AI Insights**: Strengths, concerns, and hiring recommendations
- **Improved UI**: Better visualization and user experience

## ⚙️ Tech Stack

- **Python** 🐍 (Streamlit for UI)
- **Google Cloud Vision API** for OCR text extraction
- **Gemini AI** for contextual analysis and recommendations
- **BM25 (Rank-BM25)** for lexical similarity
- **FAISS + Sentence Transformers** for semantic similarity
- **Spacy, NLTK** for NLP processing
- **Matplotlib & Pandas** for visualization and data processing
- **PyPDF2, python-docx** for document parsing

## 🚀 Quick Start

### Prerequisites

1. **Python 3.8+** installed
2. **Google Cloud Account** with Vision API enabled
3. **Gemini API Key** from Google AI Studio

### Installation

```bash
# Clone or navigate to the project directory
cd maharaj/v1

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy language model
python -m spacy download en_core_web_sm
```

### Configuration

#### 1. Google Cloud Vision API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Cloud Vision API**
4. Create a service account and download the JSON key file
5. Set the environment variable:

```bash
# Windows (PowerShell)
$env:GOOGLE_APPLICATION_CREDENTIALS="path\to\your\service-account-key.json"

# Windows (Command Prompt)
set GOOGLE_APPLICATION_CREDENTIALS=path\to\your\service-account-key.json

# macOS/Linux
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"
```

#### 2. Gemini API Key Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Open `app.py` and update the API key:

```python
GEMINI_API_KEY = "your-gemini-api-key-here"
```

**⚠️ Security Note**: For production, use environment variables instead of hardcoding API keys:

```python
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
```

### Run the Application

```bash
streamlit run app.py
```

The application will open in your default browser at `http://localhost:8501`

## 📖 Usage Guide

### Step 1: Enter Job Description
Paste the complete job description including:
- Required skills and qualifications
- Experience requirements
- Job responsibilities
- Preferred qualifications

### Step 2: Upload Resumes
Upload one or more resumes in supported formats:
- **PDF**: Standard or scanned PDFs
- **DOCX**: Microsoft Word documents
- **Images**: JPG, PNG (for scanned resumes)

### Step 3: Start Analysis
Click **"🚀 Start Enhanced Analysis"** to begin processing

### Step 4: Review Results
The application will display:
- **Ranked Results**: Resumes sorted by match score
- **Detailed Scores**: BM25, FAISS, and Gemini AI scores
- **AI Analysis**: Matching skills, missing requirements, strengths, concerns
- **Visual Charts**: Color-coded bar charts
- **Excel Export**: Downloadable comprehensive report

## 📊 Scoring System

The application uses a **triple-model ensemble** approach:

| Model | Weight | Purpose |
|-------|--------|---------|
| **BM25** | 30% | Lexical keyword matching |
| **FAISS** | 30% | Semantic similarity using embeddings |
| **Gemini AI** | 40% | Contextual understanding and reasoning |

### Score Interpretation

- 🟢 **70-100%**: Strong Match - Highly recommended
- 🟡 **50-69%**: Moderate Match - Consider for interview
- 🔴 **0-49%**: Weak Match - May not meet requirements

## 🎯 AI Analysis Components

Gemini AI provides:

1. **Match Percentage**: Overall fit score (0-100)
2. **Matching Skills**: Skills that align with job requirements
3. **Missing Requirements**: Critical requirements not found in resume
4. **Experience Alignment**: Assessment of experience level match
5. **Strengths**: Candidate's key advantages
6. **Concerns**: Potential red flags or gaps
7. **Recommendation**: Hire/Interview/Reject with reasoning

## 📁 Project Structure

```
maharaj/v1/
├── app.py                      # Main application
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── enhanced_flow.py            # Original prototype
├── gemini_prompts.py          # AI prompt templates
└── venv/                       # Virtual environment (created during setup)
```

## 🔧 Customization

### Adjust Scoring Weights

Edit the `WEIGHTS` dictionary in `app.py`:

```python
WEIGHTS = {
    "bm25": 0.3,      # Lexical matching
    "faiss": 0.3,     # Semantic similarity
    "gemini": 0.4     # AI contextual analysis
}
```

### Modify AI Prompts

Customize the Gemini AI analysis prompt in the `gemini_analyze_resume` method to focus on specific criteria.

### Add Custom Skills

Update the `skill_patterns` list in the `extract_skills` function to include domain-specific skills.

## 🐛 Troubleshooting

### Vision API Not Working
- Verify `GOOGLE_APPLICATION_CREDENTIALS` is set correctly
- Check that Vision API is enabled in Google Cloud Console
- Ensure service account has proper permissions

### Gemini API Errors
- Verify API key is valid and active
- Check API quota limits in Google AI Studio
- Ensure internet connection is stable

### spaCy Model Missing
```bash
python -m spacy download en_core_web_sm
```

### FAISS Installation Issues
If `faiss-cpu` fails to install, try:
```bash
pip install faiss-cpu --no-cache-dir
```

## 📝 Best Practices

1. **Job Descriptions**: Provide detailed, well-structured job descriptions for better matching
2. **Resume Quality**: Higher quality resumes (clear formatting, complete information) yield better results
3. **Batch Size**: Process 5-20 resumes at a time for optimal performance
4. **API Limits**: Be mindful of Gemini API rate limits for large batches

## 🔒 Security Considerations

- **Never commit API keys** to version control
- Use **environment variables** for sensitive credentials
- Implement **rate limiting** for production deployments
- **Sanitize user inputs** before processing
- Store **service account keys** securely

## 📄 License

This project is for educational and internal use. Ensure compliance with Google Cloud and Gemini API terms of service.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional file format support
- Multi-language resume processing
- Advanced filtering and search
- Batch processing optimization
- Custom scoring models

## 📧 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Google Cloud Vision and Gemini AI documentation
3. Verify all dependencies are correctly installed

## 🎓 Credits

Built with:
- [Streamlit](https://streamlit.io/)
- [Google Cloud Vision API](https://cloud.google.com/vision)
- [Google Gemini AI](https://ai.google.dev/)
- [LangChain](https://www.langchain.com/)
- [FAISS](https://github.com/facebookresearch/faiss)
- [spaCy](https://spacy.io/)

---

**Version**: 2.0  
**Last Updated**: 2025-10-30  
**Status**: Production Ready 🚀

