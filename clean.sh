#!/bin/bash
red=`tput setaf 9`
green=`tput setaf 10`
yellow=`tput setaf 11`
blue=`tput setaf 12`
reset=`tput sgr0`
SEPARATOR="${green}======================================================================${reset}"
DIST="./dist/*"

echo -e "${SEPARATOR}"
echo -e "${green}cleaning path [${yellow}${DIST}${green}]${reset}"
echo -e "${SEPARATOR}"

rm -rf ${DIST}
