"use client";

import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const formattedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between border-b-2 border-[#141414] pb-2 mb-3">
      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#141414] flex items-center gap-2">
        <span className="bg-[#141414] text-[#FFFDF8] px-1.5 py-0.5 rounded-sm text-[10px]">
          {formattedNumber}
        </span>
        <span>// {title}</span>
      </div>
      {children && (
        <div className="text-xs font-mono text-[#66625B]">{children}</div>
      )}
    </div>
  );
}
