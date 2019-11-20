function splitString(stringToSplit, separator) {
  const arrayOfStrings = stringToSplit.split(separator);
  return arrayOfStrings;
}

const getCategory= function(categories, word) {
  for (let category in categories) {
    if (categories[category].includes(word)) {
      return category;
    }
  }
  return false;
};

const categoriesCheck = function(categories, words) {
  // loop over the array of words
  for (let word of words) {
    const category = getCategory(categories, word);
    if (category) {
      return category;
    }
  }
  return false;
};


module.exports = { splitString, getCategory, categoriesCheck };
