#!/bin/bash

source /home/ubuntu/.bashrc

HOME=/home/ubuntu

cd $HOME

npm --version

npm install pm2 -g

pm2 delete all 2> $HOME/deploy_before.txt

rm -rf store-5

touch $HOME/touch_CICD.txt
