Second Life Commerce
AI-Powered Returns & Sustainable Resale
2-Day Hackathon Implementation Plan  |  Team of 3  |  Kiro + Gemini Flash
Amazon Build On Hackathon  |  June 2026
PROJECT
|     | TEAM SIZE 3 | DURATION 2 | AI TOOL Kiro + | BACKEND | FRONTEND |
| --- | ----------- | ---------- | -------------- | ------- | -------- |
Second Life
|     | Members | Days (48 hrs) | Gemini Flash | FastAPI + Python | React.js |
| --- | ------- | ------------- | ------------ | ---------------- | -------- |
Commerce
TEAM & RESPONSIBILITIES
| Member A |     |     | Team Lead / Full-Stack + AI Integration |     |     |
| -------- | --- | --- | --------------------------------------- | --- | --- |
(cid:127) Design system architecture & API structure (cid:127) Build Gemini Flash image grading integration (cid:127) Implement condition routing
engine (resell/donate/recycle/refurbish) (cid:127) Lead demo video preparation (cid:127) Code review & final integration
| Member B |     |     | Backend Developer / Data & Logic |     |     |
| -------- | --- | --- | -------------------------------- | --- | --- |
(cid:127) Build FastAPI endpoints (upload, grade, questionnaire, routing) (cid:127) Design mock JSON database (products, sellers, listings) (cid:127)
Implement Green Points scoring logic (cid:127) Build Return Regret Predictor feature (cid:127) Handle API error handling & testing
| Member C |     |     | Frontend Developer / UI-UX |     |     |
| -------- | --- | --- | -------------------------- | --- | --- |
(cid:127) Build React UI: upload flow, questionnaire screens, dashboard (cid:127) Implement second-hand listing widget on product page (cid:127)
Build Green Points tracker & discount display (cid:127) Create annotated image overlay (damage highlight) (cid:127) Polish final UI for demo
& video
DAY 1  —  FOUNDATION + CORE AI ENGINE
Goal: Working upload fi AI grade fi routing pipeline by end of day
| TIME | OWNER |     |     | TASKS |     |
| ---- | ----- | --- | --- | ----- | --- |
9:00–10:00 ALL MEMBERS (cid:127) Kickoff: divide Figma mockups, agree on API contracts (cid:127) Set up GitHub repo,
shared folder structure (cid:127) Member A: scaffold FastAPI app + React app with
Vite (cid:127) Install deps: fastapi, uvicorn, google-generativeai, axios, tailwind
10:00–12:30 A + B (cid:127) A: Write Gemini Flash image quality evaluator (lighting, blur, contrast check)
(cid:127) A: Write Gemini condition grader prompt — returns JSON: {grade,
damage_list, confidence} (cid:127) B: Build /api/upload endpoint + /api/grade endpoint
(cid:127) B: Design mock DB: products.json, sellers.json, listings.json (cid:127) Both: Test
image upload pipeline end-to-end with sample photos
10:00–12:30 Member C (cid:127) Build photo upload screen with drag-and-drop (React) (cid:127) Add image quality
feedback UI (shows 'Retake photo — poor lighting') (cid:127) Build loading state +
Gemini result display card (cid:127) Connect frontend to /api/grade endpoint
| 12:30–1:30 | LUNCH BREAK | (cid:127) Rest — 1 hour. Sync on blockers. |     |     |     |
| ---------- | ----------- | ------------------------------------------ | --- | --- | --- |

1:30–3:30 Member A (cid:127) Build AI routing engine: grade + seller answers fi decision
(resell/refurbish/donate/recycle) (cid:127) Build confidence threshold: flag items <70%
confidence for human review (cid:127) Write Gemini dynamic questionnaire generator
(based on detected damage) (cid:127) Test routing with 10 mock product scenarios
1:30–3:30 Member B (cid:127) Build /api/questionnaire and /api/submit-answers endpoints (cid:127) Build
/api/route-product endpoint — returns routing decision + reason (cid:127) Implement
Green Points calculation logic (action fi points map) (cid:127) Set up mock seller
profiles with running point totals
1:30–3:30 Member C (cid:127) Build 2-screen questionnaire UI (dynamic questions from API) (cid:127) Build
product condition result screen with grade badge + routing decision card (cid:127) Add
colour-coded routing tags (green=donate, blue=resell, orange=refurbish,
red=recycle) (cid:127) Build Green Points earned animation/display
3:30–5:30 A + C (cid:127) A: Build image annotation overlay — highlight damage regions on uploaded
photo (cid:127) C: Render bounding box / highlight overlays using HTML canvas (cid:127)
Both: Polish the full upload fi grade fi questionnaire fi result flow (cid:127)
Integration test: run 5 complete flows end-to-end
3:30–5:30 Member B (cid:127) Build Return Regret Predictor — Gemini call on return reason + category (cid:127)
Returns: {regret_probability, insight_message} (cid:127) Wire into return initiation
screen (cid:127) Build /api/regret-predict endpoint + test
5:30–6:30 ALL MEMBERS (cid:127) Day 1 integration: connect all endpoints to frontend (cid:127) Fix top 3 bugs each
member found during testing (cid:127) Commit all code, tag v1.0-day1 (cid:127) Plan Day 2
priorities, identify gaps
DAY 2 — FEATURES + POLISH + DEMO
Goal: All features live, UI polished, demo video recorded by 5 PM
TIME OWNER TASKS
9:00–9:30 ALL MEMBERS (cid:127) Day 2 standup: review Day 1 bugs, prioritise fix list (cid:127) Assign final features,
agree on demo script
9:30–12:00 Member A (cid:127) Build second-hand listing page: graded products browsable by category +
condition (cid:127) Add 'Buy second-hand instead' widget on product detail page (cid:127)
Link resale listings from return flow into browse page (cid:127) Add CO2 saved
calculation display on each listing
9:30–12:00 Member B (cid:127) Build /api/listings endpoint with filter by product_id, condition, category (cid:127)
Build /api/co2-impact endpoint — returns kg CO2 saved, car trip equivalent (cid:127)
Add human review queue: flagged items appear in /api/admin/review (cid:127) Build
/api/green-points/redeem endpoint for discount application
9:30–12:00 Member C (cid:127) Build Green Points dashboard: total points, history, discount unlock tiers (cid:127)
Polish all screens: consistent spacing, colours, Amazon-style design language
(cid:127) Build admin/warehouse review screen (flagged items + approve/reject
buttons) (cid:127) Add micro-animations: points earn animation, routing decision
reveal
12:00–1:00 LUNCH BREAK (cid:127) Rest — 1 hour. Final alignment on demo flow.
1:00–2:30 A + B (cid:127) Full end-to-end integration test — run 10 complete flows (cid:127) Fix any broken
API calls or state bugs (cid:127) Verify all 5 main features work: upload, grade, route,
regret predict, second-hand widget (cid:127) Optimise Gemini prompt responses for
speed

1:00–2:30 Member C (cid:127) Add error states: what happens when image upload fails, API timeout, etc. (cid:127)
Mobile responsiveness pass on all screens (cid:127) Final colour/font/spacing polish (cid:127)
Prepare demo walkthrough slides (5 slides max)
2:30–4:30 ALL MEMBERS (cid:127) Record demo video: 3-minute walkthrough of complete flow (cid:127) Script:
Problem fi Upload photo fi AI grades fi Questionnaire fi Routing decision
fi Green points fi Regret predictor fi Second-hand widget (cid:127) Edit video (trim,
add captions, add screen zoom on key moments) (cid:127) Write project README
and submit
4:30–5:00 ALL MEMBERS (cid:127) Final submission check: code pushed, video uploaded, README complete (cid:127)
Celebrate!
COMPLETE TECH STACK
LAYER TECHNOLOGY PURPOSE
AI / LLM Google Gemini Flash (Free Tier) Image quality check, condition grading, dynamic
questionnaire generation, Return Regret Predictor — all via
Gemini 1.5 Flash API
IDE / Code Gen Amazon Kiro (300 tokens) AI code autocomplete for FastAPI endpoints & React
components. Use 30 tokens/person on Day 1 for scaffold,
reserve 30-40 for Day 2 debugging
Backend FastAPI + Python 3.11 REST API server. Lightweight, auto-generates /docs,
async-ready. Run with Uvicorn.
Frontend React.js + Vite + Tailwind CSS Component-based UI. Vite for fast HMR. Tailwind for rapid
Amazon-style styling without custom CSS overhead.
Image Handling Python Pillow + HTML Canvas Pillow for server-side image pre-processing. Canvas API
for client-side damage highlight overlay rendering.
Database JSON Files (Mock DB) products.json, sellers.json, listings.json — flat file mock
database. Zero setup, easy to seed with realistic data, no
SQL needed in a hackathon.
HTTP Client Axios (React) Handles all API calls from frontend to FastAPI backend.
Clean promise-based syntax, easy error handling.
State Management React useState + useContext Local state for form flows. Context for Green Points wallet
— no Redux overhead needed.
File Upload FastAPI UploadFile + FormData Multipart file upload from React to FastAPI. Direct base64
encoding before sending to Gemini Vision API.
Version Control Git + GitHub Shared repo, one branch per feature. Commit after every
working feature. Tag v1.0-day1, v2.0-final.
Deployment localhost:8000 + localhost:5173 Local demo only — no cloud deployment needed for
hackathon. Screen share or OBS for video recording.
Video OBS Studio / Loom Record demo walkthrough. Add captions in DaVinci
Resolve or CapCut free.
5 CORE FEATURES — BUILD PRIORITY
MUST HAVE

P1 Image Quality Check AI rejects bad photos before grading — saves false grades
P1 AI Condition Grader Gemini grades image fi returns damage list + confidence score
P1 Dynamic Questionnaire Questions adapt based on what AI detected — not a fixed form
P1 Routing Engine Decides: resell / refurbish / donate / recycle with reason shown
P1 Green Points System Seller earns points per action, unlocks discounts
UNIQUE / WOW FACTOR
Before return submitted — AI says '87% regret this'. Unique. One Gemini
P2 Return Regret Predictor
call.
Second-Hand Widget on Product Buy refurbished instead shown under 'Add to Cart'. Closes the circular
P2
Page economy loop.
Highlights the exact region of damage on uploaded photo using canvas.
P2 Damage Annotation Overlay
Looks like enterprise software.
Shows kg CO2 saved + car trip equivalent per resale. Makes sustainability
P2 CO2 Impact Display
tangible.
IF TIME ALLOWS
P3 Human Review Queue Admin screen for flagged low-confidence grades. Shows AI is accountable.
P3 Best Time to Resell Category-based resale timing predictor (lookup table, looks like ML).
KIRO TOKEN STRATEGY (300 Total — 100 Per Person)
MEMBER DAY 1 USE (50 tokens) DAY 2 USE (30 tokens) RESERVE (20
tokens)
Member A Generate FastAPI app scaffold, Annotation overlay canvas code, Unexpected
(Lead) Gemini integration boilerplate, routing listing page components integration bugs,
engine logic last-minute
features
Member B All FastAPI endpoint stubs, mock Admin review queue, CO2 calculation API edge cases,
(Backend) JSON data generation, Green Points logic, regret predictor endpoint data model fixes
logic
Member C React component scaffolds, Tailwind Dashboard UI, animation code, UI bug fixes, demo
(Frontend) layout, upload screen mobile responsive fixes polish
Key reminder: Kiro tokens = IDE autocomplete quota for YOU, not your app's API calls. Your app's Gemini calls run on Google's free
tier separately — completely independent.
GEMINI FLASH PROMPT CHEAT SHEET
Image Quality Check
"Evaluate this image for product condition assessment. Check: 1) Lighting (is product clearly lit?), 2)
Blur (is image sharp?), 3) Angle (is product fully visible?), 4) Background (is product distinguishable?).
Return JSON only: {quality_ok: bool, issues: [list of issues], retry_message: string}"
Condition Grader

"Analyse this product image for resale condition grading. Identify: visible damage, scratches, dents,
packaging condition, missing parts, overall wear. Return JSON only: {grade: one of [Like
New/Good/Fair/Poor], damage_list: [list], confidence: 0-100, damage_locations: [describe where on image
each damage appears]}"
Dynamic Questionnaire
"Based on this product grade: {grade} and damage list: {damage_list}, generate 3-5 targeted follow-up
questions to clarify condition. Questions must be specific to the damage found. Return JSON only:
{questions: [{id, question, type: radio|text, options?: []}]}"
Return Regret Predictor
"A buyer wants to return a {product_category} with reason: {return_reason}. Based on common return
patterns, estimate regret probability. Return JSON only: {regret_probability: 0-100, insight: 1-sentence
insight about why people regret this return, keep_suggestion: actionable tip to keep the product}"
Routing Decision
"Product: {category}. Grade: {grade}. Damage: {damage_list}. Seller answers: {answers}. Determine the best
next destination. Return JSON only: {decision: one of [resell/refurbish/donate/recycle], reason: 1-2
sentences, confidence: 0-100, flag_for_human_review: bool}"
Second Life Commerce — Amazon Build On Hackathon 2026 | Generated by Claude | Good luck, team!