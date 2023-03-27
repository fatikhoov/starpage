"use strict";

var initAccordionShow = function initAccordionShow() {
  var e = document.querySelectorAll(".accordion__req-res");
  0 <= e.length && e.forEach(function (e) {
    var o = e.querySelector(".btn-accordion"),
      t = e.querySelector(".content-accordion");
    o.addEventListener("click", function () {
      t.classList.toggle("hidden-accordion"), t.classList.contains("hidden-accordion") ? (o.children[1].style.transform = "rotate(45deg)", t.style.display = "none", setTimeout(function () {
        t.style.display = "", o.style.boxShadow = "";
      }, 1)) : (o.style.boxShadow = "0px 5px 20px 0px rgba(178,57,221,0.2)", o.children[1].style.transform = "rotate(0deg)");
    });
  });
};
"use strict";

var initCarouselShow = function initCarouselShow() {
  var e = document.querySelector(".carousel"),
    r = new Flickity(e, {
      imagesLoaded: !0,
      percentPosition: !0,
      draggable: !0,
      cellAlign: "center",
      freeScroll: !1,
      contain: !0,
      wrapAround: !0,
      autoPlay: !0
    }),
    n = e.querySelectorAll(".carousel-cell img"),
    o = "string" == typeof document.documentElement.style.transform ? "transform" : "WebkitTransform";
  e.addEventListener("scroll", function () {
    r.slides.forEach(function (e, t) {
      t = n[t], e = -1 * (e.target + r.x) / 3;
      t.style[o] = "translateX(" + e + "px)";
    });
  });
};
"use strict";

var resizeObserver = null;
var CLASS_LIST = {
    MODAL: "modal",
    MODAL_ACTIVE: "modal-active",
    MODAL_HAS_SCROLL: "modal--has-scroll",
    MODAL_DIALOG_BODY: "modal__dialog-body",
    TRIGGER_OPEN: "js-modal-open",
    TRIGGER_CLOSE: "js-modal-close",
    TRIGGER_LINK: "nav-link"
  },
  showScroll = function showScroll(e) {
    "transform" === e.propertyName && (document.body.style.paddingRight = "", document.body.style.overflow = "", document.body.style.overflowX = "hidden", e.target.closest("." + CLASS_LIST.MODAL).removeEventListener("transitionend", showScroll));
  },
  getScrollbarWidth = function getScrollbarWidth() {
    var e = document.createElement("div"),
      t = (e.style.position = "absolute", e.style.top = "-9999px", e.style.width = "50px", e.style.height = "50px", e.style.overflow = "scroll", e.style.visibility = "hidden", document.body.appendChild(e), e.offsetWidth - e.clientWidth);
    return document.body.removeChild(e), t;
  },
  bindResizeObserver = (document.addEventListener("click", function (e) {
    if (e.target.closest("." + CLASS_LIST.TRIGGER_OPEN) && (e.preventDefault(), s = e.target.closest("." + CLASS_LIST.TRIGGER_OPEN).getAttribute("href").replace("#", ""), s = document.getElementById(s), document.body.style.paddingRight = getScrollbarWidth() + "px", document.body.style.overflow = "hidden", s.classList.add(CLASS_LIST.MODAL_ACTIVE), bindResizeObserver(s)), e.target.closest("." + CLASS_LIST.TRIGGER_CLOSE) || e.target.classList.contains(CLASS_LIST.MODAL_ACTIVE) || e.target.classList.contains(CLASS_LIST.TRIGGER_LINK)) {
      e.preventDefault();
      var s = e.target.closest("." + CLASS_LIST.MODAL);
      s.classList.remove(CLASS_LIST.MODAL_ACTIVE);
      var t = [];
      document.querySelectorAll(".modal").forEach(function (e) {
        e.classList.contains("modal-active") && t.push(e);
      }), t.length <= 0 && (s.addEventListener("transitionend", showScroll), unbindResizeObserver(s));
    }
  }), function (e) {
    var t = e.querySelector("." + CLASS_LIST.MODAL_DIALOG_BODY);
    (resizeObserver = new ResizeObserver(function () {
      e.classList.toggle(CLASS_LIST.MODAL_HAS_SCROLL, t.scrollHeight > t.clientHeight);
    })).observe(t);
  }),
  unbindResizeObserver = function unbindResizeObserver(e) {
    e = e.querySelector("." + CLASS_LIST.MODAL_DIALOG_BODY);
    resizeObserver.unobserve(e), resizeObserver = null;
  };
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var validSendModal = document.getElementById("valid-send-modal"),
  btnSendModal = document.getElementById("btn-send-modal"),
  loader = document.getElementById("loader-modal"),
  onSuccessModal = document.getElementById("onSuccess__modal"),
  btnSend = document.querySelector(".btn-send"),
  applicantForm = document.getElementById("modal-form"),
  regForm = document.getElementById("regForm"),
  titleSuccess = document.querySelector(".modal__header-title"),
  successSendModal = document.querySelector(".success-send-modal");
var TARGET_ID, s;
function onSuccess(e) {
  console.log("i work onSuccess"), alert("Удачно ->>", e, TARGET_ID), titleSuccess.classList.toggle("hidden"), successSendModal.classList.toggle("hidden"), document.querySelector("p[ind-data=\"".concat(TARGET_ID, "-onSuccess\"]")).classList.toggle("hidden"), document.querySelector("[id=\"".concat(TARGET_ID, "\"]")).classList.toggle("hidden"), document.querySelector("div[ind-data=\"".concat(TARGET_ID, "-steps\"]")).classList.toggle("hidden"), document.querySelector("div[ind-data=\"".concat(TARGET_ID, "-btns\"]")).classList.add("hidden");
}
function toggleLoader() {
  document.querySelector("button[ind-data=\"".concat(TARGET_ID, "-button\"]")).disabled = !0, document.querySelector("span[ind-data=\"".concat(TARGET_ID, "-loader\"]")).classList.toggle("hidden"), document.querySelector("span[ind-data=\"".concat(TARGET_ID, "-sendBtn\"]")).classList.toggle("hidden");
}
function handleFormSubmit(_x) {
  return _handleFormSubmit.apply(this, arguments);
}
function _handleFormSubmit() {
  _handleFormSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
    var t, a, n, o, d, _iterator, _step, _step$value, i, c, l;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          e.preventDefault(), TARGET_ID = e.target.id, s = "Заявка из формы " + TARGET_ID, toggleLoader();
          n = e.target, o = new FormData(n), d = {};
          _iterator = _createForOfIteratorHelper(o.entries());
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _step$value = _slicedToArray(_step.value, 2);
              t = _step$value[0];
              a = _step$value[1];
              d[t] = a;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          _context.next = 7;
          return sendToTelegram(d);
        case 7:
          i = _context.sent;
          _context.next = 10;
          return sendToEmail(d);
        case 10:
          c = _context.sent;
          _context.next = 13;
          return sendToGoogle(d);
        case 13:
          l = _context.sent;
          _context.next = 16;
          return Promise.allSettled([i, c, l]);
        case 16:
          if (!_context.sent.every(function (e) {
            return "rejected" === e.status;
          })) {
            _context.next = 18;
            break;
          }
          throw new Error("Ошибка промисов");
        case 18:
          onSuccess();
          _context.next = 24;
          break;
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          console.error("Ошибка отправки данных!", _context.t0);
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 21]]);
  }));
  return _handleFormSubmit.apply(this, arguments);
}
function sendToTelegram(_x2) {
  return _sendToTelegram.apply(this, arguments);
}
function _sendToTelegram() {
  _sendToTelegram = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
    var t;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log("начало телеграмм");
          t = "<b>\u0417\u0410\u042F\u0412\u041A\u0410 \u041D\u0410 \u0420\u0410\u0417\u0420\u0410\u0411\u041E\u0422\u041A\u0423 \u0421\u0410\u0419\u0422\u0410</b>\n";
          t = (t = (t = (t = (t = (t = (t += "\u0418\u043C\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430:<b> ".concat(e.name, "</b>\n")) + "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F:<b> ".concat(e.company, "</b>\n")) + "\u0426\u0435\u043B\u044C:<b> ".concat(e.target, "</b>\n\n")) + "\u041F\u043E\u0447\u0442\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0430:<b> ".concat(e.email, "</b>\n")) + "\u0422\u0435\u043B\u0435\u0433\u0440\u0430\u043C:<b> ".concat(e.telegram, "</b>\n")) + "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439:<b> ".concat(e.comment, "</b>\n\n")) + "\u0418\u0437 \u0444\u043E\u0440\u043C\u044B:<b> ".concat(e.website, "</b>\n") + "Из формы:<b><a href='https://login.sendpulse.com/crm/deals'>Посмотреть в CRM</a></b>";
          _context2.next = 5;
          return fetch("https://api.telegram.org/bot6107421370:AAFAUTLHO9IWB6gRD1E9vHs-NuIscyNJvkQ/sendMessage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              chat_id: "-1001830793403",
              parse_mode: "html",
              text: t
            })
          });
        case 5:
          _context2.next = 7;
          return _context2.sent.json();
        case 7:
          e = _context2.sent;
          if (!e.ok) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", e.ok);
        case 10:
          throw new Error("Ошибка отправки данных в телеграмм");
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _sendToTelegram.apply(this, arguments);
}
function sendToEmail(_x3) {
  return _sendToEmail.apply(this, arguments);
}
function _sendToEmail() {
  _sendToEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(e) {
    var t, a, n, s, o, d;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return fetch("https://api.sendpulse.com/oauth/access_token", {
            method: "POST",
            body: "grant_type=client_credentials&client_id=b217105b9b53c078e2590cde9ed470a9&client_secret=19a8cffa13cce6bd54c94f094aaa3e56",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          });
        case 2:
          _context4.next = 4;
          return _context4.sent.json();
        case 4:
          t = _context4.sent["access_token"];
          _context4.next = 7;
          return fetch("https://api.sendpulse.com/crm/v1/pipelines", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + t
            }
          });
        case 7:
          a = _context4.sent;
          if (a.ok) {
            _context4.next = 10;
            break;
          }
          throw new Error("Ошибка создания сделки: " + a.status);
        case 10:
          _context4.next = 12;
          return a.json();
        case 12:
          a = _context4.sent;
          n = a.data[0].id;
          a = a.data[0].steps[0].id;
          _context4.next = 17;
          return fetch("https://api.sendpulse.com/crm/v1/deals/get-list", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + t
            },
            body: JSON.stringify({
              limit: 10,
              offset: 0,
              pipelineIds: [n]
            })
          });
        case 17:
          _context4.next = 19;
          return _context4.sent.json();
        case 19:
          s = _context4.sent;
          _context4.next = 22;
          return fetch("https://api.sendpulse.com/crm/v1//deals/".concat(s.data[0].id, "/attributes"), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + t
            }
          });
        case 22:
          _context4.next = 24;
          return _context4.sent.json();
        case 24:
          o = _context4.sent;
          d = [];
          _context4.next = 28;
          return Promise.all(Object.entries(e).map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref) {
              var _ref3, t, e, a;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _ref3 = _slicedToArray(_ref, 2), t = _ref3[0], e = _ref3[1];
                    a = o.data.find(function (e) {
                      return e.name === t;
                    });
                    a && d.push({
                      attributeId: a.id,
                      value: e
                    });
                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x5) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 28:
          _context4.next = 30;
          return fetch("https://api.sendpulse.com/crm/v1/deals", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + t
            },
            body: JSON.stringify({
              pipelineId: n,
              stepId: a,
              name: e.website,
              price: 0,
              currency: "RUB",
              attributes: d
            })
          });
        case 30:
          _context4.next = 32;
          return _context4.sent.json();
        case 32:
          s = _context4.sent;
          console.log("сделка", s);
          _context4.next = 36;
          return fetch("https://api.sendpulse.com/crm/v1/contacts/get-list", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + t
            },
            body: JSON.stringify({
              limit: 10
            })
          });
        case 36:
          _context4.next = 38;
          return _context4.sent.json();
        case 38:
          n = _context4.sent;
          a = n.data.list[0].responsibleId;
          return _context4.abrupt("return", (console.log("СПИСОК КОНТАКТОВ", n, a), s.success));
        case 41:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _sendToEmail.apply(this, arguments);
}
function sendToGoogle(_x4) {
  return _sendToGoogle.apply(this, arguments);
}
function _sendToGoogle() {
  _sendToGoogle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(e) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          console.log("запись в сервис гугл таблицы", e);
          return _context5.abrupt("return", 200);
        case 2:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _sendToGoogle.apply(this, arguments);
}
var currentTab = 0;
function showTab(e) {
  var t = document.getElementsByClassName("tab");
  t[e].classList.remove("hidden"), 0 == e ? document.getElementById("prevBtn").classList.add("hidden") : document.getElementById("prevBtn").classList.remove("hidden"), e == t.length - 1 ? (console.log("end and  "), document.getElementById("btnRegForm").classList.toggle("hidden"), document.getElementById("nextBtn").classList.toggle("hidden")) : document.getElementById("nextBtn").innerHTML = "Вперед", fixStepIndicator(e);
}
function nextPrev(e) {
  var t = document.getElementsByClassName("tab");
  return !(1 == e && !validateForm()) && (t[currentTab].classList.toggle("hidden"), (currentTab += e) >= t.length ? (console.log("submit"), !1) : void showTab(currentTab));
}
function validateForm() {
  for (var e = !0, t = document.getElementsByClassName("tab")[currentTab].getElementsByTagName("input"), a = 0; a < t.length; a++) "" == t[a].value && (t[a].className += " invalid", e = !1);
  return e && (document.getElementsByClassName("step")[currentTab].className += " finish"), e;
}
function fixStepIndicator(e) {
  for (var t = document.getElementsByClassName("step"), a = document.getElementsByClassName("tab"), n = 0; n < t.length; n++) t[n].className = t[n].className.replace(" active", "");
  e + 1 >= a.length ? console.log("end and stop tab") : t[e].className += " active";
}
showTab(currentTab), addEventListener("submit", handleFormSubmit);