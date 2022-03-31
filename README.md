# taproot

Hydro API v2 using GraphQL. The original RESTful API written in Python can be found here: https://github.com/Olin-Hydro/hydro-api. This API is meant to collect and make available sensor data and task logs related to our hydroponics garden.

### Deploying with docker-compose

Install docker and docker-compose. Create a .env file in the base dir with the following

```
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB=
MYSQL_ROOT_PASSWORD=

NODE_LOCAL_PORT=
NODE_DOCKER_PORT=
```

Then run

```
docker-compose up -d
```

Check the logs using

```
docker-compose logs -f
```

You can also check what containers are running with

```
docker ps
```

Most likely the app container will fail because the database you named with MYSQL_DB doesn't exist yet. Enter the running mysql container and create the database using

```
docker exec -it <mysql-container-id> mysql -u root -p
```

Enter the password you set and run

```
CREATE DATABASE MYSQL_DB
```

replacing MYSQL_DB with the name you specified in your .env file. Now you should be able to spin down and up the containers and access the app at `http://localhost:NODE_DOCKER_PORT/graphql`.

```
docker-compose down
docker-compose up -d
```

### Resources for development

- Schema and API framework: https://graphql.org/graphql-js/. Tutorials on the graphql site as well as this [example API](https://www.codepedia.org/ama/complete-example-crud-api-express-graphql) were useful for learning.
- MySQL database: https://www.w3schools.com/mysql/default.asp. [This tutorial](https://www.w3schools.com/nodejs/nodejs_mysql.asp) was useful for creating a simple connection to the database from javascript.
- To manage the database connection using models we used the Sequelize tool: https://sequelize.org/v6/index.html
- [Jest](https://jestjs.io/) and [SuperTest](https://www.npmjs.com/package/supertest) are used for testing
- [Docker guide](https://docs.docker.com/get-started/)
