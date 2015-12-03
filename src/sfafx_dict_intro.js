'use strict';
/**
 * SFAFx Dictionary Addon Module
 */
(function(SFAFx) {

  var modulation = {};
/*
FIRST SYMBOL - Designates the Type of Modulation of the Main Carrier
Angle-Modulated
F - Frequency modulated
G - Phase modulated
Amplitude and Angle-Modulated
D - Main carrier is amplitude-modulated and angle-modulated simultaneously or in a preestablished sequence.
Pulse
P - Sequence of unmodulated pulses
A sequence of pulses
K - Modulated in amplitude
L - Modulated in width/duration
M - Modulated in position phase
Q - Carrier is angle-modulated during the period of the pulse
V - Combination of the foregoing or is produced by other means
Combination
W - Cases not covered above in which an emission consists of the main carrier being modulated, either simultaneously or in a preestablished sequence, in a combination of two or more of the following modes: amplitude, angle, pulse
Other
X - Cases not otherwise covereda
Unmodulated
N - Emission of unmodulated carrier
Amplitude Modulated
A - Double sideband
B - Independent sidebands
C - Vestigial sidebands
H - Single sideband, full carrier
J - Single sideband, suppressed carrier
R - Single sideband, reduced or variable level carrier
*/
var modType = modulation["modtype"] =
  {
    F : { type: 'angular', desc:'Frequency modulated' },
    G : { type: 'angular',  desc:'Phase modulated' },
    D : { type: 'amplitude,angular', desc:'Main carrier is amplitude-modulated and angle-modulated simultaneously or in a preestablished sequence.'},
    P : { type: 'pulse', desc:'Sequence of unmodulated pulses.'},
    K : { type: 'pulse', desc:'Modulated in amplitude.'},
    L : { type: 'pulse', desc:'Modulated in width/duration.'},
    M : { type: 'pulse', desc:'Modulated in position phase.'},
    Q : { type: 'pulse', desc:'Carrier is angle-modulated during the period of the pulse.'},
    V : { type: 'pulse', desc:'Combination of the foregoing or is produced by other means.'},
    W : { type: 'pulse', desc:'Cases not covered above in which an emission consists of the main carrier being modulated, either simultaneously or in a preestablished sequence, in a combination of two or more of the following modes: amplitude, angle, pulse'},
    X : { type: 'pulse', desc:'Cases not otherwise covered. A full explanation for the selection of the letter X shall be provided in item 520 unless the application is for a non-directional beacon in the bands 190-435 and 510-535 kHz'},
    N : { type: 'umodulated', desc:'Emission of unmodulated carrier'},
    A : { type: 'amplitude', desc:'Double sideband'},
    B : { type: 'amplitude', desc:'Independent sidebands'},
    C : { type: 'amplitude', desc:'Vestigial sidebands'},
    H : { type: 'amplitude', desc:'Single sideband, full carrier'},
    J : { type: 'amplitude', desc:'Single sideband, suppressed carrier'},
    R : { type: 'amplitude', desc:'Single sideband, reduced or variable level carrier'}
  };

/*
SECOND SYMBOL - Designates the Nature of Signal(s) Modulating the Main Carrier
0 - No modulating signal
1 - A single channel containing quantized or digital information, not using a modulating subcarrier (excludes time-division multiplex)
2 - A single channel containing quantized or digital information, using a modulating subcarrier
3 - A single channel containing analogue information
7 - Two or more channels containing quantized or digital information
8 - Two or more channels containing analogue information
9 - Composite system with one or more channels containing quantized or digital information, together with one or more channels containing analogue information
X - Cases not otherwise covered
*/
var modNature = modulation["modnature"] =
  {
    '0' : { card:'none', encoding:'digital', desc: 'No modulating signal' },
    '1' : { card:'single', encoding:'digital', desc: 'A single channel containing quantized or digital information, not using a modulating subcarrier (excludes time-division multiplex)' },
    '2' : { card:'single', encoding:'digital', desc: 'A single channel containing quantized or digital information, using a modulating subcarrier' },
    '3' : { card:'single', encoding:'analogue', desc: 'A single channel containing analogue information' },
    '7' : { card:'multiple', encoding:'digital', desc: 'Two or more channels containing quantized or digital information' },
    '8' : { card:'multiple', encoding:'analogue', desc: 'Two or more channels containing analogue information' },
    '9' : { card:'composite', encoding:'composite', desc: 'Composite system with one or more channels containing quantized or digital information, together with one or more channels containing analogue information' },
    'X' : { card:'UNK', encoding:'UNK', desc: 'Cases not otherwise covered' },
  };
/*
THIRD SYMBOL - Type of information to be transmittedb
N - No information transmitted
A - Telegraphy - for aural reception
B - Telegraphy - for automatic reception
C - Facsimile
D - Data transmission, telemetry, telecommand
E - Telephony (including sound broadcasting)
F - Television (video)
W - Combination of the above
X - Cases not otherwise covereda
a A full explanation for the selection of the letter X shall be provided in item 520 unless the application is for a non-directional beacon in the bands 190-435 and 510-535 kHz
b In this context, the word "information" does not include information of a constant, unvarying nature such as that provided by standard frequency emissions, continuous wave, pulse radars, etc.
*/
var modinfo = modulation["modinformation"] =
  {
    'N' : { type:'none', desc:'No information transmitted' },
    'A' : { type:'aural', desc:'Telegraphy - for aural reception' },
    'B' : { type:'data', desc:'Telegraphy - for automatic reception' },
    'C' : { type:'data', desc:'Facsimile' },
    'D' : { type:'data', desc:'Data transmission, telemetry, telecommand' },
    'E' : { type:'aural', desc:'Telephony (including sound broadcasting)' },
    'F' : { type:'visual', desc:'Television (video)' },
    'W' : { type:'combination', desc:'Combination of the above' },
    'X' : { type:'other', desc:'Cases not otherwise covered' },
  };
/*
FOURTH SYMBOL - Designates the Details of Signal(s) (Optional)
A - Two-condition code with elements of differing numbers and/or durations
B - Two-condition code with elements of the same number and duration without error correction
C - Two-condition code with elements of the same number and duration with error correction
D - Four-condition code in which each condition represents a signal element of one or more bits
E - Multi-condition code in which each condition represents a signal element of one or more bits
F - Multi-condition code in which each condition or combination of conditions represents a character
G - Sound of broadcasting quality (monophonic)
H - Sound of broadcasting quality (stereophonic or quadraphonic)
J - Sound of commercial quality (excluding categories defined for symbol K and L below)
K - Sound of commercial quality with the use of frequency inversion or band splitting
L - Sound of commercial quality with separate frequency modulated signals to control the level of demodulated signal
M - Monochrome
N - Color
W - Combination of the above
X - Cases not otherwise covered
*/
var moddetail = modulation["moddetail"] =
  {
    'A' : { type:'code', desc:'Two-condition code with elements of differing numbers and/or durations' },
    'B' : { type:'code', desc:'Two-condition code with elements of the same number and duration without error correction' },
    'C' : { type:'code', desc:'Two-condition code with elements of the same number and duration with error correction' },
    'D' : { type:'code', desc:'Four-condition code in which each condition represents a signal element of one or more bits' },
    'E' : { type:'code', desc:'Multi-condition code in which each condition represents a signal element of one or more bits' },
    'F' : { type:'code', desc:'Multi-condition code in which each condition or combination of conditions represents a character' },
    'G' : { type:'sound', desc:'Sound of broadcasting quality (monophonic)' },
    'H' : { type:'sound', desc:'Sound of broadcasting quality (stereophonic or quadraphonic)' },
    'J' : { type:'sound', desc:'Sound of commercial quality (excluding categories defined for symbol K and L below)' },
    'K' : { type:'sound', desc:'Sound of commercial quality with the use of frequency inversion or band splitting' },
    'L' : { type:'sound', desc:'Sound of commercial quality with separate frequency modulated signals to control the level of demodulated signal' },
    'M' : { type:'color', desc:'Monochrome' },
    'N' : { type:'color', desc:'Color' },
    'W' : { type:'combination', desc:'Combination of the above' },
    'X' : { type:'other', desc:'Cases not otherwise covered' },
  };
/*
FIFTH SYMBOL - Designates the Nature of Multiplexing (Optional)
N - None
C - Code-division multiplex (includes bandwidth expansion techniques)
F - Frequency-division multiplex
T - Time-division multiplex
W - Combination of frequency-division multiplex and time-division multiplex
X - Other types of multiplexing
*/
var modmux = modulation["modmux"] =
  {
    'N' : { type:'none', desc:'None' },
    'C' : { type:'code-division', desc:'Code-division multiplex (includes bandwidth expansion techniques)' },
    'F' : { type:'frequency-division', desc:'Frequency-division multiplex' },
    'T' : { type:'time-division', desc:'Time-division multiplex' },
    'W' : { type:'combination', desc:'Combination of frequency-division multiplex and time-division multiplex' },
    'X' : { type:'other', desc:'Other types of multiplexing' },
  };

  var antenna = {};
  antenna['polarization'] = {
    'A' : { type:'elliptic, left'},
    'B' : { type:'elliptic, right'},
    'D' : { type:'rotating'},
    'E' : { type:'elliptical'},
    'F' : { type:'45-degrees'},
    'H' : { type:'fixed horizontal'},
    'J' : { type:'linear'},
    'L' : { type:'left-hand circular'},
    'M' : { type:'oblique, angled left'},
    'N' : { type:'oblique, angled right'},
    'O' : { type:'oblique, angled, crossed'},
    'R' : { type:'right-hand circular'},
    'S' : { type:'horizontal and vertical'},
    'T' : { type:'right and left-hand circular'},
    'V' : { type:'fixed vertical'},
    'X' : { type:'other or unknown'},
};

  var specialHandlingCodes = {
  'A': { label:'Public Unlimited',
      description:'Approved for public release; distribution is unlimited (DoD Directive 5230.24).'},
  'B': { label:'Public NATO Only',
      description:'Releasable to soil country and the North Atlantic Treaty Organization (NATO); otherwise, not releasable outside the US Government in accordance with (IAW) Section 552 (b)(1) of Title 5 of the US Code.'},
  'C': { label:'Public Coalition Only',
      description:'Releasable to soil country and coalition operation organizations; otherwise, not releasable outside the US Government in accordance with (IAW) Section 552 (b)(1) of Title 5 of the US Code.'},
  'D': { label:'DoD Only',
      description:'Not releasable outside US Department of Defense (DoD) IAW Section 552 (b) (1) of Title 5 of the US Code.'},
  'E': { label:'US Government Only',
      description:'Not releasable outside the US Government IAW Section 552 (b)(1) of Title 5 of the US Code.'},
  'F': { label:'No Foreign',
      description:'Not releasable to foreign nationals and not releasable outside the US Government IAW Section 552 (b)(1) of Title 5 of the US Code.'},
  'G': { label:'Federal, State, Local Only',
      description:'Releasable to Federal, State, and Local governments; otherwise, not releasable outside the US Government IAW Section 552 (b) (1) of Title 5 of the US Code.'},
  'H': { label:'US Only',
      description:'Releasable to soil country only; otherwise, not releasable outside the US Government IAW Section 552 (b)(1) of Title 5 of the US Code.'},
  'J': { label:'Contingent',
      description:'Contingency Assignment - The record contains unified commander comments only; not releasable to foreign nationals unless formally coordinated; otherwise, not releasable outside the US Government IAW Section 552 (b)(1) of Title 5 of the US Code.'},
  'K': { label:'Permanent assignment.',
      description:'Permanent assignment. Available for contingency use within the theater after coordination with and approval of the cognizant unified commander - releasable to soil nation; otherwise, not releasable outside the US Government IAW Section 552 (b)(1) of Title 5 of the US Code.'},
  'M': { label:'Coalition',
      description:'Releasable to coalition operation organizations only; otherwise, not releasable outside the U.S. Government IAW Section 552 (b) (1) of Title 5 of the U.S. Code.'},
  'N': { label:'NATO Only',
      description:'Releasable to NATO; otherwise, not releasable outside the U.S. Government IAW Section 552 (b)(1) of Title 5 of the U.S. Code.'},
  'O': { label:'Proprietary Commerical Only',
      description:'Proprietary for commercial use only.'},
  'P': { label:'Proprietary US Only',
      description:'Proprietary; otherwise, not releasable outside the U.S. Government IAW Section 552 (b)(1) of Title 5 of the U.S. Code.'},
  'Z': { label:'Releasable CCEB Only',
      description:'Releasable to Australia, Canada, New Zealand, and United Kingdom (CCEB) organizations only; otherwise, not releasable outside the U.S. Government IAW Section 552 (b) (1) of Title 5 of the U.S. Code.'}
    };

    var getSHC = function( entry ){
      if( entry == null || entry == undefined ){
        return 'UNK';
      }
      if( entry.length < 2 ){
        return 'UNK';
      }
      var code = entry.charAt(1);
      if( !specialHandlingCodes.hasOwnProperty(code) ){
        return 'UNK';
      }
      var res = specialHandlingCodes[code];
      return res;
    }

    var MCEBPub7Entries =
