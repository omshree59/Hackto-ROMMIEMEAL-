"use client";

import React from "react";
import { useHousehold } from "@/context/HouseholdContext";
import { evaluateMealCompatibility, rankMealsForHousehold } from "@/lib/rulesEngine";
import { CompatibilityBadge } from "@/components/common/Badges";
import { MealCard } from "@/components/meals/MealCard";
import {
  UtensilsCrossed,
  Calendar,
  ShoppingBag,
  Refrigerator,
  Users,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChefHat,
  Vote,
  Search
} from "lucide-react";
import { Meal } from "@/types";

interface DashboardViewProps {
  onNavigate: (view: string) => void;
  onOpenWhatCanWeEat: () => void;
  onSelectMeal: (meal: Meal) => void;
  onOpenVoting: () => void;
}

export function DashboardView({
  onNavigate,
  onOpenWhatCanWeEat,
  onSelectMeal,
  onOpenVoting,
}: DashboardViewProps) {
  const {
    activeRoommate,
    roommates,
    meals,
    tonightMealId,
    weeklyPlan,
    shoppingList,
    pantryItems,
    mealHistory,
    setActiveCookingMeal,
  } = useHousehold();

  const tonightMeal = meals.find((m) => m.id === tonightMealId) || meals[0];
  const tonightReport = evaluateMealCompatibility(tonightMeal, roommates, pantryItems, mealHistory);

  // Count planned meals for current week
  const plannedCount = Object.values(weeklyPlan).filter(
    (d) => d.breakfast || d.lunch || d.dinner
  ).length;

  const rankedForTonight = rankMealsForHousehold(meals, roommates, pantryItems, mealHistory).slice(0, 3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION - WHAT CAN WE EAT TONIGHT? */}
      <section className="rounded-[32px] p-8 md:p-12 bg-app-surface border border-app-border relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-app-orange/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-app-yellow/5 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

        <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-app-elevated border border-app-border text-[11px] font-bold text-stone-300 uppercase tracking-wider shadow-sm">
            <span>{getGreeting()}, {activeRoommate?.name || "Household"}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            What can we eat <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-app-orange to-app-yellow">
              tonight?
            </span>
          </h1>
          
          <p className="text-stone-400 text-lg max-w-xl mx-auto md:mx-0">
            Find the perfect meal that fits everyone's dietary needs. No compromises, just good food.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center md:justify-start">
            <button
              onClick={onOpenWhatCanWeEat}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-app-orange text-app-bg font-bold text-sm shadow-lg shadow-app-orange/20 hover:bg-[#ff991f] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>Find a Meal</span>
            </button>
            <button
              onClick={onOpenVoting}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-app-elevated text-stone-200 font-bold text-sm border border-app-border hover:bg-app-surface transition-all flex items-center justify-center gap-2"
            >
              <Vote className="w-5 h-5 text-app-yellow" />
              <span>Household Vote</span>
            </button>
          </div>
        </div>

        {/* Roommates Breakdown Card */}
        <div className="w-full md:w-[340px] shrink-0 bg-app-elevated/80 backdrop-blur-sm border border-app-border rounded-3xl p-6 relative z-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider">Household Needs</h3>
            <span className="px-2.5 py-1 rounded-lg bg-app-surface text-[10px] font-bold text-stone-400 border border-app-border">
              {roommates.length} People
            </span>
          </div>
          <div className="space-y-4">
            {roommates.length === 0 ? (
              <div className="text-center py-6 space-y-3">
                <Users className="w-8 h-8 text-stone-500 mx-auto" />
                <p className="text-xs text-stone-400">No roommates registered yet.</p>
                <button
                  type="button"
                  onClick={() => onNavigate("roommates")}
                  className="px-4 py-2 rounded-xl bg-app-orange/10 text-app-orange border border-app-orange/20 text-xs font-semibold hover:bg-app-orange/20 transition-colors"
                >
                  + Add First Roommate
                </button>
              </div>
            ) : (
              roommates.map((r) => (
                <div key={r.id} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-app-surface border border-app-border flex items-center justify-center text-xl shrink-0 shadow-sm">
                    {r.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-stone-200 truncate">{r.name}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5 leading-tight">
                      {r.allergies.length > 0
                        ? <span className="text-app-red font-medium">Allergies: {r.allergies.join(", ")}</span>
                        : r.intolerances.length > 0
                        ? <span className="text-app-yellow font-medium">Intolerances: {r.intolerances.join(", ")}</span>
                        : r.preferences.length > 0
                        ? <span>Diet: {r.preferences.join(", ")}</span>
                        : "No listed restrictions"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 2. TONIGHT'S DINNER HERO SPOTLIGHT CARD */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-bold text-stone-200 tracking-tight">
            Selected for Tonight
          </h2>
        </div>
        
        <div className="rounded-[32px] p-6 sm:p-8 bg-app-surface border border-app-border relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-app-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="space-y-4 max-w-2xl relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {tonightMeal.name}
            </h3>

            <p className="text-sm text-stone-400 leading-relaxed">
              {tonightMeal.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-stone-400 pt-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-app-elevated border border-app-border">
                <Clock className="w-3.5 h-3.5 text-app-orange" />
                {tonightMeal.cookTime} mins cook time
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-app-elevated border border-app-border">
                <Users className="w-3.5 h-3.5 text-app-green" />
                Serves {tonightMeal.servings}
              </span>
              <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-app-elevated border border-app-border ${
                tonightReport.status === "green" ? "text-app-green" :
                tonightReport.status === "yellow" ? "text-app-yellow" : "text-app-red"
              }`}>
                {tonightReport.status === "green" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                {tonightReport.summaryMessage}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0 relative z-10">
            <button
              onClick={() => setActiveCookingMeal(tonightMeal)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-app-orange text-app-bg font-bold text-sm shadow-md hover:bg-[#ff991f] transition-colors"
            >
              <ChefHat className="w-5 h-5" />
              <span>Start Cooking</span>
            </button>
            <button
              onClick={() => onSelectMeal(tonightMeal)}
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-app-elevated hover:bg-stone-800 border border-app-border text-stone-200 font-bold text-sm transition-colors text-center"
            >
              View Full Recipe
            </button>
          </div>
        </div>
      </section>

      {/* 3. QUICK ACTION DASHBOARD CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card: Household Match Status */}
        <div className="rounded-3xl p-6 bg-app-surface border border-app-border space-y-4">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Household Match</span>
            <ShieldCheck className="w-4 h-4 text-app-green" />
          </div>
          <div>
            <CompatibilityBadge report={tonightReport} size="md" />
            <p className="text-[11px] text-stone-500 mt-2 line-clamp-2 leading-relaxed">
              {tonightReport.summaryMessage}
            </p>
          </div>
        </div>

        {/* Card: Weekly Plan */}
        <div className="rounded-3xl p-6 bg-app-surface border border-app-border space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Weekly Plan</span>
              <Calendar className="w-4 h-4 text-app-orange" />
            </div>
            <h3 className="font-bold text-lg text-white">
              {plannedCount} <span className="text-stone-500 text-sm font-medium">/ 7 Days Planned</span>
            </h3>
            {/* Progress Bar */}
            <div className="w-full bg-app-elevated h-2.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-app-orange h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (plannedCount / 7) * 100)}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => onNavigate("planner")}
            className="text-xs font-bold text-app-orange hover:text-white transition-colors flex items-center gap-1 pt-2 w-fit"
          >
            <span>Open Calendar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card: Groceries */}
        <div className="rounded-3xl p-6 bg-app-surface border border-app-border space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Groceries</span>
              <ShoppingBag className="w-4 h-4 text-app-yellow" />
            </div>
            <h3 className="font-bold text-lg text-white">
              {shoppingList.length} <span className="text-stone-500 text-sm font-medium">Items needed</span>
            </h3>
          </div>
          <button
            onClick={() => onNavigate("shopping")}
            className="text-xs font-bold text-app-yellow hover:text-white transition-colors flex items-center gap-1 pt-2 w-fit"
          >
            <span>View Shopping List</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. TOP COMPATIBLE DISHES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-lg font-bold text-stone-200 tracking-tight">
              Recommended for Tonight
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Ranked by household compatibility
            </p>
          </div>
          <button
            onClick={() => onNavigate("discover")}
            className="text-xs font-bold text-app-orange hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Browse All ({meals.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rankedForTonight.map(({ meal }) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onOpenDetail={onSelectMeal}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
