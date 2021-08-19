#!/bin/bash

source /home/ubuntu/.bashrc

HOME=/home/ubuntu

SERVER_APP_REPOSITORY=/home/ubuntu/store-5/backend

cd $SERVER_APP_REPOSITORY

pm2 start ./dist/bundle.js 2> $HOME/deploy_after.txt

rm -r $HOME/touch_CICD.txt

