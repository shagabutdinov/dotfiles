#!/bin/sh
case $1/$2 in
  pre/*)
    echo "Going to $2..."
    ;;
  post/*)
    echo "Waking up from $2..."
    /home/leo/.local/dotfiles/public/user/.bin/uxinit
    ;;
esac

