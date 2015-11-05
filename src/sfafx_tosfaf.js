'use strict';

(function(window) {
  var toSortedKeys = function( obj ){
    var keys = [];
    for( var key in obj ){
      if( obj.hasOwnProperty(key) ){
        keys.push(key);
      }
    }
    return keys.sort();
  }
  var toSFAFRec = function( sfafrec ){
    if( sfafrec == null || sfafrec == undefined || !sfafrec.hasOwnProperty('sfaf') ){
      return "";
    }
    var rec = sfafrec.sfaf;
    var keys = toSortedKeys(rec);
    var result = "";
    var idx = 0, len = keys.length;
    for( ; idx < len; idx++ ){
      var key = keys[idx];
      var item = rec[ key ];
      if( item != null && item != undefined ){
        if( item.hasOwnProperty('entry') ){
          var entry = item["entry"];
          if( Array.isArray(entry) ){
            for( var eidx = 0; eidx < entry.length; eidx++ ){
              result += key  + ".     " + entry[eidx] + "\n";
            }
          }else{
            result += key  + ".     " + entry + "\n";
          }
        }
        if( item.hasOwnProperty('occur') ){
          var occur = item['occur'];
          for( var occurkey in occur ){
            var occuritem = occur[occurkey];
            if( occuritem != undefined && occuritem != null && occuritem.hasOwnProperty("entry") ){
              result += key + "/" + occurkey + ".     " + occuritem["entry"] + "\n";
            }
          }
        }
      }
    }
    return result;
  }
  var toSFAF = function(sfaf){
    if( sfaf == null || sfaf == undefined ){
      return null;
    }
    if( !Array.isArray(sfaf) ){
      if( !sfaf.hasOwnProperty('sfaf') ) return null;
      sfaf = sfaf.sfaf;
      if( !Array.isArray(sfaf) ) return null;
    }
    var i = 0, len = sfaf.length;
    var result = "";
    for( ; i < len; i++ ){
      result += toSFAFRec( sfaf[i]);
    }
    return result;
  }
  var toSFAFmodule =   { 'toSFAF':toSFAF, 'toSFAFRec':toSFAFRec };
  if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
    module.exports = toSFAFmodule;
  } else {
    window.sfafx_toSFAF = toSFAFmodule;
  }
})(this);
