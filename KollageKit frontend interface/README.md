# AI Resume Analyzer & Generator

A comprehensive web application that provides intelligent resume analysis, suggestions for improvement, and generates optimized resumes based on job requirements and industry standards.

## Features

### 🎯 Intelligent Resume Analysis
- **File Upload**: Support for PDF, DOC, and DOCX resume formats
- **Drag & Drop**: Easy file upload with visual feedback
- **Multi-format Support**: Handles various resume formats seamlessly

### 💡 Smart Suggestions
- **Key Improvements**: Personalized recommendations based on experience level
- **Skills Enhancement**: Industry-specific skill suggestions
- **Experience Optimization**: Tips for better experience descriptions
- **ATS Optimization**: Applicant Tracking System optimization advice

### 📄 Resume Generation
- **Customized Output**: Tailored resumes based on job title and industry
- **Professional Formatting**: Clean, ATS-friendly resume layouts
- **Download Options**: PDF and text format downloads
- **Copy to Clipboard**: Easy sharing functionality

### 🎨 Modern Interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Professional UI**: Clean, modern interface with intuitive navigation
- **Real-time Feedback**: Loading indicators and success/error messages

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation Steps

1. **Clone or download the project files**

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   python server.py
   ```

4. **Access the application**:
   Open your web browser and navigate to `http://localhost:5000`

## How to Use

### 1. Upload Your Resume
- Click the upload area or drag and drop your resume file
- Supported formats: PDF, DOC, DOCX
- Multiple files can be uploaded simultaneously

### 2. Provide Job Information
- **Target Job Title**: Enter the position you're applying for
- **Experience Level**: Select your years of experience
- **Industry**: Choose your target industry
- **Additional Information**: Add any specific requirements or achievements

### 3. Get Analysis & Suggestions
- Click "Analyze & Generate Resume"
- View personalized suggestions in four categories:
  - Key Improvements
  - Skills Enhancement
  - Experience Optimization
  - ATS Optimization

### 4. Download Improved Resume
- Review the generated resume
- Download as PDF or copy text to clipboard
- Use the suggestions to manually improve your original resume

## API Endpoints

### POST /analyze
Analyzes uploaded resume and generates suggestions.

**Request Body:**
- `files`: Resume files (PDF, DOC, DOCX)
- `jobTitle`: Target job title
- `experience`: Experience level (entry, mid, senior, executive)
- `industry`: Target industry
- `text`: Additional information

**Response:**
```json
{
  "success": true,
  "suggestions": {
    "keyImprovements": [...],
    "skillsEnhancement": [...],
    "experienceOptimization": [...],
    "atsOptimization": [...]
  },
  "generatedResume": {
    "name": "...",
    "contact": "...",
    "summary": "...",
    "experience": [...],
    "skills": [...],
    "education": [...]
  }
}
```

## Technology Stack

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome
- **File Handling**: Flask file upload handling

## Customization

### Adding New Industries
Edit the `analyze_resume_content()` function in `server.py` to add industry-specific suggestions.

### Modifying Resume Templates
Update the `SAMPLE_RESUME_DATA` and `generate_improved_resume()` function to customize resume generation.

### Styling Changes
Modify `style.css` to customize the application's appearance.

## Security Features

- API key authentication for backend requests
- File type validation
- Input sanitization
- CORS configuration for cross-origin requests

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Note**: This is a demonstration application. For production use, consider implementing:
- Real file parsing (PDF/DOC extraction)
- Database integration for user accounts
- Advanced AI/ML for more sophisticated analysis
- Enhanced security measures
- Rate limiting and API protection 