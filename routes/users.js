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
    res.render("index");

  });

  // ROUTER GET TODOS ARRANGED BY DATE CREATED ( DEFAULT )
  router.get("/todos", (req, res) => {

    // CHANGE QUERY TO GET CATEGORY NAME
    const text = `
    SELECT todos.id, description, date_due, priority, category_id, categories.name as category
    FROM todos
    JOIN categories ON category_id = categories.id
    ORDER BY date_created;
    `;

    db.query(text)
      .then(data => {
        const todos = data.rows;
        // console.log(todos);
        res.json(todos);

      })
      .catch(error => {
        console.log(`${error}`);
      });
  });

  // ROUTER GET TODOS ARRANGED BY PRIORITY
  router.get("/todos/priority", (req, res) => {

    const text = `
    SELECT description, date_due, priority, category_id
    FROM todos
    ORDER BY priority DESC
    ;`;

    db.query(text)
    .then(data => {
      const todos = data.rows;
      // console.log(todos);
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
      const todos = data.rows[0];
      console.log("the category is currently: ", todos);

      res.json(todos);
    })
    .catch(error => {
      console.log(`${error}`)
    });

  });

  // Route to add new todo
  router.post("/todos", (req, res) => {
    if (!req.body) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

  // - extract content from the body of the request (req.body)
  const { description, date_created, date_due, priority } = req.body;

  getCategories()
  .then(categories => {
    // Split String takes an array and separator (in this case it's space)
    const descriptionArray = splitString(description, ' ');
    // - find out the category of the todo from extracted data
    const categoryResult = categoriesCheck(categories, descriptionArray);

    // QUERY THAT CHECKS WHAT THE CATEGORY ID IS WHEN GIVEN THE CATEGORY NAME
    const text = `
    SELECT categories.id
    FROM categories
    WHERE categories.name LIKE $1
    `;
    const values = [categoryResult];

    db.query(text, values)
    .then(data => {
      // - insert the todo in the database with the category
      const text = `
      INSERT INTO todos (user_id, category_id, description, date_created, date_due, priority, completed)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `;
      const values = [1, data.rows[0].id, description, date_created, date_due, priority, false];
      // const todos = data.rows[0];

      db.query(text, values)
      .then(data => {
        // send back response to the client (response is the new todo, with category)
        console.log("THE NEXT STEP IS TO CHECK WHAT COMES BACK: ", data.rows[0]);
        return (data.rows[0]);
      })
      .then(newTodo => {

        const query = {
          text: 'SELECT name FROM categories WHERE id = $1',
          values: [newTodo.category_id]
        }

        db.query(query)
        .then(result=>{
          newTodo.category = result.rows[0].name;
          res.json(newTodo);
        })


      })
    })
    .catch(error => {
      console.log(`${error}`);
      });
    });

  });

  // This route posts the db and creates the user info
  router.post('/register', (req, res) => {
    // deconstructure email and password from the form submitted by login
    const { name, email, password } = req.body;
    const text = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id
    ;`;
    const values = [ name, email, password ];

    db.query(text, values)
      .then(data => {
        const userId = data.rows[0].id;
        req.session.user_id = userId;
        res.send( {email} );
      })
      .catch(error => {
        console.log(`${error}`);
    });
  });

  //This route posts to the db and checks if the user info exists
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const text = `
    SELECT * FROM users
    WHERE email = $1 AND password = $2
    ;`;
    const values = [ email, password ];

    db.query(text, values)
      .then(data => {
        if (data.rows[0].length === 0) {
          res.send( { message: "You're not logged in!" });
        } else {
          req.session.user_id = data.rows[0].id;
          res.send( { message: "Succesfully set session" } )
        }
      })
      .catch(error => {
        console.log(`${error}`);
      });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.send( { message: "Cleared session because user logged out" } );
  });

  // Route to update a todo
  router.put("/todos/:id", (req, res) => {
    const { todo_description, todo_category_id } = req.body;
    const todo_id = req.params.id;

    const text = `
    UPDATE todos
    SET description = $1, category_id = $2
    WHERE todos.id = $3
    RETURNING *
    ;`;
    const values = [todo_description, todo_category_id, todo_id];

    db.query(text, values)
    .then(data => {
      res.json(data.rows[0]);
    })
    .catch(error => {
      console.log(`${error}`);
    });
  });

  // Route to delete a todo
  router.delete("/todos/:id", (req, res) => {

    const text = `
    DELETE FROM todos
    WHERE todos.id = $1
    `;
    const values = [req.params.id];

    db.query(text, values)
    .then(data => {
      res.send( { message: "todo deleted"});
    })
    .catch(error => {
      console.log(`${error}`);
    })
  });

  return router;
};
