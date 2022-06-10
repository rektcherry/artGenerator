const collectionName = 'Astral Experience';
const url = "ipfs://CID"; 
const description = 'Alien World';
const generation = 'Alien';
const creator = 'rektcherry';

const format = {
  width: 512,
  height: 512,
};

const background = {
  generate: false,
  brightness: "50%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";
const dnaDelimiter = "-";
const uniqueDna = 10000;
const generateName = true;

const layerConfigurations = [
  {
    editionSize: 5,
    layersOrder: [
      { name: "Background" },
      { name: "NeonLight" },
      { name: "SpaceObject" },
      { name: "Planet" },
      { name: "Effect" },
    ],
  },
];

const buildDir = './build';
const layersDir = './layers';

module.exports = {
  format,
  url,
  description,
  background,
  uniqueDna,
  layerConfigurations,
  rarityDelimiter,
  collectionName,
  dnaDelimiter,
  generateName,
  buildDir,
  layersDir,
  generation,
  creator,
};
