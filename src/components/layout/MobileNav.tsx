"use client";

import React from "react";
import {
  LayoutDashboard,
  Search,
  CalendarDays,
  ShoppingBag,
  Users,
  Sparkles,
} from "lucide-react";
import { useHousehold } from "@/context/HouseholdContext";

interface MobileNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenWhatCanWeEat: () => void;
}

export function MobileNav({
  currentView,
  setCurrentView,
  onOpenWhatCanWeEat,
}: MobileNavProps) {
  const { shoppingList } = useHousehold();
  const uncompleted = shoppingList.filter((i) => !i.checked).length;

  const navItems = [
    { id: "dashboard", label: "Home", Icon: LayoutDashboard },
    { id: "discover", label: "Meals", Icon: Search },
    { id: "planner", label: "Plan", Icon: CalendarDays },
    { id: "shopping", label: "Groceries", Icon: ShoppingBag },
    { id: "roommates", label: "Household", Icon: Users },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-app-bg/95 backdrop-blur-md border-t border-app-border px-2 py-1.5 flex items-center justify-around shadow-lg">
      {navItems.map(({ id, label, Icon }, index) => {
        if (index === 2) {
          return (
            <React.Fragment key="center-group">
              <button
                onClick={onOpenWhatCanWeEat}
                className="-mt-5 p-3 rounded-full bg-gradient-to-tr from-app-orange to-app-yellow text-white shadow-lg shadow-app-orange/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                title="What can we eat?"
              >
                <Sparkles className="w-5 h-5" />
              </button>
              <button
                key={id}
                onClick={() => setCurrentView(id)}
                className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
                  currentView === id
                    ? "text-app-orange"
                    : "text-stone-500"
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span>{label}</span>
              </button>
            </React.Fragment>
          );
        }
        return (
          <button
            key={id}
            onClick={() => setCurrentView(id)}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors relative ${
              currentView === id
                ? "text-app-orange"
                : "text-stone-500"
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span>{label}</span>
            {id === "shopping" && uncompleted > 0 && (
              <span className="absolute top-0.5 right-1 px-1 min-w-[14px] h-[14px] rounded-full text-[9px] font-bold bg-app-orange text-white flex items-center justify-center">
                {uncompleted}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
