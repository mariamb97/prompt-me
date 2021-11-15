# codeop_fs15_soloproject
This is a student project that was created at CodeOp, a full stack development bootcamp in Barcelona.

## Description
A repository of ideas to write fictional stories.

- The main idea is that users can input ideas they would like to be transformed into fictional stories or art.
- Writers and artists can take inspiration from these ideas, and then link their creations in each prompt (fork).


## Why you made it?
I am a potential user who was looking for something like this and didn't find one.

## What technologies you used to build it?
React, Router, MySql. No third party API.

## What were the major steps taken to build it?
Endpoints in the backend, routing, components in the frontend and styling.

## Future features
- Fork functionality.
- Favourites functionality.
- Login authentication.
- Prompt single page.

## What was most challenging?
Deciding that it's good enough as MVP.

## What you feel most proud of?
The main functionalities work.

## INSTRUCTIONS
### Backend
In the project folder run:

```
yarn
```
then

```
yarn start
```
### Frontend

```
cd client
```
then
```
yarn start
```


## Database tables draft

![Database tables draft](img/database_draft.png)

## API routes draft

| URL | METHOD | DESCRIPTION | REQUEST OBJECT | RESPONSE OBJECT |
|-----|--------|-------------|----------------|-----------------|
| /   | GET    | Get prompts. | n/a | Array  Object  prompt_id: INTEGER  prompt_description: TEXT prompt_requirements: VARCHAR(255)  prompt_categories: VARCHAR(255) prompt_links: VARCHAR(255) category_id: INTEGER user_nickname: VARCHAR(255) category_name: VARCHAR(255) |
| /:id   | GET    | Get a prompt. | n/a | Object  prompt_id: INTEGER  prompt_description: TEXT prompt_requirements: VARCHAR(255)  prompt_links: VARCHAR(255)  user_id: INTEGER Category_id: INTEGER |
| / | POST | Post prompt. |   Object  prompt_description: TEXT  prompt_requirements: VARCHAR(255)  prompt_links: VARCHAR(255)  category_id: INTEGER  user_id: INTEGER" | n/a |
| /:id | DELETE | Delete prompt. | n/a | n/a |
| /categories | GET | Get categories. | n/a | Array  Object  category_id: INTEGER category_name: VARCHAR(255)  category_description: VARCHAR(255)  user_id: INTEGER prompts_amount: INTEGER | n/a |
| /categories/:id | GET | Get category. | n/a | category_id: INTEGER category_name: VARCHAR(255) category_description: VARCHAR(255) user_id: INTEGER prompts_amount: INTEGER |
| /categories/:id/prompts | GET | Get category's prompts. | n/a | prompt_id: INTEGER prompt_description: VARCHAR(255) prompt_requirements: VARCHAR(255) prompt_links: VARCHAR(255) category_id: INTEGER user_nickname: VARCHAR(255) category_name: VARCHAR(255)|
| /categories | POST | Post category. | Object  category_name: VARCHAR(255)  category_description: VARCHAR(255)  user_id: INTEGER | category_id: INTEGER category_name: VARCHAR(255) category_description: VARCHAR(255) user_id: INTEGER prompts_amount: INTEGER |
| /categories/:id | DELETE | Delete category. | n/a | n/a|
| /users:id | GET | Get user. | n/a | Object user_id: INTEGER user_email: VARCHAR(255) user_nickname:VARCHAR(255) user_firstname: VARCHAR(255) user_lastname: VARCHAR(255) user_password: VARCHAR(255) |
| /users | POST | Post a new user. | Object  user_id: INTEGER user_email: VARCHAR(255) user_nickname:VARCHAR(255) user_firstname: VARCHAR(255) user_lastname: VARCHAR(255) user_password: VARCHAR(255) | n/a |
| /users/:id | DELETE | Delete user. | n/a | n/a |

