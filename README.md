# codeop_fs15_soloproject
This is a student project that was created at CodeOp, a full stack development bootcamp in Barcelona.

## Description
A prompt repository where users can add prompts and take inspiration for writting or drawing.

- The main idea is that users can input ideas they would like to be transformed into fictional stories or art.
- Writers and artists can take inspiration from these ideas, and then link their creations in each prompt (fork).

## Why you made it?
I am a potential user who was looking for something like this and didn't find one.
## What technologies you used to build it?
React, Router, MySql.
## What were the major steps taken to build it?
Endpoints in the backend, routing, components in the frontend and styling.
## Future features
- Fork functionality.
- Favourites functionality.
- Login authentication.
- Prompt single page.

## What was most challenging?
Believing that it's good enough. :)

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
| /   | GET    | Get prompts. | n/a | Array  Object  prompt_id: NUMBER  prompt_description: STRING prompt_requirements: STRING  prompt_categories: STRING  user_id: NUMBER" |
| /:id   | GET    | Get a prompt. | n/a | Object  prompt_id: NUMBER  prompt_description: STRING prompt_requirements: STRING  prompt_categories: STRING  user_id: NUMBER" |
| / | POST | Post prompt. |   Object  prompt_description: STRING  prompt_requirements: STRING  prompt_links: STRING  category_id: NUMBER  user_id: NUMBER" | n/a |
| /:id | DELETE | Delete prompt. | n/a | n/a |
| /categories | GET | Get categories. | n/a | Array  Object  category_name: STRING  category_description: STRING  user_id: NUMBER | n/a |
| /categories/:id | GET | Get category. | n/a | update |
| /categories/:id/prompts | GET | Get category's prompts. | n/a | update |
| /categories | POST | Post category. | Object  category_name: STRING  category_description: STRING  user_id: NUMBER | n/a |
| /categories/:id | DELETE | Delete category. | n/a | n/a|
| /users:id | GET | Get user. | n/a | update |
| /users | POST | Post a new user. | Object  category_name: STRING  category_description: STRING  user_id: NUMBER | n/a |
| /users/:id | DELETE | Delete user. | n/a | n/a |

