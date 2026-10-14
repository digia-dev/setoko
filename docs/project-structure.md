# Struktur Project - Setoko

Repositori yang disarankan untuk Phase 1 adalah monorepo dengan pembagian berikut:

```text
setoko/
├── apps/
│   ├── mobile/
│   │   ├── lib/
│   │   │   ├── app/
│   │   │   │   ├── auth/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── products/
│   │   │   │   ├── orders/
│   │   │   │   └── settings/
│   │   │   ├── core/
│   │   │   │   ├── api/
│   │   │   │   ├── storage/
│   │   │   │   ├── auth/
│   │   │   │   └── utils/
│   │   │   └── main.dart
│   │   ├── test/
│   │   ├── pubspec.yaml
│   │   └── README.md
│   │
│   ├── web/
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── admin/
│       ├── src/
│       ├── package.json
│       └── README.md
│
├── packages/
│   ├── shared-types/
│   │   ├── src/
│   │   └── package.json
│   ├── ui-kit/
│   │   ├── src/
│   │   └── package.json
│   └── api-client/
│       ├── src/
│       └── package.json
│
├── services/
│   ├── backend/
│   │   ├── src/
│   │   ├── prisma/ (opsional)
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   ├── workers/
│   │   ├── src/
│   │   └── package.json
│   └── webhook/
│       ├── src/
│       └── package.json
│
├── infra/
│   ├── terraform/
│   ├── docker-compose.yml
│   ├── nginx/
│   └── cloudflare/
│
├── docs/
│   ├── PRD.md
│   ├── backlog-issues.md
│   ├── wireframe.md
│   ├── database-schema.md
│   └── deployment-checklist.md
│
├── .github/
│   └── workflows/
│       ├── backend.yml
│       ├── mobile.yml
│       └── web.yml
│
├── .gitignore
├── package.json
├── README.md
└── .env.example
```

## Penjelasan struktur

### apps/mobile
- Aplikasi utama untuk pemilik toko
- Fokus: login, dashboard, produk, order, settings, share link

### apps/web
- Storefront public untuk pembeli
- Fokus: product listing, cart, checkout, payment page

### apps/admin
- Admin SaaS untuk melihat semua tenant / store / pembayaran / status

### packages/shared-types
- Interface & DTO bersama (user, store, product, order)
- Digunakan di Flutter, admin, web, backend

### packages/ui-kit
- Komponen desain ulang di seluruh app
- Memastikan konsistensi visual

### services/backend
- API untuk mobile app dan storefront
- Meng-handle auth, product CRUD, payment, domain verification, webhook Midtrans

### services/workers
- Tasks async: notifications, image processing, analytics ingestion

### infra
- Domain, proxy, container, database, deployment config

## Stack yang dipilih
- Frontend mobile: Flutter
- Frontend web public: Next.js atau simple server-side app
- Frontend admin: Next.js atau React admin panel
- Backend: NestJS (TypeScript)
- Database: PostgreSQL
- Storage: S3 / Supabase Storage
- Infra: Cloudflare + Render/DigitalOcean/AWS

## Prinsip pengembangan awal
1. Fokus pada: auth, store creation, product CRUD, checkout, order tracking
2. Gunakan monorepo agar domain & API contract bisa dibagikan antar app
3. Buat package shared-types di awal agar DTO konsisten
4. Prioritaskan backend & web storefront sebelum fitur dekoratif
5. Hindari custom theme builder di MVP

## Timeline pengembangan structure awal
- Week 1: scaffolding repo + env + package structure
- Week 2: auth + store onboarding + DB migration
- Week 3–4: product CRUD & public storefront
- Week 5–6: payment + order flow
- Week 7+: mobile polish + custom domain

## Rekomendasi nama file dan folder
- /apps/mobile/lib/app/features/store
- /apps/mobile/lib/app/features/products
- /apps/web/src/pages/store/[slug].tsx
- /services/backend/src/modules/store
- /services/backend/src/modules/orders
- /services/backend/src/modules/payments

## Catatan penting
- Semua route storefront harus secara jelas memetakan dari `store.slug` atau `store_domain`
- Pastikan `store_id` selalu ada di query, request payload, dan response model
- Di awal, jangan buat abstraction terlalu berat; fokus pada prinsip clean architecture sederhana

---

## Versi target
Target awal struktur ini sudah cukup untuk MVP dan dapat berkembang ke produk matang tanpa refactor besar.
