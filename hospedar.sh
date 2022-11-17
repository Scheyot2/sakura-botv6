clear
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
WHITE='\033[1;37m'
echo ${YELLOW}'COMO HOSPEDAR NO HEROKU

SAIBA QUE DEVES DÁ OS COMANDOS BÁSICOS DO TERMUX, SENÃO NEM VENHA DÁ OS COMANDOS PRA LANÇAR PRO HEROKU

PRIMEIRO, VOCÊ DEVE SE CADASTRAR NO HEROKU

SITE: heroku.com

É CADASTRO BÁSICO, IGUAL QUALQUER SITE

PRESSIONE ENTER PARA PROSSEGUIR, DEPOIS ESCOHA O MESMO 
NAVEGADOR QUE USOU PARA CRIAR A CONTA NO HEROKU

OBS: CASO DESCONECTOU SO FAZER LOGIN NOVAMENTE
'
heroku login
rm -rf .git
git init
clear
echo ${CYAN}'Digite o nome da pasta do bot, caso a pasta esteja em
download escreva assim Download/PastaDoBot

Obs: Caso a pasta do bot esteja em MAIÚSCULO digite o 
nome da pasta do bot em MAIÚSCULO'
echo ${WHITE}
read NOMEDAPASTA
git config --global --add safe.directory /storage/emulated/0/$NOMEDAPASTA
clear
echo ${CYAN}'Digite um nome para criar o app no Heroku

Obs: Use apenas letras minúsculas'
echo ${WHITE}
read NOMEDOAPP
heroku apps:create $NOMEDOAPP
heroku git:remote -a $NOMEDOAPP
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest
heroku buildpacks:add https://github.com/clhuang/heroku-buildpack-webp-binaries.git
heroku buildpacks:add https://github.com/pathwaysmedical/heroku-buildpack-tesseract
git config --global user.email "tantofaz@gmail.com"
git config --global user.name "TantoFaz"
git add .
git commit -am "blabla"
git push heroku master
echo ${GREEN}'Upload Concluído

by Lotus

Pressione enter para Finalizar'
read next