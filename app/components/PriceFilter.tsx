'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PRICE_LEVELS, SUPPORTED_COUNTRIES, AGENTS_BY_COUNTRY } from '../data/agents';

const COLOR_MAP: Record<string, { btn: string; activeBtn: string; badge: string; chip: string; dot: string }> = {
  emerald: {
    btn: 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50',
    activeBtn: 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-100',
    badge: 'text-emerald-600',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
    dot: 'bg-emerald-400',
  },
  sky: {
    btn: 'border-sky-200 hover:border-sky-400 hover:bg-sky-50',
    activeBtn: 'border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-100',
    badge: 'text-sky-600',
    chip: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100',
    dot: 'bg-sky-400',
  },
  amber: {
    btn: 'border-amber-200 hover:border-amber-400 hover:bg-amber-50',
    activeBtn: 'border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-100',
    badge: 'text-amber-600',
    chip: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    dot: 'bg-amber-400',
  },
  rose: {
    btn: 'border-rose-200 hover:border-rose-400 hover:bg-rose-50',
    activeBtn: 'border-rose-500 bg-rose-500 text-white shadow-lg shadow-rose-100',
    badge: 'text-rose-600',
    chip: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
    dot: 'bg-rose-400',
  },
};

export default function PriceFilter() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = PRICE_LEVELS.find((p) => p.id === activeId);

  return (
    <div className="w-full max-w-2xl">
      {/* Section title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-slate-100" />
        <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
          💰 予算別で探す
        </p>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* 4 level buttons */}
      <div className="grid grid-cols-4 gap-2">
        {PRICE_LEVELS.map((p) => {
          const c = COLOR_MAP[p.color];
          const isActive = activeId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActiveId(isActive ? null : p.id)}
              className={`flex flex-col items-center py-3 px-2 rounded-xl border-2 transition-all duration-150 ${
                isActive ? c.activeBtn : `bg-white text-slate-700 ${c.btn}`
              }`}
            >
              <span className={`text-sm font-bold tracking-tight ${isActive ? 'text-white' : c.badge}`}>
                {p.yen}
              </span>
              <span className={`text-xs font-medium mt-0.5 ${isActive ? 'text-white/90' : 'text-slate-600'}`}>
                {p.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel — slides in when a level is selected */}
      {active && (
        <div className="mt-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className={`text-xs font-semibold ${COLOR_MAP[active.color].badge}`}>
                {active.yen} {active.label}
              </span>
              <p className="text-slate-700 font-semibold text-sm mt-0.5">{active.budget}</p>
            </div>
            <p className="text-slate-400 text-xs max-w-[55%] text-right leading-snug">{active.note}</p>
          </div>

          {/* Country chips → link to regions */}
          <div className="flex flex-wrap gap-2">
            {active.countryCodes.map((code) => {
              const c = COLOR_MAP[active.color];
              const agentCount = AGENTS_BY_COUNTRY[code]?.length ?? 0;
              return (
                <Link
                  key={code}
                  href="/regions"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${c.chip}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                  {SUPPORTED_COUNTRIES[code]}
                  <span className="opacity-60">{agentCount}件</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
