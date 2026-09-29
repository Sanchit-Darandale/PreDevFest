"use client";

import React, { useState, useEffect } from "react";

const LOADING_MESSAGES = [
  "Evaluating computational complexity and architectural purity...",
  "Compiler ki chai thandi ho rahi hai… ☕",
  "Sharma ji ke bete se comparison chal raha hai…",
  "Bhau, roast tayyar ho raha hai… 🔥",
  "Panchavati Express se bhi late hai tumhara code…",
  "Measuring cognitive embarrassment with Gemini...",
];

export function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FAF6EE]">
      {/* 64x64 solid-border square with spinning / */}
      <div className="w-16 h-16 rounded-xl border-2 border-[#141414] bg-[#EDB13E] flex items-center justify-center font-mono text-2xl font-black text-[#141414] mb-4 brutal-shadow animate-pulse">
        <span className="inline-block animate-spin">/</span>
      </div>

      <h3 className="font-sans font-extrabold text-base uppercase tracking-wider text-[#141414] mb-2 animate-pulse">
        Analyzing Code / शेकतोय...
      </h3>

      <p className="font-mono text-xs text-[#66625B] max-w-sm leading-relaxed mb-4 min-h-[32px] transition-all">
        {LOADING_MESSAGES[msgIndex]}
      </p>

      {/* Progress pill bar */}
      <div className="w-48 h-3 bg-[#EAE3D2] border-2 border-[#141414] rounded-full overflow-hidden brutal-shadow-sm">
        <div className="h-full bg-[#EDB13E] animate-[pulse_1s_infinite] w-2/3 border-r-2 border-[#141414]" />
      </div>
    </div>
  );
}
