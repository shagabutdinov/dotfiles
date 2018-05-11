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
redshift &
dunst &

feh --bg-scale ~/.config/background.jpg

exec i3
