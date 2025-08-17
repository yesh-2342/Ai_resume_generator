
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    const generatedResume = document.getElementById('generatedResume');

  
    const fileUploadArea = document.querySelector('.file-upload-area');
    
    fileUploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileUploadArea.style.borderColor = '#28a745';
            fileUploadArea.style.background = 'rgba(40, 167, 69, 0.1)';
            const fileNames = Array.from(this.files).map(file => file.name).join(', ');
            document.querySelector('.file-hint').textContent = `Selected: ${fileNames}`;
        }
    });

  
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#764ba2';
        fileUploadArea.style.background = 'rgba(118, 75, 162, 0.1)';
    });

    fileUploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#667eea';
        fileUploadArea.style.background = 'rgba(102, 126, 234, 0.05)';
    });

    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileInput.files = e.dataTransfer.files;
        fileUploadArea.style.borderColor = '#28a745';
        fileUploadArea.style.background = 'rgba(40, 167, 69, 0.1)';
        const fileNames = Array.from(e.dataTransfer.files).map(file => file.name).join(', ');
        document.querySelector('.file-hint').textContent = `Selected: ${fileNames}`;
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

       
        if (!fileInput.files.length) {
            showError('Please upload a resume file');
            return;
        }

        const jobTitle = document.getElementById('jobTitle').value;
        const experience = document.getElementById('experience').value || 'general';
        const industry = document.getElementById('industry').value || 'general';

        if (!jobTitle) {
            showError('Please enter a job title');
            return;
        }

      
        loadingSpinner.style.display = 'block';
        suggestionsContainer.style.display = 'none';
        generatedResume.style.display = 'none';

        setTimeout(() => {
            
            loadingSpinner.style.display = 'none';

            
            const suggestions = analyzeResumeContent(jobTitle, experience, industry);
            const improvedResume = generateImprovedResume(jobTitle, experience, industry);

            displaySuggestions(suggestions);
            displayGeneratedResume(improvedResume);
        }, 2000);
    });

    function analyzeResumeContent(jobTitle, experienceLevel, industry) {
        const suggestions = {
            keyImprovements: [],
            skillsEnhancement: [],
            experienceOptimization: [],
            atsOptimization: []
        };

        
        if (experienceLevel === "entry") {
            suggestions.keyImprovements.push(
                {
                    title: "Add Quantifiable Achievements",
                    description: "Include specific metrics and numbers to demonstrate impact (e.g., 'Increased efficiency by 25%', 'Managed team of 5 developers')"
                },
                {
                    title: "Include Relevant Projects",
                    description: "Add personal or academic projects that showcase your technical skills and problem-solving abilities"
                }
            );
        } else if (experienceLevel === "mid") {
            suggestions.keyImprovements.push(
                {
                    title: "Highlight Leadership Experience",
                    description: "Emphasize team leadership, mentoring, and project management responsibilities"
                },
                {
                    title: "Showcase Technical Depth",
                    description: "Include advanced technical skills and architectural decisions you've made"
                }
            );
        } else if (experienceLevel === "senior" || experienceLevel === "executive") {
            suggestions.keyImprovements.push(
                {
                    title: "Emphasize Strategic Impact",
                    description: "Highlight strategic decisions, business impact, and cross-functional leadership"
                },
                {
                    title: "Showcase Innovation",
                    description: "Include examples of driving innovation, process improvements, and organizational change"
                }
            );
        } else {
            suggestions.keyImprovements.push(
                {
                    title: "Add Quantifiable Achievements",
                    description: "Include specific metrics and numbers to demonstrate impact (e.g., 'Increased efficiency by 25%', 'Managed team of 5 developers')"
                },
                {
                    title: "Highlight Key Accomplishments",
                    description: "Focus on your most significant achievements and contributions"
                }
            );
        }

        if (industry === "technology") {
            suggestions.skillsEnhancement.push(
                {
                    title: "Add Cloud Technologies",
                    description: "Include AWS, Azure, or Google Cloud Platform experience if applicable"
                },
                {
                    title: "Highlight DevOps Skills",
                    description: "Add Docker, Kubernetes, CI/CD pipeline experience"
                }
            );
        } else if (industry === "finance") {
            suggestions.skillsEnhancement.push({
                title: "Include Financial Tools",
                description: "Add experience with financial software, data analysis tools, or regulatory compliance"
            });
        } else if (industry === "healthcare") {
            suggestions.skillsEnhancement.push({
                title: "Include Healthcare Systems",
                description: "Add experience with EHR systems, HIPAA compliance, and healthcare regulations"
            });
        } else if (industry === "marketing") {
            suggestions.skillsEnhancement.push({
                title: "Include Marketing Tools",
                description: "Add experience with CRM systems, analytics platforms, and digital marketing tools"
            });
        } else {
            // General skills suggestions
            suggestions.skillsEnhancement.push(
                {
                    title: "Include Industry-Specific Tools",
                    description: "Add relevant software, platforms, and tools specific to your industry"
                },
                {
                    title: "Highlight Technical Skills",
                    description: "Include any technical skills, software proficiency, or certifications"
                }
            );
        }

      
        suggestions.experienceOptimization.push(
            {
                title: "Use Action Verbs",
                description: "Start bullet points with strong action verbs like 'Developed', 'Implemented', 'Led', 'Optimized'"
            },
            {
                title: "Focus on Results",
                description: "Emphasize outcomes and impact rather than just responsibilities"
            }
        );

      
        suggestions.atsOptimization.push(
            {
                title: "Keyword Optimization",
                description: `Include relevant keywords from the job description for '${jobTitle}' position`
            },
            {
                title: "Simple Formatting",
                description: "Use standard fonts (Arial, Calibri) and avoid complex formatting that ATS systems can't read"
            },
            {
                title: "Clear Section Headers",
                description: "Use standard section headers like 'Experience', 'Education', 'Skills' for better ATS parsing"
            }
        );

        return suggestions;
    }

    function generateImprovedResume(jobTitle, experienceLevel, industry) {
        const resumeData = {
            name: "John Doe",
            contact: "john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe",
            summary: "",
            experience: [
                {
                    title: "Senior Software Engineer",
                    company: "Tech Corp",
                    duration: "2021 - Present",
                    achievements: [
                        "Led development of microservices architecture serving 1M+ users",
                        "Improved application performance by 40% through optimization",
                        "Mentored 3 junior developers and conducted code reviews"
                    ]
                },
                {
                    title: "Software Engineer",
                    company: "Startup Inc",
                    duration: "2019 - 2021",
                    achievements: [
                        "Developed full-stack web applications using React and Node.js",
                        "Collaborated with cross-functional teams to deliver features",
                        "Implemented CI/CD pipelines reducing deployment time by 60%"
                    ]
                }
            ],
            skills: [
                "JavaScript, Python, React, Node.js",
                "AWS, Docker, Kubernetes",
                "Agile/Scrum, Git, REST APIs",
                "MongoDB, PostgreSQL, Redis"
            ],
            education: [
                {
                    degree: "Bachelor of Science in Computer Science",
                    institution: "University of Technology",
                    year: "2019"
                }
            ]
        };

        
        if (experienceLevel === "senior" || experienceLevel === "executive") {
            resumeData.summary = `Senior ${jobTitle} with extensive experience in ${industry} industry. Proven track record of leading teams, driving innovation, and delivering high-impact solutions. Strong expertise in strategic planning and cross-functional collaboration.`;
        } else if (experienceLevel === "entry") {
            resumeData.summary = `Motivated ${jobTitle} with strong foundation in ${industry} technologies and eagerness to learn and grow. Demonstrated ability to quickly adapt to new technologies and contribute to team success.`;
        } else if (experienceLevel === "mid") {
            resumeData.summary = `Experienced ${jobTitle} with solid background in ${industry} industry. Proven ability to deliver results and collaborate effectively in dynamic environments.`;
        } else { 
            resumeData.summary = `Dedicated ${jobTitle} with strong problem-solving skills and ability to adapt to new challenges. Committed to delivering high-quality results and continuous professional growth.`;
        }

        if (industry === "technology") {
            resumeData.skills.push(
                "Cloud Computing (AWS/Azure)",
                "Microservices Architecture",
                "API Design & Development"
            );
        } else if (industry === "healthcare") {
            resumeData.skills.push(
                "HIPAA Compliance",
                "Electronic Health Records",
                "Healthcare Data Analytics"
            );
        } else if (industry === "finance") {
            resumeData.skills.push(
                "Financial Analysis",
                "Risk Management",
                "Regulatory Compliance"
            );
        } else if (industry === "marketing") {
            resumeData.skills.push(
                "Digital Marketing",
                "Analytics & Reporting",
                "Campaign Management"
            );
        } else {
            
            resumeData.skills.push(
                "Project Management",
                "Data Analysis",
                "Communication Skills"
            );
        }

        return resumeData;
    }

    function displaySuggestions(suggestions) {
        suggestionsContainer.style.display = 'block';
        
    
        const keyImprovements = document.getElementById('keyImprovements');
        keyImprovements.innerHTML = suggestions.keyImprovements.map(item => 
            `<div class="suggestion-item">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>`
        ).join('');  
        const skillsEnhancement = document.getElementById('skillsEnhancement');
        skillsEnhancement.innerHTML = suggestions.skillsEnhancement.map(item => 
            `<div class="suggestion-item">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>`
        ).join('');

        const experienceOptimization = document.getElementById('experienceOptimization');
        experienceOptimization.innerHTML = suggestions.experienceOptimization.map(item => 
            `<div class="suggestion-item">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>`
        ).join('');


        const atsOptimization = document.getElementById('atsOptimization');
        atsOptimization.innerHTML = suggestions.atsOptimization.map(item => 
            `<div class="suggestion-item">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>`
        ).join('');
    }

    function displayGeneratedResume(resumeData) {
        generatedResume.style.display = 'block';
        
        const resumeContent = document.getElementById('resumeContent');
        resumeContent.innerHTML = `
            <h3>${resumeData.name}</h3>
            <p>${resumeData.contact}</p>
            <p>${resumeData.summary}</p>
            
            <h3>Professional Experience</h3>
            ${resumeData.experience.map(exp => `
                <div style="margin-bottom: 20px;">
                    <strong>${exp.title}</strong> - ${exp.company}<br>
                    <em>${exp.duration}</em>
                    <ul>
                        ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
            
            <h3>Skills</h3>
            <ul>
                ${resumeData.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
            
            <h3>Education</h3>
            ${resumeData.education.map(edu => `
                <div style="margin-bottom: 15px;">
                    <strong>${edu.degree}</strong><br>
                    ${edu.institution} - ${edu.year}
                </div>
            `).join('')}
        `;
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
});


function downloadResume() {
    const resumeContent = document.getElementById('resumeContent');
    const content = resumeContent.innerText;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'improved_resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function copyResume() {
    const resumeContent = document.getElementById('resumeContent');
    const content = resumeContent.innerText;
    
    navigator.clipboard.writeText(content).then(() => {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
        `;
        successDiv.textContent = 'Resume copied to clipboard!';
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
