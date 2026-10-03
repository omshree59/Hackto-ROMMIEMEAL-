"use client";

import React from "react";
import { Meal } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { evaluateMealCompatibility } from "@/lib/rulesEngine";
import { CompatibilityBadge } from "@/components/common/Badges";
import confetti from "canvas-confetti";
import {
  Vote,
  X,
  Sparkles,
  CheckCircle2,
  Trophy,
  RotateCcw,
  Users,
  Flame,
} from "lucide-react";

interface VotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMeal: (meal: Meal) => void;
}

export function VotingModal({ isOpen, onClose, onSelectMeal }: VotingModalProps) {
  const {
    meals,
    roommates,
    activePoll,
    castVote,
    startVotingPoll,
    closeVotingPoll,
    pantryItems,
    mealHistory,
  } = useHousehold();

  if (!isOpen) return null;

  const candidateMeals = activePoll
    ? activePoll.candidateMealIds.map((id) => meals.find((m) => m.id === id)!).filter(Boolean)
    : [];

  const handleStartNewPoll = () => {
    // Pick 3 diverse safe meals
    const shuffled = [...meals].sort(() => 0.5 - Math.random());
    const candidates = shuffled.slice(0, 3).map((m) => m.id);
    startVotingPoll(candidates);
  };

  const handleFinalizeWinner = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {}
    closeVotingPoll();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-3xl bg-app-surface rounded-3xl p-6 sm:p-8 shadow-2xl border border-app-border text-stone-200 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-app-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-app-yellow text-stone-900 flex items-center justify-center font-bold shadow-md shadow-app-yellow/20">
              <Vote className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl text-stone-200">
                Tonight&apos;s Roommate Dinner Poll
              </h2>
              <p className="text-xs text-stone-500">
                Vote on 3 candidate meals to democratically settle dinner
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-app-elevated text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6 overflow-y-auto flex-1">
          {!activePoll || candidateMeals.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-5xl">🗳️</div>
              <h3 className="font-bold text-base text-stone-200">
                No active voting poll right now
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Generate 3 candidate options from our recipe library to let all roommates vote.
              </p>
              <button
                onClick={handleStartNewPoll}
                className="px-6 py-3 rounded-2xl bg-app-orange hover:opacity-90 text-white font-bold text-xs shadow-lg shadow-app-orange/20"
              >
                Start New 3-Meal Poll
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 3 Candidate Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {candidateMeals.map((meal) => {
                  const report = evaluateMealCompatibility(meal, roommates, pantryItems, mealHistory);
                  const votesForMeal = Object.entries(activePoll.votes).filter(
                    ([_, mId]) => mId === meal.id
                  );
                  const voteCount = votesForMeal.length;

                  return (
                    <div
                      key={meal.id}
                      className="rounded-3xl p-4 bg-app-bg border border-app-border shadow-sm flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="relative h-32 w-full rounded-2xl overflow-hidden bg-app-surface">
                          <img
                            src={meal.imageUrl}
                            alt={meal.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <CompatibilityBadge report={report} size="sm" />
                          </div>
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-white font-bold text-xs flex items-center gap-1 backdrop-blur-sm">
                            <span>❤️</span>
                            <span>{voteCount} vote{voteCount !== 1 ? "s" : ""}</span>
                          </div>
                        </div>

                        <h3 className="font-bold text-sm text-stone-200 line-clamp-1">
                          {meal.name}
                        </h3>
                        <p className="text-[11px] text-stone-400">
                          {meal.cuisine} · {meal.cookTime}m
                        </p>

                        {/* Roommates who voted for this */}
                        {votesForMeal.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 pt-1">
                            {votesForMeal.map(([rmId]) => {
                              const rm = roommates.find((r) => r.id === rmId);
                              return (
                                <span
                                  key={rmId}
                                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-app-elevated border border-app-border"
                                >
                                  {rm?.avatar} {rm?.name}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Vote Buttons per Roommate */}
                      <div className="pt-2 border-t border-app-border space-y-1.5">
                        <p className="text-[10px] font-bold uppercase text-stone-400">
                          Cast your vote:
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {roommates.map((rm) => {
                            const hasVotedForThis = activePoll.votes[rm.id] === meal.id;
                            return (
                              <button
                                key={rm.id}
                                onClick={() => castVote(rm.id, meal.id)}
                                className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                                  hasVotedForThis
                                    ? "bg-app-yellow text-stone-900 shadow-sm font-bold scale-105"
                                    : "bg-app-surface border border-app-border text-stone-300 hover:bg-app-elevated"
                                }`}
                              >
                                <span>{rm.avatar}</span>
                                <span className="truncate">{rm.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {activePoll && (
          <div className="pt-4 border-t border-app-border flex items-center justify-between">
            <button
              onClick={handleStartNewPoll}
              className="text-xs font-semibold text-stone-500 hover:text-stone-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reroll Options</span>
            </button>

            <button
              onClick={handleFinalizeWinner}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-app-yellow to-app-orange text-white font-bold text-xs shadow-lg shadow-app-orange/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              <span>Select Winner for Tonight</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
