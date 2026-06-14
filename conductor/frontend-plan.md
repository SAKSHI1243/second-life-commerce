# Frontend Implementation Plan: Second Life Commerce

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Build a complete React JS (web) + Vite + Tailwind frontend for the Second Life Commerce hackathon project, strictly adhering to an Amazon.in-inspired utilitarian design language and the Anti-Slop mandate.
**Architecture:** Single Page Application (SPA) using React JS for the web. State managed via standard React hooks. API interactions centralized via Axios.
**Tech Stack:** React JS (Web), TypeScript, Vite, Tailwind CSS, Lucide React (Icons), Axios.

---

## 🎨 Design System & Aesthetic Constraints (The "Anti-Slop" Mandate)

We are building an Amazon-inspired UI. It must look utilitarian, highly functional, and trustworthy.

*   **Banned Aesthetics:** No purple/pink gradients, no soft floating drop-shadows, no massive border radii (pill buttons).
*   **Material Honesty:** Use hard borders (`border border-[#D5D9D9]`), distinct negative space, and strict typographic hierarchy.
*   **Border Radius:** Maximum `rounded-md` (4px-6px). 
*   **Interactive States:** EVERY interactive element must have explicit `hover:` and `focus-visible:` states.

### Tailwind Theme Extensions (`tailwind.config.js`)
```javascript
export default {
  theme: {
    extend: {
      colors: {
        amazon: {
          dark: '#131921',      // Main header
          light: '#232F3E',     // Sub header
          orange: '#FF9900',    // Accents/Secondary buttons
          yellow: '#FFD814',    // Primary Action buttons (Add to cart style)
          yellowHover: '#F7CA00', 
          text: '#0F1111',      // Primary text
          muted: '#565959',     // Secondary text
          border: '#D5D9D9',    // Card/Input borders
          bg: '#F2F4F8',        // Page background
          green: '#007600',     // Green points / Success / Sustainability
          red: '#B12704'        // Errors / Recycle alerts
        }
      }
    }
  }
}
```

---

## 🏗️ Phase 1: Scaffold & Base Components

### Task 1: Initialize Project & Tailwind
**Files:**
- Create: `frontend/package.json`, `frontend/tailwind.config.js`, `frontend/src/index.css`

- [ ] **Step 1:** Run `npm create vite@latest frontend -- --template react-ts`.
- [ ] **Step 2:** Install dependencies: `npm install axios lucide-react` and `npm install -D tailwindcss postcss autoprefixer`.
- [ ] **Step 3:** Initialize Tailwind and configure the `theme.extend.colors` above. Add strict base styles to `index.css` (body bg: `bg-amazon-bg`, text: `text-amazon-text`).

### Task 2: Base UI Components
**Files:**
- Create: `frontend/src/components/ui/Button.tsx`
- Create: `frontend/src/components/ui/Card.tsx`
- Create: `frontend/src/components/layout/Header.tsx`

- [ ] **Step 1:** Build `Button.tsx`. Variants: `primary` (Yellow bg, hard border), `secondary` (White bg, gray border). MUST include `focus-visible:ring-2 focus-visible:ring-amazon-orange outline-none transition-colors`.
- [ ] **Step 2:** Build `Card.tsx`. Strictly `bg-white border border-amazon-border rounded-md p-4`. No shadows.
- [ ] **Step 3:** Build `Header.tsx`. `bg-amazon-dark text-white p-3 flex justify-between`. Include a mock "Green Points" counter in the top right (`text-amazon-orange font-bold`).

---

## 📸 Phase 2: Upload & AI Grading Flow

### Task 3: Image Dropzone & API Integration
**Files:**
- Create: `frontend/src/services/api.ts`
- Create: `frontend/src/components/upload/Dropzone.tsx`

- [ ] **Step 1:** Setup `api.ts` with an Axios instance pointing to `http://localhost:8000`. Create `uploadImage(file)` and `gradeImage(file)` functions.
- [ ] **Step 2:** Build `Dropzone.tsx`. A dashed area `border-2 border-dashed border-amazon-border hover:border-amazon-orange bg-white p-8 text-center cursor-pointer`. Handle file drop and selection.

### Task 4: Damage Annotation Canvas & Results Card
**Files:**
- Create: `frontend/src/components/grading/ImageAnnotator.tsx`
- Create: `frontend/src/components/grading/GradeResult.tsx`

- [ ] **Step 1:** Build `ImageAnnotator.tsx`. Accepts `src` and `damage_locations` (`[ymin, xmin, ymax, xmax]`). Uses an HTML `<canvas>` to draw red bounding boxes over the image. Calculate relative coordinates based on canvas width/height.
- [ ] **Step 2:** Build `GradeResult.tsx`. A `Card` displaying the AI Grade (Like New, Good, Fair, Poor) with color-coding. List the detected damages.

---

## 📋 Phase 3: Routing & Sustainability

### Task 5: Dynamic Questionnaire
**Files:**
- Create: `frontend/src/components/grading/Questionnaire.tsx`

- [ ] **Step 1:** Component receives `questions` array. Renders standard Amazon-style radio buttons. 
- [ ] **Step 2:** Maintain state for `answers`. Include a Primary `Button` to "Submit Assessment".

### Task 6: Routing Decision & CO2 Impact
**Files:**
- Create: `frontend/src/components/outcome/DecisionCard.tsx`
- Create: `frontend/src/components/outcome/CO2Impact.tsx`

- [ ] **Step 1:** Build `DecisionCard.tsx`. Shows the final routing (Resell, Refurbish, Donate, Recycle). Display the `reason`. Include a Green Points badge `bg-[#E7F4E5] text-amazon-green border border-amazon-green p-2 rounded`.
- [ ] **Step 2:** Build `CO2Impact.tsx`. Calls `/api/co2-impact`. Displays "You saved X kg of CO2" with a small leaf icon.

---

## 🤔 Phase 4: Wow-Factor Features

### Task 7: Return Regret Predictor
**Files:**
- Create: `frontend/src/views/RegretPredictorView.tsx`

- [ ] **Step 1:** Build a simple form: Category (dropdown) and Return Reason (textarea).
- [ ] **Step 2:** Call `/api/regret-predict`. Show the probability in a progress bar. If >70%, show a warning card with the AI insight.

### Task 8: Assemble App Routing
**Files:**
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1:** Implement a simple view router using state (`currentView: 'home' | 'assessment' | 'outcome' | 'regret'`).
- [ ] **Step 2:** Compose the full user journey: Home (Dropzone) -> Assessment (Annotator + Result + Questionnaire) -> Outcome (Decision + CO2).