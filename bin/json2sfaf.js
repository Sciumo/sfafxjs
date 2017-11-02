var fs = require('fs');
SFAFx = require('../sfafx');
var argv = require('optimist').argv;
if( argv._.length == 0 ){
  console.error("No file provided");
  process.exit(1);
}
var group = argv.group == true;
SFAFx.setGrouping(group);
var sfaftxt = fs.readFileSync(process.argv[2],'utf8');
var records = JSON.parse(sfaftxt);
process.stdout.write(SFAFx.toSFAF(records));
