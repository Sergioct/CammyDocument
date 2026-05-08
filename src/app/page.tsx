"use client";

import { useState } from "react";
import { cammyData } from "@/data";

const buttonStyles: Record<string, string> = {
  LP: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  MP: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  HP: "bg-red-500/20 text-red-400 border-red-500/50",
  LK: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  MK: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  HK: "bg-red-500/20 text-red-400 border-red-500/50",
  DI: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/50",
  DP: "bg-orange-500/20 text-orange-400 border-orange-500/50",
  DR: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
  DRC: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
  SA1: "bg-sky-500/20 text-sky-400 border-sky-500/50",
  SA2: "bg-sky-500/20 text-sky-400 border-sky-500/50",
  SA3: "bg-sky-500/20 text-sky-400 border-sky-500/50",
  OD: "bg-amber-500/20 text-amber-400 border-amber-500/50",
  xx: "text-zinc-500 border-transparent",
  ">": "text-zinc-500 border-transparent",
};

const COMBO_REGEX = /(LP|MP|HP|LK|MK|HK|DI|DP|DRC|DR|SA1|SA2|SA3|OD|xx|>)/g;

function FormatComboText({ text }: { text: string }) {
  if (typeof text !== "string") return <>{text}</>;

  const parts = text.split(COMBO_REGEX);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        const style = buttonStyles[part];
        if (style) {
          if (part === "xx" || part === ">") {
            return (
              <span key={i} className="mx-1 text-zinc-500 font-bold">
                {part}
              </span>
            );
          }
          return (
            <span
              key={i}
              className={`inline-flex items-center justify-center px-1.5 py-0.5 mx-[1px] text-[10px] font-black border rounded shadow-sm ${style}`}
            >
              {part}
            </span>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function Home() {
  const sheetNames = Object.keys(cammyData);
  const [activeTab, setActiveTab] = useState(sheetNames[0]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800 px-6 py-12 text-center shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[600px] h-[200px] bg-emerald-600/30 blur-[100px] rounded-full"></div>
        </div>
        <h1 className="relative text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 drop-shadow-sm uppercase">
          CAMMY COMBAT INTEL
        </h1>
        <p className="relative mt-3 text-zinc-400 font-medium tracking-wide">
          Tactical data, setups, and execution drills.
        </p>
        <p className="relative mt-2 text-sm text-zinc-500 font-bold uppercase tracking-widest">
          Created by <span className="text-emerald-400">notz</span>
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto custom-scrollbar">
          <ul className="flex space-x-2 py-3">
            {sheetNames.map((sheetName) => {
              const isActive = activeTab === sheetName;
              return (
                <li
                  key={sheetName}
                  onClick={() => setActiveTab(sheetName)}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap rounded-lg cursor-pointer transition-all duration-300 select-none ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 border border-transparent"
                  }`}
                >
                  {sheetName.replace(/^\d+\./, "")}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
        {sheetNames.map((sheetName) => {
          if (activeTab !== sheetName) return null;
          const sheetData = cammyData[sheetName as keyof typeof cammyData];

          if (sheetData.columns.length === 0 && sheetData.rows.length === 0) {
            return (
              <div key={sheetName} className="text-center py-20 text-zinc-600">
                <p>No intel available for this section.</p>
              </div>
            );
          }

          // Render tables, grouping by breaks if necessary
          return (
            <div
              key={sheetName}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm"
            >
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-900 border-b border-zinc-800 text-zinc-100">
                      {sheetData.columns.map((col: string, idx: number) => {
                        return (
                          <th
                            key={idx}
                            className="p-4 text-xs font-black uppercase tracking-widest whitespace-nowrap"
                          >
                            <FormatComboText text={col} />
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {sheetData.rows.map((row: any[], rowIdx: number) => {
                      const nonEmptyCells = row.filter((cell) => cell !== "");
                      if (nonEmptyCells.length === 0) return null;

                      // Heuristic: If a row only has 1 value, treat it as a section divider/paragraph
                      const isSectionHeader = nonEmptyCells.length === 1;

                      if (isSectionHeader) {
                        const cellValue = nonEmptyCells[0];
                        return (
                          <tr key={rowIdx} className="bg-emerald-950/20">
                            <td
                              colSpan={sheetData.columns.length}
                              className="px-4 py-6 text-sm font-semibold text-emerald-400/90 whitespace-pre-wrap"
                            >
                              <FormatComboText text={cellValue as string} />
                            </td>
                          </tr>
                        );
                      }

                      return (
                        <tr
                          key={rowIdx}
                          className="hover:bg-zinc-800/50 transition-colors group"
                        >
                          {row.map((cellValue: any, cellIdx: number) => {
                            if (typeof cellValue === "string" && cellValue.includes("youtube.com")) {
                              const parts = cellValue.split(" - ");
                              const text = parts.length > 1 ? parts[0] : "YouTube Link";
                              const url = parts.length > 1 ? parts[1] : cellValue;
                              const href = url.startsWith("http") ? url : `https://${url}`;
                              
                              return (
                                <td key={cellIdx} className="p-4 text-sm font-medium">
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                                  >
                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                    <span>{text}</span>
                                  </a>
                                </td>
                              );
                            }

                            return (
                              <td
                                key={cellIdx}
                                className={`p-4 text-sm font-medium ${
                                  cellValue !== "" ? "text-zinc-300" : "text-zinc-600"
                                }`}
                              >
                                <FormatComboText text={cellValue as string} />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(24, 24, 27, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(82, 82, 91, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(113, 113, 122, 0.8);
        }
      `}</style>
    </div>
  );
}
