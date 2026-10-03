"use client";

import React, { useState } from "react";
import { Roommate } from "@/types";
import { useHousehold } from "@/context/HouseholdContext";
import { ALLERGEN_DATABASE, CUISINES_LIST, DIETARY_PREFERENCES_LIST } from "@/data/allergens";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  ShieldCheck,
  Heart,
  ChefHat,
  AlertTriangle,
  X,
  Check,
} from "lucide-react";

const AVATAR_OPTIONS = ["🥑", "🌱", "🍜", "🍛", "🌮", "🍕", "🥗", "🍳", "🍓", "☕", "🍣", "🥟"];

export function RoommatesView() {
  const {
    roommates,
    activeRoommate,
    setActiveRoommateId,
    addRoommate,
    updateRoommate,
    deleteRoommate,
  } = useHousehold();

  const [editingRoommate, setEditingRoommate] = useState<Roommate | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("🥑");
  const [role, setRole] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [intolerances, setIntolerances] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [dislikeInput, setDislikeInput] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [favoriteCuisines, setFavoriteCuisines] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const openCreateModal = () => {
    setName("");
    setAvatar("🥑");
    setRole("Roommate");
    setAllergies([]);
    setIntolerances([]);
    setDislikes([]);
    setDislikeInput("");
    setPreferences([]);
    setFavoriteCuisines(["Italian", "Mexican"]);
    setNotes("");
    setIsCreating(true);
    setEditingRoommate(null);
  };

  const openEditModal = (rm: Roommate) => {
    setEditingRoommate(rm);
    setName(rm.name);
    setAvatar(rm.avatar);
    setRole(rm.role || "");
    setAllergies([...rm.allergies]);
    setIntolerances([...rm.intolerances]);
    setDislikes([...rm.dislikes]);
    setDislikeInput("");
    setPreferences([...rm.preferences]);
    setFavoriteCuisines([...rm.favoriteCuisines]);
    setNotes(rm.notes || "");
    setIsCreating(false);
  };

  const toggleArrayItem = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) setList(list.filter((i) => i !== item));
    else setList([...list, item]);
  };

  const handleAddDislike = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (("key" in e && e.key === "Enter") || e.type === "click") {
      e.preventDefault();
      if (dislikeInput.trim() && !dislikes.includes(dislikeInput.trim())) {
        setDislikes([...dislikes, dislikeInput.trim()]);
        setDislikeInput("");
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isCreating) {
      addRoommate({
        name: name.trim(),
        avatar,
        color: "#f97316",
        role: role.trim() || "Roommate",
        allergies,
        intolerances,
        dislikes,
        preferences,
        favoriteCuisines,
        notes: notes.trim(),
      });
    } else if (editingRoommate) {
      updateRoommate(editingRoommate.id, {
        name: name.trim(),
        avatar,
        role: role.trim(),
        allergies,
        intolerances,
        dislikes,
        preferences,
        favoriteCuisines,
        notes: notes.trim(),
      });
    }

    setEditingRoommate(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-200 tracking-tight">
            Household Food Boundaries
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
            Manage everyone's food safety rules, dietary styles, and flavor preferences
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-2xl bg-app-orange hover:bg-[#ff991f] text-app-bg text-xs font-bold shadow-md shadow-app-orange/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Roommate</span>
        </button>
      </div>

      {/* Safety Principle Banner */}
      <div className="p-4 rounded-2xl bg-app-surface border border-app-border text-xs text-stone-300 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-app-green mt-0.5 shrink-0" />
        <div className="space-y-0.5">
          <p className="font-bold text-stone-200">Clear Food Boundaries</p>
          <p className="text-stone-400 leading-relaxed">
            RoomieMeal uses these profiles to evaluate all meals locally. Life-threatening allergies trigger red conflict alerts, while intolerances suggest plant-based modifications.
          </p>
        </div>
      </div>

      {/* Roommates Grid */}
      {roommates.length === 0 ? (
        <div className="rounded-3xl p-12 bg-app-surface border border-app-border text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-app-elevated border border-app-border flex items-center justify-center text-3xl mx-auto shadow-sm">
            🥑
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-extrabold text-lg text-stone-200">No Roommates Yet</h3>
            <p className="text-xs text-stone-400">
              Add the people in your household with their dietary restrictions and allergies so RoomieMeal can automatically check meal compatibility.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-app-orange text-app-bg font-bold text-xs shadow-md shadow-app-orange/20 hover:bg-[#ff991f] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Roommate</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roommates.map((rm) => {
          const isActive = activeRoommate?.id === rm.id;

          return (
            <div
              key={rm.id}
              className={`rounded-3xl p-6 bg-app-surface border transition-all space-y-4 relative ${
                isActive
                  ? "border-app-orange ring-1 ring-app-orange/20 shadow-md"
                  : "border-app-border shadow-sm"
              }`}
            >
              {/* Header with Avatar and Actions */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-app-bg border border-app-border flex items-center justify-center text-3xl shadow-sm">
                    {rm.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-stone-200">
                        {rm.name}
                      </h3>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-app-orange/20 text-app-orange">
                          Active Context
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400">
                      {rm.role || "Household Member"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(rm)}
                    className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-app-elevated transition-colors"
                    title="Edit profile"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {roommates.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm(`Remove ${rm.name} from this household?`)) {
                          deleteRoommate(rm.id);
                        }
                      }}
                      className="p-2 rounded-xl text-stone-400 hover:text-app-red hover:bg-app-elevated transition-colors"
                      title="Remove roommate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Boundary Pill Sections */}
              <div className="space-y-2.5 text-xs">
                {/* 🚨 Allergies */}
                <div>
                  <span className="font-bold text-app-red flex items-center gap-1 mb-1">
                    <span>🚨</span>
                    <span>Allergies</span>
                  </span>
                  {rm.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {rm.allergies.map((alg) => (
                        <span
                          key={alg}
                          className="px-2.5 py-1 rounded-xl font-bold bg-app-red/20 text-app-red border border-app-red/30"
                        >
                          {alg}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-stone-400 italic">None listed</p>
                  )}
                </div>

                {/* ⚠️ Intolerances */}
                <div>
                  <span className="font-bold text-app-yellow flex items-center gap-1 mb-1">
                    <span>⚠️</span>
                    <span>Intolerances</span>
                  </span>
                  {rm.intolerances.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {rm.intolerances.map((intol) => (
                        <span
                          key={intol}
                          className="px-2.5 py-1 rounded-xl font-semibold bg-app-yellow/20 text-app-yellow border border-app-yellow/30"
                        >
                          {intol}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-stone-400 italic">None listed</p>
                  )}
                </div>

                {/* 🚫 Dislikes */}
                <div>
                  <span className="font-bold text-stone-500 flex items-center gap-1 mb-1">
                    <span>🚫</span>
                    <span>Doesn&apos;t Like</span>
                  </span>
                  {rm.dislikes.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {rm.dislikes.map((d) => (
                        <span
                          key={d}
                          className="px-2 py-0.5 rounded-lg bg-app-bg text-stone-300"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-stone-400 italic">Eats everything</p>
                  )}
                </div>

                {/* ❤️ Favorite Cuisines & Diet */}
                <div className="pt-2 border-t border-app-border flex flex-wrap gap-3">
                  {rm.preferences.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-app-green uppercase">
                        Diet:
                      </span>
                      <p className="font-semibold text-stone-300">
                        {rm.preferences.join(", ")}
                      </p>
                    </div>
                  )}

                  {rm.favoriteCuisines.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-app-orange uppercase">
                        Favorite Cuisines:
                      </span>
                      <p className="font-semibold text-stone-300">
                        {rm.favoriteCuisines.join(", ")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {rm.notes && (
                  <p className="text-[11px] text-stone-400 italic pt-1">
                    &quot;{rm.notes}&quot;
                  </p>
                )}
              </div>

              {/* Set as Active Context Button */}
              {!isActive && (
                <div className="pt-2">
                  <button
                    onClick={() => setActiveRoommateId(rm.id)}
                    className="w-full py-2 rounded-xl bg-app-bg hover:bg-app-elevated text-xs font-semibold text-stone-300 transition-colors"
                  >
                    Switch Context to {rm.name}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {(isCreating || editingRoommate) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
          <div
            className="w-full max-w-2xl my-8 bg-app-surface rounded-3xl p-6 sm:p-8 shadow-2xl border border-app-border max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-app-border">
              <h3 className="font-bold text-lg text-stone-200">
                {isCreating ? "Add Roommate Profile" : `Edit ${name}'s Profile`}
              </h3>
              <button
                onClick={() => {
                  setEditingRoommate(null);
                  setIsCreating(false);
                }}
                className="p-2 rounded-full hover:bg-app-elevated"
              >
                <X className="w-5 h-5 text-stone-300" />
              </button>
            </div>

            <form onSubmit={handleSave} className="py-4 space-y-5 overflow-y-auto flex-1 text-xs">
              {/* Name & Avatar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-300 mb-1">
                    Roommate Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex, Jordan"
                    className="w-full px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs text-stone-200 focus:outline-none focus:ring-2 focus:ring-app-orange"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-300 mb-1">
                    Household Role / Nickname
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. The Baker, Quick Meals Fan"
                    className="w-full px-3 py-2 rounded-xl bg-app-bg border border-app-border text-xs text-stone-200 focus:outline-none focus:ring-2 focus:ring-app-orange"
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block font-bold text-stone-300 mb-1.5">
                  Choose Avatar Icon
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => setAvatar(av)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                        avatar === av
                          ? "bg-app-orange text-white shadow-md scale-110"
                          : "bg-app-bg hover:bg-app-elevated"
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Critical Allergies */}
              <div className="space-y-1.5">
                <label className="block font-bold text-app-red">
                  Allergies (Strictly Avoid)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALLERGEN_DATABASE.map((a) => {
                    const isSelected = allergies.includes(a.id);
                    return (
                      <button
                        type="button"
                        key={a.id}
                        onClick={() => toggleArrayItem(allergies, setAllergies, a.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                          isSelected
                            ? "bg-app-red text-white shadow-sm"
                            : "bg-app-surface text-stone-300 border border-app-border hover:bg-app-red/10 hover:text-app-red"
                        }`}
                      >
                        {a.icon} {a.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Intolerances */}
              <div className="space-y-1.5">
                <label className="block font-bold text-app-yellow">
                  Intolerances (Digestive Comfort)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {["dairy", "wheat_gluten", "nightshades", "alliums", "soy"].map((intolId) => {
                    const def = ALLERGEN_DATABASE.find((a) => a.id === intolId);
                    const isSelected = intolerances.includes(intolId);
                    return (
                      <button
                        type="button"
                        key={intolId}
                        onClick={() => toggleArrayItem(intolerances, setIntolerances, intolId)}
                        className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                          isSelected
                            ? "bg-app-yellow text-app-bg shadow-sm"
                            : "bg-app-surface text-stone-300 border border-app-border hover:bg-app-yellow/10 hover:text-app-yellow"
                        }`}
                      >
                        {def?.icon} {def?.name || intolId}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Dislikes */}
              <div className="space-y-1.5">
                <label className="block font-bold text-stone-400">
                  Disliked Ingredients (Preference)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={dislikeInput}
                    onChange={(e) => setDislikeInput(e.target.value)}
                    onKeyDown={handleAddDislike}
                    placeholder="Type ingredient (e.g. mushrooms, cilantro) & hit enter"
                    className="flex-1 px-3 py-2 rounded-xl bg-app-bg border border-app-border text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-app-orange placeholder:text-stone-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddDislike}
                    className="px-3 py-2 rounded-xl bg-app-surface border border-app-border text-stone-300 font-bold hover:bg-app-elevated transition-colors"
                  >
                    Add
                  </button>
                </div>

                {dislikes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dislikes.map((d) => (
                      <span
                        key={d}
                        className="px-2.5 py-1 rounded-xl bg-app-surface border border-app-border text-stone-400 flex items-center gap-1 font-medium text-[11px]"
                      >
                        <span>{d}</span>
                        <button
                          type="button"
                          onClick={() => setDislikes(dislikes.filter((i) => i !== d))}
                          className="hover:text-app-red transition-colors"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Dietary Style */}
              <div className="space-y-1.5">
                <label className="block font-bold text-stone-400">
                  Dietary Preferences
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {DIETARY_PREFERENCES_LIST.map((pref) => {
                    const isSelected = preferences.includes(pref);
                    return (
                      <button
                        type="button"
                        key={pref}
                        onClick={() => toggleArrayItem(preferences, setPreferences, pref)}
                        className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                          isSelected
                            ? "bg-app-green/10 text-app-green border border-app-green/20 shadow-sm"
                            : "bg-app-surface text-stone-400 border border-app-border hover:bg-app-elevated hover:text-stone-300"
                        }`}
                      >
                        {pref}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-bold text-stone-300 mb-1">
                  Optional Emergency &amp; Kitchen Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Carries EpiPen for peanuts. Always rinse blender before making smoothies."
                  className="w-full px-3 py-2 rounded-xl bg-app-bg border border-app-border text-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-app-orange"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-app-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingRoommate(null);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2 rounded-xl font-semibold text-stone-400 hover:bg-app-elevated"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-app-orange text-white font-bold shadow-md shadow-app-orange/20"
                >
                  Save Food Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
