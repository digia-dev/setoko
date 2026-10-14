import Link from 'next/link';
import StatCard from '../components/StatCard';

const stats = [
  { label: 'Produk', value: '128', trend: '+12%' },
  { label: 'Pesanan hari ini', value: '39', trend: '+8%' },
  { label: 'Pendapatan', value: 'Rp 18.7Jt', trend: '+15%' },
  { label: 'Pengunjung', value: '2.1k', trend: '+21%' },
];

const products = [
  { name: 'Kaos Premium', stock: 12, price: 'Rp149.000' },
  { name: 'Tas Ransel', stock: 7, price: 'Rp249.000' },
  { name: 'Sepatu Casual', stock: 5, price: 'Rp399.000' },
];

const recentOrders = [
  { id: '#1042', buyer: 'Budi Santoso', amount: 'Rp 450.000', status: 'Paid' },
  { id: '#1041', buyer: 'Sari Wulandari', amount: 'Rp 890.000', status: 'Packed' },
  { id: '#1040', buyer: 'Andi Pratama', amount: 'Rp 120.000', status: 'Pending' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-slate-200 bg-[#0B2948] text-white">
        <div className="flex items-center gap-3 p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <span className="text-lg font-bold text-[#FF4D9E]">S</span>
          </div>
          <div>
            <p className="text-lg font-bold">Setoko</p>
            <p className="text-xs text-slate-300">Owner dashboard</p>
          </div>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          {[
            ['Dashboard', true],
            ['Produk', false],
            ['Pesanan', false],
            ['Pembayaran', false],
            ['Setting Toko', false],
          ].map(([label, active]) => (
            <div
              key={label}
              className={`rounded-xl px-4 py-3 text-sm font-medium ${
                active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {label}
            </div>
          ))}
        </nav>
      </aside>

      <main className="ml-64 p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-[#E03686]">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-[#0B2948]">Ringkasan toko</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0B2948]">
              Lihat toko
            </button>
            <Link href="/products/new">
              <a className="rounded-xl bg-[#FF4D9E] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:bg-[#E03686]">
                + Tambah produk
              </a>
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} trend={stat.trend} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0B2948]">Produk terbaru</h2>
              <button className="text-sm font-semibold text-[#0B2948]">Lihat semua</button>
            </div>

            <div className="mt-6 space-y-4">
              {products.map((product) => (
                <div key={product.name} className="flex items-center justify-between rounded-2xl bg-[#F7F9FB] p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0B2948]/10 to-[#FF4D9E]/10"></div>
                    <div>
                      <p className="font-semibold text-[#0B2948]">{product.name}</p>
                      <p className="text-sm text-slate-500">{product.price}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500">Stok</p>
                    <p className="text-lg font-bold text-[#0B2948]">{product.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0B2948]">Pesanan terbaru</h2>
              <button className="text-sm font-semibold text-[#0B2948]">Lihat semua</button>
            </div>

            <div className="mt-6 space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="rounded-2xl bg-[#F7F9FB] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#0B2948]">{order.id}</p>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        order.status === 'Paid'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Packed'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600">{order.buyer}</p>
                  <p className="mt-1 text-base font-bold text-[#0B2948]">{order.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
