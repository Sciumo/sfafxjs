var peg = require('pegjs');
var fs = require('fs');
var SFAFx = require('../sfafx.js');
var fname = (process.argv.length < 3)?'af744251.sfaf':process.argv[2];
console.log( "reading " + fname );
var sfafxtxt = fs.readFileSync(fname,'utf8');
console.log(sfafxtxt);
var records = SFAFx.toJSON(sfafxtxt);
console.log( "Records read: " + records.length );
var sfafxout = SFAFx.toSFAF(records);
var lendiff = (sfafxout.length - sfafxtxt.length);
console.log( sfafxout.length + " " + sfafxtxt.length  + " lengths difference:" + lendiff );
var equal = true;
var i = 0, len = (lendiff != 0 ? sfafxout.length : sfafxtxt.length);
for( ; i < len; i++ ){
  var o = sfafxtxt[i];
  var s = sfafxout[i];
  if( o != s ){
    equal = false;
    console.log( "diff " + i + " " + o + " " + s );
    if( i > 20 ) i -= 20;
    console.log( "Original:" + sfafxout.substr(i,30).replace('\n', '\\n') + "...");
    console.log( "Generated:" + sfafxtxt.substr(i,30).replace('\n', '\\n') + "...");
    break;
  }
}
console.log( "Output are equal? " + equal );
if( lendiff > 0 ){
  console.log( "Extra generated:" + sfafxout.substr(sfafxtxt.length).replace('\n', '\\n') + "...");
}else if( lendiff < 0 ){
  console.log( "Unparsed original:" + sfafxtxt.substr(sfafxout.length).replace('\n', '\\n') + "...");
}
