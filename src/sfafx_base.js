
var SFAFx = (function(){
  var sfafx = {}
  sfafx.parser = sfafx_parser;
  sfafx.toSFAF = sfafx_toSFAF.toSFAF;
  sfafx.toJSON = function( sfafxtxt ){
    return sfafx_parser.parse(sfafxtxt);
  }
  return sfafx;
}());
