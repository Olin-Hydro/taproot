# taproot

Hydro API v2 using GraphQL. The original RESTful API written in Python can be found here: https://github.com/Olin-Hydro/hydro-api. This API is meant to collect and make available sensor data and task logs related to our hydroponics garden.

### Installing dependencies

```
npm install graphql express express-graphql mysql2 sequelize --save
npm install --save-dev jest supertest
```

### Running the server

```
npm start
```

### Running tests

```
npm run test
```

### Resources for development

- Schema and API framework: https://graphql.org/graphql-js/. Tutorials on the graphql site as well as this [example API](https://www.codepedia.org/ama/complete-example-crud-api-express-graphql) were useful for learning.
- MySQL database: https://www.w3schools.com/mysql/default.asp. [This tutorial](https://www.w3schools.com/nodejs/nodejs_mysql.asp) was useful for creating a simple connection to the database from javascript.
- To manage the database connection using models we used the Sequelize tool: https://sequelize.org/v6/index.html
- [Jest](https://jestjs.io/) and [SuperTest](https://www.npmjs.com/package/supertest) are used for testing
