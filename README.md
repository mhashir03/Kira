# Kira 🩺

Kira is an AI-powered medical triage application that combines voice recognition with Google's advanced Gemini AI to help users understand their symptoms and assess potential health conditions. By leveraging speech recognition and AI analysis, Kira provides informative guidance on possible health concerns.

## 🌟 Key Features

### Voice Symptom Analysis
- **Speech-to-Text**: Seamlessly capture detailed symptom descriptions through natural speech
- **AI-Powered Analysis**: Process symptoms using Gemini's advanced language understanding
- **Comprehensive Results**:
  - Concise symptom summary
  - Possible conditions based on symptoms
  - Appropriate medical specialists to consult
  - Medical disclaimers and guidance

### User-Friendly Interface
- **Modern UI**: Clean, sleek design with intuitive controls
- **Responsive Design**: Optimized experience across all devices
- **Real-Time Feedback**: Clear status indicators during AI processing
- **Glassmorphism Design**: Beautiful, modern interface with gradient accents

## 🧠 Gemini AI Implementation

Kira leverages the power of Google's Gemini AI through their latest API:

### Text Analysis
- Uses Gemini's advanced models for rapid symptom analysis
- Structured prompting for consistent responses
- Custom prompt engineering for medically-relevant outputs

### Response Handling
- Robust parsing with fallback mechanisms
- Error handling to ensure graceful degradation
- Optimized response processing for structured data display

## 🛠️ Technology Stack

- **Frontend**: Next.js with React and TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Components**: Custom UI components with a medical theme
- **AI**: Google Generative AI API for text analysis
- **State Management**: React hooks and context

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 7.x or higher (or yarn/bun)
- A Google Generative AI API key
- Modern browser (Chrome, Firefox, Edge, Safari)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mhashir03/Kira.git
   cd Kira
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with yarn
   yarn install
   # or with bun
   bun install
   ```

3. Configure your API key:
   - Create a `.env` file in the project root
   - Add your Gemini API key:
     ```
     NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   # or with bun
   bun dev
   ```

5. Open your browser and navigate to:
   - [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
# or with yarn
yarn build
# or with bun
bun run build
```

To start the production server:

```bash
npm run start
# or with yarn
yarn start
# or with bun
bun run start
```

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

- **Not a Medical Substitute**: Kira provides preliminary information only and is not a replacement for professional medical diagnosis or treatment
- **Emergency Situations**: For severe or life-threatening conditions, call emergency services immediately
- **Privacy**: All processing is done through secure API calls; no medical data is stored permanently
- **Limitations**: AI analysis may not capture all nuances of complex medical conditions

## 🌐 Browser Compatibility

- Chrome 90+ (recommended)
- Firefox 90+
- Safari 15+
- Edge 90+
- Mobile browsers with microphone support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Google Generative AI](https://ai.google.dev/) for providing the powerful AI models
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the component-based UI library
