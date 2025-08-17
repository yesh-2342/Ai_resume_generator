const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const upload = multer({ dest: 'uploads/' });


const API_KEY = 'your-secret-api-key';


const SAMPLE_RESUME_DATA = {
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
};

function analyzeResumeContent(fileContent, jobTitle, experienceLevel, industry, additionalInfo) {
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

function generateImprovedResume(originalData, jobTitle, experienceLevel, industry, additionalInfo) {
    const improvedResume = JSON.parse(JSON.stringify(originalData));

    
    if (experienceLevel === "senior" || experienceLevel === "executive") {
        improvedResume.summary = `Senior ${jobTitle} with extensive experience in ${industry} industry. Proven track record of leading teams, driving innovation, and delivering high-impact solutions. Strong expertise in strategic planning and cross-functional collaboration.`;
    } else if (experienceLevel === "entry") {
        improvedResume.summary = `Motivated ${jobTitle} with strong foundation in ${industry} technologies and eagerness to learn and grow. Demonstrated ability to quickly adapt to new technologies and contribute to team success.`;
    }

   
    if (industry === "technology") {
        improvedResume.skills.push(
            "Cloud Computing (AWS/Azure)",
            "Microservices Architecture",
            "API Design & Development"
        );
    } else if (industry === "healthcare") {
        improvedResume.skills.push(
            "HIPAA Compliance",
            "Electronic Health Records",
            "Healthcare Data Analytics"
        );
    }

   
    for (const exp of improvedResume.experience) {
      
        const hasNumbers = exp.achievements.some(achievement => /\d/.test(achievement));
        if (!hasNumbers) {
            exp.achievements.push("Improved system performance by 30% through optimization");
            exp.achievements.push("Reduced deployment time by 50% through automation");
        }
    }

    return improvedResume;
}


app.get('/', (req, res) => {
    try {
        const htmlPath = path.join(__dirname, 'index.html');
        if (fs.existsSync(htmlPath)) {
            res.sendFile(htmlPath);
        } else {
            res.send('Resume Analyzer is Running! Please ensure index.html exists in the same directory.');
        }
    } catch (error) {
        res.send('Resume Analyzer is Running!');
    }
});

app.post('/analyze', upload.array('files'), (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== API_KEY) {
        return res.status(401).json({ success: false, error: 'Invalid API key' });
    }

    try {
        const files = req.files || [];
        const jobTitle = req.body.jobTitle || '';
        const experienceLevel = req.body.experience || '';
        const industry = req.body.industry || '';
        const additionalInfo = req.body.text || '';

        if (files.length === 0) {
            return res.status(400).json({ success: false, error: 'No files uploaded' });
        }

        const fileContent = "Sample resume content for analysis";

 
        const suggestions = analyzeResumeContent(fileContent, jobTitle, experienceLevel, industry, additionalInfo);


        const improvedResume = generateImprovedResume(SAMPLE_RESUME_DATA, jobTitle, experienceLevel, industry, additionalInfo);

        res.json({
            success: true,
            suggestions: suggestions,
            generatedResume: improvedResume
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/generate', (req, res) => {
    
    return app._router.handle(req, res);
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', message: 'Server is running' });
});

app.listen(port, () => {
    console.log(`Resume Analyzer Server running at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop the server');
});

module.exports = app; 
