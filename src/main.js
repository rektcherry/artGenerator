const sha1 = require('sha1');
const {drawBackground} = require('../utils/backgroundGenerator.js');
const {createDna, isDnaUnique, filterDNA} = require('../utils/handleDNA.js');
const {constructLayerToDna, layersSetup} = require('../utils/layers.js');
const {format, background, uniqueDna, layerConfigurations} = require('./config.js');

const {
  saveImage,
  loadLayerImg, 
  writeMetaData, 
  addMetadata, 
  drawElement,
  ctx,
} = require('../utils/builder.js');

var dnaList = new Set();

const startCreating = async () => {
  let layerConfigIndex = 0;
  let editionCount = 1;
  let failedCount = 0;
  let idx = [];
  for (
    let i = 1;
    i <= layerConfigurations[layerConfigurations.length - 1].editionSize;
    i++
  ) {
    idx.push(i);
  }
  while (layerConfigIndex < layerConfigurations.length) {
    const layers = layersSetup(
      layerConfigurations[layerConfigIndex].layersOrder
    );
    while (
      editionCount <= layerConfigurations[layerConfigIndex].editionSize
    ) {
      let newDna = createDna(layers);
      if (isDnaUnique(dnaList, newDna)) {
        let results = constructLayerToDna(newDna, layers);
        let loadedElements = [];

        results.forEach((layer) => {
          loadedElements.push(loadLayerImg(layer));
        });

        await Promise.all(loadedElements).then((renderObjectArray) => {
          ctx.clearRect(0, 0, format.width, format.height);
          if (background.generate) {
            drawBackground();
          }
          renderObjectArray.forEach((renderObject, index) => {
            drawElement(
              renderObject,
              index,
              layerConfigurations[layerConfigIndex].layersOrder.length
            );
          });
          saveImage(idx[0]);
          addMetadata(newDna, idx[0]);
          writeMetaData(idx[0]);
          console.log(
            `Generated with love NFT ${idx[0]}, with DNA: ${sha1(
              newDna
            )}`
          );
        });
        dnaList.add(filterDNA(newDna));
        editionCount++;
        idx.shift();
      } else {
        console.log("NFT exists");
        failedCount++;
        if (failedCount >= uniqueDna) {
          console.log(
            `Add more layers`
          );
          process.exit();
        }
      }
    }
    layerConfigIndex++;
  }
};
module.exports = {startCreating};