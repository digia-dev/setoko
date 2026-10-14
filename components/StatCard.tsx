type StatCardProps = {
  label: string;
  value: string;
  trend: string;
};

export default function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-2xl font-bold text-[#0B2948]">{value}</p>
        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
          {trend}
        </span>
      </div>
    </div>
  );
}
