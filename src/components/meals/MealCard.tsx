"use client";

import React from "react";
import { Meal } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { evaluateMealCompatibility } from "@/lib/rulesEngine";
import { CompatibilityBadge } from "@/components/common/Badges";
import { Clock, Users, Heart, ChefHat, Sparkles } from "lucide-react";

interface MealCardProps {
  meal: Meal;
  onOpenDetail: (meal: Meal) => void;
  onQuickPlan?: (meal: Meal) => void;
}

export function MealCard({ meal, onOpenDetail, onQuickPlan }: MealCardProps) {
  const { roommates, pantryItems, mealHistory, favorites, toggleFavorite, setTonightMealId } = useHousehold();

  const report = evaluateMealCompatibility(meal, roommates, pantryItems, mealHistory);
  const isFav = favorites.includes(meal.id);

  return (
    <div className="group relative rounded-3xl bg-app-surface border border-app-border shadow-sm hover:shadow-xl hover:border-app-orange/40 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div
        className="relative h-48 w-full overflow-hidden cursor-pointer bg-stone-100 dark:bg-dark-800"
        onClick={() => onOpenDetail(meal)}
      >
        <img
          src={meal.imageUrl}
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <CompatibilityBadge report={report} size="sm" />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(meal.id);
            }}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
              isFav
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                : "bg-black/30 text-white/90 hover:bg-black/50"
            }`}
            title={isFav ? "Remove from favorites" : "Add to household favorites"}
          >
            <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Bottom image stats */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[10px] font-medium">
          <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md">
            {meal.cuisine}
          </span>
          <div className="flex items-center gap-3 drop-shadow">
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg">
              <Clock className="w-3 h-3 text-app-orange" />
              {meal.cookTime + meal.prepTime}m
            </span>
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg">
              <Users className="w-3 h-3 text-app-green" />
              {meal.servings}
            </span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-app-surface border-t border-app-border">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onOpenDetail(meal)}
              className="font-bold text-base text-stone-200 group-hover:text-app-orange cursor-pointer transition-colors line-clamp-1"
            >
              {meal.name}
            </h3>
          </div>

          <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
            {meal.description}
          </p>

          <div className="mt-3 p-2.5 rounded-xl bg-app-bg border border-app-border text-[11px] font-medium flex items-center justify-between shadow-inner">
            <span className="text-stone-400">Household Match</span>
            <span className={`font-bold ${report.status === 'green' ? 'text-app-green' : report.status === 'yellow' ? 'text-app-yellow' : 'text-app-red'}`}>
              {report.matchScore}%
            </span>
          </div>

          {/* Quick Conflict Warning snippet if any */}
          {report.status !== "green" && (
            <div className="mt-2 p-2 rounded-xl bg-app-elevated border border-app-border text-[11px] text-stone-400 line-clamp-1">
              {report.allergyConflicts.length > 0 ? (
                <span className="text-app-red font-semibold">
                  Allergy: {report.allergyConflicts[0].details}
                </span>
              ) : report.intoleranceConflicts.length > 0 ? (
                <span className="text-app-yellow font-semibold">
                  Intolerance: {report.intoleranceConflicts[0].details}
                </span>
              ) : (
                <span className="text-stone-400">Preference/Diet mismatch</span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-3 border-t border-app-border flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenDetail(meal)}
            className="flex-1 py-2 px-3 rounded-xl bg-app-elevated hover:bg-stone-800 border border-app-border text-stone-300 text-xs font-semibold transition-colors shadow-sm"
          >
            View Recipe
          </button>

          <button
            type="button"
            onClick={() => {
              setTonightMealId(meal.id);
            }}
            className="p-2 rounded-xl bg-app-orange/10 hover:bg-app-orange/20 border border-app-orange/20 text-app-orange text-xs font-semibold transition-colors"
            title="Choose for tonight's dinner"
          >
            <ChefHat className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
