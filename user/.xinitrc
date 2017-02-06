#!/bin/bash

source ~/bin/uxinit

synclient PalmDetect=1
synclient TapButton1=0
synclient TapButton2=0
synclient TapButton3=0

sudo sysctl fs.inotify.max_user_watches=65536

thunar --daemon &
dunst &

feh --bg-scale ~/.config/background.jpg

exec i3
