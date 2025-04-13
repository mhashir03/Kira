# VoiceCheck 🩺

VoiceCheck is an AI-powered medical triage application that combines voice recognition with Google's advanced Gemini AI to help users understand their symptoms and assess injuries. By leveraging Gemini's multimodal capabilities, VoiceCheck can analyze both verbal symptom descriptions and injury images to provide preliminary guidance.

![VoiceCheck Screenshot](https://via.placeholder.com/1200x600?text=VoiceCheck+Screenshot)

## 🌟 Key Features

### Voice Symptom Analysis
- **Speech-to-Text**: Seamlessly capture detailed symptom descriptions through natural speech
- **AI-Powered Analysis**: Process symptoms using Gemini's advanced language understanding
- **Comprehensive Results**:
  - Concise symptom summary
  - Possible conditions based on symptoms
  - Appropriate medical specialists to consult
  - Medical disclaimers and guidance

### Visual Injury Assessment
- **Camera Integration**: Capture injury photos directly through the application
- **Image Upload**: Submit existing injury photos for analysis
- **Contextual Analysis**: Provide injury location and description for more accurate results
- **Detailed Evaluation**:
  - Injury description based on visual analysis
  - Severity assessment (minor, moderate, severe)
  - First aid recommendations
  - Guidance on whether medical attention is needed
  - Color-coded severity indicators for quick understanding

### User-Friendly Interface
- **Tabbed Navigation**: Easy switching between voice and camera features
- **Responsive Design**: Optimized experience across all devices
- **Real-Time Feedback**: Clear status indicators during AI processing
- **Professional Presentation**: Clean, medical-themed UI with intuitive controls

## 🧠 Gemini AI Implementation

VoiceCheck leverages the power of Google's Gemini AI through their latest API:

### Text Analysis
- Uses the `gemini-2.0-flash` model for rapid symptom analysis
- Structured prompting for consistent JSON responses
- Custom prompt engineering for medically-relevant outputs

### Response Handling
- Robust JSON parsing with fallback mechanisms
- Error handling to ensure graceful degradation
- Optimized response processing for structured data display

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **Build Tool**: Vite for lightning-fast development
- **Styling**: Tailwind CSS with a custom medical theme
- **Components**: ShadCN UI component library
- **AI**: Google Gemini API for text and image analysis
- **Media**: Web Camera API for device camera access
- **State Management**: React hooks and context

## 📋 Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher (or yarn 1.22+)
- A Google Gemini API key ([Get one here](https://ai.google.dev/))
- Modern browser (Chrome, Firefox, Edge, Safari)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mhashir03/VoiceCheck.git
   cd VoiceCheck
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with yarn
   yarn install
   ```

3. Configure your API key:
   - Create a `.env` file in the project root
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_gemini_api_key_here
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   ```

5. Open your browser and navigate to:
   - [http://localhost:8080](http://localhost:8080) (default port)

### Build for Production

```bash
npm run build
# or with yarn
yarn build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## 📱 Usage Guide

### Voice Symptom Analysis

1. Click the microphone button and grant microphone permissions when prompted
2. Speak clearly, describing your symptoms in detail
   - Example: "I've been experiencing a persistent dry cough for the past week, along with mild fever and fatigue."
3. When finished, the AI will process your description
4. Review the comprehensive analysis provided, including:
   - Symptom summary
   - Possible conditions
   - Recommended medical professionals
   - Important medical disclaimers

## ⚠️ Important Notes

- **Not a Medical Substitute**: VoiceCheck provides preliminary information only and is not a replacement for professional medical diagnosis or treatment
- **Emergency Situations**: For severe or life-threatening conditions, call emergency services immediately
- **Privacy**: All processing is done through secure API calls; no medical data is stored permanently
- **Limitations**: AI analysis may not capture all nuances of complex medical conditions
- **Results Variability**: Lighting conditions and image quality may affect the accuracy of injury assessments

## 🌐 Browser Compatibility

- Chrome 90+ (recommended)
- Firefox 90+
- Safari 15+
- Edge 90+
- Mobile browsers with camera and microphone support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Google Gemini API](https://ai.google.dev/) for providing the powerful AI models
- [ShadCN UI](https://ui.shadcn.com/) for the elegant component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [React](https://reactjs.org/) for the component-based UI library
- The React community for their invaluable resources and support