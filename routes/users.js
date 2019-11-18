/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const request = require('request');

module.exports = (db) => {
  // ROUTER GET MAIN PAGE WHERE USER CAN MAKE A NEW TODO
  router.get("/", (req, res) => {
    res.send("THIS IS THE LANDING PAGE");

    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        console.log(users);   // users comes back as an object
      })
      .catch(error => {
        console.log(`${error}`)
      });
  });

  // ROUTER GET TODOS ARRANGED BY DATE CREATED ( DEFAULT )
  router.get("/todos", (req, res) => {
    res.send("THIS IS THE TODOS LIST ROUTE ARRANGED BY DATE_CREATED");

    const text = `
    SELECT description, date_due, priority
    FROM todos
    ORDER BY date_created`;
    const values = [];

    db.query(text, values)
      .then(data => {
        const todos = data.rows;
        console.log(todos);
      });
  });

  // ROUTER GET TODOS ARRANGED BY PRIORITY
  router.get("/todos/priority", (req, res) => {
    res.send("THIS IS THE TODOS LIST ROUTE ARRANGED BY PRIORITY");

    const text = `
    SELECT description, date_due, priority
    FROM todos
    ORDER BY priority`;
    const values = [];

    db.query(text, values)
      .then(data => {
        const todos = data.rows;
        console.log(todos);
      });
  });

  // ROUTER GET TODOS ARRANGED BY DUE DATE
  router.get("/categories/:id/todos", (req, res) => {
    res.send(("THIS IS THE ORGANIZED BY CATEGORY_ID ROUTE, which is: " + req.params.id));

    const text = `
    SELECT categories.name
    FROM categories
    WHERE categories.id = $1;`;
    const values = [`${req.params.id}`];


    db.query(text, values)
      .then(data => {
        const categories = data.rows;
        console.log("the category is currently: ", categories[0].name);
        console.log("type of categories is: ", typeof categories);

      })
      .catch(error => {
        console.log(`${error}`)
      })

  });

  router.get("/todos/:id", (req, res) => {
    res.send("THIS SHOULD BE THE ROUTE WHERE TODOS CAN BE EDITED");
  });

  router.post("/todos", (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    } else {
      res.send('You posted to /todos page!');
    }

    const findWord = function(callback) {
      // The following request uses the following format:
      //  URL / API KEY (7f2779...) / WORD THAT NEEDS TO BE LOOKED UP / format
      request('https://words.bighugelabs.com/api/2/7f277940d981040d57a0fe5e47da8f42/word/json', (error, response, body) => {
        // The response is always an array, syn for synonyms, ant for antonyms, rel for related terms, sim for similar terms

        // console.log(response);
        // console.log(body);

        if (error) {
          callback(error, null);
          return;
        }
        if (response.statusCode !== 200) {
          callback(Error(`Status code: ${response.statusCode} when fetching IP, Response: ${body}`), null);
          return;
        }
        // HERE IS WHERE WE DECIDE WHAT PART OF THE BODY WE WANT TO PARSE, FOR NOW WE PARSE THE ENTIRE BODY
        const queryResult = JSON.parse(body);
        callback(null, queryResult);
      });
    };

  });

  // Route to update a todo
  router.put("/todos/:id", (req, res) => {

  });

  // Route to delete a todo
  router.delete("/todos:id", (req, res) => {

  });

  return router;
};
