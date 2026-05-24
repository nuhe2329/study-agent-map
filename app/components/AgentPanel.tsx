import { Agent, SUPPORTED_COUNTRIES } from '../data/agents';
import AgentCard from './AgentCard';

type Props = {
  selectedCountry: string | null;
  agents: Agent[];
};

export default function AgentPanel({ selectedCountry, agents }: Props) {
  const countryName = selectedCountry ? SUPPORTED_COUNTRIES[selectedCountry] : null;

  if (!selectedCountry) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="text-5xl mb-4">🌍</div>
        <h2 className="text-slate-600 font-medium mb-2">国を選んでください</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          地図上の<span className="text-green-500 font-medium">緑色の国</span>をクリックすると、
          その国に特化した留学エージェントが表示されます。
        </p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {Object.values(SUPPORTED_COUNTRIES).map((name) => (
            <span key={name} className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full border border-green-200">
              {name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 pt-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <h2 className="font-semibold text-slate-800">{countryName}</h2>
          <span className="text-slate-400 text-sm ml-auto">{agents.length}件</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {agents.length === 0 ? (
          <p className="text-slate-400 text-sm text-center mt-8">
            現在エージェント情報がありません
          </p>
        ) : (
          agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)
        )}
      </div>
    </div>
  );
}
