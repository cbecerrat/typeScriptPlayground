#!/bin/bash
red=`tput setaf 9`
green=`tput setaf 10`
yellow=`tput setaf 11`
blue=`tput setaf 12`
reset=`tput sgr0`
separator='===================================================='
javascriptEslint="./.eslintrc.js.javascript"
originalEslint="./.eslintrc.js"
typescriptEslint="./.eslintrc.js.typescript"
if [ -e "${javascriptEslint}" ]; then 
	echo "${green}Moving [${yellow}${originalEslint}${reset}] to [${yellow}${typescriptEslint}${reset}]"
	mv ${originalEslint} ${typescriptEslint}
	echo "${green}Moving [${yellow}${javascriptEslint}${reset}] to [${yellow}${originalEslint}${reset}]"
	mv ${javascriptEslint} ${originalEslint}
	echo "${green}Ready to eslint ${red}js${green} rules...${reset}"
else
	echo "${green}Moving [${yellow}${originalEslint}${reset}] to [${yellow}${javascriptEslint}${reset}]"
	mv ${originalEslint} ${javascriptEslint}
	echo "${green}Moving [${yellow}${typescriptEslint}${reset}] to [${yellow}${originalEslint}${reset}]"
	mv ${typescriptEslint} ${originalEslint}
	echo "${green}Ready to eslint ${red}react${green} rules...${reset}"
fi