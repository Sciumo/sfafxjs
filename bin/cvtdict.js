var fs = require('fs');
//Converter Class
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var csvin = process.argv[2];
var jsonout = process.argv[3];
//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (jsonArray) {
   for( var idx = 0; idx < jsonArray.length; idx++ ){
     var obj = jsonArray[idx];
     if( obj ){
       Object.keys(obj).forEach( function(key){
         var val = obj[key];
         if( typeof val === "string" ){
           if( val.toUpperCase() === "TRUE" ){
             obj[key] = true;
           }else if( val.toUpperCase() === "FALSE"){
             obj[key] = false;
           }
         }
       });
     }
   }
   fs.writeFile(jsonout, JSON.stringify(jsonArray,null,2), 'utf-8', function(err){
     if(err){
       console.error("Error writing conversion",err);
     }
   });
});

fs.createReadStream(csvin).pipe(converter);
