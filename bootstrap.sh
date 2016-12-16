#!/usr/bin/env bash

echo "Provision VM START"
echo "=========================================="

sudo apt-get update

#install curl
sudo apt-get -y install curl 

#install nodjs
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get update
sudo apt-get -y install nodejs
sudo apt-get -y install build-essential

#install mongo db
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo apt-get update
sudo sed -i '/bind_ip = 127.0.0.1/,/bind_ip\ =\ 127\.0\.0\.1/s/^/#/' /etc/mongod.conf
sudo service mongod restart


#install base npm packages
sudo npm install -g bower
sudo npm install -g grunt-cli
sudo npm install -g express

echo ""
echo "=========================================="
echo "Node setup:"
node -v
echo "Provision VM finished"
