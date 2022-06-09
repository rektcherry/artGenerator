const {startCreating} = require('./src/main.js');
const {buildFolder} = require('./utils/builder.js');

(() => {
  buildFolder();
  startCreating();
})

();
