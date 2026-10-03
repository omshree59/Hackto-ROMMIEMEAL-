"use client";

import React, { useState } from "react";
import { useHousehold } from "@/context/HouseholdContext";
import { Meal } from "@/types";

// Layout components
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

// Views
import { LandingPage } from "@/components/landing/LandingPage";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { MealDiscoveryView } from "@/components/meals/MealDiscoveryView";
import { WeeklyPlannerView } from "@/components/planner/WeeklyPlannerView";
import { ShoppingListView } from "@/components/shopping/ShoppingListView";
import { PantryView } from "@/components/pantry/PantryView";
import { RoommatesView } from "@/components/roommates/RoommatesView";
import { FavoritesHistoryView } from "@/components/history/FavoritesHistoryView";

// Modals
import { MealDetailModal } from "@/components/meals/MealDetailModal";
import { WhatCanWeEatModal } from "@/components/what-can-we-eat/WhatCanWeEatModal";
import { CookingModeModal } from "@/components/cooking/CookingModeModal";
import { VotingModal } from "@/components/voting/VotingModal";
import { GlobalSearchModal } from "@/components/common/GlobalSearchModal";
import { TimersModal } from "@/components/cooking/TimersModal";

export default function Home() {
  const { activeCookingMeal, setActiveCookingMeal, setMealForDay } = useHousehold();

  // Navigation state
  const [currentView, setCurrentView] = useState<string>("dashboard");

  // Selected meal for detail modal
  const [selectedMealForDetail, setSelectedMealForDetail] = useState<Meal | null>(null);

  // Modal visibility states
  const [isWhatCanWeEatOpen, setIsWhatCanWeEatOpen] = useState(false);
  const [isVotingOpen, setIsVotingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTimersOpen, setIsTimersOpen] = useState(false);

  const handleSelectMeal = (meal: Meal) => {
    setSelectedMealForDetail(meal);
  };

  const handleStartCooking = (meal: Meal) => {
    setActiveCookingMeal(meal);
  };

  const handlePlanMeal = (meal: Meal) => {
    const today = new Date().toISOString().split("T")[0];
    setMealForDay(today, "dinner", meal.id);
    setCurrentView("planner");
  };

  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-stone-100 transition-colors relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-app-orange/5 blur-[120px] animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-app-yellow/5 blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-app-green/5 blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenVoting={() => setIsVotingOpen(true)}
          onAddRoommate={() => setCurrentView("roommates")}
        />

      {/* Main Layout Area */}
      {currentView === "landing" ? (
        <main className="flex-1">
          <LandingPage
            onStartPlanning={() => setCurrentView("dashboard")}
            onExploreRoommates={() => setCurrentView("roommates")}
            onSelectMeal={handleSelectMeal}
          />
        </main>
      ) : (
        <div className="flex-1 w-full relative">
          {/* Desktop Sidebar */}
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            onOpenWhatCanWeEat={() => setIsWhatCanWeEatOpen(true)}
            onOpenTimers={() => setIsTimersOpen(true)}
          />

          {/* Primary View Container */}
          <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 lg:ml-[250px] min-w-0 pb-24 lg:pb-8 relative z-10 pointer-events-auto">
            <div className="max-w-5xl mx-auto">
              {currentView === "dashboard" && (
                <DashboardView
                  onNavigate={setCurrentView}
                  onOpenWhatCanWeEat={() => setIsWhatCanWeEatOpen(true)}
                  onSelectMeal={handleSelectMeal}
                  onOpenVoting={() => setIsVotingOpen(true)}
                />
              )}

              {currentView === "discover" && (
                <MealDiscoveryView onSelectMeal={handleSelectMeal} />
              )}

              {currentView === "planner" && (
                <WeeklyPlannerView
                  onSelectMeal={handleSelectMeal}
                  onNavigateToShopping={() => setCurrentView("shopping")}
                />
              )}

              {currentView === "shopping" && <ShoppingListView />}

              {currentView === "pantry" && (
                <PantryView onSelectMeal={handleSelectMeal} />
              )}

              {currentView === "roommates" && <RoommatesView />}

              {currentView === "favorites" && (
                <FavoritesHistoryView onSelectMeal={handleSelectMeal} />
              )}

              {/* FOOTER */}
              <footer className="mt-16 pt-8 border-t border-app-border text-center flex flex-col items-center justify-center space-y-4">
                <p className="text-sm text-stone-500">Built with ♥️ by the RoomieMeal team.</p>
                <a href="https://github.com/your-username/roomiemeal" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-app-surface border border-app-border text-stone-300 hover:text-white hover:bg-app-elevated transition-colors text-sm font-medium">
                   <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                   Star on GitHub
                </a>
              </footer>
            </div>
          </main>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenWhatCanWeEat={() => setIsWhatCanWeEatOpen(true)}
      />

      {/* Global Modals */}
      {/* 1. Meal Detail View */}
      <MealDetailModal
        meal={selectedMealForDetail}
        onClose={() => setSelectedMealForDetail(null)}
        onStartCooking={handleStartCooking}
        onPlanMeal={handlePlanMeal}
      />

      {/* 2. What Can We Eat Scanner */}
      <WhatCanWeEatModal
        isOpen={isWhatCanWeEatOpen}
        onClose={() => setIsWhatCanWeEatOpen(false)}
        onSelectMeal={handleSelectMeal}
      />

      {/* 3. Hands-Free Cooking Mode */}
      <CookingModeModal
        meal={activeCookingMeal}
        onClose={() => setActiveCookingMeal(null)}
      />

      {/* 4. Roommate Voting Poll */}
      <VotingModal
        isOpen={isVotingOpen}
        onClose={() => setIsVotingOpen(false)}
        onSelectMeal={handleSelectMeal}
      />

      {/* 5. Global Search */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectMeal={handleSelectMeal}
        onSelectRoommateView={() => setCurrentView("roommates")}
      />

      {/* 6. Kitchen Multi-Timers Manager */}
      <TimersModal
        isOpen={isTimersOpen}
        onClose={() => setIsTimersOpen(false)}
      />
      </div>
    </div>
  );
}
