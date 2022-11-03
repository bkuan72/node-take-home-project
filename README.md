# Node.js Take Home Project

## Prerequisites
You may need to install the following to get started
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/)

## Goal
### Requirements
1. Migrate the REST endpoint(`rest.js`) business logic into the GraphQL endpoint(`graphql.js`) while keeping REST alive 
2. Add basic authentication to the GraphQL endpoint

Feel free to add any dependencies if you want.

When you have finished the project, please create a PR and add comments to explain your design if necessary.
   
### Bonus
If you have time, adding unit tests will be a bonus.

### What we want to observe
The code in the REST endpoint is intentionally made bad so that we can observe
1. How you will refactor existing logic
2. How you will structure the project
3. Your coding practices
4. Technical decision and tradeoff when you work on a project 

## Get Started
### 1. Start the local DynamoDB
```
docker compose up dynamo-local
# OR
docker-compose up dynamo-local
```

You may access the admin page by http://localhost:8001

### 2. Create tables
```
node createTables.js
```
There will be two tables created, `applications` and `application_features`.

The data relationship is as below

![UML](./images/uml.png)


### 3. Run the app
```
node rest.js
```
