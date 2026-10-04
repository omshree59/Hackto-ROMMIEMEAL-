"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Roommate,
  Meal,
  MealPlanWeek,
  ShoppingItem,
  PantryItem,
  MealHistoryRecord,
  CookingTimer,
  MealVotePoll,
} from "@/types";
import { MEALS_DATABASE } from "@/data/meals";

export interface HouseholdContextType {
  // Household & Roommates
  householdName: string;
  setHouseholdName: (name: string) => void;
  roommates: Roommate[];
  activeRoommate: Roommate | null;
  setActiveRoommateId: (id: string) => void;
  addRoommate: (roommate: Omit<Roommate, "id">) => void;
  updateRoommate: (id: string, updates: Partial<Roommate>) => void;
  deleteRoommate: (id: string) => void;

  // Meals Database
  meals: Meal[];
  addCustomMeal: (meal: Omit<Meal, "id">) => void;
  deleteCustomMeal: (id: string) => void;
  favorites: string[]; // mealId[]
  toggleFavorite: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;

  // Weekly Planner
  weeklyPlan: MealPlanWeek;
  setMealForDay: (dateKey: string, slot: "breakfast" | "lunch" | "dinner", mealId?: string) => void;
  clearMealSlot: (dateKey: string, slot: "breakfast" | "lunch" | "dinner") => void;
  clearEntireWeekPlan: () => void;
  generateShoppingListFromPlan: () => void;

  // Tonight's Selection
  tonightMealId: string | null;
  setTonightMealId: (mealId: string | null) => void;

  // Shopping List
  shoppingList: ShoppingItem[];
  addShoppingItem: (item: Omit<ShoppingItem, "id" | "createdAt" | "checked">) => void;
  toggleShoppingItem: (id: string) => void;
  assignShoppingItem: (id: string, roommateId?: string) => void;
  removeShoppingItem: (id: string) => void;
  clearCompletedShoppingItems: () => void;

  // Pantry
  pantryItems: PantryItem[];
  addPantryItem: (item: Omit<PantryItem, "id" | "addedAt">) => void;
  removePantryItem: (id: string) => void;
  updatePantryItem: (id: string, updates: Partial<PantryItem>) => void;

  // Meal History
  mealHistory: MealHistoryRecord[];
  recordMealCooked: (mealId: string, servings?: number, notes?: string) => void;

  // Voting
  activePoll: MealVotePoll | null;
  startVotingPoll: (candidateMealIds: string[]) => void;
  castVote: (roommateId: string, mealId: string) => void;
  closeVotingPoll: () => void;

  // Cooking Timers
  timers: CookingTimer[];
  addTimer: (label: string, durationMinutes: number) => void;
  toggleTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  removeTimer: (id: string) => void;

  // Active cooking mode
  activeCookingMeal: Meal | null;
  setActiveCookingMeal: (meal: Meal | null) => void;

  // UI Theme & Offline Status
  darkMode: boolean;
  toggleDarkMode: () => void;
  isOffline: boolean;
  
}

const DEFAULT_ROOMMATES: Roommate[] = [];

const DEFAULT_PANTRY: PantryItem[] = [];

const DEFAULT_SHOPPING: ShoppingItem[] = [];

const STORAGE_KEYS = {
  HOUSEHOLD_NAME: "roomiemeal_household_name_v2",
  ROOMMATES: "roomiemeal_roommates_v2",
  ACTIVE_ROOMMATE_ID: "roomiemeal_active_roommate_id_v2",
  FAVORITES: "roomiemeal_favorites_v2",
  WEEKLY_PLAN: "roomiemeal_weekly_plan_v2",
  TONIGHT_MEAL_ID: "roomiemeal_tonight_meal_id_v2",
  SHOPPING_LIST: "roomiemeal_shopping_list_v2",
  PANTRY_ITEMS: "roomiemeal_pantry_items_v2",
  MEAL_HISTORY: "roomiemeal_meal_history_v2",
  POLL: "roomiemeal_active_poll_v2",
  DARK_MODE: "roomiemeal_dark_mode_v2",
  CUSTOM_MEALS: "roomiemeal_custom_meals_v2",
};

const HouseholdContext = createContext<HouseholdContextType | undefined>(undefined);

export function HouseholdProvider({ children }: { children: React.ReactNode }) {
  const [householdName, setHouseholdName] = useState<string>("My Kitchen");
  const [roommates, setRoommates] = useState<Roommate[]>(DEFAULT_ROOMMATES);
  const [customMeals, setCustomMeals] = useState<Meal[]>([]);
  const [activeRoommateId, setActiveRoommateId] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<MealPlanWeek>({});
  const [tonightMealId, setTonightMealId] = useState<string | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(DEFAULT_SHOPPING);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(DEFAULT_PANTRY);
  const [mealHistory, setMealHistory] = useState<MealHistoryRecord[]>([]);
  const [activePoll, setActivePoll] = useState<MealVotePoll | null>(null);

  const [timers, setTimers] = useState<CookingTimer[]>([]);

  const [activeCookingMeal, setActiveCookingMeal] = useState<Meal | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedName = localStorage.getItem(STORAGE_KEYS.HOUSEHOLD_NAME);
      if (savedName) setHouseholdName(savedName);

      const savedRoommates = localStorage.getItem(STORAGE_KEYS.ROOMMATES);
      if (savedRoommates) setRoommates(JSON.parse(savedRoommates));

      const savedActiveId = localStorage.getItem(STORAGE_KEYS.ACTIVE_ROOMMATE_ID);
      if (savedActiveId) setActiveRoommateId(savedActiveId);

      const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

      const savedPlan = localStorage.getItem(STORAGE_KEYS.WEEKLY_PLAN);
      if (savedPlan) setWeeklyPlan(JSON.parse(savedPlan));

      const savedTonight = localStorage.getItem(STORAGE_KEYS.TONIGHT_MEAL_ID);
      if (savedTonight) setTonightMealId(savedTonight);

      const savedShopping = localStorage.getItem(STORAGE_KEYS.SHOPPING_LIST);
      if (savedShopping) setShoppingList(JSON.parse(savedShopping));

      const savedPantry = localStorage.getItem(STORAGE_KEYS.PANTRY_ITEMS);
      if (savedPantry) setPantryItems(JSON.parse(savedPantry));

      const savedHistory = localStorage.getItem(STORAGE_KEYS.MEAL_HISTORY);
      if (savedHistory) setMealHistory(JSON.parse(savedHistory));

      const savedPoll = localStorage.getItem(STORAGE_KEYS.POLL);
      if (savedPoll) setActivePoll(JSON.parse(savedPoll));

      const savedCustomMeals = localStorage.getItem(STORAGE_KEYS.CUSTOM_MEALS);
      if (savedCustomMeals) setCustomMeals(JSON.parse(savedCustomMeals));

      const savedDark = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
      if (savedDark !== null) {
        const isDark = JSON.parse(savedDark);
        setDarkMode(isDark);
        if (isDark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      } else {
        // System preference
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setDarkMode(true);
          document.documentElement.classList.add("dark");
        }
      }
    } catch (e) {
      console.warn("Could not read from localStorage, using in-memory defaults.", e);
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOffline(!navigator.onLine);

    setHydrated(true);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.HOUSEHOLD_NAME, householdName);
      localStorage.setItem(STORAGE_KEYS.ROOMMATES, JSON.stringify(roommates));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ROOMMATE_ID, activeRoommateId);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      localStorage.setItem(STORAGE_KEYS.WEEKLY_PLAN, JSON.stringify(weeklyPlan));
      if (tonightMealId) localStorage.setItem(STORAGE_KEYS.TONIGHT_MEAL_ID, tonightMealId);
      else localStorage.removeItem(STORAGE_KEYS.TONIGHT_MEAL_ID);
      localStorage.setItem(STORAGE_KEYS.SHOPPING_LIST, JSON.stringify(shoppingList));
      localStorage.setItem(STORAGE_KEYS.PANTRY_ITEMS, JSON.stringify(pantryItems));
      localStorage.setItem(STORAGE_KEYS.MEAL_HISTORY, JSON.stringify(mealHistory));
      if (activePoll) localStorage.setItem(STORAGE_KEYS.POLL, JSON.stringify(activePoll));
      else localStorage.removeItem(STORAGE_KEYS.POLL);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_MEALS, JSON.stringify(customMeals));
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(darkMode));
    } catch (e) {
      console.warn("Failed saving to localStorage", e);
    }
  }, [
    hydrated,
    householdName,
    roommates,
    activeRoommateId,
    favorites,
    weeklyPlan,
    tonightMealId,
    shoppingList,
    pantryItems,
    mealHistory,
    activePoll,
    darkMode,
    customMeals,
  ]);

  // Timers countdown interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (!timer.isRunning) return timer;
          if (timer.remainingSeconds <= 1) {
            return {
              ...timer,
              remainingSeconds: 0,
              isRunning: false,
              isFinished: true,
            };
          }
          return {
            ...timer,
            remainingSeconds: timer.remainingSeconds - 1,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const activeRoommate = roommates.find((r) => r.id === activeRoommateId) || roommates[0] || null;

  // Actions
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return next;
    });
  };

  const addRoommate = (newRm: Omit<Roommate, "id">) => {
    const id = `rm-${Date.now()}`;
    const created: Roommate = { ...newRm, id };
    setRoommates((prev) => [...prev, created]);
    setActiveRoommateId(id);
  };

  const updateRoommate = (id: string, updates: Partial<Roommate>) => {
    setRoommates((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteRoommate = (id: string) => {
    setRoommates((prev) => prev.filter((r) => r.id !== id));
    if (activeRoommateId === id && roommates.length > 1) {
      const remaining = roommates.filter((r) => r.id !== id);
      setActiveRoommateId(remaining[0]?.id || "");
    }
  };

  const toggleFavorite = (mealId: string) => {
    setFavorites((prev) =>
      prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]
    );
  };

  const isFavorite = (mealId: string) => favorites.includes(mealId);

  const setMealForDay = (dateKey: string, slot: "breakfast" | "lunch" | "dinner", mealId?: string) => {
    setWeeklyPlan((prev) => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] || {}),
        [slot]: mealId,
      },
    }));
  };

  const clearMealSlot = (dateKey: string, slot: "breakfast" | "lunch" | "dinner") => {
    setWeeklyPlan((prev) => {
      const day = { ...(prev[dateKey] || {}) };
      delete day[slot];
      return { ...prev, [dateKey]: day };
    });
  };

  const clearEntireWeekPlan = () => {
    setWeeklyPlan({});
  };

  const generateShoppingListFromPlan = () => {
    const plannedMealIds = new Set<string>();
    Object.values(weeklyPlan).forEach((day) => {
      if (day.breakfast) plannedMealIds.add(day.breakfast);
      if (day.lunch) plannedMealIds.add(day.lunch);
      if (day.dinner) plannedMealIds.add(day.dinner);
    });

    const newItems: ShoppingItem[] = [];
    plannedMealIds.forEach((mealId) => {
      const meal = MEALS_DATABASE.find((m) => m.id === mealId);
      if (!meal) return;
      meal.ingredients.forEach((ing) => {
        // Map category
        let cat: ShoppingItem["category"] = "Produce";
        if (ing.category === "protein") cat = "Protein";
        else if (ing.category === "dairy") cat = "Dairy & Alt";
        else if (ing.category === "grains") cat = "Grains & Pasta";
        else if (ing.category === "spices") cat = "Spices & Sauces";
        else if (ing.category === "pantry") cat = "Pantry & Oils";
        else if (ing.category === "frozen") cat = "Frozen";

        // Assign to a random roommate or round-robin
        const randomRoommate = roommates[Math.floor(Math.random() * roommates.length)]?.id;

        newItems.push({
          id: `shop-${meal.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: ing.name,
          category: cat,
          amount: ing.amount,
          checked: false,
          assignedRoommateId: randomRoommate,
          mealOriginName: meal.name,
          createdAt: new Date().toISOString().split("T")[0],
        });
      });
    });

    setShoppingList((prev) => [...prev, ...newItems]);
  };

  const addShoppingItem = (item: Omit<ShoppingItem, "id" | "createdAt" | "checked">) => {
    const newItem: ShoppingItem = {
      ...item,
      id: `custom-${Date.now()}`,
      checked: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setShoppingList((prev) => [newItem, ...prev]);
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const assignShoppingItem = (id: string, roommateId?: string) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, assignedRoommateId: roommateId } : item))
    );
  };

  const removeShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompletedShoppingItems = () => {
    setShoppingList((prev) => prev.filter((item) => !item.checked));
  };

  const addPantryItem = (item: Omit<PantryItem, "id" | "addedAt">) => {
    const newItem: PantryItem = {
      ...item,
      id: `pantry-${Date.now()}`,
      addedAt: new Date().toISOString().split("T")[0],
    };
    setPantryItems((prev) => [newItem, ...prev]);
  };

  const removePantryItem = (id: string) => {
    setPantryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updatePantryItem = (id: string, updates: Partial<PantryItem>) => {
    setPantryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const recordMealCooked = (mealId: string, servings = 4, notes?: string) => {
    const meal = allMeals.find((m) => m.id === mealId);
    if (!meal) return;
    const record: MealHistoryRecord = {
      id: `hist-${Date.now()}`,
      mealId,
      mealName: meal.name,
      cookedAt: new Date().toISOString(),
      servingsCooked: servings,
      rating: 5,
      notes,
    };
    setMealHistory((prev) => [record, ...prev]);
    setTonightMealId(mealId);

    // Auto-deduct matching pantry items when a meal is cooked
    setPantryItems((prev) =>
      prev
        .map((p) => {
          const matchesMealIng = meal.ingredients.some(
            (ing) =>
              ing.name.toLowerCase().includes(p.name.toLowerCase()) ||
              p.name.toLowerCase().includes(ing.name.toLowerCase())
          );
          if (matchesMealIng) {
            const currentQty = parseFloat(p.quantity) || 1;
            const newQty = Math.max(0, currentQty - 1);
            return { ...p, quantity: newQty.toString() };
          }
          return p;
        })
        .filter((p) => parseFloat(p.quantity) > 0)
    );
  };

  const startVotingPoll = (candidateMealIds: string[]) => {
    setActivePoll({
      id: `poll-${Date.now()}`,
      createdAt: new Date().toISOString(),
      active: true,
      candidateMealIds,
      votes: {},
    });
  };

  const castVote = (roommateId: string, mealId: string) => {
    if (!activePoll) return;
    setActivePoll((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        votes: {
          ...prev.votes,
          [roommateId]: mealId,
        },
      };
    });
  };

  const closeVotingPoll = () => {
    if (!activePoll) return;
    // Find winner
    const counts: { [mealId: string]: number } = {};
    Object.values(activePoll.votes).forEach((mealId) => {
      counts[mealId] = (counts[mealId] || 0) + 1;
    });
    let maxVotes = -1;
    let winnerId = activePoll.candidateMealIds[0];
    Object.entries(counts).forEach(([mId, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        winnerId = mId;
      }
    });

    setTonightMealId(winnerId);
    setActivePoll(null);
  };

  const addTimer = (label: string, durationMinutes: number) => {
    const seconds = Math.max(1, durationMinutes * 60);
    const newTimer: CookingTimer = {
      id: `timer-${Date.now()}`,
      label: label.trim() || "Cooking Timer",
      durationSeconds: seconds,
      remainingSeconds: seconds,
      isRunning: true,
      isFinished: false,
    };
    setTimers((prev) => [newTimer, ...prev]);
  };

  const toggleTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRunning: !t.isRunning } : t))
    );
  };

  const resetTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              remainingSeconds: t.durationSeconds,
              isRunning: false,
              isFinished: false,
            }
          : t
      )
    );
  };

  const removeTimer = (id: string) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  };

  const addCustomMeal = (newMealData: Omit<Meal, "id">) => {
    const newMeal: Meal = {
      ...newMealData,
      id: `custom-${Date.now()}`,
    };
    setCustomMeals((prev) => [newMeal, ...prev]);
  };

  const deleteCustomMeal = (id: string) => {
    setCustomMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const allMeals = [...customMeals, ...MEALS_DATABASE];

  return (
    <HouseholdContext.Provider
      value={{
        householdName,
        setHouseholdName,
        roommates,
        activeRoommate,
        setActiveRoommateId,
        addRoommate,
        updateRoommate,
        deleteRoommate,
        meals: allMeals,
        addCustomMeal,
        deleteCustomMeal,
        favorites,
        toggleFavorite,
        isFavorite,
        weeklyPlan,
        setMealForDay,
        clearMealSlot,
        clearEntireWeekPlan,
        generateShoppingListFromPlan,
        tonightMealId,
        setTonightMealId,
        shoppingList,
        addShoppingItem,
        toggleShoppingItem,
        assignShoppingItem,
        removeShoppingItem,
        clearCompletedShoppingItems,
        pantryItems,
        addPantryItem,
        removePantryItem,
        updatePantryItem,
        mealHistory,
        recordMealCooked,
        activePoll,
        startVotingPoll,
        castVote,
        closeVotingPoll,
        timers,
        addTimer,
        toggleTimer,
        resetTimer,
        removeTimer,
        activeCookingMeal,
        setActiveCookingMeal,
        darkMode,
        toggleDarkMode,
        isOffline,
              }}
    >
      {children}
    </HouseholdContext.Provider>
  );
}

export function useHousehold() {
  const context = useContext(HouseholdContext);
  if (!context) {
    throw new Error("useHousehold must be used within a HouseholdProvider");
  }
  return context;
}
