"use client";

import React, { useState } from "react";
import { Meal } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { evaluateMealCompatibility } from "@/lib/rulesEngine";
import { CompatibilityBadge } from "@/components/common/Badges";
import {
  CalendarDays,
  Plus,
  Trash2,
  ShoppingBag,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  RotateCcw,
  CheckCircle2,
  ChefHat,
  X,
} from "lucide-react";

interface WeeklyPlannerViewProps {
  onSelectMeal: (meal: Meal) => void;
  onNavigateToShopping: () => void;
}

const DAYS_OF_WEEK = [
  { key: "2026-10-05", label: "Monday", short: "Mon", dayNum: "05" },
  { key: "2026-10-06", label: "Tuesday", short: "Tue", dayNum: "06" },
  { key: "2026-10-07", label: "Wednesday", short: "Wed", dayNum: "07" },
  { key: "2026-10-08", label: "Thursday", short: "Thu", dayNum: "08" },
  { key: "2026-10-09", label: "Friday", short: "Fri", dayNum: "09" },
  { key: "2026-10-10", label: "Saturday", short: "Sat", dayNum: "10" },
  { key: "2026-10-11", label: "Sunday", short: "Sun", dayNum: "11" },
];

export function WeeklyPlannerView({
  onSelectMeal,
  onNavigateToShopping,
}: WeeklyPlannerViewProps) {
  const {
    meals,
    roommates,
    weeklyPlan,
    setMealForDay,
    clearMealSlot,
    clearEntireWeekPlan,
    generateShoppingListFromPlan,
    pantryItems,
    mealHistory,
  } = useHousehold();

  const [activePicker, setActivePicker] = useState<{
    dateKey: string;
    slot: "breakfast" | "lunch" | "dinner";
  } | null>(null);

  const [notification, setNotification] = useState<string | null>(null);

  const handleGenerateShopping = () => {
    generateShoppingListFromPlan();
    setNotification("Generated grocery list from weekly meals! ✓");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-200 tracking-tight">
            Weekly Meal Planner
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Coordinate breakfast, lunch, and dinner with live roommate compatibility checks
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {notification && (
            <span className="text-xs font-bold text-emerald-400 animate-in fade-in">
              {notification}
            </span>
          )}

          <button
            onClick={handleGenerateShopping}
            className="px-4 py-2.5 rounded-2xl bg-app-orange hover:bg-app-elevated text-white text-xs font-bold shadow-md shadow-app-orange/20 transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Generate Grocery List</span>
          </button>

          <button
            onClick={() => {
              if (confirm("Clear all planned meals for this week?")) {
                clearEntireWeekPlan();
              }
            }}
            className="p-2.5 rounded-2xl bg-app-bg hover:bg-app-elevated text-stone-300 transition-colors"
            title="Clear entire week"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7-Day Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {DAYS_OF_WEEK.map((day) => {
          const dayPlan = weeklyPlan[day.key] || {};
          const slots: ("breakfast" | "lunch" | "dinner")[] = ["breakfast", "lunch", "dinner"];

          return (
            <div
              key={day.key}
              className="rounded-3xl p-3.5 bg-app-surface border border-app-border shadow-sm flex flex-col justify-between space-y-3"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-2 border-b border-app-border">
                <div>
                  <p className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                    {day.short}
                  </p>
                  <p className="text-[11px] text-stone-400 font-mono">
                    Oct {day.dayNum}
                  </p>
                </div>
              </div>

              {/* Meal Slots */}
              <div className="space-y-2 flex-1">
                {slots.map((slot) => {
                  const mealId = dayPlan[slot];
                  const meal = meals.find((m) => m.id === mealId);
                  const report = meal ? evaluateMealCompatibility(meal, roommates, pantryItems, mealHistory) : null;

                  return (
                    <div
                      key={slot}
                      className={`p-2.5 rounded-2xl border transition-all text-xs ${
                        meal
                          ? "bg-app-bg border-app-border"
                          : "border-dashed border-app-border hover:border-app-orange bg-app-bg"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] uppercase font-bold text-stone-400 mb-1">
                        <span>{slot}</span>
                        {meal && (
                          <button
                            onClick={() => clearMealSlot(day.key, slot)}
                            className="text-stone-400 hover:text-rose-500 p-0.5"
                            title="Remove meal"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {meal && report ? (
                        <div
                          className="cursor-pointer space-y-1"
                          onClick={() => onSelectMeal(meal)}
                        >
                          <p className="font-bold text-xs text-stone-200 line-clamp-1 hover:text-app-orange">
                            {meal.name}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-stone-400">
                              {meal.cookTime}m
                            </span>
                            <CompatibilityBadge report={report} size="sm" />
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActivePicker({ dateKey: day.key, slot })}
                          className="w-full py-2 flex items-center justify-center gap-1 text-stone-400 hover:text-app-orange text-[11px] font-semibold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Assign</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Meal Selection Modal Picker */}
      {activePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-xl bg-app-surface rounded-3xl p-6 shadow-2xl border border-app-border max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-app-border">
              <div>
                <h3 className="font-bold text-lg text-stone-200 capitalize">
                  Assign {activePicker.slot}
                </h3>
                <p className="text-xs text-stone-500">
                  Select a recipe for {activePicker.dateKey}
                </p>
              </div>
              <button
                onClick={() => setActivePicker(null)}
                className="p-2 rounded-full hover:bg-app-elevated"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of meals */}
            <div className="py-4 space-y-2 overflow-y-auto flex-1">
              {meals.map((meal) => {
                const report = evaluateMealCompatibility(meal, roommates, pantryItems, mealHistory);
                return (
                  <button
                    key={meal.id}
                    onClick={() => {
                      setMealForDay(activePicker.dateKey, activePicker.slot, meal.id);
                      setActivePicker(null);
                    }}
                    className="w-full p-3 rounded-2xl bg-app-bg border border-app-border hover:border-app-orange text-left flex items-center justify-between gap-3 transition-colors"
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
                          {meal.cuisine} · {meal.cookTime} min
                        </p>
                      </div>
                    </div>
                    <CompatibilityBadge report={report} size="sm" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
