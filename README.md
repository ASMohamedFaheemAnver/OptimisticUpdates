# OptimisticUpdates

Handling Race Conditions and Concurrent Resource Updates in Node and MongoDB by Performing Optimistic Updates, For more info [Read here](https://medium.com/@codersauthority/handling-race-conditions-and-concurrent-resource-updates-in-node-and-mongodb-by-performing-f54140da8bc5),

** To test the solution **

- Make sure you have installed node
- Make sure you have installed mongodb/update cloud `MONGODB_URI`
- `npm i -g pm2`
- `cd server && npm i`
- `pm2 start ecosystem.config.js`
- Simulate a non-safe endpoint test: `./noob-script.sh`
- Simulate a safe endpoint test: `./versioning-script.sh`
