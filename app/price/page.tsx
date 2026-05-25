'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PRICE_LEVELS, SUPPORTED_COUNTRIES, AGENTS_BY_COUNTRY } from '../data/agents';
import AgentCard from '../components/AgentCard';

const COLOR_MAP: Record<string, {
  card: string; activeCard: string; yen: string;
  pill: string; activePill: string; dot: string; panel: string;
}> = {
  emerald: {
    card: 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50',
    activeCard: 'border-emerald-500 bg-emerald-500 text-white shadow-lg',
    yen: 'text-emerald-500',
    pill: 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300',
    activePill: 'border-emerald-500 bg-emerald-500 text-white',
    dot: 'bg-emerald-400',
    panel: 'bg-emerald-50 border-emerald-100',
  },
  sky: {
    card: 'border-sky-200 hover:border-sky-400 hover:bg-sky-50',
    activeCard: 'border-sky-500 bg-sky-500 text-white shadow-lg',
    yen: 'text-sky-500',
    pill: 'border-slate-200 bg-white text-slate-700 hover:border-sky-300',
    activePill: 'border-sky-500 bg-sky-500 text-white',
    dot: 'bg-sky-400',
    panel: 'bg-sky-50 border-sky-100',
  },
  amber: {
    card: 'border-amber-200 hover:border-amber-400 hover:bg-amber-50',
    activeCard: 'border-amber-500 bg-amber-500 text-white shadow-lg',
    yen: 'text-amber-500',
    pill: 'border-slate-200 bg-white text-slate-700 hover:border-amber-300',
    activePill: 'border-amber-500 bg-amber-500 text-white',
    dot: 'bg-amber-400',
    panel: 'bg-amber-50 border-amber-100',
  },
  rose: {
    card: 'border-rose-200 hover:border-rose-400 hover:bg-rose-50',
    activeCard: 'border-rose-500 bg-rose-500 text-white shadow-lg',
    yen: 'text-rose-500',
    pill: 'border-slate-200 bg-white text-slate-700 hover:border-rose-300',
    activePill: 'border-rose-500 bg-rose-500 text-white',
    dot: 'bg-rose-400',
    panel: 'bg-rose-50 border-rose-100',
  },
};

export default function PricePage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const level = PRICE_LEVELS.find((p) => p.id === selectedLevel);
  const agents = selectedCountry ? (AGENTS_BY_COUNTRY[selectedCountry] ?? []) : [];

  const handleLevelSelect = (id: string) => {
    setSelectedLevel(id === selectedLevel ? null : id);
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
        <span className="text-slate-500 text-xs">値段別検索</span>
        {level && (
          <span className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${COLOR_MAP[level.color].panel} border`}>
            {level.yen} {level.label} · {level.budget}
          </span>
        )}
      </header>

      <div className="flex-1 px-4 py-5 max-w-2xl mx-auto w-full">
        {/* 4 level cards */}
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3">
          予算レベルを選ぶ
        </p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {PRICE_LEVELS.map((p) => {
            const c = COLOR_MAP[p.color];
            const isActive = selectedLevel === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleLevelSelect(p.id)}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                  isActive ? c.activeCard : `bg-white ${c.card}`
                }`}
              >
                <span className={`text-2xl font-bold tracking-tighter w-14 shrink-0 ${isActive ? 'text-white' : c.yen}`}>
                  {p.yen}
                </span>
                <div>
                  <p className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-slate-800'}`}>
                    {p.label}
                  </p>
                  <p className={`text-xs mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                    {p.budget}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Country & agent section */}
        {level && (
          <>
            {/* Note */}
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">{level.note}</p>

            {/* Country pills */}
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2">
              対象の国
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {level.countryCodes.map((code) => {
                const c = COLOR_MAP[level.color];
                const isActive = selectedCountry === code;
                return (
                  <button
                    key={code}
                    onClick={() => setSelectedCountry(isActive ? null : code)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                      isActive ? c.activePill : c.pill
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-white' : c.dot}`} />
                    {SUPPORTED_COUNTRIES[code]}
                    <span className={`text-xs ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                      {AGENTS_BY_COUNTRY[code]?.length ?? 0}件
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Agent cards */}
            {selectedCountry && (
              <>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3">
                  エージェント一覧 — {agents.length}件
                </p>
                <div className="space-y-3">
                  {agents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Empty state */}
        {!selectedLevel && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-3">💰</div>
            <p className="text-slate-500 text-sm">上から予算レベルを選んでください</p>
          </div>
        )}
      </div>
    </div>
  );
}
