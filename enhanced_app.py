def main():
    st.set_page_config(page_title="Enhanced Resume Matcher", page_icon="🤖", layout="wide")
    
    st.title("🤖 AI-Powered Resume Matcher v2.0")
    st.markdown("### Enhanced with Google Cloud Vision + Gemini AI")
    
    # Initialize processor
    processor = EnhancedResumeProcessor()
    
    # File upload with expanded support
    uploaded_files = st.file_uploader(
        "Upload Resumes (PDF, DOCX, Images)",
        type=["pdf", "docx", "jpg", "jpeg", "png"],
        accept_multiple_files=True
    )
    
    job_description = st.text_area("Job Description", height=200)
    
    if st.button("🚀 Start Enhanced Analysis"):
        results = []
        
        for file in uploaded_files:
            # Step 1: Extract text (Vision API for images/PDFs)
            text = processor.extract_text_with_vision(file)
            
            # Step 2: Traditional BM25 + FAISS scoring
            bm25_score = calculate_bm25_score(text, job_description)
            faiss_score = calculate_faiss_score(text, job_description)
            
            # Step 3: Gemini AI analysis
            gemini_analysis = processor.gemini_similarity_analysis(job_description, text)
            
            # Step 4: Ensemble scoring
            final_score = calculate_ensemble_score(bm25_score, faiss_score, gemini_analysis)
            
            results.append({
                "name": file.name,
                "final_score": final_score,
                "bm25_score": bm25_score,
                "faiss_score": faiss_score,
                "gemini_analysis": gemini_analysis
            })
        
        # Display enhanced results
        display_enhanced_results(results)