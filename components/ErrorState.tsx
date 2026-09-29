"use client";

import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FAF6EE]">
      {/* 64x64 accent-bordered square with accent ! */}
      <div className="w-16 h-16 rounded-xl border-2 border-[#141414] bg-[#D9503F] flex items-center justify-center font-mono text-2xl font-black text-[#FFFDF8] mb-4 brutal-shadow">
        !
      </div>

      <h3 className="font-sans font-extrabold text-base uppercase tracking-wider text-[#D9503F] mb-2">
        Analysis Failed / Roast Interrupted
      </h3>

      <p className="font-mono text-xs text-[#66625B] max-w-md leading-relaxed mb-5 bg-[#FFFDF8] p-3 rounded-lg border border-[#141414]/20 brutal-shadow-sm break-words">
        {error || "An unknown error occurred during code evaluation."}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="px-5 py-2 bg-[#EDB13E] hover:bg-[#df9f28] text-[#141414] font-mono font-bold text-xs rounded-full border-2 border-[#141414] brutal-shadow transition-all active:translate-x-0.5 active:translate-y-0.5"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
