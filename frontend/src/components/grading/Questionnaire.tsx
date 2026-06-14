import React, { useState } from 'react';
import type { QuestionnaireResponse } from '../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface QuestionnaireProps {
  data: QuestionnaireResponse;
  onSubmit: (answers: Record<string, string>) => void;
  isLoading?: boolean;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ data, onSubmit, isLoading }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleOptionChange = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const isFormComplete = data.questions.every(q => answers[q.id]);

  return (
    <Card title="Quick Condition Verification">
      <p className="text-sm text-amazon-muted mb-6">Please answer these follow-up questions to help us determine the best second life for your product.</p>
      
      <div className="flex flex-col gap-8">
        {data.questions.map((q) => (
          <div key={q.id} className="flex flex-col gap-3">
            <label className="font-bold text-amazon-text">{q.question}</label>
            
            {q.type === 'radio' && q.options && (
              <div className="flex flex-col gap-2">
                {q.options.map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors border border-transparent hover:border-amazon-border">
                    <input 
                      type="radio" 
                      name={q.id} 
                      value={opt.id}
                      checked={answers[q.id] === opt.id}
                      onChange={() => handleOptionChange(q.id, opt.id)}
                      className="accent-amazon-orange w-4 h-4"
                    />
                    <span className="text-sm">{opt.text}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === 'text' && (
              <textarea 
                className="w-full border border-amazon-border rounded-md p-3 text-sm focus:ring-2 focus:ring-amazon-orange outline-none min-h-[80px]"
                placeholder="Type your answer here..."
                value={answers[q.id] || ''}
                onChange={(e) => handleTextChange(q.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-amazon-border flex justify-end">
        <Button 
          variant="primary" 
          disabled={!isFormComplete || isLoading}
          onClick={() => onSubmit(answers)}
        >
          {isLoading ? 'Processing Decision...' : 'Generate Routing Decision'}
        </Button>
      </div>
    </Card>
  );
};

export default Questionnaire;
