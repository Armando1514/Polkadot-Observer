FROM ghcr.io/raffis/mongodb-query-exporter
WORKDIR /
COPY ./config.yaml  /etc/mongodb_query_exporter/config.yaml
EXPOSE 9412

ENTRYPOINT ["/mongodb-query-exporter"]