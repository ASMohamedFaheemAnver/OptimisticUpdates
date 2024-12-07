# Run me with : ./noob-script.sh
# Permission error then run : chmod +x noob-script.sh

printf "\nCreate a product for noob update"
printf "\n####################################################################\n"
curl -X POST http://localhost:3000/create?name=noob

printf "\nTesting noob endpoint"
printf "\n####################################################################\n"
ab -n 1100 -c 100  http://localhost:3000/noob?name=noob

printf "\nProduct after noob update"
printf "\n####################################################################\n"
curl http://localhost:3000/get?name=noob
