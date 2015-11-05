
var SFAFx = (function(){
  var sfafx = {}
  sfafx.parser = sfafx_parser;
  sfafx.toSFAF = SFAFx_toSFAF.toSFAF;
  sfafx.toSFAFRec = SFAFx_toSFAF.toSFAFRec;
  sfafx.dictionary = SFAFx_Dictionary;
  sfafx.toJSON = function( sfafxtxt ){
    return sfafx_parser.parse(sfafxtxt);
  }
  return sfafx;
}());
