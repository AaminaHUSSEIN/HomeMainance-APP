# 🛠️ Home Maintenance App - Backend API

Kani waa nidaamka backend-ka ee mashruuca Home Maintenance. Hoos waxaad ku arki kartaa qaabdhismeedka kooxda iyo endpoints-ka diyaarka ah.

## 👥 Team & Responsibilities

| Developer | Module |
| :--- | :--- |
| **Badri Xasan** | Auth & Users |
| **Cabdiaraxmaan** | Service Providers |
| **Ahmed Saleeban** | Services |
| **Faadumo** | Bookings |
| **Ammina** | Reviews + System Core |

> *Developer walba wuxuu ka shaqeeyaa module-kiisa kaliya.*

---

## 🚀 API Endpoints

### 🔐 Authentication & Users
* **POST** `/api/users/register`
* **POST** `/api/users/login`

### 👷 Service Providers
* **POST** `/api/providers/register` (Multipart/form-data)
* **GET** `/api/providers`
* **GET** `/api/providers/:id`
* **PUT** `/api/providers/:id/availability`

### 🛠️ Services
* **POST** `/api/services`
* **GET** `/api/services`
* **GET** `/api/services/:id`
* **PUT** `/api/services/:id`
* **DELETE** `/api/services/:id`

### 📅 Bookings
* **POST** `/api/bookings`
* **GET** `/api/bookings/my`
* **PATCH** `/api/bookings/:id/status`
* **PATCH** `/api/bookings/:id/complete`

### ⭐ Reviews
* **POST** `/api/reviews`
* **GET** `/api/reviews/service/:serviceId`
* **GET** `/api/reviews/provider/:providerId`
* **DELETE** `/api/reviews/:id`

---

## 🧪 Setup & Test
1. **Start Server:** `npm run dev`
2. **Base URL:** `http://localhost:5006`
3. **Auth:** Use `Bearer Token` in Postman for protected routes.
