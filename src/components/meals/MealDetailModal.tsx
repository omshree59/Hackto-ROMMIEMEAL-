"use client";

import React, { useState } from "react";
import { Meal } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { evaluateMealCompatibility } from "@/lib/rulesEngine";
import {
  CompatibilityBadge,
  RestrictionSeverityBadge,
  SafetyDisclaimerNotice,
} from "@/components/common/Badges";
import {
  X,
  Clock,
  Users,
  Flame,
  Heart,
  Plus,
  ShoppingBag,
  ChefHat,
  Sparkles,
  AlertOctagon,
  ShieldCheck,
  Check,
  Calendar,
} from "lucide-react";

interface MealDetailModalProps {
  meal: Meal | null;
  onClose: () => void;
  onStartCooking: (meal: Meal) => void;
  onPlanMeal: (meal: Meal) => void;
}

export function MealDetailModal({
  meal,
  onClose,
  onStartCooking,
  onPlanMeal,
}: MealDetailModalProps) {
  const {
    roommates,
    pantryItems,
    mealHistory,
    favorites,
    toggleFavorite,
    setTonightMealId,
    addShoppingItem,
  } = useHousehold();

  const [checkedIngredients, setCheckedIngredients] = useState<{ [name: string]: boolean }>({});
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!meal) return null;

  const report = evaluateMealCompatibility(meal, roommates, pantryItems, mealHistory);
  const isFav = favorites.includes(meal.id);

  const toggleIngredientCheck = (name: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleAddAllToShopping = () => {
    meal.ingredients.forEach((ing) => {
      addShoppingItem({
        name: ing.name,
        category: "Produce",
        amount: ing.amount,
        mealOriginName: meal.name,
      });
    });
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl my-8 bg-app-surface rounded-3xl shadow-2xl border border-app-border overflow-hidden text-stone-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Hero Image */}
        <div className="relative h-64 sm:h-72 w-full shrink-0 bg-app-bg">
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

          {/* Close & Favorite Top Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <CompatibilityBadge report={report} size="md" />

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(meal.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                  isFav
                    ? "bg-rose-500 text-white shadow-lg"
                    : "bg-black/40 text-white hover:bg-black/60"
                }`}
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title & Metadata on Hero */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-app-orange text-white shadow">
              {meal.cuisine}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5 leading-tight">
              {meal.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-medium text-white/90">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-app-yellow" />
                Prep: {meal.prepTime}m · Cook: {meal.cookTime}m
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-app-green" />
                {meal.servings} Servings
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-app-orange" />
                ~{meal.caloriesApprox} kcal / serving
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* 1. ROOMMATE COMPATIBILITY BREAKDOWN */}
          <div className="rounded-2xl p-4 sm:p-5 bg-app-bg border border-app-border space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
                <span>Household Match</span>
                <span className="text-xs font-normal text-stone-400">
                  (Evaluated for {roommates.length} roommates)
                </span>
              </h3>
            </div>

            {/* If Safe */}
            {report.status === "green" && (
              <div className="p-3 rounded-xl bg-app-green/10 border border-app-green/30 text-app-green text-xs flex items-center gap-2.5">
                <Check className="w-4 h-4 text-app-green shrink-0" />
                <span className="text-stone-300">
                  <strong className="text-app-green">No listed conflicts detected.</strong> All listed ingredients comply with the profiles of {roommates.map((r) => r.name).join(", ")}.
                </span>
              </div>
            )}

            {/* If Allergy Conflicts */}
            {report.allergyConflicts.length > 0 && (
              <div className="space-y-2">
                {report.allergyConflicts.map((c, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-app-red/10 border border-app-red/30 text-xs text-stone-300 flex items-start gap-3"
                  >
                    <AlertOctagon className="w-4 h-4 text-app-red mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <RestrictionSeverityBadge type="allergy" />
                        <span className="font-bold text-app-red">{c.roommate.name}</span>
                      </div>
                      <p className="leading-relaxed">{c.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* If Intolerance Conflicts */}
            {report.intoleranceConflicts.length > 0 && (
              <div className="space-y-2">
                {report.intoleranceConflicts.map((c, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-app-yellow/10 border border-app-yellow/30 text-xs text-stone-300 flex items-start gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <RestrictionSeverityBadge type="intolerance" />
                        <span className="font-bold text-app-yellow">{c.roommate.name}</span>
                      </div>
                      <p className="leading-relaxed">{c.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* If Dislikes */}
            {report.dislikeConflicts.length > 0 && (
              <div className="space-y-1 text-xs text-stone-400">
                {report.dislikeConflicts.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <RestrictionSeverityBadge type="dislike" />
                    <span>{d.details}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. SMART SUBSTITUTIONS */}
          {meal.substitutions && meal.substitutions.length > 0 && (
            <div className="rounded-2xl p-4 sm:p-5 bg-app-bg border border-app-border space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-200">
                <Sparkles className="w-4 h-4 text-app-orange" />
                <span>Smart Ingredient Substitutions</span>
              </div>

              <div className="space-y-2.5">
                {meal.substitutions.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-app-surface border border-app-border text-xs space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-500 line-through">
                        {sub.original}
                      </span>
                      <span className="text-stone-400">→</span>
                      <span className="font-bold text-app-orange">
                        {sub.substitute}
                      </span>
                    </div>
                    <p className="text-stone-400 leading-snug">
                      {sub.note}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-stone-500 italic">
                * Check the substitute&apos;s product label for your household&apos;s allergens before using it.
              </p>
            </div>
          )}

          {/* 3. CROSS-CONTACT KITCHEN WARNING */}
          <div className="rounded-2xl p-4 bg-app-surface border border-app-border text-xs text-stone-300 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-200">
              <ShieldCheck className="w-4 h-4 text-app-yellow" />
              <span>Kitchen Cross-Contact Reminder</span>
            </div>
            <p className="leading-relaxed text-stone-300">
              Even if an allergen is swapped or omitted, shared kitchen surfaces (toasters, cutting boards, frying oil, and prep spatulas) can transfer trace allergens. Prepare allergy-safe portions with dedicated clean utensils.
            </p>
          </div>

          {/* 4. INGREDIENTS LIST */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-stone-200">
                Ingredients ({meal.ingredients.length})
              </h3>
              <button
                onClick={handleAddAllToShopping}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-app-orange hover:underline"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{copiedNotification ? "Added to list! ✓" : "Add all to grocery list"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {meal.ingredients.map((ing, i) => {
                const isChecked = !!checkedIngredients[ing.name];
                return (
                  <label
                    key={i}
                    onClick={() => toggleIngredientCheck(ing.name)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      isChecked
                        ? "bg-app-bg border-app-border text-stone-500 line-through"
                        : "bg-app-surface border-app-border text-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked
                            ? "bg-app-orange border-app-orange text-white"
                            : "border-app-border bg-app-surface"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="font-medium">{ing.name}</span>
                    </div>
                    <span className="text-stone-400 font-mono text-[11px]">
                      {ing.amount}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 5. INSTRUCTIONS */}
          <div>
            <h3 className="font-bold text-base text-stone-200 mb-3">
              Preparation Steps
            </h3>
            <div className="space-y-3">
              {meal.instructions.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-app-bg border border-app-border text-xs leading-relaxed"
                >
                  <span className="w-6 h-6 rounded-full bg-app-orange/10 text-app-orange font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-stone-300 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. APPROXIMATE NUTRITION (DEMO DATA) */}
          <div className="p-4 rounded-2xl bg-app-bg/70 border border-app-border space-y-2">
            <p className="text-xs font-bold text-stone-300">
              Approximate Nutrition (per serving demo data)
            </p>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-app-surface border border-app-border">
                <p className="text-stone-400 text-[10px]">Calories</p>
                <p className="font-bold text-stone-200">
                  {meal.caloriesApprox} kcal
                </p>
              </div>
              <div className="p-2 rounded-xl bg-app-surface border border-app-border">
                <p className="text-stone-400 text-[10px]">Protein</p>
                <p className="font-bold text-stone-200">
                  {meal.proteinApprox}g
                </p>
              </div>
              <div className="p-2 rounded-xl bg-app-surface border border-app-border">
                <p className="text-stone-400 text-[10px]">Carbs</p>
                <p className="font-bold text-stone-200">
                  {meal.carbsApprox}g
                </p>
              </div>
              <div className="p-2 rounded-xl bg-app-surface border border-app-border">
                <p className="text-stone-400 text-[10px]">Fat</p>
                <p className="font-bold text-stone-200">
                  {meal.fatApprox}g
                </p>
              </div>
            </div>
            <p className="text-[10px] text-stone-500 italic">
              * Values are estimated reference demo data and not certified nutritional diagnostics.
            </p>
          </div>

          <SafetyDisclaimerNotice />
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 border-t border-app-border bg-app-bg flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setTonightMealId(meal.id);
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-app-surface border border-app-border text-stone-200 font-semibold text-xs hover:bg-app-bg transition-colors"
            >
              Set for Tonight
            </button>
            <button
              onClick={() => {
                onPlanMeal(meal);
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-app-surface border border-app-border text-stone-200 font-semibold text-xs hover:bg-app-bg transition-colors flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan to Calendar</span>
            </button>
          </div>

          <button
            onClick={() => {
              onStartCooking(meal);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-app-orange to-app-yellow text-stone-900 font-bold text-xs shadow-lg shadow-app-orange/25 hover:scale-105 active:scale-95 transition-all"
          >
            <ChefHat className="w-4 h-4" />
            <span>Start Cooking Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
}
