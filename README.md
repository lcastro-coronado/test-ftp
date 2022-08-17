# API

How to run the API, you can run this project in two ways, locally with npm or with docker:
 1. `docker-compose up --build`

 To run the tests:
 1. `npm run test`

If you want to run the mongodb instance connecting to a mongo atlas this would be an example of the .env:

```
MONGO_HOST=test-shard-00-00.zh8zk.mongodb.net,test-shard-00-01.zh8zk.mongodb.net,test-shard-00-02.zh8zk.mongodb.net
MONGO_DATABASE=Test
MONGO_PORT=27017
MONGO_USER=condorlabs
MONGO_PASSWORD=testCondor2021
MONGO_REPLICASET=test-shard-00-00
MONGO_AUTH_SOURCE=admin
MONGO_SSL=true
```

Example of oracle .env:
```
ORACLE_CLIENT=oracledb
ORACLE_CONNECTION_STRING=10.22.101.120:1570/PDB_CEBTEST
ORACLE_USER=USER
ORACLE_PASSWORD=ADMIN123
```

NOTE:
  - FOR THE CONNECTION TO ORACLE TO WORK PROPERLY REMEMBER TO HAVE THE CONDOR LABS VPN TURNED ON.
  - FOR SECURITY REASONS, PLEASE REQUEST THE PASSWORD FOR THE ORACLE DATABASE.

PS: This project has several comments to help understand certain concepts, in case you do NOT consider them necessary, please remove them and keep your code as clean as possible.
