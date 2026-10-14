const stats = [
  { label: 'Pendapatan bulan ini', value: 'Rp 46.5Jt', delta: '+18%' },
  { label: 'Pesanan', value: '1.240', delta: '+12%' },
  { label: 'Rata-rata order', value: 'Rp 375.000', delta: '+6%' },
  { label: 'Retur', value: '18', delta: '-2%' },
];

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB] p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.12em] text-[#E03686]">Analytics</p>
          <h1 className="mt-2 text-3xl font-bold text-[#0B2948]">Laporan penjualan</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-2xl font-bold text-[#0B2948]">{item.value}</p>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">{item.delta}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0B2948]">Trend penjualan</h2>
            <div className="mt-6 h-60 rounded-2xl bg-gradient-to-br from-[#0B2948]/10 via-white to-[#FF4D9E]/10"></div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0B2948]">Top produk</h2>
            <div className="mt-6 space-y-4">
              {[
                ['Kaos Premium', 'Rp 3.8Jt'],
                ['Tas Ransel', 'Rp 2.7Jt'],
                ['Sepatu Casual', 'Rp 2.1Jt'],
              ].map(([name, value]) => (
                <div key={name} className="flex items-center justify-between rounded-xl bg-[#F7F9FB] p-3">
                  <p className="font-semibold text-[#0B2948]">{name}</p>
                  <span className="text-sm font-semibold text-slate-500">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
