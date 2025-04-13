import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface MicrophoneButtonProps {
  onTranscriptReady: (transcript: string) => void;
}

// Define SpeechRecognition types
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [index: number]: {
      isFinal: boolean;
      [index: number]: {
        transcript: string;
      };
    };
    length: number;
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ onTranscriptReady }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';
        
        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            }
          }
          
          if (finalTranscript) {
            onTranscriptReady(finalTranscript);
          }
        };
        
        recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };
        
        setRecognition(recognitionInstance);
      } else {
        console.error('Speech recognition not supported in this browser');
      }
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onTranscriptReady]);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      try {
        recognition?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Failed to start speech recognition', error);
      }
    }
  };

  return (
    <div className="relative">
      <div className={`absolute -inset-6 rounded-full ${isListening ? 'animate-pulse-ring bg-kira-gradient3/30' : ''} blur-md`}></div>
      <div className="absolute -inset-3 bg-gradient-mesh rounded-full opacity-60"></div>
      <button
        onClick={toggleListening}
        className={`relative w-28 h-28 rounded-full flex items-center justify-center shadow-xl ${
          isListening 
            ? 'bg-gradient-to-r from-kira-gradient3 to-kira-gradient4 animate-float' 
            : 'bg-gradient-button'
        } transition-all duration-300 ease-in-out transform hover:scale-105 z-10`}
        aria-label={isListening ? 'Stop listening' : 'Start listening'}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute inset-1 rounded-full bg-gradient-glassmorphism opacity-60"></div>
        <div className="absolute inset-0 rounded-full border border-white/30"></div>
        <div className="relative z-10">
          {isListening ? (
            <MicOff className="h-10 w-10 text-white drop-shadow-lg" />
          ) : (
            <Mic className="h-10 w-10 text-white drop-shadow-lg" />
          )}
        </div>
      </button>
    </div>
  );
};

export default MicrophoneButton;
