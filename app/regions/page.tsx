'use client';

import { useState } from 'react';
import Link from 'next/link';
import { REGIONS, SUPPORTED_COUNTRIES, AGENTS_BY_COUNTRY } from '../data/agents';
import AgentCard from '../components/AgentCard';

export default function RegionsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const region = REGIONS.find((r) => r.id === selectedRegion);
  const agents = selectedCountry ? (AGENTS_BY_COUNTRY[selectedCountry] ?? []) : [];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
            S
          </div>
          <span className="font-semibold text-slate-800">StudyAgent</span>
        </Link>
        <span className="text-slate-300 mx-1">|</span>
        <span className="text-slate-500 text-sm">地域別検索</span>
        {region && (
          <>
            <span className="text-slate-300 mx-1">›</span>
            <span className="text-blue-600 text-sm font-medium">{region.emoji} {region.name}</span>
          </>
        )}
        {selectedCountry && (
          <>
            <span className="text-slate-300 mx-1">›</span>
            <span className="text-blue-600 text-sm font-medium">{SUPPORTED_COUNTRIES[selectedCountry]}</span>
          </>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: region & country selector */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">地域を選ぶ</p>
          </div>
          <nav className="flex-1 overflow-y-auto">
            {REGIONS.map((r) => (
              <div key={r.id}>
                {/* Region button */}
                <button
                  onClick={() => {
                    setSelectedRegion(r.id === selectedRegion ? null : r.id);
                    setSelectedCountry(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    selectedRegion === r.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xl">{r.emoji}</span>
                  <span className="text-sm">{r.name}</span>
                  <span className="ml-auto text-xs text-slate-400">{r.countryCodes.length}カ国</span>
                </button>

                {/* Country list (accordion) */}
                {selectedRegion === r.id && (
                  <div className="bg-slate-50 border-t border-slate-100">
                    {r.countryCodes.map((code) => (
                      <button
                        key={code}
                        onClick={() => setSelectedCountry(code === selectedCountry ? null : code)}
                        className={`w-full flex items-center gap-2 pl-12 pr-4 py-2.5 text-left text-sm transition-colors ${
                          selectedCountry === code
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${selectedCountry === code ? 'bg-blue-500' : 'bg-slate-300'}`} />
                        {SUPPORTED_COUNTRIES[code]}
                        <span className="ml-auto text-xs text-slate-400">
                          {AGENTS_BY_COUNTRY[code]?.length ?? 0}件
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right: agent list */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedCountry ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-4">🗺️</div>
              <h2 className="text-slate-600 font-medium mb-2">地域・国を選んでください</h2>
              <p className="text-slate-400 text-sm">
                左のメニューから地域 → 国の順に選ぶと<br />エージェント一覧が表示されます。
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h2 className="font-semibold text-slate-800">
                  {SUPPORTED_COUNTRIES[selectedCountry]}のエージェント
                </h2>
                <p className="text-slate-400 text-sm">{agents.length}件</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {agents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
