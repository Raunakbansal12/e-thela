# e-ठेला (e-Thela)

A Rajasthan-inspired digital assistant and marketplace for Indian street vendors. Built for hackathon demo impact, e-ठेला empowers vendors to source raw materials (B2B), showcase and sell finished goods (B2C), and connect with customers—all with extreme simplicity and accessibility.

## 🚩 Features
- **User Registration & Login** (Vendor, Supplier, Customer roles)
- **Profile & Ratings** (with reviews)
- **Supplier Product Management** (CRUD)
- **Vendor Listing Management** (CRUD)
- **Marketplace Feed** (B2B & B2C)
- **AI Price Comparison** (Mandi price + supplier comparison)
- **In-App Call Simulation** (demo alert)
- **Accessibility Stubs** (language/voice)
- **Customer Map View** (Rajasthan-themed, vendor pins)
- **Rajasthan UI Theme** (warm colors, festive banners, custom fonts)

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JS, Bootstrap 5, Bootstrap Icons, Google Fonts, Leaflet.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** JWT (JSON Web Tokens)

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone <your-repo-url>
cd e-thela
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env # Edit with your MongoDB URI and JWT secret
node server.js
```

### 3. Frontend Setup
Just open the `frontend/index.html` in your browser, or use a simple static server:
```bash
cd frontend
# For Python 3
python -m http.server 8080
# Or use Live Server in VSCode
```

### 4. Demo Accounts
- Register as a **Supplier** to add raw materials
- Register as a **Street Vendor** to add finished goods
- Register as a **Customer** to browse and review vendors

## 🌍 Rajasthan Touch
- Warm, festive color palette
- Decorative banners and camel icons
- Jaipur map center and block print background
- Google Fonts: Baloo Bhai 2

## 🏆 Hackathon-Ready
- Fully functional MVP
- Mobile-first, accessible, and visually attractive
- Demo-friendly features: price comparison, map, reviews, call simulation

## 📂 Project Structure
```
backend/        # Express server, API routes, Mongoose models
frontend/       # HTML, CSS, JS, Bootstrap, Rajasthan theme
models/         # (if present) Mongoose schemas
```

## 🙏 Credits
- [Bootstrap](https://getbootstrap.com/)
- [Leaflet.js](https://leafletjs.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Google Fonts](https://fonts.google.com/)
- [Icons8](https://icons8.com/icons/set/camel)

---

**e-ठेला: Bringing the spirit of Rajasthan’s bazaars to the digital world!** 
