import { Agent } from '../data/agents';

type Props = {
  agent: Agent;
};

export default function AgentCard({ agent }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-slate-800 text-sm leading-snug">{agent.name}</h3>
        <div className="flex items-center gap-1 ml-2 shrink-0">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-slate-700 text-xs font-medium">{agent.rating}</span>
          <span className="text-slate-400 text-xs">({agent.reviewCount})</span>
        </div>
      </div>

      <p className="text-slate-500 text-xs leading-relaxed mb-3">{agent.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {agent.specialties.map((s) => (
          <span
            key={s}
            className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-xs">創業 {agent.established}年</span>
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
          詳細を見る
        </button>
      </div>
    </div>
  );
}
