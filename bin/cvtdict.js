var fs = require('fs');
//Converter Class
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var csvin = process.argv[2];
var jsonout = process.argv[3];
//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (jsonArray) {
   fs.writeFile(jsonout, JSON.stringify(jsonArray,null,2), 'utf-8');
});

fs.createReadStream(csvin).pipe(converter);
