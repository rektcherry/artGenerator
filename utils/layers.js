const fs = require("fs"); 
const {getRarityWeight, cleanName, cleanDna} = require('../utils/cleaner.js');
const {layersDir, dnaDelimiter} = require('../src/config.js');

const getElements = (path) => {
    return fs
      .readdirSync(path)
      .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
      .map((i, index) => {
        if (i.includes("-")) {
          throw new Error(`Layer names cannot contain dashes: ${i}`);
        }
        return {
          id: index,
          name: cleanName(i),
          filename: i,
          path: `${path}${i}`,
          weight: getRarityWeight(i),
        };
      });
  };
  
  const layersSetup = (layersOrder) => {
    const layers = layersOrder.map((layerObj, index) => ({
      id: index,
      elements: getElements(`${layersDir}/${layerObj.name}/`),
      name:
        layerObj.options?.["displayName"] != undefined
          ? layerObj.options?.["displayName"]
          : layerObj.name,
      bypassDNA:
        layerObj.options?.["bypassDNA"] !== undefined
          ? layerObj.options?.["bypassDNA"]
          : false,
    }));
    return layers;
  };
  
  const constructLayerToDna = (_dna = "", _layers = []) => {
    let mappedDnaToLayers = _layers.map((layer, index) => {
      let selectedElement = layer.elements.find(
        (e) => e.id == cleanDna(_dna.split(dnaDelimiter)[index])
      );
      return {
        name: layer.name,
        selectedElement: selectedElement,
      };
    });
    return mappedDnaToLayers;
  };

  module.exports = {constructLayerToDna, layersSetup};