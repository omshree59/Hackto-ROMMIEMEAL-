"use client";

import React, { useState, useMemo } from "react";
import { Meal } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { evaluateMealCompatibility } from "@/lib/rulesEngine";
import { CompatibilityBadge } from "@/components/common/Badges";
import {
  CalendarDays,
  Plus,
  Trash2,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  Calendar,
} from "lucide-react";

interface WeeklyPlannerViewProps {
  onSelectMeal: (meal: Meal) => void;
  onNavigateToShopping: () => void;
}

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

  const [weekOffset, setWeekOffset] = useState<number>(0);

  const [activePicker, setActivePicker] = useState<{
    dateKey: string;
    slot: "breakfast" | "lunch" | "dinner";
  } | null>(null);

  const [notification, setNotification] = useState<string | null>(null);

  // Dynamically compute days for the selected week
  const daysOfWeek = useMemo(() => {
    const today = new Date();
    // Find Monday of current week
    const dayOfWeek = today.getDay(); // 0 is Sun, 1 is Mon...
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday + weekOffset * 7);

    const days = [];
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const fullNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const todayIso = today.toISOString().split("T")[0];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const key = d.toISOString().split("T")[0];
      const isToday = key === todayIso;

      days.push({
        key,
        short: dayNames[i],
        label: fullNames[i],
        dayNum: String(d.getDate()).padStart(2, "0"),
        monthName: monthNames[d.getMonth()],
        isToday,
      });
    }
    return days;
  }, [weekOffset]);

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

          {/* Week Navigation Controls */}
          <div className="flex items-center bg-app-surface border border-app-border rounded-2xl p-1 gap-1">
            <button
              type="button"
              onClick={() => setWeekOffset((w) => w - 1)}
              className="p-1.5 rounded-xl hover:bg-app-elevated text-stone-400 hover:text-stone-200 transition-colors"
              title="Previous week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setWeekOffset(0)}
              className="px-2.5 py-1 rounded-xl text-xs font-semibold text-stone-300 hover:text-white transition-colors"
            >
              {weekOffset === 0
                ? "This Week"
                : weekOffset > 0
                ? `+${weekOffset} Wk`
                : `${weekOffset} Wk`}
            </button>
            <button
              type="button"
              onClick={() => setWeekOffset((w) => w + 1)}
              className="p-1.5 rounded-xl hover:bg-app-elevated text-stone-400 hover:text-stone-200 transition-colors"
              title="Next week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleGenerateShopping}
            className="px-4 py-2.5 rounded-2xl bg-app-orange hover:bg-[#ff991f] text-app-bg text-xs font-bold shadow-md shadow-app-orange/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Generate Grocery List</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm("Clear all planned meals for this week?")) {
                clearEntireWeekPlan();
              }
            }}
            className="p-2.5 rounded-2xl bg-app-surface hover:bg-app-elevated border border-app-border text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
            title="Clear entire week"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7-Day Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {daysOfWeek.map((day) => {
          const dayPlan = weeklyPlan[day.key] || {};
          const slots: ("breakfast" | "lunch" | "dinner")[] = ["breakfast", "lunch", "dinner"];

          return (
            <div
              key={day.key}
              className={`rounded-3xl p-3.5 bg-app-surface border shadow-sm flex flex-col justify-between space-y-3 transition-colors ${
                day.isToday ? "border-app-orange ring-1 ring-app-orange/30" : "border-app-border"
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-2 border-b border-app-border">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                      {day.short}
                    </p>
                    {day.isToday && (
                      <span className="px-1.5 py-0.2 rounded-md bg-app-orange text-app-bg font-extrabold text-[9px] uppercase tracking-wider">
                        Today
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                    {day.monthName} {day.dayNum}
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
                            type="button"
                            onClick={() => clearMealSlot(day.key, slot)}
                            className="text-stone-400 hover:text-rose-500 p-0.5 cursor-pointer"
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
                          type="button"
                          onClick={() => setActivePicker({ dateKey: day.key, slot })}
                          className="w-full py-2 flex items-center justify-center gap-1 text-stone-400 hover:text-app-orange text-[11px] font-semibold transition-colors cursor-pointer"
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
                type="button"
                onClick={() => setActivePicker(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-app-elevated"
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
                    type="button"
                    onClick={() => {
                      setMealForDay(activePicker.dateKey, activePicker.slot, meal.id);
                      setActivePicker(null);
                    }}
                    className="w-full p-3 rounded-2xl bg-app-bg border border-app-border hover:border-app-orange text-left flex items-center justify-between gap-3 transition-colors cursor-pointer"
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
