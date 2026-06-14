import React, { useState } from 'react';
import { predictRegret } from '../services/api';
import type { RegretResponse } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { AlertCircle, Brain, RefreshCw, Smile, Frown } from 'lucide-react';

const RegretPredictorView: React.FC = () => {
  const [category, setCategory] = useState('Electronics');
  const [reason, setReason] = useState('');
  const [result, setResult] = useState<RegretResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    setLoading(true);
    try {
      const data = await predictRegret(category, reason);
      setResult(data);
    } catch (error) {
      console.error("Failed to predict regret", error);
    } finally {
      setLoading(false);
    }
  };

  const getProbabilityColor = (prob: number) => {
    if (prob > 75) return 'text-amazon-red';
    if (prob > 40) return 'text-amazon-orange';
    return 'text-amazon-green';
  };

  const getEmoji = (prob: number) => {
    if (prob > 75) return <Frown size={48} className="text-amazon-red" />;
    if (prob > 40) return <Smile size={48} className="text-amazon-orange" />;
    return <Smile size={48} className="text-amazon-green" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-amazon-text flex items-center gap-3">
          <Brain className="text-amazon-orange" size={32} />
          AI Return Regret Predictor
        </h1>
        <p className="text-amazon-muted">Our multi-modal cognitive model analyzes common return patterns to help you make more sustainable shopping decisions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card title="Initiate Return Analysis">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Product Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-amazon-border rounded-md p-2 text-sm focus:ring-2 focus:ring-amazon-orange outline-none bg-gray-50"
              >
                <option>Electronics</option>
                <option>Fashion & Apparel</option>
                <option>Home & Kitchen</option>
                <option>Books</option>
                <option>Beauty</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Why do you want to return this item?</label>
              <textarea 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., I bought this on impulse while watching a review, but now I'm not sure I'll use it..."
                className="w-full border border-amazon-border rounded-md p-3 text-sm focus:ring-2 focus:ring-amazon-orange outline-none min-h-[120px]"
                required
              />
            </div>

            <Button type="submit" disabled={loading || !reason.trim()} fullWidth>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="animate-spin" size={16} />
                  Analyzing Cognitive Dissonance...
                </span>
              ) : 'Analyze Return Intent'}
            </Button>
          </form>
        </Card>

        {result && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <Card className="text-center p-8">
              <div className="flex justify-center mb-4">
                {getEmoji(result.regret_probability)}
              </div>
              <h3 className="text-sm uppercase tracking-widest text-amazon-muted font-bold">Predicted Regret Probability</h3>
              <p className={`text-6xl font-black my-2 ${getProbabilityColor(result.regret_probability)}`}>
                {Math.round(result.regret_probability)}%
              </p>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6 mb-2 overflow-hidden">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-1000 ${
                    result.regret_probability > 75 ? 'bg-amazon-red' : 
                    result.regret_probability > 40 ? 'bg-amazon-orange' : 'bg-amazon-green'
                  }`} 
                  style={{ width: `${result.regret_probability}%` }}
                ></div>
              </div>
            </Card>

            <div className={`p-5 rounded-md border flex items-start gap-4 ${
              result.regret_probability > 50 ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'
            }`}>
              <AlertCircle className={result.regret_probability > 50 ? 'text-amazon-orange' : 'text-amazon-green'} size={24} />
              <div>
                <h4 className="font-bold text-amazon-text mb-1">AI Cognitive Insight</h4>
                <p className="text-sm text-amazon-text leading-relaxed italic">
                  "{result.insight_message}"
                </p>
              </div>
            </div>

            {result.regret_probability > 60 && (
              <Card className="bg-[#FFF4F4] border-amazon-red/20">
                <p className="text-xs font-bold text-amazon-red uppercase mb-2">💡 Sustainable Suggestion</p>
                <p className="text-sm text-amazon-text">
                  Based on our data, 8 out of 10 users who returned similar items for this reason ended up re-purchasing them within 30 days. Consider holding onto the item for 48 hours before finalizing your return.
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegretPredictorView;
