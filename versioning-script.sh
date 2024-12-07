# Run me with : ./versioning-script.sh
# Permission error then run : chmod +x versioning-script.sh

printf "\nCreate a product for versioning update"
printf "\n####################################################################\n"
curl -X POST http://localhost:3000/create?name=versioning

printf "\nTesting versioning endpoint"
printf "\n####################################################################\n"
ab -n 1100 -c 100  http://localhost:3000/versioning?name=versioning

printf "\nProduct after versioning update"
printf "\n####################################################################\n"
curl http://localhost:3000/get?name=versioning