/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// out is a ByteArrayOutputStream put in scope by JsLintMojo
printToOut = function(s) {
  out.println(s);
};

(function(a) {

  // helper function for reading source file
  readFile = function(file) {
    var jq = new java.io.File(file);
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(jq), "UTF-8"));
    var line = null;
    var lines = [];
    var readFileIndex = 0;
    for (readFileIndex; (line = reader.readLine()) != null; readFileIndex++) {
      lines[readFileIndex] = line + "";
    }
    return lines;
  };

  // set JSLINT options
  // see http://www.jslint.com/lint.html#options
  var options = {
    maxerr: 100,      // max. number of errors per file
    adsafe: false,    // ADsafe
    bitwise: false,   // Disallow bitwise operators
    browser: false,   // Assume a browser
    cap: false,       // Tolerate HTML case
    css: false,       // Tolerate CSS workarounds
    debug: false,     // Tolerate debugger statements
    devel: false,     // Assume console, alert, ...
    eqeqeq: false,    // Disallow == and !=
    es5: false,       // true if ES5 syntax should be allowed.
    evil: false,      // Tolerate eval
    forin: false,     // Tolerate unfiltered for in
    fragment: false,  // Tolerate HTML fragments
    immed: false,     // Require parens around immediate invocations
    indent: false,    // Strict white space indentation
    laxbreak: false,  // Tolerate sloppy line breaking
    nomen: false,     // Disallow dangling _ in identifiers
    newcap: false,    // Require Initial Caps for constructors
    on: false,        // Tolerate HTML event handlers
    onevar: false,    // Allow one var statement per function
    passfail: false,  // Stop on first error
    plusplus: false,  // Disallow ++ and --
    predef: false,    // Predefined ( , separated)
    regexp: false,    // Disallow insecure . and [^...]. in /RegExp/
    rhino: false,     // Assume Rhino
    safe: false,      // Safe Subset
    sidebar: false,   // Assume a Windows Sidebar Gadget
    strict: false,    // Require "use strict";
    sub: false,       // Tolerate inefficient subscripting
    undef: false,     // Disallow undefined variables
    white: false,     // Strict white space
    widget: false,    // Assume a Yahoo Widget
    windows: false    // true if the Windows globals should be predefined
  };

  // run JSLINT on source file
  JSLINT(readFile(sourceFilePath), options);

  // output JSON array with result data for including in report
  printToOut(JSON.stringify(JSLINT.data()));

})();
