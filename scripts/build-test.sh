git pull
docker-compose down --rmi all || true
docker-compose -f "docker-compose.yaml" build
docker-compose -f "docker-compose.yaml" up -d