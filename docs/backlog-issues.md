# Backlog Issue List - Setoko

Repository: digia-dev/setoko
Status: Phase 0 / MVP planning

## Prinsip prioritas
- Prioritas P0: fitur yang dibutuhkan untuk toko bisa dibuat dan dibayar
- Prioritas P1: fitur operasional core untuk pemilik toko
- Prioritas P2: aksesoris/opsional/perbaikan pengalaman

## Issue backlog

### EPIC 1: Authentication & Tenant Onboarding

#### ISSUE-01: Register & login akun pemilik toko
- Priority: P0
- Story: Sebagai pemilik toko, saya ingin mendaftar dan masuk ke aplikasi agar saya bisa mengelola toko saya.
- Acceptance Criteria:
  - User dapat register dengan email/password
  - User dapat login dengan valid credential
  - Login menghasilkan JWT/session yang valid
  - Password hashing aman
  - Error validation jelas untuk email/password invalid
- Estimate: 3 days

#### ISSUE-02: Buat toko baru dari wizard onboarding
- Priority: P0
- Story: Sebagai pemilik toko, saya ingin membuat toko baru agar saya punya halaman toko publik.
- Acceptance Criteria:
  - User dapat mengisi nama toko, slug, logo, deskripsi singkat
  - Slug unik dan valid
  - Toko dibuat di database dengan tenant_id
  - User otomatis menjadi owner dari toko tersebut
  - Setelah simpan, user diarahkan ke dashboard toko
- Estimate: 3 days

#### ISSUE-03: Store settings dasar
- Priority: P0
- Story: Sebagai pemilik toko, saya ingin mengatur profil toko agar pelanggan bisa mengenali brand saya.
- Acceptance Criteria:
  - Edit nama toko, slogan, deskripsi, logo, kontak, alamat
  - Simpan data dengan validasi
  - Data tampil di halaman storefront
- Estimate: 2 days

### EPIC 2: Storefront Public & Domain

#### ISSUE-04: Halaman toko publik dapat diakses berdasarkan slug
- Priority: P0
- Story: Sebagai pengunjung, saya ingin membuka halaman toko publik agar melihat produk dan melakukan checkout.
- Acceptance Criteria:
  - Storefront dapat diakses lewat /store/{slug} atau {slug}.checkoutaja.com
  - Page menampilkan nama toko, logo, deskripsi, daftar produk aktif
  - Produk hanya tampil jika status aktif
  - Jika toko tidak ditemukan, tampil 404/404 brand store
- Estimate: 4 days

#### ISSUE-05: Integrasi subdomain dan custom domain untuk toko
- Priority: P1
- Story: Sebagai pemilik toko, saya ingin menghubungkan brand domain agar toko lebih profesional.
- Acceptance Criteria:
  - User dapat menambahkan domain/subdomain
  - Sistem memvalidasi ownership melalui TXT/CNAME
  - Domain aktif jika DNS valid dan sertifikat dibuat
  - Request ke domain diarahkan ke tenant yang benar
- Estimate: 6 days

#### ISSUE-06: Setup wildcard DNS + SSL strategy
- Priority: P1
- Story: Sebagai developer, saya ingin domain toko dapat otomatis terhubung dengan aman.
- Acceptance Criteria:
  - *.checkoutaja.com dapat diarahkan ke load balancer / reverse proxy
  - HTTPS aktif untuk subdomain
  - Cloudflare API token atau provider automation terkonfigurasi
- Estimate: 3 days

### EPIC 3: Product Management

#### ISSUE-07: CRUD produk di mobile dan web admin
- Priority: P0
- Story: Sebagai pemilik toko, saya ingin mengelola produk agar stok, harga, dan image sesuai dengan toko saya.
- Acceptance Criteria:
  - Tambah produk dengan nama, harga, kategori, stok, deskripsi, foto
  - Edit produk
  - Hapus produk (soft delete atau archive)
  - Produk aktif/inactive terlihat di storefront sesuai status
- Estimate: 5 days

#### ISSUE-08: Upload gambar produk ke storage
- Priority: P0
- Story: Sebagai pemilik toko, saya ingin mengunggah gambar produk agar toko lebih rapi dan menarik.
- Acceptance Criteria:
  - Upload file image (png/jpg/webp) valid
  - Gambar tersimpan di storage dengan URL publik
  - Gambar dapat dipakai untuk produk dan toko logo
  - File size dan validasi disetujui
- Estimate: 3 days

### EPIC 4: Order & Payment

#### ISSUE-09: Checkout web order + payment flow via Midtrans
- Priority: P0
- Story: Sebagai pembeli, saya ingin checkout dengan aman dan membayar menggunakan Midtrans agar proses pembelian selesai.
- Acceptance Criteria:
  - User bisa menambah barang ke keranjang
  - User bisa mengisi data pembeli dan shipping summary
  - Sistem membuat order di backend
  - Midtrans Snap token dibuat server-side
  - Redirect ke payment gateway berhasil
- Estimate: 6 days

#### ISSUE-10: Webhook Midtrans untuk update status pesanan
- Priority: P0
- Story: Sebagai pemilik toko, saya ingin status pembayaran otomatis diperbarui agar saya tahu pesanan sudah dibayar.
- Acceptance Criteria:
  - Webhook Midtrans diterima di endpoint backend
  - Signature diverifikasi
  - Status order berubah sesuai event success/fail/expired
  - Log event disimpan untuk audit
  - Idempotency protection on duplicate webhook
- Estimate: 4 days

#### ISSUE-11: Dashboard order list & detail
- Priority: P0
- Story: Sebagai pemilik toko, saya ingin melihat daftar pesanan agar bisa memproses atau menindaklanjuti order.
- Acceptance Criteria:
  - Order list menampilkan ID order, item, total, status, tanggal
  - User dapat membuka detail order
  - Status order dapat diubah manual (pending/paid/packed/shipped/complete)
- Estimate: 4 days

### EPIC 5: Mobile App Owner Experience

#### ISSUE-12: Flutter app login & dashboard
- Priority: P0
- Story: Sebagai pemilik toko, saya ingin menggunakan aplikasi mobile untuk melihat performa toko dari ponsel saya.
- Acceptance Criteria:
  - App bisa login dan menampilkan dashboard ringkasan
  - User dapat melihat toko aktif, order masuk, dan produk terbaru
  - Layout mobile responsif sesuai desain minimal
- Estimate: 5 days

#### ISSUE-13: Flutter app CRUD produk dan order management
- Priority: P0
- Story: Sebagai pemilik toko, saya ingin mengelola produk dan pesanan dari ponsel saya.
- Acceptance Criteria:
  - Tambah/edit/hapus produk dari mobile app
  - Lihat list order dan detail order
  - Bisa menandai order sebagai diproses/selesai
- Estimate: 6 days

#### ISSUE-14: Push notification untuk order baru
- Priority: P1
- Story: Sebagai pemilik toko, saya ingin diberi notifikasi saat ada order baru agar saya cepat menindaklanjuti.
- Acceptance Criteria:
  - Notification dikirim saat order baru masuk
  - Device user menerima push notification
  - Notification menampilkan order ID dan toko
- Estimate: 3 days

### EPIC 6: Admin SaaS / Ops

#### ISSUE-15: CRUD tenant dan status toko di admin SaaS
- Priority: P1
- Story: Sebagai admin platform, saya ingin melihat semua tenant dan mengelola status mereka agar platform tetap berjalan lancar.
- Acceptance Criteria:
  - Admin dapat melihat daftar tenant
  - Admin dapat menonaktifkan/aktifkan tenant
  - Admin dapat melihat detail toko dan owner
- Estimate: 4 days

#### ISSUE-16: Basic analytics & monitoring
- Priority: P1
- Story: Sebagai developer/owner platform, saya ingin melihat metrik dasar agar saya bisa memantau kinerja aplikasi.
- Acceptance Criteria:
  - Log error dikirim ke Sentry
  - Visitor / order / revenue metric dasar tercatat
  - Dashboard terisi secara konsisten
- Estimate: 3 days

## Prioritas implementasi rekomendasi
1. ISSUE-01, 02, 04, 07, 09, 10, 11, 12, 13
2. ISSUE-03, 05, 08, 14, 15
3. ISSUE-06, 16

## Notes
- Semua feature yang terhubung dengan transaksi harus selalu terenkripsi, di-server-side, dan memiliki audit log.
- Prioritaskan checkout, pembayaran, dan penerbitan toko di tahap awal untuk mengurangi risiko bisnis.

---

## Template issue markdown (opsional untuk copy ke GitHub)

### Title
[Priority][Feature] <Judul issue>

### Description
- Story:
- Acceptance Criteria:
- Dependencies:
- Estimate:

