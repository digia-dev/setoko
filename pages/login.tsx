import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center p-6">
        <div className="grid w-full overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(11,41,72,0.06)] md:grid-cols-2">
          <div className="hidden bg-[#0B2948] p-10 md:flex md:flex-col md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <span className="text-xl font-bold text-[#FF4D9E]">S</span>
                </div>
                <span className="text-xl font-bold text-white">Setoko</span>
              </div>

              <div className="mt-14">
                <p className="text-sm uppercase tracking-[0.12em] text-pink-200">Selamat datang kembali</p>
                <h1 className="mt-3 text-4xl font-black text-white">Kelola toko Anda dari mana saja.</h1>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/90">
              <p className="text-sm text-pink-100">“Platform ini membantu kami mengatur stok dan pesanan jauh lebih cepat.”</p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-[#E03686]">Masuk</p>
                <h2 className="mt-2 text-3xl font-bold text-[#0B2948]">Selamat datang</h2>
              </div>

              <Link href="/">
                <a className="text-sm font-medium text-[#0B2948] hover:text-[#FF4D9E]">Kembali</a>
              </Link>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#FF4D9E] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#FF4D9E] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#FF4D9E] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-[#E03686]"
              >
                Masuk ke dashboard
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
              Belum punya akun?{' '}
              <Link href="/signup">
                <a className="font-semibold text-[#0B2948] hover:text-[#FF4D9E]">Daftar sekarang</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
