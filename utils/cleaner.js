const {rarityDelimiter} = require('../src/config.js');

const cleanName = (_str) => {
    let nameWithoutExtension = _str.slice(0, -4);
    var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
    return nameWithoutWeight;
  };

const getRarityWeight = (_str) => {
    let nameWithoutExtension = _str.slice(0, -4);
    var nameWithoutWeight = Number(
      nameWithoutExtension.split(rarityDelimiter).pop()
    );
    if (isNaN(nameWithoutWeight)) {
      nameWithoutWeight = 1;
    }
    return nameWithoutWeight;
  };

const cleanDna = (_str) => {
    const query = /(\?.*$)/;
    const cleanString = _str.replace(query, ""); 
    var dna = Number(cleanString.split(":").shift());
    return dna;
  };

  module.exports = {getRarityWeight, cleanDna, cleanName};  