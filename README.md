### Installation
First you must install node js. Duplicate and rename the `.env` and `config.json` files, then remove the `.example` in the file names.

``` 
Project
│
└─── config
│ │ 
│ └─── config.json
│
└─── .env
```

Create a database and adjust it to the configuration in the `config.json` file, here is an example.

``` json
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

Change `.env` file, for example in below.

| key                     | value                         |
| :---------------------- | :---------------------------- |
| `SIMADO_ACCESS_TOKEN`   | *random value                 |
| `SIMADO_ACCESS_TOKEN`   | *random value                 |
| `SIMADO_FRONTEND_CORS`  | *frontend url                 |
| `SIMADO_PORT_SERVER`    | *backend port (optional)      |

Now that run the command below.

``` bash
  npm install
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
```

Run this project.
```
  npm start
```

