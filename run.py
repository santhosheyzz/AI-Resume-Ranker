#!/usr/bin/env python
"""
Maharaj AI Resume Analyzer - Single Command Launcher
Run both backend and frontend servers with one command
"""

import subprocess
import sys
import os
import time
import webbrowser
from pathlib import Path

def print_banner():
    """Print application banner"""
    print("=" * 60)
    print("🤖 Maharaj AI Resume Analyzer")
    print("=" * 60)
    print()

def check_dependencies():
    """Check if required packages are installed"""
    try:
        import flask
        import flask_cors
        print("✅ Flask dependencies found")
        return True
    except ImportError:
        print("❌ Flask not found. Installing dependencies...")
        subprocess.run([sys.executable, "-m", "pip", "install", "flask", "flask-cors"])
        return True

def start_servers():
    """Start both backend and frontend servers"""
    print_banner()
    
    # Check dependencies
    check_dependencies()
    
    # Get current directory
    current_dir = Path(__file__).parent
    frontend_dir = current_dir / "frontend"
    
    print("🚀 Starting servers...")
    print()
    
    # Start backend API
    print("📡 Starting Backend API on http://localhost:5000")
    backend_process = subprocess.Popen(
        [sys.executable, "backend_api.py"],
        cwd=current_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    # Wait a bit for backend to start
    time.sleep(2)
    
    # Start frontend server
    print("🌐 Starting Frontend Server on http://localhost:8080")
    frontend_process = subprocess.Popen(
        [sys.executable, "-m", "http.server", "8080"],
        cwd=frontend_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    # Wait for frontend to start
    time.sleep(2)
    
    print()
    print("=" * 60)
    print("✅ Application Started Successfully!")
    print("=" * 60)
    print()
    print("📍 URLs:")
    print("   Frontend:  http://localhost:8080")
    print("   Backend:   http://localhost:5000")
    print()
    print("🎯 Opening browser...")
    print()
    
    # Open browser
    time.sleep(1)
    webbrowser.open("http://localhost:8080")
    
    print("=" * 60)
    print("⚡ Application is running!")
    print("=" * 60)
    print()
    print("📝 Instructions:")
    print("   1. Enter a job description")
    print("   2. Upload resume files (PDF, DOCX, images)")
    print("   3. Click 'Analyze Now'")
    print("   4. View AI-powered results!")
    print()
    print("🛑 Press Ctrl+C to stop all servers")
    print("=" * 60)
    print()
    
    try:
        # Keep running until user stops
        backend_process.wait()
        frontend_process.wait()
    except KeyboardInterrupt:
        print()
        print("🛑 Stopping servers...")
        backend_process.terminate()
        frontend_process.terminate()
        backend_process.wait()
        frontend_process.wait()
        print("✅ All servers stopped")
        print()
        print("👋 Thank you for using Maharaj AI Resume Analyzer!")
        print()

if __name__ == "__main__":
    start_servers()

