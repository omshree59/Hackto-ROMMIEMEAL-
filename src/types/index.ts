export type RestrictionSeverity = 'allergy' | 'intolerance' | 'dislike' | 'preference';

export type CookingSkill = 'beginner' | 'intermediate' | 'enthusiast' | 'chef';

export interface Roommate {
  id: string;
  name: string;
  avatar: string;
  color: string;
  role?: string;
  allergies: string[];       // 🚨 Critical danger
  intolerances: string[];    // ⚠️ Choose to avoid / uncomfortable
  dislikes: string[];        // 🚫 Simply dislikes
  preferences: string[];     // 🌱 E.g. "Vegetarian", "High Protein", "Keto"
  favoriteCuisines: string[];// ❤️ Loved cuisines
  cookingSkill?: CookingSkill;
  notes?: string;
}

export interface IngredientItem {
  name: string;
  amount: string;
  category?: 'produce' | 'protein' | 'dairy' | 'grains' | 'spices' | 'pantry' | 'frozen' | 'other';
  notes?: string;
}

export interface SubstitutionOption {
  original: string;
  substitute: string;
  note: string;
  targetAllergen?: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  category: 'Italian' | 'Mexican' | 'Indian' | 'Asian' | 'Healthy' | 'Comfort Food' | 'Breakfast' | 'One-Pot' | 'Quick Meals' | 'Rice Bowls' | 'Soups' | 'Mediterranean' | 'American';
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: IngredientItem[];
  instructions: string[];
  allergenTags: string[]; // ['peanuts', 'dairy', 'gluten', etc.]
  dietaryTags: string[];  // ['Vegetarian', 'Vegan', 'High-Protein', 'Gluten-Free', 'Dairy-Free', etc.]
  caloriesApprox: number;
  proteinApprox: number;
  carbsApprox: number;
  fatApprox: number;
  imageUrl: string;
  substitutions?: SubstitutionOption[];
  crossContactTips?: string[];
  isPopular?: boolean;
}

export interface ConflictItem {
  roommate: Roommate;
  type: RestrictionSeverity;
  ingredient: string;
  matchedRule: string;
  details: string;
  substitutionAvailable?: boolean;
  suggestedSubstitution?: SubstitutionOption;
}

export interface CompatibilityReport {
  mealId: string;
  status: 'green' | 'yellow' | 'red';
  matchScore: number; // 0 - 100 UX score
  scoreBreakdown: {
    restrictions: number;
    preferences: number;
    pantryMatch: number;
    recencyVariety: number;
  };
  allergyConflicts: ConflictItem[];
  intoleranceConflicts: ConflictItem[];
  dislikeConflicts: ConflictItem[];
  dietaryConflicts: { roommate: Roommate; tag: string; reason: string }[];
  summaryMessage: string;
  canBeModified: boolean;
  modifiedSafetyNote?: string;
}

export interface DayPlan {
  breakfast?: string; // mealId
  lunch?: string;
  dinner?: string;
}

export interface MealPlanWeek {
  [dateIsoString: string]: DayPlan; // e.g. "2026-10-05": { breakfast: "...", dinner: "..." }
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: 'Produce' | 'Protein' | 'Dairy & Alt' | 'Grains & Pasta' | 'Pantry & Oils' | 'Spices & Sauces' | 'Frozen' | 'Bakery' | 'Other';
  amount: string;
  checked: boolean;
  assignedRoommateId?: string;
  mealOriginName?: string;
  isCustom?: boolean;
  createdAt: string;
}

export interface PantryItem {
  id: string;
  name: string;
  category: 'Produce' | 'Protein' | 'Dairy' | 'Grains' | 'Spices' | 'Pantry' | 'Frozen' | 'Other';
  quantity: string;
  unit: string;
  expiryDays?: number;
  addedAt: string;
}

export interface MealVotePoll {
  id: string;
  createdAt: string;
  active: boolean;
  candidateMealIds: string[];
  votes: {
    [roommateId: string]: string; // roommateId -> mealId voted for
  };
}

export interface MealHistoryRecord {
  id: string;
  mealId: string;
  mealName: string;
  cookedAt: string; // ISO date
  servingsCooked: number;
  rating?: number; // 1-5
  notes?: string;
}

export interface CookingTimer {
  id: string;
  label: string;
  durationSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  isFinished: boolean;
}
