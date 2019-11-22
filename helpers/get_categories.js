// REQUIRE AXIOS
const axios = require('axios');
const _ = require('lodash');
const { destructureResults } = require('./helper_functions');


const getCategories = () => {

return Promise.all([
  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/film?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),
  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/see?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),

  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/restaurant?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),
  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/drink?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),
  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/eat?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),

  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/book?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),
  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/read?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),

  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/obtain?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e')

])
.then(result => {
  // *** THE INDEX HAS TO BE CHANGED SEQUENTIALLY IF ALL QUERIES ARE BEING DONE!!! ***
  const filmQuery = result[0].data;
  const seeQuery = result[1].data;

  const restaurantQuery = result[2].data;
  const drinkQuery = result[3].data;
  const eatQuery = result[4].data;

  const bookQuery = result[5].data;
  const readQuery = result[6].data;

  const productQuery = result[7].data;

  const customBook = [ "read", "book" ];


  const film = destructureResults(filmQuery).concat(destructureResults(seeQuery));
  // console.log(film);

  const restaurant = destructureResults(restaurantQuery).concat(destructureResults(drinkQuery), destructureResults(eatQuery));
  // console.log(restaurant);

  const book = destructureResults(bookQuery).concat(destructureResults(readQuery), customBook);
  // console.log(book);

  const product = destructureResults(productQuery);
  // console.log(product);


  // BUILD OBJECT HERE
  // object key = category and the value is the array of related key words
  const categories = {
    films: film,
    restaurants: restaurant,
    books: book,
    products: product
  };

  // RETURN THE OBJECT
  return categories;
});


};

module.exports = { getCategories };

