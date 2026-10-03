"use client";

import React, { useState } from "react";
import { useHousehold } from "@/context/HouseholdContext";
import {
  UtensilsCrossed,
  Search,
  RotateCcw,
  ChevronDown,
  UserCheck,
  Plus,
  Home,
  Menu,
  X,
  Vote,
  Calendar,
  ShoppingBag,
  Users,
  LayoutDashboard,
} from "lucide-react";

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenSearch: () => void;
  onOpenVoting: () => void;
  onAddRoommate: () => void;
}

export function Navbar({
  currentView,
  setCurrentView,
  onOpenSearch,
  onOpenVoting,
  onAddRoommate,
}: NavbarProps) {
  const {
    roommates,
    activeRoommate,
    setActiveRoommateId,
    resetToDemoData,
    timers,
  } = useHousehold();

  const [showRoommateMenu, setShowRoommateMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-app-border bg-app-surface/60 backdrop-blur-xl transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md shadow-app-orange/20 group-hover:scale-105 transition-transform relative overflow-hidden">
              <img src="/logo.jpg" alt="RoomieMeal" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-stone-100 tracking-tight">
                  RoomieMeal
                </span>
              </div>
              <p className="text-[11px] text-stone-500 -mt-0.5 hidden sm:block">
                One kitchen. Everyone feels safe.
              </p>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-3 flex-1 justify-end">
          <button
            onClick={onOpenSearch}
            className="hidden lg:flex items-center justify-between w-64 px-4 py-2 bg-app-surface hover:bg-app-elevated border border-app-border rounded-xl text-sm text-stone-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-stone-500" />
              <span>Search recipes...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-stone-500 bg-app-bg border border-app-border rounded uppercase">
              <span className="text-xs">⌘</span> K
            </kbd>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowRoommateMenu(!showRoommateMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-app-surface hover:bg-app-elevated border border-app-border rounded-xl transition-colors"
            >
              <div className="text-left hidden sm:flex flex-col">
                <span className="text-[10px] font-medium text-stone-500 uppercase tracking-wider leading-none mb-1">Planning for</span>
                <span className="text-xs font-semibold text-stone-200 leading-none flex items-center gap-1">
                  {activeRoommate ? activeRoommate.name : "Entire Household"}
                  <ChevronDown className="w-3 h-3 text-stone-500" />
                </span>
              </div>
            </button>

            {showRoommateMenu && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-app-elevated shadow-2xl border border-app-border p-2 z-50"
                onClick={() => setShowRoommateMenu(false)}
              >
                <div className="px-3 py-2 border-b border-app-border">
                  <p className="text-xs font-bold text-stone-200">
                    Switch Active Roommate
                  </p>
                  <p className="text-[10px] text-stone-500">
                    Personalizes dish compatibility warnings
                  </p>
                </div>

                <div className="py-1 space-y-1">
                  {roommates.map((rm) => (
                    <button
                      key={rm.id}
                      onClick={() => setActiveRoommateId(rm.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                        activeRoommate?.id === rm.id
                          ? "bg-app-orange/10 text-app-orange font-semibold border border-app-orange/20"
                          : "hover:bg-app-surface text-stone-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{rm.avatar}</span>
                        <div>
                          <p className="font-semibold leading-tight">{rm.name}</p>
                          <p className="text-[10px] text-stone-500">
                            {rm.allergies.length > 0
                              ? `Allergies: ${rm.allergies.join(", ")}`
                              : rm.intolerances.length > 0
                              ? `Intolerances: ${rm.intolerances.join(", ")}`
                              : "No listed restrictions"}
                          </p>
                        </div>
                      </div>
                      {activeRoommate?.id === rm.id && (
                        <UserCheck className="w-4 h-4 text-app-orange" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-app-border">
                  <button
                    onClick={() => {
                      onAddRoommate();
                      setShowRoommateMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-app-orange hover:bg-app-orange/10 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add new roommate</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenVoting}
            className="p-2 text-stone-400 hover:text-app-yellow hover:bg-app-surface rounded-xl transition-colors relative"
            title="Tonight's Roommate Voting"
          >
            <Vote className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-app-yellow" />
          </button>

          <button
            onClick={() => {
              if (confirm("Reset to default demo data for Alex, Maya, Sam, and Omshree?")) {
                resetToDemoData();
              }
            }}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 text-[11px] text-stone-500 hover:text-stone-200 hover:bg-app-surface rounded-lg transition-colors"
            title="Reset to default mock household"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 text-stone-300 hover:bg-app-surface rounded-xl"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="lg:hidden border-t border-app-border bg-app-surface px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {[
            { id: "dashboard", label: "Kitchen Dashboard", Icon: LayoutDashboard },
            { id: "discover", label: "Browse Meals", Icon: Search },
            { id: "planner", label: "Weekly Planner", Icon: Calendar },
            { id: "shopping", label: "Shopping List", Icon: ShoppingBag },
            { id: "roommates", label: "Household Profiles", Icon: Users },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => {
                setCurrentView(id);
                setShowMobileMenu(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === id
                  ? "bg-app-orange/10 text-app-orange border border-app-orange/20"
                  : "text-stone-400 hover:text-stone-200 hover:bg-app-elevated"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                resetToDemoData();
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-stone-500 bg-app-bg border border-app-border rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Demo Data</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
