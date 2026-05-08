"use client";

import { useState } from "react";
import { cammyData } from "@/data";

export default function Home() {
  const sheetNames = Object.keys(cammyData);
  const [activeTab, setActiveTab] = useState(sheetNames[0]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-slate-800 text-white p-4 shadow-md text-center">
        <h1 className="text-2xl font-bold">Cammy Document</h1>
      </header>

      <div className="bg-gray-200 px-4 overflow-x-auto border-b-2 border-blue-500">
        <ul className="flex whitespace-nowrap pt-2">
          {sheetNames.map((sheetName) => (
            <li
              key={sheetName}
              onClick={() => setActiveTab(sheetName)}
              className={`px-5 py-2 cursor-pointer rounded-t-md font-medium transition-colors ${
                activeTab === sheetName
                  ? "bg-white text-blue-600 border border-b-0 border-gray-300 -mb-[1px]"
                  : "text-gray-600 hover:bg-white/50"
              }`}
            >
              {sheetName}
            </li>
          ))}
        </ul>
      </div>

      <main className="p-4 md:p-8 bg-white min-h-[calc(100vh-120px)] overflow-x-auto">
        {sheetNames.map((sheetName) => {
          if (activeTab !== sheetName) return null;
          const sheetData = cammyData[sheetName as keyof typeof cammyData];

          if (sheetData.columns.length === 0 && sheetData.rows.length === 0) {
            return <p key={sheetName}>No hay datos en esta hoja.</p>;
          }

          return (
            <table key={sheetName} className="w-full border-collapse mt-4 text-sm">
              <thead>
                <tr>
                  {sheetData.columns.map((col: string, idx: number) => (
                    <th key={idx} className="bg-slate-800 text-white font-semibold p-3 border border-gray-300 text-left">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sheetData.rows.map((row: any[], rowIdx: number) => {
                  if (row.every((cell) => cell === "")) return null;
                  return (
                    <tr key={rowIdx} className="hover:bg-gray-100 even:bg-gray-50">
                      {row.map((cellValue: any, cellIdx: number) => (
                        <td key={cellIdx} className="p-3 border border-gray-300 text-left">
                          {cellValue}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </main>
    </div>
  );
}
