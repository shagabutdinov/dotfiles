#!/bin/bash

xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto

/home/leo/.bin/uxinit

# synclient PalmDetect=1
synclient TapButton1=0
synclient TapButton2=0
synclient TapButton3=0

thunar --daemon &
sudo systemctl restart keynav
redshift -t 6500:2500 -l $(curl -s ipinfo.io | jq -j .loc | tr ',' ':') &
dunst &
volumectl -D &

sudo sysctl -w vm.max_map_count=262144

# gnome keyring
eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets,ssh)
export SSH_AUTH_SOCK
source /etc/X11/xinit/xinitrc.d/50-systemd-user.sh

export GTK_IM_MODULE=xim
export QT_IM_MODULE=xim
export PATH=./bin:$HOME/.bin:$HOME/.local/deadfiles/bin:/home/leo/src/go/bin:$PATH
export LC_ALL="en_US.UTF-8"
autorandr --change

ulock &
exec i3

