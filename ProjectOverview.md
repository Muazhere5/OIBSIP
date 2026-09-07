# Deep Project Scan: Errors, Bugs, & Suspicious Areas

Based on a thorough, deep scan of the entire MERN stack project, several critical bugs, security vulnerabilities, logic flaws, and missing assets have been identified. 

## 1. Missing Images & Assets
* **Missing Background Image:** The `ForgotPassword.css` and `ResetPassword.css` files heavily rely on a background image referenced via `url('../assets/pizza-bg.jpg')`. However, this file does not exist in the `frontend/src/assets/` directory, resulting in a broken background on those pages.
* **Emoji Placeholders Instead of Actual Images:** The `UserDashboard.jsx` displays preset signature pizzas using text-based emojis (e.g., `🍕`, `🥗`) for the `image` property. Given the specific requirement for "visually stunning placeholder pizza cards," actual high-quality image assets were meant to be attached here.

## 2. Critical Errors & Application Crashes
* **Razorpay SDK Not Loaded (Checkout Broken):** The `RazorpayButton.jsx` component attempts to trigger the payment modal by calling `new window.Razorpay(options)`. However, the Razorpay checkout script (`<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`) is missing from `frontend/index.html`. This throws a `window.Razorpay is not a constructor` error, completely breaking the checkout process.
* **Mongoose ObjectId Casting Crash (Guest Checkout):** The `OrderModel` strictly enforces `userId` as an `ObjectId`. However, in `RazorpayButton.jsx`, an unauthenticated user falls back to passing `userId: 'guest_id'`. When the backend's `/verify` route attempts to save this string, Mongoose will fail to cast it to an `ObjectId`, crashing the server and resulting in a 500 Internal Server Error.

## 3. Security Vulnerabilities
* **Backend API Routes Are Completely Unprotected:** The admin routes for managing inventory (`PUT /api/inventory/:id`) and orders (`PUT /api/orders/:id/status`, `GET /api/orders`) have absolutely no JWT or role-based authentication middleware attached to them in `inventoryRoutes.js` and `orderRoutes.js`. Anyone with knowledge of the endpoint URLs can manipulate the system's database.
* **Insecure Frontend Route Guarding:** `AdminDashboard.jsx` merely checks if `localStorage.getItem('adminToken')` exists to protect the route. An attacker can easily bypass this by manually adding a fake token to their browser's local storage to view the admin UI.
* **Hardcoded Admin Credentials:** The backend `adminAuthController.js` explicitly hardcodes the admin login credentials (`admin@oasis.com` / `admin123`) instead of verifying a securely hashed password against an Admin database collection.

## 4. Logic & Implementation Flaws
* **No Inventory Pre-Validation (Negative Stock):** During payment verification, the `orderController` blindly applies `$inc: { quantity: -1 }` to decrement ingredients. There is no pre-check to ensure the ingredient's `quantity > 0`, meaning the system will happily allow inventory to drop into negative numbers.
* **Hardcoded API Endpoints:** Every Axios request and Socket.io connection in the frontend is hardcoded to `http://localhost:5000`. This tightly couples the frontend to the local environment and will break immediately when deployed to production.
* **Hardcoded Razorpay Key:** The Razorpay `key` configuration in `RazorpayButton.jsx` is hardcoded as `'test_key'` rather than dynamically pulling from an environment variable (e.g., `import.meta.env.VITE_RAZORPAY_KEY_ID`).
* **Single Pizza Limitation (No Cart):** The `OrderContext` overwrites the `orderData` state every time a pizza is built. Because there is no cart system designed to hold an array of pizzas, users are forced to checkout and pay for exactly one pizza at a time.
