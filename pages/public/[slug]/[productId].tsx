import Link from 'next/link';

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B2948]">
              <span className="text-lg font-bold text-[#FF4D9E]">B</span>
            </div>
            <p className="text-xl font-bold text-[#0B2948]">Baju Jemari</p>
          </div>

          <Link href="/public/baju-jemari">
            <a className="text-sm font-medium text-[#0B2948] hover:text-[#FF4D9E]">Kembali ke toko</a>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(11,41,72,0.06)] md:grid-cols-2 md:p-8">
          <div className="space-y-4">
            <div className="h-96 rounded-[24px] bg-gradient-to-br from-[#0B2948]/10 via-white to-[#FF4D9E]/10"></div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 rounded-xl bg-slate-200"></div>
              <div className="h-20 rounded-xl bg-slate-200"></div>
              <div className="h-20 rounded-xl bg-slate-200"></div>
            </div>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-[#FF4D9E]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E03686]">
              Best Seller
            </span>

            <h1 className="mt-4 text-4xl font-black text-[#0B2948]">Kaos Premium</h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-black text-[#0B2948]">Rp149.000</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Stok tersedia</span>
            </div>

            <p className="mt-5 text-base text-slate-600">
              Kaos premium 100% cotton dengan bahan halus, nyaman dipakai, dan desain minimalist yang cocok untuk sehari-hari.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/checkout">
                <a className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#FF4D9E] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:bg-[#E03686]">
                  Beli Sekarang
                </a>
              </Link>

              <button className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#0B2948] px-5 py-3 text-sm font-semibold text-[#0B2948] hover:bg-slate-50">
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
