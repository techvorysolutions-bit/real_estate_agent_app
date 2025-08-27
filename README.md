1 - Download the above repo
2 - Download docker and docker compose plugin
3 - Run "docker-compose up --build" to start the service

Curl to post a query:

curl -X POST http://localhost:3000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Give me one 4 BHK apartment in Gurgaon"}'
