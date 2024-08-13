# 🚀 Project Setup Guide

Welcome to the project! Follow this guide to set up and run the project on your local machine.

---

## 📋 Prerequisites

Before you start, make sure you have:

- **Node.js** and **npm** installed on your machine.
- Environment variables set up in both the **frontend** and **backend** directories.
- **MongoDB** running and properly configured in the backend `.env` file. The connection string and other related configurations should be specified there.
- **Postman** installed for testing the backend API endpoints.
- **Browser Developer Tools** ready for inspecting and debugging the frontend once it’s running.

---

## ⚙️ Environment Setup & Installation

1. **Frontend Environment Setup:**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Copy the sample environment file:
     ```bash
     cp env.sample.frontend .env
     ```
   - Open `.env` and fill in the required values.

2. **Backend Environment Setup:**
   - Navigate to the backend directory:
     ```bash
     cd ../backend
     ```
   - Copy the sample environment file:
     ```bash
     cp env.sample.backend .env
     ```
   - Open `.env` and fill in the required values.
   - > **Note:** Never push your `.env` files to the repository. Make sure to add `.env` to your `.gitignore` file.

     
3. **Install Dependencies:**
   - After setting up the environment variables, run the following script to install all necessary packages for both frontend and backend and start them concurrently:
     ```bash
     ./install
     ```
   - Alternatively, you can install and start only the frontend:
     ```bash
     ./install-frontend
     ```
   - Or install and start only the backend:
     ```bash
     ./install-backend
     ```

---

## 🚀 Running the Project

Once the installation is complete, the project should start automatically. If it doesn't, you can manually start the frontend and backend:

- **Frontend:**
  ```bash
  cd frontend && bun dev

- **Backend:**
  ```bash
  cd backend && nodemon
