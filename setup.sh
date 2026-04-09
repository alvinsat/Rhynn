#!/bin/bash

# Setup script for Rhynn project: database setup, build server, and worldbuilder setup
# Run this script after installing dependencies with install.sh

echo "Starting MySQL service..."
sudo systemctl start mysql

echo "Securing MySQL installation (follow prompts)..."
sudo mysql_secure_installation

echo "Setting up databases..."
cd server/MinServer/_db

echo "Loading init.sql..."
mysql -u root -p < init.sql

echo "Loading fw_core.sql..."
mysql -u root -p fw_core < fw_core.sql

echo "Loading fws_messages.sql..."
mysql -u root -p fws_messages < fws_messages.sql

echo "Database setup complete."

echo "Building the server..."
cd ../  # back to MinServer
premake4 gmake
make

echo "Server build complete."

echo "Setting up Worldbuilder..."
sudo cp -r ../../worldbuilder /var/www/html/
sudo systemctl start apache2

echo "Worldbuilder setup complete. Access at http://localhost/worldbuilder"
echo "Note: Update database credentials in /var/www/html/worldbuilder/modules/DBC.php if needed."
echo "All setup steps completed. You can now run the server if desired."