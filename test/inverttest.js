var peg = require('pegjs');
var fs = require('fs');
var sfafx_tosfaf = require('../src/sfafx_tosfaf');
var sfafxgrammar = fs.readFileSync('../grammar/sfafx_grammar.peg','utf8');
console.log(sfafxgrammar);
var sfafxparse = peg.buildParser(sfafxgrammar);
var sfaftxt = fs.readFileSync('af744251.sfaf','utf8');
console.log(sfaftxt);
var records = sfafxparse.parse(sfaftxt);
console.log('=====');
console.log(JSON.stringify(records,null,2));
console.log('=====');
var sfafxout = sfafx_tosfaf.toSFAF(records);
console.log(sfafxout);
console.log( sfafxout.length + " " + sfaftxt.length  + " lengths equal:" + (sfafxout.length == sfaftxt.length));
var equal = true;
var i = 0, len = sfafxout.length;
for( ; i < len; i++ ){
  var o = sfafxout[i];
  var s = sfaftxt[i];
  if( o != s ){
    equal = false;
    console.log( "diff " + i + " " + o + " " + s );
  }
}
console.log( "Output are equal? " + equal );
