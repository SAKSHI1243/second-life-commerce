from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import schemas # Import the file we made above

app = FastAPI(title="Second Life Commerce Backend Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ENDPOINT 1: IMAGE QUALITY & GRADING MOCK ---
@app.post("/api/grade", response_model=schemas.GradeResponse)
async def grade_product_image(image: UploadFile = File(...)):
    """
    Step 1: Frontend uploads an image file here.
    For now, we return a flawless mock response so the UI can render highlights.
    """
    # Member A will later inject real Gemini code here.
    # Right now, we return perfect placeholder data:
    return schemas.GradeResponse(
        grade="Good",
        damage_list=["Screen hairline scratch"],
        confidence=91.5,
        damage_locations=[
            schemas.DamageLocation(box_2d=[120, 450, 180, 520], label="Display Scratch")
        ]
    )

# --- ENDPOINT 2: DYNAMIC QUESTIONNAIRE MOCK ---
@app.post("/api/questionnaire", response_model=schemas.QuestionnaireResponse)
async def get_dynamic_questions(grade: str = Form(...), flaws: str = Form(...)):
    """
    Step 2: Frontend sends the calculated grade/flaws, backend returns targeted questions.
    """
    return schemas.QuestionnaireResponse(
        questions=[
            schemas.Question(
                id="q1",
                question="Is the screen touch digitizer fully responsive beneath the scratch?",
                type="radio",
                options=[
                    schemas.QuestionnaireOption(id="opt_yes", text="Yes, fully functional"),
                    schemas.QuestionnaireOption(id="opt_no", text="No, touch is dead")
                ]
            ),
            schemas.Question(
                id="q2",
                question="When did this cosmetic damage occur?",
                type="text"
            )
        ]
    )

# --- ENDPOINT 3: ROUTING & GREEN POINTS ENGINE MOCK ---
@app.post("/api/route-product", response_model=schemas.RoutingDecisionResponse)
async def process_routing_decision(
    product_id: str = Form(...),
    grade: str = Form(...),
    answers: str = Form(...) # Incoming answers wrapped as a string payload
):
    """
    Step 3: Take all inputs, run our math matrix, and output final destination + points.
    """
    # Our formula will eventually live here! Right now, standard fallback:
    return schemas.RoutingDecisionResponse(
        decision="resell",
        reason="Item retains high demand and structural degradation is purely cosmetic.",
        second_life_score=85.4,
        green_points_earned=150
    )