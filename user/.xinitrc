#!/bin/bash

xset r rate 150 75

setxkbmap -layout us,ru -option grp:caps_toggle,grp_led:caps
xmodmap -e "keycode 105 = KP_Enter"

xrdb -merge ~/.Xresources

synclient PalmDetect=1
synclient TapButton1=0
synclient TapButton2=0
synclient TapButton3=0

thunar --daemon &
keynav &
redshift -t 6500:2500 -l $(curl -s ipinfo.io | jq -j .loc | tr ',' ':') &
dunst &

sudo sysctl -w vm.max_map_count=262144

exec i3
