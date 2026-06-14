import React, { useState } from 'react';
import { gradeProduct, getQuestionnaire, routeProduct } from '../services/api';
import type { GradeResponse, QuestionnaireResponse, RoutingDecisionResponse } from '../services/api';
import Dropzone from '../components/upload/Dropzone';
import GradeResult from '../components/grading/GradeResult';
import ImageAnnotator from '../components/grading/ImageAnnotator';
import Questionnaire from '../components/grading/Questionnaire';
import DecisionCard from '../components/outcome/DecisionCard';
import CO2Impact from '../components/outcome/CO2Impact';
import Button from '../components/ui/Button';
import { RefreshCw, ArrowLeft } from 'lucide-react';

interface AssessmentViewProps {
  onAddPoints: (amount: number) => void;
}

const AssessmentView: React.FC<AssessmentViewProps> = ({ onAddPoints }) => {
  const [step, setStep] = useState<'upload' | 'grading' | 'questionnaire' | 'outcome'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [gradeData, setGradeData] = useState<GradeResponse | null>(null);
  const [questions, setQuestions] = useState<QuestionnaireResponse | null>(null);
  const [outcome, setOutcome] = useState<RoutingDecisionResponse | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [pointsAdded, setPointsAdded] = useState(false);

  const handleFileUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setLoading(true);
    
    try {
      const grade = await gradeProduct(selectedFile);
      setGradeData(grade);
      
      const questionnaire = await getQuestionnaire(grade);
      setQuestions(questionnaire);
      
      setStep('grading');
    } catch (error) {
      console.error("Grading failed", error);
      alert("AI Analysis failed. Please try again with a clearer photo.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionnaireSubmit = async (answers: Record<string, string>) => {
    setLoading(true);
    try {
      const decision = await routeProduct(answers);
      setOutcome(decision);
      setStep('outcome');
      setPointsAdded(false);
    } catch (error) {
      console.error("Routing failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmList = () => {
    if (outcome && !pointsAdded) {
      onAddPoints(outcome.green_points_earned);
      setPointsAdded(true);
      alert(`Success! You earned ${outcome.green_points_earned} Impact Score points.`);
    }
  };

  const reset = () => {
    setStep('upload');
    setFile(null);
    setPreviewUrl(null);
    setGradeData(null);
    setQuestions(null);
    setOutcome(null);
    setPointsAdded(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black text-amazon-text">Product Life-Cycle Assessment</h1>
          <p className="text-sm text-amazon-muted">Step {step === 'upload' ? '1' : step === 'grading' ? '2' : step === 'questionnaire' ? '3' : '4'} of 4: {
            step === 'upload' ? 'Upload Photo' : 
            step === 'grading' ? 'AI Condition Report' : 
            step === 'questionnaire' ? 'Functional Check' : 'Routing & Impact'
          }</p>
        </div>
        {step !== 'upload' && (
          <Button variant="outline" onClick={reset} className="flex items-center gap-2">
            <RefreshCw size={16} />
            Start New Assessment
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Media/Preview */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {step === 'upload' ? (
            <Dropzone onFileSelect={handleFileUpload} isLoading={loading} />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">Visual Evidence</h2>
                <span className="text-xs text-amazon-muted bg-white px-2 py-1 rounded border border-amazon-border">
                  {file?.name}
                </span>
              </div>
              {previewUrl && gradeData && (
                <ImageAnnotator imageSrc={previewUrl} locations={gradeData.damage_locations} />
              )}
              {step === 'grading' && (
                <div className="flex justify-end mt-2">
                  <Button onClick={() => setStep('questionnaire')}>
                    Continue to Questionnaire
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Data/Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {step === 'grading' && gradeData && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <GradeResult data={gradeData} />
            </div>
          )}

          {step === 'questionnaire' && questions && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Questionnaire 
                data={questions} 
                onSubmit={handleQuestionnaireSubmit} 
                isLoading={loading} 
              />
              <button 
                onClick={() => setStep('grading')}
                className="mt-4 flex items-center gap-1 text-sm amazon-link"
              >
                <ArrowLeft size={14} /> Back to condition report
              </button>
            </div>
          )}

          {step === 'outcome' && outcome && (
            <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
              <DecisionCard data={outcome} />
              <CO2Impact productId="PROD_1001" />
              
              <div className="bg-amazon-yellow/10 border border-amazon-yellow p-6 rounded-md text-center">
                <p className="font-bold text-amazon-text mb-4">Would you like to list this for resale now?</p>
                <div className="flex flex-col gap-3">
                  <Button 
                    variant="primary" 
                    fullWidth 
                    onClick={handleConfirmList}
                    disabled={pointsAdded}
                  >
                    {pointsAdded ? 'Successfully Listed!' : 'Confirm & List on Marketplace'}
                  </Button>
                  <Button variant="outline" fullWidth onClick={reset}>Save to Drafts</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentView;
