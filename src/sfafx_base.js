
var SFAFx = (function(){
  var sfafx = {}
  sfafx.toJSON = function( sfafxtxt ){
    return sfafx.sfafx_parser.parse(sfafxtxt);
  }
  return sfafx;
}());
