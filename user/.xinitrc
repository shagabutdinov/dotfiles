#!/bin/bash

# xrandr --setprovideroutputsource modesetting NVIDIA-0
# xrandr --auto

/home/leo/.bin/uxinit

synclient TapButton1=0
synclient TapButton2=0
synclient TapButton3=0

synclient VertTwoFingerScroll=1
synclient HorizTwoFingerScroll=1

sudo sysctl -w vm.max_map_count=262144

# mouse sensitivity
mouse_id="$(xinput list | ruby -ne 'puts STDIN.read.match(/COMPANY  USB Device\s+id=([0-9]+)/)[1]')"
xinput set-prop $mouse_id 'libinput Accel Speed' -0.9

# env
export TERM='xterm-256color'
export LC_ALL="en_US.UTF-8"

# ssh-agent
eval "$(ssh-agent -s)" > /dev/null 2>&1
ssh-add > /dev/null 2>&1

## gnome keyring
source /etc/X11/xinit/xinitrc.d/50-systemd-user.sh

export PATH=./bin:$HOME/.bin:$HOME/.local/deadfiles/bin:/home/leo/src/go/bin:$PATH
export PATH=/home/leo/.local/bin:$PATH

# ruby
export PATH=/root/.local/share/gem/ruby/3.0.0/bin:$PATH

# go
export GOPATH=~/src/go

# node
export PATH=/home/leo/.nvm/versions/node/v14.18.1/bin:$PATH
export PATH=./node_modules/.bin:$PATH
# export NODE_OPTIONS=--openssl-legacy-provider

thunar --daemon &
sleep 10 && /usr/lib/xfce4/notifyd/xfce4-notifyd &
redshift -t 6500:2500 -l $(curl -s ipinfo.io | jq -j .loc | tr ',' ':') &
dunst &
volumectl -D &
keynav &
balmora dotfiles-submit &
emote & # emotions app

# ulock &
i3 > ~/.i3.log 2>&1

