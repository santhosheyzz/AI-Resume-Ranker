#!/bin/bash

echo "============================================================"
echo "Maharaj AI Resume Analyzer"
echo "============================================================"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "$SCRIPT_DIR"
python run.py

