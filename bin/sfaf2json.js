var peg = require('pegjs');
var fs = require('fs');
var SFAFx = require('../sfafx');
var sfaftxt = fs.readFileSync(process.argv[2],'utf8');
var records = SFAFx.toJSON(sfaftxt);
// iterator and stringify to prevent memory issues.
if( records && records.length > 0 ){
    let len = records.length;
    let stdout = process.stdout;
    stdout.write("[\n");
    for( var i = 0; i < len-1; i++ ){
        stdout.write(JSON.stringify(records[i],null,2));
        stdout.write("  ,\n");        
    }
    stdout.write(JSON.stringify(records[len-1],null,2));
    stdout.write("]\n");    
}
