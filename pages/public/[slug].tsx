import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';

const sampleProducts = [
  { id: 'p1', name: 'Kaos Premium', price: 'Rp149.000', tag: 'Best Seller' },
  { id: 'p2', name: 'Tas Ransel', price: 'Rp249.000', tag: 'New' },
  { id: 'p3', name: 'Sepatu Casual', price: 'Rp399.000', tag: 'Popular' },
  { id: 'p4', name: 'Syal Motif', price: 'Rp119.000', tag: 'Trend' },
];

export default function PublicStorePage() {
  return (
    <>
      <Head>
        <title>Baju Jemari | Setoko</title>
      </Head>

      <div className="min-h-screen bg-[#F7F9FB]">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B2948]">
                <span className="text-lg font-bold text-[#FF4D9E]">B</span>
              </div>
              <p className="text-xl font-bold text-[#0B2948]">Baju Jemari</p>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
              <a href="#">Home</a>
              <a href="#">Produk</a>
              <a href="#">Tentang</a>
              <a href="#">Kontak</a>
            </nav>

            <Link href="/checkout">
              <a className="rounded-xl bg-[#FF4D9E] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:bg-[#E03686]">
                Keranjang (2)
              </a>
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-12">
          <section className="rounded-[28px] bg-white p-6 shadow-[0_18px_40px_rgba(11,41,72,0.06)] md:p-10">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <span className="inline-flex rounded-full border border-pink-100 bg-pink-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#E03686]">
                  Toko online
                </span>
                <h1 className="mt-5 text-4xl font-black text-[#0B2948] md:text-5xl">Baju Jemari</h1>
                <p className="mt-4 max-w-xl text-base text-slate-600">
                  Koleksi baju santai, kasual, dan premium untuk kebutuhan harian Anda.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link href="#catalog">
                    <a className="rounded-xl bg-[#FF4D9E] px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:bg-[#E03686]">
                      Lihat Produk
                    </a>
                  </Link>

                  <Link href="/checkout">
                    <a className="rounded-xl border border-[#0B2948] px-5 py-3 text-center text-sm font-semibold text-[#0B2948] hover:bg-slate-50">
                      Checkout
                    </a>
                  </Link>
                </div>
              </div>

              <div className="rounded-[24px] bg-[#F7F9FB] p-5">
                <div className="h-60 rounded-[20px] bg-gradient-to-br from-[#0B2948]/10 to-[#FF4D9E]/10"></div>
              </div>
            </div>
          </section>

          <section id="catalog" className="mt-14">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-[#0B2948]">Produk unggulan</h2>
              <p className="text-sm text-slate-500">4 item tersedia</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {sampleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  tag={product.tag}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
