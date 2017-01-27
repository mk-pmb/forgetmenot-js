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
  local FORGOT='Error: Lost callbacks at process exit: n=1: ƒ sayIt ×'
  local F_MEOW="$FORGOT"0/1' (You forgot to say meow!)'

  verify_demo "$F_MEOW" || return $?
  DELAY_MEOW=10 verify_demo meow || return $?
  DELAY_PURR=10 verify_demo purr "$F_MEOW" || return $?
  DELAY_MEOW=10 DELAY_PURR=30 verify_demo meow purr || return $?
  DELAY_MEOW=30 DELAY_PURR=10 verify_demo purr meow || return $?

  local DEMO_CMD=( "$NODE_BIN" mincnt.js )
  local F_OM="$FORGOT"'%/3 (om)'
  verify_demo "${F_OM//%/0}" || return $?
  N_OM=1 verify_demo om "${F_OM//%/1}" || return $?
  N_OM=2 verify_demo om omnom "${F_OM//%/2}" || return $?
  N_OM=3 verify_demo om omnom omnomnom || return $?
  N_OM=4 verify_demo om omnom omnomnom omnomnomnom || return $?

  echo '+OK all tests passed'
  return 0
}


function verify_demo () {
  "$BEST_DIFF" -U 9002 --label 'expected' <(printf '%s\n' "$@"
    ) --label 'actual' <("${DEMO_CMD[@]}" 2>&1 | grep -Pe '^\w'
    ) || return $?
}










test_all "$@"; exit $?
