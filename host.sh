clear
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
WHITE='\033[1;37m'
echo ${YELLOW}'COMO HOSPEDAR NO GIT HUB

SAIBA QUE DEVES DÁ OS COMANDOS BÁSICOS DO TERMUX, SENÃO NEM VENHA DÁ OS COMANDOS PRA LANÇAR PRO GIT HUB

PRIMEIRO, VOCÊ DEVE SE CADASTRAR NO GIT HUB

SITE: github.com

É CADASTRO BÁSICO, IGUAL QUALQUER SITE

VOCÊ DEVERA TER EM MÃOS, TODAS AS 
INFORMAÇÕES LISTADAS ABAIXO

1º LINK DO REPOSITÓRIO

2º USUÁRIO DA CONTA

3º TOKEN

PRESSIONE ENTER PARA PROSSEGUIR'
read next
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
git config --global user.email "you@example.com"
git config --global user.name "seunome"
git add .
git commit -m "First commit"
git branch -M main
clear
echo ${CYAN}'Digite ou cole o link do seu Repositório'
echo ${WHITE}
read NOMEGIT
git remote add origin $NOMEGIT
clear
echo ${CYAN}'No próximo comando, ele vai pedir o Username, é só você digitar o nome de usuário, que foi utilizado para criar a conta no Git Hub

Logo em seguida ele vai pedir o Password,
É SÓ VOCÊ COLAR O TOKEN E DAR ENTER

Obs: Não se preocupe na hora de você colar o Token, ele ficara invisível

Pressione enter para Prosseguir'
echo ${WHITE}
read next
git push -u origin main
echo ${GREEN}'Upload Concluído

Pressione enter para Finalizar'
read next