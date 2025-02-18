/*! For license information please see background.js.LICENSE.txt */
(()=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(){"use strict";t=function(){return n};var r,n={},o=Object.prototype,a=o.hasOwnProperty,s=Object.defineProperty||function(e,t,r){e[t]=r.value},c="function"==typeof Symbol?Symbol:{},i=c.iterator||"@@iterator",u=c.asyncIterator||"@@asyncIterator",l=c.toStringTag||"@@toStringTag";function f(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{f({},"")}catch(r){f=function(e,t,r){return e[t]=r}}function h(e,t,r,n){var o=t&&t.prototype instanceof k?t:k,a=Object.create(o.prototype),c=new S(n||[]);return s(a,"_invoke",{value:_(e,r,c)}),a}function p(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}n.wrap=h;var d="suspendedStart",m="suspendedYield",y="executing",g="completed",v={};function k(){}function w(){}function x(){}var T={};f(T,i,(function(){return this}));var E=Object.getPrototypeOf,b=E&&E(E(K([])));b&&b!==o&&a.call(b,i)&&(T=b);var N=x.prototype=k.prototype=Object.create(T);function O(e){["next","throw","return"].forEach((function(t){f(e,t,(function(e){return this._invoke(t,e)}))}))}function A(t,r){function n(o,s,c,i){var u=p(t[o],t,s);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==e(f)&&a.call(f,"__await")?r.resolve(f.__await).then((function(e){n("next",e,c,i)}),(function(e){n("throw",e,c,i)})):r.resolve(f).then((function(e){l.value=e,c(l)}),(function(e){return n("throw",e,c,i)}))}i(u.arg)}var o;s(this,"_invoke",{value:function(e,t){function a(){return new r((function(r,o){n(e,t,r,o)}))}return o=o?o.then(a,a):a()}})}function _(e,t,n){var o=d;return function(a,s){if(o===y)throw Error("Generator is already running");if(o===g){if("throw"===a)throw s;return{value:r,done:!0}}for(n.method=a,n.arg=s;;){var c=n.delegate;if(c){var i=j(c,n);if(i){if(i===v)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===d)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var u=p(e,t,n);if("normal"===u.type){if(o=n.done?g:m,u.arg===v)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=g,n.method="throw",n.arg=u.arg)}}}function j(e,t){var n=t.method,o=e.iterator[n];if(o===r)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=r,j(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),v;var a=p(o,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,v;var s=a.arg;return s?s.done?(t[e.resultName]=s.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,v):s:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,v)}function L(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function I(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function S(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(L,this),this.reset(!0)}function K(t){if(t||""===t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,s=function e(){for(;++o<t.length;)if(a.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=r,e.done=!0,e};return s.next=s}}throw new TypeError(e(t)+" is not iterable")}return w.prototype=x,s(N,"constructor",{value:x,configurable:!0}),s(x,"constructor",{value:w,configurable:!0}),w.displayName=f(x,l,"GeneratorFunction"),n.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===w||"GeneratorFunction"===(t.displayName||t.name))},n.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,x):(e.__proto__=x,f(e,l,"GeneratorFunction")),e.prototype=Object.create(N),e},n.awrap=function(e){return{__await:e}},O(A.prototype),f(A.prototype,u,(function(){return this})),n.AsyncIterator=A,n.async=function(e,t,r,o,a){void 0===a&&(a=Promise);var s=new A(h(e,t,r,o),a);return n.isGeneratorFunction(t)?s:s.next().then((function(e){return e.done?e.value:s.next()}))},O(N),f(N,l,"Generator"),f(N,i,(function(){return this})),f(N,"toString",(function(){return"[object Generator]"})),n.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},n.values=K,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(I),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,o){return c.type="throw",c.arg=e,t.next=n,o&&(t.method="next",t.arg=r),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var s=this.tryEntries[o],c=s.completion;if("root"===s.tryLoc)return n("end");if(s.tryLoc<=this.prev){var i=a.call(s,"catchLoc"),u=a.call(s,"finallyLoc");if(i&&u){if(this.prev<s.catchLoc)return n(s.catchLoc,!0);if(this.prev<s.finallyLoc)return n(s.finallyLoc)}else if(i){if(this.prev<s.catchLoc)return n(s.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return n(s.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var s=o?o.completion:{};return s.type=e,s.arg=t,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(s)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),I(r),v}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;I(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:K(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),v}},n}function r(e,t,r,n,o,a,s){try{var c=e[a](s),i=c.value}catch(e){return void r(e)}c.done?t(i):Promise.resolve(i).then(n,o)}function n(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var s=e.apply(t,n);function c(e){r(s,o,a,c,i,"next",e)}function i(e){r(s,o,a,c,i,"throw",e)}c(void 0)}))}}var o="undefined"!=typeof browser?browser:chrome,a="https://timetracker.iglu.ee/api",s="".concat(a,"/login"),c="".concat(a,"/tasks");function i(e){return e instanceof Error?e.message:String(e)}function u(){return(u=n(t().mark((function e(){var r,n;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.storage.local.get("timetrackerAuthToken");case 3:if(!e.sent.timetrackerAuthToken){e.next=6;break}return e.abrupt("return",!0);case 6:return e.next=8,o.storage.sync.get(["timetrackerUsername","timetrackerPassword"]);case 8:if((r=e.sent).timetrackerUsername&&r.timetrackerPassword){e.next=11;break}return e.abrupt("return",!1);case 11:return e.next=13,l(r.timetrackerUsername,r.timetrackerPassword);case 13:return n=e.sent,e.abrupt("return",Boolean(n));case 17:return e.prev=17,e.t0=e.catch(0),console.error("Auto-login failed:",e.t0),e.abrupt("return",!1);case 21:case"end":return e.stop()}}),e,null,[[0,17]])})))).apply(this,arguments)}function l(e,t){return f.apply(this,arguments)}function f(){return(f=n(t().mark((function e(r,n){var a,c,i;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("loginToTimetracker: Attempting login for",r),e.next=3,fetch(s,{method:"POST",headers:{"Content-Type":"application/json;charset=UTF-8"},body:JSON.stringify({username:r,password:n})});case 3:if((a=e.sent).ok){e.next=12;break}if(401!==a.status){e.next=7;break}throw new Error("Invalid username or password");case 7:return e.next=9,a.text();case 9:throw c=e.sent,console.error("loginToTimetracker error:",c),new Error("Login failed: ".concat(c));case 12:if(i=a.headers.get("x-Auth-Token")){e.next=15;break}throw new Error("No x-Auth-Token found in response headers.");case 15:return e.next=17,o.storage.local.set({timetrackerAuthToken:i});case 17:return console.log("loginToTimetracker: Received token:",i),e.abrupt("return",i);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function h(){return p.apply(this,arguments)}function p(){return(p=n(t().mark((function e(){var r,n,s,c;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.storage.local.get("timetrackerAuthToken");case 2:if(r=e.sent,n=r.timetrackerAuthToken){e.next=6;break}throw new Error("NO_TOKEN");case 6:return e.next=8,fetch("".concat(a,"/users/current"),{method:"GET",headers:{"Content-Type":"application/json;charset=UTF-8","x-auth-token":n}});case 8:if(401!==(s=e.sent).status){e.next=11;break}throw new Error("TOKEN_INVALID");case 11:if(s.ok){e.next=13;break}throw new Error("Failed to fetch current user");case 13:return e.next=15,s.json();case 15:return c=e.sent,console.log("getCurrentUser: user object:",c),e.abrupt("return",c);case 18:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(e){return m.apply(this,arguments)}function m(){return(m=n(t().mark((function e(r){var n,s,c,i,u;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.storage.local.get("timetrackerAuthToken");case 2:if(n=e.sent,s=n.timetrackerAuthToken){e.next=6;break}throw new Error("NO_TOKEN");case 6:return c="".concat(a,"/projects?isActive=true&personId=").concat(r),console.log("getProjectsForUser: requesting",c),e.next=10,fetch(c,{method:"GET",headers:{"Content-Type":"application/json;charset=UTF-8","x-auth-token":s}});case 10:if(401!==(i=e.sent).status){e.next=13;break}throw new Error("TOKEN_INVALID");case 13:if(i.ok){e.next=15;break}throw new Error("Failed to fetch projects");case 15:return e.next=17,i.json();case 17:return u=e.sent,console.log("getProjectsForUser: projects count =",u.length),e.abrupt("return",u);case 20:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(){return g.apply(this,arguments)}function g(){return(g=n(t().mark((function e(){var r,n;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:return r=e.sent,e.next=5,d(r.id);case 5:return n=e.sent,e.abrupt("return",{user:r,projects:n});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(){return(v=n(t().mark((function e(r,n,a){var s,i,u,l,f,h,p,d;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.storage.local.get("timetrackerAuthToken");case 2:if(s=e.sent,i=s.timetrackerAuthToken){e.next=6;break}throw new Error("NO_TOKEN");case 6:return u={name:"".concat(r," - ").concat(n),type:"development",project:a},console.log("doCreateTask: Creating task with payload:",u),e.next=10,fetch(c,{method:"POST",headers:{"Content-Type":"application/json;charset=UTF-8",Accept:"application/json, text/plain, */*","x-auth-token":i},body:JSON.stringify(u)});case 10:if(401!==(l=e.sent).status){e.next=13;break}throw new Error("TOKEN_INVALID");case 13:if(400!==l.status){e.next=23;break}return e.next=16,l.json();case 16:if(h=e.sent,console.error("doCreateTask: 400 error:",h),!(Array.isArray(h)&&h.length>0&&"taskDuplicateKey"===(null===(f=h[0].message)||void 0===f?void 0:f.code))){e.next=22;break}throw new Error("Task already exists in Timetracker!");case 22:throw new Error(JSON.stringify(h));case 23:if(l.ok){e.next=29;break}return e.next=26,l.text();case 26:throw p=e.sent,console.error("doCreateTask: error text:",p),new Error(p);case 29:return e.next=31,l.json();case 31:return d=e.sent,console.log("doCreateTask: (Partial) task created:",d),e.abrupt("return",d);case 34:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(){return(k=n(t().mark((function e(r,n){var s,c,i,u,l,f,h;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.storage.local.get("timetrackerAuthToken");case 2:if(s=e.sent,c=s.timetrackerAuthToken){e.next=6;break}throw new Error("NO_TOKEN");case 6:return i=r.split(" - ")[0].trim(),u=encodeURIComponent(i),l="".concat(a,"/calendar/tasks/actions/findByName/").concat(u,"?selectedPersonId=").concat(n),console.log("findTaskByName: GET",l),e.next=12,fetch(l,{method:"GET",headers:{"Content-Type":"application/json;charset=UTF-8","x-auth-token":c}});case 12:if(401!==(f=e.sent).status){e.next=15;break}throw new Error("TOKEN_INVALID");case 15:if(f.ok){e.next=17;break}throw new Error("Failed to find task by name");case 17:return e.next=19,f.json();case 19:return h=e.sent,console.log("findTaskByName: result =",h),e.abrupt("return",h);case 22:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e){for(var t="01",r={},n=0;n<e.length;n++){var o=e[n],a=parseInt(t,2);r[o]={bitMask:a,title:o},t=(a<<1).toString(2)}return Object.values(r)}function x(){return(x=n(t().mark((function e(r,n,s,c,i){var u,l,f,h,p,d,m,y,g,v,k,x;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.storage.local.get("timetrackerAuthToken");case 2:if(u=e.sent,l=u.timetrackerAuthToken){e.next=6;break}throw new Error("NO_TOKEN");case 6:return f={id:i.id,fullName:i.fullName,firstName:i.firstName,lastName:i.lastName,roles:w(i.roles||[]),startDate:i.startDate||null,endDate:i.endDate||null},h={id:r.id,name:r.name,type:r.type,project:r.project,isActive:r.isActive,hasWorklogs:r.hasWorklogs,isCommentRequired:r.isCommentRequired,estimateDevel:r.estimateDevel||0,estimateAnal:r.estimateAnal||0,estimateTest:r.estimateTest||0,estimateBuffer:r.estimateBuffer||0,estimateGeneral:r.estimateGeneral||0,generalDuration:r.generalDuration,generalDurationHours:r.generalDurationHours,firstInGroup:r.firstInGroup},p={startTime:n,endTime:s,comment:c||"",isPlanlog:!1,task:h,person:f},console.log("createWorklog: final payload =>",p),d="".concat(a,"/calendar/worklogs"),e.next=13,fetch(d,{method:"POST",headers:{"Content-Type":"application/json;charset=UTF-8",Accept:"application/json, text/plain, */*","x-auth-token":l},body:JSON.stringify(p)});case 13:if(401!==(m=e.sent).status){e.next=16;break}throw new Error("TOKEN_INVALID");case 16:if(m.ok){e.next=34;break}return e.next=19,m.text();case 19:if(y=e.sent,console.error("createWorklog: error text:",y),e.prev=21,v=JSON.parse(y),!Array.isArray(v)||null===(g=v[0])||void 0===g||null===(g=g.message)||void 0===g||!g.code){e.next=27;break}if("worklogConcurrentWorklogs"!==v[0].message.code){e.next=27;break}return e.abrupt("return",Promise.reject(new Error("Worklog already exists for the specified time period.")));case 27:return e.abrupt("return",Promise.reject(new Error("Unknown error format received.")));case 30:return e.prev=30,e.t0=e.catch(21),console.error("createWorklog: Failed to parse error response:",e.t0),e.abrupt("return",Promise.reject(new Error("Failed to parse error response")));case 34:return e.next=36,m.text();case 36:k=e.sent,x={};try{x=k?JSON.parse(k):{}}catch(e){console.error("createWorklog: JSON parse error:",e)}return console.log("createWorklog: success response:",x),e.abrupt("return",x);case 41:case"end":return e.stop()}}),e,null,[[21,30]])})))).apply(this,arguments)}o.runtime.onMessage.addListener((function(e,t,r){if(console.log("background.js - onMessage:",e),"GET_PROJECTS_AND_USER"===e.action)return function(){return u.apply(this,arguments)}().then((function(e){if(e)return y();throw new Error("NO_TOKEN")})).then((function(e){var t=e.user,n=e.projects;r({success:!0,user:t,projects:n})})).catch((function(e){console.error("GET_PROJECTS_AND_USER error:",e.message),"NO_TOKEN"===e.message||"TOKEN_INVALID"===e.message?r({success:!1,needCredentials:!0}):r({success:!1,error:e.message})})),!0;if("LOGIN"===e.action){var n=e.payload;return l(n.username,n.password).then((function(){return y()})).then((function(e){var t=e.user,n=e.projects;r({success:!0,user:t,projects:n})})).catch((function(e){console.error("LOGIN error:",e);var t=i(e);r({success:!1,error:t})})),!0}if("FIND_TASK_BY_NAME"===e.action){var o=e.payload;return function(e,t){return k.apply(this,arguments)}(o.taskName,o.personId).then((function(e){return r({success:!0,data:e})})).catch((function(e){console.error("FIND_TASK_BY_NAME error:",e);var t=i(e);r("NO_TOKEN"===t||"TOKEN_INVALID"===t?{success:!1,needCredentials:!0}:{success:!1,error:t})})),!0}if("CREATE_TIMETRACKER_TASK"===e.action){var a=e.payload;return function(e,t,r){return v.apply(this,arguments)}(a.issueKey,a.issueSummary,a.project).then((function(e){r({success:!0,data:e})})).catch((function(e){console.error("CREATE_TIMETRACKER_TASK error:",e);var t=i(e);r("NO_TOKEN"===t||"TOKEN_INVALID"===t?{success:!1,needCredentials:!0}:{success:!1,error:t})})),!0}if("CREATE_WORKLOG"===e.action){var s=e.payload;return function(e,t,r,n,o){return x.apply(this,arguments)}(s.task,s.startTime,s.endTime,s.comment,s.person).then((function(e){r({success:!0,data:e})})).catch((function(e){console.error("CREATE_WORKLOG error:",e);var t=i(e);r("NO_TOKEN"===t||"TOKEN_INVALID"===t?{success:!1,needCredentials:!0}:{success:!1,error:t})})),!0}}))})();
//# sourceMappingURL=background.js.map