;


  /*
   * Binary search in JavaScript.
   * Returns the index of of the element in a sorted array or (-n-1) where n is the insertion point for the new element.
   * Parameters:
   *     ar - A sorted array
   *     el - An element to search for
   *     compare_fn - A comparator function. The function takes two arguments: (a, b) and returns:
   *        a negative number  if a is less than b;
   *        0 if a is equal to b;
   *        a positive number of a is greater than b.
   * The array may contain duplicate elements. If there are more than one equal elements in the array,
   * the returned value can be the index of any one of the equal elements.
   */
  function binarySearch(ar, el, compare_fn) {
      var m = 0;
      var n = ar.length - 1;
      while (m <= n) {
          var k = (n + m) >> 1;
          var cmp = compare_fn(el, ar[k]);
          if (cmp > 0) {
              m = k + 1;
          } else if(cmp < 0) {
              n = k - 1;
          } else {
              return k;
          }
      }
      return -m - 1;
  }

  function compare_number(a, b) {
    return a - b;
  }

  var entryMap = {};
  var entryKeys = [];
  var typeModel = {};
  var types = [];
  var required = [];

  MCEBPub7Entries.forEach( function(entry){
        entryMap[entry.DataNumberSFAFItem] = entry;
        entryKeys.push(entry.DataNumberSFAFItem);
        var type = entry.Type;
        if( types.length == 0 || types[types.length-1] != type ){
          types.push(type);
        }
        if( !typeModel.hasOwnProperty(type) ){
          typeModel[type] = { Group: {} };
        }
        if( entry.OccurrencesMaximum > 1 && entry.OccurrencesMaximum < 30 ){
          typeModel[type].Group[entry.DataNumberSFAFItem] = { Title:entry.Title };
        }
        typeModel[type][entry.DataNumberSFAFItem] = { Title:entry.Title };
        if( entry.Required ){
          required.push(entry.DataNumberSFAFItem);
        }
      });

  entryKeys = entryKeys.sort(compare_number);

  var getEntryKey = function(entry){
    var e = entry;
    if( typeof e === "string" ){
      e = parseInt(e.split("/")[0]);
    }
    if( !entryMap.hasOwnProperty(e) ){
      return null;
    }
    return e;
  }

  var getEntryKeyIndex = function(entry){
    var e = getEntryKey(entry);
    if( e ){
      return binarySearch(entryKeys,e,compare_number);
    }
    return -1;
  }

  var getNextEntryKey = function(entry){
    var e = getEntryKeyIndex(entry);
    if( e >= 0 ){
      e = e+1;
      if( e < entryKeys.length ){
        return entryKeys[e];
      }
    }
    return null;
  }

  var getEntry = function(entry){
    var e = getEntryKey(entry);
    if( e ){
      return entryMap[e];
    }
    return null;
  }

  var getMaxOccurrences = function(entry){
    var e = getEntry(entry);
    if( e ){
      var occurs = e.OccurrencesMaximum;
      if( typeof occurs === "number" ){
        occurs = parseInt(occurs);
        if( occurs < 1 ){
          return 1;
        }
        return occurs;
      }
    }
    return 1;
  }

  var SFAFDictionaryModule =   {
     'modulation':modulation,
     'antenna':antenna,
     'specialHandlingCodes':specialHandlingCodes,
     'getSHC' : getSHC,
     'entries': MCEBPub7Entries,
     'entryMap' : entryMap,
     'entryKeys' : entryKeys,
     'getEntry': getEntry,
     'getEntryKey' : getEntryKey,
     'getNextEntryKey' : getNextEntryKey,
     'getEntryKeyIndex' : getEntryKeyIndex,
     'getMaxOccurrences' : getMaxOccurrences,
     'types': types,
     'typeModel': typeModel,
     'required': required,
     'bsearch' : binarySearch
   };

   SFAFx.dictionary = SFAFDictionaryModule;
})(SFAFx);
