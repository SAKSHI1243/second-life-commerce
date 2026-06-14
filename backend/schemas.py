from pydantic import BaseModel, Field
from typing import List, Optional

# --- Day 1: Vision & Quality Filter Contracts ---
class ImageQuality(BaseModel):
    is_acceptable: bool
    lighting_check: str  # "Pass" or "Too Dark"
    blur_check: str      # "Pass" or "Blurry"

class DamageLocation(BaseModel):
    box_2d: List[int] = Field(..., description="[ymin, xmin, ymax, xmax] coordinates for HTML canvas")
    label: str

class GradeResponse(BaseModel):
    quality: ImageQuality
    category: str         # "Electronics", "Footwear", "Apparel", etc.
    grade: str            # "Good", "Fair", "Poor"
    damage_list: List[str]
    confidence: float     # e.g., 0.85 (85%)
    damage_locations: List[DamageLocation]

# --- Day 1 & 2: Frontend Questionnaire & Submit ---
class QuestionnaireOption(BaseModel):
    id: str
    text: str

class Question(BaseModel):
    id: str
    question: str
    type: str 
    options: Optional[List[QuestionnaireOption]] = None

class QuestionnaireResponse(BaseModel):
    questions: List[Question]

class UserAnswers(BaseModel):
    answers: dict

class RoutingDecisionResponse(BaseModel):
    decision: str         # "resell", "refurbish", "donate", "recycle"
    reason: str
    second_life_score: float
    green_points_earned: int
    flagged_for_review: bool # High accountability system threshold
    alternative_route: Optional[dict] = None

# --- Day 2: Advanced Features Contracts ---
class RegretRequest(BaseModel):
    category: str
    return_reason: str

class RegretResponse(BaseModel):
    regret_probability: float
    insight_message: str

class CO2ImpactResponse(BaseModel):
    product_id: str
    kg_co2_saved: float
    car_trip_equivalent_km: float
    insight_text: str

class MarketplaceListing(BaseModel):
    product_id: str
    ai_grade: str
    calculated_score: int
    final_action: str
    allocated_points: int

class ListingsResponse(BaseModel):
    listings: List[MarketplaceListing]

class ReviewItem(BaseModel):
    product_id: str
    ai_grade: str
    calculated_score: int
    status: str

class AdminQueueResponse(BaseModel):
    flagged_items: List[ReviewItem] 
# --- Day 2: Loyalty Point Redemption Contracts ---
class RedeemRequest(BaseModel):
    user_id: str
    points_to_redeem: int

class RedeemResponse(BaseModel):
    success: bool
    coupon_code: str
    discount_amount_inr: float
    remaining_points: int    