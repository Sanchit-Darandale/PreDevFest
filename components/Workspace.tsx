"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import {
  LanguageId,
  ReportState,
  RoastLevel,
  RoastResult,
} from "@/types/roast";
import { requestRoast } from "@/lib/api";
import { TopBar } from "@/components/TopBar";
import { RoastControls } from "@/components/RoastControls";
import { ErrorMessageInput } from "@/components/ErrorMessageInput";
import { CodeEditor } from "@/components/CodeEditor";
import { RoastReport } from "@/components/RoastReport";
import { StatusBar } from "@/components/StatusBar";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>(SAMPLE.code);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string | undefined>(undefined);

  const isRoasting = reportState === "loading";

  // Execute Roast Request
  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (code.trim().length === 0) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError(undefined);

    try {
      const result = await requestRoast({
        code,
        language,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to roast code.";
      setApiError(msg);
      setReportState("error");
    }
  }, [code, language, roastLevel, errorMessage, isRoasting]);

  // Load sample buggy code
  const handleLoadSample = useCallback(() => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  }, []);

  // Apply fix from redemption arc to editor without auto-roasting
  const handleApplyFix = useCallback((fixedCode: string) => {
    setCode(fixedCode);
  }, []);

  // Global keydown shortcut: Ctrl+Enter / Cmd+Enter roasts from anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  // errorLine: only defined when reportState === "results" && code === roastedCode
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Neo-brutalist Main Workstation Card */}
      <main className="w-full max-w-[1360px] flex-1 min-h-[82vh] bg-[#FFFDF8] border-2 sm:border-3 border-[#141414] rounded-2xl sm:rounded-[22px] brutal-shadow-lg flex flex-col overflow-hidden">
        {/* TopBar with brand and RoastControls */}
        <TopBar>
          <RoastControls
            roastLevel={roastLevel}
            onRoastLevelChange={setRoastLevel}
            language={language}
            onLanguageChange={setLanguage}
            onRoast={handleRoast}
            isRoasting={isRoasting}
            errorDrawerOpen={errorDrawerOpen}
            onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
          />
        </TopBar>

        {/* Collapsible Error Message Input Drawer */}
        {errorDrawerOpen && (
          <ErrorMessageInput
            value={errorMessage}
            onChange={setErrorMessage}
            onClose={() => setErrorDrawerOpen(false)}
          />
        )}

        {/* Split-Pane Workstation: Code Editor (~54%) + Roast Report (~46%) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left: Code Editor */}
          <div className="w-full lg:w-[54%] flex flex-col border-b-2 lg:border-b-0 border-[#141414]">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              errorLine={errorLine}
              onLoadSample={handleLoadSample}
            />
          </div>

          {/* Right: Roast Report */}
          <div className="w-full lg:w-[46%] flex flex-col">
            <RoastReport
              state={reportState}
              roastLevel={roastLevel}
              language={language}
              result={roastResult}
              errorMsg={apiError}
              onRetry={handleRoast}
              onApplyFix={handleApplyFix}
            />
          </div>
        </div>

        {/* StatusBar */}
        <StatusBar isRoasting={isRoasting} />
      </main>
    </div>
  );
}
