from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import os
import json
import re
from datetime import datetime

app = Flask(__name__)
CORS(app)

API_KEY = 'your-secret-api-key'


SAMPLE_RESUME_DATA = {
    "name": "John Doe",
    "contact": "john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe",
    "summary": "Experienced software engineer with 5+ years developing scalable web applications using modern technologies. Proven track record of leading teams and delivering high-quality solutions.",
    "experience": [
        {
            "title": "Senior Software Engineer",
            "company": "Tech Corp",
            "duration": "2021 - Present",
            "achievements": [
                "Led development of microservices architecture serving 1M+ users",
                "Improved application performance by 40% through optimization",
                "Mentored 3 junior developers and conducted code reviews"
            ]
        },
        {
            "title": "Software Engineer",
            "company": "Startup Inc",
            "duration": "2019 - 2021",
            "achievements": [
                "Developed full-stack web applications using React and Node.js",
                "Collaborated with cross-functional teams to deliver features",
                "Implemented CI/CD pipelines reducing deployment time by 60%"
            ]
        }
    ],
    "skills": [
        "JavaScript, Python, React, Node.js",
        "AWS, Docker, Kubernetes",
        "Agile/Scrum, Git, REST APIs",
        "MongoDB, PostgreSQL, Redis"
    ],
    "education": [
        {
            "degree": "Bachelor of Science in Computer Science",
            "institution": "University of Technology",
            "year": "2019"
        }
    ]
}

def analyze_resume_content(file_content, job_title, experience_level, industry, additional_info):
    """Analyze resume content and generate intelligent suggestions"""
    
    suggestions = {
        "keyImprovements": [],
        "skillsEnhancement": [],
        "experienceOptimization": [],
        "atsOptimization": []
    }
    
  
    if experience_level == "entry":
        suggestions["keyImprovements"].extend([
            {
                "title": "Add Quantifiable Achievements",
                "description": "Include specific metrics and numbers to demonstrate impact (e.g., 'Increased efficiency by 25%', 'Managed team of 5 developers')"
            },
            {
                "title": "Include Relevant Projects",
                "description": "Add personal or academic projects that showcase your technical skills and problem-solving abilities"
            }
        ])
    elif experience_level == "mid":
        suggestions["keyImprovements"].extend([
            {
                "title": "Highlight Leadership Experience",
                "description": "Emphasize team leadership, mentoring, and project management responsibilities"
            },
            {
                "title": "Showcase Technical Depth",
                "description": "Include advanced technical skills and architectural decisions you've made"
            }
        ])
    
   
    if industry == "technology":
        suggestions["skillsEnhancement"].extend([
            {
                "title": "Add Cloud Technologies",
                "description": "Include AWS, Azure, or Google Cloud Platform experience if applicable"
            },
            {
                "title": "Highlight DevOps Skills",
                "description": "Add Docker, Kubernetes, CI/CD pipeline experience"
            }
        ])
    elif industry == "finance":
        suggestions["skillsEnhancement"].extend([
            {
                "title": "Include Financial Tools",
                "description": "Add experience with financial software, data analysis tools, or regulatory compliance"
            }
        ])
    
    
    suggestions["experienceOptimization"].extend([
        {
            "title": "Use Action Verbs",
            "description": "Start bullet points with strong action verbs like 'Developed', 'Implemented', 'Led', 'Optimized'"
        },
        {
            "title": "Focus on Results",
            "description": "Emphasize outcomes and impact rather than just responsibilities"
        }
    ])
    
  
    suggestions["atsOptimization"].extend([
        {
            "title": "Keyword Optimization",
            "description": f"Include relevant keywords from the job description for '{job_title}' position"
        },
        {
            "title": "Simple Formatting",
            "description": "Use standard fonts (Arial, Calibri) and avoid complex formatting that ATS systems can't read"
        },
        {
            "title": "Clear Section Headers",
            "description": "Use standard section headers like 'Experience', 'Education', 'Skills' for better ATS parsing"
        }
    ])
    
    return suggestions

def generate_improved_resume(original_data, job_title, experience_level, industry, additional_info):
    """Generate an improved resume based on analysis and suggestions"""
    
    improved_resume = original_data.copy()
    
    if experience_level == "senior" or experience_level == "executive":
        improved_resume["summary"] = f"Senior {job_title} with extensive experience in {industry} industry. Proven track record of leading teams, driving innovation, and delivering high-impact solutions. Strong expertise in strategic planning and cross-functional collaboration."
    elif experience_level == "entry":
        improved_resume["summary"] = f"Motivated {job_title} with strong foundation in {industry} technologies and eagerness to learn and grow. Demonstrated ability to quickly adapt to new technologies and contribute to team success."
    
    if industry == "technology":
        improved_resume["skills"].extend([
            "Cloud Computing (AWS/Azure)",
            "Microservices Architecture",
            "API Design & Development"
        ])
    elif industry == "healthcare":
        improved_resume["skills"].extend([
            "HIPAA Compliance",
            "Electronic Health Records",
            "Healthcare Data Analytics"
        ])
    

    for exp in improved_resume["experience"]:
        if not any(char.isdigit() for char in ' '.join(exp["achievements"])):
            exp["achievements"].append("Improved system performance by 30% through optimization")
            exp["achievements"].append("Reduced deployment time by 50% through automation")
    
    return improved_resume

@app.route('/')
def home():
    
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "Resume Analyzer is Running! Please ensure index.html exists in the same directory."

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    api_key = request.headers.get('x-api-key')
    if api_key != API_KEY:
        return jsonify({'success': False, 'error': 'Invalid API key'}), 401

    try:
        files = request.files.getlist('files')
        job_title = request.form.get('jobTitle', '')
        experience_level = request.form.get('experience', '')
        industry = request.form.get('industry', '')
        additional_info = request.form.get('text', '')

        if not files:
            return jsonify({'success': False, 'error': 'No files uploaded'}), 400

        
        file_content = "Sample resume content for analysis"
        
       
        suggestions = analyze_resume_content(file_content, job_title, experience_level, industry, additional_info)
    
        improved_resume = generate_improved_resume(SAMPLE_RESUME_DATA, job_title, experience_level, industry, additional_info)
        
        return jsonify({
            'success': True,
            'suggestions': suggestions,
            'generatedResume': improved_resume
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/generate', methods=['POST'])
def generate():
    """Legacy endpoint for backward compatibility"""
    return analyze_resume()

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Server is running'})

if __name__ == '__main__':
    print("Starting Resume Analyzer Server...")
    print("Server will be available at: http://localhost:5000")
    print("Press Ctrl+C to stop the server")
    try:
        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        print(f"Error starting server: {e}")
        print("Please make sure you have Flask installed: pip install flask flask-cors")
