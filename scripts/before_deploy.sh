#!/bin/bash

HOME=/home/ubuntu
cd $HOME

pm2 delete all
rm -rf store-5

touch $HOME/touch_CICD.txt
