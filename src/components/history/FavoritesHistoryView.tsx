"use client";

import React, { useState } from "react";
import { Meal } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { MealCard } from "@/components/meals/MealCard";
import {
  BookmarkCheck,
  Heart,
  Clock,
  Calendar,
  ChefHat,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface FavoritesHistoryViewProps {
  onSelectMeal: (meal: Meal) => void;
}

export function FavoritesHistoryView({ onSelectMeal }: FavoritesHistoryViewProps) {
  const { meals, favorites, mealHistory } = useHousehold();
  const [tab, setTab] = useState<"favorites" | "history">("favorites");

  const favoriteMeals = meals.filter((m) => favorites.includes(m.id));

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-200 tracking-tight">
            Favorites &amp; History
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Track household culinary favorites and recent meals to avoid kitchen fatigue
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-app-bg p-1 rounded-2xl">
          <button
            onClick={() => setTab("favorites")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              tab === "favorites"
                ? "bg-app-surface text-stone-200 shadow-sm"
                : "text-stone-500 hover:text-stone-200"
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Favorites ({favoriteMeals.length})</span>
          </button>

          <button
            onClick={() => setTab("history")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              tab === "history"
                ? "bg-app-surface text-stone-200 shadow-sm"
                : "text-stone-500 hover:text-stone-200"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-app-orange" />
            <span>Cooked History ({mealHistory.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: FAVORITES */}
      {tab === "favorites" && (
        <div>
          {favoriteMeals.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-app-surface border border-app-border space-y-3">
              <div className="text-4xl">❤️</div>
              <h3 className="font-bold text-base text-stone-200">
                No favorites saved yet
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Tap the heart icon on any recipe to save it to your household&apos;s staple meals.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onOpenDetail={onSelectMeal}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HISTORY */}
      {tab === "history" && (
        <div className="space-y-4">
          {mealHistory.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-app-surface border border-app-border space-y-3">
              <div className="text-4xl">🍳</div>
              <h3 className="font-bold text-base text-stone-200">
                No cooked meal records yet
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Finish a recipe in Cooking Mode to automatically record when you cooked it.
              </p>
            </div>
          ) : (
            <div className="rounded-3xl p-5 bg-app-surface border border-app-border shadow-sm divide-y divide-app-border">
              {mealHistory.map((rec) => {
                const meal = meals.find((m) => m.id === rec.mealId);
                const dateFormatted = new Date(rec.cookedAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <div
                    key={rec.id}
                    className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      {meal?.imageUrl ? (
                        <img
                          src={meal.imageUrl}
                          alt={rec.mealName}
                          className="w-14 h-14 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-app-orange flex items-center justify-center text-xl">
                          🍛
                        </div>
                      )}

                      <div>
                        <h4 className="font-bold text-sm text-stone-200">
                          {rec.mealName}
                        </h4>
                        <p className="text-xs text-stone-400">
                          Cooked on {dateFormatted} · {rec.servingsCooked} servings
                        </p>
                        {rec.notes && (
                          <p className="text-xs text-app-orange mt-0.5">
                            &quot;{rec.notes}&quot;
                          </p>
                        )}
                      </div>
                    </div>

                    {meal && (
                      <button
                        onClick={() => onSelectMeal(meal)}
                        className="px-4 py-2 rounded-xl bg-app-bg hover:bg-app-elevated text-xs font-semibold text-stone-300 transition-colors"
                      >
                        Cook Again
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
