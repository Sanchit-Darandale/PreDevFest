"use client";

import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b-2 border-[#141414] bg-[#EFF2FB] px-4 py-3 sm:px-6 transition-all animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D9503F]" />
          <label
            htmlFor="error-input"
            className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#141414]"
          >
            Attach Terminal Traceback / Compiler Error (Optional)
          </label>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-mono font-bold text-[#66625B] hover:text-[#141414] px-2 py-0.5 rounded border border-[#141414]/30 hover:border-[#141414] transition-colors"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        id="error-input"
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="TypeError: unsupported operand type(s) for +=: 'int' and 'list'&#10;  File &quot;main.py&quot;, line 5, in calculate_average"
        className="w-full bg-[#FFFDF8] border-2 border-[#141414] rounded-lg p-2.5 font-mono text-xs text-[#141414] placeholder-[#141414]/40 focus:outline-none focus:ring-2 focus:ring-[#EDB13E] brutal-shadow-sm resize-none"
      />
    </div>
  );
}
