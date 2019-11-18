// REQUIRE AXIOS
const axios = require('axios');

const getCategories = () => {

return Promise.all([
  axios.get('/first'),
  axios.get('/second'),
  axios.get('/thid'),
  axios.get('/forth')
])
.then(result => {
  // BUILD OBJECT HERE

  // RETURN THE OBJECT
})


};

module.exports = { getCategories };
// REQUIRE IN MY ROUTES

// WHEN CALLED IN ROUTES USE FOLLOWING FORMAT:

/*
getCategories()
  .then(categories => {

  });
*/
