"use client";

import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-start md:justify-end">
      {/* 1. Roast Level Selector (Segmented Radio Group) */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#66625B] hidden sm:inline">
          Spice:
        </span>
        <div
          role="radiogroup"
          aria-label="Roast Level"
          className="inline-flex items-center gap-1 p-1 bg-[#EAE3D2] border-2 border-[#141414] rounded-full brutal-shadow-sm"
        >
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className={`relative cursor-pointer select-none rounded-full px-2.5 py-1 text-xs font-bold transition-all duration-100 flex items-center gap-1 ${
                  isSelected
                    ? "bg-[#EDB13E] text-[#141414] border-2 border-[#141414] brutal-shadow-sm scale-[1.02]"
                    : "text-[#141414]/80 hover:text-[#141414] hover:bg-white/40"
                }`}
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="sr-only"
                  disabled={isRoasting}
                />
                <span
                  className={`w-2 h-2 rounded-full border border-[#141414] ${
                    isSelected ? "bg-[#141414]" : "bg-transparent"
                  }`}
                />
                <span>{level.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Language Selector */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#66625B] hidden sm:inline">
          Lang:
        </span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            disabled={isRoasting}
            aria-label="Select Language"
            className="appearance-none bg-[#FFFDF8] border-2 border-[#141414] rounded-full px-3.5 py-1.5 pr-7 text-xs font-bold text-[#141414] brutal-shadow-sm cursor-pointer hover:bg-[#F8F4EC] focus:outline-none focus:ring-2 focus:ring-[#EDB13E]"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#141414]">
            ▼
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        disabled={isRoasting}
        className={`px-3 py-1.5 text-xs font-mono font-bold rounded-full border-2 transition-all duration-100 ${
          errorDrawerOpen
            ? "bg-[#141414] text-[#FFFDF8] border-[#141414] brutal-shadow-sm"
            : "bg-[#FFFDF8] text-[#141414] border-dashed border-[#141414] hover:bg-[#F8F4EC] brutal-shadow-sm"
        }`}
        title="Attach error message or compiler traceback"
      >
        {errorDrawerOpen ? "− ERROR LOG" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary Roast Button */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-black text-xs uppercase tracking-wider border-2 border-[#141414] transition-all duration-100 ${
          isRoasting
            ? "bg-[#EDB13E]/70 text-[#141414]/60 cursor-not-allowed animate-pulse"
            : "bg-[#EDB13E] hover:bg-[#df9f28] text-[#141414] brutal-shadow hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:box-shadow-none"
        }`}
      >
        {isRoasting ? (
          <>
            <span className="w-2 h-2 rounded-full bg-[#141414] animate-ping" />
            <span>ANALYZING... / शेकतोय... ⏳</span>
          </>
        ) : (
          <>
            <span>ROAST MY CODE 🔥</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-[#141414] text-[#FFFDF8] text-[10px] rounded font-mono font-normal">
              Ctrl ⏎
            </kbd>
          </>
        )}
      </button>
    </div>
  );
}
