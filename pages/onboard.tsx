export default function OnboardPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB] p-8">
      <div className="mx-auto max-w-4xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,41,72,0.06)]">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.12em] text-[#E03686]">Onboarding</p>
          <h1 className="mt-2 text-3xl font-bold text-[#0B2948]">Siapkan toko Anda</h1>
        </div>

        <div className="mb-8 flex items-center gap-3">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${step === 1 ? 'bg-[#FF4D9E] text-white' : 'bg-slate-200 text-slate-600'}`}>
                {step}
              </div>
              {step < 3 && <div className="h-px w-10 bg-slate-200" />}
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Nama toko</label>
            <input
              type="text"
              placeholder="Baju Jemari"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Slug toko</label>
            <input
              type="text"
              placeholder="baju-jemari"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Deskripsi toko</label>
            <textarea
              rows={4}
              placeholder="Tuliskan deskripsi singkat tentang toko Anda"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="rounded-xl bg-[#FF4D9E] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:bg-[#E03686]">
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
