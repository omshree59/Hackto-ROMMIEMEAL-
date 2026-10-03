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
    <div className="min-h-screen flex flex-col bg-app-bg text-stone-100 transition-colors">
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
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex gap-8">
          {/* Desktop Sidebar */}
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            onOpenWhatCanWeEat={() => setIsWhatCanWeEatOpen(true)}
            onOpenTimers={() => setIsTimersOpen(true)}
          />

          {/* Primary View Container */}
          <main className="flex-1 py-8 overflow-x-hidden min-w-0">
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
  );
}
