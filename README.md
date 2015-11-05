# SFAFx JS
SFAFx JavaScript [PEG.JS](https://github.com/pegjs/pegjs) parser and support libraries for an extension to the [MCEB Pub 7 SFAF](https://acc.dau.mil/CommunityBrowser.aspx?id=283278) specification.

*SFAFxJS* is a browser [Bower](http://bower.io) JavaScript module with no dependencies that parses *SFAF* or *SFAFx* ([extended SFAF](http://www.sfafx.us)) into a JSON data mode, while decoding most of the cryptic bits into human readable JSON.  Using this library is simple, just `bower install sfafxjs`, then include it and call `SFAFx.toJSON()` to convert to JSON and `SFAFx.toSFAF()` to convert back to SFAF.  

#Install via Bower
If you don't want to build this library or use *Bower* et al, you can simply download either the `sfafx.js` or the minified `sfafx.min.js` library. 

To use via Bower, first ensure [Bower](http://bower.io) is installed, then execute:
```shell
$bower install sfafxjs
```
and include `sfafx.js` in you HTML
```html
<script src="bower_components/sfafjs/sfafx.js"></script>
```

#Usage
`sfafxjs` library is intended to provide invertible conversion, meaning the results between SFAF text and JSON without any editing should be identical.  Meaning:
```JavaScript
var text = getSFAFText();
text.localeCompare( SFAFx.toSFAF( SFAFx.toJSON( text ) ) ) == 0 // should be equal
```

The JSON version of the SFAF records are much friendlier to modern HTML libraries.
```JavaScript
// returns an array of SFAF records
var records = SFAFx.toJSON(document.getElementById('sfaftext').innerText);
// manipulate records, and create edited SFAF
var sfaftxt = SFAFx.toSFAF(records);
```

#Tools
There are a few development tools available for testing and command line usage as we.
*  `bin/sfaf2json.js` converts a file to JSON and logs to the console.
*  `bin/json2sfaf.js` converts a file to SFAF and logs to the console.

Because the conversion is invertible, you can do this:
```shell
$node sfaf2json.js ../test/af744251.sfaf > temp.json
$node json2sfaf.js temp.json > temp.sfaf
$diff temp.sfaf ../test/af744251.sfaf
```
#Testing
In the `/test` directory you will find a few test scripts and a *QUnit* HTML unit test.

