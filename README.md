# guestbook-nodejs

In Development!
- Loopback port of the Guestbook App written in Go. For the Go app, go to [https://github.com/IBM/guestbook](https://github.com/IBM/guestbook).

## To run

### Running locally using node

```bash
cd src
npm install
npm start
```

The application can be accessed through http://localhost:3000/

The API Explorer can be accessed through http://localhost:3000/explorer

## Datasources

This application has a PersistedModel representation for the data model which is compatible with Mongo and other similar databases. By default the app stores data in memory which means that the data does not persist if the app crashes or goes down for any reason. You have the option to use Mongo to persist the data from the application by adding the following environment variables:

Required:

- MONGO_HOST - The hostname to access Mongo
- MONGO_PORT - The port to access Mongo

Optional:

- MONGO_USER - The username used to access Mongo. If you are using an unsecured Mongo instance, leave this blank.
- MONGO_PASS - The password to access Mongo. If you are using an unsecured Mongo instance, leave this blank.
- MONGO_DB - The name of the database within Mongo. This can be left blank and the default database name will be used.

You must also change the datasource listed in `src/server/model-config.json` to `mongo` as seen below:

  ```json
  "entry": {
      "dataSource": "mongo",
      "public": true
    }
  ```

Next, you will need to replace the src/server/datasources.json file with the following:

```json
{
  "in-memory": {
    "name": "in-memory",
    "localStorage": "",
    "file": "",
    "connector": "memory"
  },
  "mongo": {
    "host": "${MONGO_HOST}",
    "port": "${MONGO_PORT}",
    "url": "",
    "database": "${MONGO_DB}",
    "password": "${MONGO_PASS}",
    "name": "mongo",
    "user": "${MONGO_USER}",
    "useNewUrlParser": true,
    "connector": "mongodb"
  }
}
```

### Data Model

The `entry` model has the following properties:

  - message: 
    - type: String
  - timestamp: 
    - type: [Javascript date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)