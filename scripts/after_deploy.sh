#!/bin/bash

HOME=/home/ubuntu

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

SERVER_APP_REPOSITORY=/home/ubuntu/store-5/backend

cd $SERVER_APP_REPOSITORY

pm2 start ./dist/bundle.js 2> $HOME/deploy_after.txt

rm -r $HOME/touch_CICD.txt

