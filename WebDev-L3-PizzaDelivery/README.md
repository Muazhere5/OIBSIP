# Level 3 - Pizza Delivery Full-Stack Application

## Overview
This platform is a comprehensive full-stack pizza delivery web application built as the final Level 3 task for the Oasis Infobyte Internship. It features a rich, interactive user experience for building custom pizzas, real-time order tracking, and a robust admin dashboard for managing inventory and incoming orders.

## Tech Stack
- MongoDB
- Express.js
- React.js
- Node.js
- Razorpay (Payment Gateway)
- Socket.io (Real-time tracking)
- Node-cron (Automated scheduling)
- Nodemailer (Automated email alerts)

## Features

### User Features
- Secure user registration and login with JWT authentication.
- Password reset flow via secure email tokens.
- Interactive Custom Pizza Builder allowing base, sauce, cheese, and veggie selection.
- Visual User Dashboard featuring preset signature pizzas.
- Seamless checkout process integrating Razorpay.
- Real-time Live Order Tracker utilizing Socket.io and pure CSS animations (no audio).

### Admin Features
- Secure Admin Portal with exclusive access to the dashboard.
- Real-time Order Kanban Board to manage and advance order statuses.
- Live Inventory Table with color-coded, pulsing visual indicators for low stock.
- Stock Updater to manually replenish ingredients.
- Automated inventory decrement upon successful user orders.
- Automated low-stock email alerts driven by a Node-cron scheduled job.

## Environment Setup
Create a `.env` file in the `backend` directory with the following template (do not use real credentials in public repos):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=1d
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
EMAIL_USER=your_email_address_here
EMAIL_PASS=your_email_app_password_here
```

## Run Instructions
Follow these steps to run the application locally.

1. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```
2. **Start Backend Server:**
   ```bash
   npm run dev
   ```
3. **Install Frontend Dependencies:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   ```
4. **Start Frontend Development Server:**
   ```bash
   npm run dev
   ```
5. Navigate to `http://localhost:5173` in your browser to view the app.
