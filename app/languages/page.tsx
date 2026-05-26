'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LANGUAGES, SUPPORTED_COUNTRIES, AGENTS_BY_COUNTRY } from '../data/agents';
import AgentCard from '../components/AgentCard';

export default function LanguagesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const language = LANGUAGES.find((l) => l.id === selectedLanguage);
  const agents = selectedCountry ? (AGENTS_BY_COUNTRY[selectedCountry] ?? []) : [];

  const handleLanguageSelect = (id: string) => {
    setSelectedLanguage(id === selectedLanguage ? null : id);
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
        <span className="text-slate-500 text-xs">言語別検索</span>
        {language && (
          <span className="ml-auto text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
            {language.emoji} {language.name}
            {selectedCountry && ` › ${SUPPORTED_COUNTRIES[selectedCountry]}`}
          </span>
        )}
      </header>

      {/* ── MOBILE layout (< md) ── */}
      <div className="md:hidden flex flex-col flex-1">

        {/* Step 1: Language selector */}
        <div className="p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3">
            言語を選ぶ
          </p>
          <div className="grid grid-cols-2 gap-3">
            {LANGUAGES.map((l) => (
              <button
                key={l.id}
                onClick={() => handleLanguageSelect(l.id)}
                className={`flex flex-col items-start p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedLanguage === l.id
                    ? 'border-green-400 bg-green-50'
                    : 'border-slate-200 bg-white hover:border-green-300'
                }`}
              >
                <span className="text-2xl mb-2">{l.emoji}</span>
                <span className="font-semibold text-slate-800 text-sm">{l.name}</span>
                <span className="text-slate-400 text-xs mt-0.5">{l.nativeName}</span>
                <span className="text-slate-400 text-xs mt-0.5">{l.countryCodes.length}カ国</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Country selector */}
        {language && (
          <div className="px-4 pb-4">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3">
              国を選ぶ
            </p>
            <div className="flex flex-wrap gap-2">
              {language.countryCodes.map((code) => (
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
        {!selectedLanguage && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-12">
            <div className="text-5xl mb-3">🌐</div>
            <p className="text-slate-500 text-sm">上から言語を選んでください</p>
          </div>
        )}
      </div>

      {/* ── DESKTOP layout (≥ md) ── */}
      <div className="hidden md:flex flex-1 overflow-hidden">

        {/* Left sidebar */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">言語を選ぶ</p>
          </div>
          <nav className="flex-1 overflow-y-auto">
            {LANGUAGES.map((l) => (
              <div key={l.id}>
                <button
                  onClick={() => handleLanguageSelect(l.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    selectedLanguage === l.id
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xl">{l.emoji}</span>
                  <div className="flex flex-col">
                    <span className="text-sm">{l.name}</span>
                    <span className="text-xs text-slate-400">{l.nativeName}</span>
                  </div>
                  <span className="ml-auto text-xs text-slate-400">{l.countryCodes.length}カ国</span>
                </button>

                {selectedLanguage === l.id && (
                  <div className="bg-slate-50 border-t border-slate-100">
                    {l.countryCodes.map((code) => (
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
              <div className="text-5xl mb-4">🌐</div>
              <h2 className="text-slate-600 font-medium mb-2">言語・国を選んでください</h2>
              <p className="text-slate-400 text-sm">
                左のメニューから言語 → 国の順に選ぶと<br />エージェント一覧が表示されます。
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
