#!/bin/bash

# A simple script to run the Codex generator
# Usage: ./codex.sh build

ACTION=$1

if [ "$ACTION" = "build" ]; then
  echo "Building site with Codex..."
  node ../server/codex.js
elif [ "$ACTION" = "clean" ]; then
  echo "Cleaning output directory..."
  rm -rf out/*
else
  echo "Unknown action: $ACTION"
  echo "Usage: ./codex.sh [build|clean]"
  exit 1
fi
