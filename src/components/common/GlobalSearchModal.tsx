"use client";

import React, { useState, useEffect } from "react";
import { Meal, Roommate } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { evaluateMealCompatibility } from "@/lib/rulesEngine";
import { CompatibilityBadge } from "@/components/common/Badges";
import {
  Search,
  X,
  Clock,
  ArrowRight,
  UtensilsCrossed,
  Users,
} from "lucide-react";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMeal: (meal: Meal) => void;
  onSelectRoommateView: () => void;
}

export function GlobalSearchModal({
  isOpen,
  onClose,
  onSelectMeal,
  onSelectRoommateView,
}: GlobalSearchModalProps) {
  const { meals, roommates, pantryItems, mealHistory } = useHousehold();
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredMeals = query.trim()
    ? meals.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.cuisine.toLowerCase().includes(query.toLowerCase()) ||
          m.ingredients.some((i) => i.name.toLowerCase().includes(query.toLowerCase()))
      )
    : meals.slice(0, 6);

  const filteredRoommates = query.trim()
    ? roommates.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.allergies.some((a) => a.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-app-surface rounded-3xl shadow-2xl border border-app-border overflow-hidden flex flex-col text-stone-200 max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="p-4 border-b border-app-border flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes, ingredients, allergies, roommates..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium placeholder:text-stone-400 focus:outline-none text-stone-200"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-app-elevated text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Roommates result if matched */}
          {filteredRoommates.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Roommates
              </p>
              {filteredRoommates.map((rm) => (
                <div
                  key={rm.id}
                  onClick={() => {
                    onSelectRoommateView();
                    onClose();
                  }}
                  className="p-2.5 rounded-2xl bg-app-bg hover:bg-app-elevated cursor-pointer flex items-center justify-between text-xs transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{rm.avatar}</span>
                    <div>
                      <p className="font-bold text-stone-200">
                        {rm.name}
                      </p>
                      <p className="text-[10px] text-stone-400">
                        {rm.allergies.length > 0 ? `🚨 ${rm.allergies.join(", ")}` : "No allergies"}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </div>
              ))}
            </div>
          )}

          {/* Meals list */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              {query ? `Matching Meals (${filteredMeals.length})` : "Popular Recipes"}
            </p>

            {filteredMeals.length === 0 ? (
              <p className="text-xs text-stone-400 italic py-4 text-center">
                No matching recipes found.
              </p>
            ) : (
              filteredMeals.map((meal) => {
                const report = evaluateMealCompatibility(meal, roommates, pantryItems, mealHistory);
                return (
                  <button
                    key={meal.id}
                    onClick={() => {
                      onSelectMeal(meal);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-2xl bg-app-bg hover:bg-app-elevated border border-app-border text-left flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={meal.imageUrl}
                        alt={meal.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <p className="font-bold text-xs text-stone-200">
                          {meal.name}
                        </p>
                        <p className="text-[10px] text-stone-400">
                          {meal.cuisine} · {meal.cookTime}m
                        </p>
                      </div>
                    </div>

                    <CompatibilityBadge report={report} size="sm" />
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
