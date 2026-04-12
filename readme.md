#  BookShell - Online Book Marketplace

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Express-gray?style=for-the-badge&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB--green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-blue?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
</p>

BookShell is a full-stack e-commerce platform for buying and selling books online. It provides a seamless shopping experience for customers and a powerful admin dashboard for managing books and orders.

---

##  Project Architecture

The project consists of three main applications:

| Application | Description | Port |
|-------------|-------------|------|
| **Frontend** (Customer-facing) | User-facing web application for browsing and purchasing books | `5173` |
| **Admin** (Admin Dashboard) | Admin panel for managing books and orders | `5174` |
| **Backend** (REST API) | Express.js REST API for data management | `5000` |

---

##  Features

### Customer (Frontend)
-  **Browse Books** - View books by category with search and filtering
-  **Search** - Find books by title or author
- 🛒 **Shopping Cart** - Add/remove items with quantity adjustment
-  **User Authentication** - Secure sign up/sign in via Firebase
-  **Checkout** - Multiple payment methods (Paystack, Stripe, Cash on Delivery)
-  **Order Tracking** - View order history and status

### Admin Dashboard
-  **Book Management** - Add, edit, and delete books with image upload
-  **Order Management** - View and update order status (Pending → Processing → Shipped → Delivered)
-  **Dashboard Overview** - View order statistics and activity
-  **Admin Authentication** - Secure admin login

### Backend API
-  **JWT Authentication** - Secure API endpoints
-  **Cloud Storage** - Image upload to Cloudinary
-  **Payment Integration** - Stripe and Paystack support

---

##  Tech Stack

### Frontend & Admin
| Technology | Purpose |
|------------|----------|
| React 19 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS 4 | Styling |
| React Router | Navigation |
| Firebase Auth | User Authentication |
| Axios | HTTP Requests |
| Framer Motion | Animations |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|----------|
| Express.js | Web Framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Firebase Admin | Admin Auth |
| Cloudinary | Image Storage |
| Stripe/Paystack | Payment Processing |

---

##  Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary Account
- Firebase Project (for Auth)
- Stripe/Paystack Account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookshell
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install Admin Dependencies**
   ```bash
   cd ../admin
   npm install
   ```

### Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=your_mongodb_connection_string

# Frontend & Admin URLs
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_ADMIN_PRIVATE_KEY=your_admin_private_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET=your_jwt_secret

# Payment (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

### Running the Application

1. **Start the Backend**
   ```bash
   cd backend
   npm start
   ```

2. **Start the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Start the Admin Dashboard** (in a new terminal)
   ```bash
   cd admin
   npm run dev
   ```

---

##  Project Structure

```
bookshell/
├── frontend/                 # Customer-facing application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page routes
│   │   ├── config/           # Firebase config
│   │   └── CartContext/      # Cart state management
│   └── index.html
│
├── admin/                    # Admin dashboard
│   ├── src/
│   │   ├── components/      # Admin components
│   │   ├── assets/          # Styles and data
│   │   └── layouts/         # Layout components
│   └── index.html
│
└── backend/                 # Express API
    ├── config/              # Database & Cloudinary config
    ├── controllers/        # Route handlers
    ├── middleware/         # Auth middleware
    ├── models/              # Mongoose models
    ├── routes/              # API routes
    ├── utils/               # Utility functions
    └── server.js            # Express entry point
```

---

##  API Endpoints

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/book` | Get all books |
| GET | `/api/book/:id` | Get single book |
| POST | `/api/book` | Create book (Admin) |
| PUT | `/api/book/:id` | Update book (Admin) |
| DELETE | `/api/book/:id` | Delete book (Admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/order` | Get all orders (Admin) |
| GET | `/api/order/user` | Get user's orders |
| GET | `/api/order/:id` | Get order details |
| POST | `/api/order` | Create new order |
| PUT | `/api/order/:id` | Update order status (Admin) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register user |
| POST | `/api/user/login` | Login user |
| GET | `/api/user/profile` | Get user profile |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart/add` | Add to cart |
| PUT | `/api/cart/update` | Update cart item |
| DELETE | `/api/cart/remove/:id` | Remove from cart |

---

##  Payment Methods

BookShell supports multiple payment options:
- **Online Payment** - Paystack and Stripe integration
- **Cash on Delivery** - Pay upon delivery

---

##  Environment Variables Required

### Frontend (.env)
```env
VITE_API_BASE=http://localhost:5000
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Admin (.env)
```env
VITE_API_BASE=http://localhost:5000
```

---


