const request = require('request');
const _ = require('lodash');


const findWord = function(word) {
  // The following request uses the following format:
  //  URL /v3/references/thesaurus/json/THEWORDWEWANTTOSEARCH?key=THEAPIKEY
  request(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=c78727c5-cbaa-4b4b-94ec-a7d80d36b57e`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code: ${response.statusCode} when fetching IP, Response: ${body}`), null);
      return;
    }
    // parse the body to be able to access the info we want from the query
    const queryResult = JSON.parse(body);
    // destructure and return an array of words that are synonyms / related to the searched word
    destructureResults(queryResult);
  });
};

const destructureResults = (array) => {
  // destructure the queryResult into sseq array which is where synonyms and related words are stored
  const [{def:[{sseq:[[sense]]}]}] = array;
  // destructure to get the synonyms (syn_list) and the related words (rel_list)
  const [,{syn_list, rel_list}] = sense;
  // use lodash to flatten both lists to get them back as a simplified array
  const synonyms = syn_list[0].map(word => word.wd)
  const relative_words = _.flatten(rel_list).map(word => word.wd)
  // merge the arrays into one array which can be used to verify which word fits in a category
  const words = [...synonyms, ...relative_words]
  return words;
};

module.exports = { findWord, destructureResults };
