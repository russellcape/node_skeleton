// REQUIRE AXIOS
const axios = require('axios');
const _ = require('lodash');
const { destructureResults } = require('./helper_functions');


const getCategories = () => {

return Promise.all([
  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/film?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),
  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/restaurant?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),
  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/book?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),
  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/product?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e')
])
.then(result => {

  const filmQuery = result[0].data;
  const restaurantQuery = result[1].data;
  const bookQuery = result[2].data;
  const productQuery = result[3].data;

  const film = destructureResults(filmQuery);
  const restaurant = destructureResults(restaurantQuery);
  const book = destructureResults(bookQuery);
  const product = destructureResults(productQuery);

  // BUILD OBJECT HERE
  // object key = category and the value is the array of related key words
  const categories = {
    films: film,
    restaurants: restaurant,
    books: book,
    products: product
  };

  // RETURN THE OBJECT
  // console.log(categories);
  return categories;
});


};

module.exports = { getCategories };
// REQUIRE IN MY ROUTES

// WHEN CALLED IN ROUTES USE FOLLOWING FORMAT:

/*
getCategories()
  .then(categories => {

  });
*/
