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
  axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/meal?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e'),

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
  const mealQuery = result[5].data;

  const bookQuery = result[6].data;
  const readQuery = result[7].data;

  const productQuery = result[8].data;


  const customFilm = [ "film", "movie", ];
  const customResto = [ "meal", "restaurant", "drink", "eat" ];
  const customBook = [ "read", "book" ];
  const customProduct = [ "obtain", "buy" ];


  let film = destructureResults(filmQuery).concat(destructureResults(seeQuery), customFilm);
  // console.log(film);

  let restaurant = destructureResults(restaurantQuery).concat(destructureResults(drinkQuery), destructureResults(eatQuery), destructureResults(mealQuery), customResto);
  // console.log(restaurant);

  let book = destructureResults(bookQuery).concat(destructureResults(readQuery), customBook);
  // console.log(book);

  let product = destructureResults(productQuery).concat(customProduct);
  // console.log(product);

  const filmBannedWords = [ "note", "remark", "make out", "pick out", "pick up", "mark", "study", "survey" ];

  const restaurantBannedWords = [ "nurse", ];

  const bookBannedWords = [ "get", "make", "make out", "album", "devour", "gobble (up)", "see" ];

    film = film.filter(function( element ) {
      return filmBannedWords.indexOf( element ) < 0;
    } );

    restaurant = restaurant.filter(function( element ) {
      return restaurantBannedWords.indexOf( element ) < 0;
    } );

    book = book.filter(function( element ) {
      return bookBannedWords.indexOf( element ) < 0;
    } );


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

