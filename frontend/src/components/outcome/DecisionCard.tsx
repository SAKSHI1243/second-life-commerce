import React from 'react';
import type { RoutingDecisionResponse } from '../../services/api';
import Card from '../ui/Card';
import { Truck, RotateCcw, Heart, Trash2, Leaf, AlertTriangle } from 'lucide-react';

interface DecisionCardProps {
  data: RoutingDecisionResponse;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ data }) => {
  const getActionConfig = (action: string) => {
    switch (action.toLowerCase()) {
      case 'resell': 
        return { 
          label: 'Marketplace Resell', 
          icon: <Truck size={32} />, 
          color: 'text-blue-600', 
          bg: 'bg-blue-50', 
          border: 'border-blue-200' 
        };
      case 'refurbish': 
        return { 
          label: 'Authorized Refurbishment', 
          icon: <RotateCcw size={32} />, 
          color: 'text-amazon-orange', 
          bg: 'bg-orange-50', 
          border: 'border-orange-200' 
        };
      case 'donate': 
        return { 
          label: 'Community Donation', 
          icon: <Heart size={32} />, 
          color: 'text-pink-600', 
          bg: 'bg-pink-50', 
          border: 'border-pink-200' 
        };
      case 'recycle': 
        return { 
          label: 'Eco-Friendly Recycling', 
          icon: <Trash2 size={32} />, 
          color: 'text-amazon-red', 
          bg: 'bg-red-50', 
          border: 'border-red-200' 
        };
      default: 
        return { 
          label: 'Standard Processing', 
          icon: <Truck size={32} />, 
          color: 'text-gray-600', 
          bg: 'bg-gray-50', 
          border: 'border-gray-200' 
        };
    }
  };

  const config = getActionConfig(data.decision);

  return (
    <Card className="flex flex-col gap-6">
      <div className={`p-6 rounded-md border ${config.bg} ${config.border} flex items-center gap-6`}>
        <div className={`${config.color} bg-white p-4 rounded-full shadow-sm`}>
          {config.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm uppercase tracking-wider text-amazon-muted font-bold mb-1">Final Routing Decision</h3>
          <p className={`text-3xl font-black ${config.color}`}>{config.label}</p>
        </div>
        <div className="text-right">
          <div className="bg-[#E7F4E5] text-amazon-green border border-amazon-green px-3 py-2 rounded-md inline-flex items-center gap-2">
            <Leaf size={18} />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] uppercase font-bold">Reward</span>
              <span className="text-lg font-black">+{data.green_points_earned} PTS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-amazon-text">Decision Rationale</h4>
        <p className="text-amazon-text leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-100 italic">
          "{data.reason}"
        </p>
      </div>

      {data.flagged_for_review && (
        <div className="bg-[#FFF4F4] border border-amazon-red p-4 rounded-md flex items-start gap-3">
          <AlertTriangle className="text-amazon-red shrink-0" size={20} />
          <p className="text-xs text-amazon-red">
            <strong>System Flag:</strong> AI confidence was below threshold. A human specialist will verify this grading within 24 hours.
          </p>
        </div>
      )}

      {data.alternative_route && (
        <div className="border-t border-amazon-border pt-4">
          <h4 className="font-bold text-sm mb-2">Nearby Drop-off Location</h4>
          <div className="bg-white border border-amazon-border p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-bold text-sm">{data.alternative_route.facility_name}</p>
              <p className="text-xs text-amazon-muted">{data.alternative_route.instructions}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-amazon-orange">{data.alternative_route.distance_km} KM away</p>
              <p className="amazon-link text-xs">View Map</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DecisionCard;
