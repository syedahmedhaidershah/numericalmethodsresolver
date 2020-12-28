const fs = require('fs');

const cont = fs.readFileSync(__dirname.concat('/params.json'));

console.log(cont);
