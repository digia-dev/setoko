import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Setoko - Jual lebih mudah</title>
        <meta
          name="description"
          content="Buat toko online sendiri, kelola produk, stok, dan pesanan dari satu dashboard."
        />
      </Head>

      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B2948]">
              <span className="text-lg font-bold text-[#FF4D9E]">S</span>
            </div>
            <p className="text-xl font-bold text-[#0B2948]">Setoko</p>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <Link href="/features">
              <a className="text-slate-700 transition hover:text-[#0B2948]">Fitur</a>
            </Link>
            <Link href="/pricing">
              <a className="text-slate-700 transition hover:text-[#0B2948]">Harga</a>
            </Link>
            <Link href="/login">
              <a className="text-slate-700 transition hover:text-[#0B2948]">Login</a>
            </Link>
          </nav>

          <Link href="/signup">
            <a className="rounded-xl bg-[#FF4D9E] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-[#E03686]">
              Buat Toko Gratis
            </a>
          </Link>
        </div>
      </header>

      <main>
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full border border-pink-100 bg-pink-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#E03686]">
                SaaS Storefront
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-[#0B2948] md:text-6xl">
                Punya toko online sendiri tanpa ribet
              </h1>

              <p className="mt-5 max-w-xl text-base text-slate-600 md:text-lg">
                Kelola produk, stok, harga, dan pesanan dari satu dashboard.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/signup">
                  <a className="rounded-xl bg-[#FF4D9E] px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-[#E03686]">
                    Mulai Gratis
                  </a>
                </Link>

                <Link href="/login">
                  <a className="rounded-xl border border-[#0B2948] px-5 py-3 text-center text-sm font-semibold text-[#0B2948] transition hover:bg-slate-50">
                    Masuk
                  </a>
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-bold text-[#0B2948]">2.4k+</p>
                  <p className="text-sm text-slate-500">Toko aktif</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0B2948]">98%</p>
                  <p className="text-sm text-slate-500">Kepuasan pengguna</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0B2948]">24/7</p>
                  <p className="text-sm text-slate-500">Akses dashboard</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(11,41,72,0.10)]">
                <div className="rounded-[22px] bg-[#F7F9FB] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Preview toko</p>
                      <h3 className="mt-1 text-xl font-bold text-[#0B2948]">Baju Jemari</h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF4D9E]/10">
                      <span className="text-lg font-bold text-[#FF4D9E]">BJ</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ['Kaos Premium', 'Rp149.000'],
                      ['Tas Ransel', 'Rp249.000'],
                      ['Sepatu Casual', 'Rp399.000'],
                      ['Syal Motif', 'Rp119.000'],
                    ].map(([name, price]) => (
                      <div key={name} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                        <div className="h-24 rounded-xl bg-gradient-to-br from-[#0B2948]/10 to-[#FF4D9E]/10"></div>
                        <p className="mt-3 text-sm font-semibold text-[#0B2948]">{name}</p>
                        <p className="mt-1 text-xs text-slate-500">{price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#0B2948] p-3 text-white">
                    <div>
                      <p className="text-xs text-slate-200">Order hari ini</p>
                      <p className="mt-1 text-lg font-bold">Rp 2.480.000</p>
                    </div>

                    <button className="rounded-xl bg-[#FF4D9E] px-3 py-2 text-xs font-semibold text-white hover:bg-[#E03686]">
                      Lihat detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F9FB] py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#E03686]">Kenapa Setoko</p>
              <h2 className="mt-2 text-3xl font-bold text-[#0B2948]">Semua yang Anda butuhkan untuk jual online</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Buat toko cepat',
                  text: 'Mulai dari nama, logo, dan slug. Toko Anda siap online dalam hitungan menit.',
                },
                {
                  title: 'Kelola stok & harga',
                  text: 'Atur produk, perubahan harga, dan stok real-time dari satu dashboard yang mudah dibaca.',
                },
                {
                  title: 'Pembayaran terintegrasi',
                  text: 'Membayar dengan Midtrans Snap dan pantau status pesanan langsung dari dashboard.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF4D9E]/10 text-[#FF4D9E]">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2948]">{item.title}</h3>
                  <p className="mt-3 text-base text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 md:flex-row">
          <p>© 2026 Setoko. Semua hak dilindungi.</p>
          <div className="flex gap-5">
            <Link href="/privacy">
              <a className="hover:text-[#0B2948]">Kebijakan Privasi</a>
            </Link>
            <Link href="/terms">
              <a className="hover:text-[#0B2948]">Syarat & Ketentuan</a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
