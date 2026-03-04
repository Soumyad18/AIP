interface SkillGapListProps {
  title: string;
  items: string[];
  emptyText: string;
}

export const SkillGapList = ({ title, items, emptyText }: SkillGapListProps) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <h4 className="mb-3 text-lg font-semibold text-slate-900">{title}</h4>
    {items.length === 0 ? (
      <p className="text-sm text-slate-500">{emptyText}</p>
    ) : (
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    )}
  </div>
);
