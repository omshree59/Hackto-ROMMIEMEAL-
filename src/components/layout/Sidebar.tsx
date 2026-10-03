"use client";

import React from "react";
import { useHousehold } from "@/context/HouseholdContext";
import {
  LayoutDashboard,
  Search,
  CalendarDays,
  ShoppingBag,
  Refrigerator,
  Users,
  Timer,
  BookmarkCheck,
  Info,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenWhatCanWeEat: () => void;
  onOpenTimers: () => void;
}

export function Sidebar({
  currentView,
  setCurrentView,
  onOpenWhatCanWeEat,
  onOpenTimers,
}: SidebarProps) {
  const { shoppingList, timers, roommates } = useHousehold();

  const uncompletedShopping = shoppingList.filter((i) => !i.checked).length;
  const runningTimers = timers.filter((t) => t.isRunning).length;

  const categories = [
    {
      title: "OVERVIEW",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
        { id: "discover", label: "Discover Meals", icon: Search, badge: null },
        { id: "planner", label: "Weekly Planner", icon: CalendarDays, badge: null },
      ]
    },
    {
      title: "HOUSEHOLD",
      items: [
        { id: "roommates", label: "Household Data", icon: Users, badge: roommates.length > 0 ? `${roommates.length}` : null },
        { id: "pantry", label: "Pantry", icon: Refrigerator, badge: null },
      ]
    },
    {
      title: "PERSONAL",
      items: [
        { id: "favorites", label: "Favorites", icon: BookmarkCheck, badge: null },
      ]
    },
    {
      title: "TOOLS",
      items: [
        { id: "shopping", label: "Grocery List", icon: ShoppingBag, badge: uncompletedShopping > 0 ? uncompletedShopping : null },
      ]
    }
  ];

  return (
    <aside className="w-[250px] shrink-0 hidden md:flex flex-col fixed left-0 top-16 bottom-0 border-r border-app-border bg-app-surface/95 backdrop-blur-xl text-stone-300 z-40 select-none">
      {/* Quick Action Button */}
      <div className="p-4 pb-2">
        <button
          type="button"
          onClick={onOpenWhatCanWeEat}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-tr from-app-orange to-app-yellow text-app-bg font-bold text-xs shadow-md shadow-app-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 fill-app-bg" />
          <span>What Can We Eat?</span>
        </button>
      </div>

      {/* Navigation Categories */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-6">
        {categories.map((category) => (
          <div key={category.title} className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
              {category.title}
            </p>
            {category.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-app-elevated text-app-orange font-semibold shadow-sm border border-app-border"
                      : "text-stone-400 hover:text-stone-100 hover:bg-app-surface"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-app-orange" : "text-stone-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-app-orange text-app-bg"
                          : "bg-app-border text-stone-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Widgets */}
      <div className="p-4 space-y-3 border-t border-app-border bg-app-surface/40">
        {/* Quick Timers Widget */}
        <button
          type="button"
          onClick={onOpenTimers}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-app-surface border border-app-border hover:bg-app-elevated transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Timer
              className={`w-4 h-4 ${
                runningTimers > 0
                  ? "text-app-orange animate-spin"
                  : "text-stone-500"
              }`}
            />
            <div>
              <p className="text-xs font-semibold text-stone-200">
                {runningTimers > 0
                  ? `${runningTimers} Active Timer${runningTimers > 1 ? "s" : ""}`
                  : "Kitchen Timers"}
              </p>
            </div>
          </div>
          {runningTimers > 0 && (
            <span className="w-2.5 h-2.5 rounded-full bg-app-green animate-pulse" />
          )}
        </button>

        {/* Allergy Reminder Note */}
        <div className="p-2.5 rounded-xl bg-app-surface/60 border border-app-border flex gap-2 text-stone-400">
          <Info className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
          <p className="text-[10px] leading-tight text-stone-400">
            Allergy reminder: Always verify physical labels before cooking.
          </p>
        </div>
      </div>
    </aside>
  );
}
