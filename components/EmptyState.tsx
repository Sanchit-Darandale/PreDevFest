"use client";

import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FAF6EE]">
      {/* 64x64 dashed-border square with {} */}
      <div className="w-16 h-16 rounded-xl border-2 border-dashed border-[#141414] bg-[#FFFDF8] flex items-center justify-center font-mono text-2xl font-bold text-[#66625B] mb-4 brutal-shadow-sm">
        {"{}"}
      </div>

      <h3 className="font-sans font-extrabold text-base uppercase tracking-wider text-[#141414] mb-2">
        Awaiting Code Submission
      </h3>

      <p className="font-mono text-xs text-[#66625B] max-w-sm leading-relaxed mb-4">
        Paste your code on the left, then click{" "}
        <span className="font-bold text-[#141414]">"ROAST MY CODE"</span> or
        press{" "}
        <kbd className="px-1.5 py-0.5 bg-[#EAE3D2] border border-[#141414] rounded text-[10px] font-bold text-[#141414]">
          Ctrl+Enter
        </kbd>{" "}
        (⌘+Enter on Mac).
      </p>

      {/* Playful Nashik badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#141414]/30 bg-[#FFFDF8] text-[11px] font-mono font-medium text-[#66625B]">
        <span>🌶️</span>
        <span>Your code is suspiciously quiet... let's fix that.</span>
      </div>
    </div>
  );
}
