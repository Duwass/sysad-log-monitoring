#!/bin/sh

# Wait for Elasticsearch to be up
until curl -s -u "elastic:${ELASTIC_PASSWORD}" http://localhost:9200 > /dev/null; do
    echo "Waiting for Elasticsearch to start..."
    sleep 5
done

# Set Kibana password
curl -X POST -u "elastic:${ELASTIC_PASSWORD}" -H "Content-Type: application/json" \
    http://localhost:9200/_security/user/kibana_system/_password -d "{ \"password\": \"${KIBANA_PASSWORD}\" }"

echo "Kibana password set successfully."
