var fs = require('fs');
SFAFx = require('../sfafx');
var sfaftxt = fs.readFileSync(process.argv[2],'utf8');
var records = JSON.parse(sfaftxt);
process.stdout.write(SFAFx.toSFAF(records));
