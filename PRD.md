# PRD - Setoko (Phase 0)

Tanggal: 2026-10-14
Repo: digia-dev/setoko
Target domain (plan): checkoutaja.com
DNS provider: Cloudflare (akan disiapkan oleh tim)

Ringkasan singkat
- Produk: Platform SaaS pembuatan dan pengelolaan toko online untuk penjual yang ingin pindah dari marketplace (Tokopedia/Shopee) ke toko sendiri.
- Target awal: Pemilik toko UKM di Indonesia yang ingin mengurangi biaya transaksi dan punya kontrol stok/harga.
- Output Phase 0: PRD singkat, backlog prioritas, daftar layar low-fidelity, rencana teknis untuk subdomain/custom-domain, integrasi Midtrans, checklist CI/CD dan publish Play Store / App Store.

Visi
Membantu penjual marketplace membuat toko online sendiri yang mudah dibuat, murah dalam biaya transaksi, dan mudah di-manage via aplikasi mobile (pemilik toko). Pembeli menggunakan storefront web (contoh: bajujemari.com atau checkoutaja.com).

Tujuan & Success metrics
- Waktu rata-rata pembuatan toko <= 10 menit.
- % pendaftaran yang menyelesaikan wizard toko (activated store) >= 40%.
- Jumlah toko aktif bulanan.
- Retensi pemilik toko 30 hari > 30%.

Scope MVP (Phase 0)
Core features yang harus ada:
- Tenant onboarding: register pemilik + create store wizard (nama, slug, logo).
- Generate link toko: dukungan subdomain (slug.myapp.com) dan alur untuk custom domain (opt-in).
- Public storefront (web): lihat produk, deskripsi, kontak, checkout (Midtrans Snap).
- Backend: order management, webhook Midtrans untuk update status, data persistence di Postgres.
- Mobile app (Flutter): onboarding, create store wizard, CRUD produk (nama, deskripsi, gambar, harga, stok), list pesanan, notifikasi, tombol share link.
- Storage gambar: S3-compatible + CDN (Cloudflare).
- Admin web minimal (SaaS): manajemen tenant, subscription basic, tools reconciliation manual.
- Logging & basic analytics (visitor count, orders).

Non-goals (Phase 0)
- Theme builder lanjutan atau marketplace integrations.
- Direct in-app purchases/subscriptions untuk pengguna akhir di aplikasi mobile (hindari IAP Apple jika monetisasi dilakukan via web admin terlebih dahulu).

Keputusan teknis (Phase 0)
- Mobile: Flutter (single codebase iOS & Android).
- Backend: Node.js + TypeScript (NestJS atau Express + TypeScript). Rekomendasi: NestJS untuk struktur dan maintainability.
- Database: PostgreSQL (managed) — rekomendasi Supabase untuk mempercepat (Auth, Storage, Postgres tersedia).
- Storage: Supabase Storage atau S3 (DigitalOcean Spaces / AWS S3). CDN: Cloudflare.
- Hosting backend: Render / DigitalOcean App Platform / Cloud Run (pilih yang paling murah & mudah dikelola untuk 1 dev).
- CI/CD: GitHub Actions for backend & web; Codemagic / Bitrise / GitHub Actions + Fastlane untuk mobile iOS builds.
- Payment gateway: Midtrans Snap (Indonesia).
- DNS/SSL/custom domain: Cloudflare + wildcard subdomain (*.checkoutaja.com). Gunakan Cloudflare API untuk automation jika memungkinkan.

Arsitektur high-level
- Mobile (Flutter) <-> Backend API (REST/GraphQL, JWT) <-> Postgres + Storage + Redis (optional)
- Storefront public (Next.js atau server-side rendered pages) dijalankan di Vercel/Render atau via backend.
- Cloudflare di depan untuk CDN, caching, wildcard handling, dan DNS management.
- Reverse proxy/load balancer (managed by platform hosting) menangani incoming traffic dan routing tenant via Host header atau path.

Domain / Subdomain / Custom domain (rencana implementasi)
Rekomendasi: dukung subdomain sejak awal (branding bagus) dan sediakan alur custom domain berikut:
1. Subdomain (MVP):
   - Setup wildcard DNS: *.checkoutaja.com -> load balancer IP
   - Reverse proxy config menerima Host {slug}.checkoutaja.com dan meneruskan ke app yang resolve tenant by slug
   - TLS: gunakan Cloudflare Origin + Full (recommended) atau wildcard certificate via ACME (DNS-01)
2. Custom domain flow:
   - Owner menambahkan domain (eg. bajujemari.com) di dashboard
   - Sistem berikan verifikasi token (TXT) atau CNAME target
   - Setelah DNS terpasang & terverifikasi, platform mem-issue cert otomatis (ACME DNS-01 via Cloudflare API) atau instruksikan pengguna untuk mengaktifkan Cloudflare proxy
   - Map domain ke tenant dan buka servis HTTPS

Pertimbangan keamanan: verifikasi domain diperlukan; batasi perubahan DNS agar terhindar domain-hijacking; pastikan validasi TLS.

Integrasi Midtrans (ringkas)
- Gunakan Midtrans Snap (embedded atau redirect) untuk storefront web.
- Flow:
  1. Pembeli checkout di storefront -> frontend panggil backend create order
  2. Backend simpan order, panggil Midtrans Snap API (server-side) untuk generate payment token / redirect URL
  3. Frontend redirect atau render Snap widget
  4. Midtrans webhook memanggil backend untuk notifikasi status payment -> backend verifikasi signature dan update status order
- Tips: simpan server_key di secret manager, gunakan sandbox selama development, implement idempotency dan retry pada webhook.

Mobile app (Owner) - MVP screens
- Auth (Register/Login)
- Dashboard (ringkasan orders & visitors)
- Create Store Wizard (nama, slug, logo)
- Product List
- Add / Edit Product (image upload, price, stock)
- Orders List & Detail
- Store Settings (share link, custom domain status, store profile)

Admin web (SaaS minimal)
- Tenant list & details
- Manual order/reconciliation tools
- Domain management UI (lihat status verifikasi)
- Billing/subscription overview (basic)

Backlog prioritas & user stories (singkat, acceptance criteria, estimasi untuk 1 dev)
Estimasi total MVP: ~15–17 minggu (1 dev full-time). Berikut pembagian sprint & stories kasar.

Sprint 0 (2 minggu) - Setup & discovery
- Setup akun (GitHub, Supabase, Render/Vercel, Cloudflare, Midtrans sandbox, Play/App Store dev)
- Repo monorepo skeleton: /mobile /backend /web
- Wireframes low-fi (7 layar)
Estimasi: 2 minggu

Sprint 1 (4 minggu) - Auth, tenant onboarding, public store baseline
- User story: Owner register & login (email/password). AC: register, login, JWT issued. (3d)
- User story: Owner create store (name, slug, logo). AC: store created, unique slug, returns link e.g. https://{slug}.checkoutaja.com. (3d)
- User story: Public store page viewable by visitor (basic product list placeholder). AC: GET /store/{slug} returns store data + products. (4d)
- Infra: wildcard DNS & reverse proxy baseline. (4d)
Estimasi: 4 minggu

Sprint 2 (4 minggu) - Product management, storage, mobile basics
- Owner can add/edit/delete products (name, price, images, stock). AC: product CRUD works, images uploaded and served via CDN. (5d)
- Setup storage + CDN. (3d)
- Mobile: Flutter auth + create store wizard + product list screen. (6d)
Estimasi: 4 minggu

Sprint 3 (3–4 minggu) - Orders & Midtrans
- Public checkout integrated with Midtrans Snap (sandbox). AC: order created, redirect to payment, webhook updates order status. (6d)
- Mobile: owner can view orders (list & detail). (4d)
- Notifications: email or push notification for new order (basic). (3d)
Estimasi: 3–4 minggu

Sprint 4 (2–3 minggu) - Custom domain + polish
- Custom domain add & verify flow (TXT/CNAME), auto-issue cert via Cloudflare API or instruct manual. AC: after verification, domain serves storefront. (6d)
- QA, logging, analytics basic, prepare app store assets. (4d)
Estimasi: 2–3 minggu

Buffer & submission (2 minggu)
Total: ~15–17 minggu

CI/CD & build
- Monorepo layout: /mobile (Flutter), /backend (TS), /web (Next.js)
- GitHub Actions:
  - Lint, test, build backend on push
  - Deploy backend to Render/Cloud Run on main
  - Mobile: use Codemagic/Bitrise or GitHub Actions + Fastlane for Play Store/TestFlight
- Secrets: GitHub Secrets (Midtrans keys, DB URL, Cloudflare API token, Apple certs, Play Store JSON)

Environment variables & secrets (daftar minimal)
- DATABASE_URL (Postgres)
- JWT_SECRET
- MIDTRANS_CLIENT_KEY (for frontend if needed safe use) - optional
- MIDTRANS_SERVER_KEY (server-side only)
- CLOUDINARY/S3_ENDPOINT, S3_KEY, S3_SECRET (if not Supabase Storage)
- SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (if using Supabase)
- CLOUDFLARE_API_TOKEN (for DNS & ACME automation)
- APPLE_CERTS / FASTLANE_SESSION / APPLE_APP_SPECIFIC_PASSWORD (for iOS deployment)
- GOOGLE_PLAY_SERVICE_ACCOUNT_JSON (for Play Store uploads)
- SENTRY_DSN (optional)

Play Store & App Store notes (owner app)
- App hanya untuk pemilik toko — pembayaran customer terjadi via web storefront (Midtrans). Dengan model ini, Anda mengurangi risiko kebijakan Apple terkait IAP.
- Siapkan demo account atau credentials untuk App Review.
- Sediakan privacy policy URL (harus tersedia di store listing).

Risiko utama & mitigasi
- Apple IAP policy: mitigasi dengan monetisasi via web admin dulu.
- Custom domain & wildcard TLS complexity: mitigasi dengan Cloudflare + API automation.
- Payment reconciliation & fraud: log semua callback, idempotency, dan admin manual reconciliation tool.

Deliverables yang diupload di repo ini
- PRD.md (file ini)
- Saya dapat menambahkan: backlog issues di GitHub (bila Anda beri akses/izinkan), wireframe PNG, template GitHub Actions, dan draft Fastlane config.

Next steps (apa yang akan saya lakukan selanjutnya jika Anda setujui)
1. Commit PRD.md ke repo (sudah saya lakukan).
2. Jika Anda mau, saya buat GitHub Issues untuk backlog prioritas (minta konfirmasi untuk membuat di repo digia-dev/setoko).
3. Saya dapat generate file checklist environment (env.example), dan template .github/workflows untuk backend build & mobile CI.
4. Saya bisa buat wireframe low-fi (PNG) dan upload ke repo di folder /design.

Lampiran: checklist cepat untuk tim (1 dev)
- Siapkan akun: Cloudflare, Midtrans (sandbox), Supabase (opsional), Render/Vercel, Apple Dev, Google Play
- Buat repo monorepo skeleton
- Konfig wildcard DNS di Cloudflare untuk *.checkoutaja.com
- Setup Supabase project & migrate schema awal (tenants, stores, products, orders, order_items)
- Implement auth & tenant scoping
- Implement Midtrans webhook endpoint & testing
- Setup mobile skeleton Flutter + screens

---

Catatan: file ini dibuat berdasarkan jawaban Anda (1 dev, Flutter, Midtrans, Cloudflare, domain checkoutaja.com). Jika ada perubahan prioritas atau preferensi hosting, beri tahu saya dan saya akan update PRD.md.
