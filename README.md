# Django Reactjs ELK on Docker

This repo is a test of fuctionality using Django, ReactJs, ELK stack all on docker containers managed with docker-compose.

The purpose of this repo is show the italian fuel station on map.
The data are collected by MISE website ad this link https://www.mise.gov.it/index.php/it/open-data/elenco-dataset/2032336-carburanti-prezzi-praticati-e-anagrafica-degli-impianti

# Install!

  Make sure you have docker-compose installed on machine.
  
Into cloned folder duplicate file .env.example and rename it .env.
change the parameters according to your needs

    ELK_VERSION=7.10.0
    ELASTIC_USER=elastic
    ELASTIC_PASSWORD=changeme
    SECRET_KEY=123456789
    ALLOWED_HOSTS=*,127.0.0.1,0.0.0.0
    DEBUG=True
    ELASTIC_CONN=http://es01:9200

If you change elasticsearch credentials on .env file, remeber to change also into 

    docker-config/logstash/config/logstash.yml
    docker-config/logstash/station.conf
    docker-config/kibana/config/kibana.yml

After change desidered params, type:

    cd {PathOfRepo}
    docker-compose build
    docker-compose up

Frontend will be show at http://localhost


# First Run!

After startup the containers, log into logastash container and run the download of the stations

    sudo docker exec -it docker-django-elastic-react_logstash_1 /bin/bash
    
    wget https://www.mise.gov.it/images/exportCSV/anagrafica_impianti_attivi.csv -O /var/local/station/station.csv

After a couple of seconds try to refresh http://localhost and click on a point on map.