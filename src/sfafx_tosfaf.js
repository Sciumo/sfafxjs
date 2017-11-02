'use strict';

(function(SFAFx) {

  var toSortedKeys = function( obj ){
    var keys = [];
    for( var key in obj ){
      if( obj.hasOwnProperty(key) ){
        keys.push(key);
      }
    }
    return keys.sort();
  }

  /**
   * TODO this should be in the dictionary
   */
  var groups = [
     [113,118, "Transmitter"],
     [340,347, "Equipment"], //transmitter equipment
     [354,361, "Antenna"], //transmitter antenna data
     [400,408, "Receiver Location"],
     [440,443, "Receiver Equipment"]
  ];

  var groupAtKey = function( key ){
    if( key ){
      var idx = parseInt(key);
      for( var i  = 0; i < groups.length; i++ ){
        var group = groups[i];
        if( idx > group[1] ) continue;
        if( idx >= group[0] ){
          return group;
        }
        return null;
      }
    }
    return null;
  }

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
        entry = entry.trim();
        if( entry.length > 0 ){
          result += key  + ".     " + entry + "\n";
        }else{
          return 0;
        }
      }
      return 1;
    }
    return 0;
  }
  var onOccurEntry = function(occuritem,occurkey,key){
    if( occuritem != undefined && occuritem != null && occuritem.hasOwnProperty("entry") ){
      var entry;
      if( typeof entry == "string" ){
        occuritem["entry"].trim();
        if( entry.length > 0 ){
          result += key + "/" + occurkey + ".     " + occuritem["entry"] + "\n";
          return 1;
        }
      }
    }
    return 0;
  }
  var onOccur = function(item,occurkey,key){
    if( item && item.hasOwnProperty('occur') ){
      var occur = item['occur'];
      if( occur.hasOwnProperty(occurkey) ){
        return onOccurEntry( occur[occurkey], occurkey,key );
      }
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
    var group = groupAtKey(key);
    if( group ){
      return onGroup( keys, rec, idx, group );
    }
    var item = rec[ key ];
    if( item != null && item != undefined ){
      onItem(key,item);
    }
    return 1;
  }

  // a grouped set of items, with grouped occurs
  var onGroup = function( keys, rec, idx, range ){
    var sz = 0;
    var key;
    var lgroup = [];
    var grouplow = range[0];
    var grouphigh = range[1];
    var groupsize = grouphigh-grouplow;
    for( var groupidx = 0; groupidx <= groupsize; groupidx++ ){
      var fkey = keys[idx+groupidx];
      var fkeyval = parseInt(fkey);
      if( fkeyval <= grouphigh ){
        lgroup.push(fkey);
      }else{
        break;
      }
    }
    sz = lgroup.length;
    var gend = idx + sz;
    var n = 0;
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
      sfaf = [sfaf];
    }
    var i = 0, len = sfaf.length;
    result = "";
    for( ; i < len; i++ ){
      toSFAFRec( sfaf[i] );
    }
    return result;
  }

  var nextEntry = function( key ){
    var idx = parseInt(key);
    return pad0(++idx);
  }

  /**
   * sfafx : SFAFx.sfaf JSON object
   * key: key of next entry to add
   */
  var addEntryAt = function( sfafx, key ){
    if( sfafx.hasOwnProperty(key) ){
      if( Array.isArray(sfafx[key].entry) ){
        sfafx[key].entry.push('');
      }else{
        sfafx[key].entry = [sfafx[key].entry,''];
      }
    }else{
      sfafx[key] = { entry:''};
    }
    return sfafx[key];
  }

  /**
   * sfafx : SFAFx.sfaf JSON object
   * key: key of next entry to add
   */
  var addNextEntryAt = function( sfafx, key ){
    var next = nextEntry(key);

  }

  /**
   * sfafx : SFAFx JSON object
   * key: key of entry to add occurence to
   */
  var addOccurenceAt = function( sfafx, key ){

  }

  /**
   * sfafx : SFAFx JSON object
   * key: key of entry to add occurence group to
   */
  var addOccurenceGroupAt = function( sfafx, key ){

  }

  /**
   * sfafx : SFAFx.sfaf JSON object
   * key: key of entry to remove
   */
  var removeEntryAt = function( sfafx, key ){

  }

  /**
   * sfafx : SFAFx.sfaf JSON object
   * key: key of entry to remove
   */
  var removeOccurenceAt = function( sfafx, key ){

  }

  /**
   * sfafx : SFAFx.sfaf JSON object
   * key: key of entry to remove
   */
  var removeOccurenceGroupAt = function( sfafx, key ){

  }


  SFAFx.toSFAF = toSFAF;
  SFAFx.toSortedKeys = toSortedKeys;
  SFAFx.toSFAFRec = toSFAFRec;
  SFAFx.groupAtKey = groupAtKey;
  SFAFx.addNextEntryAt = addNextEntryAt;
  SFAFx.addOccurenceAt = addOccurenceAt;
  SFAFx.addOccurenceGroupAt = addOccurenceGroupAt;
  SFAFx.addEntryAt = addEntryAt;
  SFAFx.removeOccurenceAt = removeOccurenceAt;
  SFAFx.removeOccurenceGroupAt = removeOccurenceGroupAt;
  SFAFx.removeEntryAt = removeEntryAt;
  SFAFx.pad0 = pad0;
  SFAFx.nextEntry = nextEntry;

})(SFAFx);
