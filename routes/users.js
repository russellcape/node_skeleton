/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getCategories } = require('../helpers/get_categories');
const { splitString, categoriesCheck } = require('../helpers/check_categories');


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

    // FOR TESTING API QUERY ONLY
    getCategories()
    .then(categories => {

      res.send(categories);
    });

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

    const text = `
    SELECT description, date_due, priority
    FROM todos
    ORDER BY priority DESC
    ;`;

    db.query(text)
    .then(data => {
      const todos = data.rows;
      console.log(todos);
      res.json(todos);
    });
  });

  // ROUTER GET TODOS ARRANGED BY DUE DATE
  router.get("/categories/:id/todos", (req, res) => {

    // I WANT THE TODOS UNDER A CERTAIN CATEGORY
    // I can identify a todo of category X by it's category_id
    // I can get the id of a category by asking the categories table what is it's id
    const text = `
    SELECT description, date_due, priority
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    WHERE categories.id = $1
    ;`;
    const values = [req.params.id];


    db.query(text, values)
    .then(data => {
      const todos = data.rows;
      console.log("the category is currently: ", todos);
      // console.log("type of categories is: ", typeof todos);
      res.json(todos);
    })
    .catch(error => {
      console.log(`${error}`)
    });

  });

  router.get("/todos/:id", (req, res) => {
    res.send("THIS SHOULD BE THE ROUTE WHERE TODOS CAN BE EDITED");
  });

  // Route to add new todo
  router.post("/todos", (req, res) => {
    if (!req.body) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

  //   SECOND PART (BACK END) :
  // - if having issues with req.body add configs for json
  // - extract content from the body of the request (req.body)
  const { description, date, priority } = req.body;


  getCategories()
  .then(categories => {
    // Split String takes an array and separator (in this case it's space)
    const descriptionArray = splitString(description, ' ');
    // - find out the category of the todo from extracted data
    const categoryResult = categoriesCheck(categories, descriptionArray);


    // - insert the todo in the database with the category
    const text = `
    INSERT INTO $1 (user_id, category_id, description, date_created, date_due, priority, completed)
    VALUES (1, ?, $2, ??, $3, $4, FALSE);`;
    const values = [categoryResult, description, date, priority];


    db.query(text, values)
    .then(data => {
      const todos = data.rows;
      console.log(todos);
      // - send back response to the client (response is the new todo, with category)

    })
    .catch(error => {
      console.log(`${error}`)
      });
    });

  });

  // Route to update a todo
  router.put("/todos/:id", (req, res) => {

  });

  // Route to delete a todo
  router.delete("/todos:id", (req, res) => {

  });

  return router;
};
