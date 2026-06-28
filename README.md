# 🏔️ BuddyInHills – Trip Discovery App

A modern, responsive **Trip Discovery Web Application** built with **React.js** for the **Buddy In Hills React Frontend Internship Assessment**.

The application uses the **DummyJSON Products API**, where each product is presented as a travel package/trip. The focus of this project is on React fundamentals, reusable components, API integration, responsive design, and clean, maintainable code.

---

# 🚀 Live Demo

🔗 https://trip-discovery-app-e4qv.vercel.app/

---

# 📂 GitHub Repository

🔗 https://github.com/Sara12-2/Trip-discovery-app

---

# ✨ Features

## 🏠 Home Page

- Display all trips in a responsive card layout
- Trip Image
- Trip Name
- Destination (Category)
- Price
- Rating
- Short Description
- Explore Button

---

## 🔍 Search

- Search trips using the API
- Dynamic search results
- Handles empty search results gracefully

API:

```
GET /products/search?q=...
```

---

## 🗂️ Category Filter

- Filter trips by destination/category
- Dynamically fetch categories from API

APIs:

```
GET /products/categories
GET /products/category/{category}
```

---

## 📄 Trip Details Page

Displays complete trip information including:

- Large Image
- Trip Name
- Full Description
- Price
- Rating
- Category
- Additional Information

---

## ❤️ Wishlist

- Save favorite trips
- Stored using LocalStorage
- Remove trips from wishlist anytime

---

## 📱 Responsive Design

Optimized for:

- ✅ Mobile
- ✅ Tablet
- ✅ Desktop

---

## ⏳ Loading State

- Displays a loading indicator while fetching data.

---

## ⚠️ Empty State

- Shows a meaningful message when no trips are found.

---

## ❌ Error Handling

- Handles API errors gracefully.
- Displays user-friendly error messages.

---

# 🛠️ Tech Stack

- React.js
- JavaScript (ES6+)
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- LocalStorage

---

# 🌐 API Used

DummyJSON Products API

Endpoints used:

```
GET /products

GET /products/search?q=

GET /products/categories

GET /products/category/{category}

GET /products/{id}
```

Official API Documentation:

https://dummyjson.com/docs/products

---

# 🔄 Data Mapping

| API Field | UI Field |
| ---------- | -------- |
| title | Trip Name |
| category | Destination |
| price | Trip Price |
| rating | Rating |
| description | Description |
| thumbnail | Trip Image |

---

# 📁 Folder Structure

```text
src/
├── api/
├── assets/
├── components/
│   ├── common/
│   ├── filters/
│   └── home/
├── hooks/
├── pages/
│   ├── HomePage.jsx
│   ├── TripDetailsPage.jsx
│   ├── WishlistPage.jsx
│   └── ProfilePage.jsx
├── App.jsx
└── main.jsx
```

---

# 💡 Assumptions

- DummyJSON products are treated as travel packages.
- Product category represents trip destination.
- Product price represents trip cost per person.
- Authentication is not required.
- Wishlist data is stored locally using LocalStorage.

---

# ⚡ Challenges Faced

- Mapping product data into a travel-based UI.
- Implementing search and category filtering.
- Managing loading, empty, and error states.
- Building a responsive layout across different screen sizes.
- Organizing reusable React components for maintainability.

---

# 🚀 Future Improvements

- Dark Mode
- Infinite Scroll
- Pagination
- Booking System
- Authentication
- Payment Integration
- User Reviews
- Share Trip Feature
- Performance Optimizations

---

# 🖥️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Sara12-2/Trip-discovery-app.git
```

Navigate to the project:

```bash
cd trip-discovery-app
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# 🎯 Project Highlights

- Clean and reusable React components
- Responsive UI for all devices
- REST API Integration
- React Router Navigation
- Search Functionality
- Category Filtering
- Loading & Error States
- Wishlist using LocalStorage
- Clean Folder Structure
- Maintainable Codebase

---

# 👩‍💻 Author

**Sara Manzoor**

GitHub: https://github.com/Sara12-2

Email: saramanzoor76@gmail.com

---

