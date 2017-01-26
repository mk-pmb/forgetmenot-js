
<!--#echo json="package.json" key="name" underline="=" -->
forgetmenot
===========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
A callback wrapper that cries if you forget to call it before
`process.on(exit)`. (lost callback, broken callback chain, break, early)
<!--/#echo -->


Usage
-----
from [test/usage.js](test/usage.js):

<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="19" -->
```javascript
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
```
<!--/include-->




<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
