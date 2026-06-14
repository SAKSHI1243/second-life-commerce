import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface ImageQuality {
  is_acceptable: boolean;
  lighting_check: string;
  blur_check: string;
}

export interface DamageLocation {
  box_2d: [number, number, number, number];
  label: string;
}

export interface GradeResponse {
  quality: ImageQuality;
  grade: string;
  damage_list: string[];
  confidence: number;
  damage_locations: DamageLocation[];
}

export interface QuestionnaireOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  question: string;
  type: string;
  options?: QuestionnaireOption[];
}

export interface QuestionnaireResponse {
  questions: Question[];
}

export interface RoutingDecisionResponse {
  decision: string;
  reason: string;
  second_life_score: number;
  green_points_earned: number;
  flagged_for_review: boolean;
  alternative_route?: {
    facility_name: string;
    distance_km: number;
    instructions: string;
  };
}

export interface RegretResponse {
  regret_probability: number;
  insight_message: string;
}

export interface CO2ImpactResponse {
  product_id: string;
  kg_co2_saved: number;
  car_trip_equivalent_km: number;
  insight_text: string;
}

export const gradeProduct = async (file: File): Promise<GradeResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post<GradeResponse>('/api/grade', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getQuestionnaire = async (gradeData: GradeResponse): Promise<QuestionnaireResponse> => {
  const response = await api.post<QuestionnaireResponse>('/api/questionnaire', gradeData);
  return response.data;
};

export const routeProduct = async (answers: Record<string, string>): Promise<RoutingDecisionResponse> => {
  const response = await api.post<RoutingDecisionResponse>('/api/route-product', { answers });
  return response.data;
};

export const predictRegret = async (category: string, reason: string): Promise<RegretResponse> => {
  const response = await api.post<RegretResponse>('/api/regret-predict', { 
    category, 
    return_reason: reason 
  });
  return response.data;
};

export const getCO2Impact = async (productId: string): Promise<CO2ImpactResponse> => {
  const response = await api.post<CO2ImpactResponse>(`/api/co2-impact?product_id=${productId}`);
  return response.data;
};

export default api;
