import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="px-8 py-5 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
          S
        </div>
        <span className="text-white font-semibold text-lg">StudyAgent</span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">
          留学エージェントマッチング
        </p>
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4">
          あなたにぴったりの<br />
          <span className="text-blue-400">留学エージェント</span>を見つけよう
        </h1>
        <p className="text-slate-400 text-lg mb-12 max-w-md">
          認知度は低くても、サービス品質が高いエージェントを厳選。
          シンプルな検索でベストな留学をサポート。
        </p>

        {/* Search mode cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
          <Link
            href="/regions"
            className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-2xl p-6 text-left transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="text-4xl mb-4">🌍</div>
            <h2 className="text-white font-semibold text-lg mb-1">地域別で探す</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              オセアニア・北米・ヨーロッパ・アジアなど、
              地域を選んで国を絞り込む。
            </p>
            <div className="mt-4 flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
              地域から探す <span>→</span>
            </div>
          </Link>

          <Link
            href="/map"
            className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/50 rounded-2xl p-6 text-left transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="text-4xl mb-4">🗺️</div>
            <h2 className="text-white font-semibold text-lg mb-1">マップで探す</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              インタラクティブな世界地図から
              行きたい国をクリックして探す。
            </p>
            <div className="mt-4 flex items-center gap-1 text-green-400 text-sm font-medium group-hover:gap-2 transition-all">
              マップを開く <span>→</span>
            </div>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-14 flex gap-10 text-center">
          <div>
            <p className="text-white text-2xl font-bold">8</p>
            <p className="text-slate-500 text-sm mt-0.5">対応国</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-white text-2xl font-bold">11</p>
            <p className="text-slate-500 text-sm mt-0.5">掲載エージェント</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-white text-2xl font-bold">無料</p>
            <p className="text-slate-500 text-sm mt-0.5">掲載・利用</p>
          </div>
        </div>
      </main>

      <footer className="px-8 py-5 text-center text-slate-600 text-xs">
        © 2026 StudyAgent
      </footer>
    </div>
  );
}

