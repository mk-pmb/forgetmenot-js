/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

(function readmeDemo() {
  //#u
  var forgetMeNot = require('forgetmenot');

  function repeat(n, func) {
    while (n > 0) {
      func();
      n -= 1;
    }
  }

  function multi(word) {
    var append = word.split(/n/).reverse()[0],
      n = (+process.env['N_' + word.toUpperCase()] || 0);

    function sayIt() {
      console.log(word);
      word += 'n' + append;
    }

    repeat(n, forgetMeNot(sayIt, { min: 3, hint: word }));
  }

  multi('om');
  //#r
}());
