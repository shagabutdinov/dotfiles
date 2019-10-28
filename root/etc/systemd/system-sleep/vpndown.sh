#!/bin/sh
case $1/$2 in
  pre/*)
    /home/leo/.local/dotfiles/public/user/.bin/vpndown
    ;;
  post/*)
    ;;
esac

