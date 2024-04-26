# Nest boilerplate

Hello! This is a simple example of a Nest API boilerplate as I start my journey on this framework.

## Description

To be able to re use this boilerplate for other projects I´ve considered creating four entities / tables. Users and Roles which are related to authentication. Clients and Companies as example entities/tables on a live project.

## Package dependencies

Main dependencies included are:

- bcryptjs: for password hashing.
- passport / passport-jwt: for jwt authentication.
- pg: to connect to the database
- typeorm: for creating the model instances.
- class-validator / class-transformer: for validating classes.

## Requirements

You will need to have installed:

- Node v18.17.1 or higher.
- Nest cli v10.3.2 or higher.
- PostgreSQL.
- .env.example shows which environment variables will be used.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## TODOs

Thera are a couple of pending items to work:

- On the app.conntroller.js endpoints are only for testing purposes and maybe can be reused for health checks or deleted.
- Add unit and e2e testing.
- On the data-source.js file, for some reason I´ve yet to figure out "configService.get<string>('USERNAME')" is not reading the config, leaves it undefined and therefore doesn´t connect with the database. For this reason this key is now hard-coded.
