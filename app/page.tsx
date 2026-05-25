'use client';

import { useState } from 'react';
import Link from 'next/link';
import PriceFilter from './components/PriceFilter';

const MODES = [
  { id: 'region', label: '地域別', emoji: '🌍', href: '/regions' },
  { id: 'price',  label: '値段別', emoji: '💰', href: null },
  { id: 'map',    label: 'マップ', emoji: '🗺️', href: '/map' },
] as const;

export default function Home() {
  const [activeMode, setActiveMode] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center gap-3 border-b border-green-100">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
          S
        </div>
        <span className="text-slate-800 font-semibold text-lg">StudyAgent</span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-1.5 bg-green-400 rounded-full mb-6" />
        <p className="text-green-600 text-sm font-medium tracking-widest uppercase mb-3">
          留学エージェントマッチング
        </p>
        <h1 className="text-slate-800 text-3xl md:text-5xl font-bold leading-tight mb-4">
          あなたにぴったりの<br />
          <span className="text-green-500">留学エージェント</span>を見つけよう
        </h1>
        <p className="text-slate-500 text-base md:text-lg mb-10 max-w-md">
          認知度は低くても、サービス品質が高いエージェントを厳選。
          シンプルな検索でベストな留学をサポート。
        </p>

        {/* 3 search buttons */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
          {MODES.map((m) => {
            const isActive = activeMode === m.id;
            const inner = (
              <>
                <span className="text-3xl mb-2">{m.emoji}</span>
                <span className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-slate-700'}`}>
                  {m.label}
                </span>
              </>
            );

            if (m.href) {
              return (
                <Link
                  key={m.id}
                  href={m.href}
                  className="flex flex-col items-center py-5 px-2 rounded-2xl border-2 border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-400 transition-all hover:scale-[1.03] hover:shadow-md"
                >
                  {inner}
                </Link>
              );
            }

            return (
              <button
                key={m.id}
                onClick={() => setActiveMode(isActive ? null : m.id)}
                className={`flex flex-col items-center py-5 px-2 rounded-2xl border-2 transition-all hover:scale-[1.03] ${
                  isActive
                    ? 'border-green-500 bg-green-500 shadow-lg shadow-green-100'
                    : 'border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-400'
                }`}
              >
                {inner}
              </button>
            );
          })}
        </div>

        {/* Price filter panel (値段別 selected) */}
        {activeMode === 'price' && (
          <div className="mt-5 w-full max-w-sm">
            <PriceFilter />
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 flex gap-10 text-center">
          <div>
            <p className="text-green-500 text-2xl font-bold">8</p>
            <p className="text-slate-400 text-sm mt-0.5">対応国</p>
          </div>
          <div className="w-px bg-green-100" />
          <div>
            <p className="text-green-500 text-2xl font-bold">11</p>
            <p className="text-slate-400 text-sm mt-0.5">掲載エージェント</p>
          </div>
          <div className="w-px bg-green-100" />
          <div>
            <p className="text-green-500 text-2xl font-bold">無料</p>
            <p className="text-slate-400 text-sm mt-0.5">掲載・利用</p>
          </div>
        </div>
      </main>

      <footer className="px-8 py-5 text-center text-slate-400 text-xs border-t border-green-50">
        © 2026 StudyAgent
      </footer>
    </div>
  );
}

