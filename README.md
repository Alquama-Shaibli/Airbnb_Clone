# 🏠 Airbnb Clone

A full-stack web application inspired by Airbnb, built with **Node.js**, **Express**, **MongoDB**, and **EJS**. It allows users to browse, create, edit, and delete property listings with full CRUD functionality and server-side validation.

---

## 📸 Preview

| Page | Description |
|------|-------------|
| `/listings` | Browse all available property listings |
| `/listings/new` | Create a new property listing |
| `/listings/:id` | View details of a single listing |
| `/listings/:id/edit` | Edit an existing listing |

---

## 🚀 Features

- 📋 **Full CRUD** — Create, Read, Update, Delete listings
- 🛡️ **Server-side Validation** — Powered by [Joi](https://joi.dev/) schema validation
- ⚠️ **Custom Error Handling** — `ExpressError` class with clean error pages
- 🎨 **Responsive UI** — Bootstrap 5 with custom CSS and Font Awesome icons
- 🗄️ **MongoDB** — Data persistence via Mongoose ODM
- 🔄 **Method Override** — Support for `PUT` and `DELETE` via HTML forms
- 🧩 **EJS Layouts** — Reusable layout system via `ejs-mate`
- 🌱 **Database Seeder** — Pre-built seed script to initialize sample listings

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js v5 |
| **Database** | MongoDB + Mongoose |
| **Templating** | EJS + ejs-mate |
| **Validation** | Joi |
| **Styling** | Bootstrap 5, Vanilla CSS, Font Awesome |
| **Fonts** | Google Fonts – Plus Jakarta Sans |

---

## 📁 Project Structure

```
Airbnbclone/
├── app.js                  # Main application entry point
├── schema.js               # Joi validation schemas
├── package.json
│
├── models/
│   └── listing.js          # Mongoose Listing model
│
├── utils/
│   ├── ExpressError.js     # Custom error class
│   └── wrapAsync.js        # Async error wrapper utility
│
├── init/
│   ├── index.js            # Database seeder script
│   └── data.js             # Sample listings data
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Base HTML layout
│   ├── includes/
│   │   ├── navbar.ejs      # Navigation bar
│   │   └── footer.ejs      # Footer
│   └── listings/
│       ├── index.ejs       # All listings page
│       ├── show.ejs        # Single listing details
│       ├── new.ejs         # Create listing form
│       ├── edit.ejs        # Edit listing form
│       └── error.ejs       # Error display page
│
└── public/
    ├── css/
    │   └── style.css       # Custom styles
    └── js/
        └── script.js       # Client-side scripts
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on port `27017`)
- npm (comes with Node.js)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/airbnb-clone.git
cd airbnb-clone
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Start MongoDB

Make sure your local MongoDB server is running:

```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
```

---

### 4. Seed the Database (Optional)

To populate the database with sample listings:

```bash
node init/index.js
```

> ⚠️ This will **delete all existing listings** and replace them with sample data.

---

### 5. Start the Server

```bash
node app.js
```

The server will start on **http://localhost:8080**

---

## 🌐 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Redirects to `/listings` |
| `GET` | `/listings` | View all listings |
| `GET` | `/listings/new` | Show create listing form |
| `POST` | `/listings` | Create a new listing |
| `GET` | `/listings/:id` | View a single listing |
| `GET` | `/listings/:id/edit` | Show edit listing form |
| `PUT` | `/listings/:id` | Update a listing |
| `DELETE` | `/listings/:id` | Delete a listing |
| `POST` | `/listings/:id/reviews` | Add a review to a listing |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete a review |

---

## 🧬 Data Model

### Listing Schema (`models/listing.js`)

| Field | Type | Required | Default |
|-------|------|----------|---------|
| `title` | String | ✅ Yes | — |
| `description` | String | ❌ No | — |
| `image.url` | String | ❌ No | Unsplash default image |
| `image.filename` | String | ❌ No | `"listingimage"` |
| `price` | Number | ❌ No | — |
| `location` | String | ❌ No | — |
| `country` | String | ❌ No | — |

---

## ✅ Validation Rules (`schema.js` via Joi)

When creating or updating a listing, the following fields are **required**:

- `title` — must be a non-empty string
- `description` — must be a non-empty string
- `price` — must be a number ≥ 0
- `location` — must be a non-empty string
- `country` — must be a non-empty string
- `image.url` — optional string (can be empty or null)

---

## 🧯 Error Handling

- **Custom `ExpressError`** class extends native `Error` with a `statusCode` property.
- **`wrapAsync`** utility wraps async route handlers and forwards errors to Express's error middleware.
- **Global 404 handler** catches all unmatched routes.
- **Global error middleware** renders `error.ejs` with the appropriate message and HTTP status code.

---

## 📦 Dependencies

```json
{
  "ejs": "^3.1.10",
  "ejs-mate": "^4.0.0",
  "express": "^5.2.1",
  "joi": "^18.2.3",
  "method-override": "^3.0.0",
  "mongoose": "^9.4.1"
}
```

---

## 🔮 Future Improvements

- [ ] User Authentication & Authorization (Passport.js / JWT)
- [ ] Image Upload to Cloudinary
- [ ] Search & Filter listings
- [ ] Map integration (Mapbox / Google Maps)
- [x] Reviews & Ratings system
- [ ] Booking / Reservation system
- [ ] Pagination for listings

---

## 📝 License

This project is built for **educational purposes** as part of a full-stack web development learning journey.

---

## 🙌 Acknowledgements

- [Airbnb](https://www.airbnb.com/) — for design inspiration
- [Bootstrap](https://getbootstrap.com/) — UI framework
- [Unsplash](https://unsplash.com/) — default listing images
- [Colt Steele Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) — project inspiration
