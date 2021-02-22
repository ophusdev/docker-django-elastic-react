ARG ELK_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/logstash/logstash:${ELK_VERSION}

RUN logstash-plugin install logstash-filter-csv && logstash-plugin install logstash-output-elasticsearch

USER root
RUN yum install -y wget && mkdir /var/local/station