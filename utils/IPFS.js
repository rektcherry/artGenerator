const fs = require("fs");
const {url, layerConfigurations} = require('../src/config.js');
let editionCount = 1;

while (editionCount <= layerConfigurations[layerConfigurations.length-1].editionSize)
{
  let readData = fs.readFileSync(`./build/Metadata/NFT${editionCount}_metadata.json`);
  let data = JSON.parse(readData);
  data.Image = `${url}/${data.Edition}.png`;
   fs.writeFileSync(
     `./build/Metadata/NFT${data.Edition}_metadata.json`,
      JSON.stringify(data, null, 2));
      editionCount++;
};
