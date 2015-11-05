var fs = require('fs');
SFAFx_toSFAF = require('../src/sfafx_tosfaf');
SFAFx_Dictionary = require('../src/sfafx_dict');
var sfaftxt = fs.readFileSync(process.argv[2],'utf8');
var records = JSON.parse(sfaftxt);
console.log(SFAFx_toSFAF.toSFAF(records));
