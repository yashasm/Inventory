echo "setting up inventory application"

apt-get update
apt-get install nodejs
apt-get install npm

npm install

node app.js

echo "===================================================="
echo "Project setup succesfull. Please visit http://localhost:3000"
echo "===================================================="

