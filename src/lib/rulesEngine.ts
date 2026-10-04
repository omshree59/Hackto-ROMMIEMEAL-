import { Roommate, Meal, CompatibilityReport, ConflictItem, SubstitutionOption, PantryItem, MealHistoryRecord } from "@/types";
import { ALLERGEN_DATABASE } from "@/data/allergens";
import { SUBSTITUTIONS_DATABASE } from "@/data/substitutions";

/**
 * Normalizes text for allergen and ingredient token matching.
 */
export function normalizeToken(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim();
}

/**
 * Checks if a specific allergen or its aliases match an ingredient name or string.
 */
export function matchAllergenInIngredient(allergenIdOrName: string, ingredientName: string): boolean {
  const normIngredient = normalizeToken(ingredientName);
  const normSearch = normalizeToken(allergenIdOrName);

  if (normIngredient.includes(normSearch) || normSearch.includes(normIngredient)) {
    return true;
  }

  const allergenDef = ALLERGEN_DATABASE.find(
    (a) =>
      a.id.toLowerCase() === normSearch ||
      a.name.toLowerCase().includes(normSearch) ||
      normSearch.includes(a.id.toLowerCase())
  );

  if (allergenDef) {
    for (const alias of allergenDef.aliases) {
      const normAlias = normalizeToken(alias);
      if (normIngredient.includes(normAlias) || normAlias.includes(normIngredient)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Finds substitution recommendation for an ingredient or allergen conflict.
 */
export function findSuggestedSubstitution(ingredientName: string, allergenTag?: string): SubstitutionOption | undefined {
  const match = SUBSTITUTIONS_DATABASE.find(
    (sub) =>
      matchAllergenInIngredient(sub.ingredient, ingredientName) ||
      (allergenTag && sub.targetCategory.toLowerCase() === allergenTag.toLowerCase())
  );

  if (match) {
    return {
      original: match.ingredient,
      substitute: match.substitute,
      note: `${match.ratio} ratio. ${match.notes} (Always verify product packaging for allergens).`,
      targetAllergen: match.targetCategory,
    };
  }

  return undefined;
}

/**
 * Computes a detailed safety & compatibility report for a given meal against all active roommates.
 */
export function evaluateMealCompatibility(
  meal: Meal,
  roommates: Roommate[] = [],
  pantryItems: PantryItem[] = [],
  mealHistory: MealHistoryRecord[] = []
): CompatibilityReport {
  if (!meal || !meal.id || !meal.ingredients) {
    return {
      mealId: meal?.id || "",
      status: "green",
      matchScore: 100,
      scoreBreakdown: { restrictions: 100, preferences: 100, pantryMatch: 0, recencyVariety: 100 },
      allergyConflicts: [],
      intoleranceConflicts: [],
      dislikeConflicts: [],
      dietaryConflicts: [],
      summaryMessage: "No listed conflicts detected",
      canBeModified: false,
      modifiedSafetyNote: "Always check physical labels before preparing.",
    };
  }

  const allergyConflicts: ConflictItem[] = [];
  const intoleranceConflicts: ConflictItem[] = [];
  const dislikeConflicts: ConflictItem[] = [];
  const dietaryConflicts: { roommate: Roommate; tag: string; reason: string }[] = [];

  for (const roommate of roommates) {
    // 1. Check Allergies (🚨 High Priority)
    for (const allergy of roommate.allergies) {
      let conflictFound = false;

      // Check meal allergen tags
      if (meal.allergenTags.some((tag) => matchAllergenInIngredient(allergy, tag))) {
        conflictFound = true;
      }

      // Check ingredient list
      for (const ing of meal.ingredients) {
        if (matchAllergenInIngredient(allergy, ing.name)) {
          conflictFound = true;
          const substitution = findSuggestedSubstitution(ing.name, allergy);
          allergyConflicts.push({
            roommate,
            type: "allergy",
            ingredient: ing.name,
            matchedRule: allergy,
            details: `Contains "${ing.name}" which conflicts with ${roommate.name}'s listed ${allergy} allergy.`,
            substitutionAvailable: !!substitution,
            suggestedSubstitution: substitution,
          });
        }
      }

      // If tagged in allergen tags but not matched in individual ingredient name
      if (conflictFound && !allergyConflicts.some((c) => c.roommate.id === roommate.id && c.matchedRule === allergy)) {
        const substitution = findSuggestedSubstitution(allergy, allergy);
        allergyConflicts.push({
          roommate,
          type: "allergy",
          ingredient: allergy,
          matchedRule: allergy,
          details: `Recipe is tagged as containing ${allergy}, potentially affecting ${roommate.name}.`,
          substitutionAvailable: !!substitution,
          suggestedSubstitution: substitution,
        });
      }
    }

    // 2. Check Intolerances (⚠️ Moderate Priority)
    for (const intolerance of roommate.intolerances) {
      for (const ing of meal.ingredients) {
        if (matchAllergenInIngredient(intolerance, ing.name)) {
          const substitution = findSuggestedSubstitution(ing.name, intolerance);
          intoleranceConflicts.push({
            roommate,
            type: "intolerance",
            ingredient: ing.name,
            matchedRule: intolerance,
            details: `"${ing.name}" is listed as an intolerance for ${roommate.name}.`,
            substitutionAvailable: !!substitution,
            suggestedSubstitution: substitution,
          });
        }
      }
    }

    // 3. Check Dislikes (🚫 Preference)
    for (const dislike of roommate.dislikes) {
      for (const ing of meal.ingredients) {
        if (normalizeToken(ing.name).includes(normalizeToken(dislike)) || normalizeToken(dislike).includes(normalizeToken(ing.name))) {
          dislikeConflicts.push({
            roommate,
            type: "dislike",
            ingredient: ing.name,
            matchedRule: dislike,
            details: `${roommate.name} dislikes ${dislike}.`,
          });
        }
      }
    }

    // 4. Check Dietary Preferences (e.g. Vegetarian, Vegan)
    for (const pref of roommate.preferences) {
      const normPref = normalizeToken(pref);
      if (normPref === "vegetarian" || normPref === "vegan") {
        const isMealVeg = meal.dietaryTags.some((t) => t.toLowerCase() === "vegetarian" || t.toLowerCase() === "vegan");
        if (!isMealVeg) {
          dietaryConflicts.push({
            roommate,
            tag: pref,
            reason: `${roommate.name} follows a ${pref} diet, but this recipe contains meat/poultry/fish.`,
          });
        }
      }
    }
  }

  // Calculate Pantry Match Percentage
  let matchedPantryCount = 0;
  if (pantryItems.length > 0 && meal.ingredients.length > 0) {
    for (const ing of meal.ingredients) {
      const found = pantryItems.some((p) =>
        normalizeToken(p.name).includes(normalizeToken(ing.name)) ||
        normalizeToken(ing.name).includes(normalizeToken(p.name))
      );
      if (found) matchedPantryCount++;
    }
  }
  const pantryMatchScore = meal.ingredients.length > 0
    ? Math.round((matchedPantryCount / meal.ingredients.length) * 100)
    : 0;

  // Calculate Recency Variety Penalty
  let recencyVarietyScore = 100;
  const recentCook = mealHistory
    .filter((h) => h.mealId === meal.id)
    .sort((a, b) => new Date(b.cookedAt).getTime() - new Date(a.cookedAt).getTime())[0];

  if (recentCook) {
    const daysSince = Math.floor(
      (new Date().getTime() - new Date(recentCook.cookedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSince <= 1) recencyVarietyScore = 20;
    else if (daysSince <= 3) recencyVarietyScore = 50;
    else if (daysSince <= 7) recencyVarietyScore = 80;
  }

  // Preference Score (Cuisine favorites & dislikes)
  let prefScore = 100;
  for (const roommate of roommates) {
    const likesCuisine = roommate.favoriteCuisines.some(
      (c) => c.toLowerCase() === meal.cuisine.toLowerCase() || c.toLowerCase() === meal.category.toLowerCase()
    );
    if (likesCuisine) prefScore += 10;
  }
  prefScore = Math.min(100, prefScore - dislikeConflicts.length * 15);
  prefScore = Math.max(0, prefScore);

  // Status & Match Score Calculation
  let status: 'safe' | 'modification' | 'conflict' = 'safe';
  let restrictionsScore = 100;

  if (allergyConflicts.length > 0 || dietaryConflicts.length > 0) {
    status = 'conflict';
    restrictionsScore = 0;
  } else if (intoleranceConflicts.length > 0) {
    const allHaveSubstitutes = intoleranceConflicts.every((c) => c.substitutionAvailable);
    status = allHaveSubstitutes ? 'modification' : 'conflict';
    restrictionsScore = allHaveSubstitutes ? 65 : 30;
  }

  // Composite Match Score (UX only, not medical)
  let matchScore = 0;
  if (status === 'safe') {
    matchScore = Math.round(
      restrictionsScore * 0.5 + prefScore * 0.25 + (pantryMatchScore || 70) * 0.15 + recencyVarietyScore * 0.1
    );
  } else if (status === 'modification') {
    matchScore = Math.round(
      restrictionsScore * 0.5 + prefScore * 0.25 + (pantryMatchScore || 50) * 0.15 + recencyVarietyScore * 0.1
    );
  } else {
    matchScore = Math.min(25, Math.round(prefScore * 0.2 + (pantryMatchScore || 0) * 0.1));
  }

  // Summary message with mandatory educational disclaimer
  let summaryMessage = "No listed conflicts detected";
  if (allergyConflicts.length > 0) {
    const affectedNames = Array.from(new Set(allergyConflicts.map((c) => c.roommate.name))).join(", ");
    summaryMessage = `Allergy conflict: Affects ${affectedNames}`;
  } else if (dietaryConflicts.length > 0) {
    summaryMessage = `Dietary conflict: Does not match household choices`;
  } else if (intoleranceConflicts.length > 0) {
    summaryMessage = `Modification suggested: Intolerance match`;
  } else if (dislikeConflicts.length > 0) {
    summaryMessage = `Preference notice: Disliked by some`;
  }

  return {
    mealId: meal.id,
    status: status === 'safe' ? 'green' : status === 'modification' ? 'yellow' : 'red',
    matchScore: Math.min(100, Math.max(0, matchScore)),
    scoreBreakdown: {
      restrictions: restrictionsScore,
      preferences: prefScore,
      pantryMatch: pantryMatchScore,
      recencyVariety: recencyVarietyScore,
    },
    allergyConflicts,
    intoleranceConflicts,
    dislikeConflicts,
    dietaryConflicts,
    summaryMessage,
    canBeModified: intoleranceConflicts.length > 0 && intoleranceConflicts.every((c) => c.substitutionAvailable),
    modifiedSafetyNote: "Always check manufacturer ingredient labels and verify cross-contamination risks for your household.",
  };
}

/**
 * "What Can We Eat?" Engine:
 * Ranks all meals from best match to worst for tonight's household dinner.
 */
export function rankMealsForHousehold(
  meals: Meal[],
  roommates: Roommate[],
  pantryItems: PantryItem[] = [],
  mealHistory: MealHistoryRecord[] = []
): { meal: Meal; report: CompatibilityReport }[] {
  const evaluated = meals.map((meal) => ({
    meal,
    report: evaluateMealCompatibility(meal, roommates, pantryItems, mealHistory),
  }));

  return evaluated.sort((a, b) => {
    // 1. Safe > Modification > Conflict
    const rankOrder = { green: 3, yellow: 2, red: 1 };
    if (rankOrder[a.report.status] !== rankOrder[b.report.status]) {
      return rankOrder[b.report.status] - rankOrder[a.report.status];
    }
    // 2. Higher match score
    if (b.report.matchScore !== a.report.matchScore) {
      return b.report.matchScore - a.report.matchScore;
    }
    // 3. Pantry match
    return b.report.scoreBreakdown.pantryMatch - a.report.scoreBreakdown.pantryMatch;
  });
}

/**
 * "What's in the Fridge?" / Leftover Finder:
 * Given a list of ingredient strings in the fridge, finds matching meals sorted by ingredient coverage.
 */
export function findMealsByPantryIngredients(
  meals: Meal[],
  selectedIngredients: string[],
  roommates: Roommate[]
): { meal: Meal; matchCount: number; matchedIngredients: string[]; missingIngredients: string[]; report: CompatibilityReport }[] {
  if (selectedIngredients.length === 0) return [];

  const results = meals.map((meal) => {
    const report = evaluateMealCompatibility(meal, roommates);
    const matched: string[] = [];
    const missing: string[] = [];

    for (const ing of meal.ingredients) {
      const isMatched = selectedIngredients.some((sel) =>
        normalizeToken(ing.name).includes(normalizeToken(sel)) ||
        normalizeToken(sel).includes(normalizeToken(ing.name))
      );
      if (isMatched) {
        matched.push(ing.name);
      } else {
        missing.push(ing.name);
      }
    }

    return {
      meal,
      matchCount: matched.length,
      matchedIngredients: matched,
      missingIngredients: missing,
      report,
    };
  });

  return results
    .filter((r) => r.matchCount > 0)
    .sort((a, b) => {
      // Prioritize no allergy conflicts first
      const statusWeight = { green: 2, yellow: 1, red: 0 };
      if (statusWeight[a.report.status] !== statusWeight[b.report.status]) {
        return statusWeight[b.report.status] - statusWeight[a.report.status];
      }
      return b.matchCount - a.matchCount;
    });
}
