# Prompt me

In this repository you will find Prompt me, a Full-stack note-taking App, built using HTML, CSS,React, ReactRouter, Node, Express, MySQL.

## Setup

### Dependencies

Run `npm install` in project directory to install dependencies related to Express.

`cd client` and run `npm install` to install dependencies related to React.

### Database Prep

Create a `.env` file in the project folder of this repository containing the MySQL authentication information for MySQL user:

```
DB_HOST=localhost
DB_USER=YOUR_USERNAME
DB_NAME=promptme
DB_PASS=YOUR_PASSWORD

```

(replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your actual username and password)

In the MySQL CLI, create a database `create database promptme;`.

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create 3 tables called `categories`, `prompts`, `users`

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in port 3000.

## Database tables draft

![Database tables draft](img/database_draft.png)

## Credits

This is a feature extension student project that was created at CodeOp, a full stack development bootcamp in Barcelona.
