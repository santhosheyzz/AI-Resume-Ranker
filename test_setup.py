"""
Test script to verify Enhanced Resume Matcher setup
Run this to check if all dependencies and APIs are configured correctly
"""

import sys
import os

def test_python_version():
    """Check Python version"""
    print("🐍 Checking Python version...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print(f"   ✅ Python {version.major}.{version.minor}.{version.micro} (OK)")
        return True
    else:
        print(f"   ❌ Python {version.major}.{version.minor}.{version.micro} (Need 3.8+)")
        return False

def test_imports():
    """Test if all required packages are installed"""
    print("\n📦 Checking required packages...")
    
    packages = [
        ("streamlit", "Streamlit"),
        ("google.generativeai", "Google Generative AI"),
        ("google.cloud.vision", "Google Cloud Vision"),
        ("nltk", "NLTK"),
        ("spacy", "spaCy"),
        ("PyPDF2", "PyPDF2"),
        ("docx", "python-docx"),
        ("rank_bm25", "Rank-BM25"),
        ("sentence_transformers", "Sentence Transformers"),
        ("langchain", "LangChain"),
        ("langchain_community", "LangChain Community"),
        ("faiss", "FAISS"),
        ("pandas", "Pandas"),
        ("numpy", "NumPy"),
        ("matplotlib", "Matplotlib"),
    ]
    
    all_ok = True
    for module, name in packages:
        try:
            __import__(module)
            print(f"   ✅ {name}")
        except ImportError:
            print(f"   ❌ {name} - NOT INSTALLED")
            all_ok = False
    
    return all_ok

def test_spacy_model():
    """Check if spaCy language model is downloaded"""
    print("\n🔤 Checking spaCy language model...")
    try:
        import spacy
        nlp = spacy.load("en_core_web_sm")
        print("   ✅ en_core_web_sm model loaded")
        return True
    except OSError:
        print("   ❌ en_core_web_sm model NOT FOUND")
        print("      Run: python -m spacy download en_core_web_sm")
        return False
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_nltk_data():
    """Check if NLTK data is downloaded"""
    print("\n📚 Checking NLTK data...")
    try:
        import nltk
        
        # Try to find punkt tokenizer
        try:
            nltk.data.find('tokenizers/punkt')
            print("   ✅ punkt tokenizer")
        except LookupError:
            print("   ⚠️  punkt tokenizer - downloading...")
            nltk.download('punkt', quiet=True)
            print("   ✅ punkt tokenizer downloaded")
        
        # Try to find stopwords
        try:
            nltk.data.find('corpora/stopwords')
            print("   ✅ stopwords corpus")
        except LookupError:
            print("   ⚠️  stopwords corpus - downloading...")
            nltk.download('stopwords', quiet=True)
            print("   ✅ stopwords corpus downloaded")
        
        return True
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def test_google_credentials():
    """Check Google Cloud credentials"""
    print("\n☁️  Checking Google Cloud credentials...")
    
    creds_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    
    if not creds_path:
        print("   ⚠️  GOOGLE_APPLICATION_CREDENTIALS not set")
        print("      Vision API will not work for image processing")
        print("      Set environment variable to your service account JSON key")
        return False
    
    if not os.path.exists(creds_path):
        print(f"   ❌ Credentials file not found: {creds_path}")
        return False
    
    print(f"   ✅ Credentials file found: {creds_path}")
    
    # Try to initialize Vision client
    try:
        from google.cloud import vision
        client = vision.ImageAnnotatorClient()
        print("   ✅ Vision API client initialized")
        return True
    except Exception as e:
        print(f"   ❌ Failed to initialize Vision API: {str(e)}")
        return False

def test_gemini_api():
    """Check Gemini API configuration"""
    print("\n🤖 Checking Gemini API...")
    
    # Try to load from .env
    try:
        from dotenv import load_dotenv
        load_dotenv()
    except:
        pass
    
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        print("   ⚠️  GEMINI_API_KEY not found in environment")
        print("      Checking app.py for hardcoded key...")
        # Check if key is in app.py
        try:
            with open("app.py", "r") as f:
                content = f.read()
                if "AIzaSy" in content:
                    print("   ✅ API key found in app.py")
                    return True
        except:
            pass
        print("   ❌ No Gemini API key configured")
        print("      Set GEMINI_API_KEY in .env or app.py")
        return False
    
    if not api_key.startswith("AIzaSy"):
        print(f"   ⚠️  API key format looks incorrect: {api_key[:10]}...")
        return False
    
    print(f"   ✅ API key configured: {api_key[:10]}...")
    
    # Try to initialize Gemini
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        print("   ✅ Gemini API client initialized")
        return True
    except Exception as e:
        print(f"   ❌ Failed to initialize Gemini API: {str(e)}")
        return False

def test_sentence_transformers():
    """Test sentence transformers model download"""
    print("\n🧠 Checking Sentence Transformers model...")
    try:
        from sentence_transformers import SentenceTransformer
        print("   ⏳ Loading model (this may take a moment on first run)...")
        model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        print("   ✅ Model loaded successfully")
        return True
    except Exception as e:
        print(f"   ❌ Error loading model: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("=" * 60)
    print("Enhanced Resume Matcher v2.0 - Setup Verification")
    print("=" * 60)
    
    results = []
    
    results.append(("Python Version", test_python_version()))
    results.append(("Required Packages", test_imports()))
    results.append(("spaCy Model", test_spacy_model()))
    results.append(("NLTK Data", test_nltk_data()))
    results.append(("Google Cloud Credentials", test_google_credentials()))
    results.append(("Gemini API", test_gemini_api()))
    results.append(("Sentence Transformers", test_sentence_transformers()))
    
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {name}")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    print("\n" + "=" * 60)
    print(f"Results: {passed}/{total} tests passed")
    print("=" * 60)
    
    if passed == total:
        print("\n🎉 All tests passed! You're ready to run the application.")
        print("\nRun: streamlit run app.py")
    else:
        print("\n⚠️  Some tests failed. Please fix the issues above.")
        print("\nCommon fixes:")
        print("  - Install missing packages: pip install -r requirements.txt")
        print("  - Download spaCy model: python -m spacy download en_core_web_sm")
        print("  - Set GOOGLE_APPLICATION_CREDENTIALS environment variable")
        print("  - Configure GEMINI_API_KEY in .env file")
    
    print("\n")

if __name__ == "__main__":
    main()

