var peg = require('pegjs');
var fs = require('fs');
var SFAFx = require('../sfafx');
var sfaftxt = fs.readFileSync(process.argv[2],'utf8');
var records = SFAFx.toJSON(sfaftxt);
process.stdout.write(JSON.stringify(records,null,2));
