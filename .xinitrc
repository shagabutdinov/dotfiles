#!/bin/bash

source ~/bin/uxinit

synclient PalmDetect=1
synclient TapButton1=0
synclient TapButton2=0
synclient TapButton3=0

source /etc/profile.d/infinality-settings.sh

sudo sysctl fs.inotify.max_user_watches=65536

mpd &
thunar --daemon &
dropboxd &
dunst &

feh --bg-scale ~/pictures/background.jpg

exec i3
