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

## API routes draft

| URL                     | METHOD | DESCRIPTION             | REQUEST OBJECT                                                                                                                                                   | RESPONSE OBJECT                                                                                                                                                                                                                    |
| ----------------------- | ------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| /                       | GET    | Get prompts.            | n/a                                                                                                                                                              | Array Object prompt_id: INTEGER prompt_description: TEXT prompt_requirements: VARCHAR(255) prompt_categories: VARCHAR(255) prompt_links: VARCHAR(255) category_id: INTEGER user_nickname: VARCHAR(255) category_name: VARCHAR(255) |
| /:id                    | GET    | Get a prompt.           | n/a                                                                                                                                                              | Object prompt_id: INTEGER prompt_description: TEXT prompt_requirements: VARCHAR(255) prompt_links: VARCHAR(255) user_id: INTEGER Category_id: INTEGER                                                                              |
| /                       | POST   | Post prompt.            | Object prompt_description: TEXT prompt_requirements: VARCHAR(255) prompt_links: VARCHAR(255) category_id: INTEGER user_id: INTEGER                               | Object prompt_description: TEXT prompt_requirements: VARCHAR(255) prompt_links: VARCHAR(255) category_id: INTEGER user_id: INTEGER                                                                                                 |
| /:id                    | DELETE | Delete prompt.          | n/a                                                                                                                                                              | n/a                                                                                                                                                                                                                                |
| /categories             | GET    | Get categories.         | n/a                                                                                                                                                              | Array Object category_id: INTEGER category_name: VARCHAR(255) category_description: VARCHAR(255) user_id: INTEGER prompts_amount: INTEGER                                                                                          | n/a |
| /categories/:id         | GET    | Get category.           | n/a                                                                                                                                                              | category_id: INTEGER category_name: VARCHAR(255) category_description: VARCHAR(255) user_id: INTEGER prompts_amount: INTEGER                                                                                                       |
| /categories/:id/prompts | GET    | Get category's prompts. | n/a                                                                                                                                                              | prompt_id: INTEGER prompt_description: VARCHAR(255) prompt_requirements: VARCHAR(255) prompt_links: VARCHAR(255) category_id: INTEGER user_nickname: VARCHAR(255) category_name: VARCHAR(255)                                      |
| /categories             | POST   | Post category.          | Object category_name: VARCHAR(255) category_description: VARCHAR(255) user_id: INTEGER                                                                           | category_id: INTEGER category_name: VARCHAR(255) category_description: VARCHAR(255) user_id: INTEGER prompts_amount: INTEGER                                                                                                       |
| /categories/:id         | DELETE | Delete category.        | n/a                                                                                                                                                              | n/a                                                                                                                                                                                                                                |
| /users:id               | GET    | Get user.               | n/a                                                                                                                                                              | Object user_id: INTEGER user_email: VARCHAR(255) user_nickname:VARCHAR(255) user_firstname: VARCHAR(255) user_lastname: VARCHAR(255) user_password: VARCHAR(255)                                                                   |
| /users                  | POST   | Post a new user.        | Object user_id: INTEGER user_email: VARCHAR(255) user_nickname:VARCHAR(255) user_firstname: VARCHAR(255) user_lastname: VARCHAR(255) user_password: VARCHAR(255) | Object user_id: INTEGER user_email: VARCHAR(255) user_nickname:VARCHAR(255) user_firstname: VARCHAR(255) user_lastname: VARCHAR(255) user_password: VARCHAR(255)                                                                   |
| /users/:id              | DELETE | Delete user.            | n/a                                                                                                                                                              | n/a                                                                                                                                                                                                                                |

## Credits

This is a feature extension student project that was created at CodeOp, a full stack development bootcamp in Barcelona.
