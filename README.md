1 - Download the above repo
2 - Download docker and docker compose plugin
3 - Run "docker-compose up --build" to start the service
4 - docker exec -it ollama ollama pull nomic-embed-text

Curl to post a query:
curl -X POST http://localhost:3000/api/query   -H "Content-Type: application/json"   -d '{"query":"Give me 3BHK flats"}'

Curl to get property by id:
curl --location 'http://localhost:3000/api/property/1' \
--header 'Content-Type: application/json' \
--data ''
