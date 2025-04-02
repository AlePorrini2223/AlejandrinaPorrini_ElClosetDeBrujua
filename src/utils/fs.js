const fs = require('fs');
const path = require('path');

const readJson = (pathFile = "") => {
   return JSON.parse(fs.readFileSync(path.join(__dirname, pathFile),'utf-8'));
}

const saveJson = (pathFile = "", array = []) => {
   fs.writeFileSync(path.join(__dirname, pathFile), JSON.stringify(array, null, 2), 'utf-8');
   return null;
}

module.exports = {
   readJson,
   saveJson
}