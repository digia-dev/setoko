# Setoko API Contract (MVP)

Base URL: `/api/v1`

## 1) Authentication

### POST /auth/register
Request body:
```json
{
  "email": "owner@example.com",
  "password": "P@ssw0rd123",
  "full_name": "Budi Santoso",
  "phone": "081234567890"
}
```
Response 201:
```json
{
  "user": {
    "id": "uuid",
    "email": "owner@example.com",
    "full_name": "Budi Santoso",
    "phone": "081234567890"
  },
  "token": "jwt-token"
}
```

### POST /auth/login
Request body:
```json
{
  "email": "owner@example.com",
  "password": "P@ssw0rd123"
}
```
Response 200:
```json
{
  "user": {
    "id": "uuid",
    "email": "owner@example.com",
    "full_name": "Budi Santoso"
  },
  "token": "jwt-token"
}
```

### GET /auth/me
Headers:
```http
Authorization: Bearer <token>
```
Response 200:
```json
{
  "id": "uuid",
  "email": "owner@example.com",
  "full_name": "Budi Santoso",
  "stores": ["store-id-1"]
}
```

---

## 2) Store Management

### POST /stores
Headers:
```http
Authorization: Bearer <token>
```
Request body:
```json
{
  "name": "Baju Jemari",
  "slug": "baju-jemari",
  "description": "Toko pakaian lokal untuk remaja.",
  "logo_url": "https://cdn.example.com/logo.png",
  "whatsapp": "081234567890",
  "address": "Jl. Merdeka 10 Jakarta"
}
```
Response 201:
```json
{
  "id": "uuid",
  "owner_user_id": "uuid",
  "name": "Baju Jemari",
  "slug": "baju-jemari",
  "status": "draft",
  "public_url": "https://baju-jemari.checkoutaja.com"
}
```

### GET /stores/me
Headers:
```http
Authorization: Bearer <token>
```
Response 200:
```json
[
  {
    "id": "uuid",
    "name": "Baju Jemari",
    "slug": "baju-jemari",
    "status": "active",
    "public_url": "https://baju-jemari.checkoutaja.com"
  }
]
```

### GET /stores/:storeId
Response 200:
```json
{
  "id": "uuid",
  "name": "Baju Jemari",
  "slug": "baju-jemari",
  "description": "Toko pakaian lokal untuk remaja.",
  "logo_url": "https://cdn.example.com/logo.png",
  "address": "Jl. Merdeka 10 Jakarta",
  "status": "active"
}
```

### PATCH /stores/:storeId
Request body (partial):
```json
{
  "name": "Baju Jemari Updated",
  "description": "Toko online pakaian lokal untuk pria dan wanita",
  "whatsapp": "081299912345"
}
```

---

## 3) Product Management

### GET /stores/:storeId/products
Response 200:
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Kaos Premium",
      "price": 149000,
      "stock": 12,
      "status": "active",
      "slug": "kaos-premium"
    }
  ]
}
```

### POST /stores/:storeId/products
Request body:
```json
{
  "name": "Kaos Premium",
  "slug": "kaos-premium",
  "description": "Kaos premium 100% cotton.",
  "price": 149000,
  "stock": 12,
  "category_id": "uuid",
  "status": "active",
  "images": [
    "https://cdn.example.com/kaos-1.jpg",
    "https://cdn.example.com/kaos-2.jpg"
  ]
}
```
Response 201:
```json
{
  "id": "uuid",
  "store_id": "uuid",
  "name": "Kaos Premium",
  "slug": "kaos-premium",
  "price": 149000,
  "stock": 12
}
```

### PATCH /stores/:storeId/products/:productId
### DELETE /stores/:storeId/products/:productId

---

## 4) Orders

### POST /stores/:storeId/orders
Request body:
```json
{
  "customer_name": "Budi Santoso",
  "customer_email": "budi@example.com",
  "customer_phone": "081234567890",
  "shipping_address": "Jl. Sudirman No 10 Jakarta",
  "shipping_city": "Jakarta",
  "shipping_postcode": "12000",
  "items": [
    {
      "product_id": "uuid",
      "quantity": 1
    }
  ]
}
```
Response 201:
```json
{
  "id": "uuid",
  "store_id": "uuid",
  "status": "pending",
  "total_amount": 149000,
  "payment": {
    "provider": "midtrans",
    "token": "midtrans-token",
    "redirect_url": "https://app.midtrans.com/snap/...."
  }
}
```

### GET /stores/:storeId/orders
Response 200:
```json
{
  "items": [
    {
      "id": "uuid",
      "customer_name": "Budi Santoso",
      "status": "paid",
      "total_amount": 149000,
      "created_at": "2026-10-14T06:00:00Z"
    }
  ]
}
```

### GET /stores/:storeId/orders/:orderId
### PATCH /stores/:storeId/orders/:orderId/status
Request body:
```json
{
  "status": "packed"
}
```

---

## 5) Payment / Midtrans

### POST /payments/midtrans/create
Request body:
```json
{
  "order_id": "uuid",
  "amount": 149000,
  "customer_name": "Budi Santoso",
  "customer_email": "budi@example.com"
}
```
Response 200:
```json
{
  "token": "midtrans-token",
  "redirect_url": "https://app.midtrans.com/snap/..."
}
```

### POST /payments/midtrans/webhook
Midtrans sends POST request with payload. Endpoint must verify signature and update order status.

Response 200:
```json
{
  "status": "success"
}
```

---

## 6) Domain / Storefront

### POST /stores/:storeId/domains
Request body:
```json
{
  "domain": "bajujemari.com",
  "type": "custom"
}
```
Response 201:
```json
{
  "id": "uuid",
  "domain": "bajujemari.com",
  "verification_status": "pending",
  "tls_status": "pending"
}
```

### POST /stores/:storeId/domains/:domainId/verify
Response 200:
```json
{
  "verification_status": "verified",
  "message": "Domain ownership verified"
}
```

---

## 7) Public storefront

### GET /public/:slug
Public storefront route without auth.

Response 200:
```json
{
  "store": {
    "id": "uuid",
    "name": "Baju Jemari",
    "description": "Toko pakaian lokal untuk remaja.",
    "logo_url": "https://cdn.example.com/logo.png"
  },
  "products": [
    {
      "id": "uuid",
      "name": "Kaos Premium",
      "price": 149000,
      "stock": 12,
      "slug": "kaos-premium"
    }
  ]
}
```

---

## 8) Endpoint security rules
- Semua endpoint owner/admin harus memakai JWT Authorization header
- Public routes only for storefront pages and public product visibility
- Never expose Midtrans server key to frontend
- Every store-scoped request must validate `store_id` ownership by authenticated user
- Domain verification flow must require user ownership of the domain

---

## 9) Error response standard
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Slug already exists",
    "details": {
      "field": "slug"
    }
  }
}
```

Status codes:
- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 500 Internal Server Error

---

## 10) Recommended backend module breakdown
- `auth` — register, login, me
- `stores` — create, update, fetch, domains
- `products` — CRUD
- `orders` — list, detail, update status
- `payments` — Midtrans integration + webhook
- `public` — storefront rendering
- `notifications` — push/email service

This is the initial API map for MVP. It can later expand into admin and analytics service modules.

---

## Suggested API naming convention
- Always plural nouns for resources: `/stores`, `/products`, `/orders`
- Use path parameter when resource belongs to a store: `/stores/:storeId/products`
- Use `/public` prefix only for no-auth storefront endpoints
- Use HTTP verbs according to resource action: POST create, GET read, PATCH update, DELETE remove

This keeps APIs predictable and easier for both Flutter app and web admin to consume.
