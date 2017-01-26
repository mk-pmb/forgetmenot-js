#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function test_all () {
  export LANG{,UAGE}='en_US.UTF-8'
  local SELFPATH="$(readlink -m "$BASH_SOURCE"/..)"
  cd "$SELFPATH" || return $?

  local NODE_BIN=nodejs
  "$NODE_BIN" --version &>/dev/null || NODE_BIN=node
  local BEST_DIFF=colordiff
  </dev/null "$BEST_DIFF" &>/dev/null || NODE_BIN=diff

  local DEMO_CMD=( "$NODE_BIN" usage.js )
  local FORGOT='Error: You forgot to say meow!'

  verify_demo "$FORGOT" || return $?
  DELAY_MEOW=10 verify_demo meow || return $?
  DELAY_PURR=10 verify_demo purr "$FORGOT" || return $?
  DELAY_MEOW=10 DELAY_PURR=30 verify_demo meow purr || return $?
  DELAY_MEOW=30 DELAY_PURR=10 verify_demo purr meow || return $?

  echo '+OK all tests passed'
  return 0
}


function verify_demo () {
  "$BEST_DIFF" -U 9002 --label 'expected' <(printf '%s\n' "$@"
    ) --label 'actual' <("${DEMO_CMD[@]}" 2>&1 | grep -Pe '^\w'
    ) || return $?
}










test_all "$@"; exit $?
