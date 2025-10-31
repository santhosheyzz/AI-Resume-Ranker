@echo off
echo ========================================
echo Enhanced Resume Matcher v2.0 Setup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from https://www.python.org/
    pause
    exit /b 1
)

echo [1/5] Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo ERROR: Failed to create virtual environment
    pause
    exit /b 1
)

echo [2/5] Activating virtual environment...
call venv\Scripts\activate.bat

echo [3/5] Upgrading pip...
python -m pip install --upgrade pip

echo [4/5] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [5/5] Downloading spaCy language model...
python -m spacy download en_core_web_sm
if errorlevel 1 (
    echo WARNING: Failed to download spaCy model
    echo You may need to run: python -m spacy download en_core_web_sm
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Copy .env.example to .env and configure your API keys
echo 2. Set GOOGLE_APPLICATION_CREDENTIALS environment variable
echo 3. Run: streamlit run app.py
echo.
echo To activate the virtual environment in the future:
echo   venv\Scripts\activate
echo.
pause

