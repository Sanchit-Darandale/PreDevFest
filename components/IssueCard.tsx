"use client";

import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityConfig: Record<
  Severity,
  { bg: string; text: string; border: string; label: string }
> = {
  "FATAL BUG": {
    bg: "bg-[#D9503F]/15",
    text: "text-[#D9503F]",
    border: "border-[#D9503F]",
    label: "FATAL BUG",
  },
  "CODE SMELL": {
    bg: "bg-[#EDB13E]/20",
    text: "text-[#A86E00]",
    border: "border-[#EDB13E]",
    label: "CODE SMELL",
  },
  OPTIMIZATION: {
    bg: "bg-[#4FA35A]/15",
    text: "text-[#2A7534]",
    border: "border-[#4FA35A]",
    label: "OPTIMIZATION",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const formattedIndex = String(index).padStart(2, "0");
  const sev = severityConfig[issue.severity] ?? severityConfig["CODE SMELL"];

  return (
    <div className="bg-[#FFFDF8] border-2 border-[#141414] rounded-xl p-3.5 sm:p-4 brutal-shadow-sm mb-3 transition-all hover:-translate-y-0.5">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#141414]/15 pb-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          {/* Black Index Chip */}
          <span className="bg-[#141414] text-[#FFFDF8] font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
            #{formattedIndex}
          </span>
          {/* Line Indicator */}
          <span className="font-mono text-xs font-bold text-[#141414]">
            LINE {issue.line}
          </span>
          {/* Severity Badge */}
          <span
            className={`font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${sev.bg} ${sev.text} ${sev.border}`}
          >
            {sev.label}
          </span>
        </div>

        {/* Issue Title (Wraps, never clips) */}
        <div className="font-sans text-xs font-bold text-[#141414] text-right flex-1 min-w-[140px]">
          {issue.title}
        </div>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <div className="mb-2.5 bg-[#171717] text-[#F7F3EA] rounded-lg p-2.5 font-mono text-xs overflow-x-auto border-l-4 border-[#D9503F]">
          <code>{issue.codeSnippet}</code>
        </div>
      )}

      {/* Diagnosis & Expected Details */}
      <div className="space-y-1.5 text-xs font-mono">
        <div className="text-[#D9503F] leading-relaxed">
          <span className="font-black mr-1.5">✕ Diagnosis:</span>
          <span className="text-[#141414]">{issue.diagnosis}</span>
        </div>
        <div className="text-[#2A7534] leading-relaxed">
          <span className="font-black mr-1.5">✓ Expected:</span>
          <span className="text-[#141414]">{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
