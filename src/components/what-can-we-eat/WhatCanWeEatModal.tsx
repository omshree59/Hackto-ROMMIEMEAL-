"use client";

import React, { useState } from "react";
import { Meal } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { rankMealsForHousehold } from "@/lib/rulesEngine";
import { CompatibilityBadge } from "@/components/common/Badges";
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChefHat,
  ArrowRight,
  ShieldCheck,
  Filter,
} from "lucide-react";

interface WhatCanWeEatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMeal: (meal: Meal) => void;
}

export function WhatCanWeEatModal({
  isOpen,
  onClose,
  onSelectMeal,
}: WhatCanWeEatModalProps) {
  const { meals, roommates, pantryItems, mealHistory, setTonightMealId } = useHousehold();
  const [filterSafeOnly, setFilterSafeOnly] = useState(false);

  if (!isOpen) return null;

  const ranked = rankMealsForHousehold(meals, roommates, pantryItems, mealHistory);
  const filtered = filterSafeOnly
    ? ranked.filter((r) => r.report.status === "green")
    : ranked;

  const safeCount = ranked.filter((r) => r.report.status === "green").length;
  const modCount = ranked.filter((r) => r.report.status === "yellow").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl my-8 bg-app-surface rounded-3xl shadow-2xl border border-app-border overflow-hidden text-stone-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-app-border bg-gradient-to-r from-app-orange/10 via-amber-500/5 to-transparent shrink-0 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                What Can We Eat Tonight?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Local rules engine evaluated {meals.length} recipes against the food profiles of{" "}
              <span className="font-semibold text-app-orange">
                {roommates.map((r) => r.name).join(", ")}
              </span>
              .
            </p>

            {/* Quick stats pills */}
            <div className="flex items-center gap-2 mt-3 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 font-semibold">
                🟢 {safeCount} No listed conflicts detected
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 font-semibold">
                🟡 {modCount} Modification suggested
              </span>

              <button
                onClick={() => setFilterSafeOnly(!filterSafeOnly)}
                className={`ml-auto px-3 py-1 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                  filterSafeOnly
                    ? "bg-app-orange text-white border-app-orange"
                    : "bg-app-surface border-app-border text-stone-300"
                }`}
              >
                <Filter className="w-3 h-3" />
                <span>{filterSafeOnly ? "Showing 100% Safe" : "Filter: Safe Only"}</span>
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-app-elevated text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Ranked Results */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {filtered.slice(0, 15).map(({ meal, report }, index) => {
            const isTop3 = index < 3;
            return (
              <div
                key={meal.id}
                className={`group rounded-2xl p-4 sm:p-5 border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isTop3
                    ? "bg-gradient-to-r from-app-orange/20 via-app-surface to-app-surface border-app-orange/50 shadow-md"
                    : "bg-app-surface border-app-border hover:border-app-orange"
                }`}
              >
                {/* Left image & meal info */}
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-app-bg">
                    <img
                      src={meal.imageUrl}
                      alt={meal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isTop3 && (
                      <span className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-app-orange text-white font-black text-[11px] flex items-center justify-center shadow">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <CompatibilityBadge report={report} size="sm" />
                      <span className="text-[11px] font-semibold text-stone-400">
                        {meal.cuisine} · {meal.prepTime + meal.cookTime}m
                      </span>
                    </div>

                    <h3
                      onClick={() => {
                        onSelectMeal(meal);
                        onClose();
                      }}
                      className="font-bold text-base text-stone-200 group-hover:text-app-orange cursor-pointer transition-colors"
                    >
                      {meal.name}
                    </h3>

                    <p className="text-xs text-stone-400 line-clamp-1">
                      {meal.description}
                    </p>

                    {/* Why this works breakdown */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {roommates.map((rm) => {
                        const hasAllergy = report.allergyConflicts.some((c) => c.roommate.id === rm.id);
                        const hasIntolerance = report.intoleranceConflicts.some((c) => c.roommate.id === rm.id);
                        const hasDislike = report.dislikeConflicts.some((c) => c.roommate.id === rm.id);

                        let badgeColor = "bg-emerald-950/60 text-emerald-300 border-emerald-800";
                        let statusIcon = "✓";

                        if (hasAllergy) {
                          badgeColor = "bg-rose-950/60 text-rose-300 border-rose-800";
                          statusIcon = "🚨";
                        } else if (hasIntolerance) {
                          badgeColor = "bg-amber-950/60 text-amber-300 border-amber-800";
                          statusIcon = "⚠️";
                        } else if (hasDislike) {
                          badgeColor = "bg-app-bg text-slate-300 border-app-border";
                          statusIcon = "🚫";
                        }

                        return (
                          <span
                            key={rm.id}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${badgeColor}`}
                          >
                            <span>{rm.avatar}</span>
                            <span>{rm.name}</span>
                            <span>{statusIcon}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Match score & Action CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-app-border">
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-bold text-app-orange">
                      {report.matchScore}% Match
                    </span>
                    <p className="text-[10px] text-stone-400">Household Match</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setTonightMealId(meal.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-app-orange/20 hover:bg-app-orange/30 text-app-orange text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <ChefHat className="w-3.5 h-3.5" />
                      <span>Cook Tonight</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectMeal(meal);
                        onClose();
                      }}
                      className="p-1.5 rounded-xl bg-app-bg hover:bg-app-elevated text-stone-300 transition-colors"
                      title="View full recipe"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
