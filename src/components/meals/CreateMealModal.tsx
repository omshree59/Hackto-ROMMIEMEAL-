"use client";

import React, { useState } from "react";
import { Meal, IngredientItem } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { ALLERGEN_DATABASE, CUISINES_LIST } from "@/data/allergens";
import {
  X,
  Plus,
  Trash2,
  Sparkles,
  ChefHat,
  Clock,
  Users,
  AlertCircle,
  Check,
  UtensilsCrossed,
} from "lucide-react";

interface CreateMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMealCreated?: (meal: Meal) => void;
}

const COMMON_ALLERGENS = [
  "peanuts",
  "tree_nuts",
  "dairy",
  "gluten",
  "shellfish",
  "eggs",
  "soy",
  "fish",
  "sesame",
];

const COMMON_DIETARY = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "High-Protein",
  "Low-Carb",
  "Nut-Free",
];

export function CreateMealModal({ isOpen, onClose, onMealCreated }: CreateMealModalProps) {
  const { addCustomMeal } = useHousehold();

  // Tab: manual form vs smart paste
  const [activeTab, setActiveTab] = useState<"form" | "smart">("form");
  const [smartText, setSmartText] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("American");
  const [category, setCategory] = useState<Meal["category"]>("Comfort Food");
  const [prepTime, setPrepTime] = useState<number>(15);
  const [cookTime, setCookTime] = useState<number>(25);
  const [servings, setServings] = useState<number>(4);
  const [difficulty, setDifficulty] = useState<Meal["difficulty"]>("Easy");

  // Ingredients State
  const [ingredients, setIngredients] = useState<IngredientItem[]>([
    { name: "", amount: "", category: "produce" },
  ]);

  // Instructions State
  const [instructions, setInstructions] = useState<string[]>([""]);

  // Tags
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  // Error validation
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { name: "", amount: "", category: "produce" }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: keyof IngredientItem, value: string) => {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing))
    );
  };

  const handleAddInstruction = () => {
    setInstructions((prev) => [...prev, ""]);
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index: number, value: string) => {
    setInstructions((prev) => prev.map((inst, i) => (i === index ? value : inst)));
  };

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
    );
  };

  const toggleDietary = (tag: string) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Offline Smart Parser: Extracts recipe details from raw pasted text
  const handleSmartParse = () => {
    if (!smartText.trim()) return;

    const lines = smartText.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    // 1. Guess recipe title from first non-empty line
    const titleCandidate = lines[0].replace(/^#+\s*/, "").replace(/^title:\s*/i, "");
    setName(titleCandidate);

    // 2. Scan for prep/cook times
    const timeMatch = smartText.match(/(\d+)\s*(?:min|mins|minute|minutes)/i);
    if (timeMatch) {
      setCookTime(parseInt(timeMatch[1], 10) || 25);
    }

    // 3. Scan for servings
    const servMatch = smartText.match(/(?:serves|servings|yield):\s*(\d+)/i);
    if (servMatch) {
      setServings(parseInt(servMatch[1], 10) || 4);
    }

    // 4. Extract ingredients
    const extractedIngredients: IngredientItem[] = [];
    const extractedInstructions: string[] = [];
    let isParsingInstructions = false;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (/^(directions|instructions|steps|method|how to make)/i.test(line)) {
        isParsingInstructions = true;
        continue;
      }
      if (/^(ingredients|what you need)/i.test(line)) {
        isParsingInstructions = false;
        continue;
      }

      if (isParsingInstructions) {
        const cleanInst = line.replace(/^\d+[\.\)]\s*/, "").replace(/^[-*•]\s*/, "");
        if (cleanInst.length > 5) {
          extractedInstructions.push(cleanInst);
        }
      } else {
        const cleanIng = line.replace(/^[-*•]\s*/, "");
        if (cleanIng.length > 2 && !/^(prep|cook|servings|time)/i.test(cleanIng)) {
          // Detect amount vs name
          const amountMatch = cleanIng.match(/^([\d\/\.\s]+(?:cups?|tbsp|tsp|oz|lbs?|cans?|cloves?|grams?|g|ml|pinch|dash)?)\s+(.*)/i);
          if (amountMatch) {
            extractedIngredients.push({
              amount: amountMatch[1].trim(),
              name: amountMatch[2].trim(),
              category: "produce",
            });
          } else {
            extractedIngredients.push({
              amount: "1 unit",
              name: cleanIng,
              category: "produce",
            });
          }
        }
      }
    }

    if (extractedIngredients.length > 0) {
      setIngredients(extractedIngredients);
    }
    if (extractedInstructions.length > 0) {
      setInstructions(extractedInstructions);
    }

    // Auto-detect common allergen tags based on ingredient names
    const detectedAllergens: string[] = [];
    const textLower = smartText.toLowerCase();
    if (textLower.includes("peanut") || textLower.includes("peanut butter")) detectedAllergens.push("peanuts");
    if (textLower.includes("milk") || textLower.includes("cheese") || textLower.includes("butter") || textLower.includes("cream")) detectedAllergens.push("dairy");
    if (textLower.includes("flour") || textLower.includes("pasta") || textLower.includes("bread") || textLower.includes("wheat")) detectedAllergens.push("gluten");
    if (textLower.includes("egg")) detectedAllergens.push("eggs");
    if (textLower.includes("shrimp") || textLower.includes("crab") || textLower.includes("lobster")) detectedAllergens.push("shellfish");
    if (textLower.includes("soy") || textLower.includes("tofu") || textLower.includes("edamame")) detectedAllergens.push("soy");
    if (textLower.includes("walnut") || textLower.includes("almond") || textLower.includes("cashew")) detectedAllergens.push("tree_nuts");

    setSelectedAllergens(Array.from(new Set([...selectedAllergens, ...detectedAllergens])));

    setActiveTab("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter a recipe name.");
      return;
    }

    const validIngredients = ingredients.filter((ing) => ing.name.trim().length > 0);
    if (validIngredients.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }

    const validInstructions = instructions.filter((inst) => inst.trim().length > 0);

    const newMealData: Omit<Meal, "id"> = {
      name: name.trim(),
      description: description.trim() || `Delicious homemade ${name.trim()} prepared for the household.`,
      cuisine,
      category,
      prepTime: Number(prepTime) || 10,
      cookTime: Number(cookTime) || 20,
      servings: Number(servings) || 4,
      difficulty,
      ingredients: validIngredients,
      instructions: validInstructions.length > 0 ? validInstructions : ["Prepare ingredients and cook according to household taste."],
      allergenTags: selectedAllergens,
      dietaryTags: selectedDietary,
      caloriesApprox: 450,
      proteinApprox: 25,
      carbsApprox: 40,
      fatApprox: 15,
      imageUrl: imageUrl.trim() || "/meals/creamy-pasta.jpg",
      isPopular: false,
    };

    addCustomMeal(newMealData);

    if (onMealCreated) {
      onMealCreated({ ...newMealData, id: `custom-${Date.now()}` });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div
        className="w-full max-w-3xl my-8 bg-app-surface rounded-3xl p-6 sm:p-8 shadow-2xl border border-app-border max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-app-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-app-orange/10 border border-app-orange/20 flex items-center justify-center text-app-orange">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-100">Add New Recipe</h2>
              <p className="text-xs text-stone-400">Save custom meals to your household library</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-app-elevated transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-app-border/40 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === "form"
                ? "bg-app-elevated text-app-orange border border-app-border"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            Recipe Form
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("smart")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === "smart"
                ? "bg-app-elevated text-app-orange border border-app-border"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-app-yellow" />
            <span>Smart Text Importer</span>
          </button>
        </div>

        {error && (
          <div className="my-3 p-3 rounded-2xl bg-app-red/10 border border-app-red/20 text-xs text-app-red flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="overflow-y-auto flex-1 py-4 space-y-6 pr-1">
          {activeTab === "smart" ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-app-bg border border-app-border space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-200">
                  <Sparkles className="w-4 h-4 text-app-yellow" />
                  <span>Paste Recipe from Anywhere</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Copy and paste a recipe from a website, notes, or chat. RoomieMeal's offline rule engine will automatically extract the recipe name, cook time, ingredients, and allergen tags.
                </p>
              </div>

              <textarea
                value={smartText}
                onChange={(e) => setSmartText(e.target.value)}
                placeholder="Example:
Creamy Tuscan Garlic Chicken
Prep: 10 mins, Cook: 25 mins, Serves 4

Ingredients:
- 2 chicken breasts
- 1 cup heavy cream
- 2 cups baby spinach
- 1 cup cherry tomatoes
- 3 cloves garlic

Instructions:
1. Sear chicken in olive oil.
2. Add garlic, cream, and spinach."
                rows={12}
                className="w-full p-4 rounded-2xl bg-app-bg border border-app-border text-xs sm:text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-app-orange font-mono"
              />

              <button
                type="button"
                onClick={handleSmartParse}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-app-orange to-app-yellow text-app-bg font-bold text-xs shadow-md shadow-app-orange/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-app-bg" />
                <span>Extract into Form</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-300">Recipe Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(null);
                    }}
                    placeholder="e.g. Grandma's Mushroom Pasta"
                    className="w-full px-4 py-2.5 rounded-xl bg-app-bg border border-app-border text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-2 focus:ring-app-orange"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-300">Short Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A brief sentence describing this meal"
                    className="w-full px-4 py-2.5 rounded-xl bg-app-bg border border-app-border text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-2 focus:ring-app-orange"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300">Cuisine</label>
                  <select
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-app-bg border border-app-border text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-2 focus:ring-app-orange"
                  >
                    {CUISINES_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Meal["category"])}
                    className="w-full px-4 py-2.5 rounded-xl bg-app-bg border border-app-border text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-2 focus:ring-app-orange"
                  >
                    <option value="Italian">Italian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                    <option value="Asian">Asian</option>
                    <option value="Healthy">Healthy</option>
                    <option value="Comfort Food">Comfort Food</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="One-Pot">One-Pot</option>
                    <option value="Quick Meals">Quick Meals</option>
                    <option value="Rice Bowls">Rice Bowls</option>
                    <option value="Soups">Soups</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="American">American</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300">Prep Time (mins)</label>
                  <input
                    type="number"
                    min={0}
                    value={prepTime}
                    onChange={(e) => setPrepTime(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-app-bg border border-app-border text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-2 focus:ring-app-orange"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300">Cook Time (mins)</label>
                  <input
                    type="number"
                    min={0}
                    value={cookTime}
                    onChange={(e) => setCookTime(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-app-bg border border-app-border text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-2 focus:ring-app-orange"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300">Servings</label>
                  <input
                    type="number"
                    min={1}
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-app-bg border border-app-border text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-2 focus:ring-app-orange"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Meal["difficulty"])}
                    className="w-full px-4 py-2.5 rounded-xl bg-app-bg border border-app-border text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-2 focus:ring-app-orange"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Ingredients */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Ingredients ({ingredients.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-app-elevated border border-app-border text-xs font-semibold text-app-orange hover:bg-app-surface transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {ingredients.map((ing, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Amount (e.g. 2 cups, 1 lb)"
                        value={ing.amount}
                        onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
                        className="w-1/3 px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs text-stone-200 focus:outline-none focus:ring-1 focus:ring-app-orange"
                      />
                      <input
                        type="text"
                        placeholder="Ingredient name (e.g. Chickpeas)"
                        value={ing.name}
                        onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs text-stone-200 focus:outline-none focus:ring-1 focus:ring-app-orange"
                      />
                      {ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(index)}
                          className="p-2 text-stone-500 hover:text-app-red transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3: Instructions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Cooking Steps ({instructions.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddInstruction}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-app-elevated border border-app-border text-xs font-semibold text-app-orange hover:bg-app-surface transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Step</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {instructions.map((inst, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="w-6 text-center text-xs font-bold text-stone-500 pt-2 shrink-0">
                        {index + 1}.
                      </span>
                      <textarea
                        rows={2}
                        placeholder={`Describe step ${index + 1}...`}
                        value={inst}
                        onChange={(e) => handleInstructionChange(index, e.target.value)}
                        className="flex-1 p-2.5 rounded-xl bg-app-bg border border-app-border text-xs text-stone-200 focus:outline-none focus:ring-1 focus:ring-app-orange"
                      />
                      {instructions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveInstruction(index)}
                          className="p-2 text-stone-500 hover:text-app-red transition-colors pt-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 4: Allergen Tags */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-app-red">
                  Contains Known Allergens
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_ALLERGENS.map((allergen) => {
                    const isSelected = selectedAllergens.includes(allergen);
                    return (
                      <button
                        key={allergen}
                        type="button"
                        onClick={() => toggleAllergen(allergen)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                          isSelected
                            ? "bg-app-red text-white shadow-sm"
                            : "bg-app-bg text-stone-400 hover:text-stone-200 border border-app-border"
                        }`}
                      >
                        {isSelected ? "🚨 " : ""}{allergen.replace("_", " ")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Dietary Tags */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-app-green">
                  Dietary Qualities
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_DIETARY.map((tag) => {
                    const isSelected = selectedDietary.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleDietary(tag)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-app-green text-app-bg shadow-sm font-bold"
                            : "bg-app-bg text-stone-400 hover:text-stone-200 border border-app-border"
                        }`}
                      >
                        {isSelected ? "🌱 " : ""}{tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-app-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-stone-400 hover:text-stone-200 hover:bg-app-elevated transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-app-orange text-app-bg font-bold text-xs shadow-md shadow-app-orange/20 hover:bg-[#ff991f] transition-all cursor-pointer"
                >
                  Save Recipe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
