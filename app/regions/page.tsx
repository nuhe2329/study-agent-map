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

  const handleRegionSelect = (id: string) => {
    setSelectedRegion(id === selectedRegion ? null : id);
    setSelectedCountry(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-2 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0">
            S
          </div>
          <span className="font-semibold text-slate-800 text-sm">StudyAgent</span>
        </Link>
        <span className="text-slate-300 mx-1 text-xs">|</span>
        <span className="text-slate-500 text-xs">地域別検索</span>
        {region && (
          <span className="ml-auto text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
            {region.emoji} {region.name}
            {selectedCountry && ` › ${SUPPORTED_COUNTRIES[selectedCountry]}`}
          </span>
        )}
      </header>

      {/* ── MOBILE layout (< md) ── */}
      <div className="md:hidden flex flex-col flex-1">

        {/* Step 1: Region selector */}
        <div className="p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3">
            地域を選ぶ
          </p>
          <div className="grid grid-cols-2 gap-3">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => handleRegionSelect(r.id)}
                className={`flex flex-col items-start p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedRegion === r.id
                    ? 'border-green-400 bg-green-50'
                    : 'border-slate-200 bg-white hover:border-green-300'
                }`}
              >
                <span className="text-2xl mb-2">{r.emoji}</span>
                <span className="font-semibold text-slate-800 text-sm">{r.name}</span>
                <span className="text-slate-400 text-xs mt-0.5">{r.countryCodes.length}カ国</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Country selector (appears when region selected) */}
        {region && (
          <div className="px-4 pb-4">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3">
              国を選ぶ
            </p>
            <div className="flex flex-wrap gap-2">
              {region.countryCodes.map((code) => (
                <button
                  key={code}
                  onClick={() => setSelectedCountry(code === selectedCountry ? null : code)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                    selectedCountry === code
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-green-300'
                  }`}
                >
                  {SUPPORTED_COUNTRIES[code]}
                  <span className={`text-xs ${selectedCountry === code ? 'text-green-100' : 'text-slate-400'}`}>
                    {AGENTS_BY_COUNTRY[code]?.length ?? 0}件
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Agent cards */}
        {selectedCountry && (
          <div className="px-4 pb-8">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3">
              エージェント一覧 — {agents.length}件
            </p>
            <div className="space-y-3">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!selectedRegion && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-12">
            <div className="text-5xl mb-3">🌏</div>
            <p className="text-slate-500 text-sm">上から地域を選んでください</p>
          </div>
        )}
      </div>

      {/* ── DESKTOP layout (≥ md) ── */}
      <div className="hidden md:flex flex-1 overflow-hidden">

        {/* Left sidebar */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">地域を選ぶ</p>
          </div>
          <nav className="flex-1 overflow-y-auto">
            {REGIONS.map((r) => (
              <div key={r.id}>
                <button
                  onClick={() => handleRegionSelect(r.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    selectedRegion === r.id
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xl">{r.emoji}</span>
                  <span className="text-sm">{r.name}</span>
                  <span className="ml-auto text-xs text-slate-400">{r.countryCodes.length}カ国</span>
                </button>

                {selectedRegion === r.id && (
                  <div className="bg-slate-50 border-t border-slate-100">
                    {r.countryCodes.map((code) => (
                      <button
                        key={code}
                        onClick={() => setSelectedCountry(code === selectedCountry ? null : code)}
                        className={`w-full flex items-center gap-2 pl-12 pr-4 py-2.5 text-left text-sm transition-colors ${
                          selectedCountry === code
                            ? 'bg-green-100 text-green-700 font-medium'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${selectedCountry === code ? 'bg-green-500' : 'bg-slate-300'}`} />
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
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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
