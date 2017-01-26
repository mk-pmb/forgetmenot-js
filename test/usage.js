/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

(function readmeDemo() {
  //#u
  var forgetMeNot = require('forgetmenot'), importantWordsRgx = /e/;

  function sayWordSoon_maybe(word) {
    var sayIt = function () { console.log(word); }, delay,
      errMsg = 'You forgot to say ' + word + '!';

    if (importantWordsRgx.test(word)) {
      sayIt = forgetMeNot(sayIt,    // original function, required
                          errMsg);  // optional custom error message
    }

    delay = (+process.env['DELAY_' + word.toUpperCase()] || 0);
    if (delay > 0) { setTimeout(sayIt, delay); }
  }

  sayWordSoon_maybe('meow');
  sayWordSoon_maybe('purr');
  //#r
}());
