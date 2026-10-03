"use client";

import React, { useState } from "react";
import { useHousehold } from "@/context/HouseholdContext";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  X,
  Clock,
  Sparkles,
} from "lucide-react";

interface TimersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TimersModal({ isOpen, onClose }: TimersModalProps) {
  const { timers, addTimer, toggleTimer, resetTimer, removeTimer } = useHousehold();

  const [label, setLabel] = useState("");
  const [minutes, setMinutes] = useState("10");

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = parseFloat(minutes) || 10;
    addTimer(label.trim() || "Cooking Timer", duration);
    setLabel("");
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-lg bg-app-surface rounded-3xl p-6 sm:p-8 shadow-2xl border border-app-border text-stone-200 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-app-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-app-orange text-white flex items-center justify-center font-bold shadow-md shadow-app-orange/20">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-stone-200">
                Kitchen Multi-Timers
              </h2>
              <p className="text-xs text-stone-500">
                Track concurrent burners and oven bakes
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

        {/* Timers List */}
        <div className="py-4 space-y-3 overflow-y-auto flex-1">
          {timers.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-xs">
              No active timers. Add one below.
            </div>
          ) : (
            timers.map((t) => (
              <div
                key={t.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  t.isFinished
                    ? "bg-app-red/10 border-app-red animate-pulse"
                    : t.isRunning
                    ? "bg-app-bg border-app-orange shadow-sm"
                    : "bg-app-bg border-app-border"
                }`}
              >
                <div>
                  <h4 className="font-bold text-xs text-stone-200">
                    {t.label}
                  </h4>
                  <p
                    className={`font-mono text-2xl font-black mt-0.5 ${
                      t.isFinished
                        ? "text-app-red"
                        : t.isRunning
                        ? "text-app-orange"
                        : "text-stone-300"
                    }`}
                  >
                    {formatSeconds(t.remainingSeconds)}
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleTimer(t.id)}
                    className={`p-2 rounded-xl text-xs font-bold ${
                      t.isRunning
                        ? "bg-app-yellow/20 text-app-yellow"
                        : "bg-app-orange/20 text-app-orange"
                    }`}
                  >
                    {t.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => resetTimer(t.id)}
                    className="p-2 rounded-xl bg-app-elevated text-stone-300"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => removeTimer(t.id)}
                    className="p-2 rounded-xl hover:bg-app-red/10 hover:text-app-red text-stone-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Timer Form */}
        <form onSubmit={handleCreate} className="pt-4 border-t border-app-border space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Pasta timer, Oven roast"
              className="flex-1 px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs focus:outline-none"
            />
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="1"
                max="180"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-16 px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs text-center focus:outline-none"
              />
              <span className="text-xs text-stone-400 font-semibold">min</span>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-app-orange text-white font-bold text-xs shadow-md shadow-app-orange/20"
            >
              Start
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
