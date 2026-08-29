# Pizza Delivery Full-Stack Application: Project Overview

This document outlines the setup, configuration, and build phases completed thus far for the Oasis Infobyte Level 3 Pizza Delivery project.

## 1. Environment & Operational Security (OpSec) Setup
- **Version Control:** Git repository initialized and connected to the remote origin (`https://github.com/Muazhere5/OIBSIP.git`).
- **OpSec Configuration:** A highly restrictive `.gitignore` was established. It ensures that standard build outputs (`node_modules`, `/dist`), environment variables (`.env`), and all internal system/agentic directives (`AgentInstruction.md`, `BuildProcess.md`, `ProjectAcknowledgement.md`, `BuildPhase.md`) remain strictly hidden and untracked from the remote repository.
- **Humanoid Directive:** All code has been written strictly adhering to the "Zero Comments" rule. No inline comments, block comments, or docstrings exist within the application logic, simulating a fast-paced intern development environment.

## 2. Phase 1: Foundational Build & MERN Setup
- **Backend Architecture:** 
  - Scaffolded a Node.js/Express.js application.
  - Installed critical dependencies: `express`, `mongoose`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs`, `razorpay`, `socket.io`, `node-cron`, `nodemailer`.
  - Built the initial Express server configuration (`server.js`) listening on the designated environment port.
  - Set up a clean MongoDB connection handler (`config/dbConnection.js`).
- **Frontend Architecture:**
  - Initialized a React application utilizing Vite for high-performance builds.
  - Implemented the "Pizza Feel" UI/UX paradigm—focusing on warm colors (tomato red, warm yellow, burnt charcoal), deep gradients, and interactive CSS hover states.
  - Created the foundational layout components: `Navbar.jsx` and `Footer.jsx` with isolated CSS modules.

## 3. Phase 2: Core Models & Authentication UI
- **Database Schemas:** Designed and integrated Mongoose schemas following a granular file structure:
  - `UserModel.js`: Manages user credentials and roles.
  - `AdminModel.js`: Secures admin credentials.
  - `InventoryModel.js`: Tracks ingredients (base, sauce, cheese, veggie) with default quantities.
  - `OrderModel.js`: Manages user order references, items, amounts, and real-time statuses.
- **Backend Authentication Integration:**
  - Configured secure environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`) in `.env`.
  - Built `userAuthController.js` with linear, simple `registerUser` and `loginUser` logic implementing `bcryptjs` hashing and `jsonwebtoken` issuance.
  - Connected these controllers to POST endpoints via `userAuthRoutes.js` and mounted them on the main server.
- **Frontend Authentication UI:**
  - Scaffolded `UserRegister.jsx` and `UserLogin.jsx` pages using standard React functional components and `useState` for form handling.
  - Applied the "Pizza Feel" to both pages using glassmorphism (semi-transparent cards with backdrop-blur) set against rich tomato-red gradients, ensuring a visually mouth-watering user experience.
  - Set up React Router in `App.jsx` to navigate seamlessly between the layout components and auth pages.

## Summary
The application currently possesses a fully functional boilerplate backend securely connected to MongoDB, complete authentication routing and controller logic, and a beautifully styled frontend boilerplate ready for the interactive Pizza Builder logic in Phase 3.
