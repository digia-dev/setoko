export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB] p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,41,72,0.06)]">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.12em] text-[#E03686]">Pengaturan</p>
            <h1 className="mt-2 text-3xl font-bold text-[#0B2948]">Setting toko</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Nama toko</label>
              <input value="Baju Jemari" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Slug toko</label>
              <input value="baju-jemari" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white" />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Logo toko</label>
              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B2948] text-xl font-bold text-[#FF4D9E]">
                  B
                </div>
                <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0B2948]">
                  Upload logo
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="rounded-xl bg-[#FF4D9E] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:bg-[#E03686]">
              Simpan perubahan
            </button>
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,41,72,0.06)]">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.12em] text-[#E03686]">Domain</p>
            <h2 className="mt-2 text-2xl font-bold text-[#0B2948]">Custom domain</h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-[#F7F9FB] p-4">
              <p className="text-sm font-medium text-[#0B2948]">mystore.checkoutaja.com</p>
              <p className="mt-1 text-xs text-emerald-700">Status: Aktif</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#F7F9FB] p-4">
              <p className="text-sm font-medium text-[#0B2948]">bajujemari.com</p>
              <p className="mt-1 text-xs text-amber-700">Status: Menunggu verifikasi DNS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
