"use client";

import React, { useState } from "react";
import { Meal } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import confetti from "canvas-confetti";
import {
  ChefHat,
  X,
  ChevronLeft,
  ChevronRight,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Check,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

interface CookingModeModalProps {
  meal: Meal | null;
  onClose: () => void;
}

export function CookingModeModal({ meal, onClose }: CookingModeModalProps) {
  const {
    timers,
    addTimer,
    toggleTimer,
    resetTimer,
    removeTimer,
    recordMealCooked,
    roommates,
  } = useHousehold();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<{ [index: number]: boolean }>({});
  const [customTimerLabel, setCustomTimerLabel] = useState("");
  const [customTimerMinutes, setCustomTimerMinutes] = useState("5");
  const [showFinishedCelebration, setShowFinishedCelebration] = useState(false);

  if (!meal) return null;

  const totalSteps = meal.instructions.length;
  const currentStep = meal.instructions[currentStepIndex];

  const handleNextStep = () => {
    setCompletedSteps((prev) => ({ ...prev, [currentStepIndex]: true }));
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Completed!
      setShowFinishedCelebration(true);
      recordMealCooked(meal.id, meal.servings);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleCreateTimer = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = parseFloat(customTimerMinutes) || 5;
    addTimer(customTimerLabel.trim() || `Step ${currentStepIndex + 1} Timer`, mins);
    setCustomTimerLabel("");
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div
        className="relative w-full max-w-5xl my-4 bg-app-surface rounded-3xl shadow-2xl border border-app-border text-stone-200 max-h-[95vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-app-border bg-app-bg/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-app-orange text-white flex items-center justify-center font-bold shadow-md shadow-app-orange/20">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-app-orange">
                Cooking Mode · Hands-Free Kitchen View
              </span>
              <h2 className="font-extrabold text-base sm:text-lg text-stone-200 line-clamp-1">
                {meal.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-app-elevated text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Finished Celebration View */}
        {showFinishedCelebration ? (
          <div className="p-12 text-center space-y-6 my-auto flex-1 flex flex-col items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-200">
              Dinner is Served!
            </h2>
            <p className="text-sm text-stone-300 max-w-md">
              Great job! <strong>{meal.name}</strong> was recorded in your household cooked meal history. Enjoy dinner with {roommates.map((r) => r.name).join(", ")}!
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-2xl bg-app-orange hover:opacity-90 text-white font-bold text-sm shadow-xl shadow-app-orange/30 transition-all"
            >
              Return to Kitchen Hub
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-app-border">
            {/* Left 2 Cols: Main Giant Step View */}
            <div className="lg:col-span-2 p-6 sm:p-10 flex flex-col justify-between space-y-8">
              {/* Step counter progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider">
                  <span>
                    Step {currentStepIndex + 1} of {totalSteps}
                  </span>
                  <span>{Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-app-bg h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-app-orange to-app-yellow h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Giant Instruction */}
              <div className="py-6 space-y-4 flex-1 flex flex-col justify-center">
                <p className="text-xl sm:text-3xl font-extrabold text-stone-200 leading-relaxed">
                  {currentStep}
                </p>

                {/* Quick 1-click timer button for this step */}
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs font-semibold text-stone-400">Quick Step Timers:</span>
                  {[2, 5, 10, 15].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => addTimer(`Step ${currentStepIndex + 1} (${mins}m)`, mins)}
                      className="px-2.5 py-1 rounded-xl bg-app-bg hover:bg-app-elevated text-xs font-bold text-stone-300 transition-colors"
                    >
                      ⏱️ +{mins}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="pt-6 border-t border-app-border flex items-center justify-between gap-4">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className="px-5 py-3 rounded-2xl border border-app-border font-bold text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-app-elevated flex items-center gap-2 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>

                <button
                  onClick={handleNextStep}
                  className="px-7 py-3.5 rounded-2xl bg-app-orange hover:opacity-90 text-white font-bold text-sm shadow-xl shadow-app-orange/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{currentStepIndex === totalSteps - 1 ? "Finish Cooking 🎉" : "Next Step"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 1 Col: Kitchen Multi-Timers & Ingredient Sidebar */}
            <div className="p-6 bg-app-bg/70 space-y-6 overflow-y-auto">
              {/* Active Timers Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-stone-200 flex items-center gap-1.5">
                    <Timer className="w-4 h-4 text-app-orange" />
                    <span>Multi-Timers ({timers.length})</span>
                  </h3>
                </div>

                {/* Timers List */}
                <div className="space-y-2.5">
                  {timers.map((t) => (
                    <div
                      key={t.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        t.isFinished
                          ? "bg-app-red/10 border-app-red animate-pulse"
                          : t.isRunning
                          ? "bg-app-surface border-app-orange shadow-sm"
                          : "bg-app-surface border-app-border"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-stone-200 line-clamp-1">
                          {t.label}
                        </span>
                        <button
                          onClick={() => removeTimer(t.id)}
                          className="text-stone-300 hover:text-app-red text-xs font-bold"
                        >
                          ×
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span
                          className={`font-mono text-xl font-black ${
                            t.isFinished
                              ? "text-app-red animate-bounce"
                              : t.isRunning
                              ? "text-app-orange"
                              : "text-stone-300"
                          }`}
                        >
                          {formatSeconds(t.remainingSeconds)}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleTimer(t.id)}
                            className={`p-1.5 rounded-xl font-bold text-xs transition-colors ${
                              t.isRunning
                                ? "bg-app-yellow/20 text-app-yellow"
                                : "bg-app-orange/20 text-app-orange"
                            }`}
                          >
                            {t.isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => resetTimer(t.id)}
                            className="p-1.5 rounded-xl bg-app-bg text-stone-500 hover:text-stone-200"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Add Timer Form */}
                <form onSubmit={handleCreateTimer} className="pt-2 flex items-center gap-1.5">
                  <input
                    type="text"
                    value={customTimerLabel}
                    onChange={(e) => setCustomTimerLabel(e.target.value)}
                    placeholder="Timer label"
                    className="flex-1 px-2.5 py-1.5 rounded-xl bg-app-surface border border-app-border text-xs focus:outline-none"
                  />
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={customTimerMinutes}
                    onChange={(e) => setCustomTimerMinutes(e.target.value)}
                    className="w-14 px-2 py-1.5 rounded-xl bg-app-surface border border-app-border text-xs text-center focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-app-orange text-white font-bold text-xs"
                  >
                    +
                  </button>
                </form>
              </div>

              {/* Quick Ingredients Reminder */}
              <div className="space-y-2 pt-4 border-t border-app-border">
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-300">
                  Ingredients Needed
                </h4>
                <div className="space-y-1.5 text-xs text-stone-400">
                  {meal.ingredients.map((ing, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{ing.name}</span>
                      <span className="font-mono text-[11px] text-stone-400">{ing.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
