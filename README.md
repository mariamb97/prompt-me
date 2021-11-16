# codeop_fs15_soloproject
This is a student project that was created at CodeOp, a full stack development bootcamp in Barcelona.

## Description
A repository of ideas to write fictional stories.

- The main idea is that users can input ideas they would like to be transformed into fictional stories or art.
- Writers and artists can take inspiration from these ideas, and then link their creations in each prompt (fork).

## Technologies used
React, Router, MySql. No third party API, data is exclusively taken from the user's input.

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`

- Run `npm run migrate`  or `yarn` in the project folder of this repository.

- Run `npm run migrate`  or `yarn` in the client folder of this repository.

### Development

- Run `npm start` in project directory to start the Express server on port 5000.
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## Database tables draft

![Database tables draft](img/database_draft.png)

## API routes draft

| URL | METHOD | DESCRIPTION | REQUEST OBJECT | RESPONSE OBJECT |
|-----|--------|-------------|----------------|-----------------|
| /   | GET    | Get prompts. | n/a | Array  Object  prompt_id: INTEGER  prompt_description: TEXT prompt_requirements: VARCHAR(255)  prompt_categories: VARCHAR(255) prompt_links: VARCHAR(255) category_id: INTEGER user_nickname: VARCHAR(255) category_name: VARCHAR(255) |
| /:id   | GET    | Get a prompt. | n/a | Object  prompt_id: INTEGER  prompt_description: TEXT prompt_requirements: VARCHAR(255)  prompt_links: VARCHAR(255)  user_id: INTEGER Category_id: INTEGER |
| / | POST | Post prompt. |   Object  prompt_description: TEXT  prompt_requirements: VARCHAR(255)  prompt_links: VARCHAR(255)  category_id: INTEGER  user_id: INTEGER | Object  prompt_description: TEXT  prompt_requirements: VARCHAR(255)  prompt_links: VARCHAR(255)  category_id: INTEGER  user_id: INTEGER |
| /:id | DELETE | Delete prompt. | n/a | n/a |
| /categories | GET | Get categories. | n/a | Array  Object  category_id: INTEGER category_name: VARCHAR(255)  category_description: VARCHAR(255)  user_id: INTEGER prompts_amount: INTEGER | n/a |
| /categories/:id | GET | Get category. | n/a | category_id: INTEGER category_name: VARCHAR(255) category_description: VARCHAR(255) user_id: INTEGER prompts_amount: INTEGER |
| /categories/:id/prompts | GET | Get category's prompts. | n/a | prompt_id: INTEGER prompt_description: VARCHAR(255) prompt_requirements: VARCHAR(255) prompt_links: VARCHAR(255) category_id: INTEGER user_nickname: VARCHAR(255) category_name: VARCHAR(255)|
| /categories | POST | Post category. | Object  category_name: VARCHAR(255)  category_description: VARCHAR(255)  user_id: INTEGER | category_id: INTEGER category_name: VARCHAR(255) category_description: VARCHAR(255) user_id: INTEGER prompts_amount: INTEGER |
| /categories/:id | DELETE | Delete category. | n/a | n/a|
| /users:id | GET | Get user. | n/a | Object user_id: INTEGER user_email: VARCHAR(255) user_nickname:VARCHAR(255) user_firstname: VARCHAR(255) user_lastname: VARCHAR(255) user_password: VARCHAR(255) |
| /users | POST | Post a new user. | Object  user_id: INTEGER user_email: VARCHAR(255) user_nickname:VARCHAR(255) user_firstname: VARCHAR(255) user_lastname: VARCHAR(255) user_password: VARCHAR(255) | Object  user_id: INTEGER user_email: VARCHAR(255) user_nickname:VARCHAR(255) user_firstname: VARCHAR(255) user_lastname: VARCHAR(255) user_password: VARCHAR(255) |
| /users/:id | DELETE | Delete user. | n/a | n/a |

## Future features
- Fork functionality. The user needs to be able to use a prompt to write, this would require to add a state system to the prompts that is associated to the user id, so they can become "work in progress" or "complete", etc. And finally, being able to add the external links to their work.
- Favourites functionality. It will require to associate the id user to the prompt id.
- Login authentication.
- Prompt single page. Each prompt will need to have a page where further info (like number of favourites, links, etc are shown).






