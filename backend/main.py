from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import schemas
import database
import os
import shutil

app = FastAPI(title="Second Life Circular Economy Engine")

# Day 1 Requirement: Ensure dynamic assets upload folder directory exists
UPLOAD_DIR = "uploaded_photos"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount directory so Frontend can access the uploaded images directly for canvas overlays
app.mount("/static", StaticFiles(directory=UPLOAD_DIR), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TEMP_FLOW_STORE = {}

@app.post("/api/upload")
async def upload_photo(file: UploadFile = File(...)):
    """
    P1 Feature: File handling node pipeline. 
    Saves image locally and returns static asset road mapping path.
    """
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"message": "File successfully uploaded", "image_url": f"/static/{file.filename}"}


@app.post("/api/grade", response_model=schemas.GradeResponse)
async def grade_product(file: UploadFile = File(...)):
    """
    P1 Feature: AI Image Quality Check & Condition Grader Simulation.
    Provides pixel coordinate matrices for enterprise damage annotation overlays.
    """
    # Emulating Gemini Quality Guardrail Filter
    mock_output = {
        "quality": {
            "is_acceptable": True,
            "lighting_check": "Pass",
            "blur_check": "Pass"
        },
        "grade": "Good",
        "confidence": 0.88, # 88% confidence level score
        "damage_list": ["minor scratch near bottom speaker grill"],
        "damage_locations": [
            {
                "box_2d": [750, 200, 890, 600], # [ymin, xmin, ymax, xmax] layout coordinates
                "label": "surface_scratch"
            }
        ]
    }
    
    # Persistent pipeline handshaking tracker
    TEMP_FLOW_STORE["current_grade"] = mock_output["grade"]
    TEMP_FLOW_STORE["current_confidence"] = mock_output["confidence"]
    return mock_output


@app.post("/api/questionnaire", response_model=schemas.QuestionnaireResponse)
async def get_questions(grade_data: schemas.GradeResponse):
    """
    P1 Dynamic Questionnaire: Contextual mutation matrix based on vision tags.
    """
    if grade_data.grade == "Poor":
        questions = [
            {
                "id": "device_boots", 
                "question": "Does the device even turn on or show a boot loop?", 
                "type": "radio",
                "options": [{"id": "yes", "text": "Yes, it boots"}, {"id": "no", "text": "No, completely dead"}]
            }
        ]
    else:
        questions = [
            {
                "id": "touch_ok", 
                "question": "Is the screen touch working uniformly across the panel?", 
                "type": "radio",
                "options": [{"id": "yes", "text": "Yes, fully functional"}, {"id": "no", "text": "No, dead zones"}]
            },
            {
                "id": "battery_issue", 
                "question": "Is there any visible expansion or battery swelling?", 
                "type": "radio",
                "options": [{"id": "yes", "text": "Yes, looks swollen"}, {"id": "no", "text": "No, flat back"}]
            }
        ]
    return {"questions": questions}


@app.post("/api/route-product", response_model=schemas.RoutingDecisionResponse)
async def route_product(user_answers: schemas.UserAnswers):
    """
    P1 Routing Engine & P3 Human Accountability Queue:
    Flags items automatically if Gemini confidence drops below 70% threshold.
    """
    ai_grade = TEMP_FLOW_STORE.get("current_grade", "Good")
    ai_confidence = TEMP_FLOW_STORE.get("current_confidence", 0.85)
    
    grade_weights = {"Good": 60, "Fair": 40, "Poor": 20}
    base_score = grade_weights.get(ai_grade, 40)
    
    penalty = 0
    answers = user_answers.answers
    if answers.get("touch_ok") == "no" or answers.get("device_boots") == "no":
        penalty += 30
    if answers.get("battery_issue") == "yes":
        penalty += 40
        
    final_score = max(0, base_score + 40 - penalty)
    
    # Rule Matrix assignment logic
    if final_score >= 75:
        action = "resell"
        reward_points = 200
        reason = "Asset hardware structural integrity qualifies for active refurbished reselling streams."
        alt_route = None
    elif final_score >= 50:
        action = "refurbish"
        reward_points = 150
        reason = "Device demonstrates light functional anomaly. Routed for diagnostic component optimization."
        alt_route = None
    elif final_score >= 35:
        action = "donate"
        reward_points = 100
        reason = "Cosmetic scaling metrics indicate maximum utility via non-profit social good channels."
        alt_route = None
    else:
        action = "recycle"
        reward_points = 50
        reason = "Severe chemical component hazard threshold breached. Automated sorting to landfill mitigation loops."
        alt_route = {
            "facility_name": "Eco-Green E-Waste Hub",
            "distance_km": 4.2,
            "instructions": "Drop asset inside kiosk bay locator."
        }

    # P3 Accountability check: flag if AI confidence is low (< 0.70)
    is_flagged = ai_confidence < 0.70

    # Persist results state to JSON
    products = database.read_json(database.PRODUCTS_DB)
    new_product_id = f"PROD_{len(products) + 1001}"
    products.append({
        "product_id": new_product_id,
        "ai_grade": ai_grade,
        "calculated_score": final_score,
        "final_action": action,
        "allocated_points": reward_points,
        "review_status": "flagged_for_review" if is_flagged else "verified"
    })
    database.write_json(database.PRODUCTS_DB, products)
    
    # Process wallet state balances
    sellers = database.read_json(database.SELLERS_DB)
    target_user = "user_sakshi"
    if target_user in sellers:
        sellers[target_user]["green_points"] += reward_points
        sellers[target_user]["listings_count"] += 1
        database.write_json(database.SELLERS_DB, sellers)

    return {
        "second_life_score": float(final_score),
        "decision": action,
        "green_points_earned": reward_points,
        "reason": reason,
        "flagged_for_review": is_flagged,
        "alternative_route": alt_route
    }


# --- Day 2 Feature Requirements Modules ---

@app.post("/api/regret-predict", response_model=schemas.RegretResponse)
async def api_predict_return_regret(payload: schemas.RegretRequest):
    """P2 Unique Wow Factor: Behavioral Return Regret Logic."""
    reason = payload.return_reason.lower()
    if "buyer" in reason or "regret" in reason or "impulsive" in reason or "heavy" in reason:
        prob, insight = 87.5, "High impulse cognitive dissonance tracking signature. Offer immediate green voucher."
    elif "defective" in reason or "broken" in reason:
        prob, insight = 11.0, "Verified objective technical failure. Process directly without retention blocks."
    else:
        prob, insight = 54.0, "Standard preference drift loop. Standard inventory reallocation route rules applied."
    return {"regret_probability": prob, "insight_message": insight}


@app.post("/api/co2-impact", response_model=schemas.CO2ImpactResponse)
async def calculate_co2_impact(product_id: str):
    """P2 Unique Feature: CO2 Emission Footprint Metric Generator."""
    products = database.read_json(database.PRODUCTS_DB)
    target = next((p for p in products if p["product_id"] == product_id), None)
    score = target.get("calculated_score", 72) if target else 72
    action = target.get("final_action", "resell") if target else "resell"
    multiplier= 1.25 if action =="resell" else 0.85
    kg_saved = round(score * multiplier, 2)
    car_km = round(kg_saved * 4.9, 2)
    return {
        "product_id": product_id,
        "kg_co2_saved": kg_saved,
        "car_trip_equivalent_km": car_km,
        "insight_text": f"By selecting {action.upper()}, you saved {kg_saved}kg of CO2, offsetting a {car_km}km vehicle trip!"
    }


@app.get("/api/listings", response_model=schemas.ListingsResponse)
async def get_marketplace_listings():
    """P2 Second-Hand Circular Marketplace Feed Module."""
    products = database.read_json(database.PRODUCTS_DB)
    if not products:
        products = [{"product_id": "PROD_1001", "ai_grade": "Good", "calculated_score": 78, "final_action": "resell", "allocated_points": 200}]
    
    listings = [item for item in products if item.get("final_action") != "recycle"]
    return {"listings": listings}


@app.get("/api/admin/review", response_model=schemas.AdminQueueResponse)
async def get_admin_review_queue():
    """P3 Admin Safety Net Verification Interface Ledger System."""
    products = database.read_json(database.PRODUCTS_DB)
    flagged = [
        {"product_id": item["product_id"], "ai_grade": item["ai_grade"], "calculated_score": int(item["calculated_score"]), "status": "flagged_for_review"}
        for item in products if item.get("review_status") == "flagged_for_review"
    ]
    if not flagged:
        flagged = [{"product_id": "PROD_9999_SUSPECT", "ai_grade": "Poor", "calculated_score": 28, "status": "flagged_for_review"}]
    return {"flagged_items": flagged}


@app.post("/api/green-points/redeem", response_model=schemas.RedeemResponse)
async def redeem_green_points(payload: schemas.RedeemRequest):
    """P1 Core Engine Hook: Loyalty Ledger Voucher Minting Gateway."""
    sellers = database.read_json(database.SELLERS_DB)
    user = "user_sakshi"
    if sellers[user]["green_points"] < payload.points_to_redeem:
        raise HTTPException(status_code=400, detail="Insufficient credits registry balance pool.")
    
    discount = float(payload.points_to_redeem / 10.0)
    sellers[user]["green_points"] -= payload.points_to_redeem
    database.write_json(database.SELLERS_DB, sellers)
    
    import random
    return {
        "success": True,
        "coupon_code": f"KIRO-CIRCULAR-{random.randint(10000, 99999)}",
        "discount_amount_inr": discount,
        "remaining_points": sellers[user]["green_points"]
    }