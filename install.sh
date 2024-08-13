#!/bin/bash

echo "Installing frontend dependencies..."
cd frontend || exit
npm install
echo "Starting frontend..."
npm run dev &
FRONTEND_PID=$!

echo "Installing backend dependencies..."
cd ../backend || exit
npm install
echo "Starting backend..."
npm start &
BACKEND_PID=$!

wait $FRONTEND_PID
wait $BACKEND_PID
