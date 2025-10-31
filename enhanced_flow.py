import streamlit as st
import google.generativeai as genai
from google.cloud import vision
import io
import json
import tempfile
import os

# Configure Gemini API
GEMINI_API_KEY = "AIzaSyD06chb5o4PMqghGspRqZVPsGBzEZ0S7vI"
genai.configure(api_key=GEMINI_API_KEY)

class EnhancedResumeProcessor:
    def __init__(self):
        self.vision_client = vision.ImageAnnotatorClient()
        self.gemini_model = genai.GenerativeModel('gemini-pro')
    
    def extract_text_with_vision(self, file):
        """Extract text using Google Cloud Vision API"""
        if file.type == "application/pdf":
            return self._extract_pdf_vision(file)
        elif file.type in ["image/jpeg", "image/png", "image/jpg"]:
            return self._extract_image_vision(file)
        else:
            # Fallback to existing methods
            return self._extract_traditional(file)
    
    def _extract_image_vision(self, image_file):
        """Extract text from image using Vision API"""
        content = image_file.read()
        image = vision.Image(content=content)
        response = self.vision_client.text_detection(image=image)
        
        if response.text_annotations:
            return response.text_annotations[0].description
        return ""
    
    def gemini_similarity_analysis(self, job_description, resume_text):
        """Use Gemini to analyze similarity and provide weighted scoring"""
        prompt = f"""
        Analyze the similarity between this job description and resume. Provide a detailed comparison:

        JOB DESCRIPTION:
        {job_description}

        RESUME:
        {resume_text}

        Please provide:
        1. Overall match percentage (0-100)
        2. Key matching skills/keywords
        3. Missing critical requirements
        4. Experience level alignment
        5. Specific strengths of this candidate
        6. Areas of concern

        Format your response as JSON:
        {{
            "match_percentage": <number>,
            "matching_skills": [<list of skills>],
            "missing_requirements": [<list>],
            "experience_alignment": "<assessment>",
            "strengths": [<list>],
            "concerns": [<list>],
            "detailed_analysis": "<explanation>"
        }}
        """
        
        try:
            response = self.gemini_model.generate_content(prompt)
            return json.loads(response.text)
        except Exception as e:
            st.error(f"Gemini API error: {str(e)}")
            return None

def calculate_ensemble_score(bm25_score, faiss_score, gemini_analysis):
    """Calculate final ensemble score using three models"""
    if not gemini_analysis:
        # Fallback to original hybrid scoring
        return 0.6 * bm25_score + 0.4 * faiss_score
    
    gemini_score = gemini_analysis.get("match_percentage", 50)
    
    # Weighted ensemble: BM25 (30%) + FAISS (30%) + Gemini (40%)
    final_score = (0.3 * bm25_score + 
                   0.3 * faiss_score + 
                   0.4 * gemini_score)
    
    return round(final_score, 2)