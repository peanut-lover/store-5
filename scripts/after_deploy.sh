#!/bin/bash

HOME=/home/ubuntu

SERVER_APP_REPOSITORY=/home/ubuntu/store-5/backend

cd $SERVER_APP_REPOSITORY
pm2 start ./dist/bundle.js

rm -r $HOME/touch_CICD.txt

