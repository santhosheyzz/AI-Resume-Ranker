DETAILED_ANALYSIS_PROMPT = """
You are an expert HR recruiter analyzing resume-job fit. Compare this job description with the candidate's resume:

JOB DESCRIPTION:
{job_description}

RESUME:
{resume_text}

Provide detailed analysis in JSON format:
{{
    "overall_match": {{
        "percentage": <0-100>,
        "confidence": "<high/medium/low>",
        "reasoning": "<explanation>"
    }},
    "skills_analysis": {{
        "matching_skills": [<exact matches>],
        "partial_matches": [<similar skills>],
        "missing_critical": [<required but missing>],
        "bonus_skills": [<extra valuable skills>]
    }},
    "experience_analysis": {{
        "years_match": "<assessment>",
        "domain_relevance": "<score 1-10>",
        "role_alignment": "<explanation>"
    }},
    "recommendation": {{
        "hire_probability": "<high/medium/low>",
        "interview_focus": [<areas to explore>],
        "red_flags": [<concerns>]
    }}
}}

Be precise and professional in your analysis.
"""