"use client";

import React, { useState, useMemo } from "react";
import { Meal } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { evaluateMealCompatibility } from "@/lib/rulesEngine";
import { MealCard } from "@/components/meals/MealCard";
import { CUISINES_LIST, DIETARY_PREFERENCES_LIST } from "@/data/allergens";
import {
  Search,
  Filter,
  Clock,
  Sparkles,
  RotateCcw,
  ChefHat,
  ShieldCheck,
  Flame,
  Check,
} from "lucide-react";

interface MealDiscoveryViewProps {
  onSelectMeal: (meal: Meal) => void;
}

export function MealDiscoveryView({ onSelectMeal }: MealDiscoveryViewProps) {
  const { meals, roommates, pantryItems, mealHistory, favorites } = useHousehold();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("All");
  const [selectedDietary, setSelectedDietary] = useState<string>("All");
  const [selectedSafetyFilter, setSelectedSafetyFilter] = useState<"all" | "green" | "yellow">("all");
  const [maxTime, setMaxTime] = useState<number>(60);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [pantryReadyOnly, setPantryReadyOnly] = useState(false);

  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const report = evaluateMealCompatibility(meal, roommates, pantryItems, mealHistory);

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = meal.name.toLowerCase().includes(q);
        const matchesCuisine = meal.cuisine.toLowerCase().includes(q);
        const matchesIngredient = meal.ingredients.some((i) => i.name.toLowerCase().includes(q));
        if (!matchesName && !matchesCuisine && !matchesIngredient) return false;
      }

      // Cuisine filter
      if (selectedCuisine !== "All" && meal.cuisine.toLowerCase() !== selectedCuisine.toLowerCase()) {
        return false;
      }

      // Dietary filter
      if (selectedDietary !== "All") {
        const hasTag = meal.dietaryTags.some((t) => t.toLowerCase() === selectedDietary.toLowerCase());
        if (!hasTag) return false;
      }

      // Safety filter
      if (selectedSafetyFilter === "green" && report.status !== "green") return false;
      if (selectedSafetyFilter === "yellow" && report.status === "red") return false;

      // Time filter
      if (meal.prepTime + meal.cookTime > maxTime) return false;

      // Favorites only
      if (onlyFavorites && !favorites.includes(meal.id)) return false;

      // Pantry ready (>50% ingredients available)
      if (pantryReadyOnly && report.scoreBreakdown.pantryMatch < 40) return false;

      return true;
    });
  }, [
    meals,
    roommates,
    pantryItems,
    mealHistory,
    searchQuery,
    selectedCuisine,
    selectedDietary,
    selectedSafetyFilter,
    maxTime,
    onlyFavorites,
    pantryReadyOnly,
    favorites,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCuisine("All");
    setSelectedDietary("All");
    setSelectedSafetyFilter("all");
    setMaxTime(60);
    setOnlyFavorites(false);
    setPantryReadyOnly(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-200 tracking-tight">
            Discover Household Meals
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Filter through {meals.length} recipes tested against your roommate food boundaries
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-stone-600">
            Showing {filteredMeals.length} of {meals.length} meals
          </span>
          {(searchQuery || selectedCuisine !== "All" || selectedDietary !== "All" || selectedSafetyFilter !== "all" || onlyFavorites || pantryReadyOnly) && (
            <button
              onClick={handleResetFilters}
              className="px-2.5 py-1 rounded-lg text-app-orange hover:bg-app-elevated font-semibold transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar & Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-app-surface border border-app-border shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by recipe name, ingredient (e.g. 'chickpeas', 'spinach', 'fettuccine')..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-app-bg border border-app-border text-xs sm:text-sm text-stone-200 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-app-orange"
          />
        </div>

        {/* Safety Filter Segment */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1">
            Safety:
          </span>

          <button
            onClick={() => setSelectedSafetyFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedSafetyFilter === "all"
                ? "bg-stone-700 text-stone-200"
                : "bg-app-bg text-stone-300 hover:bg-app-elevated"
            }`}
          >
            All Dishes ({meals.length})
          </button>

          <button
            onClick={() => setSelectedSafetyFilter("green")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedSafetyFilter === "green"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-app-bg text-emerald-300 hover:bg-app-elevated"
            }`}
          >
            <span>🟢 No Listed Conflicts</span>
          </button>

          <button
            onClick={() => setSelectedSafetyFilter("yellow")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedSafetyFilter === "yellow"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-app-bg text-amber-300 hover:bg-app-elevated"
            }`}
          >
            <span>🟡 Modifiable Only</span>
          </button>

          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              onlyFavorites
                ? "bg-rose-500 text-white"
                : "bg-app-bg text-stone-300 hover:bg-app-elevated"
            }`}
          >
            ❤️ Favorites Only
          </button>

          <button
            onClick={() => setPantryReadyOnly(!pantryReadyOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pantryReadyOnly
                ? "bg-app-orange text-white"
                : "bg-app-bg text-stone-300 hover:bg-app-elevated"
            }`}
          >
            🥕 Pantry Ready
          </button>
        </div>

        {/* Cuisine Filter Chips */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Cuisine:
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", ...CUISINES_LIST].map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCuisine === cuisine
                    ? "bg-app-orange text-white font-semibold shadow-sm"
                    : "bg-app-bg text-stone-400 hover:bg-app-elevated"
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Tags Chips */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Dietary:
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", ...DIETARY_PREFERENCES_LIST.slice(0, 6)].map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDietary(diet)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedDietary === diet
                    ? "bg-emerald-600 text-white font-semibold shadow-sm"
                    : "bg-app-bg text-stone-400 hover:bg-app-elevated"
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      {filteredMeals.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-app-surface border border-app-border space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="font-bold text-base text-stone-200">
            No matching meals found
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search terms, cuisine filters, or reset the filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-app-bg text-app-orange text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onOpenDetail={onSelectMeal}
            />
          ))}
        </div>
      )}
    </div>
  );
}
