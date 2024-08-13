# 🚀 Project Setup Guide

Welcome to the project! Follow this guide to set up and run the project on your local machine.

---

## 📋 Prerequisites

Before you start, make sure you have:

- **Node.js** and **npm** installed on your machine.
- Environment variables set up in both the **frontend** and **backend** directories.

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
