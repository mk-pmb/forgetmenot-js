/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';


var nextId = require('maxuniqid')(), pending = {},
  latinSmallFWithHook = '\u0192';


function makeProxy(ctx) {
  var proxy = function () {
    proxy.cnt += 1;
    if (proxy.cnt >= proxy.min) { delete pending[ctx.id]; }
    return ctx.func.apply(this, arguments);
  };
  return proxy;
}


function checkForgotten() {
  var keys = Object.keys(pending), msg;
  if (keys.length === 0) { return; }
  msg = 'Lost callbacks at process exit: n=' + keys.length + ':';
  keys.forEach(function (key, idx) {
    var ctx = pending[key], func = ctx.func, proxy = ctx.proxy,
      hint = proxy.hint;
    if (msg.length < 1024) {
      msg += (idx ? ',' : '') + ' ' + latinSmallFWithHook +
        (func.name ? ' ' + func.name : '<anon>') +
        ' ×' + proxy.cnt + '/' + proxy.min +
        (hint ? ' (' + hint + ')' : '');
    }
    if (ctx.fail) { ctx.fail(func, proxy); }
  });
  throw new Error(msg);
}
process.on('exit', checkForgotten);


function expectFunc(x, slotName) {
  if (typeof x === 'function') { return x; }
  throw new TypeError('Expected a function as ' + slotName);
}


function falseOrFunc(x, slot) { return (x ? expectFunc(x, slot) : false); }


function forgetMeNot(origFunc, opts) {
  if ((origFunc && typeof origFunc) === 'object') {
    opts = origFunc;
    origFunc = opts.origFunc;
  }
  expectFunc(origFunc, 'origFunc');
  opts = (opts || false);
  if (typeof opts === 'string') { opts = { hint: opts }; }
  var proxy, ctx = { id: nextId(), func: origFunc,
    fail: falseOrFunc(opts.fail, 'opts.fail') };

  proxy = makeProxy(ctx);
  proxy.cnt = 0;
  proxy.min = (+opts.min || 1);
  proxy.hint = String(opts.hint || '');
  proxy.stack = (new Error()).stack;
  proxy.cancel = function () { delete pending[ctx.id]; };
  proxy.destroy = function () {
    ctx.func = false;
    delete pending[ctx.id];
  };
  ctx.proxy = proxy;

  pending[ctx.id] = ctx;
  return proxy;
}





module.exports = forgetMeNot;
