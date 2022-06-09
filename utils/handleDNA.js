const {dnaDelimiter} = require('../src/config.js');

const createDna = (_layers) => {
    let rng = [];
    _layers.forEach((layer) => {
      var totalWeight = 0;
      layer.elements.forEach((element) => {
        totalWeight += element.weight;
      });
      let random = Math.floor(Math.random() * totalWeight);
      for (var i = 0; i < layer.elements.length; i++) {
        random -= layer.elements[i].weight;
        if (random < 0) {
          return rng.push(
            `${layer.elements[i].id}:${layer.elements[i].filename}${
              layer.bypassDNA ? "?bypassDNA=true" : ""
            }`
          );
        }
      }
    });
    return rng.join(dnaDelimiter);
  };

const isDnaUnique = (_DnaList = new Set(), _dna = "") => {
    const _filteredDNA = filterDNA(_dna);
    return !_DnaList.has(_filteredDNA);
}; 

const filterDNA = (_dna) => {
    const dnaItems = _dna.split(dnaDelimiter);
    const filteredDNA = dnaItems.filter((element) => {
      const query = /(\?.*$)/;
      const querystring = query.exec(element);
      if (!querystring) {
        return true;
      }
    const options = querystring[1].split("&").reduce((r, setting) => {
        const keyPairs = setting.split("=");
        return { ...r, [keyPairs[0]]: keyPairs[1] };
      }, []);
  
    return options.bypassDNA;
    });
    return filteredDNA.join(dnaDelimiter);
};

module.exports = {createDna, isDnaUnique, filterDNA};