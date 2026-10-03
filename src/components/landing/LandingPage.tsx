"use client";

import React, { useEffect } from "react";
import { useHousehold } from "@/context/HouseholdContext";
import {
  UtensilsCrossed,
  Sparkles,
  ShieldCheck,
  Heart,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Calendar,
  ShoppingBag,
  ChefHat,
  Users,
  Repeat,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";
import { Meal } from "@/types";
import Lenis from "lenis";

interface LandingPageProps {
  onStartPlanning: () => void;
  onExploreRoommates: () => void;
  onSelectMeal: (meal: Meal) => void;
}

export function LandingPage({
  onStartPlanning,
  onExploreRoommates,
  onSelectMeal,
}: LandingPageProps) {
  const { roommates, meals } = useHousehold();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const previewMeals = meals.slice(0, 3);

  return (
    <div className="min-h-screen bg-app-bg text-stone-200 selection:bg-app-orange selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-app-orange/20 via-amber-300/20 to-emerald-400/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-app-surface border border-app-border shadow-sm text-xs font-semibold text-app-orange animate-in fade-in slide-in-from-bottom-3 duration-500">
              <span className="flex h-2 w-2 rounded-full bg-app-orange animate-ping" />
              <span>One kitchen. Everyone feels safe.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-200 leading-[1.1]">
              Dinner shouldn&apos;t require a{" "}
              <span className="bg-gradient-to-r from-app-orange via-orange-500 to-amber-500 bg-clip-text text-transparent">
                group chat.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-stone-400 leading-relaxed font-normal">
              RoomieMeal remembers everyone&apos;s food restrictions and helps your household plan meals that work for everyone.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onStartPlanning}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-app-orange to-amber-500 text-white font-bold text-base shadow-xl shadow-app-orange/25 hover:shadow-app-orange/40 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Plan Tonight&apos;s Dinner</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreRoommates}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-app-surface border border-app-border text-stone-200 font-semibold text-base shadow-sm hover:bg-app-elevated transition-colors"
              >
                <Users className="w-4 h-4 text-stone-500" />
                <span>Meet the Roomies</span>
              </button>
            </div>
          </div>

          {/* HERO VISUAL: Shared Dinner Table & Floating Restriction Cards */}
          <div className="mt-16 lg:mt-24 relative max-w-5xl mx-auto">
            {/* Main Interactive Table Preview Container */}
            <div className="rounded-3xl border border-app-border bg-app-surface shadow-2xl p-6 sm:p-8 overflow-hidden relative">
              {/* Floating Cards (Subtly animated) */}
              <div className="absolute top-6 left-6 sm:left-10 z-20 animate-float-slow">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-bold shadow-lg">
                  <span>🥜</span>
                  <span>Peanut allergy</span>
                </div>
              </div>

              <div className="absolute top-6 right-6 sm:right-10 z-20 animate-float-slow [animation-delay:1.5s]">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-950/80 border border-amber-800 text-amber-200 text-xs font-bold shadow-lg">
                  <span>🥛</span>
                  <span>Dairy-free</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 sm:left-12 z-20 animate-float-slow [animation-delay:3s]">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-bold shadow-lg">
                  <span>🌱</span>
                  <span>Vegetarian</span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 sm:right-12 z-20 animate-float-slow [animation-delay:4.5s]">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-purple-950/80 border border-purple-800 text-purple-200 text-xs font-bold shadow-lg">
                  <span>❤️</span>
                  <span>Loves pasta</span>
                </div>
              </div>

              {/* Center Kitchen Showcase Header */}
              <div className="text-center pb-6 border-b border-app-border">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                  <ChefHat className="w-4 h-4 text-app-orange" />
                  <span>Household Table · 79 Maple St</span>
                </div>

                {/* Avatars Around Table */}
                <div className="flex items-center justify-center -space-x-3 py-2">
                  {roommates.map((rm) => (
                    <div
                      key={rm.id}
                      className="group relative flex flex-col items-center cursor-pointer"
                      onClick={onExploreRoommates}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-app-bg border-4 border-app-border flex items-center justify-center text-2xl shadow-md group-hover:scale-110 group-hover:z-30 transition-all">
                        {rm.avatar}
                      </div>
                      <span className="text-[11px] font-bold text-stone-300 mt-1">
                        {rm.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Match Engine Card Preview */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {previewMeals.map((meal) => (
                  <div
                    key={meal.id}
                    onClick={() => onSelectMeal(meal)}
                    className="group cursor-pointer rounded-2xl p-3 bg-app-bg border border-app-border hover:border-app-orange/50 hover:shadow-lg transition-all"
                  >
                    <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2.5">
                      <img
                        src={meal.imageUrl}
                        alt={meal.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-app-green text-white shadow">
                        🟢 Safe match
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-stone-200 line-clamp-1">
                      {meal.name}
                    </h4>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      {meal.cuisine} · {meal.cookTime + meal.prepTime} min
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (3-Step Visualizer) */}
      <section className="py-20 bg-app-surface border-y border-app-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-app-orange">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-200 tracking-tight">
              Plan meals around everyone, not around restrictions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative rounded-3xl p-8 bg-app-bg border border-app-border hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-app-orange/20 text-app-orange flex items-center justify-center font-black text-lg mb-6 shadow-sm">
                01
              </div>
              <h3 className="text-xl font-bold text-stone-200 mb-2">
                Add your roommates
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                Create friendly profiles for everyone sharing the kitchen with custom avatars and roles.
              </p>
              <div className="mt-6 flex items-center gap-2 p-2.5 rounded-xl bg-app-surface border border-app-border text-xs text-stone-300">
                <Users className="w-4 h-4 text-app-orange" />
                <span>Alex, Maya, Sam & Omshree</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-3xl p-8 bg-app-bg border border-app-border hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/70 text-amber-400 flex items-center justify-center font-black text-lg mb-6 shadow-sm">
                02
              </div>
              <h3 className="text-xl font-bold text-stone-200 mb-2">
                Set food boundaries
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                Specify critical allergies (🚨), digestive intolerances (⚠️), disliked ingredients (🚫), and favorite cuisines.
              </p>
              <div className="mt-6 flex items-center gap-2 p-2.5 rounded-xl bg-app-surface border border-app-border text-xs text-stone-300">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>Alias matching & rule engine</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-3xl p-8 bg-app-bg border border-app-border hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/70 text-emerald-400 flex items-center justify-center font-black text-lg mb-6 shadow-sm">
                03
              </div>
              <h3 className="text-xl font-bold text-stone-200 mb-2">
                Plan together
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                RoomieMeal automatically scores and filters safe meals, suggests smart substitutions, and generates shared grocery lists.
              </p>
              <div className="mt-6 flex items-center gap-2 p-2.5 rounded-xl bg-app-surface border border-app-border text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant &quot;What can we eat?&quot; match</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SAFETY FIRST PHILOSOPHY */}
      <section className="py-20 bg-app-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-app-elevated border border-app-border text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Strict Safety Hierarchy</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-200">
                Not all food restrictions are created equal.
              </h2>

              <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                RoomieMeal clearly distinguishes life-threatening allergies from comfort intolerances and simple dislikes. We never claim a recipe is medically guaranteed safe, reminding households to always verify packaging and avoid cross-contact.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-app-surface border border-app-border space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <span>🚨</span>
                    <span>Allergy</span>
                  </div>
                  <p className="text-xs text-stone-400">
                    Potentially dangerous immune trigger. High visibility alert.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-app-surface border border-app-border space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <span>⚠️</span>
                    <span>Intolerance</span>
                  </div>
                  <p className="text-xs text-stone-400">
                    Digestive sensitivity. Prompts smart plant-based substitutions.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-app-surface border border-app-border space-y-2">
                  <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                    <span>🚫</span>
                    <span>Preference</span>
                  </div>
                  <p className="text-xs text-stone-400">
                    Disliked ingredients. Reduces recommendation ranking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA SECTION */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-200">
            Ready to end dinner friction?
          </h2>
          <p className="text-stone-400 text-base sm:text-lg max-w-xl mx-auto">
            Try RoomieMeal with the demo household or add your own roommates in seconds. Offline-ready and completely local.
          </p>
          <div className="pt-4">
            <button
              onClick={onStartPlanning}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-app-orange via-orange-500 to-amber-500 text-white font-bold text-lg shadow-xl shadow-app-orange/30 hover:shadow-app-orange/50 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Launch Kitchen Hub</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
