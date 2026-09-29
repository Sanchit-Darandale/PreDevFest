"use client";

import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-[#141414] bg-[#F4EFE6] px-4 py-2.5 sm:px-6 select-none font-mono text-[11px] text-[#66625B]">
      {/* Main Status Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left Status Indicator */}
        <div className="flex items-center gap-2">
          <span>STATUS:</span>
          {isRoasting ? (
            <span className="flex items-center gap-1.5 font-bold text-[#A86E00]">
              <span className="w-2 h-2 rounded-full bg-[#EDB13E] animate-ping" />
              PROCESSING... / शेकतोय...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-bold text-[#2A7534]">
              <span className="w-2 h-2 rounded-full bg-[#4FA35A]" />
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden md:inline text-[#141414]/30">|</span>
          <span className="hidden md:inline text-[#141414]/70">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        {/* Right App Metadata */}
        <div className="font-bold tracking-widest uppercase text-[#141414]">
          {APP.name.toUpperCase()} {APP.version} // LIVE
        </div>
      </div>

      {/* Mandatory Workshop Attribution Line */}
      <div className="text-center text-[10px] text-[#66625B]/90 mt-1 pt-1 border-t border-[#141414]/10 font-sans tracking-wide">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
