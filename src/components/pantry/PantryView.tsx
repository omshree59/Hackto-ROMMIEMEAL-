"use client";

import React, { useState } from "react";
import { Meal, PantryItem } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { findMealsByPantryIngredients } from "@/lib/rulesEngine";
import { CompatibilityBadge } from "@/components/common/Badges";
import {
  Refrigerator,
  Sparkles,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Tag,
  Clock,
  ArrowRight,
  X,
  Search,
} from "lucide-react";

interface PantryViewProps {
  onSelectMeal: (meal: Meal) => void;
}

export function PantryView({ onSelectMeal }: PantryViewProps) {
  const {
    pantryItems,
    addPantryItem,
    removePantryItem,
    meals,
    roommates,
  } = useHousehold();

  // Multi-select for "What's in the fridge?"
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState<"fridge" | "inventory">("fridge");
  const [showAddModal, setShowAddModal] = useState(false);

  // New pantry item form state
  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState("1");
  const [newItemUnit, setNewItemUnit] = useState("pcs");
  const [newItemCategory, setNewItemCategory] = useState<PantryItem["category"]>("Produce");
  const [newItemExpiry, setNewItemExpiry] = useState<number>(7);

  const matchedMeals = findMealsByPantryIngredients(meals, selectedIngredients, roommates);

  const toggleIngredientSelection = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleAddPantry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addPantryItem({
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: newItemQty,
      unit: newItemUnit,
      expiryDays: newItemExpiry,
    });

    setNewItemName("");
    setShowAddModal(false);
  };

  const categories: PantryItem["category"][] = [
    "Produce",
    "Protein",
    "Dairy",
    "Grains",
    "Spices",
    "Pantry",
    "Frozen",
    "Other",
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-200 tracking-tight">
            Pantry &amp; Leftover Finder
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Turn ingredients you already have into safe, delicious household dinners
          </p>
        </div>

        {/* Tab Switcher & Add Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-app-bg p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab("fridge")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "fridge"
                  ? "bg-app-surface text-stone-200 shadow-sm"
                  : "text-stone-500 hover:text-stone-200"
              }`}
            >
              🥗 Leftover Matcher
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "inventory"
                  ? "bg-app-surface text-stone-200 shadow-sm"
                  : "text-stone-500 hover:text-stone-200"
              }`}
            >
              📦 Inventory ({pantryItems.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-2xl bg-app-orange hover:bg-app-orange text-white text-xs font-bold shadow-md shadow-app-orange transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Pantry</span>
          </button>
        </div>
      </div>

      {/* TAB 1: WHAT'S IN THE FRIDGE? */}
      {activeTab === "fridge" && (
        <div className="space-y-6">
          {/* Ingredient Multi-Select Pill Box */}
          <div className="p-5 rounded-3xl bg-app-surface border border-app-border shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-app-orange" />
                <span>Select What You Have in the Kitchen</span>
              </h3>
              <span className="text-xs font-semibold text-app-orange">
                {selectedIngredients.length} selected
              </span>
            </div>

            {pantryItems.length === 0 ? (
              <div className="py-4 text-center space-y-2">
                <p className="text-xs text-stone-400">Your kitchen inventory is currently empty.</p>
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 rounded-xl bg-app-orange text-app-bg text-xs font-bold shadow-md shadow-app-orange/20 cursor-pointer"
                >
                  + Add Item to Pantry
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                {pantryItems.map((item) => {
                  const isSelected = selectedIngredients.some(
                    (i) => i.toLowerCase() === item.name.toLowerCase()
                  );
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleIngredientSelection(item.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "bg-app-orange text-app-bg shadow-sm font-bold"
                          : "bg-app-bg text-stone-300 hover:bg-app-elevated"
                      }`}
                    >
                      <span>{isSelected ? "✓" : "+"}</span>
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Matches Output List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-200">
                {matchedMeals.length} Meals You Can Make Tonight
              </h2>
              <p className="text-xs text-stone-400">
                Ranked by ingredient coverage &amp; safety
              </p>
            </div>

            {matchedMeals.length === 0 ? (
              <div className="text-center py-12 p-8 rounded-3xl bg-app-surface border border-app-border space-y-2">
                <div className="text-3xl">🍲</div>
                <p className="text-xs font-semibold text-stone-400">
                  Select ingredients above to find matches.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedMeals.map(({ meal, matchCount, matchedIngredients, missingIngredients, report }) => (
                  <div
                    key={meal.id}
                    onClick={() => onSelectMeal(meal)}
                    className="group cursor-pointer rounded-3xl p-5 bg-app-surface border border-app-border hover:border-app-orange hover:shadow-lg transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={meal.imageUrl}
                          alt={meal.name}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0"
                        />
                        <div>
                          <CompatibilityBadge report={report} size="sm" />
                          <h3 className="font-bold text-sm text-stone-200 group-hover:text-app-orange transition-colors line-clamp-1 mt-1">
                            {meal.name}
                          </h3>
                          <p className="text-[11px] text-stone-400">
                            {meal.cuisine} · {meal.cookTime}m
                          </p>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-emerald-950 text-emerald-300">
                        {matchCount} / {meal.ingredients.length} Have
                      </span>
                    </div>

                    {/* Matched vs Missing details */}
                    <div className="pt-2 border-t border-app-border text-[11px] space-y-1">
                      <p className="text-emerald-400 line-clamp-1">
                        <strong>In Kitchen:</strong> {matchedIngredients.slice(0, 3).join(", ")}
                        {matchedIngredients.length > 3 && ` +${matchedIngredients.length - 3} more`}
                      </p>
                      {missingIngredients.length > 0 && (
                        <p className="text-stone-400 line-clamp-1">
                          <strong>Missing:</strong> {missingIngredients.slice(0, 2).join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: INVENTORY TABLE */}
      {activeTab === "inventory" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const items = pantryItems.filter((i) => i.category === cat);
              if (items.length === 0) return null;

              return (
                <div
                  key={cat}
                  className="rounded-3xl p-5 bg-app-surface border border-app-border shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-app-border">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-app-orange" />
                      <span>{cat}</span>
                    </h3>
                    <span className="text-xs text-stone-400">{items.length} items</span>
                  </div>

                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-app-bg border border-app-border text-xs"
                      >
                        <div>
                          <p className="font-semibold text-stone-200">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-stone-400">
                            {item.quantity} {item.unit}
                          </p>
                        </div>

                        <button
                          onClick={() => removePantryItem(item.id)}
                          className="text-stone-400 hover:text-rose-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-md bg-app-surface rounded-3xl p-6 shadow-2xl border border-app-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-app-border">
              <h3 className="font-bold text-base text-stone-200">
                Add Pantry Ingredient
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-full hover:bg-app-elevated"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPantry} className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Greek Yogurt, Quinoa, Sweet Potatoes"
                  className="w-full px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs focus:outline-none focus:ring-2 focus:ring-app-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Quantity &amp; Unit
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newItemQty}
                      onChange={(e) => setNewItemQty(e.target.value)}
                      className="w-16 px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newItemUnit}
                      onChange={(e) => setNewItemUnit(e.target.value)}
                      placeholder="cans, lbs, box"
                      className="flex-1 px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-app-orange text-white text-xs font-bold"
                >
                  Save to Pantry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
