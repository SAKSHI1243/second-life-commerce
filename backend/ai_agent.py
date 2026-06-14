# ai_agent.py
import httpx
import json
import base64
import os
from dotenv import load_dotenv

load_dotenv() # Load GEMINI_API_KEY from .env

# Secure api credential registers handling
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_BACKUP_HACKATHON_API_KEY")
MODEL_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent"

def ask_gemini_with_image(prompt_text, image_path):
    url = f"{MODEL_URL}?key={GEMINI_API_KEY}"
    with open(image_path, "rb") as f:
        image_b64 = base64.b64encode(f.read()).decode()
    
    ext = image_path.split(".")[-1].lower()
    mime_type = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png"}.get(ext, "image/jpeg")
    
    payload = {
        "contents": [{
            "parts": [
                {"text": prompt_text},
                {"inline_data": {"mime_type": mime_type, "data": image_b64}}
            ]
        }]
    }
    
    with httpx.Client(verify=False, timeout=60.0) as client:
        response = client.post(url, json=payload)
    result = response.json()
    if "candidates" not in result:
        print("❌ Error from Gemini:", json.dumps(result, indent=2))
        return None
    return result["candidates"][0]["content"]["parts"][0]["text"]

def safe_parse_json(text):
    text = text.strip()
    if "```json" in text:
        text = text.split("```json")[1].split("```")[0]
    elif "```" in text:
        text = text.split("```")[1].split("```")[0]
    return json.loads(text.strip())

def check_image_quality(image_path):
    prompt = """Evaluate this image for product condition assessment.
    Check: 1) Lighting, 2) Blur, 3) Angle, 4) Background.
    Return JSON only, no extra text:
    {"quality_ok": true, "issues": [], "retry_message": ""}"""
    result = ask_gemini_with_image(prompt, image_path)
    if result is None:
        return None
    return safe_parse_json(result)

def grade_product_image(image_path):
    prompt = """Analyse this product image for resale condition grading.
    1) Identify the product CATEGORY (e.g., Electronics, Footwear, Apparel, Home).
    2) Identify visible damage, scratches, dents, packaging condition, missing parts, overall wear.
    Return JSON only, no extra text:
    {
        "category": "Footwear",
        "grade": "Good", 
        "damage_list": ["scratch on screen"], 
        "confidence": 0.85, 
        "damage_locations": [
            {"box_2d": [ymin, xmin, ymax, xmax], "label": "damage_type"}
        ]
    }
    Grade must be one of: Like New, Good, Fair, Poor.
    Coordinates for box_2d must be normalized (0-1000) where [0,0,1000,1000] is the full image."""
    result = ask_gemini_with_image(prompt, image_path)
    if result is None:
        return None
    return safe_parse_json(result)

def full_image_analysis(image_path):
    print(f"📸 Image Proxy Channel Processing: {image_path}")
    quality = check_image_quality(image_path)
    if quality is None:
        return None
    if not quality.get("quality_ok"):
        return {"quality_ok": False, "category": "Unknown", "grade": "Poor", "confidence": 0, "damage_list": quality.get("issues", [])}
    
    grade_result = grade_product_image(image_path)
    if grade_result is None:
        return None
    return {"quality_ok": True, **grade_result}