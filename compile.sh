#!/bin/bash
red=`tput setaf 9`
green=`tput setaf 10`
yellow=`tput setaf 11`
blue=`tput setaf 12`
reset=`tput sgr0`
SEPARATOR="${green}======================================================================${reset}"
SRC="./src/**"

echo -e "${SEPARATOR}"
echo -e "${green}compiling all files in path [${yellow}${SRC}${green}]${reset}"
echo -e "${SEPARATOR}"

npx tsc
