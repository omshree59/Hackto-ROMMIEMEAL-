"use client";

import React, { useState } from "react";
import { ShoppingItem } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import {
  ShoppingBag,
  Plus,
  Trash2,
  Check,
  CheckCircle2,
  Copy,
  Users,
  Filter,
  Sparkles,
  Tag,
  X,
} from "lucide-react";

export function ShoppingListView() {
  const {
    shoppingList,
    addShoppingItem,
    toggleShoppingItem,
    assignShoppingItem,
    removeShoppingItem,
    clearCompletedShoppingItems,
    roommates,
  } = useHousehold();

  const [selectedRoommateFilter, setSelectedRoommateFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState("");
  const [newItemAmount, setNewItemAmount] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<ShoppingItem["category"]>("Produce");
  const [newItemAssignee, setNewItemAssignee] = useState<string>(roommates[0]?.id || "");

  const categories: ShoppingItem["category"][] = [
    "Produce",
    "Protein",
    "Dairy & Alt",
    "Grains & Pasta",
    "Pantry & Oils",
    "Spices & Sauces",
    "Frozen",
    "Bakery",
    "Other",
  ];

  // Filtered items
  const filteredItems = shoppingList.filter((item) => {
    if (selectedRoommateFilter === "all") return true;
    if (selectedRoommateFilter === "unassigned") return !item.assignedRoommateId;
    return item.assignedRoommateId === selectedRoommateFilter;
  });

  const completedCount = shoppingList.filter((i) => i.checked).length;
  const progressPercent = shoppingList.length > 0 ? Math.round((completedCount / shoppingList.length) * 100) : 0;

  const handleCreateCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addShoppingItem({
      name: newItemName.trim(),
      amount: newItemAmount.trim() || "1 unit",
      category: newItemCategory,
      assignedRoommateId: newItemAssignee || undefined,
      isCustom: true,
    });

    setNewItemName("");
    setNewItemAmount("");
    setShowAddModal(false);
  };

  const handleCopyListToClipboard = () => {
    const lines = shoppingList.map((item) => {
      const rm = roommates.find((r) => r.id === item.assignedRoommateId);
      const status = item.checked ? "[x]" : "[ ]";
      const assigneeStr = rm ? ` (@${rm.name})` : "";
      return `${status} ${item.name} - ${item.amount}${assigneeStr}`;
    });
    navigator.clipboard.writeText("🛒 RoomieMeal Grocery List:\n" + lines.join("\n"));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-200 tracking-tight">
            Shared Grocery List
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Auto-populated from meal plans with roommate assignments
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyListToClipboard}
            className="px-3 py-2 rounded-2xl bg-app-bg hover:bg-app-elevated text-stone-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copySuccess ? "Copied to Clipboard! ✓" : "Copy Formatted"}</span>
          </button>

          {completedCount > 0 && (
            <button
              onClick={clearCompletedShoppingItems}
              className="px-3 py-2 rounded-2xl bg-rose-950/60 text-rose-300 text-xs font-semibold hover:bg-rose-900/60 transition-colors"
            >
              Clear Done ({completedCount})
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-2xl bg-app-orange hover:bg-app-orange text-white text-xs font-bold shadow-md shadow-app-orange transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Progress & Roommate Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-app-surface border border-app-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <span className="font-bold text-stone-200">
              {completedCount} of {shoppingList.length} items checked
            </span>
            <span className="text-stone-400 ml-2">({progressPercent}% done)</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-stone-400 mr-1 text-[11px] font-bold uppercase">Buyer:</span>
            <button
              onClick={() => setSelectedRoommateFilter("all")}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-colors ${
                selectedRoommateFilter === "all"
                  ? "bg-app-orange text-white"
                  : "bg-app-bg text-stone-400"
              }`}
            >
              Everyone
            </button>
            {roommates.map((rm) => (
              <button
                key={rm.id}
                onClick={() => setSelectedRoommateFilter(rm.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 ${
                  selectedRoommateFilter === rm.id
                    ? "bg-app-orange text-white"
                    : "bg-app-bg text-stone-400"
                }`}
              >
                <span>{rm.avatar}</span>
                <span>{rm.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-app-bg h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Items Grouped by Category */}
      {shoppingList.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-app-surface border border-app-border space-y-3">
          <div className="text-4xl">🛒</div>
          <h3 className="font-bold text-base text-stone-200">
            Nothing to buy yet.
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Generate ingredients from your weekly meal plan or add custom items to pick up on your next grocery run.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-app-orange text-white text-xs font-bold"
          >
            Add First Item
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => {
            const catItems = filteredItems.filter((i) => i.category === cat);
            if (catItems.length === 0) return null;

            return (
              <div
                key={cat}
                className="rounded-3xl p-5 bg-app-surface border border-app-border shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-app-border">
                  <h3 className="font-bold text-sm text-stone-200 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-app-orange" />
                    <span>{cat}</span>
                    <span className="text-xs font-normal text-stone-400">
                      ({catItems.length})
                    </span>
                  </h3>
                </div>

                <div className="space-y-2">
                  {catItems.map((item) => {
                    const assignedRm = roommates.find((r) => r.id === item.assignedRoommateId);

                    return (
                      <div
                        key={item.id}
                        className={`group flex items-center justify-between p-3 rounded-2xl border transition-all ${
                          item.checked
                            ? "bg-app-bg border-app-border opacity-60"
                            : "bg-app-bg border-app-border hover:border-stone-500"
                        }`}
                      >
                        {/* Checkbox & Item Name */}
                        <div
                          className="flex items-center gap-3 cursor-pointer flex-1"
                          onClick={() => toggleShoppingItem(item.id)}
                        >
                          <div
                            className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                              item.checked
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "border-app-border bg-app-surface"
                            }`}
                          >
                            {item.checked && <Check className="w-3.5 h-3.5" />}
                          </div>

                          <div>
                            <p
                              className={`text-xs font-semibold ${
                                item.checked
                                  ? "line-through text-stone-400"
                                  : "text-stone-200"
                              }`}
                            >
                              {item.name}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-stone-400">
                              <span>{item.amount}</span>
                              {item.mealOriginName && (
                                <span>· For: {item.mealOriginName}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Roommate Assignment Switcher */}
                        <div className="flex items-center gap-2">
                          <select
                            value={item.assignedRoommateId || ""}
                            onChange={(e) => assignShoppingItem(item.id, e.target.value || undefined)}
                            className="text-[11px] font-medium bg-app-surface border border-app-border rounded-xl px-2 py-1 text-stone-300 focus:outline-none"
                          >
                            <option value="">Unassigned</option>
                            {roommates.map((rm) => (
                              <option key={rm.id} value={rm.id}>
                                {rm.avatar} {rm.name}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() => removeShoppingItem(item.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
                Add Grocery Item
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-full hover:bg-app-elevated"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomItem} className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Oat Milk, Extra Virgin Olive Oil"
                  className="w-full px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs focus:outline-none focus:ring-2 focus:ring-app-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Amount / Quantity
                  </label>
                  <input
                    type="text"
                    value={newItemAmount}
                    onChange={(e) => setNewItemAmount(e.target.value)}
                    placeholder="e.g. 2 cartons, 1 lb"
                    className="w-full px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs focus:outline-none focus:ring-2 focus:ring-app-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs focus:outline-none focus:ring-2 focus:ring-app-orange"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  Assigned Buyer
                </label>
                <select
                  value={newItemAssignee}
                  onChange={(e) => setNewItemAssignee(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs focus:outline-none focus:ring-2 focus:ring-app-orange"
                >
                  <option value="">Unassigned</option>
                  {roommates.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.avatar} {r.name}
                    </option>
                  ))}
                </select>
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
                  Add to List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
