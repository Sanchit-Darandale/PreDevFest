"use client";

import React from "react";
import { ReportState, RoastLevel, RoastResult, LanguageId } from "@/types/roast";
import { SectionHeader } from "@/components/SectionHeader";
import { IssueCard } from "@/components/IssueCard";
import { FixedCode } from "@/components/FixedCode";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result?: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  // Compute rubber stamp score based on issue counts
  const fatalCount =
    result?.issues.filter((i) => i.severity === "FATAL BUG").length ?? 0;
  const smellCount =
    result?.issues.filter((i) => i.severity === "CODE SMELL").length ?? 0;
  const optCount =
    result?.issues.filter((i) => i.severity === "OPTIMIZATION").length ?? 0;

  // Base score 100 minus deductions, min 25
  const roastScore = Math.max(
    25,
    100 - fatalCount * 25 - smellCount * 12 - optCount * 5
  );

  return (
    <div className="flex flex-col h-full bg-[#FAF6EE] overflow-hidden select-text">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 bg-[#F4EFE6] border-b-2 border-[#141414] flex items-center justify-between gap-2 text-xs font-mono text-[#141414]">
        <div className="flex items-center gap-2">
          <span className="text-[#66625B] font-bold tracking-wider uppercase text-[10px]">
            AUDIT // REPORT
          </span>
          {state === "results" && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#4FA35A]/15 text-[#2A7534] border border-[#4FA35A]">
              ● CHARRED TO PERFECTION 🔥
            </span>
          )}
        </div>

        <div className="font-bold text-[#141414] tracking-wide text-xs">
          Roast Report
        </div>

        <div className="w-12 text-right">
          {state === "results" && (
            <span className="text-[11px] font-bold text-[#66625B]">
              {result?.issues.length ?? 0} found
            </span>
          )}
        </div>
      </div>

      {/* Main Body State Rendering */}
      <div className="flex-1 overflow-y-auto">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && (
          <ErrorState error={errorMsg} onRetry={onRetry} />
        )}

        {state === "results" && result && (
          <div className="p-4 sm:p-6 space-y-6">
            {/* Stamp & Savage Headline Banner from Stitch */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#FFFDF8] border-2 border-[#141414] rounded-2xl brutal-shadow-sm">
              <div className="flex-1">
                <div className="text-[10px] font-mono font-black uppercase tracking-widest text-[#D9503F] mb-1">
                  VERDICT // NASHIK LAB REPORT
                </div>
                <div className="font-sans font-black text-lg sm:text-xl text-[#141414] leading-snug">
                  "{result.roast.split(".")[0]}..."
                </div>
              </div>

              {/* Rubber Stamp Roast Score Badge */}
              <div className="self-end sm:self-center bg-[#EDB13E] border-3 border-[#141414] rounded-xl px-4 py-2 text-center brutal-shadow rotate-[-3deg] select-none">
                <div className="text-[10px] font-mono font-black uppercase tracking-wider text-[#141414]">
                  ROAST SCORE
                </div>
                <div className="font-sans font-black text-2xl text-[#141414]">
                  {roastScore}
                  <span className="text-xs font-bold text-[#141414]/70">
                    /100
                  </span>
                </div>
                <div className="text-[9px] font-mono font-bold text-[#141414]/90 uppercase">
                  {roastScore < 60 ? "CHAI PEE KE DEKH" : "BACH GAYA BHAU"}
                </div>
              </div>
            </div>

            {/* Section 1: Roast */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="font-bold uppercase text-[11px]">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>
              <blockquote className="p-4 bg-[#FFFDF8] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-mono leading-relaxed text-[#141414] brutal-shadow-sm whitespace-pre-line border-l-8 border-l-[#EDB13E]">
                "{result.roast}"
              </blockquote>
            </div>

            {/* Section 2: What's Wrong */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="font-bold uppercase text-[11px]">
                  {result.issues.length === 1
                    ? "1 ISSUE"
                    : `${result.issues.length} ISSUES`}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="p-4 bg-[#4FA35A]/10 border-2 border-[#4FA35A] rounded-xl text-xs font-mono text-[#2A7534] font-bold">
                  ✓ No issues found. Suspiciously clean code, or you tricked the linter!
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix (ONLY when correctedCode is non-empty) */}
            {result.correctedCode && result.correctedCode.trim().length > 0 && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Takeaway Section (computed section number 4 if fix exists, else 3) */}
            {result.takeaway && result.takeaway.trim().length > 0 && (
              <div className="pt-2">
                <SectionHeader
                  number={
                    result.correctedCode &&
                    result.correctedCode.trim().length > 0
                      ? 4
                      : 3
                  }
                  title="Takeaway"
                />
                <div className="p-4 bg-[#EFF2FB] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-mono leading-relaxed text-[#141414] brutal-shadow-sm border-l-8 border-l-[#4C80F0]">
                  <p>{result.takeaway}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
