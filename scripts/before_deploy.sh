#!/bin/bash

HOME=/home/ubuntu
cd $HOME

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

pm2 delete all 2> $HOME/deploy_before.txt

rm -rf store-5

touch $HOME/touch_CICD.txt
