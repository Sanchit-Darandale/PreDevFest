"use client";

import React, { useRef, useState, useEffect } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langConfig ? langConfig.label : language;
  const ext = langConfig ? langConfig.extension : "txt";

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 12);

  // Sync scroll between textarea and gutter
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Track cursor line and column
  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const start = target.selectionStart ?? 0;
    const textBefore = target.value.slice(0, start);
    const splitBefore = textBefore.split("\n");
    const currentLine = splitBefore.length;
    const currentCol = splitBefore[splitBefore.length - 1].length + 1;
    setCursorPos({ line: currentLine, col: currentCol });
  };

  // Handle Tab key to insert 4 spaces without blurring
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);
    }
  };

  // Clear editor content
  const handleClear = () => {
    onChange("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#171717] border-r-0 lg:border-r-2 border-[#141414] overflow-hidden select-text">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 bg-[#212121] border-b-2 border-[#141414] flex items-center justify-between gap-2 text-xs font-mono text-white/90">
        {/* Left Mac/Terminal dots and label */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9503F] border border-black/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EDB13E] border border-black/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4FA35A] border border-black/40" />
          </div>
          <span className="text-[#888888] font-bold tracking-wider uppercase text-[10px] hidden sm:inline">
            INPUT // SRC
          </span>
          <span className="text-white/80 font-bold text-[11px] truncate max-w-[120px] sm:max-w-none">
            snippet.{ext}
          </span>
        </div>

        {/* Center Title */}
        <div className="font-bold text-white tracking-wide text-xs hidden md:block">
          Your Code
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 hover:bg-[#EDB13E] hover:text-[#141414] hover:border-[#141414] text-[10px] sm:text-xs font-bold text-white transition-colors"
            title="Load sample code with an intentional bug"
          >
            SAMPLE BUG
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-2 py-0.5 rounded border border-white/10 hover:border-red-400 hover:text-red-400 text-[10px] sm:text-xs font-bold text-white/60 transition-colors"
            title="Clear code editor"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Gutter + Textarea body */}
      <div className="relative flex-1 flex overflow-hidden min-h-[360px] lg:min-h-[460px]">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 bg-[#1C1C1C] border-r border-[#333333] py-3 text-right select-none font-mono text-xs text-[#666666] overflow-hidden leading-6"
        >
          {Array.from({ length: lineCount }, (_, i) => {
            const lineNum = i + 1;
            const isError = errorLine === lineNum;
            return (
              <div
                key={lineNum}
                className={`pr-3 ${
                  isError
                    ? "bg-[#D9503F]/25 text-[#D9503F] font-black border-r-2 border-[#D9503F]"
                    : ""
                }`}
              >
                {lineNum < 10 ? `0${lineNum}` : lineNum}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <div className="relative flex-1 h-full">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onSelect={handleSelect}
            onKeyUp={handleSelect}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            wrap="off"
            placeholder="// Paste your code here and prepare to be roasted..."
            className="w-full h-full bg-[#171717] text-[#F7F3EA] font-mono text-xs sm:text-sm leading-6 p-3 outline-none resize-none overflow-auto whitespace-pre font-normal selection:bg-[#EDB13E] selection:text-[#141414]"
          />
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="h-7 px-4 bg-[#212121] border-t border-[#333333] flex items-center justify-between text-[11px] font-mono text-[#888888] select-none">
        <div className="flex items-center gap-2">
          <span>
            Ln {cursorPos.line}, Col {cursorPos.col}
          </span>
          <span>·</span>
          <span className="text-white/80">{languageLabel}</span>
          {errorLine && (
            <span className="text-[#D9503F] font-bold">
              · ⚠ Flagged Line {errorLine}
            </span>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[#888888]">
          <span>UTF-8</span>
          <span>·</span>
          <span>Tab Size: 4</span>
          <span>·</span>
          <span>{code.length.toLocaleString()} chars</span>
        </div>
      </div>
    </div>
  );
}
