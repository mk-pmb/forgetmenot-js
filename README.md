
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
    debugHint = 'You forgot to say ' + word + '!';

  if (importantWordsRgx.test(word)) {
    sayIt = forgetMeNot(sayIt,        // original function, required
                        debugHint);   // optional hint
  }

  delay = (+process.env['DELAY_' + word.toUpperCase()] || 0);
  if (delay > 0) { setTimeout(sayIt, delay); }
}

sayWordSoon_maybe('meow');
sayWordSoon_maybe('purr');
```
<!--/include-->




<!--#toc stop="scan" -->


Known issues
------------

* There's a limit on how many proxy functions this module can create,
  becuase it uses an internal ID number for each of them in order to track
  whether it's still waiting, and our ID number generator has a limit on
  how many distinguishable ID numbers it can produce.
  If you hit that limit, a `RangeError` will be thrown.
  Probably still a better approach than registering thousands of individual
  `process.on('exit')` event handlers, one for each proxy.








License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
