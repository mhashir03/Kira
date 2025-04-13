import React, { useState } from 'react';
import { Stethoscope, AlertTriangle, User, FileQuestion } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Header from '../components/Header';
import MicrophoneButton from '../components/MicrophoneButton';
import SymptomCard from '../components/SymptomCard';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { analyzeSymptoms } from '../api/gemini';
import { AnalysisResult } from '../types';

const Index = () => {
  const [transcript, setTranscript] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleTranscriptReady = async (newTranscript: string) => {
    setTranscript(newTranscript);
    
    // Only analyze if we have a substantial transcript
    if (newTranscript.split(' ').length > 3) {
      setIsAnalyzing(true);
      setAnalysisResult(null); // Clear previous results
      
      try {
        const response = await analyzeSymptoms(newTranscript);
        
        if (response.error) {
          toast({
            title: "Error",
            description: response.error,
            variant: "destructive",
          });
        } else {
          setAnalysisResult(response.result);
          toast({
            title: "Analysis Complete",
            description: "Your symptoms have been analyzed.",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to analyze symptoms. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
      }
    } else {
      toast({
        title: "Not enough information",
        description: "Please provide more details about your symptoms.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-voicecheck-lightRed flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Speak Your Symptoms
            </h2>
            <p className="text-gray-600 mb-8">
              Press the microphone button and describe how you're feeling
            </p>
            
            <div className="flex justify-center mb-10">
              <MicrophoneButton onTranscriptReady={handleTranscriptReady} />
            </div>
          </div>
          
          {transcript && <SymptomCard transcript={transcript} />}
          
          {isAnalyzing && <LoadingSpinner />}
          
          {analysisResult && !isAnalyzing && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Analysis Results <span className="text-xs text-gray-500">(Powered by Gemini AI)</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResultCard 
                  title="Summary" 
                  content={analysisResult.summary} 
                  icon={FileQuestion}
                />
                <ResultCard 
                  title="Possible Conditions" 
                  content={analysisResult.conditions} 
                  icon={Stethoscope}
                />
                <ResultCard 
                  title="Recommended Doctor" 
                  content={analysisResult.doctor_type} 
                  icon={User}
                />
                <ResultCard 
                  title="Medical Disclaimer" 
                  content={analysisResult.disclaimer} 
                  icon={AlertTriangle}
                  className="bg-voicecheck-lightRed border border-voicecheck-red"
                />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} VoiceCheck. For informational purposes only.</p>
          <p className="mt-1">Not a substitute for professional medical advice, diagnosis, or treatment.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
