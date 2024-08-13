#!/bin/bash

    echo "Installing frontend dependencies..."
    cd frontend || exit
    bun install
    echo "Starting frontend..."
    bun dev