const orders = [
  { id: '#1042', customer: 'Budi Santoso', total: 'Rp 450.000', status: 'Paid' },
  { id: '#1041', customer: 'Sari Wulandari', total: 'Rp 890.000', status: 'Packed' },
  { id: '#1040', customer: 'Andi Pratama', total: 'Rp 120.000', status: 'Pending' },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB] p-8">
      <div className="mx-auto max-w-6xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,41,72,0.06)]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-[#E03686]">Pesanan</p>
            <h1 className="mt-2 text-3xl font-bold text-[#0B2948]">Daftar pesanan</h1>
          </div>
          <button className="rounded-xl bg-[#FF4D9E] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:bg-[#E03686]">
            Export data
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-[#0B2948] text-white">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold">Order ID</th>
                <th className="px-4 py-3 text-sm font-semibold">Customer</th>
                <th className="px-4 py-3 text-sm font-semibold">Total</th>
                <th className="px-4 py-3 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-slate-200">
                  <td className="px-4 py-4 text-sm font-medium text-[#0B2948]">{order.id}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{order.customer}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-[#0B2948]">{order.total}</td>
                  <td className="px-4 py-4">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
