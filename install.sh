#!/bin/bash

# Installation script for Rhynn project dependencies
# Run this script with sudo if necessary: sudo ./install.sh

echo "Updating package list..."
sudo apt update

echo "Installing required packages..."
sudo apt install -y build-essential premake4 mysql-server libmysql++-dev libboost-dev libboost-regex-dev qtbase5-dev php apache2 libapache2-mod-php nodejs npm

echo "Installation complete. Follow the remaining steps in README.md for database setup and building."