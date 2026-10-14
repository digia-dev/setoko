export default function EditProductPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB] p-8">
      <div className="mx-auto max-w-4xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,41,72,0.06)]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-[#E03686]">Produk</p>
            <h1 className="mt-2 text-3xl font-bold text-[#0B2948]">Edit produk</h1>
          </div>

          <button className="rounded-xl bg-[#FF4D9E] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:bg-[#E03686]">
            Simpan perubahan
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="h-72 rounded-[24px] bg-gradient-to-br from-[#0B2948]/10 via-white to-[#FF4D9E]/10"></div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Nama produk</label>
              <input
                type="text"
                value="Kaos Premium"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Harga</label>
                <input
                  type="number"
                  value={149000}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Stok</label>
                <input
                  type="number"
                  value={12}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white">
                <option selected>Active</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
