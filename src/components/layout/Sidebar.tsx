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
  Github
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
        { id: "roommates", label: "Household Data", icon: Users, badge: `${roommates.length}` },
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
    <aside className="w-[250px] shrink-0 hidden lg:flex flex-col fixed left-0 top-16 bottom-0 border-r border-app-border bg-app-surface/60 backdrop-blur-md text-stone-300 z-30">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 relative z-20">
        
        {/* Categories */}
        {categories.map((category) => (
          <div key={category.title} className="space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
              {category.title}
            </p>
            {category.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-app-elevated text-white"
                      : "text-stone-400 hover:text-stone-200 hover:bg-app-surface relative z-30"
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? "text-app-orange"
                          : "text-stone-500"
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

      <div className="p-4 space-y-4 bg-transparent border-t border-app-border relative z-20">
        {/* Quick Timers Widget in Sidebar */}
        <button
          onClick={onOpenTimers}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-app-surface border border-app-border hover:bg-app-elevated transition-colors text-left relative z-30"
          style={{ pointerEvents: 'auto' }}
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
                  : "Timers"}
              </p>
            </div>
          </div>
          {runningTimers > 0 && (
            <span className="w-2.5 h-2.5 rounded-full bg-app-green animate-pulse" />
          )}
        </button>

        {/* Allergy Reminder */}
        <div className="p-3 rounded-xl bg-app-surface/50 border border-app-border flex gap-2 text-stone-400">
          <Info className="w-4 h-4 text-stone-500 shrink-0" />
          <p className="text-[10px] leading-tight">
            Allergy reminder: Always check physical labels before cooking.
          </p>
        </div>
      </div>
    </aside>
  );
}
