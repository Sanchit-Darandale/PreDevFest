"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (fixedCode: string) => void;
}

type CopyStatus = "idle" | "copied" | "failed";

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const ext = langConfig ? langConfig.extension : "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const copyLabel = {
    idle: "📋 COPY FIXED CODE",
    copied: "✓ COPIED TO CLIPBOARD",
    failed: "✕ COPY BLOCKED, SELECT MANUALLY",
  }[copyStatus];

  return (
    <div className="mt-5">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-bold text-[#4FA35A] uppercase text-xs">
          CORRECTED CODE (REDEMPTION ARC)
        </span>
      </SectionHeader>

      <div className="bg-[#171717] border-2 border-[#141414] rounded-xl overflow-hidden brutal-shadow-sm mb-3">
        {/* Code Block Header */}
        <div className="h-8 px-3.5 bg-[#212121] border-b border-[#333333] flex items-center justify-between text-xs font-mono">
          <span className="text-white/80 font-bold">solution.{ext}</span>
          <span className="text-[#4FA35A] font-bold text-[11px] tracking-wider uppercase">
            ● READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <div className="p-3.5 overflow-x-auto text-[#F7F3EA] font-mono text-xs sm:text-sm leading-6">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 bg-[#FFFDF8] hover:bg-[#141414] text-[#141414] hover:text-[#FFFDF8] border-2 border-[#141414] rounded-full text-xs font-mono font-bold brutal-shadow-sm transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          {copyLabel}
        </button>

        <button
          type="button"
          onClick={() => onApply(code)}
          className="px-4 py-2 bg-[#EDB13E] hover:bg-[#141414] text-[#141414] hover:text-[#EDB13E] border-2 border-[#141414] rounded-full text-xs font-mono font-extrabold brutal-shadow-sm transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
