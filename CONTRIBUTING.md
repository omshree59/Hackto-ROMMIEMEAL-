# Contributing to RoomieMeal 🥑

> **Open Innovation Matters:** RoomieMeal is an open-source, privacy-preserving household meal planner built to keep shared kitchens safe from allergen cross-contamination and food conflicts.

We welcome contributions from developers, nutrition enthusiasts, home cooks, and open-source advocates worldwide!

---

## 🌟 Why Open Innovation Matters Here

Big tech apps monetize dietary data, track health habits, and lock meal planning behind monthly paywalls. RoomieMeal takes a radically different stance:
- **100% Client-Side Privacy**: Personal health and allergy profiles are stored locally in the browser and evaluated via a deterministic TypeScript engine.
- **Open Data Portability**: Users can export and import their complete household data as open JSON anytime.
- **Transparent Safety Taxonomy**: Safety evaluations are explainable, rule-based, and community-verified rather than black-box AI hallucinations.

---

## 🛠️ How You Can Contribute

### 1. Add New Recipes (`src/data/meals.ts`)
Help expand our recipe catalog! When adding a meal, ensure:
- Exact list of ingredients with categories.
- Accurate allergen tags (e.g. `dairy`, `gluten`, `peanuts`, `soy`, `sesame`).
- Accurate dietary flags (`Vegetarian`, `Vegan`, `Gluten-Free`, etc.).
- Clear, educational step-by-step cooking instructions.

### 2. Improve Allergen Detection Rules (`src/lib/rulesEngine.ts`)
Help refine ingredient parsing and substitution matching:
- Add common regional synonyms for ingredients.
- Suggest safer, high-protein plant-based alternatives for dairy, egg, and nut allergies.

### 3. UI/UX & Accessibility Enhancements
- Keyboard navigation & screen-reader accessibility.
- Mobile drawer and responsive polish.
- Offline PWA enhancements.

---

## 🚀 Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/omshree59/Hackto-ROMMIEMEAL-.git
   cd Hackto-ROMMIEMEAL-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the app in your browser.

4. **Verify production build:**
   ```bash
   npm run build
   ```

---

## 📜 Pull Request Guidelines

1. Fork the repo and create your branch from `main`:
   ```bash
   git checkout -b feature/amazing-open-innovation-idea
   ```
2. Make your changes and test thoroughly.
3. Ensure `npm run build` succeeds with zero errors.
4. Submit a clear, descriptive Pull Request!

Thank you for contributing to an open, safe, and inclusive shared kitchen! 🍽️
