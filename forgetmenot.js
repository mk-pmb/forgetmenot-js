/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';


function forgetMeNot(origFunc, youForgotMe) {
  if (typeof origFunc !== 'function') {
    throw new TypeError('Expected a function as origFunc');
  }
  var funcName = String(origFunc.name || 'anonymous function'),
    errFilter = ((typeof youForgotMe === 'function') && youForgotMe);
  youForgotMe = (String(((!errFilter) && youForgotMe) || '')
    || ('process exits before any call to ' + funcName));
  youForgotMe = new Error(youForgotMe);

  process.on('exit', function () {
    if (!youForgotMe) { return; }
    if (errFilter) { youForgotMe = (errFilter(youForgotMe) || youForgotMe); }
    if (!youForgotMe) { return; }
    throw youForgotMe;
  });

  return function () {
    youForgotMe = false;
    return origFunc.apply(this, arguments);
  };
}





module.exports = forgetMeNot;
