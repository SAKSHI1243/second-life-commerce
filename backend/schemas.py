from pydantic import BaseModel, Field
from typing import List, Optional

# 1. This defines what the AI Grader output looks like
class DamageLocation(BaseModel):
    box_2d: List[int] = Field(..., description="[ymin, xmin, ymax, xmax] coordinates")
    label: str

class GradeResponse(BaseModel):
    grade: str # e.g., "Good", "Like New"
    damage_list: List[str]
    confidence: float
    damage_locations: List[DamageLocation]

# 2. This defines what a Question looks like when sent to the Frontend
class QuestionnaireOption(BaseModel):
    id: str
    text: str

class Question(BaseModel):
    id: str
    question: str
    type: str # "radio" or "text"
    options: Optional[List[QuestionnaireOption]] = None

class QuestionnaireResponse(BaseModel):
    questions: List[Question]

# 3. This defines what the final Routing Decision looks like
class RoutingDecisionResponse(BaseModel):
    decision: str # "resell", "refurbish", "donate", "recycle"
    reason: str
    second_life_score: float
    green_points_earned: int