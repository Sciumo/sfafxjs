var peg = require('pegjs');
var fs = require('fs');
SFAFx_Dictionary = require('../src/sfafx_dict');
var sfafxgrammar = fs.readFileSync('../grammar/sfafx_grammar.peg','utf8');
var sfafxparse = peg.buildParser(sfafxgrammar);
var sfaftxt = fs.readFileSync(process.argv[2],'utf8');
var records = sfafxparse.parse(sfaftxt);
console.log(JSON.stringify(records,null,2));
