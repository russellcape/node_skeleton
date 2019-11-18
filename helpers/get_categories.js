// REQUIRE AXIOS
const axios = require('axios');

const getCategories = () => {

return Promise.all([
  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),
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
