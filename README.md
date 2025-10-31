#  AI Resume Ranker

An AI-powered Resume Analyzer designed for technical hiring teams.  
Built with **FastAPI**, **LangChain/NLP**, and a simple **web UI**, it allows users to:

- Upload one or multiple resumes (PDF format)
- Extract and parse text using NLP
- Match candidate skills with job descriptions
- Generate a Technical Match Score and summary insights

---

## 🧩 Tech Stack
- **Backend:** FastAPI, Python, LangChain, PyPDF2
- **Frontend:** HTML / JS (or React optional)
- **AI Model:** GPT-based skill evaluation
- **Deployment:** Render / Vercel / HuggingFace Spaces (optional)

---

## ⚡ Features
- Resume upload and parsing
- Bulk PDF processing
- AI-powered skill extraction
- Job description vs Resume comparison
- Match score generation
- Clean, responsive UI

---

## 🧪 Getting Started
```bash
git clone https://github.com/your-username/AI-Resume-Ranker.git
cd AI-Resume-Ranker/backend
pip install -r requirements.txt
uvicorn main:app --reload
