'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AgentCard from './AgentCard';
import { AGENTS_BY_COUNTRY, SUPPORTED_COUNTRIES } from '../data/agents';

const WorldMap = dynamic(() => import('./WorldMap'), { ssr: false });

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleCountrySelect = (code: string, name: string) => {
    setSelectedCountry((prev) => (prev === code ? null : code));
    void name;
  };

  const agents = selectedCountry ? (AGENTS_BY_COUNTRY[selectedCountry] ?? []) : [];
  const countryName = selectedCountry ? SUPPORTED_COUNTRIES[selectedCountry] : null;
  const isOpen = !!selectedCountry;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-900">
      {/* Map — full screen */}
      <div className="absolute inset-0">
        <WorldMap selectedCountry={selectedCountry} onCountrySelect={handleCountrySelect} />
      </div>

      {/* Header overlay */}
      <header className="absolute top-0 left-0 right-0 z-10 px-4 py-3 flex items-center gap-2"
        style={{ background: 'linear-gradient(to bottom, rgba(15,23,42,0.7) 0%, transparent 100%)' }}>
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0">
            S
          </div>
          <span className="text-white font-semibold text-sm">StudyAgent</span>
        </Link>
        <span className="text-white/40 text-xs ml-1">マップ検索</span>

        {/* Hint when nothing selected */}
        {!isOpen && (
          <span className="ml-auto text-white/60 text-xs bg-white/10 rounded-full px-3 py-1">
            🟢 緑の国をタップ
          </span>
        )}
      </header>

      {/* Bottom sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-white rounded-t-3xl shadow-2xl flex flex-col"
          style={{ maxHeight: '55vh' }}>

          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 bg-slate-200 rounded-full" />
          </div>

          {/* Sheet header */}
          <div className="px-5 pt-1 pb-3 flex items-center justify-between shrink-0 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-800 text-lg">{countryName}</h2>
              <p className="text-slate-400 text-sm">{agents.length}件のエージェント</p>
            </div>
            <button
              onClick={() => setSelectedCountry(null)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors text-lg"
            >
              ×
            </button>
          </div>

          {/* Agent cards — scrollable */}
          <div className="overflow-y-auto px-4 py-3 space-y-3 pb-8">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
