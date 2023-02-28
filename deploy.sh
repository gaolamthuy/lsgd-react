if [ -d "./lsgd-react" ] 
then
    sudo git -C ./lsgd-react pull 
    
    sudo docker-compose -f ./lsgd-react/docker-compose.prod.yml build
    sudo docker-compose -f ./lsgd-react/docker-compose.prod.yml up
else
    sudo git clone https://github.com/hophamlam/lsgd-react.git
    