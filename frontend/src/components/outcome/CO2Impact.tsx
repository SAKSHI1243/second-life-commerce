import React, { useEffect, useState } from 'react';
import { getCO2Impact } from '../../services/api';
import type { CO2ImpactResponse } from '../../services/api';
import Card from '../ui/Card';
import { Leaf, Car, Trees } from 'lucide-react';

interface CO2ImpactProps {
  productId: string;
}

const CO2Impact: React.FC<CO2ImpactProps> = ({ productId }) => {
  const [data, setData] = useState<CO2ImpactResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        const impact = await getCO2Impact(productId);
        setData(impact);
      } catch (error) {
        console.error("Failed to fetch CO2 impact", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImpact();
  }, [productId]);

  if (loading) return (
    <div className="animate-pulse bg-gray-100 h-32 w-full rounded-md"></div>
  );

  if (!data) return null;

  return (
    <Card className="bg-gradient-to-br from-green-50 to-white border-green-100 overflow-hidden relative">
      <div className="absolute top-[-20px] right-[-20px] text-green-100 opacity-50 rotate-12">
        <Trees size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-amazon-green mb-4">
          <Leaf size={24} fill="currentColor" />
          <h3 className="text-lg font-black uppercase tracking-tight">Your Sustainability Impact</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-4xl font-black text-amazon-green">{data.kg_co2_saved}kg</span>
            <span className="text-sm font-bold text-amazon-muted uppercase">CO2 Emissions Saved</span>
          </div>

          <div className="flex items-center gap-4 bg-white/60 p-4 rounded-md border border-green-200">
            <div className="bg-amazon-green text-white p-2 rounded-full">
              <Car size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-amazon-text">{data.car_trip_equivalent_km}km</span>
              <span className="text-xs text-amazon-muted font-bold uppercase">Car Trip Equivalent</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-amazon-text leading-relaxed border-l-4 border-amazon-green pl-4">
          {data.insight_text}
        </p>
      </div>
    </Card>
  );
};

export default CO2Impact;
