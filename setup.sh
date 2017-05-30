echo "setting up inventory application"

apt-get update
apt-get install nodejs
apt install nodejs-legacy
apt-get install npm
npm install
npm install forever -g

echo "===================================================="
echo "Project setup succesfull. Please visit http://localhost:3000"
echo "===================================================="

nohup forever app.js &
