'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AgentPanel from './AgentPanel';
import { AGENTS_BY_COUNTRY } from '../data/agents';

const WorldMap = dynamic(() => import('./WorldMap'), { ssr: false });

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(null);

  const handleCountrySelect = (code: string, name: string) => {
    if (selectedCountry === code) {
      setSelectedCountry(null);
      setSelectedCountryName(null);
    } else {
      setSelectedCountry(code);
      setSelectedCountryName(name);
    }
  };

  const agents = selectedCountry ? (AGENTS_BY_COUNTRY[selectedCountry] ?? []) : [];

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3 shrink-0">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
            S
          </div>
          <span className="font-semibold text-slate-800">StudyAgent</span>
        </Link>
        <span className="text-slate-300 mx-1">|</span>
        <span className="text-slate-500 text-sm">マップ検索</span>
        {selectedCountryName && (
          <>
            <span className="text-slate-300 mx-1">›</span>
            <span className="text-blue-600 text-sm font-medium">{selectedCountryName}</span>
          </>
        )}
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Map area */}
        <div className="flex-1 p-4">
          <WorldMap
            selectedCountry={selectedCountry}
            onCountrySelect={handleCountrySelect}
          />
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-slate-200 overflow-hidden shrink-0">
          <AgentPanel selectedCountry={selectedCountry} agents={agents} />
        </div>
      </div>
    </div>
  );
}
