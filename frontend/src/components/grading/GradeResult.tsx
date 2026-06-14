import React from 'react';
import type { GradeResponse } from '../../services/api';
import Card from '../ui/Card';
import { ShieldCheck, ShieldAlert, AlertCircle } from 'lucide-react';

interface GradeResultProps {
  data: GradeResponse;
}

const GradeResult: React.FC<GradeResultProps> = ({ data }) => {
  const getGradeColor = (grade: string) => {
    switch (grade.toLowerCase()) {
      case 'like new': return 'text-amazon-green';
      case 'good': return 'text-amazon-green';
      case 'fair': return 'text-amazon-orange';
      case 'poor': return 'text-amazon-red';
      default: return 'text-amazon-text';
    }
  };

  const getConfidenceLevel = (conf: number) => {
    if (conf > 0.8) return { label: 'High', color: 'text-amazon-green' };
    if (conf > 0.6) return { label: 'Medium', color: 'text-amazon-orange' };
    return { label: 'Low (Manual Review Flagged)', color: 'text-amazon-red' };
  };

  const confidence = getConfidenceLevel(data.confidence);

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-amazon-muted font-bold mb-1">AI Condition Grade</h3>
          <p className={`text-4xl font-black ${getGradeColor(data.grade)}`}>{data.grade}</p>
        </div>
        <div className="text-right">
          <h3 className="text-sm uppercase tracking-wider text-amazon-muted font-bold mb-1">AI Confidence</h3>
          <p className={`font-bold ${confidence.color}`}>{Math.round(data.confidence * 100)}% ({confidence.label})</p>
        </div>
      </div>

      <div className="border-t border-amazon-border pt-4">
        <h4 className="font-bold text-amazon-text mb-2 flex items-center gap-2">
          <AlertCircle size={18} className="text-amazon-orange" />
          Detected Defects / Wear
        </h4>
        {data.damage_list.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.damage_list.map((damage, i) => (
              <li key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded border border-gray-100 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amazon-red"></span>
                {damage}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-amazon-muted italic">No significant damage detected by Gemini.</p>
        )}
      </div>

      <div className="bg-[#F7FAFA] border border-[#D5D9D9] p-4 rounded flex items-start gap-3">
        <ShieldCheck className="text-amazon-green shrink-0" size={24} />
        <div>
          <p className="font-bold text-sm">Image Quality Verified</p>
          <p className="text-xs text-amazon-muted">
            Lighting: {data.quality.lighting_check} | Sharpness: {data.quality.blur_check}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default GradeResult;
