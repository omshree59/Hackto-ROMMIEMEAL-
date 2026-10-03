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
  resetToDemoData: () => void;
}

const DEFAULT_ROOMMATES: Roommate[] = [
  {
    id: "alex-01",
    name: "Alex",
    avatar: "🥑",
    color: "#f97316",
    role: "The Protein Chef",
    allergies: ["peanuts", "tree_nuts"],
    intolerances: [],
    dislikes: [],
    preferences: ["High-Protein"],
    favoriteCuisines: ["Mexican", "American"],
    cookingSkill: "intermediate",
    notes: "Severe peanut allergy (carries EpiPen). Please keep peanut products off main cutting boards."
  },
  {
    id: "maya-02",
    name: "Maya",
    avatar: "🌱",
    color: "#10b981",
    role: "Plant Lover",
    allergies: [],
    intolerances: ["dairy"],
    dislikes: [],
    preferences: ["Vegetarian"],
    favoriteCuisines: ["Italian", "Indian"],
    cookingSkill: "enthusiast",
    notes: "Lactose intolerant & vegetarian. Loves plant-based milk and pasta sauces."
  },
  {
    id: "sam-03",
    name: "Sam",
    avatar: "🍜",
    color: "#8b5cf6",
    role: "Noodle Fanatic",
    allergies: [],
    intolerances: [],
    dislikes: ["mushrooms"],
    preferences: [],
    favoriteCuisines: ["Asian", "Japanese"],
    cookingSkill: "beginner",
    notes: "Dislikes all mushrooms. Always down for quick noodle bowls."
  },
  {
    id: "omshree-04",
    name: "Omshree",
    avatar: "🍛",
    color: "#3b82f6",
    role: "Curry Master",
    allergies: [],
    intolerances: [],
    dislikes: [],
    preferences: [],
    favoriteCuisines: ["Indian", "Mediterranean"],
    cookingSkill: "chef",
    notes: "No restrictions. Loves rich spice blends and batch cooking."
  }
];

const DEFAULT_PANTRY: PantryItem[] = [
  { id: "p1", name: "Basmati Rice", category: "Grains", quantity: "2", unit: "bags", addedAt: "2026-10-01" },
  { id: "p2", name: "Chickpeas (canned)", category: "Protein", quantity: "4", unit: "cans", addedAt: "2026-10-01" },
  { id: "p3", name: "Coconut Milk", category: "Pantry", quantity: "3", unit: "cans", addedAt: "2026-10-01" },
  { id: "p4", name: "Extra Virgin Olive Oil", category: "Pantry", quantity: "1", unit: "bottle", addedAt: "2026-10-01" },
  { id: "p5", name: "Garlic", category: "Produce", quantity: "2", unit: "heads", addedAt: "2026-10-02" },
  { id: "p6", name: "Yellow Onions", category: "Produce", quantity: "5", unit: "pcs", addedAt: "2026-10-02" },
  { id: "p7", name: "Baby Spinach", category: "Produce", quantity: "1", unit: "box", addedAt: "2026-10-03" },
  { id: "p8", name: "Diced Tomatoes", category: "Produce", quantity: "3", unit: "cans", addedAt: "2026-10-01" },
  { id: "p9", name: "Rolled Oats", category: "Grains", quantity: "1", unit: "tub", addedAt: "2026-10-01" },
  { id: "p10", name: "Black Beans", category: "Protein", quantity: "3", unit: "cans", addedAt: "2026-10-02" },
];

const DEFAULT_SHOPPING: ShoppingItem[] = [
  {
    id: "s1",
    name: "Baby Spinach (Large tub)",
    category: "Produce",
    amount: "1 tub (16 oz)",
    checked: false,
    assignedRoommateId: "maya-02",
    mealOriginName: "Golden Chickpea & Spinach Curry",
    createdAt: "2026-10-03"
  },
  {
    id: "s2",
    name: "Full-fat Coconut Milk",
    category: "Pantry & Oils",
    amount: "2 cans",
    checked: true,
    assignedRoommateId: "alex-01",
    mealOriginName: "Golden Chickpea & Spinach Curry",
    createdAt: "2026-10-03"
  },
  {
    id: "s3",
    name: "Brown Rice Rigatoni (Gluten-Free)",
    category: "Grains & Pasta",
    amount: "2 boxes",
    checked: false,
    assignedRoommateId: "omshree-04",
    mealOriginName: "Rich Umami Lentil Bolognese",
    createdAt: "2026-10-03"
  },
  {
    id: "s4",
    name: "Fresh Limes & Cilantro",
    category: "Produce",
    amount: "4 limes, 1 bunch cilantro",
    checked: false,
    assignedRoommateId: "sam-03",
    mealOriginName: "Fiesta Lime Chicken Fajita Bowl",
    createdAt: "2026-10-03"
  },
  {
    id: "s5",
    name: "Extra Firm Organic Tofu",
    category: "Protein",
    amount: "2 blocks",
    checked: false,
    assignedRoommateId: "maya-02",
    isCustom: true,
    createdAt: "2026-10-03"
  }
];

const STORAGE_KEYS = {
  HOUSEHOLD_NAME: "roomiemeal_household_name_v1",
  ROOMMATES: "roomiemeal_roommates_v1",
  ACTIVE_ROOMMATE_ID: "roomiemeal_active_roommate_id_v1",
  FAVORITES: "roomiemeal_favorites_v1",
  WEEKLY_PLAN: "roomiemeal_weekly_plan_v1",
  TONIGHT_MEAL_ID: "roomiemeal_tonight_meal_id_v1",
  SHOPPING_LIST: "roomiemeal_shopping_list_v1",
  PANTRY_ITEMS: "roomiemeal_pantry_items_v1",
  MEAL_HISTORY: "roomiemeal_meal_history_v1",
  POLL: "roomiemeal_active_poll_v1",
  DARK_MODE: "roomiemeal_dark_mode_v1",
};

const HouseholdContext = createContext<HouseholdContextType | undefined>(undefined);

export function HouseholdProvider({ children }: { children: React.ReactNode }) {
  const [householdName, setHouseholdName] = useState<string>("79 Maple Street Kitchen");
  const [roommates, setRoommates] = useState<Roommate[]>(DEFAULT_ROOMMATES);
  const [activeRoommateId, setActiveRoommateId] = useState<string>("omshree-04");
  const [favorites, setFavorites] = useState<string[]>(["chickpea-curry", "fajita-chicken-burrito-bowl", "chipotle-black-bean-tacos"]);
  const [weeklyPlan, setWeeklyPlan] = useState<MealPlanWeek>({
    "2026-10-05": { dinner: "chickpea-curry" },
    "2026-10-06": { dinner: "chipotle-black-bean-tacos" },
    "2026-10-07": { dinner: "tuscan-white-bean-skillet" },
    "2026-10-08": { dinner: "sheet-pan-fajitas" },
  });
  const [tonightMealId, setTonightMealId] = useState<string | null>("chickpea-curry");
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(DEFAULT_SHOPPING);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(DEFAULT_PANTRY);
  const [mealHistory, setMealHistory] = useState<MealHistoryRecord[]>([
    {
      id: "h1",
      mealId: "creamy-garlic-pasta",
      mealName: "Creamy Garlic Parmesan Pasta",
      cookedAt: "2026-10-01T19:30:00.000Z",
      servingsCooked: 4,
      rating: 5,
      notes: "Made with oat cream for Maya - tasted incredible!"
    },
    {
      id: "h2",
      mealId: "veggie-fried-rice",
      mealName: "Classic 10-Minute Rainbow Fried Rice",
      cookedAt: "2026-09-28T20:00:00.000Z",
      servingsCooked: 4,
      rating: 4
    }
  ]);
  const [activePoll, setActivePoll] = useState<MealVotePoll | null>({
    id: "poll-tonight",
    createdAt: "2026-10-03T16:00:00Z",
    active: true,
    candidateMealIds: ["chickpea-curry", "chipotle-black-bean-tacos", "tuscan-white-bean-skillet"],
    votes: {
      "alex-01": "chipotle-black-bean-tacos",
      "maya-02": "chickpea-curry",
      "sam-03": "chickpea-curry",
      "omshree-04": "chickpea-curry",
    }
  });

  const [timers, setTimers] = useState<CookingTimer[]>([
    {
      id: "t1",
      label: "Basmati Rice Simmer",
      durationSeconds: 15 * 60,
      remainingSeconds: 15 * 60,
      isRunning: false,
      isFinished: false,
    },
    {
      id: "t2",
      label: "Curry Spinach Wilt",
      durationSeconds: 3 * 60,
      remainingSeconds: 3 * 60,
      isRunning: false,
      isFinished: false,
    }
  ]);

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
    const meal = MEALS_DATABASE.find((m) => m.id === mealId);
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

  const resetToDemoData = () => {
    setHouseholdName("79 Maple Street Kitchen");
    setRoommates(DEFAULT_ROOMMATES);
    setActiveRoommateId("omshree-04");
    setFavorites(["chickpea-curry", "fajita-chicken-burrito-bowl", "chipotle-black-bean-tacos"]);
    setWeeklyPlan({
      "2026-10-05": { dinner: "chickpea-curry" },
      "2026-10-06": { dinner: "chipotle-black-bean-tacos" },
      "2026-10-07": { dinner: "tuscan-white-bean-skillet" },
      "2026-10-08": { dinner: "sheet-pan-fajitas" },
    });
    setTonightMealId("chickpea-curry");
    setShoppingList(DEFAULT_SHOPPING);
    setPantryItems(DEFAULT_PANTRY);
    setMealHistory([
      {
        id: "h1",
        mealId: "creamy-garlic-pasta",
        mealName: "Creamy Garlic Parmesan Pasta",
        cookedAt: "2026-10-01T19:30:00.000Z",
        servingsCooked: 4,
        rating: 5,
        notes: "Made with oat cream for Maya - tasted incredible!"
      }
    ]);
  };

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
        meals: MEALS_DATABASE,
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
        resetToDemoData,
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
