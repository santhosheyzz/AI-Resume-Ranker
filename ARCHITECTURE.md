# 🏗️ Architecture Overview - Enhanced Resume Matcher v2.0

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Streamlit Web Interface                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Enhanced Resume Processor                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Text Extract │  │ Vision API   │  │ Gemini AI    │      │
│  │ (PDF/DOCX)   │  │ (Images/OCR) │  │ (Analysis)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   NLP Processing Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Text Cleaning│  │ Tokenization │  │ Skill Extract│      │
│  │ (Regex/NLTK) │  │ (NLTK/spaCy) │  │ (spaCy/NER)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Triple Scoring Engine                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ BM25 (30%)   │  │ FAISS (30%)  │  │ Gemini (40%) │      │
│  │ Lexical      │  │ Semantic     │  │ Contextual   │      │
│  │ Matching     │  │ Similarity   │  │ AI Analysis  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Results & Visualization                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Ranking      │  │ Charts       │  │ Excel Export │      │
│  │ & Sorting    │  │ (Matplotlib) │  │ (Pandas)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Text Extraction Layer

**Purpose**: Extract text from various document formats

**Components**:
- **PyPDF2**: Traditional PDF text extraction
- **python-docx**: DOCX document parsing
- **Google Cloud Vision API**: OCR for images and scanned documents

**Flow**:
```python
File Upload → Type Detection → Appropriate Extractor → Raw Text
```

**Supported Formats**:
- PDF (text-based and scanned)
- DOCX (Microsoft Word)
- JPG, JPEG, PNG (images)

### 2. NLP Processing Layer

**Purpose**: Clean, normalize, and extract features from text

**Components**:
- **NLTK**: Tokenization, stopword removal
- **spaCy**: Named entity recognition, advanced NLP
- **Regex**: Pattern matching for skills and experience

**Key Functions**:
```python
clean_text()              # Normalize and clean text
extract_skills()          # Identify technical skills
extract_experience_years() # Parse years of experience
```

**Processing Pipeline**:
```
Raw Text → Lowercase → Remove Special Chars → Tokenize → Extract Features
```

### 3. Scoring Engine

#### A. BM25 (Lexical Matching) - 30%

**Algorithm**: Okapi BM25 (Best Matching 25)

**Purpose**: Keyword-based relevance scoring

**How it works**:
1. Tokenize job description and resumes
2. Calculate term frequency (TF)
3. Apply inverse document frequency (IDF)
4. Compute BM25 score for each resume
5. Normalize to 0-100 scale

**Best for**: Exact skill matches, job titles, technologies

**Example**:
```
JD: "Python, Django, REST API, 5 years"
Resume: "Python developer, Django framework, REST API design, 6 years"
→ High BM25 score (many exact keyword matches)
```

#### B. FAISS (Semantic Similarity) - 30%

**Algorithm**: Facebook AI Similarity Search with Sentence Transformers

**Purpose**: Understand meaning and context beyond keywords

**How it works**:
1. Convert text to embeddings using `all-MiniLM-L6-v2` model
2. Store embeddings in FAISS vector index
3. Calculate cosine similarity between JD and resume embeddings
4. Normalize to 0-100 scale

**Best for**: Synonyms, related concepts, contextual understanding

**Example**:
```
JD: "Machine Learning Engineer"
Resume: "AI/ML Specialist, Deep Learning, Neural Networks"
→ High FAISS score (semantically similar even with different words)
```

#### C. Gemini AI (Contextual Analysis) - 40%

**Model**: Google Gemini 1.5 Flash

**Purpose**: Human-like understanding and reasoning

**How it works**:
1. Send structured prompt with JD and resume
2. Gemini analyzes fit, experience, skills
3. Returns JSON with detailed analysis
4. Extract match percentage and insights

**Best for**: Experience alignment, soft skills, overall fit assessment

**Analysis Output**:
```json
{
  "match_percentage": 85,
  "matching_skills": ["Python", "Django", "AWS"],
  "missing_requirements": ["Kubernetes"],
  "strengths": ["Strong backend experience", "Cloud expertise"],
  "concerns": ["Limited frontend experience"],
  "recommendation": "Strong candidate - recommend interview"
}
```

### 4. Ensemble Scoring

**Formula**:
```
Final Score = (0.3 × BM25) + (0.3 × FAISS) + (0.4 × Gemini)
```

**Why this weighting?**
- **BM25 (30%)**: Ensures technical requirements are met
- **FAISS (30%)**: Captures semantic understanding
- **Gemini (40%)**: Highest weight for AI reasoning and context

**Example Calculation**:
```
Resume A:
  BM25:   75%
  FAISS:  80%
  Gemini: 85%
  
Final = (0.3 × 75) + (0.3 × 80) + (0.4 × 85)
      = 22.5 + 24 + 34
      = 80.5%
```

## Data Flow

### Complete Processing Pipeline

```
1. User Input
   ├── Job Description (text)
   └── Resumes (files)
        │
2. Text Extraction
   ├── PDF → PyPDF2 → text
   ├── DOCX → python-docx → text
   └── Image → Vision API → text
        │
3. Feature Extraction
   ├── Skills (regex + spaCy)
   ├── Experience (regex patterns)
   └── Cleaned text (NLTK)
        │
4. Index Building
   ├── BM25 Index (tokenized corpus)
   └── FAISS Index (vector embeddings)
        │
5. Scoring
   ├── BM25 scores (all resumes)
   ├── FAISS scores (similarity search)
   └── Gemini analysis (per resume)
        │
6. Ensemble Calculation
   └── Weighted combination → Final scores
        │
7. Results
   ├── Ranking (sort by score)
   ├── Visualization (charts)
   └── Export (Excel)
```

## Performance Characteristics

### Time Complexity

| Operation | Complexity | Notes |
|-----------|------------|-------|
| Text Extraction | O(n) | n = number of pages/size |
| BM25 Indexing | O(n×m) | n = docs, m = avg tokens |
| FAISS Indexing | O(n×d) | d = embedding dimension (384) |
| BM25 Search | O(n×m) | Linear scan |
| FAISS Search | O(log n) | Approximate nearest neighbor |
| Gemini API | O(n) | Sequential API calls |

### Processing Time Estimates

| Resumes | Estimated Time | Bottleneck |
|---------|----------------|------------|
| 1-5     | 10-30 seconds  | Gemini API |
| 5-10    | 30-60 seconds  | Gemini API |
| 10-20   | 1-2 minutes    | Gemini API |
| 20+     | 2+ minutes     | Gemini API + FAISS |

**Note**: Gemini API calls are sequential to avoid rate limits

## Scalability Considerations

### Current Limitations

1. **Gemini API Rate Limits**: ~60 requests/minute
2. **Memory**: FAISS index grows with resume count
3. **Sequential Processing**: One resume at a time for Gemini

### Optimization Strategies

1. **Batch Processing**:
   ```python
   # Process in chunks of 10
   for chunk in chunks(resumes, 10):
       process_chunk(chunk)
   ```

2. **Caching**:
   ```python
   # Cache embeddings for reuse
   @st.cache_data
   def get_embeddings(text):
       return model.encode(text)
   ```

3. **Parallel Processing** (future):
   ```python
   # Use ThreadPoolExecutor for I/O-bound tasks
   with ThreadPoolExecutor(max_workers=5) as executor:
       futures = [executor.submit(process_resume, r) for r in resumes]
   ```

## Security Architecture

### API Key Management

```
Environment Variables (.env)
    ↓
Application Config (app.py)
    ↓
API Clients (Vision, Gemini)
```

### Data Privacy

- **No data persistence**: Uploaded files processed in memory
- **No logging of sensitive data**: Only metadata logged
- **Secure API communication**: HTTPS for all API calls

### Best Practices

1. Use environment variables for secrets
2. Never commit `.env` or credential files
3. Rotate API keys regularly
4. Set up API quotas and alerts
5. Implement rate limiting

## Error Handling

### Graceful Degradation

```python
if not gemini_available:
    # Fallback to BM25 + FAISS only
    final_score = 0.6 * bm25 + 0.4 * faiss

if not vision_available:
    # Skip image processing, warn user
    st.warning("Vision API not available")
```

### Error Recovery

1. **API Failures**: Retry with exponential backoff
2. **Invalid Files**: Skip and continue processing
3. **Parsing Errors**: Use fallback extraction methods

## Future Enhancements

### Planned Features

1. **Multi-language Support**: Detect and process non-English resumes
2. **Custom Scoring Weights**: User-configurable via UI
3. **Resume Parsing**: Extract structured data (education, certifications)
4. **Candidate Ranking**: Advanced filtering and sorting
5. **ATS Integration**: Export to popular ATS platforms
6. **Batch API**: Process large volumes efficiently
7. **Analytics Dashboard**: Historical trends and insights

### Technical Improvements

1. **Async Processing**: Use asyncio for concurrent API calls
2. **Database Integration**: Store results for historical analysis
3. **Model Fine-tuning**: Custom embeddings for specific industries
4. **A/B Testing**: Compare different scoring strategies

## Technology Stack Summary

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** | Streamlit | 1.31.0 | Web UI |
| **OCR** | Google Cloud Vision | 3.7.0 | Image text extraction |
| **AI** | Google Gemini | 0.3.2 | Contextual analysis |
| **NLP** | spaCy | 3.7.2 | Advanced NLP |
| **NLP** | NLTK | 3.8.1 | Tokenization |
| **Search** | BM25 | 0.2.2 | Lexical matching |
| **Embeddings** | Sentence Transformers | 2.3.1 | Semantic vectors |
| **Vector DB** | FAISS | 1.7.4 | Similarity search |
| **Framework** | LangChain | 0.1.6 | ML orchestration |
| **Data** | Pandas | 2.2.0 | Data processing |
| **Viz** | Matplotlib | 3.8.2 | Charts |

## Conclusion

The Enhanced Resume Matcher v2.0 combines traditional NLP techniques (BM25), modern ML approaches (FAISS embeddings), and cutting-edge AI (Gemini) to provide comprehensive, accurate resume matching with human-like understanding and reasoning.

---

**Last Updated**: 2025-10-30  
**Version**: 2.0  
**Maintainer**: Enhanced Resume Matcher Team

