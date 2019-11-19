/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getCategories } = require('../helpers/get_categories');


module.exports = (db) => {
  // ROUTER GET MAIN PAGE WHERE USER CAN MAKE A NEW TODO
  router.get("/", (req, res) => {
    res.render("../views/index.ejs");

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



    // REMOVE THIS LATER, FOR TESTING API QUERY ONLY
    getCategories()
    .then(categories => {

      res.send(categories);
    });



    // res.send("TODOS PAGE");

    // res.send(categories.key);

    const text = `
    SELECT description, date_due, priority
    FROM todos
    ORDER BY date_created`;
    const values = [];

    db.query(text, values)
      .then(data => {
        const todos = data.rows;
        // console.log(todos);
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
      const todo = req.body;
    }



  });

  // Route to update a todo
  router.put("/todos/:id", (req, res) => {

  });

  // Route to delete a todo
  router.delete("/todos:id", (req, res) => {

  });

  return router;
};
