/**
 * API Integration Module
 * Handles communication with the backend Flask/FastAPI server
 */

const API_CONFIG = {
    baseURL: 'http://localhost:5000/api', // Change this to your backend URL
    endpoints: {
        analyze: '/analyze',
        health: '/health'
    }
};

/**
 * API Client Class
 */
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    /**
     * Make API request
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
    
    /**
     * Upload and analyze resumes
     */
    async analyzeResumes(jobDescription, files, onProgress) {
        const formData = new FormData();
        formData.append('job_description', jobDescription);
        
        // Add all files
        files.forEach((file, index) => {
            formData.append('resumes', file);
        });
        
        try {
            // For demo purposes, we'll simulate the API call
            // In production, uncomment the actual API call below
            
            return await this.simulateAnalysis(jobDescription, files, onProgress);
            
            // Actual API call (uncomment for production):
            /*
            const response = await fetch(`${this.baseURL}${API_CONFIG.endpoints.analyze}`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`Analysis failed: ${response.status}`);
            }
            
            return await response.json();
            */
        } catch (error) {
            console.error('Analysis failed:', error);
            throw error;
        }
    }
    
    /**
     * Simulate analysis for demo (remove in production)
     */
    async simulateAnalysis(jobDescription, files, onProgress) {
        // Simulate processing steps
        const steps = [
            { label: 'Extracting text from resumes...', progress: 25 },
            { label: 'Running BM25 analysis...', progress: 50 },
            { label: 'Computing FAISS embeddings...', progress: 75 },
            { label: 'Analyzing with Gemini AI...', progress: 90 },
            { label: 'Finalizing results...', progress: 100 }
        ];
        
        for (let i = 0; i < steps.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (onProgress) {
                onProgress(steps[i].progress, steps[i].label, i);
            }
        }
        
        // Generate mock results
        return this.generateMockResults(files);
    }
    
    /**
     * Generate mock results for demo
     */
    generateMockResults(files) {
        const results = files.map((file, index) => {
            const baseScore = 95 - (index * 8) - Math.random() * 10;
            const bm25 = baseScore + Math.random() * 5;
            const faiss = baseScore + Math.random() * 5;
            const gemini = baseScore + Math.random() * 5;
            const finalScore = Math.round((bm25 * 0.3 + faiss * 0.3 + gemini * 0.4));
            
            return {
                name: file.name,
                rank: index + 1,
                final_score: finalScore,
                bm25_score: Math.round(bm25),
                faiss_score: Math.round(faiss),
                gemini_score: Math.round(gemini),
                skills: this.generateMockSkills(),
                experience_years: Math.floor(Math.random() * 10) + 2,
                gemini_analysis: {
                    match_percentage: Math.round(gemini),
                    matching_skills: this.generateMockSkills().slice(0, 5),
                    missing_requirements: ['Advanced cloud architecture', 'Team leadership'],
                    experience_alignment: 'Strong alignment with required experience level',
                    strengths: [
                        'Excellent technical skills in required technologies',
                        'Strong problem-solving abilities',
                        'Good communication skills'
                    ],
                    concerns: [
                        'Limited experience with specific framework mentioned',
                        'May need additional training in domain-specific tools'
                    ],
                    recommendation: finalScore >= 70 ? 'Strongly recommend for interview' : 
                                   finalScore >= 50 ? 'Consider for interview' : 
                                   'May not meet minimum requirements'
                }
            };
        });
        
        // Sort by final score
        results.sort((a, b) => b.final_score - a.final_score);
        
        // Update ranks
        results.forEach((result, index) => {
            result.rank = index + 1;
        });
        
        return {
            success: true,
            results: results,
            summary: {
                total_resumes: files.length,
                average_score: Math.round(results.reduce((sum, r) => sum + r.final_score, 0) / results.length),
                best_match: results[0].name,
                best_score: results[0].final_score
            }
        };
    }
    
    /**
     * Generate mock skills
     */
    generateMockSkills() {
        const allSkills = [
            'Python', 'JavaScript', 'React', 'Node.js', 'AWS', 'Docker',
            'Kubernetes', 'Machine Learning', 'SQL', 'MongoDB', 'Git',
            'CI/CD', 'Agile', 'REST API', 'GraphQL', 'TypeScript'
        ];
        
        const count = Math.floor(Math.random() * 6) + 5;
        const shuffled = allSkills.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    /**
     * Check API health
     */
    async checkHealth() {
        try {
            return await this.request(API_CONFIG.endpoints.health);
        } catch (error) {
            console.error('Health check failed:', error);
            return { status: 'offline' };
        }
    }
}

/**
 * Create global API client instance
 */
const apiClient = new APIClient(API_CONFIG.baseURL);

/**
 * Export for use in other modules
 */
window.apiClient = apiClient;

