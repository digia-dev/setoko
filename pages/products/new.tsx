export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB] p-8">
      <div className="mx-auto max-w-4xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,41,72,0.06)]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-[#E03686]">Produk</p>
            <h1 className="mt-2 text-3xl font-bold text-[#0B2948]">Tambah produk baru</h1>
          </div>

          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0B2948]">
            Batal
          </button>
        </div>

        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Nama produk</label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white"
                placeholder="Contoh: Kaos Premium"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Slug</label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white"
                placeholder="kaos-premium"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Harga</label>
              <input
                type="number"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white"
                placeholder="149000"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Stok</label>
              <input
                type="number"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white"
                placeholder="12"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Kategori</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white">
                <option>Pakaian</option>
                <option>Aksesoris</option>
                <option>Sepatu</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Deskripsi</label>
            <textarea
              rows={5}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF4D9E] focus:bg-white"
              placeholder="Tuliskan deskripsi produk..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#0B2948]">
              Simpan draft
            </button>
            <button className="rounded-xl bg-[#FF4D9E] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:bg-[#E03686]">
              Publikasikan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
