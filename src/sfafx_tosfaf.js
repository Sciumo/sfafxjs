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
  var groups = { '113' : ['113','114','115'] };
  var result = "";
  var pad0 = function( i ){
    if( i < 10 ){
      return "0" + i;
    }
    return i;
  }
  var onEntry = function(key,item){
    if( item != undefined && item && item.hasOwnProperty('entry') ){
      var entry = item["entry"];
      if( Array.isArray(entry) ){
        for( var eidx = 0; eidx < entry.length; eidx++ ){
          result += key  + ".     " + entry[eidx] + "\n";
        }
      }else{
        result += key  + ".     " + entry + "\n";
      }
      return 1;
    }
    return 0;
  }
  var onOccurEntry = function(occuritem,occurkey,key){
    if( occuritem != undefined && occuritem != null && occuritem.hasOwnProperty("entry") ){
      result += key + "/" + occurkey + ".     " + occuritem["entry"] + "\n";
      return 1;
    }
    return 0;
  }
  var onOccur = function(item,occurkey,key){
    if( item && item.hasOwnProperty('occur') ){
      var occur = item['occur'];
      return onOccurEntry( occur[occurkey], occurkey,key );
    }
    return 0;
  }
  // a non-grouped item, occurs follow
  var onItem = function(key,item){
    onEntry(key,item);
    if( item.hasOwnProperty('occur') ){
      var occur = item['occur'];
      for( var occurkey in occur ){
        onOccur(item,occurkey,key);
      }
    }
  }
  var onKey = function( keys, rec, idx ){
    var key = keys[idx];
    if( groups.hasOwnProperty(key) ){
      return onGroup( keys, rec, idx, groups[key] );
    }
    var item = rec[ key ];
    if( item != null && item != undefined ){
      onItem(key,item);
    }
    return 1;
  }

  // a grouped set of items, with grouped occurs
  var onGroup = function( keys, rec, idx, group ){
    var sz = 0;
    var lgroup = [];
    for( var groupidx = 0; groupidx < group.length; groupidx++ ){
      var groupkey = group[groupidx];
      var fkey = keys[idx+groupidx];
      if( fkey === groupkey ){
        lgroup.push(fkey);
      }else{
        break;
      }
    }
    sz = lgroup.length;
    var gend = idx + sz;
    var n = 0;
    var key;
    for( var gidx in lgroup ){
      key = lgroup[gidx];
      n += onEntry( key, rec[key] );
    }
    if( n == 0 ) return sz;
    var occurkey = "";
    for( var oidx = 2; oidx < 99; oidx++ ){
      n = 0;
      occurkey = pad0(oidx);
      for( var gidx in lgroup ){
        key = lgroup[gidx];
        n += onOccur(rec[key],occurkey,key);
      }
      if( n == 0 ) return sz;
    }
    return sz;
  }

  var toSFAFRec = function( sfafrec ){
    if( sfafrec == null || sfafrec == undefined || !sfafrec.hasOwnProperty('sfaf') ){
      return;
    }
    var rec = sfafrec.sfaf;
    var keys = toSortedKeys(rec);
    var idx = 0, len = keys.length;
    for( ; idx < len; ){
      idx += onKey(keys,rec,idx);
    }
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
    result = "";
    for( ; i < len; i++ ){
      toSFAFRec( sfaf[i] );
    }
    return result;
  }
  var toSFAFmodule =   { 'toSFAF':toSFAF, 'toSFAFRec':toSFAFRec };
  if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
    module.exports = toSFAFmodule;
  } else {
    window.SFAFx_toSFAF = toSFAFmodule;
  }
})(this);
