const fs = require("fs");
const {url, layerConfigurations} = require('../src/config.js');
let editionCount = 1;

while (editionCount <= layerConfigurations[layerConfigurations.length-1].editionSize)
{
  let readData = fs.readFileSync(`./build/Metadata/${editionCount}.json`);
  let data = JSON.parse(readData);
  data.image = `${url}/${data.edition}.png`;
   fs.writeFileSync(
     `./build/Metadata/${data.edition}.json`,
      JSON.stringify(data, null, 2));
      editionCount++;
};
