/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// src/background.js

// Use the correct API: in Firefox, "browser" is defined and returns promises;
// in Chrome (or as a fallback) use "chrome". We assign it to extBrowser.
var extBrowser = typeof browser !== 'undefined' ? browser : chrome;
var TIMETRACKER_BASE_URL = 'https://timetracker.iglu.ee/api';
var TIMETRACKER_LOGIN_URL = "".concat(TIMETRACKER_BASE_URL, "/login");
var TIMETRACKER_TASKS_URL = "".concat(TIMETRACKER_BASE_URL, "/tasks");

/**
 * Helper to safely extract an error message.
 */
function getErrorMessage(err) {
  if (err instanceof Error) return err.message;
  return String(err);
}

/**
 * Logs in with the provided username and password.
 * Always throws an Error object on failure.
 */
function loginToTimetracker(_x, _x2) {
  return _loginToTimetracker.apply(this, arguments);
}
/**
 * Retrieves the current user using the stored token.
 */
function _loginToTimetracker() {
  _loginToTimetracker = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(username, password) {
    var response, errorText, token;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('loginToTimetracker: Attempting login for', username);
          _context.next = 3;
          return fetch(TIMETRACKER_LOGIN_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          });
        case 3:
          response = _context.sent;
          if (response.ok) {
            _context.next = 10;
            break;
          }
          _context.next = 7;
          return response.text();
        case 7:
          errorText = _context.sent;
          console.error('loginToTimetracker error:', errorText);
          throw new Error("Login failed: ".concat(errorText));
        case 10:
          token = response.headers.get('x-Auth-Token');
          if (token) {
            _context.next = 13;
            break;
          }
          throw new Error('No x-Auth-Token found in response headers.');
        case 13:
          _context.next = 15;
          return extBrowser.storage.local.set({
            timetrackerAuthToken: token
          });
        case 15:
          console.log('loginToTimetracker: Received token:', token);
          return _context.abrupt("return", token);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _loginToTimetracker.apply(this, arguments);
}
function getCurrentUser() {
  return _getCurrentUser.apply(this, arguments);
}
/**
 * Retrieves projects for the given user ID.
 */
function _getCurrentUser() {
  _getCurrentUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var result, timetrackerAuthToken, response, user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return extBrowser.storage.local.get('timetrackerAuthToken');
        case 2:
          result = _context2.sent;
          timetrackerAuthToken = result.timetrackerAuthToken;
          if (timetrackerAuthToken) {
            _context2.next = 6;
            break;
          }
          throw new Error('NO_TOKEN');
        case 6:
          _context2.next = 8;
          return fetch("".concat(TIMETRACKER_BASE_URL, "/users/current"), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'x-auth-token': timetrackerAuthToken
            }
          });
        case 8:
          response = _context2.sent;
          if (!(response.status === 401)) {
            _context2.next = 11;
            break;
          }
          throw new Error('TOKEN_INVALID');
        case 11:
          if (response.ok) {
            _context2.next = 13;
            break;
          }
          throw new Error('Failed to fetch current user');
        case 13:
          _context2.next = 15;
          return response.json();
        case 15:
          user = _context2.sent;
          console.log('getCurrentUser: user object:', user);
          return _context2.abrupt("return", user);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getCurrentUser.apply(this, arguments);
}
function getProjectsForUser(_x3) {
  return _getProjectsForUser.apply(this, arguments);
}
/**
 * Returns an object with the current user and their projects.
 */
function _getProjectsForUser() {
  _getProjectsForUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(personId) {
    var result, timetrackerAuthToken, url, response, projects;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return extBrowser.storage.local.get('timetrackerAuthToken');
        case 2:
          result = _context3.sent;
          timetrackerAuthToken = result.timetrackerAuthToken;
          if (timetrackerAuthToken) {
            _context3.next = 6;
            break;
          }
          throw new Error('NO_TOKEN');
        case 6:
          url = "".concat(TIMETRACKER_BASE_URL, "/projects?isActive=true&personId=").concat(personId);
          console.log('getProjectsForUser: requesting', url);
          _context3.next = 10;
          return fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'x-auth-token': timetrackerAuthToken
            }
          });
        case 10:
          response = _context3.sent;
          if (!(response.status === 401)) {
            _context3.next = 13;
            break;
          }
          throw new Error('TOKEN_INVALID');
        case 13:
          if (response.ok) {
            _context3.next = 15;
            break;
          }
          throw new Error('Failed to fetch projects');
        case 15:
          _context3.next = 17;
          return response.json();
        case 17:
          projects = _context3.sent;
          console.log('getProjectsForUser: projects count =', projects.length);
          return _context3.abrupt("return", projects);
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getProjectsForUser.apply(this, arguments);
}
function getProjects() {
  return _getProjects.apply(this, arguments);
}
/**
 * Creates a new Timetracker task.
 */
function _getProjects() {
  _getProjects = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var user, projects;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return getCurrentUser();
        case 2:
          user = _context4.sent;
          _context4.next = 5;
          return getProjectsForUser(user.id);
        case 5:
          projects = _context4.sent;
          return _context4.abrupt("return", {
            user: user,
            projects: projects
          });
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getProjects.apply(this, arguments);
}
function doCreateTask(_x4, _x5, _x6) {
  return _doCreateTask.apply(this, arguments);
}
/**
 * Finds a Timetracker task by name for a given user.
 */
function _doCreateTask() {
  _doCreateTask = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(issueKey, issueSummary, project) {
    var result, timetrackerAuthToken, postData, response, _errorResponse$0$mess, errorResponse, errorText, data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return extBrowser.storage.local.get('timetrackerAuthToken');
        case 2:
          result = _context5.sent;
          timetrackerAuthToken = result.timetrackerAuthToken;
          if (timetrackerAuthToken) {
            _context5.next = 6;
            break;
          }
          throw new Error('NO_TOKEN');
        case 6:
          postData = {
            name: "".concat(issueKey, " - ").concat(issueSummary),
            type: 'development',
            project: project
          };
          console.log('doCreateTask: Creating task with payload:', postData);
          _context5.next = 10;
          return fetch(TIMETRACKER_TASKS_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Accept': 'application/json, text/plain, */*',
              'x-auth-token': timetrackerAuthToken
            },
            body: JSON.stringify(postData)
          });
        case 10:
          response = _context5.sent;
          if (!(response.status === 401)) {
            _context5.next = 13;
            break;
          }
          throw new Error('TOKEN_INVALID');
        case 13:
          if (!(response.status === 400)) {
            _context5.next = 23;
            break;
          }
          _context5.next = 16;
          return response.json();
        case 16:
          errorResponse = _context5.sent;
          console.error('doCreateTask: 400 error:', errorResponse);
          if (!(Array.isArray(errorResponse) && errorResponse.length > 0 && ((_errorResponse$0$mess = errorResponse[0].message) === null || _errorResponse$0$mess === void 0 ? void 0 : _errorResponse$0$mess.code) === 'taskDuplicateKey')) {
            _context5.next = 22;
            break;
          }
          throw new Error('Task already exists in Timetracker!');
        case 22:
          throw new Error(JSON.stringify(errorResponse));
        case 23:
          if (response.ok) {
            _context5.next = 29;
            break;
          }
          _context5.next = 26;
          return response.text();
        case 26:
          errorText = _context5.sent;
          console.error('doCreateTask: error text:', errorText);
          throw new Error(errorText);
        case 29:
          _context5.next = 31;
          return response.json();
        case 31:
          data = _context5.sent;
          console.log('doCreateTask: (Partial) task created:', data);
          return _context5.abrupt("return", data);
        case 34:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _doCreateTask.apply(this, arguments);
}
function findTaskByName(_x7, _x8) {
  return _findTaskByName.apply(this, arguments);
}
/**
 * Builds an array of roles from a roles array.
 */
function _findTaskByName() {
  _findTaskByName = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(taskName, personId) {
    var result, timetrackerAuthToken, encodedName, url, response, resultData;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return extBrowser.storage.local.get('timetrackerAuthToken');
        case 2:
          result = _context6.sent;
          timetrackerAuthToken = result.timetrackerAuthToken;
          if (timetrackerAuthToken) {
            _context6.next = 6;
            break;
          }
          throw new Error('NO_TOKEN');
        case 6:
          encodedName = encodeURIComponent(taskName);
          url = "".concat(TIMETRACKER_BASE_URL, "/calendar/tasks/actions/findByName/").concat(encodedName, "?selectedPersonId=").concat(personId);
          console.log('findTaskByName: GET', url);
          _context6.next = 11;
          return fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'x-auth-token': timetrackerAuthToken
            }
          });
        case 11:
          response = _context6.sent;
          if (!(response.status === 401)) {
            _context6.next = 14;
            break;
          }
          throw new Error('TOKEN_INVALID');
        case 14:
          if (response.ok) {
            _context6.next = 16;
            break;
          }
          throw new Error('Failed to find task by name');
        case 16:
          _context6.next = 18;
          return response.json();
        case 18:
          resultData = _context6.sent;
          console.log('findTaskByName: result =', resultData);
          return _context6.abrupt("return", resultData);
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _findTaskByName.apply(this, arguments);
}
function buildRoles(rolesArray) {
  var bitMask = "01";
  var userRoles = {};
  for (var i = 0; i < rolesArray.length; i++) {
    var role = rolesArray[i];
    var intCode = parseInt(bitMask, 2);
    userRoles[role] = {
      bitMask: intCode,
      title: role
    };
    bitMask = (intCode << 1).toString(2);
  }
  return Object.values(userRoles);
}

/**
 * Creates a worklog entry.
 */
function createWorklog(_x9, _x10, _x11, _x12, _x13) {
  return _createWorklog.apply(this, arguments);
} // Listen for messages from content scripts or the UI.
function _createWorklog() {
  _createWorklog = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(taskFromContent, startTime, endTime, comment, userFromContent) {
    var result, timetrackerAuthToken, finalPerson, finalTask, bodyData, url, response, errorText, responseText, data;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return extBrowser.storage.local.get('timetrackerAuthToken');
        case 2:
          result = _context7.sent;
          timetrackerAuthToken = result.timetrackerAuthToken;
          if (timetrackerAuthToken) {
            _context7.next = 6;
            break;
          }
          throw new Error('NO_TOKEN');
        case 6:
          finalPerson = {
            id: userFromContent.id,
            fullName: userFromContent.fullName,
            firstName: userFromContent.firstName,
            lastName: userFromContent.lastName,
            roles: buildRoles(userFromContent.roles || []),
            startDate: userFromContent.startDate || null,
            endDate: userFromContent.endDate || null
          };
          finalTask = {
            id: taskFromContent.id,
            name: taskFromContent.name,
            type: taskFromContent.type,
            project: taskFromContent.project,
            isActive: taskFromContent.isActive,
            hasWorklogs: taskFromContent.hasWorklogs,
            isCommentRequired: taskFromContent.isCommentRequired,
            estimateDevel: taskFromContent.estimateDevel || 0,
            estimateAnal: taskFromContent.estimateAnal || 0,
            estimateTest: taskFromContent.estimateTest || 0,
            estimateBuffer: taskFromContent.estimateBuffer || 0,
            estimateGeneral: taskFromContent.estimateGeneral || 0,
            generalDuration: taskFromContent.generalDuration,
            generalDurationHours: taskFromContent.generalDurationHours,
            firstInGroup: taskFromContent.firstInGroup
          };
          bodyData = {
            startTime: startTime,
            endTime: endTime,
            comment: comment || '',
            isPlanlog: false,
            task: finalTask,
            person: finalPerson
          };
          console.log('createWorklog: final payload =>', bodyData);
          url = "".concat(TIMETRACKER_BASE_URL, "/calendar/worklogs");
          _context7.next = 13;
          return fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Accept': 'application/json, text/plain, */*',
              'x-auth-token': timetrackerAuthToken
            },
            body: JSON.stringify(bodyData)
          });
        case 13:
          response = _context7.sent;
          if (!(response.status === 401)) {
            _context7.next = 16;
            break;
          }
          throw new Error('TOKEN_INVALID');
        case 16:
          if (response.ok) {
            _context7.next = 22;
            break;
          }
          _context7.next = 19;
          return response.text();
        case 19:
          errorText = _context7.sent;
          console.error('createWorklog: error text:', errorText);
          throw new Error(errorText);
        case 22:
          _context7.next = 24;
          return response.text();
        case 24:
          responseText = _context7.sent;
          data = {};
          try {
            data = responseText ? JSON.parse(responseText) : {};
          } catch (e) {
            console.error('createWorklog: JSON parse error:', e);
          }
          console.log('createWorklog: success response:', data);
          return _context7.abrupt("return", data);
        case 29:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _createWorklog.apply(this, arguments);
}
extBrowser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('background.js - onMessage:', request);
  if (request.action === 'GET_PROJECTS_AND_USER') {
    getProjects().then(function (_ref) {
      var user = _ref.user,
        projects = _ref.projects;
      sendResponse({
        success: true,
        user: user,
        projects: projects
      });
      console.log('GET_PROJECTS_AND_USER success:', user, projects);
    })["catch"](function (err) {
      console.error('GET_PROJECTS_AND_USER error:', err);
      var msg = getErrorMessage(err);
      if (msg === 'NO_TOKEN' || msg === 'TOKEN_INVALID') {
        sendResponse({
          success: false,
          needCredentials: true
        });
      } else {
        sendResponse({
          success: false,
          error: msg
        });
      }
    });
    return true;
  }
  if (request.action === 'LOGIN') {
    var _request$payload = request.payload,
      username = _request$payload.username,
      password = _request$payload.password;
    loginToTimetracker(username, password).then(function () {
      return getProjects();
    }).then(function (_ref2) {
      var user = _ref2.user,
        projects = _ref2.projects;
      sendResponse({
        success: true,
        user: user,
        projects: projects
      });
    })["catch"](function (err) {
      console.error('LOGIN error:', err);
      var msg = getErrorMessage(err);
      sendResponse({
        success: false,
        error: msg
      });
    });
    return true;
  }
  if (request.action === 'FIND_TASK_BY_NAME') {
    var _request$payload2 = request.payload,
      taskName = _request$payload2.taskName,
      personId = _request$payload2.personId;
    findTaskByName(taskName, personId).then(function (result) {
      return sendResponse({
        success: true,
        data: result
      });
    })["catch"](function (err) {
      console.error('FIND_TASK_BY_NAME error:', err);
      var msg = getErrorMessage(err);
      if (msg === 'NO_TOKEN' || msg === 'TOKEN_INVALID') {
        sendResponse({
          success: false,
          needCredentials: true
        });
      } else {
        sendResponse({
          success: false,
          error: msg
        });
      }
    });
    return true;
  }
  if (request.action === 'CREATE_TIMETRACKER_TASK') {
    var _request$payload3 = request.payload,
      issueKey = _request$payload3.issueKey,
      issueSummary = _request$payload3.issueSummary,
      project = _request$payload3.project;
    doCreateTask(issueKey, issueSummary, project).then(function (partialTask) {
      sendResponse({
        success: true,
        data: partialTask
      });
    })["catch"](function (err) {
      console.error('CREATE_TIMETRACKER_TASK error:', err);
      var msg = getErrorMessage(err);
      if (msg === 'NO_TOKEN' || msg === 'TOKEN_INVALID') {
        sendResponse({
          success: false,
          needCredentials: true
        });
      } else {
        sendResponse({
          success: false,
          error: msg
        });
      }
    });
    return true;
  }
  if (request.action === 'CREATE_WORKLOG') {
    var _request$payload4 = request.payload,
      task = _request$payload4.task,
      startTime = _request$payload4.startTime,
      endTime = _request$payload4.endTime,
      comment = _request$payload4.comment,
      person = _request$payload4.person;
    createWorklog(task, startTime, endTime, comment, person).then(function (result) {
      sendResponse({
        success: true,
        data: result
      });
    })["catch"](function (err) {
      console.error('CREATE_WORKLOG error:', err);
      var msg = getErrorMessage(err);
      if (msg === 'NO_TOKEN' || msg === 'TOKEN_INVALID') {
        sendResponse({
          success: false,
          needCredentials: true
        });
      } else {
        sendResponse({
          success: false,
          error: msg
        });
      }
    });
    return true;
  }
});
/******/ })()
;
//# sourceMappingURL=background.js.map