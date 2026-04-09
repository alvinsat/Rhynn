#!/bin/bash

# Run the Rhynn server stack: MySQL, server, worldbuilder, and webclient.
# Requires npm dependencies installed in webclient and PHP installed for worldbuilder.

set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Starting MySQL..."
sudo service mysql start

echo "Starting Rhynn server..."
cd "$ROOT_DIR/server/MinServer"
nohup ./ServerStart > "$ROOT_DIR/server.log" 2>&1 &
SERVER_PID=$!
sleep 2

echo "Starting Worldbuilder..."
cd "$ROOT_DIR/worldbuilder"
nohup php -S 127.0.0.1:8000 > "$ROOT_DIR/worldbuilder.log" 2>&1 &
WORLDBUILDER_PID=$!
sleep 1

echo "Starting webclient..."
cd "$ROOT_DIR/webclient"
nohup npx http-server -p 3000 > "$ROOT_DIR/webclient.log" 2>&1 &
WEBCLIENT_PID=$!

echo ""
echo "Rhynn stack started."
echo "Server PID: $SERVER_PID"
echo "Worldbuilder PID: $WORLDBUILDER_PID"
echo "Webclient PID: $WEBCLIENT_PID"
echo "Server: tcp://127.0.0.1:23179"
echo "Worldbuilder: http://127.0.0.1:8000"
echo "Webclient: http://127.0.0.1:3000"
echo "Logs: $ROOT_DIR/server.log, $ROOT_DIR/worldbuilder.log, $ROOT_DIR/webclient.log"
