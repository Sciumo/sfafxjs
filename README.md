# SFAFx JS
SFAFx JavaScript [PEG.JS](https://github.com/pegjs/pegjs) parser and support libraries for an extension to the [MCEB Pub 7 SFAF](https://acc.dau.mil/CommunityBrowser.aspx?id=283278) specification.

*SFAFxJS* is a browser [Bower](http://bower.io) JavaScript module with no dependencies that parses *SFAF* or *SFAFx* ([extended SFAF](http://www.sfafx.us)) into a JSON data model, while decoding most of the cryptic bits into human readable JSON.  Using this library is simple, just `bower install sfafxjs`, then include it and call `SFAFx.toJSON()` to convert to JSON and `SFAFx.toSFAF()` to convert back to SFAF.

You can use SFAFx to build browser client logic as well as JSON-friendly web services with some guarantees of supporting legacy SFAF formats.

#Install via Bower
If you don't want to build this library or use *Bower* et al, you can simply download either the `sfafx.js` or the minified `sfafx.min.js` library.

To use via Bower, first ensure [Bower](http://bower.io) is installed, then execute:
```shell
$bower install sfafxjs
```
and include `sfafx.js` in your HTML
```html
<script src="bower_components/sfafjs/sfafx.js"></script>
```

# Usage
`sfafxjs` library is intended to provide invertible conversion, meaning the results between SFAF text and JSON without any editing should be identical.
An invertible function (denoted as F<sup>-1</sup>) requires that F<sup>-1</sup>( F( x ) ) == x for all x.  When designing web services to interact with legacy formats, the invertible property of legacy format conversion is a critical property of properly decoupled web services.

For SFAFxJS this property requires that SFAFx.toSFAF( SFAFx.toJSON( SFAFRecord ) ) == SFAFRecord for all possible SFAF records.

```JavaScript
var text = getSFAFText();
text.localeCompare( SFAFx.toSFAF( SFAFx.toJSON( text ) ) ) == 0 // should return true for equal
```

The JSON version of the SFAF records are much friendlier to use with modern HTML libraries that generally work best with JSON data models.
```JavaScript
// returns an array of SFAF records
var records = SFAFx.toJSON(document.getElementById('sfaftext').innerText);
// manipulate records, and create edited SFAF
var sfaftxt = SFAFx.toSFAF(records);
```

## Dictionary
`sfafxjs` contains a Pub 7 dictionary of data elements.
*  ``getMaxOccurrences``  maximum ocurrences of this element
*  ``types`` unique list of the categories of elements
*  ``typeModel`` groups of data elements by type
*  ``required`` list of minimum data elements required for a new record


# Tools
There are a few development tools available for testing and command line usage as well.
*  `bin/sfaf2json.js` converts a file to JSON and logs to the console.
*  `bin/json2sfaf.js` converts a file to SFAF and logs to the console.

Because the conversion is invertible, you can do this:
```shell
$node sfaf2json.js ../test/af744251.sfaf > temp.json
$node json2sfaf.js temp.json > temp.sfaf
$diff temp.sfaf ../test/af744251.sfaf
```
# Testing
In the `/test` directory you will find a few test scripts and a *QUnit* HTML unit test.
*  ``test/inverttest.js`` ensures the invertible property of a file parameter or 'af744251.sfaf' by default.
*  ``test/timeparse.js`` attempts to provide parser timing benchmarks.
*  ``test/test.html`` is a *QUnit* HTML unit test for many of the SFAFx functions and models.

# Modeling
SFAF models a transmitter with a number of receiver, antennas, and emission designations which can result in fairly large combinatorics. Sections of are grouped together, such as `Adminstrative data` which are line entries in the range `005-108`.

*Not all of the entries are required except `005` for classification and `102` for serial ID, which is presumed to be a primary key.*

Most of the modeling occurs in the PEG parser, which produces the JSON model as per the example below. Wherever possible, human readable descriptions were used instead of cryptic codes to 'save space'.
Modern storage and communication methods usually have the capability to enable compression or is part of their design, such as gzipped HTTP or Solr inverted indices.

## Guide to the SFAF Data Items
*  Administrative data (005-108)
*  Emission characteristics (110-118)
*  Time/date information (130-152)
*  Organizational information (200-209)
*  Transmitter location data (300-306)
*  Space stations (315-321)
*  Transmitter equipment (340-349)
*  Transmitter antenna data (354-374)
*  Receiver location data (400-408)
*  Space stations (415-419)
*  Receiver equipment (440-443)
*  Receiver antenna data (454-463)
*  Space systems (470-473)
*  Supplementary details (500-531)
*  Other assignment identifiers (701-716)
*  Additional information (801-965)

## Occurs
SFAF has a idiosyncratic mechanism for enumerating child elements called an labeled 'occurs' in the SFAFx JSON model. For example, when an occur is left blank the default internal enumeration is "01".  SFAFx explicates this assumption in the JSON data model of the SFAF record.  The occur identifier is especially crucial for properly modeling equipment linkages.

## Example
Included in this project is a dummy record, that is not a 'technically' correct record, but has sufficient properly formatted elements for demonstration purposes.

```
005.     UA
010.     M
102.     AF  744251
103.     J0667646
103/02.     I7424719
103/03.     I9797391
103/04.     I9343371
103/05.     I8954035
103/06.     I8110113
103/07.     I7737346
103/08.     I7632677
107.     19740722
108.     I7737346
110.     K275
113.     ALB
114.     2K04A2A
115.     W400
113/02.     ALB
114/02.     600H00P0N
115/02.     W6
113/03.     ML
114/03.     6K00A3E
115/03.     W10
117.     58
118.     E
130.     1HX
142.     20200825
143.     20100825
144.     Y
199.     T/02(A/02)R00[TR]R/01(A/01)R05(E/01)
199/02.     T/03(A/02)R00[TR]R/02(A/01)R05(E/01)
199/03.     T/01(A/02)R00[TR]R/03(A/01)R05(E/01)
200.     USAF
201.     PACOM
202.     PACAF
204.     PACAF
205.     11AF
206.     ELMENDORF
207.     611ASUS
208.     BEACN
209.     JFMOALASKA
300.     AK
301.     CAPE ROMANZOF
303.     614726N1655811W
304.     CZF
306.     46B
340.     G,AN/URN-005
343.     J/F 12/04752
340/02.     G,AN/GRC-103
343/02.     J/F 12/04752
357.     2
362.     ND
363.     V
373.     G
400.     AK
401.     CAPE ROMANZOF
403.     614726N1655811W
404.     CZF
406.     46
440.     G,RM-0004
442.     25
443.     J/F 12/04752
440/02.     G,AN/PRC-133
442/02.     25
443/02.     J/F 12/04751
473.     G
500.     S401
502.     ALS 94-115
511.     AIR OPERATIONS
512.     NAVAIDS
513.     BEACON
520.     COORD WITH PHILLIPS FAA-AK 20100729
520.     SECOND LINE OF TEXT
701.     T02
702.     PACAF 2010-300
901.     A
911.     20100826
924.     FRRS
927.     19770429
928.     20100805
956.     RAB
958.     A
```

```JavaScript
[
  {
    "classification": "UA",
    "sfaf": {
      "102": {
        "entry": "AF  744251"
      },
      "103": {
        "entry": "J0667646",
        "occur": {
          "02": {
            "entry": "I7424719"
          },
          "03": {
            "entry": "I9797391"
          },
          "04": {
            "entry": "I9343371"
          },
          "05": {
            "entry": "I8954035"
          },
          "06": {
            "entry": "I8110113"
          },
          "07": {
            "entry": "I7737346"
          },
          "08": {
            "entry": "I7632677"
          }
        }
      },
      "107": {
        "entry": "19740722"
      },
      "108": {
        "entry": "I7737346"
      },
      "110": {
        "entry": "K275"
      },
      "113": {
        "entry": "ALB",
        "occur": {
          "02": {
            "entry": "ALB"
          },
          "03": {
            "entry": "ML"
          }
        }
      },
      "114": {
        "entry": "2K04A2A",
        "occur": {
          "02": {
            "entry": "600H00P0N"
          },
          "03": {
            "entry": "6K00A3E"
          }
        }
      },
      "115": {
        "entry": "W400",
        "occur": {
          "02": {
            "entry": "W6"
          },
          "03": {
            "entry": "W10"
          }
        }
      },
      "117": {
        "entry": "58"
      },
      "118": {
        "entry": "E"
      },
      "130": {
        "entry": "1HX"
      },
      "142": {
        "entry": "20200825"
      },
      "143": {
        "entry": "20100825"
      },
      "144": {
        "entry": "Y"
      },
      "199": {
        "entry": "T/02(A/02)R00[TR]R/01(A/01)R05(E/01)",
        "occur": {
          "02": {
            "entry": "T/03(A/02)R00[TR]R/02(A/01)R05(E/01)"
          },
          "03": {
            "entry": "T/01(A/02)R00[TR]R/03(A/01)R05(E/01)"
          }
        }
      },
      "200": {
        "entry": "USAF"
      },
      "201": {
        "entry": "PACOM"
      },
      "202": {
        "entry": "PACAF"
      },
      "204": {
        "entry": "PACAF"
      },
      "205": {
        "entry": "11AF"
      },
      "206": {
        "entry": "ELMENDORF"
      },
      "207": {
        "entry": "611ASUS"
      },
      "208": {
        "entry": "BEACN"
      },
      "209": {
        "entry": "JFMOALASKA"
      },
      "300": {
        "entry": "AK"
      },
      "301": {
        "entry": "CAPE ROMANZOF"
      },
      "303": {
        "entry": "614726N1655811W"
      },
      "304": {
        "entry": "CZF"
      },
      "306": {
        "entry": "46B"
      },
      "340": {
        "entry": "G,AN/URN-005",
        "occur": {
          "02": {
            "entry": "G,AN/GRC-103"
          }
        }
      },
      "343": {
        "entry": "J/F 12/04752",
        "occur": {
          "02": {
            "entry": "J/F 12/04752"
          }
        }
      },
      "357": {
        "entry": "2"
      },
      "362": {
        "entry": "ND"
      },
      "363": {
        "entry": "V"
      },
      "373": {
        "entry": "G"
      },
      "400": {
        "entry": "AK"
      },
      "401": {
        "entry": "CAPE ROMANZOF"
      },
      "403": {
        "entry": "614726N1655811W"
      },
      "404": {
        "entry": "CZF"
      },
      "406": {
        "entry": "46"
      },
      "440": {
        "entry": "G,RM-0004",
        "occur": {
          "02": {
            "entry": "G,AN/PRC-133"
          }
        }
      },
      "442": {
        "entry": "25",
        "occur": {
          "02": {
            "entry": "25"
          }
        }
      },
      "443": {
        "entry": "J/F 12/04752",
        "occur": {
          "02": {
            "entry": "J/F 12/04751"
          }
        }
      },
      "473": {
        "entry": "G"
      },
      "500": {
        "entry": "S401"
      },
      "502": {
        "entry": "ALS 94-115"
      },
      "511": {
        "entry": "AIR OPERATIONS"
      },
      "512": {
        "entry": "NAVAIDS"
      },
      "513": {
        "entry": "BEACON"
      },
      "520": {
        "entry": [
          "COORD WITH PHILLIPS FAA-AK 20100729",
          "SECOND LINE OF TEXT"
        ]
      },
      "701": {
        "entry": "T02"
      },
      "702": {
        "entry": "PACAF 2010-300"
      },
      "901": {
        "entry": "A"
      },
      "911": {
        "entry": "20100826"
      },
      "924": {
        "entry": "FRRS"
      },
      "927": {
        "entry": "19770429"
      },
      "928": {
        "entry": "20100805"
      },
      "956": {
        "entry": "RAB"
      },
      "958": {
        "entry": "A"
      },
      "005": {
        "entry": "UA"
      },
      "010": {
        "entry": "M"
      }
    },
    "serial": "AF  744251",
    "docket": {
      "current": "J0667646",
      "original": "I7424719",
      "previous": [
        "I9797391",
        "I9343371",
        "I8954035",
        "I8110113",
        "I7737346",
        "I7632677"
      ]
    },
    "authorization": {
      "text": "19740722",
      "yyyy": 1974,
      "mm": 7,
      "dd": 22,
      "date": "1974-07-22T04:00:00.000Z"
    },
    "transmitter": {
      "freqband": {
        "frequency": 0.275
      },
      "01": {
        "stationclass": "ALB",
        "emissiondesignator": {
          "entry": "2K04A2A",
          "frequency": 0.002,
          "modulation": {
            "type": {
              "type": "amplitude",
              "desc": "Double sideband"
            },
            "nature": {
              "card": "single",
              "encoding": "digital",
              "desc": "A single channel containing quantized or digital information, using a modulating subcarrier"
            },
            "information": {
              "type": "aural",
              "desc": "Telegraphy - for aural reception"
            }
          }
        }
      },
      "02": {
        "stationclass": "ALB",
        "emissiondesignator": {
          "entry": "600H00P0N",
          "frequency": 0.0006,
          "modulation": {
            "type": {
              "type": "pulse",
              "desc": "Sequence of unmodulated pulses."
            },
            "nature": {
              "card": "none",
              "encoding": "digital",
              "desc": "No modulating signal"
            },
            "information": {
              "type": "none",
              "desc": "No information transmitted"
            }
          }
        }
      },
      "03": {
        "stationclass": "ML",
        "emissiondesignator": {
          "entry": "6K00A3E",
          "frequency": 0.006,
          "modulation": {
            "type": {
              "type": "amplitude",
              "desc": "Double sideband"
            },
            "nature": {
              "card": "single",
              "encoding": "analogue",
              "desc": "A single channel containing analogue information"
            },
            "information": {
              "type": "aural",
              "desc": "Telephony (including sound broadcasting)"
            }
          }
        }
      },
      "location": {
        "lat": {
          "deg": 61,
          "min": 47,
          "sec": 26,
          "dir": "N",
          "dec": 61.79055555555556
        },
        "lon": {
          "deg": 165,
          "min": 58,
          "sec": 11,
          "dir": "W",
          "dec": -165.96972222222223
        },
        "coord": [
          61.79055555555556,
          -165.96972222222223
        ],
        "radius": 46
      }
    },
    "linkage": {
      "01": {
        "link": {
          "txconfig": {
            "tx": "02",
            "ant": "02",
            "loc": "00"
          },
          "dir": "txrx",
          "rxconfig": {
            "rx": "01",
            "ant": "01",
            "loc": "05"
          },
          "emission": "01"
        }
      },
      "02": {
        "link": {
          "txconfig": {
            "tx": "03",
            "ant": "02",
            "loc": "00"
          },
          "dir": "txrx",
          "rxconfig": {
            "rx": "02",
            "ant": "01",
            "loc": "05"
          },
          "emission": "01"
        }
      },
      "03": {
        "link": {
          "txconfig": {
            "tx": "01",
            "ant": "02",
            "loc": "00"
          },
          "dir": "txrx",
          "rxconfig": {
            "rx": "03",
            "ant": "01",
            "loc": "05"
          },
          "emission": "01"
        }
      }
    },
    "txantennas": {
      "01": {
        "gain": "2",
        "orientation": "ND",
        "polarization": {
          "type": "fixed vertical"
        }
      }
    },
    "receivers": {
      "01": {
        "stateloc": "AK",
        "antennaloc": "CAPE ROMANZOF",
        "location": {
          "lat": {
            "deg": 61,
            "min": 47,
            "sec": 26,
            "dir": "N",
            "dec": 61.79055555555556
          },
          "lon": {
            "deg": 165,
            "min": 58,
            "sec": 11,
            "dir": "W",
            "dec": -165.96972222222223
          },
          "coord": [
            61.79055555555556,
            -165.96972222222223
          ]
        },
        "callsign": "CZF",
        "radius": 46,
        "equipmentcertid": "J/F 12/04752"
      },
      "02": {
        "equipmentcertid": "J/F 12/04751"
      }
    }
  }
]
```
