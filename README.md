# 🏔️ BuddyInHills - Trip Discovery Web Application

A responsive Trip Discovery web application built with **React.js** as part of the *Buddy In Hills React Frontend Internship Assessment*.

This project demonstrates React fundamentals, component architecture, API integration, UI/UX thinking, responsiveness, and clean code practices.

---

## 🚀 Live Demo

https://trip-discovery-app-e4qv.vercel.app/

---

## 📦 Tech Stack

- React.js  
- JavaScript (or TypeScript if used)  
- React Router DOM  
- Axios / Fetch API  
- Tailwind CSS  
- Vite  
- LocalStorage (if implemented)

---

## ✨ Features

### 🏠 Home Page
- Responsive card layout displaying trips  
- Image, Trip Name, Destination, Price, Rating, Description, CTA button  

---

### 🔍 Search
```
GET /products/search?q=...
```

---

### 🗂️ Category Filter
```
GET /products/categories
GET /products/category/{category}
```

---

### 📄 Trip Details Page
- Large Image  
- Title  
- Description  
- Rating  
- Price  
- Category  
- Additional Info  

---

### 📱 Responsive Design
- Mobile  
- Tablet  
- Desktop  

---

### ⏳ Loading State
- Loader during API calls  

---

### ⚠️ Empty State
- No results found UI  

---

### ❌ Error Handling
- Graceful API failure handling  

---

## 🎯 Bonus Features (If Implemented)

- Wishlist (LocalStorage)  
- Debounced Search  
- Skeleton Loading  
- Image Lazy Loading  
- Animations  

---

## 📁 Folder Structure

```bash
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
│   ├── TripsPage.jsx
│   ├── TripDetailsPage.jsx
│   ├── WishlistPage.jsx
│   └── ProfilePage.jsx
├── App.jsx
└── main.jsx
```

---

## 🌐 API Integration

- GET /products
- GET /products/search?q=
- GET /products/categories
- GET /products/category/{category}
- GET /products/{id}

---

## 🔄 Data Mapping

| API Field | UI Field |
|----------|----------|
| title | Trip Name |
| category | Destination |
| price | Price |
| rating | Rating |
| description | Description |
| thumbnail | Image |

---

## 💡 Assumptions

- Products = Trips  
- Category = Destination  
- Price = Per person cost  
- No authentication required  
- Wishlist stored in LocalStorage  

---

## 🧩 Challenges Faced

- API data mapping  
- Search + filter handling  
- Responsive UI  
- Loading & error states  

---

## 🚀 Future Improvements

- Dark Mode  
- Pagination / Infinite Scroll  
- Authentication  
- Booking system  
- Payment integration  
- Reviews system  

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/your-username/trip-discovery-app.git
cd trip-discovery-app
npm install
npm run dev
```

Open:
http://localhost:5173

---

## 📊 Evaluation Focus

- React fundamentals  
- Component structure  
- Code readability  
- API integration  
- State management  
- UI/UX  
- Responsiveness  
- Error handling  

---

## 👨‍💻 Author

Your Name  
GitHub: Sara12-2  
Email: saramanzoor76@gmail.com  

---

## 📌 Note

This project is for the Buddy In Hills React Frontend Internship Assessment.
```
