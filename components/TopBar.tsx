"use client";

import React from "react";
import Image from "next/image";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-[#141414] bg-[#F4EFE6] px-4 py-3 sm:px-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      {/* Left Brand Identity with GDG Nashik & DevFest Nashik accents */}
      <div className="flex items-center justify-between md:justify-start gap-3">
        <div className="flex items-center gap-2">
          {/* Google Color Dots */}
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4C80F0] border border-[#141414]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9503F] border border-[#141414]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EDB13E] border border-[#141414]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4FA35A] border border-[#141414]" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-sans font-extrabold text-base tracking-tight text-[#141414]">
              {APP.name.toUpperCase()}
            </span>
            <span className="text-[10px] font-mono font-black px-1.5 py-0.5 border border-[#141414] rounded-sm bg-[#EDB13E] text-[#141414] brutal-shadow-sm">
              {APP.version}
            </span>
          </div>
        </div>

        {/* DevFest Badge */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#141414] border-2 border-[#141414] rounded-full px-2.5 py-0.5 bg-[#FFFDF8] brutal-shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#D9503F] animate-pulse" />
          <span className="hidden sm:inline">DevFest Nashik '26</span>
          <span className="sm:hidden">DevFest</span>
        </div>
      </div>

      {/* Right Controls Container */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
        {children}
      </div>
    </header>
  );
}
