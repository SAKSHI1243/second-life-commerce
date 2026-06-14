# 🛍️ Second Life Commerce — AI Circular Economy Engine

**Project:** Second Life Commerce (AI-Powered Returns & Sustainable Resale)  
**Context:** Amazon Build On Hackathon | June 2026  
**Status:** 2-Day Implementation Plan in Progress

## 🚀 Project Overview

Second Life Commerce is an AI-driven platform designed to facilitate the circular economy by automating the grading, valuation, and routing of used products. It leverages Google Gemini's multi-modal capabilities to assess product condition from images and provide intelligent routing decisions (Resell, Refurbish, Donate, Recycle).

- **Purpose:** Automate assessment to maximize lifecycle value and minimize environmental impact.
- **Hackathon Goal:** Deliver a functional prototype with high-quality AI grading and sustainable routing.

## 🛠️ Technology Stack

- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) + Python 3.11 (REST API, Uvicorn)
- **Frontend:** [React.js](https://reactjs.org/) + Vite + [Tailwind CSS](https://tailwindcss.com/)
- **AI/ML:** [Google Gemini Flash API](https://ai.google.dev/) (Image assessment, Grading, Regret Prediction)
- **Code Assistance:** Amazon Kiro (AI autocomplete)
- **Data Storage:** Lightweight JSON persistence (`products.json`, `sellers.json`, `listings.json`)
- **Image Handling:** Python Pillow (Backend) + HTML Canvas (Frontend for annotations)

## 📂 Project Structure

- `backend/`: Core application source code.
    - `main.py`: API entry point and routing logic.
    - `ai_agent.py`: Multi-modal AI logic and Gemini API wrappers.
    - `database.py`: JSON database management and initialization.
    - `schemas.py`: Pydantic models and data contracts.
- `secondlife-backend/`: Research and development sandbox (Notebooks, sample images).
- `frontend/`: React JS + Vite web application.

## ⚙️ Feature Priority (Hackathon Roadmap)

### P1: Must-Have (Day 1)
- [x] **AI Image Quality Check:** Reject bad photos before grading.
- [x] **AI Condition Grader:** Gemini-based grade + damage list + confidence score.
- [x] **Dynamic Questionnaire:** AI-generated follow-up questions based on detected damage.
- [x] **Routing Engine:** Decision matrix (Resell, Refurbish, Donate, Recycle).
- [x] **Green Points System:** Reward system for circular actions.

### P2: Wow Factor (Day 2)
- [x] **Return Regret Predictor:** AI analysis of return intent to predict cognitive dissonance.
- [x] **CO2 Impact Display:** Tangible environmental savings metrics.
- [x] **Damage Annotation Overlay:** HTML Canvas highlight of damage regions on photos.
- [ ] **Second-Hand Widget:** Integrated "Buy Refurbished" option in product detail page.

### P3: If Time Allows
- [x] **Human Review Queue:** Admin interface for low-confidence AI grades.
- [ ] **Best Time to Resell:** Category-based resale timing predictor.

## 👥 Team Responsibilities

- **Member A (Lead):** AI Integration, Architecture, Routing logic, Demo prep.
- **Member B (Backend):** FastAPI Endpoints, Mock DB, Green Points, Regret Predictor.
- **Member C (Frontend):** React UI, Dashboard, Canvas Annotations, UX polish.

## 📜 Development Conventions

- **AI-First Logic:** Move complex prompts to `ai_agent.py`. Use the "Gemini Flash Prompt Cheat Sheet" from the PRD.
- **Mock Persistence:** Use `database.py` to interact with JSON files. Do not add heavy SQL databases.
- **Amazon Design Language:** Ensure UI follows a clean, Amazon-style aesthetic using Tailwind.
- **Fallback Reliability:** Every AI-dependent feature must have a static fallback logic.
