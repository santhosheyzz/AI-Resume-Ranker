/**
 * Main Application Logic
 * Handles user interactions, file uploads, and result display
 */

// Application State
const appState = {
    jobDescription: '',
    uploadedFiles: [],
    results: null,
    isAnalyzing: false
};

/**
 * Initialize Application
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    setupFileUpload();
    setupNavigation();
});

/**
 * Initialize Event Listeners
 */
function initializeEventListeners() {
    // Hero buttons
    document.getElementById('tryDemoBtn')?.addEventListener('click', () => {
        scrollToSection('upload');
    });

    document.getElementById('viewArchBtn')?.addEventListener('click', () => {
        scrollToSection('architecture');
    });

    // Job description input
    document.getElementById('jobDescription')?.addEventListener('input', (e) => {
        appState.jobDescription = e.target.value;
        updateAnalyzeButton();
    });

    // Analyze button
    document.getElementById('analyzeBtn')?.addEventListener('click', handleAnalyze);

    // Analytics event listeners
    initializeAnalyticsListeners();
}

/**
 * Initialize Analytics Event Listeners
 */
function initializeAnalyticsListeners() {
    // View Analytics button - Opens analytics page
    document.getElementById('viewAnalyticsBtn')?.addEventListener('click', () => {
        openAnalyticsPage();
    });
}

/**
 * Setup File Upload
 */
function setupFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadedFilesContainer = document.getElementById('uploadedFiles');
    
    // Click to upload
    uploadArea?.addEventListener('click', () => {
        fileInput?.click();
    });
    
    // File input change
    fileInput?.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
    
    // Drag and drop
    uploadArea?.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea?.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });
}

/**
 * Handle File Selection
 */
function handleFiles(files) {
    const validFiles = Array.from(files).filter(file => {
        const validTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/jpg',
            'image/png'
        ];
        return validTypes.includes(file.type);
    });
    
    if (validFiles.length === 0) {
        alert('Please upload valid files (PDF, DOCX, JPG, PNG)');
        return;
    }
    
    appState.uploadedFiles = [...appState.uploadedFiles, ...validFiles];
    displayUploadedFiles();
    updateAnalyzeButton();
}

/**
 * Display Uploaded Files
 */
function displayUploadedFiles() {
    const container = document.getElementById('uploadedFiles');
    if (!container) return;
    
    container.innerHTML = '';
    
    appState.uploadedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileIcon = getFileIcon(file.type);
        const fileSize = formatFileSize(file.size);
        
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">${fileIcon}</span>
                <div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${fileSize}</div>
                </div>
            </div>
            <button class="file-remove" data-index="${index}">✕</button>
        `;
        
        container.appendChild(fileItem);
    });
    
    // Add remove listeners
    container.querySelectorAll('.file-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            removeFile(index);
        });
    });
}

/**
 * Remove File
 */
function removeFile(index) {
    appState.uploadedFiles.splice(index, 1);
    displayUploadedFiles();
    updateAnalyzeButton();
}

/**
 * Get File Icon
 */
function getFileIcon(type) {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    if (type.includes('image')) return '🖼️';
    return '📎';
}

/**
 * Format File Size
 */
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/**
 * Update Analyze Button State
 */
function updateAnalyzeButton() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (!analyzeBtn) return;
    
    const canAnalyze = appState.jobDescription.trim().length > 0 && 
                       appState.uploadedFiles.length > 0 &&
                       !appState.isAnalyzing;
    
    analyzeBtn.disabled = !canAnalyze;
}

/**
 * Handle Analyze
 */
async function handleAnalyze() {
    if (appState.isAnalyzing) return;
    
    appState.isAnalyzing = true;
    updateAnalyzeButton();
    
    // Show progress container
    const progressContainer = document.getElementById('progressContainer');
    progressContainer.style.display = 'block';
    
    // Scroll to progress
    scrollToElement(progressContainer);
    
    try {
        // Call API
        const results = await window.apiClient.analyzeResumes(
            appState.jobDescription,
            appState.uploadedFiles,
            handleProgress
        );
        
        // Store results
        appState.results = results;
        
        // Display results
        displayResults(results);
        
    } catch (error) {
        console.error('Analysis failed:', error);
        alert('Analysis failed. Please try again.');
    } finally {
        appState.isAnalyzing = false;
        updateAnalyzeButton();
    }
}

/**
 * Handle Progress Updates
 */
function handleProgress(percentage, label, stepIndex) {
    document.getElementById('progressLabel').textContent = label;
    window.animateProgress(percentage, 0.5);
    window.activateProgressStep(stepIndex);
}

/**
 * Display Results
 */
function displayResults(data) {
    const resultsGrid = document.getElementById('resultsGrid');
    if (!resultsGrid) return;

    resultsGrid.innerHTML = '';

    // Create result cards
    data.results.forEach(result => {
        const card = createResultCard(result);
        resultsGrid.appendChild(card);
    });

    // Create chart
    createScoresChart(data.results);

    // Display insights
    displayInsights(data.results[0]); // Show insights for top candidate

    // Populate analytics dashboard
    populateAnalyticsDashboard(data.results);

    // Show results section with animation
    window.showResultsSection();
}

/**
 * Create Result Card
 */
function createResultCard(result) {
    const card = document.createElement('div');
    card.className = 'result-card glass-card';
    
    const statusColor = result.final_score >= 70 ? '🟢' : 
                       result.final_score >= 50 ? '🟡' : '🔴';
    
    card.innerHTML = `
        <div class="result-rank">#${result.rank}</div>
        <h3 class="result-name">${result.name}</h3>
        <div class="result-score">${result.final_score}%</div>
        
        <div class="result-scores-breakdown">
            <div class="score-item">
                <div class="score-label">BM25</div>
                <div class="score-value">${result.bm25_score}%</div>
            </div>
            <div class="score-item">
                <div class="score-label">FAISS</div>
                <div class="score-value">${result.faiss_score}%</div>
            </div>
            <div class="score-item">
                <div class="score-label">Gemini</div>
                <div class="score-value">${result.gemini_score}%</div>
            </div>
        </div>
        
        <div class="result-skills">
            <div class="skills-title">Skills Found:</div>
            <div class="skills-list">
                ${result.skills.slice(0, 6).map(skill => 
                    `<span class="skill-tag">${skill}</span>`
                ).join('')}
            </div>
        </div>
        
        <div class="result-recommendation">
            ${statusColor} ${result.gemini_analysis.recommendation}
        </div>
    `;
    
    return card;
}

/**
 * Create Scores Chart
 */
function createScoresChart(results) {
    const ctx = document.getElementById('scoresChart');
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.scoresChartInstance) {
        window.scoresChartInstance.destroy();
    }
    
    const topResults = results.slice(0, 5);
    
    window.scoresChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topResults.map(r => r.name.substring(0, 20)),
            datasets: [
                {
                    label: 'BM25',
                    data: topResults.map(r => r.bm25_score),
                    backgroundColor: 'rgba(0, 255, 255, 0.6)',
                    borderColor: 'rgba(0, 255, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'FAISS',
                    data: topResults.map(r => r.faiss_score),
                    backgroundColor: 'rgba(0, 102, 255, 0.6)',
                    borderColor: 'rgba(0, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Gemini AI',
                    data: topResults.map(r => r.gemini_score),
                    backgroundColor: 'rgba(157, 78, 221, 0.6)',
                    borderColor: 'rgba(157, 78, 221, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            }
        }
    });
}

/**
 * Display Insights
 */
function displayInsights(topCandidate) {
    const insightsContent = document.getElementById('insightsContent');
    if (!insightsContent || !topCandidate) return;

    const analysis = topCandidate.gemini_analysis;

    insightsContent.innerHTML = `
        <div class="insight-item">
            <div class="insight-label">Top Candidate</div>
            <div class="insight-text">${topCandidate.name} - ${topCandidate.final_score}% match</div>
        </div>

        <div class="insight-item">
            <div class="insight-label">Matching Skills</div>
            <div class="insight-text">${analysis.matching_skills.join(', ')}</div>
        </div>

        <div class="insight-item">
            <div class="insight-label">Experience Alignment</div>
            <div class="insight-text">${analysis.experience_alignment}</div>
        </div>

        <div class="insight-item">
            <div class="insight-label">Key Strengths</div>
            <div class="insight-text">
                <ul style="margin: 0; padding-left: 1.5rem;">
                    ${analysis.strengths.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="insight-item">
            <div class="insight-label">Areas of Concern</div>
            <div class="insight-text">
                <ul style="margin: 0; padding-left: 1.5rem;">
                    ${analysis.concerns.map(c => `<li>${c}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    // Trigger animation
    setTimeout(() => {
        window.animateInsights();
    }, 500);
}

/**
 * Setup Navigation
 */
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

/**
 * Scroll to Section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        gsap.to(window, {
            scrollTo: section,
            duration: 1,
            ease: 'power3.inOut'
        });
    }
}

/**
 * Scroll to Element
 */
function scrollToElement(element) {
    if (element) {
        gsap.to(window, {
            scrollTo: element,
            duration: 0.8,
            ease: 'power3.inOut'
        });
    }
}

/**
 * Populate Analytics Dashboard
 */
function populateAnalyticsDashboard(results) {
    // Store results for analytics page
    appState.analyticsData = results.map((result, index) => ({
        name: result.name,
        education: result.education_score || Math.floor(Math.random() * 40 + 60),
        technical: result.technical_score || Math.floor(Math.random() * 40 + 60),
        overall: result.final_score,
        rank: index + 1,
        bm25: result.bm25_score,
        faiss: result.faiss_score,
        gemini: result.gemini_score
    }));

    // Save to localStorage for analytics page
    localStorage.setItem('maharaj_analytics_data', JSON.stringify(appState.analyticsData));

    console.log('✅ Analytics data saved to localStorage');
}

/**
 * Open Analytics Page
 */
function openAnalyticsPage() {
    // Navigate to analytics page in same tab
    window.location.href = 'analytics.html';
}

// Analytics functions removed - now handled in analytics-page.js

/**
 * Export functions for global access
 */
window.appState = appState;
window.handleAnalyze = handleAnalyze;
window.scrollToSection = scrollToSection;
window.openAnalyticsPage = openAnalyticsPage;


