# Wireframe Low-Fidelity - Setoko

Dokumen ini menjelaskan layout dasar layar utama untuk MVP. Tujuan: membantu arah UI/UX tanpa terlalu detail pada desain final.

## 1) Onboarding / Login

```text
+------------------------------------------------------+
| SETOKO                         [Login]             |
|------------------------------------------------------|
|                  Welcome to SETOKO                  |
|  Kelola toko online Anda tanpa ribet                |
|                                                      |
| [Email]                                              |
| [Password]                                           |
| [Masuk]                                              |
|                                                      |
| Belum punya akun? [Daftar]                           |
|                                                      |
| [Continue with Google] [Apple]                      |
+------------------------------------------------------+
```

### Tujuan
- Memastikan user bisa masuk ke dashboard
- Memberikan onboarding singkat tentang value prop

---

## 2) Register & Create Store Wizard

```text
+------------------------------------------------------+
| Buat Toko Pertama Anda              [Simpan draft] |
|------------------------------------------------------|
| 1. Informasi Toko                                     |
| Nama Toko: [____________________]                     |
| Slug Toko: [setoko.myapp.com]                       |
| Logo: [Upload]                                       |
| Deskripsi: [____________________]                     |
|                                                      |
| 2. Lokasi & Kontak                                    |
| Alamat: [________________________________]           |
| WhatsApp/Phone: [________]                           |
|                                                      |
| [Lanjutkan]                                          |
+------------------------------------------------------+
```

### Tujuan
- User bisa membuat toko dengan minimal input
- Slug harus unik dan valid

---

## 3) Dashboard Pemilik Toko

```text
+------------------------------------------------------+
| SETOKO   [Dashboard]   [Produk] [Pesanan] [Setting] |
|------------------------------------------------------|
| Overview                                             |
| [Total Produk] [Order Hari Ini] [Pendapatan]        |
|                                                      |
| Recent Orders                                        |
| #1042  - 2 item  - Rp 450.000  - Paid               |
| #1041  - 3 item  - Rp 890.000  - Pending            |
| #1040  - 1 item  - Rp 120.000  - Completed          |
|                                                      |
| Products Highlights                                  |
| [Gambar] Nama Produk  | Stok  | Harga                |
| [Gambar] Kaos Premium | 12    | Rp 149.000          |
| [Gambar] Tas Ransel   | 7     | Rp 249.000          |
+------------------------------------------------------+
```

### Tujuan
- Overview ringkas untuk pemilik toko
- Sebagai landing home setelah login

---

## 4) Product List & Add Product

```text
+------------------------------------------------------+
| Produk                              [Tambah Produk] |
|------------------------------------------------------|
| Search [__________]     Filter [Semua]               |
|------------------------------------------------------|
| [Gambar] Kaos Premium   | Rp 149.000 | Stok 12 | Edit |
| [Gambar] Tas Ransel     | Rp 249.000 | Stok 7  | Edit |
| [Gambar] Sepatu Sneaker | Rp 399.000 | Stok 5  | Edit |
|                                                      |
| [Tambah Produk]                                      |
+------------------------------------------------------+
```

### Form tambah produk
```text
+------------------------------------------------------+
| Tambah Produk                                        |
|------------------------------------------------------|
| Nama Produk: [__________________]                     |
| Kategori: [Pakaian]                                  |
| Harga: [Rp _________]                                |
| Stok: [___]                                          |
| Deskripsi: [____________________]                     |
| Gambar: [Upload foto]                                |
| Status: [Aktif] [Draft]                              |
| [Simpan Produk]                                      |
+------------------------------------------------------+
```

---

## 5) Orders List & Detail

```text
+------------------------------------------------------+
| Pesanan                                          |
|------------------------------------------------------|
| #1042 | Budi | Rp 450.000 | Paid | Detail           |
| #1041 | Sari | Rp 890.000 | Pending | Detail        |
| #1040 | Andi | Rp 120.000 | Completed | Detail      |
|                                                      |
| Detail Pesanan #1042                                 |
| Produk: Kaos Premium x1                              |
| Pembeli: Budi Santoso                               |
| Alamat: Jl. Merdeka 10 Jakarta                      |
| Status: [Paid] [Packed] [Shipped] [Completed]       |
| [Simpan]                                            |
+------------------------------------------------------+
```

### Tujuan
- Proses order dan status pembayaran mudah dilihat

---

## 6) Storefront Public (Web)

```text
+------------------------------------------------------+
| Toko Budi     [Home] [Produk] [Kontak]               |
|------------------------------------------------------|
| Hero banner / Promo                                  |
| [Produk Baru]                                        |
|------------------------------------------------------|
| [Gambar Produk] Nama Produk  Rp 149.000  [Beli]      |
| [Gambar Produk] Nama Produk  Rp 249.000  [Beli]      |
| [Gambar Produk] Nama Produk  Rp 399.000  [Beli]      |
|------------------------------------------------------|
| Footer: Alamat, WhatsApp, Instagram, Tiktok         |
+------------------------------------------------------+
```

### Tujuan
- Storefront mewakili brand toko dan produk yang siap dibeli

---

## 7) Store Settings & Domain

```text
+------------------------------------------------------+
| Pengaturan Toko                                      |
|------------------------------------------------------|
| Profil Toko                                          |
| Nama: [Budi Store]                                   |
| Deskripsi: [________________]                          |
| Logo: [Upload]                                       |
|                                                      |
| Domain Toko                                          |
| Default:  [budi.checkoutaja.com]                    |
| Custom domain: [bajujemari.com]                     |
| Status: [Verifikasi selesai]                         |
| [Simpan]                                            |
|                                                      |
| Link Toko                                           |
| https://budi.checkoutaja.com                         |
| [Copy Link] [Share]                                  |
+------------------------------------------------------+
```

### Tujuan
- Pemilik toko bisa mempercantik brand dan share link toko

---

## Wireframe summary
- 7 layar utama untuk MVP
- Prioritaskan dashboard, product CRUD, order list, storefront public
- Domain & settings dibuat setelah core workflow aman

---

## Next step
Setelah wireframe ini, lakukan:
1. tentukan copywriting CTA
2. audit tiap layar untuk form validation
3. mulai implementasi UI Flutter / web admin
