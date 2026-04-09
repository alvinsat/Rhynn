#!/bin/bash

# Setup script for Rhynn project: database setup, build server, and worldbuilder setup
# Run this script after installing dependencies with install.sh

echo "Starting MySQL service..."
sudo service mysql start

set -e

echo "Setting up databases..."
cd server/MinServer/_db

echo "Loading init.sql..."
sudo mysql < init.sql

echo "Loading fw_core.sql..."
sudo mysql fw_core < fw_core.sql

echo "Loading fws_messages.sql..."
sudo mysql fws_messages < fws_messages.sql

echo "Creating dedicated Rhynn database user..."
sudo mysql -e "CREATE USER IF NOT EXISTS 'rhynn'@'localhost' IDENTIFIED BY 'xypass12'; GRANT ALL PRIVILEGES ON fw_core.* TO 'rhynn'@'localhost'; GRANT ALL PRIVILEGES ON fws_messages.* TO 'rhynn'@'localhost'; FLUSH PRIVILEGES;"

echo "Database setup complete."

echo "Building the server..."
cd ../  # back to MinServer
premake4 gmake
sudo make all

echo "Server build complete."

echo "Worldbuilder setup can be run locally with the built-in PHP server:"
echo "  cd worldbuilder && php -S 127.0.0.1:8000"
echo "If you prefer Apache, copy worldbuilder to your web root and start apache."
echo "Note: Update database credentials in modules/DBC.php if needed."
echo "All setup steps completed. You can now run the server with ./server/MinServer/ServerStart."
