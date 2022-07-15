const fs = require("fs"); 
const sha1 = require('sha1');
const {createName} = require('./nameGenerator/generateName.js');
const { createCanvas, loadImage} = require('canvas');

const {
  format,
  url,
  description,
  collectionName,
  generateName,
  buildDir,
  generation,
  creator,
} = require('../src/config.js');

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
var metadataList = [];
var attributesList = [];

const buildFolder = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/Metadata`);
  fs.mkdirSync(`${buildDir}/NFT`);
};

const addMetadata = (_dna, _edition) => {
  let date = Date.now();
  if (generateName){
    nftName = createName();
  };   
  let tempMetadata = {
    collection: collectionName,
    name: nftName,
    description:  `${description} ${_edition}`,
    image: `${url}/${_edition}.png`,
    dna: sha1(_dna),
    generation: generation, 
    date: date,
    compiler: "Magical Art Generator 1.0.0",
    edition: _edition,
    artist: creator,
    attributes: attributesList,
  };

  metadataList.push(tempMetadata);
  attributesList = []; 
};

const addAttributes = (_element) => {
  let selectedElement = _element.layer.selectedElement;
  attributesList.push({
    trait_type: _element.layer.name,
    value: selectedElement.name,
  });
};

const drawElement = (_renderObject, _index, _layersLen) => {
  ctx.drawImage(
        _renderObject.loadedImage,
        0,
        0,
        format.width,
        format.height
      );

  addAttributes(_renderObject);
};

const saveImage = (_editionCount) => {
    fs.writeFileSync(
      `${buildDir}/NFT/${_editionCount}.png`,
      canvas.toBuffer("image/png")
    );
  }; 

const writeMetaData = (_editionCount) => {
  let metadata = metadataList.find((meta) => meta.edition == _editionCount);
  fs.writeFileSync(
    `${buildDir}/Metadata/${_editionCount}.json`,
    JSON.stringify(metadata, null, 2)
  );
};  

const loadLayerImg = async (_layer) => {
  try {
    return new Promise(async (resolve) => {
      const image = await loadImage(`${_layer.selectedElement.path}`);
      resolve({ layer: _layer, loadedImage: image });
    });
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

module.exports =
{
  buildFolder,
  saveImage,  
  loadLayerImg, 
  writeMetaData,
  addMetadata,
  addAttributes,
  drawElement,
  ctx,
};
