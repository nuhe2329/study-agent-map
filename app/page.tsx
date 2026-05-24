import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-8 py-5 flex items-center gap-3 border-b border-green-100">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
          S
        </div>
        <span className="text-slate-800 font-semibold text-lg">StudyAgent</span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Green accent band */}
        <div className="w-16 h-1.5 bg-green-400 rounded-full mb-6" />
        <p className="text-green-600 text-sm font-medium tracking-widest uppercase mb-3">
          留学エージェントマッチング
        </p>
        <h1 className="text-slate-800 text-4xl md:text-5xl font-bold leading-tight mb-4">
          あなたにぴったりの<br />
          <span className="text-green-500">留学エージェント</span>を見つけよう
        </h1>
        <p className="text-slate-500 text-lg mb-12 max-w-md">
          認知度は低くても、サービス品質が高いエージェントを厳選。
          シンプルな検索でベストな留学をサポート。
        </p>

        {/* Search mode cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
          <Link
            href="/regions"
            className="group bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-400 rounded-2xl p-6 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
          >
            <div className="text-4xl mb-4">🌍</div>
            <h2 className="text-slate-800 font-semibold text-lg mb-1">地域別で探す</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              オセアニア・北米・ヨーロッパ・アジアなど、
              地域を選んで国を絞り込む。
            </p>
            <div className="mt-4 flex items-center gap-1 text-green-600 text-sm font-medium group-hover:gap-2 transition-all">
              地域から探す <span>→</span>
            </div>
          </Link>

          <Link
            href="/map"
            className="group bg-white hover:bg-green-50 border border-slate-200 hover:border-green-400 rounded-2xl p-6 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
          >
            <div className="text-4xl mb-4">🗺️</div>
            <h2 className="text-slate-800 font-semibold text-lg mb-1">マップで探す</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              インタラクティブな世界地図から
              行きたい国をクリックして探す。
            </p>
            <div className="mt-4 flex items-center gap-1 text-green-600 text-sm font-medium group-hover:gap-2 transition-all">
              マップを開く <span>→</span>
            </div>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-14 flex gap-10 text-center">
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

