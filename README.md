# 🏠 Airbnb Clone

A full-stack web application inspired by Airbnb, built with **Node.js**, **Express**, **MongoDB Atlas**, and **EJS**. Users can browse, create, edit, and delete property listings, leave reviews, and manage their accounts with full authentication.

<div align="center">

### 🌐 [Live Demo → https://airbnb-clone-7s0b.onrender.com/listings](https://airbnb-clone-7s0b.onrender.com/listings)

</div>

---

## 📸 Screenshots

### 🏡 Home Page — Browse Listings
![Home Page](screenshots/homepage.png)

### 🔐 Login Page
![Login Page](screenshots/login.png)

### 📝 Sign Up Page
![Sign Up Page](screenshots/signup.png)

---

## 🚀 Features

- 📋 **Full CRUD** — Create, Read, Update, Delete listings
- 🔐 **User Authentication** — Sign Up, Login, Logout via Passport.js (Local Strategy)
- 🛡️ **Authorization** — Only listing owners can edit or delete their listings; only review authors can delete their reviews
- 🖼️ **Image Upload** — Upload listing photos directly to Cloudinary
- ⭐ **Reviews & Ratings** — Logged-in users can leave reviews with star ratings
- 🧩 **Flash Messages** — Success and error notifications on every action
- 🛡️ **Server-side Validation** — Joi schema validation on all forms
- ⚠️ **Custom Error Handling** — `ExpressError` class with clean error pages
- 🎨 **Responsive UI** — Bootstrap 5 with custom CSS and Font Awesome icons
- 🗄️ **MongoDB Atlas** — Cloud database hosted on MongoDB Atlas
- 🔒 **Secure Sessions** — `connect-mongo` backed session store
- 🌱 **Database Seeder** — Pre-built seed script to initialize sample listings

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js v22 |
| **Framework** | Express.js v5 |
| **Database** | MongoDB Atlas + Mongoose v9 |
| **Authentication** | Passport.js + passport-local-mongoose |
| **Sessions** | express-session + connect-mongo v5 |
| **Templating** | EJS + ejs-mate |
| **Validation** | Joi |
| **Image Storage** | Cloudinary + multer-storage-cloudinary |
| **Styling** | Bootstrap 5, Vanilla CSS, Font Awesome |
| **Fonts** | Google Fonts – Plus Jakarta Sans |
| **Deployment** | Render |

---

## 📁 Project Structure

```
Airbnbclone/
├── app.js                    # Main application entry point
├── schema.js                 # Joi validation schemas
├── middlewares.js            # isLoggedIn, isOwner, validateListing, etc.
├── cloudConfig.js            # Cloudinary + multer storage setup
├── package.json
│
├── models/
│   ├── listing.js            # Mongoose Listing model
│   ├── review.js             # Mongoose Review model
│   └── user.js               # Mongoose User model (passport-local-mongoose)
│
├── routes/
│   ├── listing.js            # Listing CRUD routes
│   ├── review.js             # Review routes
│   └── user.js               # Auth routes (sign-up, login, logout)
│
├── controllers/
│   ├── listings.js           # Listing route handlers
│   ├── reviews.js            # Review route handlers
│   └── users.js              # Auth route handlers
│
├── utils/
│   ├── ExpressError.js       # Custom error class
│   └── wrapAsync.js          # Async error wrapper utility
│
├── init/
│   ├── index.js              # Database seeder script (seeds to Atlas)
│   └── data.js               # 50 sample listings data
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs   # Base HTML layout
│   ├── includes/
│   │   ├── navbar.ejs        # Navigation bar
│   │   ├── flash.ejs         # Flash message display
│   │   └── footer.ejs        # Footer
│   ├── listings/
│   │   ├── index.ejs         # All listings page (home)
│   │   ├── show.ejs          # Single listing details + reviews
│   │   ├── new.ejs           # Create listing form
│   │   ├── edit.ejs          # Edit listing form
│   │   └── error.ejs         # Error display page
│   └── UserSignup/
│       ├── login.ejs         # Login form
│       └── signup.ejs        # Sign up form
│
└── public/
    ├── css/
    │   ├── style.css         # Custom styles
    │   └── rating.css        # Star rating styles
    └── js/
        └── script.js         # Client-side Bootstrap validation
```

---

## ⚙️ Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [MongoDB Atlas](https://cloud.mongodb.com/) account
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Alquama-Shaibli/Airbnb_Clone.git
cd Airbnb_Clone
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
ATLAS=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
SECRET_KEY=your_session_secret_key
SESSION_SECRET=your_session_secret_key

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

---

### 4. Seed the Database (Optional)

Populate the database with 50 sample listings:

```bash
node init/index.js
```

> ⚠️ This will **delete all existing listings** and replace them with sample data. A demo user (`demoOwner` / `demoPassword123`) will also be created as the owner.

---

### 5. Start the Server

```bash
node app.js
```

The server will start on **http://localhost:8080**

---

## 🌐 Routes

### Listings
| Method | Route | Auth Required | Description |
|--------|-------|:---:|-------------|
| `GET` | `/` | ❌ | Redirects to `/listings` |
| `GET` | `/listings` | ❌ | View all listings |
| `GET` | `/listings/new` | ✅ | Show create listing form |
| `POST` | `/listings` | ✅ | Create a new listing |
| `GET` | `/listings/:id` | ❌ | View a single listing + reviews |
| `GET` | `/listings/:id/edit` | ✅ Owner | Show edit listing form |
| `PUT` | `/listings/:id` | ✅ Owner | Update a listing |
| `DELETE` | `/listings/:id` | ✅ Owner | Delete a listing |

### Reviews
| Method | Route | Auth Required | Description |
|--------|-------|:---:|-------------|
| `POST` | `/listings/:id/reviews` | ✅ | Add a review |
| `DELETE` | `/listings/:id/reviews/:reviewId` | ✅ Author | Delete a review |

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/sign-up` | Show sign up form |
| `POST` | `/sign-up` | Register new user |
| `GET` | `/login` | Show login form |
| `POST` | `/login` | Log in user |
| `GET` | `/logout` | Log out user |

---

## 🧬 Data Model

### Listing
| Field | Type | Required |
|-------|------|:--------:|
| `title` | String | ✅ |
| `description` | String | ✅ |
| `image.url` | String | ❌ |
| `image.filename` | String | ❌ |
| `price` | Number | ✅ |
| `location` | String | ✅ |
| `country` | String | ✅ |
| `owner` | ObjectId → User | ✅ |
| `reviews` | [ObjectId → Review] | ❌ |

### Review
| Field | Type | Required |
|-------|------|:--------:|
| `comment` | String | ✅ |
| `rating` | Number (1–5) | ✅ |
| `author` | ObjectId → User | ✅ |

---

## 🚀 Deployment (Render)

This project is deployed on **[Render](https://render.com/)**.

**Build command:** `npm install`  
**Start command:** `node app.js`  
**Environment:** All `.env` variables must be added manually in Render → Environment tab.

---

## 🔮 Roadmap

- [ ] Search & Filter listings by location / price
- [ ] Pagination for listings
- [ ] Booking / Reservation system
- [ ] User profile page
- [ ] Admin dashboard

---

## 📝 License

This project is built for **educational purposes** as part of a full-stack web development learning journey.

---

## 🙌 Acknowledgements

- [Airbnb](https://www.airbnb.com/) — design inspiration
- [Apna College – Wanderlust](https://github.com/apna-college/wanderlust) — project reference
- [Bootstrap](https://getbootstrap.com/) — UI framework
- [Cloudinary](https://cloudinary.com/) — image hosting
- [Unsplash](https://unsplash.com/) — sample listing images
- [Render](https://render.com/) — deployment platform
