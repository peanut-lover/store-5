#!/bin/bash

source /home/ubuntu/.bashrc

HOME=/home/ubuntu

cd $HOME

pm2 delete all > $HOME/deploy_before.txt

rm -rf store-5

touch $HOME/touch_CICD.txt
