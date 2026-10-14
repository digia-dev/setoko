export default function OrderDetailPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB] p-8">
      <div className="mx-auto max-w-5xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,41,72,0.06)]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-[#E03686]">Pesanan</p>
            <h1 className="mt-2 text-3xl font-bold text-[#0B2948]">Order #1042</h1>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Paid</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-[#F7F9FB] p-5">
              <h2 className="text-lg font-bold text-[#0B2948]">Detail item</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#0B2948]">Kaos Premium</p>
                    <p className="text-sm text-slate-500">1 item</p>
                  </div>
                  <p className="font-bold text-[#0B2948]">Rp149.000</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#0B2948]">Tas Ransel</p>
                    <p className="text-sm text-slate-500">1 item</p>
                  </div>
                  <p className="font-bold text-[#0B2948]">Rp249.000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#F7F9FB] p-5">
            <h2 className="text-lg font-bold text-[#0B2948]">Ringkasan</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>Rp398.000</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Ongkir</span>
                <span>Rp20.000</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Diskon</span>
                <span>-Rp15.000</span>
              </div>

              <div className="mt-4 border-t border-slate-200 pt-4">
                <div className="flex justify-between text-lg font-bold text-[#0B2948]">
                  <span>Total</span>
                  <span>Rp403.000</span>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full rounded-xl bg-[#FF4D9E] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:bg-[#E03686]">
              Update status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
