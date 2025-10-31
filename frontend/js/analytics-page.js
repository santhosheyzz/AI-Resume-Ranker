/**
 * Analytics Page JavaScript
 * Handles analytics dashboard on separate page
 */

// Application state
const analyticsState = {
    analyticsData: null,
    filteredData: null
};

/**
 * Initialize Analytics Page
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeAnalyticsPage();
    initializeEventListeners();
});

/**
 * Initialize Analytics Page
 */
function initializeAnalyticsPage() {
    // Load analytics data from localStorage
    const storedData = localStorage.getItem('maharaj_analytics_data');
    
    if (storedData) {
        try {
            const data = JSON.parse(storedData);
            analyticsState.analyticsData = data;
            analyticsState.filteredData = data;
            
            // Show analytics content
            document.getElementById('noDataMessage').style.display = 'none';
            document.getElementById('analyticsContent').style.display = 'block';
            
            // Populate dashboard
            populateDashboard(data);
            
            // Animate entrance
            setTimeout(() => {
                animateEntrance();
            }, 100);
            
        } catch (error) {
            console.error('Error loading analytics data:', error);
            showNoDataMessage();
        }
    } else {
        showNoDataMessage();
    }
}

/**
 * Show No Data Message
 */
function showNoDataMessage() {
    document.getElementById('noDataMessage').style.display = 'flex';
    document.getElementById('analyticsContent').style.display = 'none';
}

/**
 * Populate Dashboard
 */
function populateDashboard(data) {
    updateAnalyticsTable(data);
    createComparisonChart(data);
    createDistributionChart(data);
}

/**
 * Initialize Event Listeners
 */
function initializeEventListeners() {
    // Sort dropdown
    document.getElementById('sortBy')?.addEventListener('change', (e) => {
        sortAnalyticsTable(e.target.value);
    });
    
    // Search input
    document.getElementById('searchCandidate')?.addEventListener('input', (e) => {
        filterAnalyticsTable(e.target.value);
    });
    
    // Export button
    document.getElementById('exportBtn')?.addEventListener('click', exportToCSV);
}

/**
 * Update Analytics Table
 */
function updateAnalyticsTable(data) {
    const tbody = document.getElementById('analyticsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    data.forEach((candidate, index) => {
        const row = document.createElement('tr');
        row.className = 'table-row';
        
        const getScoreBadge = (score) => {
            if (score >= 75) return 'score-high';
            if (score >= 50) return 'score-medium';
            return 'score-low';
        };
        
        row.innerHTML = `
            <td class="table-cell">
                <div class="candidate-name">${candidate.name}</div>
            </td>
            <td class="table-cell">
                <span class="score-badge ${getScoreBadge(candidate.education)}">${candidate.education}%</span>
            </td>
            <td class="table-cell">
                <span class="score-badge ${getScoreBadge(candidate.technical)}">${candidate.technical}%</span>
            </td>
            <td class="table-cell">
                <span class="score-badge ${getScoreBadge(candidate.overall)}">${candidate.overall}%</span>
            </td>
            <td class="table-cell">
                <div class="rank-badge">${candidate.rank}</div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

/**
 * Sort Analytics Table
 */
function sortAnalyticsTable(sortBy) {
    if (!analyticsState.filteredData) return;
    
    const sorted = [...analyticsState.filteredData].sort((a, b) => {
        switch(sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'education':
                return b.education - a.education;
            case 'technical':
                return b.technical - a.technical;
            case 'overall':
            default:
                return b.overall - a.overall;
        }
    });
    
    // Update ranks
    sorted.forEach((item, index) => {
        item.rank = index + 1;
    });
    
    updateAnalyticsTable(sorted);
}

/**
 * Filter Analytics Table
 */
function filterAnalyticsTable(searchTerm) {
    if (!analyticsState.analyticsData) return;
    
    const filtered = analyticsState.analyticsData.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    analyticsState.filteredData = filtered;
    updateAnalyticsTable(filtered);
}

/**
 * Export to CSV
 */
function exportToCSV() {
    if (!analyticsState.analyticsData) return;
    
    // Create CSV content
    const headers = ['Candidate Name', 'Education Score', 'Technical Score', 'Overall Match %', 'Rank', 'BM25', 'FAISS', 'Gemini'];
    const rows = analyticsState.analyticsData.map(candidate => [
        candidate.name,
        candidate.education,
        candidate.technical,
        candidate.overall,
        candidate.rank,
        candidate.bm25 || 'N/A',
        candidate.faiss || 'N/A',
        candidate.gemini || 'N/A'
    ]);
    
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.join(',') + '\n';
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_analysis_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    showNotification('✅ CSV exported successfully!');
}

/**
 * Create Comparison Chart (Technical vs Education)
 */
function createComparisonChart(data) {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.comparisonChartInstance) {
        window.comparisonChartInstance.destroy();
    }
    
    window.comparisonChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.name),
            datasets: [
                {
                    label: 'Technical Score',
                    data: data.map(d => d.technical),
                    backgroundColor: 'rgba(0, 255, 255, 0.6)',
                    borderColor: 'rgba(0, 255, 255, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Education Score',
                    data: data.map(d => d.education),
                    backgroundColor: 'rgba(157, 78, 221, 0.6)',
                    borderColor: 'rgba(157, 78, 221, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff',
                        font: { size: 14, family: 'Inter' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(11, 19, 43, 0.9)',
                    titleColor: '#00FFFF',
                    bodyColor: '#ffffff',
                    borderColor: '#00FFFF',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { color: '#ffffff' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    ticks: { color: '#ffffff' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            }
        }
    });
}

/**
 * Create Distribution Chart
 */
function createDistributionChart(data) {
    const ctx = document.getElementById('distributionChart');
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.distributionChartInstance) {
        window.distributionChartInstance.destroy();
    }
    
    // Group by score ranges
    const ranges = {
        'Excellent (90-100%)': 0,
        'Good (75-89%)': 0,
        'Average (50-74%)': 0,
        'Below Average (<50%)': 0
    };
    
    data.forEach(candidate => {
        if (candidate.overall >= 90) ranges['Excellent (90-100%)']++;
        else if (candidate.overall >= 75) ranges['Good (75-89%)']++;
        else if (candidate.overall >= 50) ranges['Average (50-74%)']++;
        else ranges['Below Average (<50%)']++;
    });
    
    window.distributionChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(ranges),
            datasets: [{
                data: Object.values(ranges),
                backgroundColor: [
                    'rgba(0, 255, 0, 0.6)',
                    'rgba(0, 255, 255, 0.6)',
                    'rgba(255, 255, 0, 0.6)',
                    'rgba(255, 100, 100, 0.6)'
                ],
                borderColor: [
                    'rgba(0, 255, 0, 1)',
                    'rgba(0, 255, 255, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 100, 100, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#ffffff',
                        font: { size: 12, family: 'Inter' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(11, 19, 43, 0.9)',
                    titleColor: '#00FFFF',
                    bodyColor: '#ffffff',
                    borderColor: '#00FFFF',
                    borderWidth: 1
                }
            }
        }
    });
}

/**
 * Animate Entrance
 */
function animateEntrance() {
    const tableRows = document.querySelectorAll('.table-row');
    const charts = document.querySelectorAll('.chart-card');
    
    if (typeof gsap !== 'undefined') {
        gsap.from(tableRows, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out'
        });
        
        gsap.from(charts, {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.3
        });
    }
}

/**
 * Show Notification
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification glass-card';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: rgba(0, 255, 255, 0.1);
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 12px;
        color: #00FFFF;
        font-family: Inter, sans-serif;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

