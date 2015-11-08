/*!
 * SFAFx JS SFAF Parser and Library
 * Eric Lindahl, Sciumo Inc. (c) 2015 LGPL License
 * Version: @@version
 * Last build: @@timestamp
 */

// Module systems magic dance
// Don't use strict mode for this function, so it can assign to global
;(function(root, definition) {
    // RequireJS
    if (typeof define === 'function' && define.amd) {
        define(definition);
    // CommonJS
    } else if (typeof exports === 'object') {
        var self = definition();
        // Use Node.js's `module.exports`. This supports both `require('xregexp')` and
        // `require('xregexp').XRegExp`
        (typeof module === 'object' ? (module.exports = self) : exports).SFAFx = self;
    // <script>
    } else {
        // Create global
        root.SFAFx = definition();
    }
}(this, function() {
