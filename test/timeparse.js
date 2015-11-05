var peg = require('pegjs');
var fs = require('fs');
var sfafxgrammar = fs.readFileSync('../grammar/sfafx_grammar.peg','utf8');
var sfafxparse = peg.buildParser(sfafxgrammar);
SFAFx_Dictionary = require('../src/sfafx_dict');
SFAFx_toSFAF = require('../src/sfafx_tosfaf');
console.log( "reading..." + process.argv[2] );
var sfaftxt = fs.readFileSync(process.argv[2],'utf8');
console.log( "read " + sfaftxt.length + " bytes ");
var est = 2750000.0;
console.log( "Estimated time: " + (sfaftxt.length / est) + " seconds at an estimated rate of " + est + " bytes/sec" );
var before = Date.now();
count = 0;
SFAFx_Parse_Time = function(){
  count++;
  if( count % 100 == 0 ){
    var counttime = (Date.now()-before)/1000;
    console.log( "Parsed: " + count + " at rate of " + (count/counttime) + " per sec");
  }
}
try{
   var records = sfafxparse.parse(sfaftxt);
}catch( e ){
  console.log( "parse exception");
  console.log( e );
  return;
}
var after = Date.now();
var time = (after-before)/1000;
console.log( "         Time (sec):" + time  );
console.log( "Text Length (bytes):" + sfaftxt.length );
console.log( "            Records:" + records.length );
console.log( "  Records (per sec):" + records.length / time  );
console.log( "    Bytes (per sec):" + sfaftxt.length / time  );
