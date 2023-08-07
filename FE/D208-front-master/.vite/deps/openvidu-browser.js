import {
  require_inherits_browser
} from "./chunk-ZU34JA6A.js";
import {
  __commonJS
} from "./chunk-ROME4SDB.js";

// node_modules/jsnlog/jsnlog.js
var require_jsnlog = __commonJS({
  "node_modules/jsnlog/jsnlog.js"(exports) {
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    function JL(loggerName) {
      if (!loggerName) {
        return JL.__;
      }
      if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(callback, initialValue) {
          var previousValue = initialValue;
          for (var i = 0; i < this.length; i++) {
            previousValue = callback(previousValue, this[i], i, this);
          }
          return previousValue;
        };
      }
      var accumulatedLoggerName = "";
      var logger = ("." + loggerName).split(".").reduce(function(prev, curr, idx, arr) {
        if (accumulatedLoggerName) {
          accumulatedLoggerName += "." + curr;
        } else {
          accumulatedLoggerName = curr;
        }
        var currentLogger = prev["__" + accumulatedLoggerName];
        if (currentLogger === void 0) {
          JL.Logger.prototype = prev;
          currentLogger = new JL.Logger(accumulatedLoggerName);
          prev["__" + accumulatedLoggerName] = currentLogger;
        }
        return currentLogger;
      }, JL.__);
      return logger;
    }
    (function(JL2) {
      JL2.requestId = "";
      JL2.entryId = 0;
      JL2._createXMLHttpRequest = function() {
        return new XMLHttpRequest();
      };
      JL2._getTime = function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
      JL2._console = console;
      JL2._appenderNames = [];
      function copyProperty(propertyName, from, to) {
        if (from[propertyName] === void 0) {
          return;
        }
        if (from[propertyName] === null) {
          delete to[propertyName];
          return;
        }
        to[propertyName] = from[propertyName];
      }
      function allow(filters) {
        if (!(JL2.enabled == null)) {
          if (!JL2.enabled) {
            return false;
          }
        }
        try {
          if (filters.userAgentRegex) {
            if (!new RegExp(filters.userAgentRegex).test(navigator.userAgent)) {
              return false;
            }
          }
        } catch (e) {
        }
        try {
          if (filters.ipRegex && JL2.clientIP) {
            if (!new RegExp(filters.ipRegex).test(JL2.clientIP)) {
              return false;
            }
          }
        } catch (e) {
        }
        return true;
      }
      function allowMessage(filters, message) {
        try {
          if (filters.disallow) {
            if (new RegExp(filters.disallow).test(message)) {
              return false;
            }
          }
        } catch (e) {
        }
        return true;
      }
      function stringifyLogObjectFunction(logObject) {
        if (typeof logObject == "function") {
          if (logObject instanceof RegExp) {
            return logObject.toString();
          } else {
            return logObject();
          }
        }
        return logObject;
      }
      var StringifiedLogObject = (
        /** @class */
        function() {
          function StringifiedLogObject2(msg, meta, finalString) {
            this.msg = msg;
            this.meta = meta;
            this.finalString = finalString;
          }
          return StringifiedLogObject2;
        }()
      );
      function stringifyLogObject(logObject) {
        var actualLogObject = stringifyLogObjectFunction(logObject);
        var finalString;
        switch (typeof actualLogObject) {
          case "string":
            return new StringifiedLogObject(actualLogObject, null, actualLogObject);
          case "number":
            finalString = actualLogObject.toString();
            return new StringifiedLogObject(finalString, null, finalString);
          case "boolean":
            finalString = actualLogObject.toString();
            return new StringifiedLogObject(finalString, null, finalString);
          case "undefined":
            return new StringifiedLogObject("undefined", null, "undefined");
          case "object":
            if (actualLogObject instanceof RegExp || actualLogObject instanceof String || actualLogObject instanceof Number || actualLogObject instanceof Boolean) {
              finalString = actualLogObject.toString();
              return new StringifiedLogObject(finalString, null, finalString);
            } else {
              if (typeof JL2.serialize === "function") {
                finalString = JL2.serialize.call(this, actualLogObject);
              } else {
                finalString = JSON.stringify(actualLogObject);
              }
              return new StringifiedLogObject("", actualLogObject, finalString);
            }
          default:
            return new StringifiedLogObject("unknown", null, "unknown");
        }
      }
      function setOptions(options) {
        copyProperty("enabled", options, this);
        copyProperty("maxMessages", options, this);
        copyProperty("defaultAjaxUrl", options, this);
        copyProperty("clientIP", options, this);
        copyProperty("requestId", options, this);
        copyProperty("defaultBeforeSend", options, this);
        copyProperty("serialize", options, this);
        return this;
      }
      JL2.setOptions = setOptions;
      function getAllLevel() {
        return -2147483648;
      }
      JL2.getAllLevel = getAllLevel;
      function getTraceLevel() {
        return 1e3;
      }
      JL2.getTraceLevel = getTraceLevel;
      function getDebugLevel() {
        return 2e3;
      }
      JL2.getDebugLevel = getDebugLevel;
      function getInfoLevel() {
        return 3e3;
      }
      JL2.getInfoLevel = getInfoLevel;
      function getWarnLevel() {
        return 4e3;
      }
      JL2.getWarnLevel = getWarnLevel;
      function getErrorLevel() {
        return 5e3;
      }
      JL2.getErrorLevel = getErrorLevel;
      function getFatalLevel() {
        return 6e3;
      }
      JL2.getFatalLevel = getFatalLevel;
      function getOffLevel() {
        return 2147483647;
      }
      JL2.getOffLevel = getOffLevel;
      function levelToString(level) {
        if (level <= 1e3) {
          return "trace";
        }
        if (level <= 2e3) {
          return "debug";
        }
        if (level <= 3e3) {
          return "info";
        }
        if (level <= 4e3) {
          return "warn";
        }
        if (level <= 5e3) {
          return "error";
        }
        return "fatal";
      }
      var Exception = (
        /** @class */
        function() {
          function Exception2(data, inner) {
            this.inner = inner;
            this.name = "JL.Exception";
            this.message = stringifyLogObject(data).finalString;
          }
          return Exception2;
        }()
      );
      JL2.Exception = Exception;
      Exception.prototype = new Error();
      var LogItem = (
        /** @class */
        function() {
          function LogItem2(l, m, n, t, u) {
            this.l = l;
            this.m = m;
            this.n = n;
            this.t = t;
            this.u = u;
          }
          return LogItem2;
        }()
      );
      JL2.LogItem = LogItem;
      function newLogItem(levelNbr, message, loggerName) {
        JL2.entryId++;
        return new LogItem(levelNbr, message, loggerName, JL2._getTime(), JL2.entryId);
      }
      function clearTimer(timer) {
        if (timer.id) {
          clearTimeout(timer.id);
          timer.id = null;
        }
      }
      function setTimer(timer, timeoutMs, callback) {
        var that = this;
        if (!timer.id) {
          timer.id = setTimeout(function() {
            callback.call(that);
          }, timeoutMs);
        }
      }
      var Appender = (
        /** @class */
        function() {
          function Appender2(appenderName, sendLogItems) {
            this.appenderName = appenderName;
            this.sendLogItems = sendLogItems;
            this.level = JL2.getTraceLevel();
            this.sendWithBufferLevel = 2147483647;
            this.storeInBufferLevel = -2147483648;
            this.bufferSize = 0;
            this.batchSize = 1;
            this.maxBatchSize = 20;
            this.batchTimeout = 2147483647;
            this.sendTimeout = 5e3;
            this.buffer = [];
            this.batchBuffer = [];
            this.batchTimeoutTimer = { id: null };
            this.sendTimeoutTimer = { id: null };
            this.nbrLogItemsSkipped = 0;
            this.nbrLogItemsBeingSent = 0;
            var emptyNameErrorMessage = "Trying to create an appender without a name or with an empty name";
            if (appenderName == void 0) {
              throw emptyNameErrorMessage;
            }
            if (JL2._appenderNames.indexOf(appenderName) != -1) {
              if (!appenderName) {
                throw emptyNameErrorMessage;
              }
              throw "Multiple appenders use the same name " + appenderName;
            }
            JL2._appenderNames.push(appenderName);
          }
          Appender2.prototype.addLogItemsToBuffer = function(logItems) {
            if (this.batchBuffer.length >= this.maxBatchSize) {
              this.nbrLogItemsSkipped += logItems.length;
              return;
            }
            if (!(JL2.maxMessages == null)) {
              if (JL2.maxMessages < 1) {
                return;
              }
              JL2.maxMessages -= logItems.length;
            }
            this.batchBuffer = this.batchBuffer.concat(logItems);
            var that = this;
            setTimer(this.batchTimeoutTimer, this.batchTimeout, function() {
              that.sendBatch.call(that);
            });
          };
          ;
          Appender2.prototype.batchBufferHasOverdueMessages = function() {
            for (var i = 0; i < this.batchBuffer.length; i++) {
              var messageAgeMs = JL2._getTime() - this.batchBuffer[i].t;
              if (messageAgeMs > this.batchTimeout) {
                return true;
              }
            }
            return false;
          };
          Appender2.prototype.batchBufferHasStrandedMessage = function() {
            return !(JL2.maxMessages == null) && JL2.maxMessages < 1 && this.batchBuffer.length > 0;
          };
          Appender2.prototype.sendBatchIfComplete = function() {
            if (this.batchBuffer.length >= this.batchSize || this.batchBufferHasOverdueMessages() || this.batchBufferHasStrandedMessage()) {
              this.sendBatch();
            }
          };
          Appender2.prototype.onSendingEnded = function() {
            clearTimer(this.sendTimeoutTimer);
            this.nbrLogItemsBeingSent = 0;
            this.sendBatchIfComplete();
          };
          Appender2.prototype.setOptions = function(options) {
            copyProperty("level", options, this);
            copyProperty("ipRegex", options, this);
            copyProperty("userAgentRegex", options, this);
            copyProperty("disallow", options, this);
            copyProperty("sendWithBufferLevel", options, this);
            copyProperty("storeInBufferLevel", options, this);
            copyProperty("bufferSize", options, this);
            copyProperty("batchSize", options, this);
            copyProperty("maxBatchSize", options, this);
            copyProperty("batchTimeout", options, this);
            copyProperty("sendTimeout", options, this);
            if (this.bufferSize < this.buffer.length) {
              this.buffer.length = this.bufferSize;
            }
            if (this.maxBatchSize < this.batchSize) {
              throw new JL2.Exception({
                "message": "maxBatchSize cannot be smaller than batchSize",
                "maxBatchSize": this.maxBatchSize,
                "batchSize": this.batchSize
              });
            }
            return this;
          };
          Appender2.prototype.log = function(level, msg, meta, callback, levelNbr, message, loggerName) {
            var logItem;
            if (!allow(this)) {
              return;
            }
            if (!allowMessage(this, message)) {
              return;
            }
            if (levelNbr < this.storeInBufferLevel) {
              return;
            }
            logItem = newLogItem(levelNbr, message, loggerName);
            if (levelNbr < this.level) {
              if (this.bufferSize > 0) {
                this.buffer.push(logItem);
                if (this.buffer.length > this.bufferSize) {
                  this.buffer.shift();
                }
              }
              return;
            }
            this.addLogItemsToBuffer([logItem]);
            if (levelNbr >= this.sendWithBufferLevel) {
              if (this.buffer.length) {
                this.addLogItemsToBuffer(this.buffer);
                this.buffer.length = 0;
              }
            }
            this.sendBatchIfComplete();
          };
          ;
          Appender2.prototype.sendBatch = function() {
            if (this.nbrLogItemsBeingSent > 0) {
              return;
            }
            clearTimer(this.batchTimeoutTimer);
            if (this.batchBuffer.length == 0) {
              return;
            }
            this.nbrLogItemsBeingSent = this.batchBuffer.length;
            var that = this;
            setTimer(this.sendTimeoutTimer, this.sendTimeout, function() {
              that.onSendingEnded.call(that);
            });
            this.sendLogItems(this.batchBuffer, function() {
              that.batchBuffer.splice(0, that.nbrLogItemsBeingSent);
              if (that.nbrLogItemsSkipped > 0) {
                that.batchBuffer.push(newLogItem(getWarnLevel(), "Lost " + that.nbrLogItemsSkipped + " messages. Either connection with the server was down or logging was disabled via the enabled option. Reduce lost messages by increasing the ajaxAppender option maxBatchSize.", that.appenderName));
                that.nbrLogItemsSkipped = 0;
              }
              that.onSendingEnded.call(that);
            });
          };
          return Appender2;
        }()
      );
      JL2.Appender = Appender;
      var AjaxAppender = (
        /** @class */
        function(_super) {
          __extends(AjaxAppender2, _super);
          function AjaxAppender2(appenderName) {
            return _super.call(this, appenderName, AjaxAppender2.prototype.sendLogItemsAjax) || this;
          }
          AjaxAppender2.prototype.setOptions = function(options) {
            copyProperty("url", options, this);
            copyProperty("beforeSend", options, this);
            _super.prototype.setOptions.call(this, options);
            return this;
          };
          AjaxAppender2.prototype.sendLogItemsAjax = function(logItems, successCallback) {
            try {
              if (!allow(this)) {
                return;
              }
              if (this.xhr && this.xhr.readyState != 0 && this.xhr.readyState != 4) {
                this.xhr.abort();
              }
              this.xhr = JL2._createXMLHttpRequest();
              var ajaxUrl = "/jsnlog.logger";
              if (!(JL2.defaultAjaxUrl == null)) {
                ajaxUrl = JL2.defaultAjaxUrl;
              }
              if (this.url) {
                ajaxUrl = this.url;
              }
              this.xhr.open("POST", ajaxUrl);
              this.xhr.setRequestHeader("Content-Type", "application/json");
              this.xhr.setRequestHeader("JSNLog-RequestId", JL2.requestId);
              var that = this;
              this.xhr.onreadystatechange = function() {
                if (that.xhr.readyState == 4 && (that.xhr.status >= 200 && that.xhr.status < 300)) {
                  successCallback();
                }
              };
              var json = {
                r: JL2.requestId,
                lg: logItems
              };
              if (typeof this.beforeSend === "function") {
                this.beforeSend.call(this, this.xhr, json);
              } else if (typeof JL2.defaultBeforeSend === "function") {
                JL2.defaultBeforeSend.call(this, this.xhr, json);
              }
              var finalmsg = JSON.stringify(json);
              this.xhr.send(finalmsg);
            } catch (e) {
            }
          };
          return AjaxAppender2;
        }(Appender)
      );
      JL2.AjaxAppender = AjaxAppender;
      var ConsoleAppender = (
        /** @class */
        function(_super) {
          __extends(ConsoleAppender2, _super);
          function ConsoleAppender2(appenderName) {
            return _super.call(this, appenderName, ConsoleAppender2.prototype.sendLogItemsConsole) || this;
          }
          ConsoleAppender2.prototype.clog = function(logEntry) {
            JL2._console.log(logEntry);
          };
          ConsoleAppender2.prototype.cerror = function(logEntry) {
            if (JL2._console.error) {
              JL2._console.error(logEntry);
            } else {
              this.clog(logEntry);
            }
          };
          ConsoleAppender2.prototype.cwarn = function(logEntry) {
            if (JL2._console.warn) {
              JL2._console.warn(logEntry);
            } else {
              this.clog(logEntry);
            }
          };
          ConsoleAppender2.prototype.cinfo = function(logEntry) {
            if (JL2._console.info) {
              JL2._console.info(logEntry);
            } else {
              this.clog(logEntry);
            }
          };
          ConsoleAppender2.prototype.cdebug = function(logEntry) {
            if (JL2._console.debug) {
              JL2._console.debug(logEntry);
            } else {
              this.cinfo(logEntry);
            }
          };
          ConsoleAppender2.prototype.sendLogItemsConsole = function(logItems, successCallback) {
            try {
              if (!allow(this)) {
                return;
              }
              if (!JL2._console) {
                return;
              }
              var i;
              for (i = 0; i < logItems.length; ++i) {
                var li = logItems[i];
                var msg = li.n + ": " + li.m;
                if (typeof window === "undefined") {
                  msg = new Date(li.t) + " | " + msg;
                }
                if (li.l <= JL2.getDebugLevel()) {
                  this.cdebug(msg);
                } else if (li.l <= JL2.getInfoLevel()) {
                  this.cinfo(msg);
                } else if (li.l <= JL2.getWarnLevel()) {
                  this.cwarn(msg);
                } else {
                  this.cerror(msg);
                }
              }
            } catch (e) {
            }
            successCallback();
          };
          return ConsoleAppender2;
        }(Appender)
      );
      JL2.ConsoleAppender = ConsoleAppender;
      var Logger = (
        /** @class */
        function() {
          function Logger2(loggerName) {
            this.loggerName = loggerName;
            this.seenRegexes = [];
          }
          Logger2.prototype.setOptions = function(options) {
            copyProperty("level", options, this);
            copyProperty("userAgentRegex", options, this);
            copyProperty("disallow", options, this);
            copyProperty("ipRegex", options, this);
            copyProperty("appenders", options, this);
            copyProperty("onceOnly", options, this);
            this.seenRegexes = [];
            return this;
          };
          Logger2.prototype.buildExceptionObject = function(e) {
            var excObject = {};
            if (e.stack) {
              excObject.stack = e.stack;
            } else {
              excObject.e = e;
            }
            if (e.message) {
              excObject.message = e.message;
            }
            if (e.name) {
              excObject.name = e.name;
            }
            if (e.data) {
              excObject.data = e.data;
            }
            if (e.inner) {
              excObject.inner = this.buildExceptionObject(e.inner);
            }
            return excObject;
          };
          Logger2.prototype.log = function(level, logObject, e) {
            var i = 0;
            var compositeMessage;
            var excObject;
            if (!this.appenders) {
              return this;
            }
            if (level >= this.level && allow(this)) {
              if (e) {
                excObject = this.buildExceptionObject(e);
                excObject.logData = stringifyLogObjectFunction(logObject);
              } else {
                excObject = logObject;
              }
              compositeMessage = stringifyLogObject(excObject);
              if (allowMessage(this, compositeMessage.finalString)) {
                if (this.onceOnly) {
                  i = this.onceOnly.length - 1;
                  while (i >= 0) {
                    if (new RegExp(this.onceOnly[i]).test(compositeMessage.finalString)) {
                      if (this.seenRegexes[i]) {
                        return this;
                      }
                      this.seenRegexes[i] = true;
                    }
                    i--;
                  }
                }
                compositeMessage.meta = compositeMessage.meta || {};
                i = this.appenders.length - 1;
                while (i >= 0) {
                  this.appenders[i].log(levelToString(level), compositeMessage.msg, compositeMessage.meta, function() {
                  }, level, compositeMessage.finalString, this.loggerName);
                  i--;
                }
              }
            }
            return this;
          };
          Logger2.prototype.trace = function(logObject) {
            return this.log(getTraceLevel(), logObject);
          };
          Logger2.prototype.debug = function(logObject) {
            return this.log(getDebugLevel(), logObject);
          };
          Logger2.prototype.info = function(logObject) {
            return this.log(getInfoLevel(), logObject);
          };
          Logger2.prototype.warn = function(logObject) {
            return this.log(getWarnLevel(), logObject);
          };
          Logger2.prototype.error = function(logObject) {
            return this.log(getErrorLevel(), logObject);
          };
          Logger2.prototype.fatal = function(logObject) {
            return this.log(getFatalLevel(), logObject);
          };
          Logger2.prototype.fatalException = function(logObject, e) {
            return this.log(getFatalLevel(), logObject, e);
          };
          return Logger2;
        }()
      );
      JL2.Logger = Logger;
      function createAjaxAppender(appenderName) {
        return new AjaxAppender(appenderName);
      }
      JL2.createAjaxAppender = createAjaxAppender;
      function createConsoleAppender(appenderName) {
        return new ConsoleAppender(appenderName);
      }
      JL2.createConsoleAppender = createConsoleAppender;
      var defaultAppender;
      if (typeof window !== "undefined") {
        defaultAppender = new AjaxAppender("");
      } else {
        defaultAppender = new ConsoleAppender("");
      }
      JL2.__ = new JL2.Logger("");
      JL2.__.setOptions({
        level: JL2.getDebugLevel(),
        appenders: [defaultAppender]
      });
    })(JL || (JL = {}));
    if (typeof exports !== "undefined") {
      exports.__esModule = true;
      exports.JL = JL;
    }
    var define2;
    if (typeof define2 == "function" && define2.amd) {
      define2("jsnlog", [], function() {
        return JL;
      });
    }
    if (typeof __jsnlog_configure == "function") {
      __jsnlog_configure(JL);
    }
    if (typeof window !== "undefined" && !window.onerror) {
      window.onerror = function(errorMsg, url, lineNumber, column, errorObj) {
        JL("onerrorLogger").fatalException({
          "msg": "Uncaught Exception",
          "errorMsg": errorMsg ? errorMsg.message || errorMsg : "",
          "url": url,
          "line number": lineNumber,
          "column": column
        }, errorObj);
        return false;
      };
    }
    if (typeof window !== "undefined" && !window.onunhandledrejection) {
      window.onunhandledrejection = function(event) {
        JL("onerrorLogger").fatalException({
          "msg": "unhandledrejection",
          "errorMsg": event.reason ? event.reason.message : event.message || null
        }, event.reason);
      };
    }
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Enums/LocalRecorderState.js
var require_LocalRecorderState = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Enums/LocalRecorderState.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LocalRecorderState = void 0;
    var LocalRecorderState;
    (function(LocalRecorderState2) {
      LocalRecorderState2["READY"] = "READY";
      LocalRecorderState2["RECORDING"] = "RECORDING";
      LocalRecorderState2["PAUSED"] = "PAUSED";
      LocalRecorderState2["FINISHED"] = "FINISHED";
    })(LocalRecorderState = exports.LocalRecorderState || (exports.LocalRecorderState = {}));
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Logger/ConsoleLogger.js
var require_ConsoleLogger = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Logger/ConsoleLogger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConsoleLogger = void 0;
    var ConsoleLogger = (
      /** @class */
      function() {
        function ConsoleLogger2(console2) {
          this.logger = console2;
          this.log = console2.log, this.info = console2.info, this.debug = console2.debug, this.warn = console2.warn, this.error = console2.error;
        }
        return ConsoleLogger2;
      }()
    );
    exports.ConsoleLogger = ConsoleLogger;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLoggerConfiguration.js
var require_OpenViduLoggerConfiguration = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLoggerConfiguration.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OpenViduLoggerConfiguration = void 0;
    var OpenViduLoggerConfiguration;
    (function(OpenViduLoggerConfiguration2) {
      OpenViduLoggerConfiguration2["disabled"] = "disabled";
      OpenViduLoggerConfiguration2["debug"] = "debug";
      OpenViduLoggerConfiguration2["debug_app"] = "debug_app";
    })(OpenViduLoggerConfiguration = exports.OpenViduLoggerConfiguration || (exports.OpenViduLoggerConfiguration = {}));
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js
var require_OpenViduLogger = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OpenViduLogger = void 0;
    var jsnlog_1 = require_jsnlog();
    var ConsoleLogger_1 = require_ConsoleLogger();
    var OpenViduLoggerConfiguration_1 = require_OpenViduLoggerConfiguration();
    var OpenViduLogger = (
      /** @class */
      function() {
        function OpenViduLogger2() {
          this.JSNLOG_URL = "/openvidu/elk/openvidu-browser-logs";
          this.MAX_JSNLOG_BATCH_LOG_MESSAGES = 100;
          this.MAX_MSECONDS_BATCH_MESSAGES = 5e3;
          this.MAX_LENGTH_STRING_JSON = 1e3;
          this.defaultConsoleLogger = new ConsoleLogger_1.ConsoleLogger(globalThis.console);
          this.isProdMode = false;
          this.isJSNLogSetup = false;
        }
        OpenViduLogger2.configureJSNLog = function(openVidu, token) {
          var _this = this;
          try {
            if (globalThis["LOG_JSNLOG_RESULTS"] || // If instance is created and it is OpenVidu Pro
            this.instance && openVidu.isAtLeastPro && // If logs are enabled
            this.instance.isOpenViduBrowserLogsDebugActive(openVidu) && // Only reconfigure it if session or finalUserId has changed
            this.instance.canConfigureJSNLog(openVidu, this.instance)) {
              if (openVidu.sendBrowserLogs === OpenViduLoggerConfiguration_1.OpenViduLoggerConfiguration.debug_app) {
                this.instance.replaceWindowConsole();
              }
              this.instance.isJSNLogSetup = false;
              this.instance.info("Configuring JSNLogs.");
              var finalUserId_1 = openVidu.finalUserId;
              var sessionId_1 = openVidu.session.sessionId;
              var beforeSendCallback = function(xhr) {
                var parentReadyStateFunction = xhr.onreadystatechange;
                xhr.onreadystatechange = function() {
                  if (_this.isInvalidResponse(xhr)) {
                    Object.defineProperty(xhr, "readyState", { value: 4 });
                    Object.defineProperty(xhr, "status", { value: 200 });
                    _this.instance.disableLogger();
                  }
                  parentReadyStateFunction();
                };
                xhr.setRequestHeader("Authorization", "Basic " + btoa("".concat(finalUserId_1, "%/%").concat(sessionId_1) + ":" + token));
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                xhr.setRequestHeader("OV-Final-User-Id", finalUserId_1);
                xhr.setRequestHeader("OV-Session-Id", sessionId_1);
                xhr.setRequestHeader("OV-Token", token);
              };
              this.instance.currentAppender = jsnlog_1.JL.createAjaxAppender("appender-".concat(finalUserId_1, "-").concat(sessionId_1));
              this.instance.currentAppender.setOptions({
                beforeSend: beforeSendCallback,
                maxBatchSize: 1e3,
                batchSize: this.instance.MAX_JSNLOG_BATCH_LOG_MESSAGES,
                batchTimeout: this.instance.MAX_MSECONDS_BATCH_MESSAGES
              });
              var logSerializer = function(obj) {
                var getCircularReplacer = function() {
                  var seen = /* @__PURE__ */ new WeakSet();
                  return function(key, value) {
                    if (typeof value === "object" && value != null) {
                      if (seen.has(value) || globalThis.HTMLElement && value instanceof HTMLElement) {
                        return;
                      }
                      seen.add(value);
                    }
                    return value;
                  };
                };
                var stringifyJson = JSON.stringify(obj, getCircularReplacer());
                if (stringifyJson.length > _this.instance.MAX_LENGTH_STRING_JSON) {
                  stringifyJson = "".concat(stringifyJson.substring(0, _this.instance.MAX_LENGTH_STRING_JSON), "...");
                }
                if (globalThis["LOG_JSNLOG_RESULTS"]) {
                  console.log(stringifyJson);
                }
                return stringifyJson;
              };
              jsnlog_1.JL.setOptions({
                defaultAjaxUrl: openVidu.httpUri + this.instance.JSNLOG_URL,
                serialize: logSerializer,
                enabled: true
              });
              (0, jsnlog_1.JL)().setOptions({
                appenders: [this.instance.currentAppender]
              });
              this.instance.isJSNLogSetup = true;
              this.instance.loggingSessionId = sessionId_1;
              this.instance.info("JSNLog configured.");
            }
          } catch (e) {
            console.error("Error configuring JSNLog: ");
            console.error(e);
            this.instance.disableLogger();
          }
        };
        OpenViduLogger2.getInstance = function() {
          if (!OpenViduLogger2.instance) {
            OpenViduLogger2.instance = new OpenViduLogger2();
          }
          return OpenViduLogger2.instance;
        };
        OpenViduLogger2.isInvalidResponse = function(xhr) {
          return xhr.status == 401 || xhr.status == 403 || xhr.status == 404 || xhr.status == 0;
        };
        OpenViduLogger2.prototype.canConfigureJSNLog = function(openVidu, logger) {
          return openVidu.session.sessionId != logger.loggingSessionId;
        };
        OpenViduLogger2.prototype.isOpenViduBrowserLogsDebugActive = function(openVidu) {
          return openVidu.sendBrowserLogs === OpenViduLoggerConfiguration_1.OpenViduLoggerConfiguration.debug || openVidu.sendBrowserLogs === OpenViduLoggerConfiguration_1.OpenViduLoggerConfiguration.debug_app;
        };
        OpenViduLogger2.prototype.getConsoleWithJSNLog = function() {
          return function(openViduLogger) {
            return {
              log: function() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
                }
                openViduLogger.defaultConsoleLogger.log.apply(openViduLogger.defaultConsoleLogger.logger, arguments);
                if (openViduLogger.isJSNLogSetup) {
                  (0, jsnlog_1.JL)().info(arguments);
                }
              },
              info: function() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
                }
                openViduLogger.defaultConsoleLogger.info.apply(openViduLogger.defaultConsoleLogger.logger, arguments);
                if (openViduLogger.isJSNLogSetup) {
                  (0, jsnlog_1.JL)().info(arguments);
                }
              },
              debug: function() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
                }
                openViduLogger.defaultConsoleLogger.debug.apply(openViduLogger.defaultConsoleLogger.logger, arguments);
              },
              warn: function() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
                }
                openViduLogger.defaultConsoleLogger.warn.apply(openViduLogger.defaultConsoleLogger.logger, arguments);
                if (openViduLogger.isJSNLogSetup) {
                  (0, jsnlog_1.JL)().warn(arguments);
                }
              },
              error: function() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
                }
                openViduLogger.defaultConsoleLogger.error.apply(openViduLogger.defaultConsoleLogger.logger, arguments);
                if (openViduLogger.isJSNLogSetup) {
                  (0, jsnlog_1.JL)().error(arguments);
                }
              }
            };
          }(this);
        };
        OpenViduLogger2.prototype.replaceWindowConsole = function() {
          globalThis.console = this.defaultConsoleLogger.logger;
          globalThis.console.log = this.getConsoleWithJSNLog().log;
          globalThis.console.info = this.getConsoleWithJSNLog().info;
          globalThis.console.debug = this.getConsoleWithJSNLog().debug;
          globalThis.console.warn = this.getConsoleWithJSNLog().warn;
          globalThis.console.error = this.getConsoleWithJSNLog().error;
        };
        OpenViduLogger2.prototype.disableLogger = function() {
          jsnlog_1.JL.setOptions({ enabled: false });
          this.isJSNLogSetup = false;
          this.loggingSessionId = void 0;
          this.currentAppender = void 0;
          globalThis.console = this.defaultConsoleLogger.logger;
          globalThis.console.log = this.defaultConsoleLogger.log;
          globalThis.console.info = this.defaultConsoleLogger.info;
          globalThis.console.debug = this.defaultConsoleLogger.debug;
          globalThis.console.warn = this.defaultConsoleLogger.warn;
          globalThis.console.error = this.defaultConsoleLogger.error;
        };
        OpenViduLogger2.prototype.log = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (!this.isProdMode) {
            this.defaultConsoleLogger.log.apply(this.defaultConsoleLogger.logger, arguments);
          }
          if (this.isJSNLogSetup) {
            (0, jsnlog_1.JL)().info(arguments);
          }
        };
        OpenViduLogger2.prototype.debug = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (!this.isProdMode) {
            this.defaultConsoleLogger.debug.apply(this.defaultConsoleLogger.logger, arguments);
          }
        };
        OpenViduLogger2.prototype.info = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (!this.isProdMode) {
            this.defaultConsoleLogger.info.apply(this.defaultConsoleLogger.logger, arguments);
          }
          if (this.isJSNLogSetup) {
            (0, jsnlog_1.JL)().info(arguments);
          }
        };
        OpenViduLogger2.prototype.warn = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          this.defaultConsoleLogger.warn.apply(this.defaultConsoleLogger.logger, arguments);
          if (this.isJSNLogSetup) {
            (0, jsnlog_1.JL)().warn(arguments);
          }
        };
        OpenViduLogger2.prototype.error = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          this.defaultConsoleLogger.error.apply(this.defaultConsoleLogger.logger, arguments);
          if (this.isJSNLogSetup) {
            (0, jsnlog_1.JL)().error(arguments);
          }
        };
        OpenViduLogger2.prototype.flush = function() {
          if (this.isJSNLogSetup && this.currentAppender != null) {
            this.currentAppender.sendBatch();
          }
        };
        OpenViduLogger2.prototype.enableProdMode = function() {
          this.isProdMode = true;
        };
        return OpenViduLogger2;
      }()
    );
    exports.OpenViduLogger = OpenViduLogger;
  }
});

// node_modules/platform/platform.js
var require_platform = __commonJS({
  "node_modules/platform/platform.js"(exports, module) {
    (function() {
      "use strict";
      var objectTypes = {
        "function": true,
        "object": true
      };
      var root = objectTypes[typeof window] && window || this;
      var oldRoot = root;
      var freeExports = objectTypes[typeof exports] && exports;
      var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
      var freeGlobal = freeExports && freeModule && typeof global == "object" && global;
      if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
        root = freeGlobal;
      }
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var reOpera = /\bOpera/;
      var thisBinding = this;
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var toString = objectProto.toString;
      function capitalize(string) {
        string = String(string);
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      function cleanupOS(os, pattern, label) {
        var data = {
          "10.0": "10",
          "6.4": "10 Technical Preview",
          "6.3": "8.1",
          "6.2": "8",
          "6.1": "Server 2008 R2 / 7",
          "6.0": "Server 2008 / Vista",
          "5.2": "Server 2003 / XP 64-bit",
          "5.1": "XP",
          "5.01": "2000 SP1",
          "5.0": "2000",
          "4.0": "NT",
          "4.90": "ME"
        };
        if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) && (data = data[/[\d.]+$/.exec(os)])) {
          os = "Windows " + data;
        }
        os = String(os);
        if (pattern && label) {
          os = os.replace(RegExp(pattern, "i"), label);
        }
        os = format(
          os.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        );
        return os;
      }
      function each(object, callback) {
        var index = -1, length = object ? object.length : 0;
        if (typeof length == "number" && length > -1 && length <= maxSafeInteger) {
          while (++index < length) {
            callback(object[index], index, object);
          }
        } else {
          forOwn(object, callback);
        }
      }
      function format(string) {
        string = trim(string);
        return /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
      }
      function forOwn(object, callback) {
        for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
            callback(object[key], key, object);
          }
        }
      }
      function getClassOf(value) {
        return value == null ? capitalize(value) : toString.call(value).slice(8, -1);
      }
      function isHostType(object, property) {
        var type = object != null ? typeof object[property] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(type) && (type == "object" ? !!object[property] : true);
      }
      function qualify(string) {
        return String(string).replace(/([ -])(?!$)/g, "$1?");
      }
      function reduce(array, callback) {
        var accumulator = null;
        each(array, function(value, index) {
          accumulator = callback(accumulator, value, index, array);
        });
        return accumulator;
      }
      function trim(string) {
        return String(string).replace(/^ +| +$/g, "");
      }
      function parse(ua) {
        var context = root;
        var isCustomContext = ua && typeof ua == "object" && getClassOf(ua) != "String";
        if (isCustomContext) {
          context = ua;
          ua = null;
        }
        var nav = context.navigator || {};
        var userAgent = nav.userAgent || "";
        ua || (ua = userAgent);
        var isModuleScope = isCustomContext || thisBinding == oldRoot;
        var likeChrome = isCustomContext ? !!nav.likeChrome : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());
        var objectClass = "Object", airRuntimeClass = isCustomContext ? objectClass : "ScriptBridgingProxyObject", enviroClass = isCustomContext ? objectClass : "Environment", javaClass = isCustomContext && context.java ? "JavaPackage" : getClassOf(context.java), phantomClass = isCustomContext ? objectClass : "RuntimeObject";
        var java = /\bJava/.test(javaClass) && context.java;
        var rhino = java && getClassOf(context.environment) == enviroClass;
        var alpha = java ? "a" : "α";
        var beta = java ? "b" : "β";
        var doc = context.document || {};
        var opera = context.operamini || context.opera;
        var operaClass = reOpera.test(operaClass = isCustomContext && opera ? opera["[[Class]]"] : getClassOf(opera)) ? operaClass : opera = null;
        var data;
        var arch = ua;
        var description = [];
        var prerelease = null;
        var useFeatures = ua == userAgent;
        var version = useFeatures && opera && typeof opera.version == "function" && opera.version();
        var isSpecialCasedOS;
        var layout = getLayout([
          { "label": "EdgeHTML", "pattern": "Edge" },
          "Trident",
          { "label": "WebKit", "pattern": "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]);
        var name = getName([
          "Adobe AIR",
          "Arora",
          "Avant Browser",
          "Breach",
          "Camino",
          "Electron",
          "Epiphany",
          "Fennec",
          "Flock",
          "Galeon",
          "GreenBrowser",
          "iCab",
          "Iceweasel",
          "K-Meleon",
          "Konqueror",
          "Lunascape",
          "Maxthon",
          { "label": "Microsoft Edge", "pattern": "(?:Edge|Edg|EdgA|EdgiOS)" },
          "Midori",
          "Nook Browser",
          "PaleMoon",
          "PhantomJS",
          "Raven",
          "Rekonq",
          "RockMelt",
          { "label": "Samsung Internet", "pattern": "SamsungBrowser" },
          "SeaMonkey",
          { "label": "Silk", "pattern": "(?:Cloud9|Silk-Accelerated)" },
          "Sleipnir",
          "SlimBrowser",
          { "label": "SRWare Iron", "pattern": "Iron" },
          "Sunrise",
          "Swiftfox",
          "Vivaldi",
          "Waterfox",
          "WebPositive",
          { "label": "Yandex Browser", "pattern": "YaBrowser" },
          { "label": "UC Browser", "pattern": "UCBrowser" },
          "Opera Mini",
          { "label": "Opera Mini", "pattern": "OPiOS" },
          "Opera",
          { "label": "Opera", "pattern": "OPR" },
          "Chromium",
          "Chrome",
          { "label": "Chrome", "pattern": "(?:HeadlessChrome)" },
          { "label": "Chrome Mobile", "pattern": "(?:CriOS|CrMo)" },
          { "label": "Firefox", "pattern": "(?:Firefox|Minefield)" },
          { "label": "Firefox for iOS", "pattern": "FxiOS" },
          { "label": "IE", "pattern": "IEMobile" },
          { "label": "IE", "pattern": "MSIE" },
          "Safari"
        ]);
        var product = getProduct([
          { "label": "BlackBerry", "pattern": "BB10" },
          "BlackBerry",
          { "label": "Galaxy S", "pattern": "GT-I9000" },
          { "label": "Galaxy S2", "pattern": "GT-I9100" },
          { "label": "Galaxy S3", "pattern": "GT-I9300" },
          { "label": "Galaxy S4", "pattern": "GT-I9500" },
          { "label": "Galaxy S5", "pattern": "SM-G900" },
          { "label": "Galaxy S6", "pattern": "SM-G920" },
          { "label": "Galaxy S6 Edge", "pattern": "SM-G925" },
          { "label": "Galaxy S7", "pattern": "SM-G930" },
          { "label": "Galaxy S7 Edge", "pattern": "SM-G935" },
          "Google TV",
          "Lumia",
          "iPad",
          "iPod",
          "iPhone",
          "Kindle",
          { "label": "Kindle Fire", "pattern": "(?:Cloud9|Silk-Accelerated)" },
          "Nexus",
          "Nook",
          "PlayBook",
          "PlayStation Vita",
          "PlayStation",
          "TouchPad",
          "Transformer",
          { "label": "Wii U", "pattern": "WiiU" },
          "Wii",
          "Xbox One",
          { "label": "Xbox 360", "pattern": "Xbox" },
          "Xoom"
        ]);
        var manufacturer = getManufacturer({
          "Apple": { "iPad": 1, "iPhone": 1, "iPod": 1 },
          "Alcatel": {},
          "Archos": {},
          "Amazon": { "Kindle": 1, "Kindle Fire": 1 },
          "Asus": { "Transformer": 1 },
          "Barnes & Noble": { "Nook": 1 },
          "BlackBerry": { "PlayBook": 1 },
          "Google": { "Google TV": 1, "Nexus": 1 },
          "HP": { "TouchPad": 1 },
          "HTC": {},
          "Huawei": {},
          "Lenovo": {},
          "LG": {},
          "Microsoft": { "Xbox": 1, "Xbox One": 1 },
          "Motorola": { "Xoom": 1 },
          "Nintendo": { "Wii U": 1, "Wii": 1 },
          "Nokia": { "Lumia": 1 },
          "Oppo": {},
          "Samsung": { "Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1 },
          "Sony": { "PlayStation": 1, "PlayStation Vita": 1 },
          "Xiaomi": { "Mi": 1, "Redmi": 1 }
        });
        var os = getOS([
          "Windows Phone",
          "KaiOS",
          "Android",
          "CentOS",
          { "label": "Chrome OS", "pattern": "CrOS" },
          "Debian",
          { "label": "DragonFly BSD", "pattern": "DragonFly" },
          "Fedora",
          "FreeBSD",
          "Gentoo",
          "Haiku",
          "Kubuntu",
          "Linux Mint",
          "OpenBSD",
          "Red Hat",
          "SuSE",
          "Ubuntu",
          "Xubuntu",
          "Cygwin",
          "Symbian OS",
          "hpwOS",
          "webOS ",
          "webOS",
          "Tablet OS",
          "Tizen",
          "Linux",
          "Mac OS X",
          "Macintosh",
          "Mac",
          "Windows 98;",
          "Windows "
        ]);
        function getLayout(guesses) {
          return reduce(guesses, function(result, guess) {
            return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
          });
        }
        function getManufacturer(guesses) {
          return reduce(guesses, function(result, value, key) {
            return result || (value[product] || value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] || RegExp("\\b" + qualify(key) + "(?:\\b|\\w*\\d)", "i").exec(ua)) && key;
          });
        }
        function getName(guesses) {
          return reduce(guesses, function(result, guess) {
            return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
          });
        }
        function getOS(guesses) {
          return reduce(guesses, function(result, guess) {
            var pattern = guess.pattern || qualify(guess);
            if (!result && (result = RegExp("\\b" + pattern + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(ua))) {
              result = cleanupOS(result, pattern, guess.label || guess);
            }
            return result;
          });
        }
        function getProduct(guesses) {
          return reduce(guesses, function(result, guess) {
            var pattern = guess.pattern || qualify(guess);
            if (!result && (result = RegExp("\\b" + pattern + " *\\d+[.\\w_]*", "i").exec(ua) || RegExp("\\b" + pattern + " *\\w+-[\\w]*", "i").exec(ua) || RegExp("\\b" + pattern + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(ua))) {
              if ((result = String(guess.label && !RegExp(pattern, "i").test(guess.label) ? guess.label : result).split("/"))[1] && !/[\d.]+/.test(result[0])) {
                result[0] += " " + result[1];
              }
              guess = guess.label || guess;
              result = format(result[0].replace(RegExp(pattern, "i"), guess).replace(RegExp("; *(?:" + guess + "[_-])?", "i"), " ").replace(RegExp("(" + guess + ")[-_.]?(\\w)", "i"), "$1 $2"));
            }
            return result;
          });
        }
        function getVersion(patterns) {
          return reduce(patterns, function(result, pattern) {
            return result || (RegExp(pattern + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(ua) || 0)[1] || null;
          });
        }
        function toStringPlatform() {
          return this.description || "";
        }
        layout && (layout = [layout]);
        if (/\bAndroid\b/.test(os) && !product && (data = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(ua))) {
          product = trim(data[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null;
        }
        if (manufacturer && !product) {
          product = getProduct([manufacturer]);
        } else if (manufacturer && product) {
          product = product.replace(RegExp("^(" + qualify(manufacturer) + ")[-_.\\s]", "i"), manufacturer + " ").replace(RegExp("^(" + qualify(manufacturer) + ")[-_.]?(\\w)", "i"), manufacturer + " $2");
        }
        if (data = /\bGoogle TV\b/.exec(product)) {
          product = data[0];
        }
        if (/\bSimulator\b/i.test(ua)) {
          product = (product ? product + " " : "") + "Simulator";
        }
        if (name == "Opera Mini" && /\bOPiOS\b/.test(ua)) {
          description.push("running in Turbo/Uncompressed mode");
        }
        if (name == "IE" && /\blike iPhone OS\b/.test(ua)) {
          data = parse(ua.replace(/like iPhone OS/, ""));
          manufacturer = data.manufacturer;
          product = data.product;
        } else if (/^iP/.test(product)) {
          name || (name = "Safari");
          os = "iOS" + ((data = / OS ([\d_]+)/i.exec(ua)) ? " " + data[1].replace(/_/g, ".") : "");
        } else if (name == "Konqueror" && /^Linux\b/i.test(os)) {
          os = "Kubuntu";
        } else if (manufacturer && manufacturer != "Google" && (/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua) || /\bVita\b/.test(product)) || /\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua)) {
          name = "Android Browser";
          os = /\bAndroid\b/.test(os) ? os : "Android";
        } else if (name == "Silk") {
          if (!/\bMobi/i.test(ua)) {
            os = "Android";
            description.unshift("desktop mode");
          }
          if (/Accelerated *= *true/i.test(ua)) {
            description.unshift("accelerated");
          }
        } else if (name == "UC Browser" && /\bUCWEB\b/.test(ua)) {
          description.push("speed mode");
        } else if (name == "PaleMoon" && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
          description.push("identifying as Firefox " + data[1]);
        } else if (name == "Firefox" && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
          os || (os = "Firefox OS");
          product || (product = data[1]);
        } else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
          if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + "/") + 8))) {
            name = null;
          }
          if ((data = product || manufacturer || os) && (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
            name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + " Browser";
          }
        } else if (name == "Electron" && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
          description.push("Chromium " + data);
        }
        if (!version) {
          version = getVersion([
            "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
            "Version",
            qualify(name),
            "(?:Firefox|Minefield|NetFront)"
          ]);
        }
        if (data = layout == "iCab" && parseFloat(version) > 3 && "WebKit" || /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && "WebKit" || !layout && /\bMSIE\b/i.test(ua) && (os == "Mac OS" ? "Tasman" : "Trident") || layout == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(name) && "NetFront") {
          layout = [data];
        }
        if (name == "IE" && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
          name += " Mobile";
          os = "Windows Phone " + (/\+$/.test(data) ? data : data + ".x");
          description.unshift("desktop mode");
        } else if (/\bWPDesktop\b/i.test(ua)) {
          name = "IE Mobile";
          os = "Windows Phone 8.x";
          description.unshift("desktop mode");
          version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
        } else if (name != "IE" && layout == "Trident" && (data = /\brv:([\d.]+)/.exec(ua))) {
          if (name) {
            description.push("identifying as " + name + (version ? " " + version : ""));
          }
          name = "IE";
          version = data[1];
        }
        if (useFeatures) {
          if (isHostType(context, "global")) {
            if (java) {
              data = java.lang.System;
              arch = data.getProperty("os.arch");
              os = os || data.getProperty("os.name") + " " + data.getProperty("os.version");
            }
            if (rhino) {
              try {
                version = context.require("ringo/engine").version.join(".");
                name = "RingoJS";
              } catch (e) {
                if ((data = context.system) && data.global.system == context.system) {
                  name = "Narwhal";
                  os || (os = data[0].os || null);
                }
              }
              if (!name) {
                name = "Rhino";
              }
            } else if (typeof context.process == "object" && !context.process.browser && (data = context.process)) {
              if (typeof data.versions == "object") {
                if (typeof data.versions.electron == "string") {
                  description.push("Node " + data.versions.node);
                  name = "Electron";
                  version = data.versions.electron;
                } else if (typeof data.versions.nw == "string") {
                  description.push("Chromium " + version, "Node " + data.versions.node);
                  name = "NW.js";
                  version = data.versions.nw;
                }
              }
              if (!name) {
                name = "Node.js";
                arch = data.arch;
                os = data.platform;
                version = /[\d.]+/.exec(data.version);
                version = version ? version[0] : null;
              }
            }
          } else if (getClassOf(data = context.runtime) == airRuntimeClass) {
            name = "Adobe AIR";
            os = data.flash.system.Capabilities.os;
          } else if (getClassOf(data = context.phantom) == phantomClass) {
            name = "PhantomJS";
            version = (data = data.version || null) && data.major + "." + data.minor + "." + data.patch;
          } else if (typeof doc.documentMode == "number" && (data = /\bTrident\/(\d+)/i.exec(ua))) {
            version = [version, doc.documentMode];
            if ((data = +data[1] + 4) != version[1]) {
              description.push("IE " + version[1] + " mode");
              layout && (layout[1] = "");
              version[1] = data;
            }
            version = name == "IE" ? String(version[1].toFixed(1)) : version[0];
          } else if (typeof doc.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(name)) {
            description.push("masking as " + name + " " + version);
            name = "IE";
            version = "11.0";
            layout = ["Trident"];
            os = "Windows";
          }
          os = os && format(os);
        }
        if (version && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ";" + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && "a")) {
          prerelease = /b/i.test(data) ? "beta" : "alpha";
          version = version.replace(RegExp(data + "\\+?$"), "") + (prerelease == "beta" ? beta : alpha) + (/\d+\+?/.exec(data) || "");
        }
        if (name == "Fennec" || name == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(os)) {
          name = "Firefox Mobile";
        } else if (name == "Maxthon" && version) {
          version = version.replace(/\.[\d.]+/, ".x");
        } else if (/\bXbox\b/i.test(product)) {
          if (product == "Xbox 360") {
            os = null;
          }
          if (product == "Xbox 360" && /\bIEMobile\b/.test(ua)) {
            description.unshift("mobile mode");
          }
        } else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) && (os == "Windows CE" || /Mobi/i.test(ua))) {
          name += " Mobile";
        } else if (name == "IE" && useFeatures) {
          try {
            if (context.external === null) {
              description.unshift("platform preview");
            }
          } catch (e) {
            description.unshift("embedded");
          }
        } else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data = (RegExp(product.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(ua) || 0)[1] || version)) {
          data = [data, /BB10/.test(ua)];
          os = (data[1] ? (product = null, manufacturer = "BlackBerry") : "Device Software") + " " + data[0];
          version = null;
        } else if (this != forOwn && product != "Wii" && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || name == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(os) || name == "IE" && (os && !/^Win/.test(os) && version > 5.5 || /\bWindows XP\b/.test(os) && version > 8 || version == 8 && !/\bTrident\b/.test(ua))) && !reOpera.test(data = parse.call(forOwn, ua.replace(reOpera, "") + ";")) && data.name) {
          data = "ing as " + data.name + ((data = data.version) ? " " + data : "");
          if (reOpera.test(name)) {
            if (/\bIE\b/.test(data) && os == "Mac OS") {
              os = null;
            }
            data = "identify" + data;
          } else {
            data = "mask" + data;
            if (operaClass) {
              name = format(operaClass.replace(/([a-z])([A-Z])/g, "$1 $2"));
            } else {
              name = "Opera";
            }
            if (/\bIE\b/.test(data)) {
              os = null;
            }
            if (!useFeatures) {
              version = null;
            }
          }
          layout = ["Presto"];
          description.push(data);
        }
        if (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) {
          data = [parseFloat(data.replace(/\.(\d)$/, ".0$1")), data];
          if (name == "Safari" && data[1].slice(-1) == "+") {
            name = "WebKit Nightly";
            prerelease = "alpha";
            version = data[1].slice(0, -1);
          } else if (version == data[1] || version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
            version = null;
          }
          data[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(ua) || 0)[1];
          if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == "WebKit") {
            layout = ["Blink"];
          }
          if (!useFeatures || !likeChrome && !data[1]) {
            layout && (layout[1] = "like Safari");
            data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? "4+" : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : data < 602 ? 9 : data < 604 ? 10 : data < 606 ? 11 : data < 608 ? 12 : "12");
          } else {
            layout && (layout[1] = "like Chrome");
            data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.1 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.3 ? 11 : data < 535.01 ? 12 : data < 535.02 ? "13+" : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.1 ? 19 : data < 537.01 ? 20 : data < 537.11 ? "21+" : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != "Blink" ? "27" : "28");
          }
          layout && (layout[1] += " " + (data += typeof data == "number" ? ".x" : /[.+]/.test(data) ? "" : "+"));
          if (name == "Safari" && (!version || parseInt(version) > 45)) {
            version = data;
          } else if (name == "Chrome" && /\bHeadlessChrome/i.test(ua)) {
            description.unshift("headless");
          }
        }
        if (name == "Opera" && (data = /\bzbov|zvav$/.exec(os))) {
          name += " ";
          description.unshift("desktop mode");
          if (data == "zvav") {
            name += "Mini";
            version = null;
          } else {
            name += "Mobile";
          }
          os = os.replace(RegExp(" *" + data + "$"), "");
        } else if (name == "Safari" && /\bChrome\b/.exec(layout && layout[1])) {
          description.unshift("desktop mode");
          name = "Chrome Mobile";
          version = null;
          if (/\bOS X\b/.test(os)) {
            manufacturer = "Apple";
            os = "iOS 4.3+";
          } else {
            os = null;
          }
        } else if (/\bSRWare Iron\b/.test(name) && !version) {
          version = getVersion("Chrome");
        }
        if (version && version.indexOf(data = /[\d.]+$/.exec(os)) == 0 && ua.indexOf("/" + data + "-") > -1) {
          os = trim(os.replace(data, ""));
        }
        if (os && os.indexOf(name) != -1 && !RegExp(name + " OS").test(os)) {
          os = os.replace(RegExp(" *" + qualify(name) + " *"), "");
        }
        if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || name != "Safari" && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(name) && layout[1])) {
          (data = layout[layout.length - 1]) && description.push(data);
        }
        if (description.length) {
          description = ["(" + description.join("; ") + ")"];
        }
        if (manufacturer && product && product.indexOf(manufacturer) < 0) {
          description.push("on " + manufacturer);
        }
        if (product) {
          description.push((/^on /.test(description[description.length - 1]) ? "" : "on ") + product);
        }
        if (os) {
          data = / ([\d.+]+)$/.exec(os);
          isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == "/";
          os = {
            "architecture": 32,
            "family": data && !isSpecialCasedOS ? os.replace(data[0], "") : os,
            "version": data ? data[1] : null,
            "toString": function() {
              var version2 = this.version;
              return this.family + (version2 && !isSpecialCasedOS ? " " + version2 : "") + (this.architecture == 64 ? " 64-bit" : "");
            }
          };
        }
        if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
          if (os) {
            os.architecture = 64;
            os.family = os.family.replace(RegExp(" *" + data), "");
          }
          if (name && (/\bWOW64\b/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua))) {
            description.unshift("32-bit");
          }
        } else if (os && /^OS X/.test(os.family) && name == "Chrome" && parseFloat(version) >= 39) {
          os.architecture = 64;
        }
        ua || (ua = null);
        var platform2 = {};
        platform2.description = ua;
        platform2.layout = layout && layout[0];
        platform2.manufacturer = manufacturer;
        platform2.name = name;
        platform2.prerelease = prerelease;
        platform2.product = product;
        platform2.ua = ua;
        platform2.version = name && version;
        platform2.os = os || {
          /**
           * The CPU architecture the OS is built for.
           *
           * @memberOf platform.os
           * @type number|null
           */
          "architecture": null,
          /**
           * The family of the OS.
           *
           * Common values include:
           * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
           * "Windows XP", "OS X", "Linux", "Ubuntu", "Debian", "Fedora", "Red Hat",
           * "SuSE", "Android", "iOS" and "Windows Phone"
           *
           * @memberOf platform.os
           * @type string|null
           */
          "family": null,
          /**
           * The version of the OS.
           *
           * @memberOf platform.os
           * @type string|null
           */
          "version": null,
          /**
           * Returns the OS string.
           *
           * @memberOf platform.os
           * @returns {string} The OS string.
           */
          "toString": function() {
            return "null";
          }
        };
        platform2.parse = parse;
        platform2.toString = toStringPlatform;
        if (platform2.version) {
          description.unshift(version);
        }
        if (platform2.name) {
          description.unshift(name);
        }
        if (os && name && !(os == String(os).split(" ")[0] && (os == name.split(" ")[0] || product))) {
          description.push(product ? "(" + os + ")" : "on " + os);
        }
        if (description.length) {
          platform2.description = description.join(" ");
        }
        return platform2;
      }
      var platform = parse();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root.platform = platform;
        define(function() {
          return platform;
        });
      } else if (freeExports && freeModule) {
        forOwn(platform, function(value, key) {
          freeExports[key] = value;
        });
      } else {
        root.platform = platform;
      }
    }).call(exports);
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Utils/Platform.js
var require_Platform = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Utils/Platform.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlatformUtils = void 0;
    var platform = require_platform();
    var PlatformUtils = (
      /** @class */
      function() {
        function PlatformUtils2() {
        }
        PlatformUtils2.getInstance = function() {
          if (!this.instance) {
            this.instance = new PlatformUtils2();
          }
          return PlatformUtils2.instance;
        };
        PlatformUtils2.prototype.isChromeBrowser = function() {
          return platform.name === "Chrome";
        };
        PlatformUtils2.prototype.isSafariBrowser = function() {
          return platform.name === "Safari";
        };
        PlatformUtils2.prototype.isChromeMobileBrowser = function() {
          return platform.name === "Chrome Mobile";
        };
        PlatformUtils2.prototype.isFirefoxBrowser = function() {
          return platform.name === "Firefox";
        };
        PlatformUtils2.prototype.isFirefoxMobileBrowser = function() {
          return platform.name === "Firefox Mobile" || platform.name === "Firefox for iOS";
        };
        PlatformUtils2.prototype.isOperaBrowser = function() {
          return platform.name === "Opera";
        };
        PlatformUtils2.prototype.isOperaMobileBrowser = function() {
          return platform.name === "Opera Mobile";
        };
        PlatformUtils2.prototype.isEdgeBrowser = function() {
          var version = (platform === null || platform === void 0 ? void 0 : platform.version) ? parseFloat(platform.version) : -1;
          return platform.name === "Microsoft Edge" && version >= 80;
        };
        PlatformUtils2.prototype.isEdgeMobileBrowser = function() {
          var _a, _b;
          var version = (platform === null || platform === void 0 ? void 0 : platform.version) ? parseFloat(platform.version) : -1;
          return platform.name === "Microsoft Edge" && (((_a = platform.os) === null || _a === void 0 ? void 0 : _a.family) === "Android" || ((_b = platform.os) === null || _b === void 0 ? void 0 : _b.family) === "iOS") && version > 45;
        };
        PlatformUtils2.prototype.isAndroidBrowser = function() {
          return platform.name === "Android Browser";
        };
        PlatformUtils2.prototype.isElectron = function() {
          return platform.name === "Electron";
        };
        PlatformUtils2.prototype.isNodeJs = function() {
          return platform.name === "Node.js";
        };
        PlatformUtils2.prototype.isSamsungBrowser = function() {
          return platform.name === "Samsung Internet Mobile" || platform.name === "Samsung Internet";
        };
        PlatformUtils2.prototype.isMotorolaEdgeDevice = function() {
          var _a;
          return ((_a = platform.product) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes("motorola edge")) || false;
        };
        PlatformUtils2.prototype.isIPhoneOrIPad = function() {
          var userAgent = !!platform.ua ? platform.ua : navigator.userAgent;
          var isTouchable = "ontouchend" in document;
          var isIPad = /\b(\w*Macintosh\w*)\b/.test(userAgent) && isTouchable;
          var isIPhone = /\b(\w*iPhone\w*)\b/.test(userAgent) && /\b(\w*Mobile\w*)\b/.test(userAgent) && isTouchable;
          return isIPad || isIPhone;
        };
        PlatformUtils2.prototype.isIOSWithSafari = function() {
          var userAgent = !!platform.ua ? platform.ua : navigator.userAgent;
          return this.isIPhoneOrIPad() && /\b(\w*Apple\w*)\b/.test(navigator.vendor) && /\b(\w*Safari\w*)\b/.test(userAgent) && !/\b(\w*CriOS\w*)\b/.test(userAgent) && !/\b(\w*FxiOS\w*)\b/.test(userAgent);
        };
        PlatformUtils2.prototype.isIonicIos = function() {
          return this.isIPhoneOrIPad() && platform.ua.indexOf("Safari") === -1;
        };
        PlatformUtils2.prototype.isIonicAndroid = function() {
          return platform.os.family === "Android" && platform.name == "Android Browser";
        };
        PlatformUtils2.prototype.isMobileDevice = function() {
          return platform.os.family === "iOS" || platform.os.family === "Android";
        };
        PlatformUtils2.prototype.isReactNative = function() {
          return false;
        };
        PlatformUtils2.prototype.isChromium = function() {
          return this.isChromeBrowser() || this.isChromeMobileBrowser() || this.isOperaBrowser() || this.isOperaMobileBrowser() || this.isEdgeBrowser() || this.isEdgeMobileBrowser() || this.isSamsungBrowser() || this.isIonicAndroid() || this.isIonicIos() || this.isElectron() || // TODO: remove when possible
          this.isMotorolaEdgeDevice();
        };
        PlatformUtils2.prototype.canScreenShare = function() {
          var version = (platform === null || platform === void 0 ? void 0 : platform.version) ? parseFloat(platform.version) : -1;
          if (this.isMobileDevice()) {
            return false;
          }
          return this.isChromeBrowser() || this.isFirefoxBrowser() || this.isOperaBrowser() || this.isElectron() || this.isEdgeBrowser() || this.isSafariBrowser() && version >= 13;
        };
        PlatformUtils2.prototype.getName = function() {
          return platform.name || "";
        };
        PlatformUtils2.prototype.getVersion = function() {
          return platform.version || "";
        };
        PlatformUtils2.prototype.getFamily = function() {
          return platform.os.family || "";
        };
        PlatformUtils2.prototype.getDescription = function() {
          return platform.description || "";
        };
        return PlatformUtils2;
      }()
    );
    exports.PlatformUtils = PlatformUtils;
  }
});

// node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext] = type;
        }
        if (force || !this._extensions[type]) {
          const ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "node_modules/mime/types/standard.js"(exports, module) {
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// node_modules/mime/lite.js
var require_lite = __commonJS({
  "node_modules/mime/lite.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard());
  }
});

// node_modules/openvidu-browser/lib/OpenVidu/LocalRecorder.js
var require_LocalRecorder = __commonJS({
  "node_modules/openvidu-browser/lib/OpenVidu/LocalRecorder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LocalRecorder = void 0;
    var LocalRecorderState_1 = require_LocalRecorderState();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var Platform_1 = require_Platform();
    var Mime = require_lite();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var platform;
    var LocalRecorder = (
      /** @class */
      function() {
        function LocalRecorder2(stream) {
          this.stream = stream;
          this.chunks = [];
          platform = Platform_1.PlatformUtils.getInstance();
          this.connectionId = !!this.stream.connection ? this.stream.connection.connectionId : "default-connection";
          this.id = this.stream.streamId + "_" + this.connectionId + "_localrecord";
          this.state = LocalRecorderState_1.LocalRecorderState.READY;
        }
        LocalRecorder2.prototype.record = function(options) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            try {
              if (typeof options === "string" || options instanceof String) {
                return reject(`When calling LocalRecorder.record(options) parameter 'options' cannot be a string. Must be an object like { mimeType: "`.concat(options, '" }'));
              }
              if (typeof MediaRecorder === "undefined") {
                logger.error("MediaRecorder not supported on your device. See compatibility in https://caniuse.com/#search=MediaRecorder");
                throw Error("MediaRecorder not supported on your device. See compatibility in https://caniuse.com/#search=MediaRecorder");
              }
              if (_this.state !== LocalRecorderState_1.LocalRecorderState.READY) {
                throw Error("'LocalRecord.record()' needs 'LocalRecord.state' to be 'READY' (current value: '" + _this.state + "'). Call 'LocalRecorder.clean()' or init a new LocalRecorder before");
              }
              logger.log("Starting local recording of stream '" + _this.stream.streamId + "' of connection '" + _this.connectionId + "'");
              if (!options) {
                options = { mimeType: "video/webm" };
              } else if (!options.mimeType) {
                options.mimeType = "video/webm";
              }
              _this.mediaRecorder = new MediaRecorder(_this.stream.getMediaStream(), options);
              _this.mediaRecorder.start();
            } catch (err) {
              return reject(err);
            }
            _this.mediaRecorder.ondataavailable = function(e) {
              if (e.data.size > 0) {
                _this.chunks.push(e.data);
              }
            };
            _this.mediaRecorder.onerror = function(e) {
              logger.error("MediaRecorder error: ", e);
            };
            _this.mediaRecorder.onstart = function() {
              logger.log("MediaRecorder started (state=" + _this.mediaRecorder.state + ")");
            };
            _this.mediaRecorder.onstop = function() {
              _this.onStopDefault();
            };
            _this.mediaRecorder.onpause = function() {
              logger.log("MediaRecorder paused (state=" + _this.mediaRecorder.state + ")");
            };
            _this.mediaRecorder.onresume = function() {
              logger.log("MediaRecorder resumed (state=" + _this.mediaRecorder.state + ")");
            };
            _this.state = LocalRecorderState_1.LocalRecorderState.RECORDING;
            return resolve();
          });
        };
        LocalRecorder2.prototype.stop = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            try {
              if (_this.state === LocalRecorderState_1.LocalRecorderState.READY || _this.state === LocalRecorderState_1.LocalRecorderState.FINISHED) {
                throw Error("'LocalRecord.stop()' needs 'LocalRecord.state' to be 'RECORDING' or 'PAUSED' (current value: '" + _this.state + "'). Call 'LocalRecorder.start()' before");
              }
              _this.mediaRecorder.onstop = function() {
                _this.onStopDefault();
                return resolve();
              };
              _this.mediaRecorder.stop();
            } catch (e) {
              return reject(e);
            }
          });
        };
        LocalRecorder2.prototype.pause = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            try {
              if (_this.state !== LocalRecorderState_1.LocalRecorderState.RECORDING) {
                return reject(Error("'LocalRecord.pause()' needs 'LocalRecord.state' to be 'RECORDING' (current value: '" + _this.state + "'). Call 'LocalRecorder.start()' or 'LocalRecorder.resume()' before"));
              }
              _this.mediaRecorder.pause();
              _this.state = LocalRecorderState_1.LocalRecorderState.PAUSED;
              return resolve();
            } catch (error) {
              return reject(error);
            }
          });
        };
        LocalRecorder2.prototype.resume = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            try {
              if (_this.state !== LocalRecorderState_1.LocalRecorderState.PAUSED) {
                throw Error("'LocalRecord.resume()' needs 'LocalRecord.state' to be 'PAUSED' (current value: '" + _this.state + "'). Call 'LocalRecorder.pause()' before");
              }
              _this.mediaRecorder.resume();
              _this.state = LocalRecorderState_1.LocalRecorderState.RECORDING;
              return resolve();
            } catch (error) {
              return reject(error);
            }
          });
        };
        LocalRecorder2.prototype.preview = function(parentElement) {
          if (this.state !== LocalRecorderState_1.LocalRecorderState.FINISHED) {
            throw Error("'LocalRecord.preview()' needs 'LocalRecord.state' to be 'FINISHED' (current value: '" + this.state + "'). Call 'LocalRecorder.stop()' before");
          }
          this.videoPreview = document.createElement("video");
          this.videoPreview.id = this.id;
          this.videoPreview.autoplay = true;
          if (platform.isSafariBrowser()) {
            this.videoPreview.playsInline = true;
          }
          if (typeof parentElement === "string") {
            var parentElementDom = document.getElementById(parentElement);
            if (parentElementDom) {
              this.videoPreview = parentElementDom.appendChild(this.videoPreview);
            }
          } else {
            this.videoPreview = parentElement.appendChild(this.videoPreview);
          }
          this.videoPreview.src = this.videoPreviewSrc;
          return this.videoPreview;
        };
        LocalRecorder2.prototype.clean = function() {
          var _this = this;
          var f = function() {
            delete _this.blob;
            _this.chunks = [];
            _this.state = LocalRecorderState_1.LocalRecorderState.READY;
          };
          if (this.state === LocalRecorderState_1.LocalRecorderState.RECORDING || this.state === LocalRecorderState_1.LocalRecorderState.PAUSED) {
            this.stop().then(function() {
              return f();
            }).catch(function() {
              return f();
            });
          } else {
            f();
          }
        };
        LocalRecorder2.prototype.download = function() {
          if (this.state !== LocalRecorderState_1.LocalRecorderState.FINISHED) {
            throw Error("'LocalRecord.download()' needs 'LocalRecord.state' to be 'FINISHED' (current value: '" + this.state + "'). Call 'LocalRecorder.stop()' before");
          } else {
            var a = document.createElement("a");
            a.style.display = "none";
            document.body.appendChild(a);
            var url = globalThis.URL.createObjectURL(this.blob);
            a.href = url;
            a.download = this.id + "." + Mime.getExtension(this.blob.type);
            a.click();
            globalThis.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }
        };
        LocalRecorder2.prototype.getBlob = function() {
          if (this.state !== LocalRecorderState_1.LocalRecorderState.FINISHED) {
            throw Error("Call 'LocalRecord.stop()' before getting Blob file");
          } else {
            return this.blob;
          }
        };
        LocalRecorder2.prototype.uploadAsBinary = function(endpoint, headers) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (_this.state !== LocalRecorderState_1.LocalRecorderState.FINISHED) {
              return reject(Error("'LocalRecord.uploadAsBinary()' needs 'LocalRecord.state' to be 'FINISHED' (current value: '" + _this.state + "'). Call 'LocalRecorder.stop()' before"));
            } else {
              var http_1 = new XMLHttpRequest();
              http_1.open("POST", endpoint, true);
              if (typeof headers === "object") {
                for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
                  var key = _a[_i];
                  http_1.setRequestHeader(key, headers[key]);
                }
              }
              http_1.onreadystatechange = function() {
                if (http_1.readyState === 4) {
                  if (http_1.status.toString().charAt(0) === "2") {
                    return resolve(http_1.responseText);
                  } else {
                    return reject(http_1.status);
                  }
                }
              };
              http_1.send(_this.blob);
            }
          });
        };
        LocalRecorder2.prototype.uploadAsMultipartfile = function(endpoint, headers) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (_this.state !== LocalRecorderState_1.LocalRecorderState.FINISHED) {
              return reject(Error("'LocalRecord.uploadAsMultipartfile()' needs 'LocalRecord.state' to be 'FINISHED' (current value: '" + _this.state + "'). Call 'LocalRecorder.stop()' before"));
            } else {
              var http_2 = new XMLHttpRequest();
              http_2.open("POST", endpoint, true);
              if (typeof headers === "object") {
                for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
                  var key = _a[_i];
                  http_2.setRequestHeader(key, headers[key]);
                }
              }
              var sendable = new FormData();
              sendable.append("file", _this.blob, _this.id + "." + Mime.getExtension(_this.blob.type));
              http_2.onreadystatechange = function() {
                if (http_2.readyState === 4) {
                  if (http_2.status.toString().charAt(0) === "2") {
                    return resolve(http_2.responseText);
                  } else {
                    return reject(http_2.status);
                  }
                }
              };
              http_2.send(sendable);
            }
          });
        };
        LocalRecorder2.prototype.onStopDefault = function() {
          logger.log("MediaRecorder stopped  (state=" + this.mediaRecorder.state + ")");
          this.blob = new Blob(this.chunks, { type: this.mediaRecorder.mimeType });
          this.chunks = [];
          this.videoPreviewSrc = globalThis.URL.createObjectURL(this.blob);
          this.state = LocalRecorderState_1.LocalRecorderState.FINISHED;
        };
        return LocalRecorder2;
      }()
    );
    exports.LocalRecorder = LocalRecorder;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js
var require_Event = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Event = void 0;
    var Event = (
      /** @class */
      function() {
        function Event2(cancelable, target, type) {
          this.hasBeenPrevented = false;
          this.cancelable = cancelable;
          this.target = target;
          this.type = type;
        }
        Event2.prototype.isDefaultPrevented = function() {
          return this.hasBeenPrevented;
        };
        Event2.prototype.preventDefault = function() {
          this.callDefaultBehavior = function() {
          };
          this.hasBeenPrevented = true;
        };
        return Event2;
      }()
    );
    exports.Event = Event;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamPropertyChangedEvent.js
var require_StreamPropertyChangedEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamPropertyChangedEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StreamPropertyChangedEvent = void 0;
    var Event_1 = require_Event();
    var StreamPropertyChangedEvent = (
      /** @class */
      function(_super) {
        __extends(StreamPropertyChangedEvent2, _super);
        function StreamPropertyChangedEvent2(target, stream, changedProperty, newValue, oldValue, reason) {
          var _this = _super.call(this, false, target, "streamPropertyChanged") || this;
          _this.stream = stream;
          _this.changedProperty = changedProperty;
          _this.newValue = newValue;
          _this.oldValue = oldValue;
          _this.reason = reason;
          return _this;
        }
        StreamPropertyChangedEvent2.prototype.callDefaultBehavior = function() {
        };
        return StreamPropertyChangedEvent2;
      }(Event_1.Event)
    );
    exports.StreamPropertyChangedEvent = StreamPropertyChangedEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Enums/OpenViduError.js
var require_OpenViduError = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Enums/OpenViduError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OpenViduError = exports.OpenViduErrorName = void 0;
    var OpenViduErrorName;
    (function(OpenViduErrorName2) {
      OpenViduErrorName2["BROWSER_NOT_SUPPORTED"] = "BROWSER_NOT_SUPPORTED";
      OpenViduErrorName2["DEVICE_ACCESS_DENIED"] = "DEVICE_ACCESS_DENIED";
      OpenViduErrorName2["DEVICE_ALREADY_IN_USE"] = "DEVICE_ALREADY_IN_USE";
      OpenViduErrorName2["SCREEN_CAPTURE_DENIED"] = "SCREEN_CAPTURE_DENIED";
      OpenViduErrorName2["SCREEN_SHARING_NOT_SUPPORTED"] = "SCREEN_SHARING_NOT_SUPPORTED";
      OpenViduErrorName2["SCREEN_EXTENSION_NOT_INSTALLED"] = "SCREEN_EXTENSION_NOT_INSTALLED";
      OpenViduErrorName2["SCREEN_EXTENSION_DISABLED"] = "SCREEN_EXTENSION_DISABLED";
      OpenViduErrorName2["INPUT_VIDEO_DEVICE_NOT_FOUND"] = "INPUT_VIDEO_DEVICE_NOT_FOUND";
      OpenViduErrorName2["INPUT_AUDIO_DEVICE_NOT_FOUND"] = "INPUT_AUDIO_DEVICE_NOT_FOUND";
      OpenViduErrorName2["INPUT_AUDIO_DEVICE_GENERIC_ERROR"] = "INPUT_AUDIO_DEVICE_GENERIC_ERROR";
      OpenViduErrorName2["NO_INPUT_SOURCE_SET"] = "NO_INPUT_SOURCE_SET";
      OpenViduErrorName2["PUBLISHER_PROPERTIES_ERROR"] = "PUBLISHER_PROPERTIES_ERROR";
      OpenViduErrorName2["OPENVIDU_PERMISSION_DENIED"] = "OPENVIDU_PERMISSION_DENIED";
      OpenViduErrorName2["OPENVIDU_NOT_CONNECTED"] = "OPENVIDU_NOT_CONNECTED";
      OpenViduErrorName2["VIRTUAL_BACKGROUND_ERROR"] = "VIRTUAL_BACKGROUND_ERROR";
      OpenViduErrorName2["GENERIC_ERROR"] = "GENERIC_ERROR";
    })(OpenViduErrorName = exports.OpenViduErrorName || (exports.OpenViduErrorName = {}));
    var OpenViduError = (
      /** @class */
      function() {
        function OpenViduError2(name, message) {
          this.name = name;
          this.message = message;
        }
        return OpenViduError2;
      }()
    );
    exports.OpenViduError = OpenViduError;
  }
});

// node_modules/openvidu-browser/lib/OpenVidu/Filter.js
var require_Filter = __commonJS({
  "node_modules/openvidu-browser/lib/OpenVidu/Filter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Filter = void 0;
    var StreamPropertyChangedEvent_1 = require_StreamPropertyChangedEvent();
    var OpenViduError_1 = require_OpenViduError();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var Filter = (
      /** @class */
      function() {
        function Filter2(type, options) {
          this.handlers = /* @__PURE__ */ new Map();
          this.type = type;
          this.options = options;
        }
        Filter2.prototype.execMethod = function(method, params) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var _a;
            logger.info("Executing filter method to stream " + _this.stream.streamId);
            var finalParams;
            var successExecMethod = function(triggerEvent) {
              logger.info("Filter method successfully executed on Stream " + _this.stream.streamId);
              var oldValue = Object.assign({}, _this.stream.filter);
              _this.stream.filter.lastExecMethod = { method, params: finalParams };
              if (triggerEvent) {
                _this.stream.session.emitEvent("streamPropertyChanged", [
                  new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.stream.session, _this.stream, "filter", _this.stream.filter, oldValue, "execFilterMethod")
                ]);
                _this.stream.streamManager.emitEvent("streamPropertyChanged", [
                  new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.stream.streamManager, _this.stream, "filter", _this.stream.filter, oldValue, "execFilterMethod")
                ]);
              }
              return resolve();
            };
            if (_this.type.startsWith("VB:")) {
              if (typeof params === "string") {
                try {
                  params = JSON.parse(params);
                } catch (error) {
                  return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.VIRTUAL_BACKGROUND_ERROR, "Wrong params syntax: " + error));
                }
              }
              finalParams = params;
              if (method === "update") {
                if (!((_a = _this.stream.virtualBackgroundSinkElements) === null || _a === void 0 ? void 0 : _a.VB)) {
                  return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.VIRTUAL_BACKGROUND_ERROR, "There is no Virtual Background filter applied"));
                } else {
                  _this.stream.virtualBackgroundSinkElements.VB.updateValues(params).then(function() {
                    return successExecMethod(false);
                  }).catch(function(error) {
                    if (error.name === OpenViduError_1.OpenViduErrorName.VIRTUAL_BACKGROUND_ERROR) {
                      return reject(new OpenViduError_1.OpenViduError(error.name, error.message));
                    } else {
                      return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.VIRTUAL_BACKGROUND_ERROR, "Error updating values on Virtual Background filter: " + error));
                    }
                  });
                }
              } else {
                return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.VIRTUAL_BACKGROUND_ERROR, 'Unknown Virtual Background method "'.concat(method, '"')));
              }
            } else {
              var stringParams = void 0;
              if (typeof params !== "string") {
                try {
                  stringParams = JSON.stringify(params);
                } catch (error) {
                  var errorMsg = "'params' property must be a JSON formatted object";
                  logger.error(errorMsg);
                  return reject(errorMsg);
                }
              } else {
                stringParams = params;
              }
              finalParams = stringParams;
              _this.stream.session.openvidu.sendRequest("execFilterMethod", { streamId: _this.stream.streamId, method, params: stringParams }, function(error, response) {
                if (error) {
                  logger.error("Error executing filter method for Stream " + _this.stream.streamId, error);
                  if (error.code === 401) {
                    return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to execute a filter method"));
                  } else {
                    return reject(error);
                  }
                } else {
                  return successExecMethod(true);
                }
              });
            }
          });
        };
        Filter2.prototype.addEventListener = function(eventType, handler) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            logger.info("Adding filter event listener to event " + eventType + " to stream " + _this.stream.streamId);
            _this.stream.session.openvidu.sendRequest("addFilterEventListener", { streamId: _this.stream.streamId, eventType }, function(error, response) {
              if (error) {
                logger.error("Error adding filter event listener to event " + eventType + "for Stream " + _this.stream.streamId, error);
                if (error.code === 401) {
                  return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to add a filter event listener"));
                } else {
                  return reject(error);
                }
              } else {
                _this.handlers.set(eventType, handler);
                logger.info("Filter event listener to event " + eventType + " successfully applied on Stream " + _this.stream.streamId);
                return resolve();
              }
            });
          });
        };
        Filter2.prototype.removeEventListener = function(eventType) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            logger.info("Removing filter event listener to event " + eventType + " to stream " + _this.stream.streamId);
            _this.stream.session.openvidu.sendRequest("removeFilterEventListener", { streamId: _this.stream.streamId, eventType }, function(error, response) {
              if (error) {
                logger.error("Error removing filter event listener to event " + eventType + "for Stream " + _this.stream.streamId, error);
                if (error.code === 401) {
                  return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to add a filter event listener"));
                } else {
                  return reject(error);
                }
              } else {
                _this.handlers.delete(eventType);
                logger.info("Filter event listener to event " + eventType + " successfully removed on Stream " + _this.stream.streamId);
                return resolve();
              }
            });
          });
        };
        return Filter2;
      }()
    );
    exports.Filter = Filter;
  }
});

// node_modules/wolfy87-eventemitter/EventEmitter.js
var require_EventEmitter = __commonJS({
  "node_modules/wolfy87-eventemitter/EventEmitter.js"(exports, module) {
    (function(exports2) {
      "use strict";
      function EventEmitter() {
      }
      var proto = EventEmitter.prototype;
      var originalGlobalValue = exports2.EventEmitter;
      function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
          if (listeners[i].listener === listener) {
            return i;
          }
        }
        return -1;
      }
      function alias(name) {
        return function aliasClosure() {
          return this[name].apply(this, arguments);
        };
      }
      proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;
        if (evt instanceof RegExp) {
          response = {};
          for (key in events) {
            if (events.hasOwnProperty(key) && evt.test(key)) {
              response[key] = events[key];
            }
          }
        } else {
          response = events[evt] || (events[evt] = []);
        }
        return response;
      };
      proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;
        for (i = 0; i < listeners.length; i += 1) {
          flatListeners.push(listeners[i].listener);
        }
        return flatListeners;
      };
      proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;
        if (listeners instanceof Array) {
          response = {};
          response[evt] = listeners;
        }
        return response || listeners;
      };
      function isValidListener(listener) {
        if (typeof listener === "function" || listener instanceof RegExp) {
          return true;
        } else if (listener && typeof listener === "object") {
          return isValidListener(listener.listener);
        } else {
          return false;
        }
      }
      proto.addListener = function addListener(evt, listener) {
        if (!isValidListener(listener)) {
          throw new TypeError("listener must be a function");
        }
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === "object";
        var key;
        for (key in listeners) {
          if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
            listeners[key].push(listenerIsWrapped ? listener : {
              listener,
              once: false
            });
          }
        }
        return this;
      };
      proto.on = alias("addListener");
      proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
          listener,
          once: true
        });
      };
      proto.once = alias("addOnceListener");
      proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
      };
      proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
          this.defineEvent(evts[i]);
        }
        return this;
      };
      proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;
        for (key in listeners) {
          if (listeners.hasOwnProperty(key)) {
            index = indexOfListener(listeners[key], listener);
            if (index !== -1) {
              listeners[key].splice(index, 1);
            }
          }
        }
        return this;
      };
      proto.off = alias("removeListener");
      proto.addListeners = function addListeners(evt, listeners) {
        return this.manipulateListeners(false, evt, listeners);
      };
      proto.removeListeners = function removeListeners(evt, listeners) {
        return this.manipulateListeners(true, evt, listeners);
      };
      proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;
        if (typeof evt === "object" && !(evt instanceof RegExp)) {
          for (i in evt) {
            if (evt.hasOwnProperty(i) && (value = evt[i])) {
              if (typeof value === "function") {
                single.call(this, i, value);
              } else {
                multiple.call(this, i, value);
              }
            }
          }
        } else {
          i = listeners.length;
          while (i--) {
            single.call(this, evt, listeners[i]);
          }
        }
        return this;
      };
      proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;
        if (type === "string") {
          delete events[evt];
        } else if (evt instanceof RegExp) {
          for (key in events) {
            if (events.hasOwnProperty(key) && evt.test(key)) {
              delete events[key];
            }
          }
        } else {
          delete this._events;
        }
        return this;
      };
      proto.removeAllListeners = alias("removeEvent");
      proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;
        for (key in listenersMap) {
          if (listenersMap.hasOwnProperty(key)) {
            listeners = listenersMap[key].slice(0);
            for (i = 0; i < listeners.length; i++) {
              listener = listeners[i];
              if (listener.once === true) {
                this.removeListener(evt, listener.listener);
              }
              response = listener.listener.apply(this, args || []);
              if (response === this._getOnceReturnValue()) {
                this.removeListener(evt, listener.listener);
              }
            }
          }
        }
        return this;
      };
      proto.trigger = alias("emitEvent");
      proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
      };
      proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
      };
      proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty("_onceReturnValue")) {
          return this._onceReturnValue;
        } else {
          return true;
        }
      };
      proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
      };
      EventEmitter.noConflict = function noConflict() {
        exports2.EventEmitter = originalGlobalValue;
        return EventEmitter;
      };
      if (typeof define === "function" && define.amd) {
        define(function() {
          return EventEmitter;
        });
      } else if (typeof module === "object" && module.exports) {
        module.exports = EventEmitter;
      } else {
        exports2.EventEmitter = EventEmitter;
      }
    })(typeof window !== "undefined" ? window : exports || {});
  }
});

// node_modules/openvidu-browser/lib/OpenVidu/EventDispatcher.js
var require_EventDispatcher = __commonJS({
  "node_modules/openvidu-browser/lib/OpenVidu/EventDispatcher.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventDispatcher = void 0;
    var OpenViduLogger_1 = require_OpenViduLogger();
    var EventEmitter = require_EventEmitter();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var EventDispatcher = (
      /** @class */
      function() {
        function EventDispatcher2() {
          this.userHandlerArrowHandler = /* @__PURE__ */ new WeakMap();
          this.ee = new EventEmitter();
        }
        EventDispatcher2.prototype.onAux = function(type, message, handler) {
          var arrowHandler = function(event) {
            if (event) {
              logger.debug(message, event);
            } else {
              logger.debug(message);
            }
            handler(event);
          };
          this.userHandlerArrowHandler.set(handler, arrowHandler);
          this.ee.on(type, arrowHandler);
          return this;
        };
        EventDispatcher2.prototype.onceAux = function(type, message, handler) {
          var _this = this;
          var arrowHandler = function(event) {
            if (event) {
              logger.debug(message, event);
            } else {
              logger.debug(message);
            }
            handler(event);
            _this.userHandlerArrowHandler.delete(handler);
          };
          this.userHandlerArrowHandler.set(handler, arrowHandler);
          this.ee.once(type, arrowHandler);
          return this;
        };
        EventDispatcher2.prototype.offAux = function(type, handler) {
          if (!handler) {
            this.ee.removeAllListeners(type);
          } else {
            var arrowHandler = this.userHandlerArrowHandler.get(handler);
            if (!!arrowHandler) {
              this.ee.off(type, arrowHandler);
            }
            this.userHandlerArrowHandler.delete(handler);
          }
          return this;
        };
        return EventDispatcher2;
      }()
    );
    exports.EventDispatcher = EventDispatcher;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamManagerEvent.js
var require_StreamManagerEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamManagerEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StreamManagerEvent = void 0;
    var Event_1 = require_Event();
    var StreamManagerEvent = (
      /** @class */
      function(_super) {
        __extends(StreamManagerEvent2, _super);
        function StreamManagerEvent2(target, type, value) {
          var _this = _super.call(this, false, target, type) || this;
          _this.value = value;
          return _this;
        }
        StreamManagerEvent2.prototype.callDefaultBehavior = function() {
        };
        return StreamManagerEvent2;
      }(Event_1.Event)
    );
    exports.StreamManagerEvent = StreamManagerEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/VideoElementEvent.js
var require_VideoElementEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/VideoElementEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VideoElementEvent = void 0;
    var Event_1 = require_Event();
    var VideoElementEvent = (
      /** @class */
      function(_super) {
        __extends(VideoElementEvent2, _super);
        function VideoElementEvent2(element, target, type) {
          var _this = _super.call(this, false, target, type) || this;
          _this.element = element;
          return _this;
        }
        VideoElementEvent2.prototype.callDefaultBehavior = function() {
        };
        return VideoElementEvent2;
      }(Event_1.Event)
    );
    exports.VideoElementEvent = VideoElementEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/ExceptionEvent.js
var require_ExceptionEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/ExceptionEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExceptionEvent = exports.ExceptionEventName = void 0;
    var Event_1 = require_Event();
    var ExceptionEventName;
    (function(ExceptionEventName2) {
      ExceptionEventName2["ICE_CANDIDATE_ERROR"] = "ICE_CANDIDATE_ERROR";
      ExceptionEventName2["ICE_CONNECTION_FAILED"] = "ICE_CONNECTION_FAILED";
      ExceptionEventName2["ICE_CONNECTION_DISCONNECTED"] = "ICE_CONNECTION_DISCONNECTED";
      ExceptionEventName2["NO_STREAM_PLAYING_EVENT"] = "NO_STREAM_PLAYING_EVENT";
      ExceptionEventName2["SPEECH_TO_TEXT_DISCONNECTED"] = "SPEECH_TO_TEXT_DISCONNECTED";
    })(ExceptionEventName = exports.ExceptionEventName || (exports.ExceptionEventName = {}));
    var ExceptionEvent = (
      /** @class */
      function(_super) {
        __extends(ExceptionEvent2, _super);
        function ExceptionEvent2(session, name, origin, message, data) {
          var _this = _super.call(this, false, session, "exception") || this;
          _this.name = name;
          _this.origin = origin;
          _this.message = message;
          _this.data = data;
          return _this;
        }
        ExceptionEvent2.prototype.callDefaultBehavior = function() {
        };
        return ExceptionEvent2;
      }(Event_1.Event)
    );
    exports.ExceptionEvent = ExceptionEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Enums/VideoInsertMode.js
var require_VideoInsertMode = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Enums/VideoInsertMode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VideoInsertMode = void 0;
    var VideoInsertMode;
    (function(VideoInsertMode2) {
      VideoInsertMode2["AFTER"] = "AFTER";
      VideoInsertMode2["APPEND"] = "APPEND";
      VideoInsertMode2["BEFORE"] = "BEFORE";
      VideoInsertMode2["PREPEND"] = "PREPEND";
      VideoInsertMode2["REPLACE"] = "REPLACE";
    })(VideoInsertMode = exports.VideoInsertMode || (exports.VideoInsertMode = {}));
  }
});

// node_modules/openvidu-browser/lib/OpenVidu/StreamManager.js
var require_StreamManager = __commonJS({
  "node_modules/openvidu-browser/lib/OpenVidu/StreamManager.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StreamManager = void 0;
    var EventDispatcher_1 = require_EventDispatcher();
    var StreamManagerEvent_1 = require_StreamManagerEvent();
    var VideoElementEvent_1 = require_VideoElementEvent();
    var ExceptionEvent_1 = require_ExceptionEvent();
    var VideoInsertMode_1 = require_VideoInsertMode();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var Platform_1 = require_Platform();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var platform;
    var StreamManager = (
      /** @class */
      function(_super) {
        __extends(StreamManager2, _super);
        function StreamManager2(stream, targetElement) {
          var _this = _super.call(this) || this;
          _this.videos = [];
          _this.lazyLaunchVideoElementCreatedEvent = false;
          platform = Platform_1.PlatformUtils.getInstance();
          _this.stream = stream;
          _this.stream.streamManager = _this;
          _this.remote = !_this.stream.isLocal();
          if (!!targetElement) {
            var targEl = void 0;
            if (typeof targetElement === "string") {
              targEl = document.getElementById(targetElement);
            } else if (targetElement instanceof HTMLElement) {
              targEl = targetElement;
            }
            if (!!targEl) {
              _this.firstVideoElement = {
                targetElement: targEl,
                video: document.createElement("video"),
                id: "",
                canplayListenerAdded: false
              };
              if (platform.isSafariBrowser() || platform.isIPhoneOrIPad() && (platform.isChromeMobileBrowser() || platform.isEdgeMobileBrowser() || platform.isOperaMobileBrowser() || platform.isFirefoxMobileBrowser())) {
                _this.firstVideoElement.video.playsInline = true;
              }
              _this.targetElement = targEl;
              _this.element = targEl;
            }
          }
          _this.canPlayListener = function() {
            _this.deactivateStreamPlayingEventExceptionTimeout();
            _this.ee.emitEvent("streamPlaying", [new StreamManagerEvent_1.StreamManagerEvent(_this, "streamPlaying", void 0)]);
          };
          return _this;
        }
        StreamManager2.prototype.on = function(type, handler) {
          _super.prototype.onAux.call(this, type, "Event '" + type + "' triggered by '" + (this.remote ? "Subscriber" : "Publisher") + "'", handler);
          if (type === "videoElementCreated") {
            if (!!this.stream && this.lazyLaunchVideoElementCreatedEvent) {
              this.ee.emitEvent("videoElementCreated", [new VideoElementEvent_1.VideoElementEvent(this.videos[0].video, this, "videoElementCreated")]);
              this.lazyLaunchVideoElementCreatedEvent = false;
            }
          }
          if (type === "streamPlaying") {
            if (this.videos[0] && this.videos[0].video && this.videos[0].video.currentTime > 0 && this.videos[0].video.paused === false && this.videos[0].video.ended === false && this.videos[0].video.readyState === 4) {
              this.ee.emitEvent("streamPlaying", [new StreamManagerEvent_1.StreamManagerEvent(this, "streamPlaying", void 0)]);
            }
          }
          if (this.stream.hasAudio) {
            if (type === "publisherStartSpeaking") {
              this.stream.enableHarkSpeakingEvent();
            }
            if (type === "publisherStopSpeaking") {
              this.stream.enableHarkStoppedSpeakingEvent();
            }
            if (type === "streamAudioVolumeChange") {
              this.stream.enableHarkVolumeChangeEvent(false);
            }
          }
          return this;
        };
        StreamManager2.prototype.once = function(type, handler) {
          _super.prototype.onceAux.call(this, type, "Event '" + type + "' triggered once by '" + (this.remote ? "Subscriber" : "Publisher") + "'", handler);
          if (type === "videoElementCreated") {
            if (!!this.stream && this.lazyLaunchVideoElementCreatedEvent) {
              this.ee.emitEvent("videoElementCreated", [new VideoElementEvent_1.VideoElementEvent(this.videos[0].video, this, "videoElementCreated")]);
            }
          }
          if (type === "streamPlaying") {
            if (this.videos[0] && this.videos[0].video && this.videos[0].video.currentTime > 0 && this.videos[0].video.paused === false && this.videos[0].video.ended === false && this.videos[0].video.readyState === 4) {
              this.ee.emitEvent("streamPlaying", [new StreamManagerEvent_1.StreamManagerEvent(this, "streamPlaying", void 0)]);
            }
          }
          if (this.stream.hasAudio) {
            if (type === "publisherStartSpeaking") {
              this.stream.enableOnceHarkSpeakingEvent();
            }
            if (type === "publisherStopSpeaking") {
              this.stream.enableOnceHarkStoppedSpeakingEvent();
            }
            if (type === "streamAudioVolumeChange") {
              this.stream.enableOnceHarkVolumeChangeEvent(false);
            }
          }
          return this;
        };
        StreamManager2.prototype.off = function(type, handler) {
          _super.prototype.offAux.call(this, type, handler);
          if (type === "publisherStartSpeaking") {
            var remainingStartSpeakingEventListeners = this.ee.getListeners(type).length + this.stream.session.ee.getListeners(type).length;
            if (remainingStartSpeakingEventListeners === 0) {
              this.stream.disableHarkSpeakingEvent(false);
            }
          }
          if (type === "publisherStopSpeaking") {
            var remainingStopSpeakingEventListeners = this.ee.getListeners(type).length + this.stream.session.ee.getListeners(type).length;
            if (remainingStopSpeakingEventListeners === 0) {
              this.stream.disableHarkStoppedSpeakingEvent(false);
            }
          }
          if (type === "streamAudioVolumeChange") {
            var remainingVolumeEventListeners = this.ee.getListeners(type).length;
            if (remainingVolumeEventListeners === 0) {
              this.stream.disableHarkVolumeChangeEvent(false);
            }
          }
          return this;
        };
        StreamManager2.prototype.addVideoElement = function(video) {
          this.initializeVideoProperties(video);
          if (!this.remote && this.stream.displayMyRemote()) {
            if (video.srcObject !== this.stream.getMediaStream()) {
              video.srcObject = this.stream.getMediaStream();
            }
          }
          for (var _i = 0, _a = this.videos; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v.video === video) {
              return 0;
            }
          }
          var returnNumber = 1;
          for (var _b = 0, _c = this.stream.session.streamManagers; _b < _c.length; _b++) {
            var streamManager = _c[_b];
            if (streamManager.disassociateVideo(video)) {
              returnNumber = -1;
              break;
            }
          }
          this.stream.session.streamManagers.forEach(function(streamManager2) {
            streamManager2.disassociateVideo(video);
          });
          this.pushNewStreamManagerVideo({
            video,
            id: video.id,
            canplayListenerAdded: false
          });
          logger.info("New video element associated to ", this);
          return returnNumber;
        };
        StreamManager2.prototype.createVideoElement = function(targetElement, insertMode) {
          var targEl;
          if (typeof targetElement === "string") {
            targEl = document.getElementById(targetElement);
            if (!targEl) {
              throw new Error("The provided 'targetElement' couldn't be resolved to any HTML element: " + targetElement);
            }
          } else if (targetElement instanceof HTMLElement) {
            targEl = targetElement;
          } else {
            throw new Error("The provided 'targetElement' couldn't be resolved to any HTML element: " + targetElement);
          }
          var video = this.createVideo();
          this.initializeVideoProperties(video);
          var insMode = !!insertMode ? insertMode : VideoInsertMode_1.VideoInsertMode.APPEND;
          switch (insMode) {
            case VideoInsertMode_1.VideoInsertMode.AFTER:
              targEl.parentNode.insertBefore(video, targEl.nextSibling);
              break;
            case VideoInsertMode_1.VideoInsertMode.APPEND:
              targEl.appendChild(video);
              break;
            case VideoInsertMode_1.VideoInsertMode.BEFORE:
              targEl.parentNode.insertBefore(video, targEl);
              break;
            case VideoInsertMode_1.VideoInsertMode.PREPEND:
              targEl.insertBefore(video, targEl.childNodes[0]);
              break;
            case VideoInsertMode_1.VideoInsertMode.REPLACE:
              targEl.parentNode.replaceChild(video, targEl);
              break;
            default:
              insMode = VideoInsertMode_1.VideoInsertMode.APPEND;
              targEl.appendChild(video);
              break;
          }
          var v = {
            targetElement: targEl,
            video,
            insertMode: insMode,
            id: video.id,
            canplayListenerAdded: false
          };
          this.pushNewStreamManagerVideo(v);
          this.ee.emitEvent("videoElementCreated", [new VideoElementEvent_1.VideoElementEvent(v.video, this, "videoElementCreated")]);
          this.lazyLaunchVideoElementCreatedEvent = !!this.firstVideoElement;
          return video;
        };
        StreamManager2.prototype.updatePublisherSpeakingEventsOptions = function(publisherSpeakingEventsOptions) {
          var currentHarkOptions = !!this.stream.harkOptions ? this.stream.harkOptions : this.stream.session.openvidu.advancedConfiguration.publisherSpeakingEventsOptions || {};
          var newInterval = typeof publisherSpeakingEventsOptions.interval === "number" ? publisherSpeakingEventsOptions.interval : typeof currentHarkOptions.interval === "number" ? currentHarkOptions.interval : 100;
          var newThreshold = typeof publisherSpeakingEventsOptions.threshold === "number" ? publisherSpeakingEventsOptions.threshold : typeof currentHarkOptions.threshold === "number" ? currentHarkOptions.threshold : -50;
          this.stream.harkOptions = {
            interval: newInterval,
            threshold: newThreshold
          };
          if (!!this.stream.speechEvent) {
            this.stream.speechEvent.setInterval(newInterval);
            this.stream.speechEvent.setThreshold(newThreshold);
          }
        };
        StreamManager2.prototype.initializeVideoProperties = function(video) {
          if (!(!this.remote && this.stream.displayMyRemote())) {
            if (video.srcObject !== this.stream.getMediaStream()) {
              video.srcObject = this.stream.getMediaStream();
            }
          }
          video.autoplay = true;
          video.controls = false;
          if (platform.isSafariBrowser() || platform.isIPhoneOrIPad() && (platform.isChromeMobileBrowser() || platform.isEdgeMobileBrowser() || platform.isOperaMobileBrowser() || platform.isFirefoxMobileBrowser())) {
            video.playsInline = true;
          }
          if (!video.id) {
            video.id = (this.remote ? "remote-" : "local-") + "video-" + this.stream.streamId;
            if (!this.id && !!this.targetElement) {
              this.id = video.id;
            }
          }
          if (this.remote && this.isMirroredVideo(video)) {
            this.removeMirrorVideo(video);
          } else if (!this.remote && !this.stream.displayMyRemote()) {
            video.muted = true;
            if (this.isMirroredVideo(video) && !this.stream.outboundStreamOpts.publisherProperties.mirror) {
              this.removeMirrorVideo(video);
            } else if (this.stream.outboundStreamOpts.publisherProperties.mirror && !this.stream.isSendScreen()) {
              this.mirrorVideo(video);
            }
          }
        };
        StreamManager2.prototype.removeAllVideos = function() {
          var _this = this;
          for (var i = this.stream.session.streamManagers.length - 1; i >= 0; --i) {
            if (this.stream.session.streamManagers[i] === this) {
              this.stream.session.streamManagers.splice(i, 1);
            }
          }
          this.videos.forEach(function(streamManagerVideo) {
            if (!!streamManagerVideo.video && !!streamManagerVideo.video.removeEventListener) {
              streamManagerVideo.video.removeEventListener("canplay", _this.canPlayListener);
            }
            streamManagerVideo.canplayListenerAdded = false;
            if (!!streamManagerVideo.targetElement) {
              streamManagerVideo.video.parentNode.removeChild(streamManagerVideo.video);
              _this.ee.emitEvent("videoElementDestroyed", [
                new VideoElementEvent_1.VideoElementEvent(streamManagerVideo.video, _this, "videoElementDestroyed")
              ]);
            }
            _this.removeSrcObject(streamManagerVideo);
            _this.videos.filter(function(v) {
              return !v.targetElement;
            });
          });
        };
        StreamManager2.prototype.disassociateVideo = function(video) {
          var disassociated = false;
          for (var i = 0; i < this.videos.length; i++) {
            if (this.videos[i].video === video) {
              this.videos[i].video.removeEventListener("canplay", this.canPlayListener);
              this.videos.splice(i, 1);
              disassociated = true;
              logger.info("Video element disassociated from ", this);
              break;
            }
          }
          return disassociated;
        };
        StreamManager2.prototype.addPlayEventToFirstVideo = function() {
          if (!!this.videos[0] && !!this.videos[0].video && !this.videos[0].canplayListenerAdded) {
            this.activateStreamPlayingEventExceptionTimeout();
            this.videos[0].video.addEventListener("canplay", this.canPlayListener);
            this.videos[0].canplayListenerAdded = true;
          }
        };
        StreamManager2.prototype.updateMediaStream = function(mediaStream) {
          this.videos.forEach(function(streamManagerVideo) {
            streamManagerVideo.video.srcObject = mediaStream;
            if (platform.isIonicIos()) {
              var vParent = streamManagerVideo.video.parentElement;
              var newVideo = streamManagerVideo.video;
              vParent.replaceChild(newVideo, streamManagerVideo.video);
              streamManagerVideo.video = newVideo;
            }
          });
        };
        StreamManager2.prototype.emitEvent = function(type, eventArray) {
          this.ee.emitEvent(type, eventArray);
        };
        StreamManager2.prototype.createVideo = function() {
          return document.createElement("video");
        };
        StreamManager2.prototype.removeSrcObject = function(streamManagerVideo) {
          streamManagerVideo.video.srcObject = null;
          this.deactivateStreamPlayingEventExceptionTimeout();
        };
        StreamManager2.prototype.pushNewStreamManagerVideo = function(streamManagerVideo) {
          this.videos.push(streamManagerVideo);
          this.addPlayEventToFirstVideo();
          if (this.stream.session.streamManagers.indexOf(this) === -1) {
            this.stream.session.streamManagers.push(this);
          }
        };
        StreamManager2.prototype.mirrorVideo = function(video) {
          if (!platform.isIonicIos()) {
            video.style.transform = "rotateY(180deg)";
            video.style.webkitTransform = "rotateY(180deg)";
          }
        };
        StreamManager2.prototype.removeMirrorVideo = function(video) {
          video.style.transform = "unset";
          video.style.webkitTransform = "unset";
        };
        StreamManager2.prototype.isMirroredVideo = function(video) {
          return video.style.transform === "rotateY(180deg)" || video.style.webkitTransform === "rotateY(180deg)";
        };
        StreamManager2.prototype.activateStreamPlayingEventExceptionTimeout = function() {
          var _this = this;
          if (!this.remote) {
            return;
          }
          if (this.streamPlayingEventExceptionTimeout != null) {
            return;
          }
          var msTimeout = this.stream.session.openvidu.advancedConfiguration.noStreamPlayingEventExceptionTimeout || 4e3;
          this.streamPlayingEventExceptionTimeout = setTimeout(function() {
            var msg = "StreamManager of Stream " + _this.stream.streamId + " (" + (_this.remote ? "Subscriber" : "Publisher") + ') did not trigger "streamPlaying" event in ' + msTimeout + " ms";
            logger.warn(msg);
            _this.stream.session.emitEvent("exception", [
              new ExceptionEvent_1.ExceptionEvent(_this.stream.session, ExceptionEvent_1.ExceptionEventName.NO_STREAM_PLAYING_EVENT, _this, msg)
            ]);
            delete _this.streamPlayingEventExceptionTimeout;
          }, msTimeout);
        };
        StreamManager2.prototype.deactivateStreamPlayingEventExceptionTimeout = function() {
          clearTimeout(this.streamPlayingEventExceptionTimeout);
          delete this.streamPlayingEventExceptionTimeout;
        };
        return StreamManager2;
      }(EventDispatcher_1.EventDispatcher)
    );
    exports.StreamManager = StreamManager;
  }
});

// node_modules/openvidu-browser/lib/OpenVidu/Subscriber.js
var require_Subscriber = __commonJS({
  "node_modules/openvidu-browser/lib/OpenVidu/Subscriber.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Subscriber = void 0;
    var StreamManager_1 = require_StreamManager();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var Subscriber = (
      /** @class */
      function(_super) {
        __extends(Subscriber2, _super);
        function Subscriber2(stream, targEl, properties) {
          var _this = _super.call(this, stream, targEl) || this;
          _this.element = _this.targetElement;
          _this.stream = stream;
          _this.properties = properties;
          return _this;
        }
        Subscriber2.prototype.subscribeToAudio = function(value) {
          this.stream.getMediaStream().getAudioTracks().forEach(function(track) {
            track.enabled = value;
          });
          this.stream.audioActive = value;
          logger.info("'Subscriber' has " + (value ? "subscribed to" : "unsubscribed from") + " its audio stream");
          return this;
        };
        Subscriber2.prototype.subscribeToVideo = function(value) {
          this.stream.getMediaStream().getVideoTracks().forEach(function(track) {
            track.enabled = value;
          });
          this.stream.videoActive = value;
          logger.info("'Subscriber' has " + (value ? "subscribed to" : "unsubscribed from") + " its video stream");
          return this;
        };
        Subscriber2.prototype.replaceTrackInMediaStream = function(track, updateLastConstraints) {
          var mediaStream = this.stream.getMediaStream();
          var removedTrack;
          if (track.kind === "video") {
            removedTrack = mediaStream.getVideoTracks()[0];
            if (updateLastConstraints) {
              this.stream.lastVideoTrackConstraints = track.getConstraints();
            }
          } else {
            removedTrack = mediaStream.getAudioTracks()[0];
          }
          mediaStream.removeTrack(removedTrack);
          removedTrack.stop();
          mediaStream.addTrack(track);
        };
        return Subscriber2;
      }(StreamManager_1.StreamManager)
    );
    exports.Subscriber = Subscriber;
  }
});

// node_modules/normalice/index.js
var require_normalice = __commonJS({
  "node_modules/normalice/index.js"(exports, module) {
    var protocols = [
      "stun:",
      "turn:"
    ];
    module.exports = function(input) {
      var url = (input || {}).url || input;
      var protocol;
      var parts;
      var output = {};
      if (typeof url != "string" && !(url instanceof String)) {
        return input;
      }
      url = url.trim();
      protocol = protocols[protocols.indexOf(url.slice(0, 5))];
      if (!protocol) {
        return input;
      }
      url = url.slice(5);
      parts = url.split("@");
      output.username = input.username;
      output.credential = input.credential;
      if (parts.length > 1) {
        url = parts[1];
        parts = parts[0].split(":");
        output.username = parts[0];
        output.credential = (input || {}).credential || parts[1] || "";
      }
      output.url = protocol + url;
      output.urls = [output.url];
      return output;
    };
  }
});

// node_modules/freeice/stun.json
var require_stun = __commonJS({
  "node_modules/freeice/stun.json"(exports, module) {
    module.exports = [
      "stun.l.google.com:19302",
      "stun1.l.google.com:19302",
      "stun2.l.google.com:19302",
      "stun3.l.google.com:19302",
      "stun4.l.google.com:19302",
      "stun.ekiga.net",
      "stun.ideasip.com",
      "stun.schlund.de",
      "stun.stunprotocol.org:3478",
      "stun.voiparound.com",
      "stun.voipbuster.com",
      "stun.voipstunt.com",
      "stun.voxgratia.org"
    ];
  }
});

// node_modules/freeice/turn.json
var require_turn = __commonJS({
  "node_modules/freeice/turn.json"(exports, module) {
    module.exports = [];
  }
});

// node_modules/freeice/index.js
var require_freeice = __commonJS({
  "node_modules/freeice/index.js"(exports, module) {
    "use strict";
    var normalice = require_normalice();
    var freeice = function(opts) {
      var servers = {
        stun: (opts || {}).stun || require_stun(),
        turn: (opts || {}).turn || require_turn()
      };
      var stunCount = (opts || {}).stunCount || 2;
      var turnCount = (opts || {}).turnCount || 0;
      var selected;
      function getServers(type, count) {
        var out = [];
        var input = [].concat(servers[type]);
        var idx;
        while (input.length && out.length < count) {
          idx = Math.random() * input.length | 0;
          out = out.concat(input.splice(idx, 1));
        }
        return out.map(function(url) {
          if (typeof url !== "string" && !(url instanceof String)) {
            return url;
          } else {
            return normalice(type + ":" + url);
          }
        });
      }
      selected = [].concat(getServers("stun", stunCount));
      if (turnCount) {
        selected = selected.concat(getServers("turn", turnCount));
      }
      return selected;
    };
    module.exports = freeice;
  }
});

// node_modules/uuid/dist/commonjs-browser/rng.js
var require_rng = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var getRandomValues;
    var rnds8 = new Uint8Array(16);
    function rng() {
      if (!getRandomValues) {
        getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
        if (!getRandomValues) {
          throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        }
      }
      return getRandomValues(rnds8);
    }
  }
});

// node_modules/uuid/dist/commonjs-browser/regex.js
var require_regex = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/validate.js
var require_validate = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function validate(uuid) {
      return typeof uuid === "string" && _regex.default.test(uuid);
    }
    var _default = validate;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/stringify.js
var require_stringify = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    exports.unsafeStringify = unsafeStringify;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).slice(1));
    }
    function unsafeStringify(arr, offset = 0) {
      return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    }
    function stringify(arr, offset = 0) {
      const uuid = unsafeStringify(arr, offset);
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid;
    }
    var _default = stringify;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v1.js
var require_v1 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = require_stringify();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v1(options, buf, offset) {
      let i = buf && offset || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.unsafeStringify)(b);
    }
    var _default = v1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/parse.js
var require_parse = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parse(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    var _default = parse;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v35.js
var require_v35 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v35.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.URL = exports.DNS = void 0;
    exports.default = v35;
    var _stringify = require_stringify();
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.DNS = DNS;
    var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = URL2;
    function v35(name, version, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        var _namespace;
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.unsafeStringify)(bytes);
      }
      try {
        generateUUID.name = name;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL2;
      return generateUUID;
    }
  }
});

// node_modules/uuid/dist/commonjs-browser/md5.js
var require_md5 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/md5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    function md5(bytes) {
      if (typeof bytes === "string") {
        const msg = unescape(encodeURIComponent(bytes));
        bytes = new Uint8Array(msg.length);
        for (let i = 0; i < msg.length; ++i) {
          bytes[i] = msg.charCodeAt(i);
        }
      }
      return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
    }
    function md5ToHexEncodedArray(input) {
      const output = [];
      const length32 = input.length * 32;
      const hexTab = "0123456789abcdef";
      for (let i = 0; i < length32; i += 8) {
        const x = input[i >> 5] >>> i % 32 & 255;
        const hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
        output.push(hex);
      }
      return output;
    }
    function getOutputLength(inputLength8) {
      return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
    }
    function wordsToMd5(x, len) {
      x[len >> 5] |= 128 << len % 32;
      x[getOutputLength(len) - 1] = len;
      let a = 1732584193;
      let b = -271733879;
      let c = -1732584194;
      let d = 271733878;
      for (let i = 0; i < x.length; i += 16) {
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
      }
      return [a, b, c, d];
    }
    function bytesToWords(input) {
      if (input.length === 0) {
        return [];
      }
      const length8 = input.length * 8;
      const output = new Uint32Array(getOutputLength(length8));
      for (let i = 0; i < length8; i += 8) {
        output[i >> 5] |= (input[i / 8] & 255) << i % 32;
      }
      return output;
    }
    function safeAdd(x, y) {
      const lsw = (x & 65535) + (y & 65535);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 65535;
    }
    function bitRotateLeft(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    function md5cmn(q, a, b, x, s, t) {
      return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
    }
    function md5ff(a, b, c, d, x, s, t) {
      return md5cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function md5gg(a, b, c, d, x, s, t) {
      return md5cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function md5hh(a, b, c, d, x, s, t) {
      return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5ii(a, b, c, d, x, s, t) {
      return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    var _default = md5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v3.js
var require_v3 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v3 = (0, _v.default)("v3", 48, _md.default);
    var _default = v3;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/native.js
var require_native = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/native.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
    var _default = {
      randomUUID
    };
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v4.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _native = _interopRequireDefault(require_native());
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = require_stringify();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function v4(options, buf, offset) {
      if (_native.default.randomUUID && !buf && !options) {
        return _native.default.randomUUID();
      }
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.unsafeStringify)(rnds);
    }
    var _default = v4;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/sha1.js
var require_sha1 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/sha1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    function f(s, x, y, z) {
      switch (s) {
        case 0:
          return x & y ^ ~x & z;
        case 1:
          return x ^ y ^ z;
        case 2:
          return x & y ^ x & z ^ y & z;
        case 3:
          return x ^ y ^ z;
      }
    }
    function ROTL(x, n) {
      return x << n | x >>> 32 - n;
    }
    function sha1(bytes) {
      const K = [1518500249, 1859775393, 2400959708, 3395469782];
      const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      if (typeof bytes === "string") {
        const msg = unescape(encodeURIComponent(bytes));
        bytes = [];
        for (let i = 0; i < msg.length; ++i) {
          bytes.push(msg.charCodeAt(i));
        }
      } else if (!Array.isArray(bytes)) {
        bytes = Array.prototype.slice.call(bytes);
      }
      bytes.push(128);
      const l = bytes.length / 4 + 2;
      const N = Math.ceil(l / 16);
      const M = new Array(N);
      for (let i = 0; i < N; ++i) {
        const arr = new Uint32Array(16);
        for (let j = 0; j < 16; ++j) {
          arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
        }
        M[i] = arr;
      }
      M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
      M[N - 1][14] = Math.floor(M[N - 1][14]);
      M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
      for (let i = 0; i < N; ++i) {
        const W = new Uint32Array(80);
        for (let t = 0; t < 16; ++t) {
          W[t] = M[i][t];
        }
        for (let t = 16; t < 80; ++t) {
          W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        }
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        let e = H[4];
        for (let t = 0; t < 80; ++t) {
          const s = Math.floor(t / 20);
          const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
          e = d;
          d = c;
          c = ROTL(b, 30) >>> 0;
          b = a;
          a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
      }
      return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
    }
    var _default = sha1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v5.js
var require_v5 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v5 = (0, _v.default)("v5", 80, _sha.default);
    var _default = v5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/nil.js
var require_nil = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/nil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = "00000000-0000-0000-0000-000000000000";
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/version.js
var require_version = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function version(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid.slice(14, 15), 16);
    }
    var _default = version;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/index.js
var require_commonjs_browser = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: function get() {
        return _nil.default;
      }
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function get() {
        return _parse.default;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function get() {
        return _stringify.default;
      }
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: function get() {
        return _v.default;
      }
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: function get() {
        return _v2.default;
      }
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: function get() {
        return _v3.default;
      }
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: function get() {
        return _v4.default;
      }
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: function get() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: function get() {
        return _version.default;
      }
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/WebRtcPeer/WebRtcPeer.js
var require_WebRtcPeer = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/WebRtcPeer/WebRtcPeer.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebRtcPeerSendrecv = exports.WebRtcPeerSendonly = exports.WebRtcPeerRecvonly = exports.WebRtcPeer = void 0;
    var freeice = require_freeice();
    var uuid_1 = require_commonjs_browser();
    var ExceptionEvent_1 = require_ExceptionEvent();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var Platform_1 = require_Platform();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var platform;
    var WebRtcPeer = (
      /** @class */
      function() {
        function WebRtcPeer2(configuration) {
          var _this = this;
          this.remoteCandidatesQueue = [];
          this.localCandidatesQueue = [];
          this.iceCandidateList = [];
          platform = Platform_1.PlatformUtils.getInstance();
          this.configuration = __assign(__assign({}, configuration), { iceServers: !!configuration.iceServers && configuration.iceServers.length > 0 ? configuration.iceServers : freeice(), mediaStream: configuration.mediaStream !== void 0 ? configuration.mediaStream : null, mode: !!configuration.mode ? configuration.mode : "sendrecv", id: !!configuration.id ? configuration.id : this.generateUniqueId() });
          logger.debug("[WebRtcPeer] configuration:\n".concat(JSON.stringify(this.configuration, null, 2)));
          this.pc = new RTCPeerConnection({ iceServers: this.configuration.iceServers });
          this.pc.addEventListener("icecandidate", function(event) {
            if (event.candidate !== null) {
              var candidateInit = event.candidate;
              var iceCandidate = new RTCIceCandidate(candidateInit);
              _this.configuration.onIceCandidate(iceCandidate);
              if (iceCandidate.candidate !== "") {
                _this.localCandidatesQueue.push(iceCandidate);
              }
            }
          });
          this.pc.addEventListener("signalingstatechange", function() {
            return __awaiter(_this, void 0, void 0, function() {
              var candidate, error_1;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    if (!(this.pc.signalingState === "stable"))
                      return [3, 6];
                    _a.label = 1;
                  case 1:
                    if (!(this.iceCandidateList.length > 0))
                      return [3, 6];
                    candidate = this.iceCandidateList.shift();
                    _a.label = 2;
                  case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, this.pc.addIceCandidate(candidate)];
                  case 3:
                    _a.sent();
                    return [3, 5];
                  case 4:
                    error_1 = _a.sent();
                    logger.error("Error when calling RTCPeerConnection#addIceCandidate for RTCPeerConnection " + this.getId(), error_1);
                    return [3, 5];
                  case 5:
                    return [3, 1];
                  case 6:
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          });
        }
        WebRtcPeer2.prototype.getId = function() {
          return this.configuration.id;
        };
        WebRtcPeer2.prototype.dispose = function() {
          logger.debug("Disposing WebRtcPeer");
          if (this.pc) {
            if (this.pc.signalingState === "closed") {
              return;
            }
            this.pc.close();
            this.remoteCandidatesQueue = [];
            this.localCandidatesQueue = [];
          }
        };
        WebRtcPeer2.prototype.createOfferLegacy = function() {
          if (!!this.configuration.mediaStream) {
            this.deprecatedPeerConnectionTrackApi();
          }
          var hasAudio = this.configuration.mediaConstraints.audio;
          var hasVideo = this.configuration.mediaConstraints.video;
          var options = {
            offerToReceiveAudio: this.configuration.mode !== "sendonly" && hasAudio,
            offerToReceiveVideo: this.configuration.mode !== "sendonly" && hasVideo
          };
          logger.debug("[createOfferLegacy] RTCPeerConnection.createOffer() options:", JSON.stringify(options));
          return this.pc.createOffer(options);
        };
        WebRtcPeer2.prototype.createOffer = function() {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          return __awaiter(this, void 0, void 0, function() {
            var _i, _j, track, tcInit, trackSettings, trackConsts, trackWidth, trackHeight, trackPixels, maxLayers, l, layerDiv, encoding, tc, sendParams, needSetParams, error_2, message, _k, _l, kind, sdpOffer, error_3, message;
            return __generator(this, function(_m) {
              switch (_m.label) {
                case 0:
                  if (!("addTransceiver" in this.pc)) {
                    logger.warn("[createOffer] Method RTCPeerConnection.addTransceiver() is NOT available; using LEGACY offerToReceive{Audio,Video}");
                    return [2, this.createOfferLegacy()];
                  } else {
                    logger.debug("[createOffer] Method RTCPeerConnection.addTransceiver() is available; using it");
                  }
                  if (!(this.configuration.mode !== "recvonly"))
                    return [3, 7];
                  if (!this.configuration.mediaStream) {
                    throw new Error("[WebRtcPeer.createOffer] Direction is '".concat(this.configuration.mode, "', but no stream was configured to be sent"));
                  }
                  _i = 0, _j = this.configuration.mediaStream.getTracks();
                  _m.label = 1;
                case 1:
                  if (!(_i < _j.length))
                    return [3, 6];
                  track = _j[_i];
                  tcInit = {
                    direction: this.configuration.mode,
                    streams: [this.configuration.mediaStream]
                  };
                  if (track.kind === "video" && this.configuration.simulcast) {
                    trackSettings = track.getSettings();
                    trackConsts = track.getConstraints();
                    trackWidth = (_c = (_b = (_a = trackSettings.width) !== null && _a !== void 0 ? _a : trackConsts.width.ideal) !== null && _b !== void 0 ? _b : trackConsts.width) !== null && _c !== void 0 ? _c : 0;
                    trackHeight = (_f = (_e = (_d = trackSettings.height) !== null && _d !== void 0 ? _d : trackConsts.height.ideal) !== null && _e !== void 0 ? _e : trackConsts.height) !== null && _f !== void 0 ? _f : 0;
                    logger.info("[createOffer] Video track dimensions: ".concat(trackWidth, "x").concat(trackHeight));
                    trackPixels = trackWidth * trackHeight;
                    maxLayers = 0;
                    if (trackPixels >= 960 * 540) {
                      maxLayers = 3;
                    } else if (trackPixels >= 480 * 270) {
                      maxLayers = 2;
                    } else {
                      maxLayers = 1;
                    }
                    tcInit.sendEncodings = [];
                    for (l = 0; l < maxLayers; l++) {
                      layerDiv = Math.pow(2, maxLayers - l - 1);
                      encoding = {
                        rid: "rdiv" + layerDiv.toString(),
                        // @ts-ignore -- Property missing from DOM types.
                        scalabilityMode: "L1T1"
                      };
                      if (["detail", "text"].includes(track.contentHint)) {
                        encoding.scaleResolutionDownBy = 1;
                        encoding.maxFramerate = Math.floor(30 / layerDiv);
                      } else {
                        encoding.scaleResolutionDownBy = layerDiv;
                      }
                      tcInit.sendEncodings.push(encoding);
                    }
                  }
                  tc = this.pc.addTransceiver(track, tcInit);
                  if (!(track.kind === "video"))
                    return [3, 5];
                  sendParams = tc.sender.getParameters();
                  needSetParams = false;
                  if (!((_g = sendParams.degradationPreference) === null || _g === void 0 ? void 0 : _g.length)) {
                    if (["detail", "text"].includes(track.contentHint)) {
                      sendParams.degradationPreference = "maintain-resolution";
                    } else {
                      sendParams.degradationPreference = "balanced";
                    }
                    logger.info("[createOffer] Video sender Degradation Preference set: ".concat(sendParams.degradationPreference));
                    needSetParams = true;
                  }
                  if (this.configuration.simulcast) {
                    if (((_h = sendParams.encodings) === null || _h === void 0 ? void 0 : _h.length) !== tcInit.sendEncodings.length) {
                      sendParams.encodings = tcInit.sendEncodings;
                      needSetParams = true;
                    }
                  }
                  if (!needSetParams)
                    return [3, 5];
                  logger.debug("[createOffer] Setting new RTCRtpSendParameters to video sender");
                  _m.label = 2;
                case 2:
                  _m.trys.push([2, 4, , 5]);
                  return [4, tc.sender.setParameters(sendParams)];
                case 3:
                  _m.sent();
                  return [3, 5];
                case 4:
                  error_2 = _m.sent();
                  message = "[WebRtcPeer.createOffer] Cannot set RTCRtpSendParameters to video sender";
                  if (error_2 instanceof Error) {
                    message += ": ".concat(error_2.message);
                  }
                  throw new Error(message);
                case 5:
                  _i++;
                  return [3, 1];
                case 6:
                  return [3, 8];
                case 7:
                  for (_k = 0, _l = ["audio", "video"]; _k < _l.length; _k++) {
                    kind = _l[_k];
                    if (!this.configuration.mediaConstraints[kind]) {
                      continue;
                    }
                    this.configuration.mediaStream = new MediaStream();
                    this.pc.addTransceiver(kind, {
                      direction: this.configuration.mode,
                      streams: [this.configuration.mediaStream]
                    });
                  }
                  _m.label = 8;
                case 8:
                  _m.trys.push([8, 10, , 11]);
                  return [4, this.pc.createOffer()];
                case 9:
                  sdpOffer = _m.sent();
                  return [3, 11];
                case 10:
                  error_3 = _m.sent();
                  message = "[WebRtcPeer.createOffer] Browser failed creating an SDP Offer";
                  if (error_3 instanceof Error) {
                    message += ": ".concat(error_3.message);
                  }
                  throw new Error(message);
                case 11:
                  return [2, sdpOffer];
              }
            });
          });
        };
        WebRtcPeer2.prototype.deprecatedPeerConnectionTrackApi = function() {
          for (var _i = 0, _a = this.configuration.mediaStream.getTracks(); _i < _a.length; _i++) {
            var track = _a[_i];
            this.pc.addTrack(track, this.configuration.mediaStream);
          }
        };
        WebRtcPeer2.prototype.createAnswer = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if ("getTransceivers" in _this.pc) {
              logger.debug("[createAnswer] Method RTCPeerConnection.getTransceivers() is available; using it");
              var _loop_1 = function(kind2) {
                if (!_this.configuration.mediaConstraints[kind2]) {
                  return "continue";
                }
                var tc = _this.pc.getTransceivers().find(function(tc2) {
                  return tc2.receiver.track.kind === kind2;
                });
                if (tc) {
                  tc.direction = _this.configuration.mode;
                } else {
                  return { value: reject(new Error("".concat(kind2, " requested, but no transceiver was created from remote description"))) };
                }
              };
              for (var _i = 0, _a = ["audio", "video"]; _i < _a.length; _i++) {
                var kind = _a[_i];
                var state_1 = _loop_1(kind);
                if (typeof state_1 === "object")
                  return state_1.value;
              }
              _this.pc.createAnswer().then(function(sdpAnswer) {
                return resolve(sdpAnswer);
              }).catch(function(error) {
                return reject(error);
              });
            } else {
              var offerAudio = void 0, offerVideo = true;
              if (!!_this.configuration.mediaConstraints) {
                offerAudio = typeof _this.configuration.mediaConstraints.audio === "boolean" ? _this.configuration.mediaConstraints.audio : true;
                offerVideo = typeof _this.configuration.mediaConstraints.video === "boolean" ? _this.configuration.mediaConstraints.video : true;
                var constraints = {
                  offerToReceiveAudio: offerAudio,
                  offerToReceiveVideo: offerVideo
                };
                _this.pc.createAnswer(constraints).then(function(sdpAnswer) {
                  return resolve(sdpAnswer);
                }).catch(function(error) {
                  return reject(error);
                });
              }
            }
          });
        };
        WebRtcPeer2.prototype.processLocalOffer = function(offer) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.pc.setLocalDescription(offer).then(function() {
              var localDescription = _this.pc.localDescription;
              if (!!localDescription) {
                logger.debug("Local description set", localDescription.sdp);
                return resolve();
              } else {
                return reject("Local description is not defined");
              }
            }).catch(function(error) {
              return reject(error);
            });
          });
        };
        WebRtcPeer2.prototype.processRemoteOffer = function(sdpOffer) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var offer = {
              type: "offer",
              sdp: sdpOffer
            };
            logger.debug("SDP offer received, setting remote description", offer);
            if (_this.pc.signalingState === "closed") {
              return reject("RTCPeerConnection is closed when trying to set remote description");
            }
            _this.setRemoteDescription(offer).then(function() {
              return resolve();
            }).catch(function(error) {
              return reject(error);
            });
          });
        };
        WebRtcPeer2.prototype.processLocalAnswer = function(answer) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            logger.debug("SDP answer created, setting local description");
            if (_this.pc.signalingState === "closed") {
              return reject("RTCPeerConnection is closed when trying to set local description");
            }
            _this.pc.setLocalDescription(answer).then(function() {
              return resolve();
            }).catch(function(error) {
              return reject(error);
            });
          });
        };
        WebRtcPeer2.prototype.processRemoteAnswer = function(sdpAnswer) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var answer = {
              type: "answer",
              sdp: sdpAnswer
            };
            logger.debug("SDP answer received, setting remote description");
            if (_this.pc.signalingState === "closed") {
              return reject("RTCPeerConnection is closed when trying to set remote description");
            }
            _this.setRemoteDescription(answer).then(function() {
              resolve();
            }).catch(function(error) {
              return reject(error);
            });
          });
        };
        WebRtcPeer2.prototype.setRemoteDescription = function(sdp) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              return [2, this.pc.setRemoteDescription(sdp)];
            });
          });
        };
        WebRtcPeer2.prototype.addIceCandidate = function(iceCandidate) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            logger.debug("Remote ICE candidate received", iceCandidate);
            _this.remoteCandidatesQueue.push(iceCandidate);
            switch (_this.pc.signalingState) {
              case "closed":
                reject(new Error("PeerConnection object is closed"));
                break;
              case "stable":
                if (!!_this.pc.remoteDescription) {
                  _this.pc.addIceCandidate(iceCandidate).then(function() {
                    return resolve();
                  }).catch(function(error) {
                    return reject(error);
                  });
                } else {
                  _this.iceCandidateList.push(iceCandidate);
                  resolve();
                }
                break;
              default:
                _this.iceCandidateList.push(iceCandidate);
                resolve();
            }
          });
        };
        WebRtcPeer2.prototype.addIceConnectionStateChangeListener = function(otherId) {
          var _this = this;
          this.pc.addEventListener("iceconnectionstatechange", function() {
            var iceConnectionState = _this.pc.iceConnectionState;
            switch (iceConnectionState) {
              case "disconnected":
                var msg1 = "IceConnectionState of RTCPeerConnection " + _this.configuration.id + " (" + otherId + ') change to "disconnected". Possible network disconnection';
                logger.warn(msg1);
                _this.configuration.onIceConnectionStateException(ExceptionEvent_1.ExceptionEventName.ICE_CONNECTION_DISCONNECTED, msg1);
                break;
              case "failed":
                var msg2 = "IceConnectionState of RTCPeerConnection " + _this.configuration.id + " (" + otherId + ') to "failed"';
                logger.error(msg2);
                _this.configuration.onIceConnectionStateException(ExceptionEvent_1.ExceptionEventName.ICE_CONNECTION_FAILED, msg2);
                break;
              case "closed":
                logger.log("IceConnectionState of RTCPeerConnection " + _this.configuration.id + " (" + otherId + ') change to "closed"');
                break;
              case "new":
                logger.log("IceConnectionState of RTCPeerConnection " + _this.configuration.id + " (" + otherId + ') change to "new"');
                break;
              case "checking":
                logger.log("IceConnectionState of RTCPeerConnection " + _this.configuration.id + " (" + otherId + ') change to "checking"');
                break;
              case "connected":
                logger.log("IceConnectionState of RTCPeerConnection " + _this.configuration.id + " (" + otherId + ') change to "connected"');
                break;
              case "completed":
                logger.log("IceConnectionState of RTCPeerConnection " + _this.configuration.id + " (" + otherId + ') change to "completed"');
                break;
            }
          });
        };
        WebRtcPeer2.prototype.generateUniqueId = function() {
          return (0, uuid_1.v4)();
        };
        return WebRtcPeer2;
      }()
    );
    exports.WebRtcPeer = WebRtcPeer;
    var WebRtcPeerRecvonly = (
      /** @class */
      function(_super) {
        __extends(WebRtcPeerRecvonly2, _super);
        function WebRtcPeerRecvonly2(configuration) {
          configuration.mode = "recvonly";
          return _super.call(this, configuration) || this;
        }
        return WebRtcPeerRecvonly2;
      }(WebRtcPeer)
    );
    exports.WebRtcPeerRecvonly = WebRtcPeerRecvonly;
    var WebRtcPeerSendonly = (
      /** @class */
      function(_super) {
        __extends(WebRtcPeerSendonly2, _super);
        function WebRtcPeerSendonly2(configuration) {
          configuration.mode = "sendonly";
          return _super.call(this, configuration) || this;
        }
        return WebRtcPeerSendonly2;
      }(WebRtcPeer)
    );
    exports.WebRtcPeerSendonly = WebRtcPeerSendonly;
    var WebRtcPeerSendrecv = (
      /** @class */
      function(_super) {
        __extends(WebRtcPeerSendrecv2, _super);
        function WebRtcPeerSendrecv2(configuration) {
          configuration.mode = "sendrecv";
          return _super.call(this, configuration) || this;
        }
        return WebRtcPeerSendrecv2;
      }(WebRtcPeer)
    );
    exports.WebRtcPeerSendrecv = WebRtcPeerSendrecv;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/WebRtcStats/WebRtcStats.js
var require_WebRtcStats = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/WebRtcStats/WebRtcStats.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebRtcStats = void 0;
    var OpenViduLogger_1 = require_OpenViduLogger();
    var Platform_1 = require_Platform();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var platform;
    var WebRtcStats = (
      /** @class */
      function() {
        function WebRtcStats2(stream) {
          this.stream = stream;
          this.STATS_ITEM_NAME = "webrtc-stats-config";
          this.webRtcStatsEnabled = false;
          this.statsInterval = 1;
          platform = Platform_1.PlatformUtils.getInstance();
        }
        WebRtcStats2.prototype.isEnabled = function() {
          return this.webRtcStatsEnabled;
        };
        WebRtcStats2.prototype.initWebRtcStats = function() {
          var _this = this;
          var webrtcObj = localStorage.getItem(this.STATS_ITEM_NAME);
          if (!!webrtcObj) {
            this.webRtcStatsEnabled = true;
            var webrtcStatsConfig = JSON.parse(webrtcObj);
            logger.warn("WebRtc stats enabled for stream " + this.stream.streamId + " of connection " + this.stream.connection.connectionId);
            logger.warn("localStorage item: " + JSON.stringify(webrtcStatsConfig));
            this.POST_URL = webrtcStatsConfig.httpEndpoint;
            this.statsInterval = webrtcStatsConfig.interval;
            this.webRtcStatsIntervalId = setInterval(function() {
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      return [4, this.sendStatsToHttpEndpoint()];
                    case 1:
                      _a.sent();
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }, this.statsInterval * 1e3);
          } else {
            logger.debug("WebRtc stats not enabled");
          }
        };
        WebRtcStats2.prototype.getSelectedIceCandidateInfo = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            return __awaiter(_this, void 0, void 0, function() {
              var statsReport, transportStat, candidatePairs, localCandidates, remoteCandidates, selectedCandidatePair, selectedCandidatePairId, length_1, iterator, i, candidatePair, localCandidateId, remoteCandidateId, finalLocalCandidate, candList, cand, _i, cand_1, c, finalRemoteCandidate, candList, cand, _a, cand_2, c;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    return [4, this.stream.getRTCPeerConnection().getStats()];
                  case 1:
                    statsReport = _b.sent();
                    candidatePairs = /* @__PURE__ */ new Map();
                    localCandidates = /* @__PURE__ */ new Map();
                    remoteCandidates = /* @__PURE__ */ new Map();
                    statsReport.forEach(function(stat) {
                      if (stat.type === "transport" && (platform.isChromium() || platform.isSafariBrowser() || platform.isReactNative())) {
                        transportStat = stat;
                      }
                      switch (stat.type) {
                        case "candidate-pair":
                          candidatePairs.set(stat.id, stat);
                          break;
                        case "local-candidate":
                          localCandidates.set(stat.id, stat);
                          break;
                        case "remote-candidate":
                          remoteCandidates.set(stat.id, stat);
                          break;
                      }
                    });
                    if (transportStat != null) {
                      selectedCandidatePairId = transportStat.selectedCandidatePairId;
                      selectedCandidatePair = candidatePairs.get(selectedCandidatePairId);
                    } else {
                      length_1 = candidatePairs.size;
                      iterator = candidatePairs.values();
                      for (i = 0; i < length_1; i++) {
                        candidatePair = iterator.next().value;
                        if (candidatePair["selected"]) {
                          selectedCandidatePair = candidatePair;
                          break;
                        }
                      }
                    }
                    localCandidateId = selectedCandidatePair.localCandidateId;
                    remoteCandidateId = selectedCandidatePair.remoteCandidateId;
                    finalLocalCandidate = localCandidates.get(localCandidateId);
                    if (!!finalLocalCandidate) {
                      candList = this.stream.getLocalIceCandidateList();
                      cand = candList.filter(function(c2) {
                        return !!c2.candidate && (c2.candidate.indexOf(finalLocalCandidate.ip) >= 0 || c2.candidate.indexOf(finalLocalCandidate.address) >= 0) && c2.candidate.indexOf(finalLocalCandidate.port) >= 0;
                      });
                      finalLocalCandidate.raw = [];
                      for (_i = 0, cand_1 = cand; _i < cand_1.length; _i++) {
                        c = cand_1[_i];
                        finalLocalCandidate.raw.push(c.candidate);
                      }
                    } else {
                      finalLocalCandidate = "ERROR: No active local ICE candidate. Probably ICE-TCP is being used";
                    }
                    finalRemoteCandidate = remoteCandidates.get(remoteCandidateId);
                    if (!!finalRemoteCandidate) {
                      candList = this.stream.getRemoteIceCandidateList();
                      cand = candList.filter(function(c2) {
                        return !!c2.candidate && (c2.candidate.indexOf(finalRemoteCandidate.ip) >= 0 || c2.candidate.indexOf(finalRemoteCandidate.address) >= 0) && c2.candidate.indexOf(finalRemoteCandidate.port) >= 0;
                      });
                      finalRemoteCandidate.raw = [];
                      for (_a = 0, cand_2 = cand; _a < cand_2.length; _a++) {
                        c = cand_2[_a];
                        finalRemoteCandidate.raw.push(c.candidate);
                      }
                    } else {
                      finalRemoteCandidate = "ERROR: No active remote ICE candidate. Probably ICE-TCP is being used";
                    }
                    return [2, resolve({
                      localCandidate: finalLocalCandidate,
                      remoteCandidate: finalRemoteCandidate
                    })];
                }
              });
            });
          });
        };
        WebRtcStats2.prototype.stopWebRtcStats = function() {
          if (this.webRtcStatsEnabled) {
            clearInterval(this.webRtcStatsIntervalId);
            logger.warn("WebRtc stats stopped for disposed stream " + this.stream.streamId + " of connection " + this.stream.connection.connectionId);
          }
        };
        WebRtcStats2.prototype.sendStats = function(url, response) {
          return __awaiter(this, void 0, void 0, function() {
            var configuration, error_1;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2, , 3]);
                  configuration = {
                    headers: {
                      "Content-type": "application/json"
                    },
                    body: JSON.stringify(response),
                    method: "POST"
                  };
                  return [4, fetch(url, configuration)];
                case 1:
                  _a.sent();
                  return [3, 3];
                case 2:
                  error_1 = _a.sent();
                  logger.error("sendStats error: ".concat(JSON.stringify(error_1)));
                  return [3, 3];
                case 3:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        WebRtcStats2.prototype.sendStatsToHttpEndpoint = function() {
          return __awaiter(this, void 0, void 0, function() {
            var webrtcStats, response, error_2;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 3, , 4]);
                  return [4, this.getCommonStats()];
                case 1:
                  webrtcStats = _a.sent();
                  response = this.generateJSONStatsResponse(webrtcStats);
                  return [4, this.sendStats(this.POST_URL, response)];
                case 2:
                  _a.sent();
                  return [3, 4];
                case 3:
                  error_2 = _a.sent();
                  logger.log(error_2);
                  return [3, 4];
                case 4:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        WebRtcStats2.prototype.getCommonStats = function() {
          return __awaiter(this, void 0, void 0, function() {
            var _this = this;
            return __generator(this, function(_a) {
              return [2, new Promise(function(resolve, reject) {
                return __awaiter(_this, void 0, void 0, function() {
                  var statsReport, response_1, videoTrackStats_1, candidatePairStats_1, error_3;
                  var _this2 = this;
                  return __generator(this, function(_a2) {
                    switch (_a2.label) {
                      case 0:
                        _a2.trys.push([0, 2, , 3]);
                        return [4, this.stream.getRTCPeerConnection().getStats()];
                      case 1:
                        statsReport = _a2.sent();
                        response_1 = this.getWebRtcStatsResponseOutline();
                        videoTrackStats_1 = ["framesReceived", "framesDropped", "framesSent", "frameHeight", "frameWidth"];
                        candidatePairStats_1 = ["availableOutgoingBitrate", "currentRoundTripTime"];
                        statsReport.forEach(function(stat) {
                          var mediaType = stat.mediaType != null ? stat.mediaType : stat.kind;
                          var addStat = function(direction, key) {
                            if (stat[key] != null && response_1[direction] != null) {
                              if (!mediaType && videoTrackStats_1.indexOf(key) > -1) {
                                mediaType = "video";
                              }
                              if (direction != null && mediaType != null && key != null && response_1[direction][mediaType] != null) {
                                response_1[direction][mediaType][key] = Number(stat[key]);
                              } else if (direction != null && key != null && candidatePairStats_1.includes(key)) {
                                response_1[direction][key] = Number(stat[key]);
                              }
                            }
                          };
                          switch (stat.type) {
                            case "outbound-rtp":
                              addStat("outbound", "bytesSent");
                              addStat("outbound", "packetsSent");
                              addStat("outbound", "framesEncoded");
                              addStat("outbound", "nackCount");
                              addStat("outbound", "firCount");
                              addStat("outbound", "pliCount");
                              addStat("outbound", "qpSum");
                              break;
                            case "inbound-rtp":
                              addStat("inbound", "bytesReceived");
                              addStat("inbound", "packetsReceived");
                              addStat("inbound", "packetsLost");
                              addStat("inbound", "jitter");
                              addStat("inbound", "framesDecoded");
                              addStat("inbound", "nackCount");
                              addStat("inbound", "firCount");
                              addStat("inbound", "pliCount");
                              break;
                            case "track":
                              addStat("inbound", "jitterBufferDelay");
                              addStat("inbound", "framesReceived");
                              addStat("outbound", "framesDropped");
                              addStat("outbound", "framesSent");
                              addStat(_this2.stream.isLocal() ? "outbound" : "inbound", "frameHeight");
                              addStat(_this2.stream.isLocal() ? "outbound" : "inbound", "frameWidth");
                              break;
                            case "candidate-pair":
                              addStat("candidatepair", "currentRoundTripTime");
                              addStat("candidatepair", "availableOutgoingBitrate");
                              break;
                          }
                        });
                        if (!(response_1 === null || response_1 === void 0 ? void 0 : response_1.candidatepair) || Object.keys(response_1.candidatepair).length === 0) {
                          delete response_1.candidatepair;
                        }
                        return [2, resolve(response_1)];
                      case 2:
                        error_3 = _a2.sent();
                        logger.error("Error getting common stats: ", error_3);
                        return [2, reject(error_3)];
                      case 3:
                        return [
                          2
                          /*return*/
                        ];
                    }
                  });
                });
              })];
            });
          });
        };
        WebRtcStats2.prototype.generateJSONStatsResponse = function(stats) {
          return {
            "@timestamp": (/* @__PURE__ */ new Date()).toISOString(),
            participant_id: this.stream.connection.data,
            session_id: this.stream.session.sessionId,
            platform: platform.getName(),
            platform_description: platform.getDescription(),
            stream: "webRTC",
            webrtc_stats: stats
          };
        };
        WebRtcStats2.prototype.getWebRtcStatsResponseOutline = function() {
          if (this.stream.isLocal()) {
            return {
              outbound: {
                audio: {},
                video: {}
              },
              candidatepair: {}
            };
          } else {
            return {
              inbound: {
                audio: {},
                video: {}
              }
            };
          }
        };
        return WebRtcStats2;
      }()
    );
    exports.WebRtcStats = WebRtcStats;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/PublisherSpeakingEvent.js
var require_PublisherSpeakingEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/PublisherSpeakingEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PublisherSpeakingEvent = void 0;
    var Event_1 = require_Event();
    var PublisherSpeakingEvent = (
      /** @class */
      function(_super) {
        __extends(PublisherSpeakingEvent2, _super);
        function PublisherSpeakingEvent2(target, type, connection, streamId) {
          var _this = _super.call(this, false, target, type) || this;
          _this.type = type;
          _this.connection = connection;
          _this.streamId = streamId;
          return _this;
        }
        PublisherSpeakingEvent2.prototype.callDefaultBehavior = function() {
        };
        return PublisherSpeakingEvent2;
      }(Event_1.Event)
    );
    exports.PublisherSpeakingEvent = PublisherSpeakingEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Enums/TypeOfVideo.js
var require_TypeOfVideo = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Enums/TypeOfVideo.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeOfVideo = void 0;
    var TypeOfVideo;
    (function(TypeOfVideo2) {
      TypeOfVideo2["CAMERA"] = "CAMERA";
      TypeOfVideo2["SCREEN"] = "SCREEN";
      TypeOfVideo2["CUSTOM"] = "CUSTOM";
      TypeOfVideo2["IPCAM"] = "IPCAM";
    })(TypeOfVideo = exports.TypeOfVideo || (exports.TypeOfVideo = {}));
  }
});

// node_modules/wildemitter/wildemitter.js
var require_wildemitter = __commonJS({
  "node_modules/wildemitter/wildemitter.js"(exports, module) {
    module.exports = WildEmitter;
    function WildEmitter() {
    }
    WildEmitter.mixin = function(constructor) {
      var prototype = constructor.prototype || constructor;
      prototype.isWildEmitter = true;
      prototype.on = function(event, groupName, fn) {
        this.callbacks = this.callbacks || {};
        var hasGroup = arguments.length === 3, group = hasGroup ? arguments[1] : void 0, func = hasGroup ? arguments[2] : arguments[1];
        func._groupName = group;
        (this.callbacks[event] = this.callbacks[event] || []).push(func);
        return this;
      };
      prototype.once = function(event, groupName, fn) {
        var self = this, hasGroup = arguments.length === 3, group = hasGroup ? arguments[1] : void 0, func = hasGroup ? arguments[2] : arguments[1];
        function on() {
          self.off(event, on);
          func.apply(this, arguments);
        }
        this.on(event, group, on);
        return this;
      };
      prototype.releaseGroup = function(groupName) {
        this.callbacks = this.callbacks || {};
        var item, i, len, handlers;
        for (item in this.callbacks) {
          handlers = this.callbacks[item];
          for (i = 0, len = handlers.length; i < len; i++) {
            if (handlers[i]._groupName === groupName) {
              handlers.splice(i, 1);
              i--;
              len--;
            }
          }
        }
        return this;
      };
      prototype.off = function(event, fn) {
        this.callbacks = this.callbacks || {};
        var callbacks = this.callbacks[event], i;
        if (!callbacks)
          return this;
        if (arguments.length === 1) {
          delete this.callbacks[event];
          return this;
        }
        i = callbacks.indexOf(fn);
        if (i !== -1) {
          callbacks.splice(i, 1);
          if (callbacks.length === 0) {
            delete this.callbacks[event];
          }
        }
        return this;
      };
      prototype.emit = function(event) {
        this.callbacks = this.callbacks || {};
        var args = [].slice.call(arguments, 1), callbacks = this.callbacks[event], specialCallbacks = this.getWildcardCallbacks(event), i, len, item, listeners;
        if (callbacks) {
          listeners = callbacks.slice();
          for (i = 0, len = listeners.length; i < len; ++i) {
            if (!listeners[i]) {
              break;
            }
            listeners[i].apply(this, args);
          }
        }
        if (specialCallbacks) {
          len = specialCallbacks.length;
          listeners = specialCallbacks.slice();
          for (i = 0, len = listeners.length; i < len; ++i) {
            if (!listeners[i]) {
              break;
            }
            listeners[i].apply(this, [event].concat(args));
          }
        }
        return this;
      };
      prototype.getWildcardCallbacks = function(eventName) {
        this.callbacks = this.callbacks || {};
        var item, split, result = [];
        for (item in this.callbacks) {
          split = item.split("*");
          if (item === "*" || split.length === 2 && eventName.slice(0, split[0].length) === split[0]) {
            result = result.concat(this.callbacks[item]);
          }
        }
        return result;
      };
    };
    WildEmitter.mixin(WildEmitter);
  }
});

// node_modules/hark/hark.js
var require_hark = __commonJS({
  "node_modules/hark/hark.js"(exports, module) {
    var WildEmitter = require_wildemitter();
    function getMaxVolume(analyser, fftBins) {
      var maxVolume = -Infinity;
      analyser.getFloatFrequencyData(fftBins);
      for (var i = 4, ii = fftBins.length; i < ii; i++) {
        if (fftBins[i] > maxVolume && fftBins[i] < 0) {
          maxVolume = fftBins[i];
        }
      }
      ;
      return maxVolume;
    }
    var audioContextType;
    if (typeof window !== "undefined") {
      audioContextType = window.AudioContext || window.webkitAudioContext;
    }
    var audioContext = null;
    module.exports = function(stream, options) {
      var harker = new WildEmitter();
      if (!audioContextType)
        return harker;
      var options = options || {}, smoothing = options.smoothing || 0.1, interval = options.interval || 50, threshold = options.threshold, play = options.play, history = options.history || 10, running = true;
      audioContext = options.audioContext || audioContext || new audioContextType();
      var sourceNode, fftBins, analyser;
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = smoothing;
      fftBins = new Float32Array(analyser.frequencyBinCount);
      if (stream.jquery)
        stream = stream[0];
      if (stream instanceof HTMLAudioElement || stream instanceof HTMLVideoElement) {
        sourceNode = audioContext.createMediaElementSource(stream);
        if (typeof play === "undefined")
          play = true;
        threshold = threshold || -50;
      } else {
        sourceNode = audioContext.createMediaStreamSource(stream);
        threshold = threshold || -50;
      }
      sourceNode.connect(analyser);
      if (play)
        analyser.connect(audioContext.destination);
      harker.speaking = false;
      harker.suspend = function() {
        return audioContext.suspend();
      };
      harker.resume = function() {
        return audioContext.resume();
      };
      Object.defineProperty(harker, "state", { get: function() {
        return audioContext.state;
      } });
      audioContext.onstatechange = function() {
        harker.emit("state_change", audioContext.state);
      };
      harker.setThreshold = function(t) {
        threshold = t;
      };
      harker.setInterval = function(i2) {
        interval = i2;
      };
      harker.stop = function() {
        running = false;
        harker.emit("volume_change", -100, threshold);
        if (harker.speaking) {
          harker.speaking = false;
          harker.emit("stopped_speaking");
        }
        analyser.disconnect();
        sourceNode.disconnect();
      };
      harker.speakingHistory = [];
      for (var i = 0; i < history; i++) {
        harker.speakingHistory.push(0);
      }
      var looper = function() {
        setTimeout(function() {
          if (!running) {
            return;
          }
          var currentVolume = getMaxVolume(analyser, fftBins);
          harker.emit("volume_change", currentVolume, threshold);
          var history2 = 0;
          if (currentVolume > threshold && !harker.speaking) {
            for (var i2 = harker.speakingHistory.length - 3; i2 < harker.speakingHistory.length; i2++) {
              history2 += harker.speakingHistory[i2];
            }
            if (history2 >= 2) {
              harker.speaking = true;
              harker.emit("speaking");
            }
          } else if (currentVolume < threshold && harker.speaking) {
            for (var i2 = 0; i2 < harker.speakingHistory.length; i2++) {
              history2 += harker.speakingHistory[i2];
            }
            if (history2 == 0) {
              harker.speaking = false;
              harker.emit("stopped_speaking");
            }
          }
          harker.speakingHistory.shift();
          harker.speakingHistory.push(0 + (currentVolume > threshold));
          looper();
        }, interval);
      };
      looper();
      return harker;
    };
  }
});

// node_modules/openvidu-browser/lib/OpenVidu/Stream.js
var require_Stream = __commonJS({
  "node_modules/openvidu-browser/lib/OpenVidu/Stream.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Stream = void 0;
    var Filter_1 = require_Filter();
    var Subscriber_1 = require_Subscriber();
    var WebRtcPeer_1 = require_WebRtcPeer();
    var WebRtcStats_1 = require_WebRtcStats();
    var ExceptionEvent_1 = require_ExceptionEvent();
    var PublisherSpeakingEvent_1 = require_PublisherSpeakingEvent();
    var StreamManagerEvent_1 = require_StreamManagerEvent();
    var StreamPropertyChangedEvent_1 = require_StreamPropertyChangedEvent();
    var OpenViduError_1 = require_OpenViduError();
    var TypeOfVideo_1 = require_TypeOfVideo();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var Platform_1 = require_Platform();
    var uuid_1 = require_commonjs_browser();
    var hark = require_hark();
    var EventEmitter = require_EventEmitter();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var platform;
    var Stream = (
      /** @class */
      function() {
        function Stream2(session, options) {
          var _this = this;
          this.isSubscribeToRemote = false;
          this.isLocalStreamReadyToPublish = false;
          this.isLocalStreamPublished = false;
          this.publishedOnce = false;
          this.harkSpeakingEnabled = false;
          this.harkSpeakingEnabledOnce = false;
          this.harkStoppedSpeakingEnabled = false;
          this.harkStoppedSpeakingEnabledOnce = false;
          this.harkVolumeChangeEnabled = false;
          this.harkVolumeChangeEnabledOnce = false;
          this.ee = new EventEmitter();
          platform = Platform_1.PlatformUtils.getInstance();
          this.session = session;
          if (options.hasOwnProperty("id")) {
            this.inboundStreamOpts = options;
            this.streamId = this.inboundStreamOpts.id;
            this.creationTime = this.inboundStreamOpts.createdAt;
            this.hasAudio = this.inboundStreamOpts.hasAudio;
            this.hasVideo = this.inboundStreamOpts.hasVideo;
            if (this.hasAudio) {
              this.audioActive = this.inboundStreamOpts.audioActive;
            }
            if (this.hasVideo) {
              this.videoActive = this.inboundStreamOpts.videoActive;
              this.typeOfVideo = !this.inboundStreamOpts.typeOfVideo ? void 0 : this.inboundStreamOpts.typeOfVideo;
              this.frameRate = this.inboundStreamOpts.frameRate === -1 ? void 0 : this.inboundStreamOpts.frameRate;
              this.videoDimensions = this.inboundStreamOpts.videoDimensions;
            }
            if (!!this.inboundStreamOpts.filter && Object.keys(this.inboundStreamOpts.filter).length > 0) {
              if (!!this.inboundStreamOpts.filter.lastExecMethod && Object.keys(this.inboundStreamOpts.filter.lastExecMethod).length === 0) {
                delete this.inboundStreamOpts.filter.lastExecMethod;
              }
              this.filter = this.inboundStreamOpts.filter;
            }
          } else {
            this.outboundStreamOpts = options;
            this.hasAudio = this.isSendAudio();
            this.hasVideo = this.isSendVideo();
            if (this.hasAudio) {
              this.audioActive = !!this.outboundStreamOpts.publisherProperties.publishAudio;
            }
            if (this.hasVideo) {
              this.videoActive = !!this.outboundStreamOpts.publisherProperties.publishVideo;
              this.frameRate = this.outboundStreamOpts.publisherProperties.frameRate;
              if (typeof MediaStreamTrack !== "undefined" && this.outboundStreamOpts.publisherProperties.videoSource instanceof MediaStreamTrack) {
                this.typeOfVideo = TypeOfVideo_1.TypeOfVideo.CUSTOM;
              } else {
                this.typeOfVideo = this.isSendScreen() ? TypeOfVideo_1.TypeOfVideo.SCREEN : TypeOfVideo_1.TypeOfVideo.CAMERA;
              }
            }
            if (!!this.outboundStreamOpts.publisherProperties.filter) {
              this.filter = this.outboundStreamOpts.publisherProperties.filter;
            }
          }
          this.ee.on("mediastream-updated", function() {
            var _a;
            _this.streamManager.updateMediaStream(_this.mediaStream);
            logger.debug("Video srcObject [" + ((_a = _this.mediaStream) === null || _a === void 0 ? void 0 : _a.id) + "] updated in stream [" + _this.streamId + "]");
          });
        }
        Stream2.prototype.reconnect = function() {
          return this.reconnectStream("API");
        };
        Stream2.prototype.applyFilter = function(type, options) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            return __awaiter(_this, void 0, void 0, function() {
              var resolveApplyFilter, openviduToken_1, tokenParams_1, afterScriptLoaded_1, script, optionsString;
              var _this2 = this;
              return __generator(this, function(_a) {
                if (!!this.filter) {
                  return [2, reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.GENERIC_ERROR, "There is already a filter applied to Stream " + this.streamId))];
                }
                resolveApplyFilter = function(error, triggerEvent) {
                  if (error) {
                    logger.error("Error applying filter for Stream " + _this2.streamId, error);
                    if (error.code === 401) {
                      return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to apply a filter"));
                    } else {
                      return reject(error);
                    }
                  } else {
                    logger.info("Filter successfully applied on Stream " + _this2.streamId);
                    var oldValue = _this2.filter;
                    _this2.filter = new Filter_1.Filter(type, options);
                    _this2.filter.stream = _this2;
                    if (triggerEvent) {
                      _this2.session.emitEvent("streamPropertyChanged", [
                        new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this2.session, _this2, "filter", _this2.filter, oldValue, "applyFilter")
                      ]);
                      _this2.streamManager.emitEvent("streamPropertyChanged", [
                        new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this2.streamManager, _this2, "filter", _this2.filter, oldValue, "applyFilter")
                      ]);
                    }
                    return resolve(_this2.filter);
                  }
                };
                if (type.startsWith("VB:")) {
                  if (!this.hasVideo) {
                    return [2, reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.VIRTUAL_BACKGROUND_ERROR, "The Virtual Background filter requires a video track to be applied"))];
                  }
                  if (!this.mediaStream || this.streamManager.videos.length === 0) {
                    return [2, reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.VIRTUAL_BACKGROUND_ERROR, "The StreamManager requires some video element to be attached to it in order to apply a Virtual Background filter"))];
                  }
                  if (!!this.session.token) {
                    openviduToken_1 = this.session.token;
                  } else {
                    openviduToken_1 = options["token"];
                  }
                  if (!openviduToken_1) {
                    return [2, reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.VIRTUAL_BACKGROUND_ERROR, 'Virtual Background requires the client to be connected to a Session or to have a "token" property available in "options" parameter with a valid OpenVidu token'))];
                  }
                  tokenParams_1 = this.session.getTokenParams(openviduToken_1);
                  if (tokenParams_1.edition !== "pro" && tokenParams_1.edition !== "enterprise") {
                    return [2, reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.VIRTUAL_BACKGROUND_ERROR, "OpenVidu Virtual Background API is available from OpenVidu Pro edition onwards"))];
                  }
                  openviduToken_1 = encodeURIComponent(btoa(openviduToken_1));
                  logger.info("Applying Virtual Background to stream " + this.streamId);
                  afterScriptLoaded_1 = function() {
                    return __awaiter(_this2, void 0, void 0, function() {
                      var id, mediaStreamClone, videoClone, VB, filteredVideo, _a2, error_1;
                      return __generator(this, function(_b) {
                        switch (_b.label) {
                          case 0:
                            _b.trys.push([0, 8, , 9]);
                            id = this.streamId + "_" + (0, uuid_1.v4)();
                            mediaStreamClone = this.mediaStream.clone();
                            videoClone = this.streamManager.videos[0].video.cloneNode(false);
                            videoClone.id = VirtualBackground.VirtualBackground.SOURCE_VIDEO_PREFIX + id;
                            videoClone.srcObject = mediaStreamClone;
                            videoClone.muted = true;
                            this.virtualBackgroundSourceElements = { videoClone, mediaStreamClone };
                            VirtualBackground.VirtualBackground.hideHtmlElement(videoClone, false);
                            VirtualBackground.VirtualBackground.appendHtmlElementToHiddenContainer(videoClone, id);
                            return [4, videoClone.play()];
                          case 1:
                            _b.sent();
                            VB = new VirtualBackground.VirtualBackground({
                              id,
                              openviduServerUrl: new URL(tokenParams_1.httpUri),
                              openviduToken: openviduToken_1,
                              inputVideo: videoClone,
                              inputResolution: "160x96",
                              outputFramerate: 24
                            });
                            filteredVideo = void 0;
                            _a2 = type;
                            switch (_a2) {
                              case "VB:blur":
                                return [3, 2];
                              case "VB:image":
                                return [3, 4];
                            }
                            return [3, 6];
                          case 2:
                            return [4, VB.backgroundBlur(options)];
                          case 3:
                            filteredVideo = _b.sent();
                            return [3, 7];
                          case 4:
                            return [4, VB.backgroundImage(options)];
                          case 5:
                            filteredVideo = _b.sent();
                            return [3, 7];
                          case 6:
                            throw new Error("Unknown Virtual Background filter: " + type);
                          case 7:
                            this.virtualBackgroundSinkElements = { VB, video: filteredVideo };
                            videoClone.style.display = "none";
                            if (this.streamManager.remote) {
                              this.streamManager.replaceTrackInMediaStream(this.virtualBackgroundSinkElements.video.srcObject.getVideoTracks()[0], false);
                            } else {
                              this.streamManager.replaceTrackAux(this.virtualBackgroundSinkElements.video.srcObject.getVideoTracks()[0], false);
                            }
                            resolveApplyFilter(void 0, false);
                            return [3, 9];
                          case 8:
                            error_1 = _b.sent();
                            if (error_1.name === OpenViduError_1.OpenViduErrorName.VIRTUAL_BACKGROUND_ERROR) {
                              resolveApplyFilter(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.VIRTUAL_BACKGROUND_ERROR, error_1.message), false);
                            } else {
                              resolveApplyFilter(error_1, false);
                            }
                            return [3, 9];
                          case 9:
                            return [
                              2
                              /*return*/
                            ];
                        }
                      });
                    });
                  };
                  if (typeof VirtualBackground === "undefined") {
                    script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = tokenParams_1.httpUri + "/openvidu/virtual-background/openvidu-virtual-background.js?token=" + openviduToken_1;
                    script.onload = function() {
                      return __awaiter(_this2, void 0, void 0, function() {
                        var error_2;
                        return __generator(this, function(_a2) {
                          switch (_a2.label) {
                            case 0:
                              _a2.trys.push([0, 2, , 3]);
                              return [4, afterScriptLoaded_1()];
                            case 1:
                              _a2.sent();
                              resolve(new Filter_1.Filter(type, options));
                              return [3, 3];
                            case 2:
                              error_2 = _a2.sent();
                              reject(error_2);
                              return [3, 3];
                            case 3:
                              return [
                                2
                                /*return*/
                              ];
                          }
                        });
                      });
                    };
                    document.body.appendChild(script);
                  } else {
                    afterScriptLoaded_1().then(function() {
                      return resolve(new Filter_1.Filter(type, options));
                    }).catch(function(error) {
                      return reject(error);
                    });
                  }
                } else {
                  if (!this.session.sessionConnected()) {
                    return [2, reject(this.session.notConnectedError())];
                  }
                  logger.info("Applying server filter to stream " + this.streamId);
                  options = options != null ? options : {};
                  optionsString = options;
                  if (typeof optionsString !== "string") {
                    optionsString = JSON.stringify(optionsString);
                  }
                  this.session.openvidu.sendRequest("applyFilter", { streamId: this.streamId, type, options: optionsString }, function(error, response) {
                    resolveApplyFilter(error, true);
                  });
                }
                return [
                  2
                  /*return*/
                ];
              });
            });
          });
        };
        Stream2.prototype.removeFilter = function() {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, this.removeFilterAux(false)];
                case 1:
                  return [2, _a.sent()];
              }
            });
          });
        };
        Stream2.prototype.getRTCPeerConnection = function() {
          return this.webRtcPeer.pc;
        };
        Stream2.prototype.getMediaStream = function() {
          return this.mediaStream;
        };
        Stream2.prototype.removeFilterAux = function(isDisposing) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            return __awaiter(_this, void 0, void 0, function() {
              var resolveRemoveFilter, mediaStreamClone, error_3;
              var _this2 = this;
              var _a;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    resolveRemoveFilter = function(error, triggerEvent) {
                      if (error) {
                        delete _this2.filter;
                        logger.error("Error removing filter for Stream " + _this2.streamId, error);
                        if (error.code === 401) {
                          return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to remove a filter"));
                        } else {
                          return reject(error);
                        }
                      } else {
                        logger.info("Filter successfully removed from Stream " + _this2.streamId);
                        var oldValue = _this2.filter;
                        delete _this2.filter;
                        if (triggerEvent) {
                          _this2.session.emitEvent("streamPropertyChanged", [
                            new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this2.session, _this2, "filter", _this2.filter, oldValue, "applyFilter")
                          ]);
                          _this2.streamManager.emitEvent("streamPropertyChanged", [
                            new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this2.streamManager, _this2, "filter", _this2.filter, oldValue, "applyFilter")
                          ]);
                        }
                        return resolve();
                      }
                    };
                    if (!!!this.filter)
                      return [3, 11];
                    if (!((_a = this.filter) === null || _a === void 0 ? void 0 : _a.type.startsWith("VB:")))
                      return [3, 9];
                    _b.label = 1;
                  case 1:
                    _b.trys.push([1, 7, , 8]);
                    mediaStreamClone = this.virtualBackgroundSourceElements.mediaStreamClone;
                    if (!!isDisposing)
                      return [3, 5];
                    if (!this.streamManager.remote)
                      return [3, 2];
                    this.streamManager.replaceTrackInMediaStream(mediaStreamClone.getVideoTracks()[0], false);
                    return [3, 4];
                  case 2:
                    return [4, this.streamManager.replaceTrackAux(mediaStreamClone.getVideoTracks()[0], false)];
                  case 3:
                    _b.sent();
                    _b.label = 4;
                  case 4:
                    return [3, 6];
                  case 5:
                    mediaStreamClone.getTracks().forEach(function(track) {
                      return track.stop();
                    });
                    _b.label = 6;
                  case 6:
                    this.virtualBackgroundSinkElements.VB.cleanUp();
                    delete this.virtualBackgroundSinkElements;
                    delete this.virtualBackgroundSourceElements;
                    return [2, resolveRemoveFilter(void 0, false)];
                  case 7:
                    error_3 = _b.sent();
                    return [2, resolveRemoveFilter(error_3, false)];
                  case 8:
                    return [3, 10];
                  case 9:
                    if (!this.session.sessionConnected()) {
                      return [2, reject(this.session.notConnectedError())];
                    }
                    logger.info("Removing filter of stream " + this.streamId);
                    this.session.openvidu.sendRequest("removeFilter", { streamId: this.streamId }, function(error, response) {
                      return resolveRemoveFilter(error, true);
                    });
                    _b.label = 10;
                  case 10:
                    return [3, 12];
                  case 11:
                    return [2, reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.GENERIC_ERROR, "Stream " + this.streamId + " has no filter applied"))];
                  case 12:
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          });
        };
        Stream2.prototype.setMediaStream = function(mediaStream) {
          this.mediaStream = mediaStream;
        };
        Stream2.prototype.updateMediaStreamInVideos = function() {
          this.ee.emitEvent("mediastream-updated", []);
        };
        Stream2.prototype.getWebRtcPeer = function() {
          return this.webRtcPeer;
        };
        Stream2.prototype.subscribeToMyRemote = function(value) {
          this.isSubscribeToRemote = value;
        };
        Stream2.prototype.setOutboundStreamOptions = function(outboundStreamOpts) {
          this.outboundStreamOpts = outboundStreamOpts;
        };
        Stream2.prototype.subscribe = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.initWebRtcPeerReceive(false).then(function() {
              return resolve();
            }).catch(function(error) {
              return reject(error);
            });
          });
        };
        Stream2.prototype.publish = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (_this.isLocalStreamReadyToPublish) {
              _this.initWebRtcPeerSend(false).then(function() {
                return resolve();
              }).catch(function(error) {
                return reject(error);
              });
            } else {
              _this.ee.once("stream-ready-to-publish", function() {
                _this.publish().then(function() {
                  return resolve();
                }).catch(function(error) {
                  return reject(error);
                });
              });
            }
          });
        };
        Stream2.prototype.disposeWebRtcPeer = function() {
          var webrtcId;
          if (!!this.webRtcPeer) {
            this.webRtcPeer.dispose();
            webrtcId = this.webRtcPeer.getId();
          }
          this.stopWebRtcStats();
          logger.info((!!this.outboundStreamOpts ? "Outbound " : "Inbound ") + "RTCPeerConnection with id [" + webrtcId + "] from 'Stream' with id [" + this.streamId + "] is now closed");
        };
        Stream2.prototype.disposeMediaStream = function() {
          return __awaiter(this, void 0, void 0, function() {
            var error_4;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  if (!(!!this.filter && this.filter.type.startsWith("VB:")))
                    return [3, 4];
                  _a.label = 1;
                case 1:
                  _a.trys.push([1, 3, , 4]);
                  return [4, this.removeFilterAux(true)];
                case 2:
                  _a.sent();
                  console.debug("Success removing Virtual Background filter for stream ".concat(this.streamId));
                  return [3, 4];
                case 3:
                  error_4 = _a.sent();
                  console.error("Error removing Virtual Background filter for stream ".concat(this.streamId), error_4);
                  return [3, 4];
                case 4:
                  if (this.mediaStream) {
                    this.mediaStream.getAudioTracks().forEach(function(track) {
                      track.stop();
                    });
                    this.mediaStream.getVideoTracks().forEach(function(track) {
                      track.stop();
                    });
                    delete this.mediaStream;
                  }
                  if (this.localMediaStreamWhenSubscribedToRemote) {
                    this.localMediaStreamWhenSubscribedToRemote.getAudioTracks().forEach(function(track) {
                      track.stop();
                    });
                    this.localMediaStreamWhenSubscribedToRemote.getVideoTracks().forEach(function(track) {
                      track.stop();
                    });
                    delete this.localMediaStreamWhenSubscribedToRemote;
                  }
                  if (!!this.speechEvent) {
                    if (!!this.speechEvent.stop) {
                      this.speechEvent.stop();
                    }
                    delete this.speechEvent;
                  }
                  logger.info((!!this.outboundStreamOpts ? "Local " : "Remote ") + "MediaStream from 'Stream' with id [" + this.streamId + "] is now disposed");
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        Stream2.prototype.displayMyRemote = function() {
          return this.isSubscribeToRemote;
        };
        Stream2.prototype.isSendAudio = function() {
          return !!this.outboundStreamOpts && this.outboundStreamOpts.publisherProperties.audioSource !== null && this.outboundStreamOpts.publisherProperties.audioSource !== false;
        };
        Stream2.prototype.isSendVideo = function() {
          return !!this.outboundStreamOpts && this.outboundStreamOpts.publisherProperties.videoSource !== null && this.outboundStreamOpts.publisherProperties.videoSource !== false;
        };
        Stream2.prototype.isSendScreen = function() {
          var screen2 = false;
          if (typeof MediaStreamTrack !== "undefined" && this.outboundStreamOpts.publisherProperties.videoSource instanceof MediaStreamTrack) {
            var trackSettings = this.outboundStreamOpts.publisherProperties.videoSource.getSettings();
            if (trackSettings.displaySurface) {
              screen2 = ["monitor", "window", "browser"].includes(trackSettings.displaySurface);
            }
          }
          if (!screen2 && platform.isElectron()) {
            screen2 = typeof this.outboundStreamOpts.publisherProperties.videoSource === "string" && this.outboundStreamOpts.publisherProperties.videoSource.startsWith("screen:");
          }
          if (!screen2) {
            screen2 = this.outboundStreamOpts.publisherProperties.videoSource === "screen";
          }
          return !!this.outboundStreamOpts && screen2;
        };
        Stream2.prototype.enableHarkSpeakingEvent = function() {
          var _this = this;
          this.setHarkListenerIfNotExists();
          if (!this.harkSpeakingEnabled && !!this.speechEvent) {
            this.harkSpeakingEnabled = true;
            this.speechEvent.on("speaking", function() {
              _this.session.emitEvent("publisherStartSpeaking", [
                new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.session, "publisherStartSpeaking", _this.connection, _this.streamId)
              ]);
              _this.streamManager.emitEvent("publisherStartSpeaking", [
                new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.streamManager, "publisherStartSpeaking", _this.connection, _this.streamId)
              ]);
              _this.harkSpeakingEnabledOnce = false;
            });
          }
        };
        Stream2.prototype.enableOnceHarkSpeakingEvent = function() {
          var _this = this;
          this.setHarkListenerIfNotExists();
          if (!this.harkSpeakingEnabledOnce && !!this.speechEvent) {
            this.harkSpeakingEnabledOnce = true;
            this.speechEvent.once("speaking", function() {
              if (_this.harkSpeakingEnabledOnce) {
                _this.session.emitEvent("publisherStartSpeaking", [
                  new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.session, "publisherStartSpeaking", _this.connection, _this.streamId)
                ]);
                _this.streamManager.emitEvent("publisherStartSpeaking", [
                  new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.streamManager, "publisherStartSpeaking", _this.connection, _this.streamId)
                ]);
              }
              _this.disableHarkSpeakingEvent(true);
            });
          }
        };
        Stream2.prototype.disableHarkSpeakingEvent = function(disabledByOnce) {
          if (!!this.speechEvent) {
            this.harkSpeakingEnabledOnce = false;
            if (disabledByOnce) {
              if (this.harkSpeakingEnabled) {
                return;
              }
            } else {
              this.harkSpeakingEnabled = false;
            }
            if (this.harkVolumeChangeEnabled || this.harkVolumeChangeEnabledOnce || this.harkStoppedSpeakingEnabled || this.harkStoppedSpeakingEnabledOnce) {
              this.speechEvent.off("speaking");
            } else {
              this.speechEvent.stop();
              delete this.speechEvent;
            }
          }
        };
        Stream2.prototype.enableHarkStoppedSpeakingEvent = function() {
          var _this = this;
          this.setHarkListenerIfNotExists();
          if (!this.harkStoppedSpeakingEnabled && !!this.speechEvent) {
            this.harkStoppedSpeakingEnabled = true;
            this.speechEvent.on("stopped_speaking", function() {
              _this.session.emitEvent("publisherStopSpeaking", [
                new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.session, "publisherStopSpeaking", _this.connection, _this.streamId)
              ]);
              _this.streamManager.emitEvent("publisherStopSpeaking", [
                new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.streamManager, "publisherStopSpeaking", _this.connection, _this.streamId)
              ]);
              _this.harkStoppedSpeakingEnabledOnce = false;
            });
          }
        };
        Stream2.prototype.enableOnceHarkStoppedSpeakingEvent = function() {
          var _this = this;
          this.setHarkListenerIfNotExists();
          if (!this.harkStoppedSpeakingEnabledOnce && !!this.speechEvent) {
            this.harkStoppedSpeakingEnabledOnce = true;
            this.speechEvent.once("stopped_speaking", function() {
              if (_this.harkStoppedSpeakingEnabledOnce) {
                _this.session.emitEvent("publisherStopSpeaking", [
                  new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.session, "publisherStopSpeaking", _this.connection, _this.streamId)
                ]);
                _this.streamManager.emitEvent("publisherStopSpeaking", [
                  new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.streamManager, "publisherStopSpeaking", _this.connection, _this.streamId)
                ]);
              }
              _this.disableHarkStoppedSpeakingEvent(true);
            });
          }
        };
        Stream2.prototype.disableHarkStoppedSpeakingEvent = function(disabledByOnce) {
          if (!!this.speechEvent) {
            this.harkStoppedSpeakingEnabledOnce = false;
            if (disabledByOnce) {
              if (this.harkStoppedSpeakingEnabled) {
                return;
              }
            } else {
              this.harkStoppedSpeakingEnabled = false;
            }
            if (this.harkVolumeChangeEnabled || this.harkVolumeChangeEnabledOnce || this.harkSpeakingEnabled || this.harkSpeakingEnabledOnce) {
              this.speechEvent.off("stopped_speaking");
            } else {
              this.speechEvent.stop();
              delete this.speechEvent;
            }
          }
        };
        Stream2.prototype.enableHarkVolumeChangeEvent = function(force) {
          var _this = this;
          if (this.setHarkListenerIfNotExists()) {
            if (!this.harkVolumeChangeEnabled || force) {
              this.harkVolumeChangeEnabled = true;
              this.speechEvent.on("volume_change", function(harkEvent) {
                var oldValue = _this.speechEvent.oldVolumeValue;
                var value = { newValue: harkEvent, oldValue };
                _this.speechEvent.oldVolumeValue = harkEvent;
                _this.streamManager.emitEvent("streamAudioVolumeChange", [
                  new StreamManagerEvent_1.StreamManagerEvent(_this.streamManager, "streamAudioVolumeChange", value)
                ]);
              });
            }
          } else {
            this.harkVolumeChangeEnabled = true;
          }
        };
        Stream2.prototype.enableOnceHarkVolumeChangeEvent = function(force) {
          var _this = this;
          if (this.setHarkListenerIfNotExists()) {
            if (!this.harkVolumeChangeEnabledOnce || force) {
              this.harkVolumeChangeEnabledOnce = true;
              this.speechEvent.once("volume_change", function(harkEvent) {
                var oldValue = _this.speechEvent.oldVolumeValue;
                var value = { newValue: harkEvent, oldValue };
                _this.speechEvent.oldVolumeValue = harkEvent;
                _this.disableHarkVolumeChangeEvent(true);
                _this.streamManager.emitEvent("streamAudioVolumeChange", [
                  new StreamManagerEvent_1.StreamManagerEvent(_this.streamManager, "streamAudioVolumeChange", value)
                ]);
              });
            }
          } else {
            this.harkVolumeChangeEnabledOnce = true;
          }
        };
        Stream2.prototype.disableHarkVolumeChangeEvent = function(disabledByOnce) {
          if (!!this.speechEvent) {
            this.harkVolumeChangeEnabledOnce = false;
            if (disabledByOnce) {
              if (this.harkVolumeChangeEnabled) {
                return;
              }
            } else {
              this.harkVolumeChangeEnabled = false;
            }
            if (this.harkSpeakingEnabled || this.harkSpeakingEnabledOnce || this.harkStoppedSpeakingEnabled || this.harkStoppedSpeakingEnabledOnce) {
              this.speechEvent.off("volume_change");
            } else {
              this.speechEvent.stop();
              delete this.speechEvent;
            }
          }
        };
        Stream2.prototype.isLocal = function() {
          return !this.inboundStreamOpts && !!this.outboundStreamOpts;
        };
        Stream2.prototype.getSelectedIceCandidate = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.webRtcStats.getSelectedIceCandidateInfo().then(function(report) {
              return resolve(report);
            }).catch(function(error) {
              return reject(error);
            });
          });
        };
        Stream2.prototype.getRemoteIceCandidateList = function() {
          return this.webRtcPeer.remoteCandidatesQueue;
        };
        Stream2.prototype.getLocalIceCandidateList = function() {
          return this.webRtcPeer.localCandidatesQueue;
        };
        Stream2.prototype.streamIceConnectionStateBroken = function() {
          if (!this.getWebRtcPeer() || !this.getRTCPeerConnection()) {
            return false;
          }
          if (this.isLocal() && !!this.session.openvidu.advancedConfiguration.forceMediaReconnectionAfterNetworkDrop) {
            logger.warn('OpenVidu Browser advanced configuration option "forceMediaReconnectionAfterNetworkDrop" is enabled. Stream '.concat(this.streamId, " (").concat(this.isLocal() ? "Publisher" : "Subscriber", ") will force a reconnection"));
            return true;
          }
          var iceConnectionState = this.getRTCPeerConnection().iceConnectionState;
          return iceConnectionState !== "connected" && iceConnectionState !== "completed";
        };
        Stream2.prototype.setHarkListenerIfNotExists = function() {
          if (!!this.mediaStream) {
            if (!this.speechEvent) {
              var harkOptions = !!this.harkOptions ? this.harkOptions : this.session.openvidu.advancedConfiguration.publisherSpeakingEventsOptions || {};
              harkOptions.interval = typeof harkOptions.interval === "number" ? harkOptions.interval : 100;
              harkOptions.threshold = typeof harkOptions.threshold === "number" ? harkOptions.threshold : -50;
              this.speechEvent = hark(this.mediaStream, harkOptions);
            }
            return true;
          }
          return false;
        };
        Stream2.prototype.setupReconnectionEventEmitter = function(resolve, reject) {
          if (this.reconnectionEventEmitter == void 0) {
            this.reconnectionEventEmitter = new EventEmitter();
            return false;
          } else {
            console.warn("Trying to reconnect stream ".concat(this.streamId, " (").concat(this.isLocal() ? "Publisher" : "Subscriber", ") but an ongoing reconnection process is active. Waiting for response..."));
            this.reconnectionEventEmitter.once("success", function() {
              return resolve();
            });
            this.reconnectionEventEmitter.once("error", function(error) {
              return reject(error);
            });
            return true;
          }
        };
        Stream2.prototype.initWebRtcPeerSend = function(reconnect) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var _a;
            if (reconnect) {
              if (_this.setupReconnectionEventEmitter(resolve, reject)) {
                return;
              }
            } else {
              _this.initHarkEvents();
            }
            var finalResolve = function() {
              var _a2;
              if (reconnect) {
                (_a2 = _this.reconnectionEventEmitter) === null || _a2 === void 0 ? void 0 : _a2.emitEvent("success");
                delete _this.reconnectionEventEmitter;
              }
              return resolve();
            };
            var finalReject = function(error) {
              var _a2;
              if (reconnect) {
                (_a2 = _this.reconnectionEventEmitter) === null || _a2 === void 0 ? void 0 : _a2.emitEvent("error", [error]);
                delete _this.reconnectionEventEmitter;
              }
              return reject(error);
            };
            var successOfferCallback = function(sdpOfferParam) {
              logger.debug("Sending SDP offer to publish as " + _this.streamId, sdpOfferParam);
              var method = reconnect ? "reconnectStream" : "publishVideo";
              var params;
              if (reconnect) {
                params = {
                  stream: _this.streamId,
                  sdpString: sdpOfferParam
                };
              } else {
                var typeOfVideo = void 0;
                if (_this.isSendVideo()) {
                  typeOfVideo = typeof MediaStreamTrack !== "undefined" && _this.outboundStreamOpts.publisherProperties.videoSource instanceof MediaStreamTrack ? TypeOfVideo_1.TypeOfVideo.CUSTOM : _this.isSendScreen() ? TypeOfVideo_1.TypeOfVideo.SCREEN : TypeOfVideo_1.TypeOfVideo.CAMERA;
                }
                params = {
                  doLoopback: _this.displayMyRemote() || false,
                  hasAudio: _this.isSendAudio(),
                  hasVideo: _this.isSendVideo(),
                  audioActive: _this.audioActive,
                  videoActive: _this.videoActive,
                  typeOfVideo,
                  frameRate: !!_this.frameRate ? _this.frameRate : -1,
                  videoDimensions: JSON.stringify(_this.videoDimensions),
                  filter: _this.outboundStreamOpts.publisherProperties.filter,
                  sdpOffer: sdpOfferParam
                };
              }
              _this.session.openvidu.sendRequest(method, params, function(error, response) {
                if (error) {
                  if (error.code === 401) {
                    finalReject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to publish"));
                  } else {
                    finalReject("Error on publishVideo: " + JSON.stringify(error));
                  }
                } else {
                  _this.webRtcPeer.processRemoteAnswer(response.sdpAnswer).then(function() {
                    _this.streamId = response.id;
                    _this.creationTime = response.createdAt;
                    _this.isLocalStreamPublished = true;
                    _this.publishedOnce = true;
                    if (_this.displayMyRemote()) {
                      _this.localMediaStreamWhenSubscribedToRemote = _this.mediaStream;
                      _this.remotePeerSuccessfullyEstablished(reconnect);
                    }
                    if (reconnect) {
                      _this.ee.emitEvent("stream-reconnected-by-publisher", []);
                    } else {
                      _this.ee.emitEvent("stream-created-by-publisher", []);
                    }
                    _this.initWebRtcStats();
                    logger.info("'Publisher' (" + _this.streamId + ") successfully " + (reconnect ? "reconnected" : "published") + " to session");
                    finalResolve();
                  }).catch(function(error2) {
                    finalReject(error2);
                  });
                }
              });
            };
            var config = {
              mediaConstraints: {
                audio: _this.hasAudio,
                video: _this.hasVideo
              },
              simulcast: (_a = _this.outboundStreamOpts.publisherProperties.videoSimulcast) !== null && _a !== void 0 ? _a : _this.session.openvidu.videoSimulcast,
              onIceCandidate: _this.connection.sendIceCandidate.bind(_this.connection),
              onIceConnectionStateException: _this.onIceConnectionStateExceptionHandler.bind(_this),
              iceServers: _this.getIceServersConf(),
              mediaStream: _this.mediaStream,
              mediaServer: _this.session.openvidu.mediaServer,
              typeOfVideo: _this.typeOfVideo ? TypeOfVideo_1.TypeOfVideo[_this.typeOfVideo] : void 0
            };
            if (_this.session.openvidu.mediaServer !== "mediasoup") {
              config.simulcast = false;
            }
            if (reconnect) {
              _this.disposeWebRtcPeer();
            }
            if (_this.displayMyRemote()) {
              _this.webRtcPeer = new WebRtcPeer_1.WebRtcPeerSendrecv(config);
            } else {
              _this.webRtcPeer = new WebRtcPeer_1.WebRtcPeerSendonly(config);
            }
            _this.webRtcPeer.addIceConnectionStateChangeListener("publisher of " + _this.connection.connectionId);
            _this.webRtcPeer.createOffer().then(function(sdpOffer) {
              _this.webRtcPeer.processLocalOffer(sdpOffer).then(function() {
                successOfferCallback(sdpOffer.sdp);
              }).catch(function(error) {
                finalReject(new Error("(publish) SDP process local offer error: " + JSON.stringify(error)));
              });
            }).catch(function(error) {
              finalReject(new Error("(publish) SDP create offer error: " + JSON.stringify(error)));
            });
          });
        };
        Stream2.prototype.finalResolveForSubscription = function(reconnect, resolve) {
          var _a;
          logger.info("'Subscriber' (" + this.streamId + ") successfully " + (reconnect ? "reconnected" : "subscribed"));
          this.remotePeerSuccessfullyEstablished(reconnect);
          this.initWebRtcStats();
          if (reconnect) {
            (_a = this.reconnectionEventEmitter) === null || _a === void 0 ? void 0 : _a.emitEvent("success");
            delete this.reconnectionEventEmitter;
          }
          return resolve();
        };
        Stream2.prototype.finalRejectForSubscription = function(reconnect, error, reject) {
          var _a;
          logger.error("Error for 'Subscriber' (" + this.streamId + ") while trying to " + (reconnect ? "reconnect" : "subscribe") + ": " + error.toString());
          if (reconnect) {
            (_a = this.reconnectionEventEmitter) === null || _a === void 0 ? void 0 : _a.emitEvent("error", [error]);
            delete this.reconnectionEventEmitter;
          }
          return reject(error);
        };
        Stream2.prototype.initWebRtcPeerReceive = function(reconnect) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (reconnect) {
              if (_this.setupReconnectionEventEmitter(resolve, reject)) {
                return;
              }
            }
            if (_this.session.openvidu.mediaServer === "mediasoup") {
              _this.initWebRtcPeerReceiveFromServer(reconnect).then(function() {
                return _this.finalResolveForSubscription(reconnect, resolve);
              }).catch(function(error) {
                return _this.finalRejectForSubscription(reconnect, error, reject);
              });
            } else {
              _this.initWebRtcPeerReceiveFromClient(reconnect).then(function() {
                return _this.finalResolveForSubscription(reconnect, resolve);
              }).catch(function(error) {
                return _this.finalRejectForSubscription(reconnect, error, reject);
              });
            }
          });
        };
        Stream2.prototype.initWebRtcPeerReceiveFromClient = function(reconnect) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.completeWebRtcPeerReceive(reconnect, false).then(function(response) {
              _this.webRtcPeer.processRemoteAnswer(response.sdpAnswer).then(function() {
                return resolve();
              }).catch(function(error) {
                return reject(error);
              });
            }).catch(function(error) {
              return reject(error);
            });
          });
        };
        Stream2.prototype.initWebRtcPeerReceiveFromServer = function(reconnect) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.session.openvidu.sendRequest("prepareReceiveVideoFrom", { sender: _this.streamId, reconnect }, function(error, response) {
              if (error) {
                return reject(new Error("Error on prepareReceiveVideoFrom: " + JSON.stringify(error)));
              } else {
                _this.completeWebRtcPeerReceive(reconnect, false, response.sdpOffer).then(function() {
                  return resolve();
                }).catch(function(error2) {
                  return reject(error2);
                });
              }
            });
          });
        };
        Stream2.prototype.completeWebRtcPeerReceive = function(reconnect, forciblyReconnect, sdpOfferByServer) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            logger.debug("'Session.subscribe(Stream)' called");
            var sendSdpToServer = function(sdpString) {
              logger.debug("Sending local SDP ".concat(!!sdpOfferByServer ? "answer" : "offer", " to subscribe to ").concat(_this.streamId), sdpString);
              var method = reconnect ? "reconnectStream" : "receiveVideoFrom";
              var params = {};
              params[reconnect ? "stream" : "sender"] = _this.streamId;
              if (!!sdpOfferByServer) {
                params[reconnect ? "sdpString" : "sdpAnswer"] = sdpString;
              } else {
                params["sdpOffer"] = sdpString;
              }
              if (reconnect) {
                params["forciblyReconnect"] = forciblyReconnect;
              }
              _this.session.openvidu.sendRequest(method, params, function(error, response) {
                if (error) {
                  return reject(new Error("Error on " + method + " : " + JSON.stringify(error)));
                } else {
                  return resolve(response);
                }
              });
            };
            var config = {
              mediaConstraints: {
                audio: _this.hasAudio,
                video: _this.hasVideo
              },
              simulcast: false,
              onIceCandidate: _this.connection.sendIceCandidate.bind(_this.connection),
              onIceConnectionStateException: _this.onIceConnectionStateExceptionHandler.bind(_this),
              iceServers: _this.getIceServersConf(),
              mediaServer: _this.session.openvidu.mediaServer,
              typeOfVideo: _this.typeOfVideo ? TypeOfVideo_1.TypeOfVideo[_this.typeOfVideo] : void 0
            };
            if (reconnect) {
              _this.disposeWebRtcPeer();
            }
            _this.webRtcPeer = new WebRtcPeer_1.WebRtcPeerRecvonly(config);
            _this.webRtcPeer.addIceConnectionStateChangeListener(_this.streamId);
            if (!!sdpOfferByServer) {
              _this.webRtcPeer.processRemoteOffer(sdpOfferByServer).then(function() {
                _this.webRtcPeer.createAnswer().then(function(sdpAnswer) {
                  _this.webRtcPeer.processLocalAnswer(sdpAnswer).then(function() {
                    sendSdpToServer(sdpAnswer.sdp);
                  }).catch(function(error) {
                    return reject(new Error("(subscribe) SDP process local answer error: " + JSON.stringify(error)));
                  });
                }).catch(function(error) {
                  return reject(new Error("(subscribe) SDP create answer error: " + JSON.stringify(error)));
                });
              }).catch(function(error) {
                return reject(new Error("(subscribe) SDP process remote offer error: " + JSON.stringify(error)));
              });
            } else {
              _this.webRtcPeer.createOffer().then(function(sdpOffer) {
                _this.webRtcPeer.processLocalOffer(sdpOffer).then(function() {
                  sendSdpToServer(sdpOffer.sdp);
                }).catch(function(error) {
                  return reject(new Error("(subscribe) SDP process local offer error: " + JSON.stringify(error)));
                });
              }).catch(function(error) {
                return reject(new Error("(subscribe) SDP create offer error: " + JSON.stringify(error)));
              });
            }
          });
        };
        Stream2.prototype.remotePeerSuccessfullyEstablished = function(reconnect) {
          if (reconnect && this.mediaStream != null) {
            this.disposeMediaStream();
          }
          this.mediaStream = new MediaStream();
          var receiver;
          for (var _i = 0, _a = this.webRtcPeer.pc.getReceivers(); _i < _a.length; _i++) {
            receiver = _a[_i];
            if (!!receiver.track) {
              this.mediaStream.addTrack(receiver.track);
            }
          }
          logger.debug("Peer remote stream", this.mediaStream);
          if (!!this.mediaStream) {
            if (this.streamManager instanceof Subscriber_1.Subscriber) {
              if (!!this.mediaStream.getAudioTracks()[0]) {
                var enabled = reconnect ? this.audioActive : !!this.streamManager.properties.subscribeToAudio;
                this.mediaStream.getAudioTracks()[0].enabled = enabled;
              }
              if (!!this.mediaStream.getVideoTracks()[0]) {
                var enabled = reconnect ? this.videoActive : !!this.videoActive && !!this.streamManager.properties.subscribeToVideo;
                this.mediaStream.getVideoTracks()[0].enabled = enabled;
              }
            }
            this.updateMediaStreamInVideos();
            this.initHarkEvents();
          }
        };
        Stream2.prototype.initHarkEvents = function() {
          if (!!this.mediaStream.getAudioTracks()[0]) {
            if (this.session.anySpeechEventListenerEnabled("publisherStartSpeaking", true, this.streamManager)) {
              this.enableOnceHarkSpeakingEvent();
            }
            if (this.session.anySpeechEventListenerEnabled("publisherStartSpeaking", false, this.streamManager)) {
              this.enableHarkSpeakingEvent();
            }
            if (this.session.anySpeechEventListenerEnabled("publisherStopSpeaking", true, this.streamManager)) {
              this.enableOnceHarkStoppedSpeakingEvent();
            }
            if (this.session.anySpeechEventListenerEnabled("publisherStopSpeaking", false, this.streamManager)) {
              this.enableHarkStoppedSpeakingEvent();
            }
            if (this.harkVolumeChangeEnabledOnce) {
              this.enableOnceHarkVolumeChangeEvent(true);
            }
            if (this.harkVolumeChangeEnabled) {
              this.enableHarkVolumeChangeEvent(true);
            }
          }
        };
        Stream2.prototype.onIceConnectionStateExceptionHandler = function(exceptionName, message, data) {
          switch (exceptionName) {
            case ExceptionEvent_1.ExceptionEventName.ICE_CONNECTION_FAILED:
              this.onIceConnectionFailed();
              break;
            case ExceptionEvent_1.ExceptionEventName.ICE_CONNECTION_DISCONNECTED:
              this.onIceConnectionDisconnected();
              break;
          }
          this.session.emitEvent("exception", [new ExceptionEvent_1.ExceptionEvent(this.session, exceptionName, this, message, data)]);
        };
        Stream2.prototype.onIceConnectionFailed = function() {
          logger.log("[ICE_CONNECTION_FAILED] Handling ICE_CONNECTION_FAILED event. Reconnecting stream ".concat(this.streamId, " (").concat(this.isLocal() ? "Publisher" : "Subscriber", ")"));
          this.reconnectStreamAndLogResultingIceConnectionState(ExceptionEvent_1.ExceptionEventName.ICE_CONNECTION_FAILED);
        };
        Stream2.prototype.onIceConnectionDisconnected = function() {
          var _this = this;
          logger.log("[ICE_CONNECTION_DISCONNECTED] Handling ICE_CONNECTION_DISCONNECTED event. Waiting for ICE to be restored and reconnect stream ".concat(this.streamId, " (").concat(this.isLocal() ? "Publisher" : "Subscriber", ") if not possible"));
          var timeout = this.session.openvidu.advancedConfiguration.iceConnectionDisconnectedExceptionTimeout || 4e3;
          this.awaitWebRtcPeerConnectionState(timeout).then(function(state) {
            switch (state) {
              case "failed":
                logger.warn("[ICE_CONNECTION_DISCONNECTED] ICE connection of stream ".concat(_this.streamId, " (").concat(_this.isLocal() ? "Publisher" : "Subscriber", ") is now failed after ICE_CONNECTION_DISCONNECTED"));
                break;
              case "connected":
              case "completed":
                logger.log("[ICE_CONNECTION_DISCONNECTED] ICE connection of stream ".concat(_this.streamId, " (").concat(_this.isLocal() ? "Publisher" : "Subscriber", ") automatically restored after ICE_CONNECTION_DISCONNECTED. Current ICE connection state: ").concat(state));
                break;
              case "closed":
              case "checking":
              case "new":
              case "disconnected":
                logger.warn("[ICE_CONNECTION_DISCONNECTED] ICE connection of stream ".concat(_this.streamId, " (").concat(_this.isLocal() ? "Publisher" : "Subscriber", ") couldn't be restored after ICE_CONNECTION_DISCONNECTED event. Current ICE connection state after ").concat(timeout, " ms: ").concat(state));
                _this.reconnectStreamAndLogResultingIceConnectionState(ExceptionEvent_1.ExceptionEventName.ICE_CONNECTION_DISCONNECTED);
                break;
            }
          });
        };
        Stream2.prototype.reconnectStreamAndLogResultingIceConnectionState = function(event) {
          return __awaiter(this, void 0, void 0, function() {
            var finalIceStateAfterReconnection, error_5;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2, , 3]);
                  return [4, this.reconnectStreamAndReturnIceConnectionState(event)];
                case 1:
                  finalIceStateAfterReconnection = _a.sent();
                  switch (finalIceStateAfterReconnection) {
                    case "connected":
                    case "completed":
                      logger.log("[".concat(event, "] Stream ").concat(this.streamId, " (").concat(this.isLocal() ? "Publisher" : "Subscriber", ") successfully reconnected after ").concat(event, ". Current ICE connection state: ").concat(finalIceStateAfterReconnection));
                      break;
                    default:
                      logger.error("[".concat(event, "] Stream ").concat(this.streamId, " (").concat(this.isLocal() ? "Publisher" : "Subscriber", ") failed to reconnect after ").concat(event, ". Current ICE connection state: ").concat(finalIceStateAfterReconnection));
                      break;
                  }
                  return [3, 3];
                case 2:
                  error_5 = _a.sent();
                  logger.error("[".concat(event, "] Error reconnecting stream ").concat(this.streamId, " (").concat(this.isLocal() ? "Publisher" : "Subscriber", ") after ").concat(event, ": ").concat(error_5));
                  return [3, 3];
                case 3:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        Stream2.prototype.reconnectStreamAndReturnIceConnectionState = function(event) {
          return __awaiter(this, void 0, void 0, function() {
            var timeout, error_6;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  logger.log("[".concat(event, "] Reconnecting stream ").concat(this.streamId, " (").concat(this.isLocal() ? "Publisher" : "Subscriber", ") after event ").concat(event));
                  _a.label = 1;
                case 1:
                  _a.trys.push([1, 3, , 4]);
                  return [4, this.reconnectStream(event)];
                case 2:
                  _a.sent();
                  timeout = this.session.openvidu.advancedConfiguration.iceConnectionDisconnectedExceptionTimeout || 4e3;
                  return [2, this.awaitWebRtcPeerConnectionState(timeout)];
                case 3:
                  error_6 = _a.sent();
                  logger.warn("[".concat(event, "] Error reconnecting stream ").concat(this.streamId, " (").concat(this.isLocal() ? "Publisher" : "Subscriber", "). Reason: ").concat(error_6));
                  return [2, this.awaitWebRtcPeerConnectionState(1)];
                case 4:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        Stream2.prototype.awaitWebRtcPeerConnectionState = function(timeout) {
          return __awaiter(this, void 0, void 0, function() {
            var state, interval, intervals, i;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  state = this.getRTCPeerConnection().iceConnectionState;
                  interval = 150;
                  intervals = Math.ceil(timeout / interval);
                  i = 0;
                  _a.label = 1;
                case 1:
                  if (!(i < intervals))
                    return [3, 4];
                  state = this.getRTCPeerConnection().iceConnectionState;
                  if (state === "connected" || state === "completed") {
                    return [3, 4];
                  }
                  return [4, new Promise(function(resolve) {
                    return setTimeout(resolve, interval);
                  })];
                case 2:
                  _a.sent();
                  _a.label = 3;
                case 3:
                  i++;
                  return [3, 1];
                case 4:
                  return [2, state];
              }
            });
          });
        };
        Stream2.prototype.reconnectStream = function(event) {
          return __awaiter(this, void 0, void 0, function() {
            var isWsConnected, errorMsg;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, this.isWebsocketConnected(event, 3e3)];
                case 1:
                  isWsConnected = _a.sent();
                  if (isWsConnected) {
                    logger.log("[".concat(event, "] Trying to reconnect stream ").concat(this.streamId, " (").concat(this.isLocal() ? "Publisher" : "Subscriber", ") and the websocket is opened"));
                    if (this.isLocal()) {
                      return [2, this.initWebRtcPeerSend(true)];
                    } else {
                      return [2, this.initWebRtcPeerReceive(true)];
                    }
                  } else {
                    errorMsg = "[".concat(event, "] Trying to reconnect stream ").concat(this.streamId, " (").concat(this.isLocal() ? "Publisher" : "Subscriber", ") but the websocket wasn't opened");
                    logger.error(errorMsg);
                    throw Error(errorMsg);
                  }
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        Stream2.prototype.isWebsocketConnected = function(event, msResponseTimeout) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var wsReadyState = _this.session.openvidu.getWsReadyState();
            if (wsReadyState === 1) {
              var responseTimeout_1 = setTimeout(function() {
                console.warn("[".concat(event, "] Websocket timeout of ").concat(msResponseTimeout, "ms"));
                return resolve(false);
              }, msResponseTimeout);
              _this.session.openvidu.sendRequest("echo", {}, function(error, response) {
                clearTimeout(responseTimeout_1);
                if (!!error) {
                  console.warn("[".concat(event, "] Websocket 'echo' returned error: ").concat(error));
                  return resolve(false);
                } else {
                  return resolve(true);
                }
              });
            } else {
              console.warn("[".concat(event, "] Websocket readyState is ").concat(wsReadyState));
              return resolve(false);
            }
          });
        };
        Stream2.prototype.initWebRtcStats = function() {
          this.webRtcStats = new WebRtcStats_1.WebRtcStats(this);
          this.webRtcStats.initWebRtcStats();
        };
        Stream2.prototype.stopWebRtcStats = function() {
          if (!!this.webRtcStats && this.webRtcStats.isEnabled()) {
            this.webRtcStats.stopWebRtcStats();
          }
        };
        Stream2.prototype.getIceServersConf = function() {
          var returnValue;
          if (!!this.session.openvidu.advancedConfiguration.iceServers) {
            returnValue = this.session.openvidu.advancedConfiguration.iceServers === "freeice" ? void 0 : this.session.openvidu.advancedConfiguration.iceServers;
          } else if (this.session.openvidu.iceServers) {
            returnValue = this.session.openvidu.iceServers;
          } else {
            returnValue = void 0;
          }
          return returnValue;
        };
        Stream2.prototype.gatherStatsForPeer = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (_this.isLocal()) {
              _this.getRTCPeerConnection().getSenders().forEach(function(sender) {
                return sender.getStats().then(function(response) {
                  response.forEach(function(report) {
                    if (_this.isReportWanted(report)) {
                      var finalReport = {};
                      finalReport["type"] = report.type;
                      finalReport["timestamp"] = report.timestamp;
                      finalReport["id"] = report.id;
                      if (report.type === "outbound-rtp") {
                        finalReport["ssrc"] = report.ssrc;
                        finalReport["firCount"] = report.firCount;
                        finalReport["pliCount"] = report.pliCount;
                        finalReport["nackCount"] = report.nackCount;
                        finalReport["qpSum"] = report.qpSum;
                        if (!!report.kind) {
                          finalReport["mediaType"] = report.kind;
                        } else if (!!report.mediaType) {
                          finalReport["mediaType"] = report.mediaType;
                        } else {
                          finalReport["mediaType"] = report.id.indexOf("VideoStream") !== -1 ? "video" : "audio";
                        }
                        if (finalReport["mediaType"] === "video") {
                          finalReport["framesEncoded"] = report.framesEncoded;
                        }
                        finalReport["packetsSent"] = report.packetsSent;
                        finalReport["bytesSent"] = report.bytesSent;
                      }
                      if (report.type === "candidate-pair" && report.totalRoundTripTime !== void 0) {
                        finalReport["availableOutgoingBitrate"] = report.availableOutgoingBitrate;
                        finalReport["rtt"] = report.currentRoundTripTime;
                        finalReport["averageRtt"] = report.totalRoundTripTime / report.responsesReceived;
                      }
                      if (report.type === "remote-inbound-rtp" || report.type === "remote-outbound-rtp") {
                      }
                      logger.log(finalReport);
                    }
                  });
                });
              });
            } else {
              _this.getRTCPeerConnection().getReceivers().forEach(function(receiver) {
                return receiver.getStats().then(function(response) {
                  response.forEach(function(report) {
                    if (_this.isReportWanted(report)) {
                      var finalReport = {};
                      finalReport["type"] = report.type;
                      finalReport["timestamp"] = report.timestamp;
                      finalReport["id"] = report.id;
                      if (report.type === "inbound-rtp") {
                        finalReport["ssrc"] = report.ssrc;
                        finalReport["firCount"] = report.firCount;
                        finalReport["pliCount"] = report.pliCount;
                        finalReport["nackCount"] = report.nackCount;
                        finalReport["qpSum"] = report.qpSum;
                        if (!!report.kind) {
                          finalReport["mediaType"] = report.kind;
                        } else if (!!report.mediaType) {
                          finalReport["mediaType"] = report.mediaType;
                        } else {
                          finalReport["mediaType"] = report.id.indexOf("VideoStream") !== -1 ? "video" : "audio";
                        }
                        if (finalReport["mediaType"] === "video") {
                          finalReport["framesDecoded"] = report.framesDecoded;
                        }
                        finalReport["packetsReceived"] = report.packetsReceived;
                        finalReport["packetsLost"] = report.packetsLost;
                        finalReport["jitter"] = report.jitter;
                        finalReport["bytesReceived"] = report.bytesReceived;
                      }
                      if (report.type === "candidate-pair" && report.totalRoundTripTime !== void 0) {
                        finalReport["availableIncomingBitrate"] = report.availableIncomingBitrate;
                        finalReport["rtt"] = report.currentRoundTripTime;
                        finalReport["averageRtt"] = report.totalRoundTripTime / report.responsesReceived;
                      }
                      if (report.type === "remote-inbound-rtp" || report.type === "remote-outbound-rtp") {
                      }
                      logger.log(finalReport);
                    }
                  });
                });
              });
            }
          });
        };
        Stream2.prototype.isReportWanted = function(report) {
          return report.type === "inbound-rtp" && !this.isLocal() || report.type === "outbound-rtp" && this.isLocal() || report.type === "candidate-pair" && report.nominated && report.bytesSent > 0;
        };
        return Stream2;
      }()
    );
    exports.Stream = Stream;
  }
});

// node_modules/openvidu-browser/lib/OpenVidu/Connection.js
var require_Connection = __commonJS({
  "node_modules/openvidu-browser/lib/OpenVidu/Connection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Connection = void 0;
    var Stream_1 = require_Stream();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var ExceptionEvent_1 = require_ExceptionEvent();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var Connection = (
      /** @class */
      function() {
        function Connection2(session, connectionOptions) {
          this.session = session;
          this.disposed = false;
          var msg = "'Connection' created ";
          if (!!connectionOptions.role) {
            this.localOptions = connectionOptions;
            this.connectionId = this.localOptions.id;
            this.creationTime = this.localOptions.createdAt;
            this.data = this.localOptions.metadata;
            this.rpcSessionId = this.localOptions.sessionId;
            this.role = this.localOptions.role;
            this.record = this.localOptions.record;
            msg += "(local)";
          } else {
            this.remoteOptions = connectionOptions;
            this.connectionId = this.remoteOptions.id;
            this.creationTime = this.remoteOptions.createdAt;
            if (this.remoteOptions.metadata) {
              this.data = this.remoteOptions.metadata;
            }
            if (this.remoteOptions.streams) {
              this.initRemoteStreams(this.remoteOptions.streams);
            }
            msg += "(remote) with 'connectionId' [" + this.remoteOptions.id + "]";
          }
          logger.info(msg);
        }
        Connection2.prototype.sendIceCandidate = function(candidate) {
          var _this = this;
          if (!this.disposed) {
            logger.debug((!!this.stream.outboundStreamOpts ? "Local" : "Remote") + "candidate for" + this.connectionId, candidate);
            this.session.openvidu.sendRequest("onIceCandidate", {
              endpointName: this.connectionId,
              candidate: candidate.candidate,
              sdpMid: candidate.sdpMid,
              sdpMLineIndex: candidate.sdpMLineIndex
            }, function(error, response) {
              if (error) {
                logger.error("Error sending ICE candidate: " + JSON.stringify(error));
                _this.session.emitEvent("exception", [
                  new ExceptionEvent_1.ExceptionEvent(_this.session, ExceptionEvent_1.ExceptionEventName.ICE_CANDIDATE_ERROR, _this.session, "There was an unexpected error on the server-side processing an ICE candidate generated and sent by the client-side", error)
                ]);
              }
            });
          } else {
            logger.warn("Connection ".concat(this.connectionId, " disposed when trying to send an ICE candidate. ICE candidate not sent"));
          }
        };
        Connection2.prototype.initRemoteStreams = function(options) {
          var _this = this;
          options.forEach(function(opts) {
            var streamOptions = {
              id: opts.id,
              createdAt: opts.createdAt,
              connection: _this,
              hasAudio: opts.hasAudio,
              hasVideo: opts.hasVideo,
              audioActive: opts.audioActive,
              videoActive: opts.videoActive,
              typeOfVideo: opts.typeOfVideo,
              frameRate: opts.frameRate,
              videoDimensions: !!opts.videoDimensions ? JSON.parse(opts.videoDimensions) : void 0,
              filter: !!opts.filter ? opts.filter : void 0
            };
            var stream = new Stream_1.Stream(_this.session, streamOptions);
            _this.addStream(stream);
          });
          logger.info("Remote 'Connection' with 'connectionId' [" + this.connectionId + "] is now configured for receiving Streams with options: ", this.stream.inboundStreamOpts);
        };
        Connection2.prototype.addStream = function(stream) {
          stream.connection = this;
          this.stream = stream;
        };
        Connection2.prototype.removeStream = function() {
          delete this.stream;
        };
        Connection2.prototype.dispose = function() {
          this.disposed = true;
          this.removeStream();
        };
        return Connection2;
      }()
    );
    exports.Connection = Connection;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/ConnectionEvent.js
var require_ConnectionEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/ConnectionEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConnectionEvent = void 0;
    var Event_1 = require_Event();
    var ConnectionEvent = (
      /** @class */
      function(_super) {
        __extends(ConnectionEvent2, _super);
        function ConnectionEvent2(cancelable, target, type, connection, reason) {
          var _this = _super.call(this, cancelable, target, type) || this;
          _this.connection = connection;
          _this.reason = reason;
          return _this;
        }
        ConnectionEvent2.prototype.callDefaultBehavior = function() {
        };
        return ConnectionEvent2;
      }(Event_1.Event)
    );
    exports.ConnectionEvent = ConnectionEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/FilterEvent.js
var require_FilterEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/FilterEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilterEvent = void 0;
    var Event_1 = require_Event();
    var FilterEvent = (
      /** @class */
      function(_super) {
        __extends(FilterEvent2, _super);
        function FilterEvent2(target, eventType, data) {
          var _this = _super.call(this, false, target, eventType) || this;
          _this.data = data;
          return _this;
        }
        FilterEvent2.prototype.callDefaultBehavior = function() {
        };
        return FilterEvent2;
      }(Event_1.Event)
    );
    exports.FilterEvent = FilterEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/RecordingEvent.js
var require_RecordingEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/RecordingEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RecordingEvent = void 0;
    var Event_1 = require_Event();
    var RecordingEvent = (
      /** @class */
      function(_super) {
        __extends(RecordingEvent2, _super);
        function RecordingEvent2(target, type, id, name, reason) {
          var _this = _super.call(this, false, target, type) || this;
          _this.id = id;
          if (name !== id) {
            _this.name = name;
          }
          _this.reason = reason;
          return _this;
        }
        RecordingEvent2.prototype.callDefaultBehavior = function() {
        };
        return RecordingEvent2;
      }(Event_1.Event)
    );
    exports.RecordingEvent = RecordingEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/SessionDisconnectedEvent.js
var require_SessionDisconnectedEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/SessionDisconnectedEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SessionDisconnectedEvent = void 0;
    var Event_1 = require_Event();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var SessionDisconnectedEvent = (
      /** @class */
      function(_super) {
        __extends(SessionDisconnectedEvent2, _super);
        function SessionDisconnectedEvent2(target, reason) {
          var _this = _super.call(this, true, target, "sessionDisconnected") || this;
          _this.reason = reason;
          return _this;
        }
        SessionDisconnectedEvent2.prototype.callDefaultBehavior = function() {
          logger.info("Calling default behavior upon '" + this.type + "' event dispatched by 'Session'");
          var session = this.target;
          session.remoteConnections.forEach(function(remoteConnection) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var connectionId = remoteConnection.connectionId;
            if (!!((_a = session.remoteConnections.get(connectionId)) === null || _a === void 0 ? void 0 : _a.stream)) {
              (_b = session.remoteConnections.get(connectionId)) === null || _b === void 0 ? void 0 : _b.stream.disposeWebRtcPeer();
              (_c = session.remoteConnections.get(connectionId)) === null || _c === void 0 ? void 0 : _c.stream.disposeMediaStream();
              if ((_d = session.remoteConnections.get(connectionId)) === null || _d === void 0 ? void 0 : _d.stream.streamManager) {
                (_e = session.remoteConnections.get(connectionId)) === null || _e === void 0 ? void 0 : _e.stream.streamManager.removeAllVideos();
              }
              var streamId = (_g = (_f = session.remoteConnections.get(connectionId)) === null || _f === void 0 ? void 0 : _f.stream) === null || _g === void 0 ? void 0 : _g.streamId;
              if (!!streamId) {
                session.remoteStreamsCreated.delete(streamId);
              }
              (_h = session.remoteConnections.get(connectionId)) === null || _h === void 0 ? void 0 : _h.dispose();
            }
            session.remoteConnections.delete(connectionId);
          });
        };
        return SessionDisconnectedEvent2;
      }(Event_1.Event)
    );
    exports.SessionDisconnectedEvent = SessionDisconnectedEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/SignalEvent.js
var require_SignalEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/SignalEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SignalEvent = void 0;
    var Event_1 = require_Event();
    var SignalEvent = (
      /** @class */
      function(_super) {
        __extends(SignalEvent2, _super);
        function SignalEvent2(target, type, data, from) {
          var _this = _super.call(this, false, target, "signal") || this;
          if (!!type) {
            _this.type = "signal:" + type;
          }
          _this.data = data;
          _this.from = from;
          return _this;
        }
        SignalEvent2.prototype.callDefaultBehavior = function() {
        };
        return SignalEvent2;
      }(Event_1.Event)
    );
    exports.SignalEvent = SignalEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/SpeechToTextEvent.js
var require_SpeechToTextEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/SpeechToTextEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpeechToTextEvent = void 0;
    var Event_1 = require_Event();
    var SpeechToTextEvent = (
      /** @class */
      function(_super) {
        __extends(SpeechToTextEvent2, _super);
        function SpeechToTextEvent2(target, connection, text, reason, raw, lang) {
          var _this = _super.call(this, false, target, "speechToTextMessage") || this;
          _this.connection = connection;
          _this.text = text;
          _this.reason = reason;
          _this.raw = raw;
          _this.lang = lang;
          return _this;
        }
        SpeechToTextEvent2.prototype.callDefaultBehavior = function() {
        };
        return SpeechToTextEvent2;
      }(Event_1.Event)
    );
    exports.SpeechToTextEvent = SpeechToTextEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamEvent.js
var require_StreamEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StreamEvent = void 0;
    var Event_1 = require_Event();
    var Publisher_1 = require_Publisher();
    var Session_1 = require_Session();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var StreamEvent = (
      /** @class */
      function(_super) {
        __extends(StreamEvent2, _super);
        function StreamEvent2(cancelable, target, type, stream, reason) {
          var _this = _super.call(this, cancelable, target, type) || this;
          _this.stream = stream;
          _this.reason = reason;
          return _this;
        }
        StreamEvent2.prototype.callDefaultBehavior = function() {
          if (this.type === "streamDestroyed") {
            if (this.target instanceof Session_1.Session) {
              logger.info("Calling default behavior upon '" + this.type + "' event dispatched by 'Session'");
              this.stream.disposeWebRtcPeer();
            } else if (this.target instanceof Publisher_1.Publisher) {
              logger.info("Calling default behavior upon '" + this.type + "' event dispatched by 'Publisher'");
              clearInterval(this.target.screenShareResizeInterval);
              this.stream.isLocalStreamReadyToPublish = false;
              var openviduPublishers = this.target.openvidu.publishers;
              for (var i = 0; i < openviduPublishers.length; i++) {
                if (openviduPublishers[i] === this.target) {
                  openviduPublishers.splice(i, 1);
                  break;
                }
              }
            }
            this.stream.disposeMediaStream();
            if (this.stream.streamManager)
              this.stream.streamManager.removeAllVideos();
            this.stream.session.remoteStreamsCreated.delete(this.stream.streamId);
            var remoteConnection = this.stream.session.remoteConnections.get(this.stream.connection.connectionId);
            if (!!remoteConnection && !!remoteConnection.remoteOptions) {
              var streamOptionsServer = remoteConnection.remoteOptions.streams;
              for (var i = streamOptionsServer.length - 1; i >= 0; --i) {
                if (streamOptionsServer[i].id === this.stream.streamId) {
                  streamOptionsServer.splice(i, 1);
                }
              }
            }
          }
        };
        return StreamEvent2;
      }(Event_1.Event)
    );
    exports.StreamEvent = StreamEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/ConnectionPropertyChangedEvent.js
var require_ConnectionPropertyChangedEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/ConnectionPropertyChangedEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConnectionPropertyChangedEvent = void 0;
    var Event_1 = require_Event();
    var ConnectionPropertyChangedEvent = (
      /** @class */
      function(_super) {
        __extends(ConnectionPropertyChangedEvent2, _super);
        function ConnectionPropertyChangedEvent2(target, connection, changedProperty, newValue, oldValue) {
          var _this = _super.call(this, false, target, "connectionPropertyChanged") || this;
          _this.connection = connection;
          _this.changedProperty = changedProperty;
          _this.newValue = newValue;
          _this.oldValue = oldValue;
          return _this;
        }
        ConnectionPropertyChangedEvent2.prototype.callDefaultBehavior = function() {
        };
        return ConnectionPropertyChangedEvent2;
      }(Event_1.Event)
    );
    exports.ConnectionPropertyChangedEvent = ConnectionPropertyChangedEvent;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/NetworkQualityLevelChangedEvent.js
var require_NetworkQualityLevelChangedEvent = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/NetworkQualityLevelChangedEvent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NetworkQualityLevelChangedEvent = void 0;
    var Event_1 = require_Event();
    var NetworkQualityLevelChangedEvent = (
      /** @class */
      function(_super) {
        __extends(NetworkQualityLevelChangedEvent2, _super);
        function NetworkQualityLevelChangedEvent2(target, newValue, oldValue, connection) {
          var _this = _super.call(this, false, target, "networkQualityLevelChanged") || this;
          _this.newValue = newValue;
          _this.oldValue = oldValue;
          _this.connection = connection;
          return _this;
        }
        NetworkQualityLevelChangedEvent2.prototype.callDefaultBehavior = function() {
        };
        return NetworkQualityLevelChangedEvent2;
      }(Event_1.Event)
    );
    exports.NetworkQualityLevelChangedEvent = NetworkQualityLevelChangedEvent;
  }
});

// node_modules/openvidu-browser/node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/openvidu-browser/node_modules/semver/internal/debug.js"(exports, module) {
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module.exports = debug;
  }
});

// node_modules/openvidu-browser/node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "node_modules/openvidu-browser/node_modules/semver/internal/constants.js"(exports, module) {
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    module.exports = {
      SEMVER_SPEC_VERSION,
      MAX_LENGTH,
      MAX_SAFE_INTEGER,
      MAX_SAFE_COMPONENT_LENGTH
    };
  }
});

// node_modules/openvidu-browser/node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/openvidu-browser/node_modules/semver/internal/re.js"(exports, module) {
    var { MAX_SAFE_COMPONENT_LENGTH } = require_constants();
    var debug = require_debug();
    exports = module.exports = {};
    var re = exports.re = [];
    var src = exports.src = [];
    var t = exports.t = {};
    var R = 0;
    var createToken = (name, value, isGlobal) => {
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
    createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/openvidu-browser/node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/openvidu-browser/node_modules/semver/internal/parse-options.js"(exports, module) {
    var opts = ["includePrerelease", "loose", "rtl"];
    var parseOptions = (options) => !options ? {} : typeof options !== "object" ? { loose: true } : opts.filter((k) => options[k]).reduce((o, k) => {
      o[k] = true;
      return o;
    }, {});
    module.exports = parseOptions;
  }
});

// node_modules/openvidu-browser/node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/openvidu-browser/node_modules/semver/internal/identifiers.js"(exports, module) {
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/openvidu-browser/node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/openvidu-browser/node_modules/semver/classes/semver.js"(exports, module) {
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier) {
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier);
            this.inc("pre", identifier);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier);
            }
            this.inc("pre", identifier);
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre":
            if (this.prerelease.length === 0) {
              this.prerelease = [0];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                this.prerelease.push(0);
              }
            }
            if (identifier) {
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = [identifier, 0];
                }
              } else {
                this.prerelease = [identifier, 0];
              }
            }
            break;
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.format();
        this.raw = this.version;
        return this;
      }
    };
    module.exports = SemVer;
  }
});

// node_modules/openvidu-browser/node_modules/semver/functions/major.js
var require_major = __commonJS({
  "node_modules/openvidu-browser/node_modules/semver/functions/major.js"(exports, module) {
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module.exports = major;
  }
});

// node_modules/openvidu-browser/node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "node_modules/openvidu-browser/node_modules/semver/functions/minor.js"(exports, module) {
    var SemVer = require_semver();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module.exports = minor;
  }
});

// node_modules/openvidu-browser/lib/OpenVidu/Session.js
var require_Session = __commonJS({
  "node_modules/openvidu-browser/lib/OpenVidu/Session.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Session = void 0;
    var Connection_1 = require_Connection();
    var Filter_1 = require_Filter();
    var Subscriber_1 = require_Subscriber();
    var EventDispatcher_1 = require_EventDispatcher();
    var ConnectionEvent_1 = require_ConnectionEvent();
    var FilterEvent_1 = require_FilterEvent();
    var RecordingEvent_1 = require_RecordingEvent();
    var SessionDisconnectedEvent_1 = require_SessionDisconnectedEvent();
    var SignalEvent_1 = require_SignalEvent();
    var SpeechToTextEvent_1 = require_SpeechToTextEvent();
    var StreamEvent_1 = require_StreamEvent();
    var StreamPropertyChangedEvent_1 = require_StreamPropertyChangedEvent();
    var ConnectionPropertyChangedEvent_1 = require_ConnectionPropertyChangedEvent();
    var NetworkQualityLevelChangedEvent_1 = require_NetworkQualityLevelChangedEvent();
    var OpenViduError_1 = require_OpenViduError();
    var VideoInsertMode_1 = require_VideoInsertMode();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var Platform_1 = require_Platform();
    var semverMajor = require_major();
    var semverMinor = require_minor();
    var ExceptionEvent_1 = require_ExceptionEvent();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var platform;
    var Session = (
      /** @class */
      function(_super) {
        __extends(Session2, _super);
        function Session2(openvidu) {
          var _this = _super.call(this) || this;
          _this.streamManagers = [];
          _this.remoteStreamsCreated = /* @__PURE__ */ new Map();
          _this.remoteConnections = /* @__PURE__ */ new Map();
          platform = Platform_1.PlatformUtils.getInstance();
          _this.openvidu = openvidu;
          return _this;
        }
        Session2.prototype.connect = function(token, metadata) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.processToken(token);
            if (_this.openvidu.checkSystemRequirements()) {
              _this.options = {
                sessionId: _this.sessionId,
                participantId: token,
                metadata: !!metadata ? _this.stringClientMetadata(metadata) : ""
              };
              _this.connectAux(token).then(function() {
                return resolve();
              }).catch(function(error) {
                return reject(error);
              });
            } else {
              return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.BROWSER_NOT_SUPPORTED, "Browser " + platform.getName() + " (version " + platform.getVersion() + ") for " + platform.getFamily() + " is not supported in OpenVidu"));
            }
          });
        };
        Session2.prototype.disconnect = function() {
          this.leave(false, "disconnect");
        };
        Session2.prototype.subscribe = function(stream, targetElement, param3, param4) {
          var properties = {};
          if (!!param3 && typeof param3 !== "function") {
            properties = {
              insertMode: typeof param3.insertMode !== "undefined" ? typeof param3.insertMode === "string" ? VideoInsertMode_1.VideoInsertMode[param3.insertMode] : properties.insertMode : VideoInsertMode_1.VideoInsertMode.APPEND,
              subscribeToAudio: typeof param3.subscribeToAudio !== "undefined" ? param3.subscribeToAudio : true,
              subscribeToVideo: typeof param3.subscribeToVideo !== "undefined" ? param3.subscribeToVideo : true
            };
          } else {
            properties = {
              insertMode: VideoInsertMode_1.VideoInsertMode.APPEND,
              subscribeToAudio: true,
              subscribeToVideo: true
            };
          }
          var completionHandler = void 0;
          if (!!param3 && typeof param3 === "function") {
            completionHandler = param3;
          } else if (!!param4) {
            completionHandler = param4;
          }
          if (!this.sessionConnected()) {
            if (completionHandler !== void 0) {
              completionHandler(this.notConnectedError());
            }
            throw this.notConnectedError();
          }
          logger.info("Subscribing to " + stream.connection.connectionId);
          stream.subscribe().then(function() {
            logger.info("Subscribed correctly to " + stream.connection.connectionId);
            if (completionHandler !== void 0) {
              completionHandler(void 0);
            }
          }).catch(function(error) {
            if (completionHandler !== void 0) {
              completionHandler(error);
            }
          });
          var subscriber = new Subscriber_1.Subscriber(stream, targetElement, properties);
          if (!!subscriber.targetElement) {
            stream.streamManager.createVideoElement(subscriber.targetElement, properties.insertMode);
          }
          return subscriber;
        };
        Session2.prototype.subscribeAsync = function(stream, targetElement, properties) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (!_this.sessionConnected()) {
              return reject(_this.notConnectedError());
            }
            var subscriber;
            var callback = function(error) {
              if (!!error) {
                return reject(error);
              } else {
                return resolve(subscriber);
              }
            };
            if (!!properties) {
              subscriber = _this.subscribe(stream, targetElement, properties, callback);
            } else {
              subscriber = _this.subscribe(stream, targetElement, callback);
            }
          });
        };
        Session2.prototype.unsubscribe = function(subscriber) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (!_this.sessionConnected()) {
              return reject(_this.notConnectedError());
            } else {
              var connectionId_1 = subscriber.stream.connection.connectionId;
              logger.info("Unsubscribing from " + connectionId_1);
              _this.openvidu.sendRequest("unsubscribeFromVideo", { sender: subscriber.stream.connection.connectionId }, function(error, response) {
                if (error) {
                  logger.error("Error unsubscribing from " + connectionId_1);
                  return reject(error);
                } else {
                  logger.info("Unsubscribed correctly from " + connectionId_1);
                  subscriber.stream.streamManager.removeAllVideos();
                  subscriber.stream.disposeWebRtcPeer();
                  subscriber.stream.disposeMediaStream();
                  return resolve();
                }
              });
            }
          });
        };
        Session2.prototype.publish = function(publisher) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (!_this.sessionConnected()) {
              return reject(_this.notConnectedError());
            }
            publisher.session = _this;
            publisher.stream.session = _this;
            if (!publisher.stream.publishedOnce) {
              _this.connection.addStream(publisher.stream);
              publisher.stream.publish().then(function() {
                _this.sendVideoData(publisher, 8, true, 5);
                return resolve();
              }).catch(function(error) {
                return reject(error);
              });
            } else {
              publisher.initialize().then(function() {
                _this.connection.addStream(publisher.stream);
                publisher.reestablishStreamPlayingEvent();
                publisher.stream.publish().then(function() {
                  _this.sendVideoData(publisher, 8, true, 5);
                  return resolve();
                }).catch(function(error) {
                  return reject(error);
                });
              }).catch(function(error) {
                return reject(error);
              });
            }
          });
        };
        Session2.prototype.unpublish = function(publisher) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (!_this.sessionConnected()) {
              throw _this.notConnectedError();
            }
            var stream = publisher.stream;
            if (!stream.connection) {
              return reject(new Error("The associated Connection object of this Publisher is null"));
            } else if (stream.connection !== _this.connection) {
              return reject(new Error("The associated Connection object of this Publisher is not your local Connection.  Only moderators can force unpublish on remote Streams via 'forceUnpublish' method"));
            } else {
              logger.info("Unpublishing local media (" + stream.connection.connectionId + ")");
              _this.openvidu.sendRequest("unpublishVideo", function(error, response) {
                if (error) {
                  return reject(error);
                } else {
                  logger.info("Media unpublished correctly");
                  stream.disposeWebRtcPeer();
                  if (stream.connection.stream == stream) {
                    delete stream.connection.stream;
                  }
                  var streamEvent = new StreamEvent_1.StreamEvent(true, publisher, "streamDestroyed", publisher.stream, "unpublish");
                  publisher.emitEvent("streamDestroyed", [streamEvent]);
                  streamEvent.callDefaultBehavior();
                  return resolve();
                }
              });
            }
          });
        };
        Session2.prototype.forceDisconnect = function(connection) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (!_this.sessionConnected()) {
              return reject(_this.notConnectedError());
            }
            logger.info("Forcing disconnect for connection " + connection.connectionId);
            _this.openvidu.sendRequest("forceDisconnect", { connectionId: connection.connectionId }, function(error, response) {
              if (error) {
                logger.error("Error forcing disconnect for Connection " + connection.connectionId, error);
                if (error.code === 401) {
                  return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to force a disconnection"));
                } else {
                  return reject(error);
                }
              } else {
                logger.info("Forcing disconnect correctly for Connection " + connection.connectionId);
                return resolve();
              }
            });
          });
        };
        Session2.prototype.forceUnpublish = function(stream) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (!_this.sessionConnected()) {
              return reject(_this.notConnectedError());
            }
            logger.info("Forcing unpublish for stream " + stream.streamId);
            _this.openvidu.sendRequest("forceUnpublish", { streamId: stream.streamId }, function(error, response) {
              if (error) {
                logger.error("Error forcing unpublish for Stream " + stream.streamId, error);
                if (error.code === 401) {
                  return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to force an unpublishing"));
                } else {
                  return reject(error);
                }
              } else {
                logger.info("Forcing unpublish correctly for Stream " + stream.streamId);
                return resolve();
              }
            });
          });
        };
        Session2.prototype.signal = function(signal) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            if (!_this.sessionConnected()) {
              return reject(_this.notConnectedError());
            }
            var signalMessage = {};
            if (signal.to && signal.to.length > 0) {
              var connectionIds_1 = [];
              signal.to.forEach(function(connection) {
                if (!!connection.connectionId) {
                  connectionIds_1.push(connection.connectionId);
                }
              });
              signalMessage["to"] = connectionIds_1;
            } else {
              signalMessage["to"] = [];
            }
            signalMessage["data"] = signal.data ? signal.data : "";
            var typeAux = signal.type ? signal.type : "signal";
            if (!!typeAux) {
              if (typeAux.substring(0, 7) !== "signal:") {
                typeAux = "signal:" + typeAux;
              }
            }
            signalMessage["type"] = typeAux;
            _this.openvidu.sendRequest("sendMessage", {
              message: JSON.stringify(signalMessage)
            }, function(error, response) {
              if (!!error) {
                return reject(error);
              } else {
                return resolve();
              }
            });
          });
        };
        Session2.prototype.subscribeToSpeechToText = function(stream, lang) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.openvidu.sendRequest("subscribeToSpeechToText", {
              connectionId: stream.connection.connectionId,
              lang
            }, function(error, response) {
              if (!!error) {
                return reject(error);
              } else {
                return resolve();
              }
            });
          });
        };
        Session2.prototype.unsubscribeFromSpeechToText = function(stream) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.openvidu.sendRequest("unsubscribeFromSpeechToText", {
              connectionId: stream.connection.connectionId
            }, function(error, response) {
              if (!!error) {
                return reject(error);
              } else {
                return resolve();
              }
            });
          });
        };
        Session2.prototype.on = function(type, handler) {
          var _a, _b, _c, _d;
          _super.prototype.onAux.call(this, type, "Event '" + type + "' triggered by 'Session'", handler);
          if (type === "publisherStartSpeaking") {
            this.remoteConnections.forEach(function(remoteConnection) {
              var _a2;
              if (!!((_a2 = remoteConnection.stream) === null || _a2 === void 0 ? void 0 : _a2.hasAudio)) {
                remoteConnection.stream.enableHarkSpeakingEvent();
              }
            });
            if (!!((_b = (_a = this.connection) === null || _a === void 0 ? void 0 : _a.stream) === null || _b === void 0 ? void 0 : _b.hasAudio)) {
              this.connection.stream.enableHarkSpeakingEvent();
            }
          }
          if (type === "publisherStopSpeaking") {
            this.remoteConnections.forEach(function(remoteConnection) {
              var _a2;
              if (!!((_a2 = remoteConnection.stream) === null || _a2 === void 0 ? void 0 : _a2.hasAudio)) {
                remoteConnection.stream.enableHarkStoppedSpeakingEvent();
              }
            });
            if (!!((_d = (_c = this.connection) === null || _c === void 0 ? void 0 : _c.stream) === null || _d === void 0 ? void 0 : _d.hasAudio)) {
              this.connection.stream.enableHarkStoppedSpeakingEvent();
            }
          }
          return this;
        };
        Session2.prototype.once = function(type, handler) {
          var _a, _b, _c, _d;
          _super.prototype.onceAux.call(this, type, "Event '" + type + "' triggered once by 'Session'", handler);
          if (type === "publisherStartSpeaking") {
            this.remoteConnections.forEach(function(remoteConnection) {
              var _a2;
              if (!!((_a2 = remoteConnection.stream) === null || _a2 === void 0 ? void 0 : _a2.hasAudio)) {
                remoteConnection.stream.enableOnceHarkSpeakingEvent();
              }
            });
            if (!!((_b = (_a = this.connection) === null || _a === void 0 ? void 0 : _a.stream) === null || _b === void 0 ? void 0 : _b.hasAudio)) {
              this.connection.stream.enableOnceHarkSpeakingEvent();
            }
          }
          if (type === "publisherStopSpeaking") {
            this.remoteConnections.forEach(function(remoteConnection) {
              var _a2;
              if (!!((_a2 = remoteConnection.stream) === null || _a2 === void 0 ? void 0 : _a2.hasAudio)) {
                remoteConnection.stream.enableOnceHarkStoppedSpeakingEvent();
              }
            });
            if (!!((_d = (_c = this.connection) === null || _c === void 0 ? void 0 : _c.stream) === null || _d === void 0 ? void 0 : _d.hasAudio)) {
              this.connection.stream.enableOnceHarkStoppedSpeakingEvent();
            }
          }
          return this;
        };
        Session2.prototype.off = function(type, handler) {
          var _this = this;
          var _a, _b, _c, _d;
          _super.prototype.offAux.call(this, type, handler);
          if (type === "publisherStartSpeaking") {
            if (!this.anySpeechEventListenerEnabled("publisherStartSpeaking", false)) {
              this.remoteConnections.forEach(function(remoteConnection) {
                var _a2;
                if (!!((_a2 = remoteConnection.stream) === null || _a2 === void 0 ? void 0 : _a2.streamManager)) {
                  if (!_this.anySpeechEventListenerEnabled("publisherStartSpeaking", false, remoteConnection.stream.streamManager)) {
                    remoteConnection.stream.disableHarkSpeakingEvent(false);
                  }
                }
              });
              if (!!((_b = (_a = this.connection) === null || _a === void 0 ? void 0 : _a.stream) === null || _b === void 0 ? void 0 : _b.streamManager)) {
                if (!this.anySpeechEventListenerEnabled("publisherStartSpeaking", false, this.connection.stream.streamManager)) {
                  this.connection.stream.disableHarkSpeakingEvent(false);
                }
              }
            }
          }
          if (type === "publisherStopSpeaking") {
            if (!this.anySpeechEventListenerEnabled("publisherStopSpeaking", false)) {
              this.remoteConnections.forEach(function(remoteConnection) {
                var _a2;
                if (!!((_a2 = remoteConnection.stream) === null || _a2 === void 0 ? void 0 : _a2.streamManager)) {
                  if (!_this.anySpeechEventListenerEnabled("publisherStopSpeaking", false, remoteConnection.stream.streamManager)) {
                    remoteConnection.stream.disableHarkStoppedSpeakingEvent(false);
                  }
                }
              });
              if (!!((_d = (_c = this.connection) === null || _c === void 0 ? void 0 : _c.stream) === null || _d === void 0 ? void 0 : _d.streamManager)) {
                if (!this.anySpeechEventListenerEnabled("publisherStopSpeaking", false, this.connection.stream.streamManager)) {
                  this.connection.stream.disableHarkStoppedSpeakingEvent(false);
                }
              }
            }
          }
          return this;
        };
        Session2.prototype.onParticipantJoined = function(event) {
          var _this = this;
          this.getConnection(event.id, "").then(function(connection) {
            logger.warn("Connection " + connection.connectionId + " already exists in connections list");
          }).catch(function(openViduError) {
            var connection = new Connection_1.Connection(_this, event);
            _this.remoteConnections.set(event.id, connection);
            _this.ee.emitEvent("connectionCreated", [new ConnectionEvent_1.ConnectionEvent(false, _this, "connectionCreated", connection, "")]);
          });
        };
        Session2.prototype.onParticipantLeft = function(event) {
          var _this = this;
          this.getRemoteConnection(event.connectionId, "onParticipantLeft").then(function(connection) {
            if (!!connection.stream) {
              var stream = connection.stream;
              var streamEvent = new StreamEvent_1.StreamEvent(true, _this, "streamDestroyed", stream, event.reason);
              _this.ee.emitEvent("streamDestroyed", [streamEvent]);
              streamEvent.callDefaultBehavior();
              _this.remoteStreamsCreated.delete(stream.streamId);
            }
            connection.dispose();
            _this.remoteConnections.delete(connection.connectionId);
            _this.ee.emitEvent("connectionDestroyed", [
              new ConnectionEvent_1.ConnectionEvent(false, _this, "connectionDestroyed", connection, event.reason)
            ]);
          }).catch(function(openViduError) {
            logger.error(openViduError);
          });
        };
        Session2.prototype.onParticipantPublished = function(event) {
          var _this = this;
          var afterConnectionFound = function(connection2) {
            _this.remoteConnections.set(connection2.connectionId, connection2);
            if (!_this.remoteStreamsCreated.get(connection2.stream.streamId)) {
              _this.ee.emitEvent("streamCreated", [new StreamEvent_1.StreamEvent(false, _this, "streamCreated", connection2.stream, "")]);
            }
            _this.remoteStreamsCreated.set(connection2.stream.streamId, true);
          };
          var connection;
          this.getRemoteConnection(event.id, "onParticipantPublished").then(function(con) {
            connection = con;
            event.metadata = con.data;
            connection.remoteOptions = event;
            connection.initRemoteStreams(event.streams);
            afterConnectionFound(connection);
          }).catch(function(openViduError) {
            connection = new Connection_1.Connection(_this, event);
            afterConnectionFound(connection);
          });
        };
        Session2.prototype.onParticipantUnpublished = function(event) {
          var _this = this;
          if (event.connectionId === this.connection.connectionId) {
            this.stopPublisherStream(event.reason);
          } else {
            this.getRemoteConnection(event.connectionId, "onParticipantUnpublished").then(function(connection) {
              var streamEvent = new StreamEvent_1.StreamEvent(true, _this, "streamDestroyed", connection.stream, event.reason);
              _this.ee.emitEvent("streamDestroyed", [streamEvent]);
              streamEvent.callDefaultBehavior();
              if (connection.stream != null) {
                var streamId = connection.stream.streamId;
                _this.remoteStreamsCreated.delete(streamId);
                connection.removeStream();
              }
            }).catch(function(openViduError) {
              logger.error(openViduError);
            });
          }
        };
        Session2.prototype.onParticipantEvicted = function(event) {
          if (event.connectionId === this.connection.connectionId) {
            if (!!this.sessionId && !this.connection.disposed) {
              this.leave(true, event.reason);
            }
          }
        };
        Session2.prototype.onNewMessage = function(event) {
          var _this = this;
          logger.info("New signal: " + JSON.stringify(event));
          var strippedType = !!event.type ? event.type.replace(/^(signal:)/, "") : void 0;
          if (!!event.from) {
            this.getConnection(event.from, "Connection '" + event.from + "' unknown when 'onNewMessage'. Existing remote connections: " + JSON.stringify(this.remoteConnections.keys()) + ". Existing local connection: " + this.connection.connectionId).then(function(connection) {
              _this.ee.emitEvent("signal", [new SignalEvent_1.SignalEvent(_this, strippedType, event.data, connection)]);
              if (!!event.type && event.type !== "signal") {
                _this.ee.emitEvent(event.type, [new SignalEvent_1.SignalEvent(_this, strippedType, event.data, connection)]);
              }
            }).catch(function(openViduError) {
              logger.error(openViduError);
            });
          } else {
            this.ee.emitEvent("signal", [new SignalEvent_1.SignalEvent(this, strippedType, event.data, void 0)]);
            if (!!event.type && event.type !== "signal") {
              this.ee.emitEvent(event.type, [new SignalEvent_1.SignalEvent(this, strippedType, event.data, void 0)]);
            }
          }
        };
        Session2.prototype.onStreamPropertyChanged = function(event) {
          var _this = this;
          var callback = function(connection) {
            var _a, _b;
            if (!!connection.stream && connection.stream.streamId === event.streamId) {
              var stream = connection.stream;
              var oldValue = void 0;
              switch (event.property) {
                case "audioActive":
                  oldValue = stream.audioActive;
                  event.newValue = event.newValue === "true";
                  stream.audioActive = event.newValue;
                  break;
                case "videoActive":
                  oldValue = stream.videoActive;
                  event.newValue = event.newValue === "true";
                  stream.videoActive = event.newValue;
                  var videoTrack = (_b = (_a = stream === null || stream === void 0 ? void 0 : stream.getMediaStream()) === null || _a === void 0 ? void 0 : _a.getVideoTracks()) === null || _b === void 0 ? void 0 : _b[0];
                  if (videoTrack && !videoTrack.enabled && stream.videoActive) {
                    videoTrack.enabled = true;
                  }
                  break;
                case "videoTrack":
                  event.newValue = JSON.parse(event.newValue);
                  break;
                case "audioTrack":
                  event.newValue = JSON.parse(event.newValue);
                  break;
                case "videoDimensions":
                  oldValue = stream.videoDimensions;
                  event.newValue = JSON.parse(JSON.parse(event.newValue));
                  stream.videoDimensions = event.newValue;
                  break;
                case "filter":
                  oldValue = stream.filter;
                  event.newValue = Object.keys(event.newValue).length > 0 ? event.newValue : void 0;
                  if (event.newValue !== void 0) {
                    stream.filter = new Filter_1.Filter(event.newValue.type, event.newValue.options);
                    stream.filter.stream = stream;
                    if (event.newValue.lastExecMethod) {
                      stream.filter.lastExecMethod = event.newValue.lastExecMethod;
                    }
                  } else {
                    delete stream.filter;
                  }
                  event.newValue = stream.filter;
                  break;
              }
              _this.ee.emitEvent("streamPropertyChanged", [
                new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this, stream, event.property, event.newValue, oldValue, event.reason)
              ]);
              if (!!stream.streamManager) {
                stream.streamManager.emitEvent("streamPropertyChanged", [
                  new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(stream.streamManager, stream, event.property, event.newValue, oldValue, event.reason)
                ]);
              }
            } else {
              logger.error("No stream with streamId '" + event.streamId + "' found for connection '" + event.connectionId + "' on 'streamPropertyChanged' event");
            }
          };
          if (event.connectionId === this.connection.connectionId) {
            callback(this.connection);
          } else {
            this.getRemoteConnection(event.connectionId, "onStreamPropertyChanged").then(function(connection) {
              callback(connection);
            }).catch(function(openViduError) {
              logger.error(openViduError);
            });
          }
        };
        Session2.prototype.onConnectionPropertyChanged = function(event) {
          var oldValue;
          switch (event.property) {
            case "role":
              oldValue = this.connection.role.slice();
              this.connection.role = event.newValue;
              this.connection.localOptions.role = event.newValue;
              break;
            case "record":
              oldValue = this.connection.record;
              event.newValue = event.newValue === "true";
              this.connection.record = event.newValue;
              this.connection.localOptions.record = event.newValue;
              break;
          }
          this.ee.emitEvent("connectionPropertyChanged", [
            new ConnectionPropertyChangedEvent_1.ConnectionPropertyChangedEvent(this, this.connection, event.property, event.newValue, oldValue)
          ]);
        };
        Session2.prototype.onNetworkQualityLevelChangedChanged = function(event) {
          var _this = this;
          if (event.connectionId === this.connection.connectionId) {
            this.ee.emitEvent("networkQualityLevelChanged", [
              new NetworkQualityLevelChangedEvent_1.NetworkQualityLevelChangedEvent(this, event.newValue, event.oldValue, this.connection)
            ]);
          } else {
            this.getConnection(event.connectionId, "Connection not found for connectionId " + event.connectionId).then(function(connection) {
              _this.ee.emitEvent("networkQualityLevelChanged", [
                new NetworkQualityLevelChangedEvent_1.NetworkQualityLevelChangedEvent(_this, event.newValue, event.oldValue, connection)
              ]);
            }).catch(function(openViduError) {
              logger.error(openViduError);
            });
          }
        };
        Session2.prototype.recvIceCandidate = function(event) {
          var candidateInit = {
            candidate: event.candidate,
            sdpMLineIndex: event.sdpMLineIndex,
            sdpMid: event.sdpMid
          };
          var iceCandidate = new RTCIceCandidate(candidateInit);
          this.getConnection(event.senderConnectionId, "Connection not found for connectionId " + event.senderConnectionId + " owning endpoint " + event.endpointName + ". Ice candidate will be ignored: " + iceCandidate).then(function(connection) {
            var stream = connection.stream;
            stream.getWebRtcPeer().addIceCandidate(iceCandidate).catch(function(error) {
              logger.error("Error adding candidate for " + stream.streamId + " stream of endpoint " + event.endpointName + ": " + error);
            });
          }).catch(function(openViduError) {
            logger.error(openViduError);
          });
        };
        Session2.prototype.onSessionClosed = function(msg) {
          logger.info("Session closed: " + JSON.stringify(msg));
          var s = msg.sessionId;
          if (s !== void 0) {
            this.ee.emitEvent("session-closed", [
              {
                session: s
              }
            ]);
          } else {
            logger.warn("Session undefined on session closed", msg);
          }
        };
        Session2.prototype.onLostConnection = function(reason) {
          logger.warn("Lost connection in Session " + this.sessionId);
          if (!!this.sessionId && !!this.connection && !this.connection.disposed) {
            this.leave(true, reason);
          }
        };
        Session2.prototype.onRecoveredConnection = function() {
          logger.info("Recovered connection in Session " + this.sessionId);
          this.reconnectBrokenStreams();
          this.ee.emitEvent("reconnected", []);
        };
        Session2.prototype.onMediaError = function(event) {
          logger.error("Media error: " + JSON.stringify(event));
          var err = event.error;
          if (err) {
            this.ee.emitEvent("error-media", [{ error: err }]);
          } else {
            logger.warn("Received undefined media error:", event);
          }
        };
        Session2.prototype.onRecordingStarted = function(event) {
          this.ee.emitEvent("recordingStarted", [new RecordingEvent_1.RecordingEvent(this, "recordingStarted", event.id, event.name)]);
        };
        Session2.prototype.onRecordingStopped = function(event) {
          this.ee.emitEvent("recordingStopped", [new RecordingEvent_1.RecordingEvent(this, "recordingStopped", event.id, event.name, event.reason)]);
        };
        Session2.prototype.onBroadcastStarted = function() {
          this.ee.emitEvent("broadcastStarted", []);
        };
        Session2.prototype.onBroadcastStopped = function() {
          this.ee.emitEvent("broadcastStopped", []);
        };
        Session2.prototype.onFilterEventDispatched = function(event) {
          var _this = this;
          var connectionId = event.connectionId;
          this.getConnection(connectionId, "No connection found for connectionId " + connectionId).then(function(connection) {
            logger.info('Filter event of type "'.concat(event.eventType, '" dispatched'));
            var stream = connection.stream;
            if (!stream || !stream.filter) {
              return logger.error('Filter event of type "'.concat(event.eventType, '" dispatched for stream ').concat(stream.streamId, " but there is no ").concat(!stream ? "stream" : "filter", " defined"));
            }
            var eventHandler = stream.filter.handlers.get(event.eventType);
            if (!eventHandler || typeof eventHandler !== "function") {
              var actualHandlers = Array.from(stream.filter.handlers.keys());
              return logger.error('Filter event of type "'.concat(event.eventType, '" not handled or not a function! Active filter events: ').concat(actualHandlers.join(",")));
            } else {
              eventHandler.call(_this, new FilterEvent_1.FilterEvent(stream.filter, event.eventType, event.data));
            }
          });
        };
        Session2.prototype.onForciblyReconnectSubscriber = function(event) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.getRemoteConnection(event.connectionId, "onForciblyReconnectSubscriber").then(function(connection) {
              if (!!connection.stream && connection.stream.streamId === event.streamId) {
                var stream_1 = connection.stream;
                if (stream_1.setupReconnectionEventEmitter(resolve, reject)) {
                  if (stream_1.reconnectionEventEmitter["onForciblyReconnectSubscriberLastEvent"] != null) {
                    stream_1.reconnectionEventEmitter["onForciblyReconnectSubscriberLastEvent"] = event;
                    return reject("Ongoing forced subscriber reconnection");
                  } else {
                    stream_1.reconnectionEventEmitter["onForciblyReconnectSubscriberLastEvent"] = event;
                    var callback_1 = function() {
                      var eventAux = stream_1.reconnectionEventEmitter["onForciblyReconnectSubscriberLastEvent"];
                      delete stream_1.reconnectionEventEmitter["onForciblyReconnectSubscriberLastEvent"];
                      _this.onForciblyReconnectSubscriber(eventAux);
                    };
                    stream_1.reconnectionEventEmitter.once("success", function() {
                      callback_1();
                    });
                    stream_1.reconnectionEventEmitter.once("error", function() {
                      callback_1();
                    });
                  }
                  return;
                }
                stream_1.completeWebRtcPeerReceive(true, true, event.sdpOffer).then(function() {
                  return stream_1.finalResolveForSubscription(true, resolve);
                }).catch(function(error) {
                  return stream_1.finalRejectForSubscription(true, "Error while forcibly reconnecting remote stream ".concat(event.streamId, ": ").concat(error.toString()), reject);
                });
              } else {
                var errMsg = "No stream with streamId '" + event.streamId + "' found for connection '" + event.connectionId + "' on 'streamPropertyChanged' event";
                logger.error(errMsg);
                return reject(errMsg);
              }
            }).catch(function(openViduError) {
              logger.error(openViduError);
              return reject(openViduError);
            });
          });
        };
        Session2.prototype.reconnectBrokenStreams = function() {
          logger.info("Re-establishing media connections...");
          var someReconnection = false;
          if (!!this.connection.stream && this.connection.stream.streamIceConnectionStateBroken()) {
            logger.warn("Re-establishing Publisher " + this.connection.stream.streamId);
            this.connection.stream.initWebRtcPeerSend(true);
            someReconnection = true;
          }
          this.remoteConnections.forEach(function(remoteConnection) {
            if (!!remoteConnection.stream && remoteConnection.stream.streamIceConnectionStateBroken()) {
              logger.warn("Re-establishing Subscriber " + remoteConnection.stream.streamId);
              remoteConnection.stream.initWebRtcPeerReceive(true);
              someReconnection = true;
            }
          });
          if (!someReconnection) {
            logger.info("There were no media streams in need of a reconnection");
          }
        };
        Session2.prototype.onSpeechToTextMessage = function(event) {
          return __awaiter(this, void 0, void 0, function() {
            var connection, ev;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, this.getConnection(event.connectionId, "No connection found for connectionId " + event.connectionId)];
                case 1:
                  connection = _a.sent();
                  ev = new SpeechToTextEvent_1.SpeechToTextEvent(this, connection, event.text, event.reason.toLowerCase(), event.raw, event.lang);
                  this.ee.emitEvent("speechToTextMessage", [ev]);
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        Session2.prototype.onSpeechToTextDisconnected = function(event) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              this.emitEvent("exception", [new ExceptionEvent_1.ExceptionEvent(this, ExceptionEvent_1.ExceptionEventName.SPEECH_TO_TEXT_DISCONNECTED, this, event.message)]);
              return [
                2
                /*return*/
              ];
            });
          });
        };
        Session2.prototype.emitEvent = function(type, eventArray) {
          this.ee.emitEvent(type, eventArray);
        };
        Session2.prototype.leave = function(forced, reason) {
          var _this = this;
          forced = !!forced;
          logger.info("Leaving Session (forced=" + forced + ")");
          this.stopVideoDataIntervals();
          if (!!this.connection) {
            if (!this.connection.disposed && !forced) {
              this.openvidu.sendRequest("leaveRoom", function(error, response) {
                if (error) {
                  logger.error("leaveRoom error: ".concat(JSON.stringify(error)));
                }
                _this.openvidu.closeWs();
              });
            } else {
              this.openvidu.closeWs();
            }
            this.stopPublisherStream(reason);
            if (!this.connection.disposed) {
              var sessionDisconnectEvent = new SessionDisconnectedEvent_1.SessionDisconnectedEvent(this, reason);
              this.ee.emitEvent("sessionDisconnected", [sessionDisconnectEvent]);
              sessionDisconnectEvent.callDefaultBehavior();
            }
          } else {
            logger.warn("You were not connected to the session " + this.sessionId);
          }
          logger.flush();
        };
        Session2.prototype.initializeParams = function(token) {
          var joinParams = {
            token: !!token ? token : "",
            session: this.sessionId,
            platform: !!platform.getDescription() ? platform.getDescription() : "unknown",
            sdkVersion: this.openvidu.libraryVersion,
            metadata: !!this.options.metadata ? this.options.metadata : "",
            secret: this.openvidu.getSecret(),
            recorder: this.openvidu.getRecorder(),
            stt: this.openvidu.getStt()
          };
          return joinParams;
        };
        Session2.prototype.sendVideoData = function(streamManager, intervalSeconds, doInterval, maxLoops) {
          var _this = this;
          var _a, _b;
          if (intervalSeconds === void 0) {
            intervalSeconds = 1;
          }
          if (doInterval === void 0) {
            doInterval = false;
          }
          if (maxLoops === void 0) {
            maxLoops = 1;
          }
          if (platform.isChromeBrowser() || platform.isChromeMobileBrowser() || platform.isOperaBrowser() || platform.isOperaMobileBrowser() || platform.isEdgeBrowser() || platform.isEdgeMobileBrowser() || platform.isElectron() || platform.isSafariBrowser() && !platform.isIonicIos() || platform.isAndroidBrowser() || platform.isSamsungBrowser() || platform.isIonicAndroid() || platform.isIOSWithSafari()) {
            var obtainAndSendVideo_1 = function() {
              return __awaiter(_this, void 0, void 0, function() {
                var pc, statsMap, arr_1;
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      pc = streamManager.stream.getRTCPeerConnection();
                      if (!(pc.connectionState === "connected"))
                        return [3, 2];
                      return [4, pc.getStats()];
                    case 1:
                      statsMap = _a2.sent();
                      arr_1 = [];
                      statsMap.forEach(function(stats) {
                        if ("frameWidth" in stats && "frameHeight" in stats && arr_1.length === 0) {
                          arr_1.push(stats);
                        }
                      });
                      if (arr_1.length > 0) {
                        this.openvidu.sendRequest("videoData", {
                          height: arr_1[0].frameHeight,
                          width: arr_1[0].frameWidth,
                          videoActive: streamManager.stream.videoActive != null ? streamManager.stream.videoActive : false,
                          audioActive: streamManager.stream.audioActive != null ? streamManager.stream.audioActive : false
                        }, function(error, response) {
                          if (error) {
                            logger.error("Error sending 'videoData' event", error);
                          }
                        });
                      }
                      _a2.label = 2;
                    case 2:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            };
            if (doInterval) {
              var loops_1 = 1;
              this.videoDataInterval = setInterval(function() {
                if (loops_1 < maxLoops) {
                  loops_1++;
                  obtainAndSendVideo_1();
                } else {
                  clearInterval(_this.videoDataInterval);
                }
              }, intervalSeconds * 1e3);
            } else {
              this.videoDataTimeout = setTimeout(obtainAndSendVideo_1, intervalSeconds * 1e3);
            }
          } else if (platform.isFirefoxBrowser() || platform.isFirefoxMobileBrowser() || platform.isIonicIos() || platform.isReactNative()) {
            this.openvidu.sendRequest("videoData", {
              height: ((_a = streamManager.stream.videoDimensions) === null || _a === void 0 ? void 0 : _a.height) || 0,
              width: ((_b = streamManager.stream.videoDimensions) === null || _b === void 0 ? void 0 : _b.width) || 0,
              videoActive: streamManager.stream.videoActive != null ? streamManager.stream.videoActive : false,
              audioActive: streamManager.stream.audioActive != null ? streamManager.stream.audioActive : false
            }, function(error, response) {
              if (error) {
                logger.error("Error sending 'videoData' event", error);
              }
            });
          } else {
            logger.error("Browser " + platform.getName() + " (version " + platform.getVersion() + ") for " + platform.getFamily() + " is not supported in OpenVidu for Network Quality");
          }
        };
        Session2.prototype.sessionConnected = function() {
          return this.connection != null;
        };
        Session2.prototype.notConnectedError = function() {
          return new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_NOT_CONNECTED, "There is no connection to the session. Method 'Session.connect' must be successfully completed first");
        };
        Session2.prototype.anySpeechEventListenerEnabled = function(event, onlyOnce, streamManager) {
          var handlersInSession = this.ee.getListeners(event);
          if (onlyOnce) {
            handlersInSession = handlersInSession.filter(function(h) {
              return h.once;
            });
          }
          var listenersInSession = handlersInSession.length;
          if (listenersInSession > 0)
            return true;
          var listenersInStreamManager = 0;
          if (!!streamManager) {
            var handlersInStreamManager = streamManager.ee.getListeners(event);
            if (onlyOnce) {
              handlersInStreamManager = handlersInStreamManager.filter(function(h) {
                return h.once;
              });
            }
            listenersInStreamManager = handlersInStreamManager.length;
          }
          return listenersInStreamManager > 0;
        };
        Session2.prototype.getTokenParams = function(token) {
          var match = token.match(/^(wss?)\:\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
          if (!!match) {
            var url = {
              protocol: match[1],
              host: match[2],
              hostname: match[3],
              port: match[4],
              pathname: match[5],
              search: match[6],
              hash: match[7]
            };
            var params = token.split("?");
            var queryParams = decodeURI(params[1]).split("&").map(function(param) {
              return param.split("=");
            }).reduce(function(values, _a) {
              var key = _a[0], value = _a[1];
              values[key] = value;
              return values;
            }, {});
            return {
              sessionId: queryParams["sessionId"],
              secret: queryParams["secret"],
              recorder: queryParams["recorder"],
              stt: queryParams["stt"],
              webrtcStatsInterval: queryParams["webrtcStatsInterval"],
              sendBrowserLogs: queryParams["sendBrowserLogs"],
              edition: queryParams["edition"],
              wsUri: url.protocol + "://" + url.host + "/openvidu",
              httpUri: "https://" + url.host
            };
          } else {
            throw new Error('Token not valid: "'.concat(token, '"'));
          }
        };
        Session2.prototype.connectAux = function(token) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            _this.openvidu.startWs(function(error) {
              if (!!error) {
                return reject(error);
              } else {
                var joinParams = _this.initializeParams(token);
                _this.openvidu.sendRequest("joinRoom", joinParams, function(error2, response) {
                  if (!!error2) {
                    return reject(error2);
                  } else {
                    _this.processJoinRoomResponse(response, token);
                    _this.connection = new Connection_1.Connection(_this, response);
                    var events_1 = {
                      connections: new Array(),
                      streams: new Array()
                    };
                    var existingParticipants = response.value;
                    existingParticipants.forEach(function(remoteConnectionOptions) {
                      var connection = new Connection_1.Connection(_this, remoteConnectionOptions);
                      _this.remoteConnections.set(connection.connectionId, connection);
                      events_1.connections.push(connection);
                      if (!!connection.stream) {
                        _this.remoteStreamsCreated.set(connection.stream.streamId, true);
                        events_1.streams.push(connection.stream);
                      }
                    });
                    _this.ee.emitEvent("connectionCreated", [
                      new ConnectionEvent_1.ConnectionEvent(false, _this, "connectionCreated", _this.connection, "")
                    ]);
                    events_1.connections.forEach(function(connection) {
                      _this.ee.emitEvent("connectionCreated", [
                        new ConnectionEvent_1.ConnectionEvent(false, _this, "connectionCreated", connection, "")
                      ]);
                    });
                    events_1.streams.forEach(function(stream) {
                      _this.ee.emitEvent("streamCreated", [new StreamEvent_1.StreamEvent(false, _this, "streamCreated", stream, "")]);
                    });
                    if (!!response.recordingId && !!response.recordingName) {
                      _this.ee.emitEvent("recordingStarted", [
                        new RecordingEvent_1.RecordingEvent(_this, "recordingStarted", response.recordingId, response.recordingName)
                      ]);
                    }
                    return resolve();
                  }
                });
              }
            });
          });
        };
        Session2.prototype.stopPublisherStream = function(reason) {
          if (!!this.connection.stream) {
            this.connection.stream.disposeWebRtcPeer();
            if (this.connection.stream.isLocalStreamPublished) {
              this.connection.stream.ee.emitEvent("local-stream-destroyed", [reason]);
            }
          }
        };
        Session2.prototype.stopVideoDataIntervals = function() {
          clearInterval(this.videoDataInterval);
          clearTimeout(this.videoDataTimeout);
        };
        Session2.prototype.stringClientMetadata = function(metadata) {
          if (typeof metadata !== "string") {
            return JSON.stringify(metadata);
          } else {
            return metadata;
          }
        };
        Session2.prototype.getConnection = function(connectionId, errorMessage) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var connection = _this.remoteConnections.get(connectionId);
            if (!!connection) {
              return resolve(connection);
            } else {
              if (_this.connection.connectionId === connectionId) {
                return resolve(_this.connection);
              } else {
                return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.GENERIC_ERROR, errorMessage));
              }
            }
          });
        };
        Session2.prototype.getRemoteConnection = function(connectionId, operation) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var connection = _this.remoteConnections.get(connectionId);
            if (!!connection) {
              return resolve(connection);
            } else {
              var errorMessage = "Remote connection " + connectionId + " unknown when '" + operation + "'. Existing remote connections: " + JSON.stringify(_this.remoteConnections.keys());
              return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.GENERIC_ERROR, errorMessage));
            }
          });
        };
        Session2.prototype.processToken = function(token) {
          var tokenParams = this.getTokenParams(token);
          this.sessionId = tokenParams.sessionId;
          if (!!tokenParams.secret) {
            this.openvidu.secret = tokenParams.secret;
          }
          if (!!tokenParams.recorder) {
            this.openvidu.recorder = true;
          }
          if (!!tokenParams.stt) {
            this.openvidu.stt = true;
          }
          if (!!tokenParams.webrtcStatsInterval) {
            this.openvidu.webrtcStatsInterval = tokenParams.webrtcStatsInterval;
          }
          if (!!tokenParams.sendBrowserLogs) {
            this.openvidu.sendBrowserLogs = tokenParams.sendBrowserLogs;
          }
          this.openvidu.isAtLeastPro = tokenParams.edition === "pro" || tokenParams.edition === "enterprise";
          this.openvidu.isEnterprise = tokenParams.edition === "enterprise";
          this.openvidu.wsUri = tokenParams.wsUri;
          this.openvidu.httpUri = tokenParams.httpUri;
        };
        Session2.prototype.processJoinRoomResponse = function(opts, token) {
          this.sessionId = opts.session;
          if (opts.customIceServers != null && opts.customIceServers.length > 0) {
            this.openvidu.iceServers = [];
            for (var _i = 0, _a = opts.customIceServers; _i < _a.length; _i++) {
              var iceServer = _a[_i];
              var rtcIceServer = {
                urls: [iceServer.url]
              };
              logger.log("STUN/TURN server IP: " + iceServer.url);
              if (iceServer.username != null && iceServer.credential != null) {
                rtcIceServer.username = iceServer.username;
                rtcIceServer.credential = iceServer.credential;
                logger.log("TURN credentials [" + iceServer.username + ":" + iceServer.credential + "]");
              }
              this.openvidu.iceServers.push(rtcIceServer);
            }
          }
          this.openvidu.role = opts.role;
          this.openvidu.finalUserId = opts.finalUserId;
          this.openvidu.mediaServer = opts.mediaServer;
          this.openvidu.videoSimulcast = opts.videoSimulcast;
          this.capabilities = {
            subscribe: true,
            publish: this.openvidu.role !== "SUBSCRIBER",
            forceUnpublish: this.openvidu.role === "MODERATOR",
            forceDisconnect: this.openvidu.role === "MODERATOR"
          };
          logger.info("openvidu-server version: " + opts.version);
          if (opts.life != null) {
            this.openvidu.life = opts.life;
          }
          var minorDifference = semverMinor(opts.version) - semverMinor(this.openvidu.libraryVersion);
          if (semverMajor(opts.version) !== semverMajor(this.openvidu.libraryVersion) || !(minorDifference == 0 || minorDifference == 1)) {
            logger.error("openvidu-browser (".concat(this.openvidu.libraryVersion, ") and openvidu-server (").concat(opts.version, ") versions are incompatible. ") + "Errors are likely to occur. openvidu-browser SDK is only compatible with the same version or the immediately following minor version of an OpenVidu deployment");
          } else if (minorDifference == 1) {
            logger.warn("openvidu-browser version ".concat(this.openvidu.libraryVersion, " does not match openvidu-server version ").concat(opts.version, ". ") + "These versions are still compatible with each other, but openvidu-browser version must be updated as soon as possible to ".concat(semverMajor(opts.version), ".").concat(semverMinor(opts.version), ".x. ") + "This client using openvidu-browser ".concat(this.openvidu.libraryVersion, " will become incompatible with the next release of openvidu-server"));
          }
          OpenViduLogger_1.OpenViduLogger.configureJSNLog(this.openvidu, token);
          this.token = token;
        };
        return Session2;
      }(EventDispatcher_1.EventDispatcher)
    );
    exports.Session = Session;
  }
});

// node_modules/openvidu-browser/lib/OpenVidu/Publisher.js
var require_Publisher = __commonJS({
  "node_modules/openvidu-browser/lib/OpenVidu/Publisher.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Publisher = void 0;
    var Session_1 = require_Session();
    var Stream_1 = require_Stream();
    var StreamManager_1 = require_StreamManager();
    var StreamEvent_1 = require_StreamEvent();
    var StreamPropertyChangedEvent_1 = require_StreamPropertyChangedEvent();
    var OpenViduError_1 = require_OpenViduError();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var Platform_1 = require_Platform();
    var TypeOfVideo_1 = require_TypeOfVideo();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var platform;
    var Publisher = (
      /** @class */
      function(_super) {
        __extends(Publisher2, _super);
        function Publisher2(targEl, properties, openvidu) {
          var _this = _super.call(this, new Stream_1.Stream(!!openvidu.session ? openvidu.session : new Session_1.Session(openvidu), {
            publisherProperties: properties,
            mediaConstraints: {}
          }), targEl) || this;
          _this.accessAllowed = false;
          _this.isSubscribedToRemote = false;
          _this.accessDenied = false;
          platform = Platform_1.PlatformUtils.getInstance();
          _this.properties = properties;
          _this.openvidu = openvidu;
          _this.stream.ee.on("local-stream-destroyed", function(reason) {
            _this.stream.isLocalStreamPublished = false;
            var streamEvent = new StreamEvent_1.StreamEvent(true, _this, "streamDestroyed", _this.stream, reason);
            _this.emitEvent("streamDestroyed", [streamEvent]);
            streamEvent.callDefaultBehavior();
          });
          return _this;
        }
        Publisher2.prototype.publishAudio = function(enabled) {
          var _this = this;
          if (this.stream.audioActive !== enabled) {
            var affectedMediaStream = this.stream.displayMyRemote() ? this.stream.localMediaStreamWhenSubscribedToRemote : this.stream.getMediaStream();
            affectedMediaStream.getAudioTracks().forEach(function(track) {
              track.enabled = enabled;
            });
            if (!!this.session && !!this.stream.streamId) {
              this.session.openvidu.sendRequest("streamPropertyChanged", {
                streamId: this.stream.streamId,
                property: "audioActive",
                newValue: enabled,
                reason: "publishAudio"
              }, function(error, response) {
                if (error) {
                  logger.error("Error sending 'streamPropertyChanged' event", error);
                } else {
                  _this.session.emitEvent("streamPropertyChanged", [
                    new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.session, _this.stream, "audioActive", enabled, !enabled, "publishAudio")
                  ]);
                  _this.emitEvent("streamPropertyChanged", [
                    new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this, _this.stream, "audioActive", enabled, !enabled, "publishAudio")
                  ]);
                  _this.session.sendVideoData(_this.stream.streamManager);
                }
              });
            }
            this.stream.audioActive = enabled;
            logger.info("'Publisher' has " + (enabled ? "published" : "unpublished") + " its audio stream");
          }
        };
        Publisher2.prototype.publishVideo = function(enabled, resource) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            return __awaiter(_this, void 0, void 0, function() {
              var affectedMediaStream_1, mustRestartMediaStream_1, oldVideoTrack, replaceVideoTrack, mediaStream, error_1;
              var _this2 = this;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    if (!(this.stream.videoActive !== enabled))
                      return [3, 9];
                    affectedMediaStream_1 = this.stream.displayMyRemote() ? this.stream.localMediaStreamWhenSubscribedToRemote : this.stream.getMediaStream();
                    mustRestartMediaStream_1 = false;
                    affectedMediaStream_1.getVideoTracks().forEach(function(track) {
                      track.enabled = enabled;
                      if (!enabled && resource === true) {
                        track.stop();
                      } else if (enabled && track.readyState === "ended") {
                        mustRestartMediaStream_1 = true;
                      }
                    });
                    if (!(!enabled && resource === true && !!this.stream.filter && this.stream.filter.type.startsWith("VB:")))
                      return [3, 2];
                    this.stream.lastVBFilter = this.stream.filter;
                    return [4, this.stream.removeFilterAux(true)];
                  case 1:
                    _a.sent();
                    _a.label = 2;
                  case 2:
                    if (!mustRestartMediaStream_1)
                      return [3, 8];
                    oldVideoTrack = affectedMediaStream_1.getVideoTracks()[0];
                    affectedMediaStream_1.removeTrack(oldVideoTrack);
                    replaceVideoTrack = function(tr) {
                      return __awaiter(_this2, void 0, void 0, function() {
                        var _this3 = this;
                        return __generator(this, function(_a2) {
                          switch (_a2.label) {
                            case 0:
                              affectedMediaStream_1.addTrack(tr);
                              if (!this.stream.isLocalStreamPublished)
                                return [3, 2];
                              return [4, this.replaceTrackInRtcRtpSender(tr)];
                            case 1:
                              _a2.sent();
                              _a2.label = 2;
                            case 2:
                              if (!!this.stream.lastVBFilter) {
                                setTimeout(function() {
                                  return __awaiter(_this3, void 0, void 0, function() {
                                    var options, lastExecMethod;
                                    return __generator(this, function(_a3) {
                                      switch (_a3.label) {
                                        case 0:
                                          options = this.stream.lastVBFilter.options;
                                          lastExecMethod = this.stream.lastVBFilter.lastExecMethod;
                                          if (!!lastExecMethod && lastExecMethod.method === "update") {
                                            options = Object.assign({}, options, lastExecMethod.params);
                                          }
                                          return [4, this.stream.applyFilter(this.stream.lastVBFilter.type, options)];
                                        case 1:
                                          _a3.sent();
                                          delete this.stream.lastVBFilter;
                                          return [
                                            2
                                            /*return*/
                                          ];
                                      }
                                    });
                                  });
                                }, 1);
                              }
                              return [
                                2
                                /*return*/
                              ];
                          }
                        });
                      });
                    };
                    if (!(!!resource && resource instanceof MediaStreamTrack))
                      return [3, 4];
                    return [4, replaceVideoTrack(resource)];
                  case 3:
                    _a.sent();
                    return [3, 8];
                  case 4:
                    _a.trys.push([4, 7, , 8]);
                    return [4, navigator.mediaDevices.getUserMedia({
                      audio: false,
                      video: this.stream.lastVideoTrackConstraints
                    })];
                  case 5:
                    mediaStream = _a.sent();
                    return [4, replaceVideoTrack(mediaStream.getVideoTracks()[0])];
                  case 6:
                    _a.sent();
                    return [3, 8];
                  case 7:
                    error_1 = _a.sent();
                    return [2, reject(error_1)];
                  case 8:
                    if (!!this.session && !!this.stream.streamId) {
                      this.session.openvidu.sendRequest("streamPropertyChanged", {
                        streamId: this.stream.streamId,
                        property: "videoActive",
                        newValue: enabled,
                        reason: "publishVideo"
                      }, function(error, response) {
                        if (error) {
                          logger.error("Error sending 'streamPropertyChanged' event", error);
                        } else {
                          _this2.session.emitEvent("streamPropertyChanged", [
                            new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this2.session, _this2.stream, "videoActive", enabled, !enabled, "publishVideo")
                          ]);
                          _this2.emitEvent("streamPropertyChanged", [
                            new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this2, _this2.stream, "videoActive", enabled, !enabled, "publishVideo")
                          ]);
                          _this2.session.sendVideoData(_this2.stream.streamManager);
                        }
                      });
                    }
                    this.stream.videoActive = enabled;
                    logger.info("'Publisher' has " + (enabled ? "published" : "unpublished") + " its video stream");
                    return [2, resolve()];
                  case 9:
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          });
        };
        Publisher2.prototype.subscribeToRemote = function(value) {
          value = value !== void 0 ? value : true;
          this.isSubscribedToRemote = value;
          this.stream.subscribeToMyRemote(value);
        };
        Publisher2.prototype.on = function(type, handler) {
          var _this = this;
          _super.prototype.on.call(this, type, handler);
          if (type === "streamCreated") {
            if (!!this.stream && this.stream.isLocalStreamPublished) {
              this.emitEvent("streamCreated", [new StreamEvent_1.StreamEvent(false, this, "streamCreated", this.stream, "")]);
            } else {
              this.stream.ee.on("stream-created-by-publisher", function() {
                _this.emitEvent("streamCreated", [new StreamEvent_1.StreamEvent(false, _this, "streamCreated", _this.stream, "")]);
              });
            }
          }
          if (type === "accessAllowed") {
            if (this.accessAllowed) {
              this.emitEvent("accessAllowed", []);
            }
          }
          if (type === "accessDenied") {
            if (this.accessDenied) {
              this.emitEvent("accessDenied", []);
            }
          }
          return this;
        };
        Publisher2.prototype.once = function(type, handler) {
          var _this = this;
          _super.prototype.once.call(this, type, handler);
          if (type === "streamCreated") {
            if (!!this.stream && this.stream.isLocalStreamPublished) {
              this.emitEvent("streamCreated", [new StreamEvent_1.StreamEvent(false, this, "streamCreated", this.stream, "")]);
            } else {
              this.stream.ee.once("stream-created-by-publisher", function() {
                _this.emitEvent("streamCreated", [new StreamEvent_1.StreamEvent(false, _this, "streamCreated", _this.stream, "")]);
              });
            }
          }
          if (type === "accessAllowed") {
            if (this.accessAllowed) {
              this.emitEvent("accessAllowed", []);
            }
          }
          if (type === "accessDenied") {
            if (this.accessDenied) {
              this.emitEvent("accessDenied", []);
            }
          }
          return this;
        };
        Publisher2.prototype.off = function(type, handler) {
          _super.prototype.off.call(this, type, handler);
          return this;
        };
        Publisher2.prototype.replaceTrack = function(track) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              return [2, this.replaceTrackAux(track, true)];
            });
          });
        };
        Publisher2.prototype.initialize = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            return __awaiter(_this, void 0, void 0, function() {
              var constraints, constraintsAux, timeForDialogEvent, startTime, errorCallback, successCallback, getMediaSuccess, getMediaError, myConstraints, outboundStreamOptions, definedAudioConstraint, mediaStream, mediaStream, error_2, error_3;
              var _this2 = this;
              var _a, _b;
              return __generator(this, function(_c) {
                switch (_c.label) {
                  case 0:
                    constraints = {};
                    constraintsAux = {};
                    timeForDialogEvent = 2e3;
                    errorCallback = function(openViduError) {
                      _this2.accessDenied = true;
                      _this2.accessAllowed = false;
                      logger.error("Publisher initialization failed. ".concat(openViduError.name, ": ").concat(openViduError.message));
                      return reject(openViduError);
                    };
                    successCallback = function(mediaStream2) {
                      var _a2, _b2;
                      _this2.accessAllowed = true;
                      _this2.accessDenied = false;
                      if (typeof MediaStreamTrack !== "undefined" && _this2.properties.audioSource instanceof MediaStreamTrack) {
                        mediaStream2.removeTrack(mediaStream2.getAudioTracks()[0]);
                        mediaStream2.addTrack(_this2.properties.audioSource);
                      }
                      if (typeof MediaStreamTrack !== "undefined" && _this2.properties.videoSource instanceof MediaStreamTrack) {
                        mediaStream2.removeTrack(mediaStream2.getVideoTracks()[0]);
                        mediaStream2.addTrack(_this2.properties.videoSource);
                      }
                      if (!!mediaStream2.getAudioTracks()[0]) {
                        var enabled = _this2.stream.audioActive !== void 0 && _this2.stream.audioActive !== null ? _this2.stream.audioActive : !!_this2.stream.outboundStreamOpts.publisherProperties.publishAudio;
                        mediaStream2.getAudioTracks()[0].enabled = enabled;
                      }
                      if (!!mediaStream2.getVideoTracks()[0]) {
                        var enabled = _this2.stream.videoActive !== void 0 && _this2.stream.videoActive !== null ? _this2.stream.videoActive : !!_this2.stream.outboundStreamOpts.publisherProperties.publishVideo;
                        mediaStream2.getVideoTracks()[0].enabled = enabled;
                      }
                      for (var _i = 0, _c2 = mediaStream2.getAudioTracks(); _i < _c2.length; _i++) {
                        var track = _c2[_i];
                        if (!((_a2 = track.contentHint) === null || _a2 === void 0 ? void 0 : _a2.length)) {
                          track.contentHint = "";
                          logger.info("Audio track Content Hint set: '".concat(track.contentHint, "'"));
                        }
                      }
                      for (var _d = 0, _e = mediaStream2.getVideoTracks(); _d < _e.length; _d++) {
                        var track = _e[_d];
                        if (!((_b2 = track.contentHint) === null || _b2 === void 0 ? void 0 : _b2.length)) {
                          switch (_this2.stream.typeOfVideo) {
                            case TypeOfVideo_1.TypeOfVideo.SCREEN:
                              track.contentHint = "detail";
                              break;
                            case TypeOfVideo_1.TypeOfVideo.CUSTOM:
                              logger.warn("CUSTOM type video track was provided without Content Hint!");
                              track.contentHint = "motion";
                              break;
                            case TypeOfVideo_1.TypeOfVideo.CAMERA:
                            case TypeOfVideo_1.TypeOfVideo.IPCAM:
                            default:
                              track.contentHint = "motion";
                              break;
                          }
                          logger.info("Video track Content Hint set: '".concat(track.contentHint, "'"));
                        }
                      }
                      _this2.initializeVideoReference(mediaStream2);
                      if (!_this2.stream.displayMyRemote()) {
                        _this2.stream.updateMediaStreamInVideos();
                      }
                      delete _this2.firstVideoElement;
                      if (_this2.stream.isSendVideo()) {
                        _this2.getVideoDimensions().then(function(dimensions) {
                          _this2.stream.videoDimensions = {
                            width: dimensions.width,
                            height: dimensions.height
                          };
                          if (_this2.stream.isSendScreen()) {
                            _this2.screenShareResizeInterval = setInterval(function() {
                              var settings = mediaStream2.getVideoTracks()[0].getSettings();
                              var newWidth = settings.width;
                              var newHeight = settings.height;
                              var widthChanged = newWidth != null && newWidth !== _this2.stream.videoDimensions.width;
                              var heightChanged = newHeight != null && newHeight !== _this2.stream.videoDimensions.height;
                              if (_this2.stream.isLocalStreamPublished && (widthChanged || heightChanged)) {
                                _this2.openvidu.sendVideoDimensionsChangedEvent(_this2, "screenResized", _this2.stream.videoDimensions.width, _this2.stream.videoDimensions.height, newWidth || 0, newHeight || 0);
                              }
                            }, 650);
                          }
                          _this2.stream.isLocalStreamReadyToPublish = true;
                          _this2.stream.ee.emitEvent("stream-ready-to-publish", []);
                        });
                      } else {
                        _this2.stream.isLocalStreamReadyToPublish = true;
                        _this2.stream.ee.emitEvent("stream-ready-to-publish", []);
                      }
                      return resolve();
                    };
                    getMediaSuccess = function(mediaStream2, definedAudioConstraint2) {
                      return __awaiter(_this2, void 0, void 0, function() {
                        var audioOnlyStream, error_4;
                        return __generator(this, function(_a2) {
                          switch (_a2.label) {
                            case 0:
                              this.clearPermissionDialogTimer(startTime, timeForDialogEvent);
                              if (!(this.stream.isSendScreen() && this.stream.isSendAudio()))
                                return [3, 5];
                              constraintsAux.audio = definedAudioConstraint2;
                              constraintsAux.video = false;
                              startTime = Date.now();
                              this.setPermissionDialogTimer(timeForDialogEvent);
                              _a2.label = 1;
                            case 1:
                              _a2.trys.push([1, 3, , 4]);
                              return [4, navigator.mediaDevices.getUserMedia(constraintsAux)];
                            case 2:
                              audioOnlyStream = _a2.sent();
                              this.clearPermissionDialogTimer(startTime, timeForDialogEvent);
                              mediaStream2.addTrack(audioOnlyStream.getAudioTracks()[0]);
                              successCallback(mediaStream2);
                              return [3, 4];
                            case 3:
                              error_4 = _a2.sent();
                              this.clearPermissionDialogTimer(startTime, timeForDialogEvent);
                              mediaStream2.getAudioTracks().forEach(function(track) {
                                track.stop();
                              });
                              mediaStream2.getVideoTracks().forEach(function(track) {
                                track.stop();
                              });
                              errorCallback(this.openvidu.generateAudioDeviceError(error_4, constraints));
                              return [
                                2
                                /*return*/
                              ];
                            case 4:
                              return [3, 6];
                            case 5:
                              successCallback(mediaStream2);
                              _a2.label = 6;
                            case 6:
                              return [
                                2
                                /*return*/
                              ];
                          }
                        });
                      });
                    };
                    getMediaError = function(error) {
                      return __awaiter(_this2, void 0, void 0, function() {
                        var errorName, errorMessage, _a2, mediaStream2, error_5, mediaStream2, error_6;
                        return __generator(this, function(_b2) {
                          switch (_b2.label) {
                            case 0:
                              logger.error("getMediaError: ".concat(error.toString()));
                              this.clearPermissionDialogTimer(startTime, timeForDialogEvent);
                              if (error.name === "Error") {
                                error.name = error.constructor.name;
                              }
                              _a2 = error.name.toLowerCase();
                              switch (_a2) {
                                case "notfounderror":
                                  return [3, 1];
                                case "notallowederror":
                                  return [3, 5];
                                case "overconstrainederror":
                                  return [3, 6];
                                case "aborterror":
                                  return [3, 10];
                                case "notreadableerror":
                                  return [3, 10];
                              }
                              return [3, 11];
                            case 1:
                              _b2.trys.push([1, 3, , 4]);
                              return [4, navigator.mediaDevices.getUserMedia({
                                audio: false,
                                video: constraints.video
                              })];
                            case 2:
                              mediaStream2 = _b2.sent();
                              mediaStream2.getVideoTracks().forEach(function(track) {
                                track.stop();
                              });
                              errorName = OpenViduError_1.OpenViduErrorName.INPUT_AUDIO_DEVICE_NOT_FOUND;
                              errorMessage = error.toString();
                              errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                              return [3, 4];
                            case 3:
                              error_5 = _b2.sent();
                              errorName = OpenViduError_1.OpenViduErrorName.INPUT_VIDEO_DEVICE_NOT_FOUND;
                              errorMessage = error_5.toString();
                              errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                              return [3, 4];
                            case 4:
                              return [3, 12];
                            case 5:
                              errorName = this.stream.isSendScreen() ? OpenViduError_1.OpenViduErrorName.SCREEN_CAPTURE_DENIED : OpenViduError_1.OpenViduErrorName.DEVICE_ACCESS_DENIED;
                              errorMessage = error.toString();
                              errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                              return [3, 12];
                            case 6:
                              _b2.trys.push([6, 8, , 9]);
                              return [4, navigator.mediaDevices.getUserMedia({
                                audio: false,
                                video: constraints.video
                              })];
                            case 7:
                              mediaStream2 = _b2.sent();
                              mediaStream2.getVideoTracks().forEach(function(track) {
                                track.stop();
                              });
                              if (error.constraint.toLowerCase() === "deviceid") {
                                errorName = OpenViduError_1.OpenViduErrorName.INPUT_AUDIO_DEVICE_NOT_FOUND;
                                errorMessage = "Audio input device with deviceId '" + constraints.audio.deviceId.exact + "' not found";
                              } else {
                                errorName = OpenViduError_1.OpenViduErrorName.PUBLISHER_PROPERTIES_ERROR;
                                errorMessage = "Audio input device doesn't support the value passed for constraint '" + error.constraint + "'";
                              }
                              errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                              return [3, 9];
                            case 8:
                              error_6 = _b2.sent();
                              if (error_6.constraint.toLowerCase() === "deviceid") {
                                errorName = OpenViduError_1.OpenViduErrorName.INPUT_VIDEO_DEVICE_NOT_FOUND;
                                errorMessage = "Video input device with deviceId '" + constraints.video.deviceId.exact + "' not found";
                              } else {
                                errorName = OpenViduError_1.OpenViduErrorName.PUBLISHER_PROPERTIES_ERROR;
                                errorMessage = "Video input device doesn't support the value passed for constraint '" + error_6.constraint + "'";
                              }
                              errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                              return [3, 9];
                            case 9:
                              return [3, 12];
                            case 10:
                              errorName = OpenViduError_1.OpenViduErrorName.DEVICE_ALREADY_IN_USE;
                              errorMessage = error.toString();
                              errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                              return [3, 12];
                            case 11:
                              errorName = OpenViduError_1.OpenViduErrorName.GENERIC_ERROR;
                              errorMessage = error.toString();
                              errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                              return [3, 12];
                            case 12:
                              return [
                                2
                                /*return*/
                              ];
                          }
                        });
                      });
                    };
                    _c.label = 1;
                  case 1:
                    _c.trys.push([1, 14, , 15]);
                    return [4, this.openvidu.generateMediaConstraints(this.properties)];
                  case 2:
                    myConstraints = _c.sent();
                    if (!(!!myConstraints.videoTrack && !!myConstraints.audioTrack || !!myConstraints.audioTrack && ((_a = myConstraints.constraints) === null || _a === void 0 ? void 0 : _a.video) === false || !!myConstraints.videoTrack && ((_b = myConstraints.constraints) === null || _b === void 0 ? void 0 : _b.audio) === false))
                      return [3, 3];
                    successCallback(this.openvidu.addAlreadyProvidedTracks(myConstraints, new MediaStream(), this.stream));
                    return [3, 13];
                  case 3:
                    constraints = myConstraints.constraints;
                    outboundStreamOptions = {
                      mediaConstraints: constraints,
                      publisherProperties: this.properties
                    };
                    this.stream.setOutboundStreamOptions(outboundStreamOptions);
                    definedAudioConstraint = constraints.audio === void 0 ? true : constraints.audio;
                    constraintsAux.audio = this.stream.isSendScreen() ? false : definedAudioConstraint;
                    constraintsAux.video = constraints.video;
                    startTime = Date.now();
                    this.setPermissionDialogTimer(timeForDialogEvent);
                    _c.label = 4;
                  case 4:
                    _c.trys.push([4, 11, , 13]);
                    if (!(this.stream.isSendScreen() && navigator.mediaDevices["getDisplayMedia"] && !platform.isElectron()))
                      return [3, 7];
                    return [4, navigator.mediaDevices["getDisplayMedia"]({ video: true })];
                  case 5:
                    mediaStream = _c.sent();
                    this.openvidu.addAlreadyProvidedTracks(myConstraints, mediaStream);
                    return [4, getMediaSuccess(mediaStream, definedAudioConstraint)];
                  case 6:
                    _c.sent();
                    return [3, 10];
                  case 7:
                    this.stream.lastVideoTrackConstraints = constraintsAux.video;
                    return [4, navigator.mediaDevices.getUserMedia(constraintsAux)];
                  case 8:
                    mediaStream = _c.sent();
                    this.openvidu.addAlreadyProvidedTracks(myConstraints, mediaStream, this.stream);
                    return [4, getMediaSuccess(mediaStream, definedAudioConstraint)];
                  case 9:
                    _c.sent();
                    _c.label = 10;
                  case 10:
                    return [3, 13];
                  case 11:
                    error_2 = _c.sent();
                    return [4, getMediaError(error_2)];
                  case 12:
                    _c.sent();
                    return [3, 13];
                  case 13:
                    return [3, 15];
                  case 14:
                    error_3 = _c.sent();
                    errorCallback(error_3);
                    return [3, 15];
                  case 15:
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          });
        };
        Publisher2.prototype.replaceTrackAux = function(track, updateLastConstraints) {
          return __awaiter(this, void 0, void 0, function() {
            var trackOriginalEnabledValue, error_7;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  trackOriginalEnabledValue = track.enabled;
                  if (track.kind === "video") {
                    track.enabled = this.stream.videoActive;
                  } else if (track.kind === "audio") {
                    track.enabled = this.stream.audioActive;
                  }
                  _a.label = 1;
                case 1:
                  _a.trys.push([1, 5, , 6]);
                  if (!this.stream.isLocalStreamPublished)
                    return [3, 3];
                  this.replaceTrackInMediaStream(track, updateLastConstraints);
                  return [4, this.replaceTrackInRtcRtpSender(track)];
                case 2:
                  return [2, _a.sent()];
                case 3:
                  return [2, this.replaceTrackInMediaStream(track, updateLastConstraints)];
                case 4:
                  return [3, 6];
                case 5:
                  error_7 = _a.sent();
                  track.enabled = trackOriginalEnabledValue;
                  throw error_7;
                case 6:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        Publisher2.prototype.getVideoDimensions = function() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var requiresDomInsertion = (platform.isIonicIos() || platform.isIOSWithSafari()) && _this.videoReference.readyState < 1;
            var loadedmetadataListener;
            var resolveDimensions = function() {
              var width;
              var height;
              if (typeof _this.stream.getMediaStream().getVideoTracks()[0].getSettings === "function") {
                var settings = _this.stream.getMediaStream().getVideoTracks()[0].getSettings();
                width = settings.width || _this.videoReference.videoWidth;
                height = settings.height || _this.videoReference.videoHeight;
              } else {
                logger.warn("MediaStreamTrack does not have getSettings method on " + platform.getDescription());
                width = _this.videoReference.videoWidth;
                height = _this.videoReference.videoHeight;
              }
              if (loadedmetadataListener != null) {
                _this.videoReference.removeEventListener("loadedmetadata", loadedmetadataListener);
              }
              if (requiresDomInsertion) {
                document.body.removeChild(_this.videoReference);
              }
              return resolve({ width, height });
            };
            if (_this.videoReference.readyState >= 1) {
              resolveDimensions();
            } else {
              loadedmetadataListener = function() {
                if (!_this.videoReference.videoWidth) {
                  var interval_1 = setInterval(function() {
                    if (!!_this.videoReference.videoWidth) {
                      clearInterval(interval_1);
                      resolveDimensions();
                    }
                  }, 40);
                } else {
                  resolveDimensions();
                }
              };
              _this.videoReference.addEventListener("loadedmetadata", loadedmetadataListener);
              if (requiresDomInsertion) {
                document.body.appendChild(_this.videoReference);
              }
            }
          });
        };
        Publisher2.prototype.reestablishStreamPlayingEvent = function() {
          if (this.ee.getListeners("streamPlaying").length > 0) {
            this.addPlayEventToFirstVideo();
          }
        };
        Publisher2.prototype.initializeVideoReference = function(mediaStream) {
          this.videoReference = document.createElement("video");
          this.videoReference.style.display = "none";
          this.videoReference.muted = true;
          this.videoReference.autoplay = true;
          this.videoReference.controls = false;
          if (platform.isSafariBrowser() || platform.isIPhoneOrIPad() && (platform.isChromeMobileBrowser() || platform.isEdgeMobileBrowser() || platform.isOperaMobileBrowser() || platform.isFirefoxMobileBrowser())) {
            this.videoReference.playsInline = true;
          }
          this.stream.setMediaStream(mediaStream);
          if (!!this.firstVideoElement) {
            this.createVideoElement(this.firstVideoElement.targetElement, this.properties.insertMode);
          }
          this.videoReference.srcObject = this.stream.getMediaStream();
        };
        Publisher2.prototype.replaceTrackInMediaStream = function(track, updateLastConstraints) {
          var mediaStream = this.stream.displayMyRemote() ? this.stream.localMediaStreamWhenSubscribedToRemote : this.stream.getMediaStream();
          var removedTrack;
          if (track.kind === "video") {
            removedTrack = mediaStream.getVideoTracks()[0];
            if (updateLastConstraints) {
              this.stream.lastVideoTrackConstraints = track.getConstraints();
            }
          } else {
            removedTrack = mediaStream.getAudioTracks()[0];
          }
          removedTrack.enabled = false;
          removedTrack.stop();
          mediaStream.removeTrack(removedTrack);
          mediaStream.addTrack(track);
          var trackInfo = {
            oldLabel: (removedTrack === null || removedTrack === void 0 ? void 0 : removedTrack.label) || "",
            newLabel: (track === null || track === void 0 ? void 0 : track.label) || ""
          };
          if (track.kind === "video" && updateLastConstraints) {
            this.openvidu.sendNewVideoDimensionsIfRequired(this, "trackReplaced", 50, 30);
            this.openvidu.sendTrackChangedEvent(this, trackInfo.oldLabel, trackInfo.newLabel, "videoTrack");
            if (this.stream.isLocalStreamPublished) {
              this.session.sendVideoData(this.stream.streamManager, 5, true, 5);
            }
          } else if (track.kind === "audio" && updateLastConstraints) {
            this.openvidu.sendTrackChangedEvent(this, trackInfo.oldLabel, trackInfo.newLabel, "audioTrack");
          }
          if (track.kind === "audio") {
            this.stream.disableHarkSpeakingEvent(false);
            this.stream.disableHarkStoppedSpeakingEvent(false);
            this.stream.disableHarkVolumeChangeEvent(false);
            this.stream.initHarkEvents();
          }
        };
        Publisher2.prototype.setPermissionDialogTimer = function(waitTime) {
          var _this = this;
          this.permissionDialogTimeout = setTimeout(function() {
            _this.emitEvent("accessDialogOpened", []);
          }, waitTime);
        };
        Publisher2.prototype.clearPermissionDialogTimer = function(startTime, waitTime) {
          clearTimeout(this.permissionDialogTimeout);
          if (Date.now() - startTime > waitTime) {
            this.emitEvent("accessDialogClosed", []);
          }
        };
        Publisher2.prototype.replaceTrackInRtcRtpSender = function(track) {
          return __awaiter(this, void 0, void 0, function() {
            var senders, sender;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  senders = this.stream.getRTCPeerConnection().getSenders();
                  if (track.kind === "video") {
                    sender = senders.find(function(s) {
                      return !!s.track && s.track.kind === "video";
                    });
                    if (!sender) {
                      throw new Error("There's no replaceable track for that kind of MediaStreamTrack in this Publisher object");
                    }
                  } else if (track.kind === "audio") {
                    sender = senders.find(function(s) {
                      return !!s.track && s.track.kind === "audio";
                    });
                    if (!sender) {
                      throw new Error("There's no replaceable track for that kind of MediaStreamTrack in this Publisher object");
                    }
                  } else {
                    throw new Error("Unknown track kind " + track.kind);
                  }
                  return [4, sender.replaceTrack(track)];
                case 1:
                  _a.sent();
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        return Publisher2;
      }(StreamManager_1.StreamManager)
    );
    exports.Publisher = Publisher;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/ScreenSharing/Screen-Capturing-Auto.js
var require_Screen_Capturing_Auto = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/ScreenSharing/Screen-Capturing-Auto.js"(exports) {
    globalThis.getScreenId = function(firefoxString, callback, custom_parameter) {
      if (navigator.userAgent.indexOf("Edge") !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob)) {
        callback({
          video: true
        });
        return;
      }
      if (!!navigator.mozGetUserMedia) {
        callback(null, "firefox", {
          video: {
            mozMediaSource: firefoxString,
            mediaSource: firefoxString
          }
        });
        return;
      }
      globalThis.addEventListener("message", onIFrameCallback);
      function onIFrameCallback(event) {
        if (!event.data)
          return;
        if (event.data.chromeMediaSourceId) {
          if (event.data.chromeMediaSourceId === "PermissionDeniedError") {
            callback("permission-denied");
          } else {
            callback(null, event.data.chromeMediaSourceId, getScreenConstraints(null, event.data.chromeMediaSourceId, event.data.canRequestAudioTrack));
          }
          globalThis.removeEventListener("message", onIFrameCallback);
        }
        if (event.data.chromeExtensionStatus) {
          callback(event.data.chromeExtensionStatus, null, getScreenConstraints(event.data.chromeExtensionStatus));
          globalThis.removeEventListener("message", onIFrameCallback);
        }
      }
      if (!custom_parameter) {
        setTimeout(postGetSourceIdMessage, 100);
      } else {
        setTimeout(function() {
          postGetSourceIdMessage(custom_parameter);
        }, 100);
      }
    };
    function getScreenConstraints(error, sourceId, canRequestAudioTrack) {
      var screen_constraints = {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: error ? "screen" : "desktop",
            maxWidth: globalThis.screen.width > 1920 ? globalThis.screen.width : 1920,
            maxHeight: globalThis.screen.height > 1080 ? globalThis.screen.height : 1080
          },
          optional: []
        }
      };
      if (!!canRequestAudioTrack) {
        screen_constraints.audio = {
          mandatory: {
            chromeMediaSource: error ? "screen" : "desktop"
          },
          optional: []
        };
      }
      if (sourceId) {
        screen_constraints.video.mandatory.chromeMediaSourceId = sourceId;
        if (screen_constraints.audio && screen_constraints.audio.mandatory) {
          screen_constraints.audio.mandatory.chromeMediaSourceId = sourceId;
        }
      }
      return screen_constraints;
    }
    function postGetSourceIdMessage(custom_parameter) {
      if (!iframe) {
        loadIFrame(function() {
          postGetSourceIdMessage(custom_parameter);
        });
        return;
      }
      if (!iframe.isLoaded) {
        setTimeout(function() {
          postGetSourceIdMessage(custom_parameter);
        }, 100);
        return;
      }
      if (!custom_parameter) {
        iframe.contentWindow.postMessage({
          captureSourceId: true
        }, "*");
      } else if (!!custom_parameter.forEach) {
        iframe.contentWindow.postMessage({
          captureCustomSourceId: custom_parameter
        }, "*");
      } else {
        iframe.contentWindow.postMessage({
          captureSourceIdWithAudio: true
        }, "*");
      }
    }
    var iframe;
    globalThis.getScreenConstraints = function(callback) {
      loadIFrame(function() {
        getScreenId(function(error, sourceId, screen_constraints) {
          if (!screen_constraints) {
            screen_constraints = {
              video: true
            };
          }
          callback(error, screen_constraints.video);
        });
      });
    };
    function loadIFrame(loadCallback) {
      if (iframe) {
        loadCallback();
        return;
      }
      iframe = document.createElement("iframe");
      iframe.onload = function() {
        iframe.isLoaded = true;
        loadCallback();
      };
      iframe.src = "https://openvidu.github.io/openvidu-screen-sharing-chrome-extension/";
      iframe.style.display = "none";
      (document.body || document.documentElement).appendChild(iframe);
    }
    globalThis.getChromeExtensionStatus = function(callback) {
      if (!!navigator.mozGetUserMedia) {
        callback("installed-enabled");
        return;
      }
      globalThis.addEventListener("message", onIFrameCallback);
      function onIFrameCallback(event) {
        if (!event.data)
          return;
        if (event.data.chromeExtensionStatus) {
          callback(event.data.chromeExtensionStatus);
          globalThis.removeEventListener("message", onIFrameCallback);
        }
      }
      setTimeout(postGetChromeExtensionStatusMessage, 100);
    };
    function postGetChromeExtensionStatusMessage() {
      if (!iframe) {
        loadIFrame(postGetChromeExtensionStatusMessage);
        return;
      }
      if (!iframe.isLoaded) {
        setTimeout(postGetChromeExtensionStatusMessage, 100);
        return;
      }
      iframe.contentWindow.postMessage({
        getChromeExtensionStatus: true
      }, "*");
    }
    exports.getScreenId = globalThis.getScreenId;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/ScreenSharing/Screen-Capturing.js
var require_Screen_Capturing = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/ScreenSharing/Screen-Capturing.js"(exports) {
    var chromeMediaSource = "screen";
    var sourceId;
    var screenCallback;
    if (typeof window !== "undefined" && typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined") {
      isFirefox = typeof window.InstallTrigger !== "undefined";
      isOpera = !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
      isChrome = !!window.chrome && !isOpera;
      window.addEventListener("message", function(event) {
        if (event.origin != window.location.origin) {
          return;
        }
        onMessageCallback(event.data);
      });
    }
    var isFirefox;
    var isOpera;
    var isChrome;
    function onMessageCallback(data) {
      if (data == "PermissionDeniedError") {
        if (screenCallback)
          return screenCallback("PermissionDeniedError");
        else
          throw new Error("PermissionDeniedError");
      }
      if (data == "rtcmulticonnection-extension-loaded") {
        chromeMediaSource = "desktop";
      }
      if (data.sourceId && screenCallback) {
        screenCallback(sourceId = data.sourceId, data.canRequestAudioTrack === true);
      }
    }
    function isChromeExtensionAvailable(callback) {
      if (!callback)
        return;
      if (chromeMediaSource == "desktop")
        return callback(true);
      window.postMessage("are-you-there", "*");
      setTimeout(function() {
        if (chromeMediaSource == "screen") {
          callback(false);
        } else
          callback(true);
      }, 2e3);
    }
    function getSourceId(callback) {
      if (!callback)
        throw '"callback" parameter is mandatory.';
      if (sourceId)
        return callback(sourceId);
      screenCallback = callback;
      window.postMessage("get-sourceId", "*");
    }
    function getSourceIdWithAudio(callback) {
      if (!callback)
        throw '"callback" parameter is mandatory.';
      if (sourceId)
        return callback(sourceId);
      screenCallback = callback;
      window.postMessage("audio-plus-tab", "*");
    }
    function getChromeExtensionStatus(extensionid, callback) {
      if (isFirefox)
        return callback("not-chrome");
      if (arguments.length != 2) {
        callback = extensionid;
        extensionid = "lfcgfepafnobdloecchnfaclibenjold";
      }
      var image = document.createElement("img");
      image.src = "chrome-extension://" + extensionid + "/icon.png";
      image.onload = function() {
        chromeMediaSource = "screen";
        window.postMessage("are-you-there", "*");
        setTimeout(function() {
          if (chromeMediaSource == "screen") {
            callback("installed-disabled");
          } else
            callback("installed-enabled");
        }, 2e3);
      };
      image.onerror = function() {
        callback("not-installed");
      };
    }
    function getScreenConstraintsWithAudio(callback) {
      getScreenConstraints(callback, true);
    }
    function getScreenConstraints(callback, captureSourceIdWithAudio) {
      sourceId = "";
      var firefoxScreenConstraints = {
        mozMediaSource: "window",
        mediaSource: "window"
      };
      if (isFirefox)
        return callback(null, firefoxScreenConstraints);
      var screen_constraints = {
        mandatory: {
          chromeMediaSource,
          maxWidth: screen.width > 1920 ? screen.width : 1920,
          maxHeight: screen.height > 1080 ? screen.height : 1080
        },
        optional: []
      };
      if (chromeMediaSource == "desktop" && !sourceId) {
        if (captureSourceIdWithAudio) {
          getSourceIdWithAudio(function(sourceId2, canRequestAudioTrack) {
            screen_constraints.mandatory.chromeMediaSourceId = sourceId2;
            if (canRequestAudioTrack) {
              screen_constraints.canRequestAudioTrack = true;
            }
            callback(sourceId2 == "PermissionDeniedError" ? sourceId2 : null, screen_constraints);
          });
        } else {
          getSourceId(function(sourceId2) {
            screen_constraints.mandatory.chromeMediaSourceId = sourceId2;
            callback(sourceId2 == "PermissionDeniedError" ? sourceId2 : null, screen_constraints);
          });
        }
        return;
      }
      if (chromeMediaSource == "desktop") {
        screen_constraints.mandatory.chromeMediaSourceId = sourceId;
      }
      callback(null, screen_constraints);
    }
    exports.getScreenConstraints = getScreenConstraints;
    exports.getScreenConstraintsWithAudio = getScreenConstraintsWithAudio;
    exports.isChromeExtensionAvailable = isChromeExtensionAvailable;
    exports.getChromeExtensionStatus = getChromeExtensionStatus;
    exports.getSourceId = getSourceId;
  }
});

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;
    module.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/JsonRPC.js
var require_JsonRPC = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/JsonRPC.js"(exports) {
    function pack(message, id) {
      var result = {
        jsonrpc: "2.0"
      };
      if (message.method) {
        result.method = message.method;
        if (message.params)
          result.params = message.params;
        if (id != void 0)
          result.id = id;
      } else if (id != void 0) {
        if (message.error) {
          if (message.result !== void 0)
            throw new TypeError("Both result and error are defined");
          result.error = message.error;
        } else if (message.result !== void 0)
          result.result = message.result;
        else
          throw new TypeError("No result or error is defined");
        result.id = id;
      }
      return JSON.stringify(result);
    }
    function unpack(message) {
      var result = message;
      if (typeof message === "string" || message instanceof String) {
        result = JSON.parse(message);
      }
      var version = result.jsonrpc;
      if (version !== "2.0")
        throw new TypeError("Invalid JsonRPC version '" + version + "': " + message);
      if (result.method == void 0) {
        if (result.id == void 0)
          throw new TypeError("Invalid message: " + message);
        var result_defined = result.result !== void 0;
        var error_defined = result.error !== void 0;
        if (result_defined && error_defined)
          throw new TypeError("Both result and error are defined: " + message);
        if (!result_defined && !error_defined)
          throw new TypeError("No result or error is defined: " + message);
        result.ack = result.id;
        delete result.id;
      }
      return result;
    }
    exports.pack = pack;
    exports.unpack = unpack;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/XmlRPC.js
var require_XmlRPC = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/XmlRPC.js"(exports) {
    function pack(message) {
      throw new TypeError("Not yet implemented");
    }
    function unpack(message) {
      throw new TypeError("Not yet implemented");
    }
    exports.pack = pack;
    exports.unpack = unpack;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/index.js
var require_packers = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/index.js"(exports) {
    var JsonRPC = require_JsonRPC();
    var XmlRPC = require_XmlRPC();
    exports.JsonRPC = JsonRPC;
    exports.XmlRPC = XmlRPC;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/Mapper.js
var require_Mapper = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/Mapper.js"(exports, module) {
    function Mapper() {
      var sources = {};
      this.forEach = function(callback) {
        for (var key in sources) {
          var source = sources[key];
          for (var key2 in source)
            callback(source[key2]);
        }
      };
      this.get = function(id, source) {
        var ids = sources[source];
        if (ids == void 0)
          return void 0;
        return ids[id];
      };
      this.remove = function(id, source) {
        var ids = sources[source];
        if (ids == void 0)
          return;
        delete ids[id];
        for (var i in ids) {
          return false;
        }
        delete sources[source];
      };
      this.set = function(value, id, source) {
        if (value == void 0)
          return this.remove(id, source);
        var ids = sources[source];
        if (ids == void 0)
          sources[source] = ids = {};
        ids[id] = value;
      };
    }
    Mapper.prototype.pop = function(id, source) {
      var value = this.get(id, source);
      if (value == void 0)
        return void 0;
      this.remove(id, source);
      return value;
    };
    module.exports = Mapper;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/transports/webSocketWithReconnection.js
var require_webSocketWithReconnection = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/transports/webSocketWithReconnection.js"(exports, module) {
    "use strict";
    var OpenViduLogger = require_OpenViduLogger().OpenViduLogger;
    var Logger = OpenViduLogger.getInstance();
    var MAX_RETRIES = 2e3;
    var RETRY_TIME_MS = 3e3;
    var CLOSED = 3;
    function WebSocketWithReconnection(config) {
      var closing = false;
      var registerMessageHandler;
      var wsUri = config.uri;
      var reconnecting = false;
      var ws = new WebSocket(wsUri);
      ws.onopen = function() {
        Logger.debug("WebSocket connected to " + wsUri);
        if (config.onconnected) {
          config.onconnected();
        }
      };
      ws.onerror = function(error) {
        Logger.error("Could not connect to " + wsUri + " (invoking onerror if defined)", error);
        if (config.onerror) {
          config.onerror(error);
        }
      };
      var reconnectionOnClose = function() {
        if (ws.readyState === CLOSED) {
          if (closing) {
            Logger.debug("Connection closed by user");
          } else {
            if (config.ismasternodecrashed()) {
              Logger.error("Master Node has crashed. Stopping reconnection process");
            } else {
              Logger.debug("Connection closed unexpectedly. Reconnecting...");
              reconnect(MAX_RETRIES, 1);
            }
          }
        } else {
          Logger.debug("Close callback from previous websocket. Ignoring it");
        }
      };
      ws.onclose = reconnectionOnClose;
      function reconnect(maxRetries, numRetries) {
        Logger.debug("reconnect (attempt #" + numRetries + ", max=" + maxRetries + ")");
        if (numRetries === 1) {
          if (reconnecting) {
            Logger.warn("Trying to reconnect when already reconnecting... Ignoring this reconnection.");
            return;
          } else {
            reconnecting = true;
          }
          if (config.onreconnecting) {
            config.onreconnecting();
          }
        }
        reconnectAux(maxRetries, numRetries);
      }
      function addReconnectionQueryParamsIfMissing(uriString) {
        var searchParams = new URLSearchParams(new URL(uriString).search);
        if (!searchParams.has("reconnect")) {
          uriString = Array.from(searchParams).length > 0 ? uriString + "&reconnect=true" : uriString + "?reconnect=true";
        }
        return uriString;
      }
      function reconnectAux(maxRetries, numRetries) {
        Logger.debug("Reconnection attempt #" + numRetries);
        ws.close(4104, "Connection closed for reconnection");
        wsUri = addReconnectionQueryParamsIfMissing(wsUri);
        ws = new WebSocket(wsUri);
        ws.onopen = function() {
          Logger.debug("Reconnected to " + wsUri + " after " + numRetries + " attempts...");
          reconnecting = false;
          registerMessageHandler();
          if (config.onreconnected()) {
            config.onreconnected();
          }
          ws.onclose = reconnectionOnClose;
        };
        ws.onerror = function(error) {
          Logger.warn("Reconnection error: ", error);
          if (numRetries === maxRetries) {
            if (config.ondisconnect) {
              config.ondisconnect();
            }
          } else {
            setTimeout(function() {
              reconnect(maxRetries, numRetries + 1);
            }, RETRY_TIME_MS);
          }
        };
      }
      this.close = function(code, reason) {
        closing = true;
        ws.close(code, reason);
      };
      this.reconnectWs = function() {
        Logger.debug("reconnectWs");
        reconnect(MAX_RETRIES, 1);
      };
      this.send = function(message) {
        ws.send(message);
      };
      this.addEventListener = function(type, callback) {
        registerMessageHandler = function() {
          ws.addEventListener(type, callback);
        };
        registerMessageHandler();
      };
      this.getReadyState = function() {
        return ws.readyState;
      };
    }
    module.exports = WebSocketWithReconnection;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/jsonrpcclient.js
var require_jsonrpcclient = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/jsonrpcclient.js"(exports, module) {
    var RpcBuilder = require_kurento_jsonrpc();
    var WebSocketWithReconnection = require_webSocketWithReconnection();
    var OpenViduLogger = require_OpenViduLogger().OpenViduLogger;
    Date.now = Date.now || function() {
      return +/* @__PURE__ */ new Date();
    };
    var PING_INTERVAL = 5e3;
    var RECONNECTING = "RECONNECTING";
    var CONNECTED = "CONNECTED";
    var DISCONNECTED = "DISCONNECTED";
    var Logger = OpenViduLogger.getInstance();
    function JsonRpcClient(configuration) {
      var self = this;
      var wsConfig = configuration.ws;
      var notReconnectIfNumLessThan = -1;
      var pingNextNum = 0;
      var enabledPings = true;
      var pingPongStarted = false;
      var pingInterval;
      var status = DISCONNECTED;
      var onreconnecting = wsConfig.onreconnecting;
      var onreconnected = wsConfig.onreconnected;
      var onconnected = wsConfig.onconnected;
      var onerror = wsConfig.onerror;
      configuration.rpc.pull = function(params, request) {
        request.reply(null, "push");
      };
      wsConfig.onreconnecting = function() {
        Logger.debug("--------- ONRECONNECTING -----------");
        if (status === RECONNECTING) {
          Logger.error("Websocket already in RECONNECTING state when receiving a new ONRECONNECTING message. Ignoring it");
          return;
        }
        stopPing();
        status = RECONNECTING;
        if (onreconnecting) {
          onreconnecting();
        }
      };
      wsConfig.onreconnected = function() {
        Logger.debug("--------- ONRECONNECTED -----------");
        if (status === CONNECTED) {
          Logger.error("Websocket already in CONNECTED state when receiving a new ONRECONNECTED message. Ignoring it");
          return;
        }
        status = CONNECTED;
        updateNotReconnectIfLessThan();
        if (onreconnected) {
          onreconnected();
        }
      };
      wsConfig.onconnected = function() {
        Logger.debug("--------- ONCONNECTED -----------");
        if (status === CONNECTED) {
          Logger.error("Websocket already in CONNECTED state when receiving a new ONCONNECTED message. Ignoring it");
          return;
        }
        status = CONNECTED;
        enabledPings = true;
        usePing();
        if (onconnected) {
          onconnected();
        }
      };
      wsConfig.onerror = function(error) {
        Logger.debug("--------- ONERROR -----------");
        status = DISCONNECTED;
        stopPing();
        if (onerror) {
          onerror(error);
        }
      };
      var ws = new WebSocketWithReconnection(wsConfig);
      Logger.debug("Connecting websocket to URI: " + wsConfig.uri);
      var rpcBuilderOptions = {
        request_timeout: configuration.rpc.requestTimeout,
        ping_request_timeout: configuration.rpc.heartbeatRequestTimeout
      };
      var rpc = new RpcBuilder(RpcBuilder.packers.JsonRPC, rpcBuilderOptions, ws, function(request) {
        Logger.debug("Received request: " + JSON.stringify(request));
        try {
          var func = configuration.rpc[request.method];
          if (func === void 0) {
            Logger.error("Method " + request.method + " not registered in client");
          } else {
            func(request.params, request);
          }
        } catch (err) {
          Logger.error("Exception processing request: " + JSON.stringify(request));
          Logger.error(err);
        }
      });
      this.send = function(method, params, callback) {
        var requestTime = Date.now();
        rpc.encode(method, params, function(error, result) {
          if (error) {
            try {
              Logger.error("ERROR:" + error.message + " in Request: method:" + method + " params:" + JSON.stringify(params) + " request:" + error.request);
              if (error.data) {
                Logger.error("ERROR DATA:" + JSON.stringify(error.data));
              }
            } catch (e) {
            }
            error.requestTime = requestTime;
          }
          if (callback) {
            if (result != void 0 && result.value !== "pong") {
              Logger.debug("Response: " + JSON.stringify(result));
            }
            callback(error, result);
          }
        });
      };
      function updateNotReconnectIfLessThan() {
        Logger.debug("notReconnectIfNumLessThan = " + pingNextNum + " (old=" + notReconnectIfNumLessThan + ")");
        notReconnectIfNumLessThan = pingNextNum;
      }
      function sendPing() {
        if (enabledPings) {
          var params = null;
          if (pingNextNum == 0 || pingNextNum == notReconnectIfNumLessThan) {
            params = {
              interval: configuration.heartbeat || PING_INTERVAL
            };
          }
          pingNextNum++;
          self.send("ping", params, function(pingNum) {
            return function(error, result) {
              if (error) {
                Logger.debug("Error in ping request #" + pingNum + " (" + error.message + ")");
                if (pingNum > notReconnectIfNumLessThan) {
                  enabledPings = false;
                  updateNotReconnectIfLessThan();
                  Logger.debug("Server did not respond to ping message #" + pingNum + ". Reconnecting... ");
                  ws.reconnectWs();
                }
              }
            };
          }(pingNextNum));
        } else {
          Logger.debug("Trying to send ping, but ping is not enabled");
        }
      }
      function usePing() {
        if (!pingPongStarted) {
          Logger.debug("Starting ping (if configured)");
          pingPongStarted = true;
          if (configuration.heartbeat != void 0) {
            pingInterval = setInterval(sendPing, configuration.heartbeat);
            sendPing();
          }
        }
      }
      function stopPing() {
        clearInterval(pingInterval);
        pingPongStarted = false;
        enabledPings = false;
        pingNextNum = -1;
        rpc.cancel();
      }
      this.close = function(code, reason) {
        Logger.debug("Closing  with code: " + code + " because: " + reason);
        if (pingInterval != void 0) {
          Logger.debug("Clearing ping interval");
          clearInterval(pingInterval);
        }
        pingPongStarted = false;
        enabledPings = false;
        ws.close(code, reason);
      };
      this.reconnect = function() {
        ws.reconnectWs();
      };
      this.resetPing = function() {
        enabledPings = true;
        pingNextNum = 0;
        usePing();
      };
      this.getReadyState = function() {
        return ws.getReadyState();
      };
    }
    module.exports = JsonRpcClient;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/index.js
var require_clients = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/index.js"(exports) {
    var JsonRpcClient = require_jsonrpcclient();
    exports.JsonRpcClient = JsonRpcClient;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/transports/index.js
var require_transports = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/transports/index.js"(exports) {
    var WebSocketWithReconnection = require_webSocketWithReconnection();
    exports.WebSocketWithReconnection = WebSocketWithReconnection;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/index.js
var require_kurento_jsonrpc = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/index.js"(exports, module) {
    var defineProperty_IE8 = false;
    if (Object.defineProperty) {
      try {
        Object.defineProperty({}, "x", {});
      } catch (e) {
        defineProperty_IE8 = true;
      }
    }
    if (!Function.prototype.bind) {
      Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function() {
        }, fBound = function() {
          return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
      };
    }
    var EventEmitter = require_events().EventEmitter;
    var inherits = require_inherits_browser();
    var packers = require_packers();
    var Mapper = require_Mapper();
    var BASE_TIMEOUT = 5e3;
    function unifyResponseMethods(responseMethods) {
      if (!responseMethods)
        return {};
      for (var key in responseMethods) {
        var value = responseMethods[key];
        if (typeof value == "string")
          responseMethods[key] = {
            response: value
          };
      }
      return responseMethods;
    }
    function unifyTransport(transport) {
      if (!transport)
        return;
      if (transport instanceof Function)
        return {
          send: transport
        };
      if (transport.send instanceof Function)
        return transport;
      if (transport.postMessage instanceof Function) {
        transport.send = transport.postMessage;
        return transport;
      }
      if (transport.write instanceof Function) {
        transport.send = transport.write;
        return transport;
      }
      if (transport.onmessage !== void 0)
        return;
      if (transport.pause instanceof Function)
        return;
      throw new SyntaxError("Transport is not a function nor a valid object");
    }
    function RpcNotification(method, params) {
      if (defineProperty_IE8) {
        this.method = method;
        this.params = params;
      } else {
        Object.defineProperty(this, "method", {
          value: method,
          enumerable: true
        });
        Object.defineProperty(this, "params", {
          value: params,
          enumerable: true
        });
      }
    }
    function RpcBuilder(packer, options, transport, onRequest) {
      var self = this;
      if (!packer)
        throw new SyntaxError("Packer is not defined");
      if (!packer.pack || !packer.unpack)
        throw new SyntaxError("Packer is invalid");
      var responseMethods = unifyResponseMethods(packer.responseMethods);
      if (options instanceof Function) {
        if (transport != void 0)
          throw new SyntaxError("There can't be parameters after onRequest");
        onRequest = options;
        transport = void 0;
        options = void 0;
      }
      if (options && options.send instanceof Function) {
        if (transport && !(transport instanceof Function))
          throw new SyntaxError("Only a function can be after transport");
        onRequest = transport;
        transport = options;
        options = void 0;
      }
      if (transport instanceof Function) {
        if (onRequest != void 0)
          throw new SyntaxError("There can't be parameters after onRequest");
        onRequest = transport;
        transport = void 0;
      }
      if (transport && transport.send instanceof Function) {
        if (onRequest && !(onRequest instanceof Function))
          throw new SyntaxError("Only a function can be after transport");
      }
      options = options || {};
      EventEmitter.call(this);
      if (onRequest)
        this.on("request", onRequest);
      if (defineProperty_IE8)
        this.peerID = options.peerID;
      else
        Object.defineProperty(this, "peerID", {
          value: options.peerID
        });
      var max_retries = options.max_retries || 0;
      function transportMessage(event) {
        self.decode(event.data || event);
      }
      this.getTransport = function() {
        return transport;
      };
      this.setTransport = function(value) {
        if (transport) {
          if (transport.removeEventListener)
            transport.removeEventListener("message", transportMessage);
          else if (transport.removeListener)
            transport.removeListener("data", transportMessage);
        }
        if (value) {
          if (value.addEventListener)
            value.addEventListener("message", transportMessage);
          else if (value.addListener)
            value.addListener("data", transportMessage);
        }
        transport = unifyTransport(value);
      };
      if (!defineProperty_IE8)
        Object.defineProperty(this, "transport", {
          get: this.getTransport.bind(this),
          set: this.setTransport.bind(this)
        });
      this.setTransport(transport);
      var request_timeout = options.request_timeout || BASE_TIMEOUT;
      var ping_request_timeout = options.ping_request_timeout || request_timeout;
      var response_timeout = options.response_timeout || BASE_TIMEOUT;
      var duplicates_timeout = options.duplicates_timeout || BASE_TIMEOUT;
      var requestID = 0;
      var requests = new Mapper();
      var responses = new Mapper();
      var processedResponses = new Mapper();
      var message2Key = {};
      function storeResponse(message, id, dest) {
        var response = {
          message,
          timeout: setTimeout(function() {
            responses.remove(id, dest);
          }, response_timeout)
        };
        responses.set(response, id, dest);
      }
      function storeProcessedResponse(ack, from) {
        var timeout = setTimeout(function() {
          processedResponses.remove(ack, from);
        }, duplicates_timeout);
        processedResponses.set(timeout, ack, from);
      }
      function RpcRequest(method, params, id, from, transport2) {
        RpcNotification.call(this, method, params);
        this.getTransport = function() {
          return transport2;
        };
        this.setTransport = function(value) {
          transport2 = unifyTransport(value);
        };
        if (!defineProperty_IE8)
          Object.defineProperty(this, "transport", {
            get: this.getTransport.bind(this),
            set: this.setTransport.bind(this)
          });
        var response = responses.get(id, from);
        if (!(transport2 || self.getTransport())) {
          if (defineProperty_IE8)
            this.duplicated = Boolean(response);
          else
            Object.defineProperty(this, "duplicated", {
              value: Boolean(response)
            });
        }
        var responseMethod = responseMethods[method];
        this.pack = packer.pack.bind(packer, this, id);
        this.reply = function(error, result, transport3) {
          if (error instanceof Function || error && error.send instanceof Function) {
            if (result != void 0)
              throw new SyntaxError("There can't be parameters after callback");
            transport3 = error;
            result = null;
            error = void 0;
          } else if (result instanceof Function || result && result.send instanceof Function) {
            if (transport3 != void 0)
              throw new SyntaxError("There can't be parameters after callback");
            transport3 = result;
            result = null;
          }
          transport3 = unifyTransport(transport3);
          if (response)
            clearTimeout(response.timeout);
          if (from != void 0) {
            if (error)
              error.dest = from;
            if (result)
              result.dest = from;
          }
          var message;
          if (error || result != void 0) {
            if (self.peerID != void 0) {
              if (error)
                error.from = self.peerID;
              else
                result.from = self.peerID;
            }
            if (responseMethod) {
              if (responseMethod.error == void 0 && error)
                message = {
                  error
                };
              else {
                var method2 = error ? responseMethod.error : responseMethod.response;
                message = {
                  method: method2,
                  params: error || result
                };
              }
            } else
              message = {
                error,
                result
              };
            message = packer.pack(message, id);
          } else if (response)
            message = response.message;
          else
            message = packer.pack({
              result: null
            }, id);
          storeResponse(message, id, from);
          transport3 = transport3 || this.getTransport() || self.getTransport();
          if (transport3)
            return transport3.send(message);
          return message;
        };
      }
      inherits(RpcRequest, RpcNotification);
      function cancel(message) {
        var key = message2Key[message];
        if (!key)
          return;
        delete message2Key[message];
        var request = requests.pop(key.id, key.dest);
        if (!request)
          return;
        clearTimeout(request.timeout);
        storeProcessedResponse(key.id, key.dest);
      }
      this.cancel = function(message) {
        if (message)
          return cancel(message);
        for (var message in message2Key)
          cancel(message);
      };
      this.close = function() {
        var transport2 = this.getTransport();
        if (transport2 && transport2.close)
          transport2.close(4003, "Cancel request");
        this.cancel();
        processedResponses.forEach(clearTimeout);
        responses.forEach(function(response) {
          clearTimeout(response.timeout);
        });
      };
      this.encode = function(method, params, dest, transport2, callback) {
        if (params instanceof Function) {
          if (dest != void 0)
            throw new SyntaxError("There can't be parameters after callback");
          callback = params;
          transport2 = void 0;
          dest = void 0;
          params = void 0;
        } else if (dest instanceof Function) {
          if (transport2 != void 0)
            throw new SyntaxError("There can't be parameters after callback");
          callback = dest;
          transport2 = void 0;
          dest = void 0;
        } else if (transport2 instanceof Function) {
          if (callback != void 0)
            throw new SyntaxError("There can't be parameters after callback");
          callback = transport2;
          transport2 = void 0;
        }
        if (self.peerID != void 0) {
          params = params || {};
          params.from = self.peerID;
        }
        if (dest != void 0) {
          params = params || {};
          params.dest = dest;
        }
        var message = {
          method,
          params
        };
        if (callback) {
          let dispatchCallback2 = function(error, result) {
            self.cancel(message);
            callback(error, result);
          }, sendRequest2 = function(transport3) {
            var rt = method === "ping" ? ping_request_timeout : request_timeout;
            request.timeout = setTimeout(timeout2, rt * Math.pow(2, retried++));
            message2Key[message] = {
              id,
              dest
            };
            requests.set(request, id, dest);
            transport3 = transport3 || encode_transport || self.getTransport();
            if (transport3)
              return transport3.send(message);
            return message;
          }, retry2 = function(transport3) {
            transport3 = unifyTransport(transport3);
            console.warn(retried + " retry for request message:", message);
            var timeout3 = processedResponses.pop(id, dest);
            clearTimeout(timeout3);
            return sendRequest2(transport3);
          }, timeout2 = function() {
            if (retried < max_retries)
              return retry2(transport2);
            var error = new Error("Request has timed out");
            error.request = message;
            error.retry = retry2;
            dispatchCallback2(error);
          };
          var dispatchCallback = dispatchCallback2, sendRequest = sendRequest2, retry = retry2, timeout = timeout2;
          var id = requestID++;
          var retried = 0;
          message = packer.pack(message, id);
          var request = {
            message,
            callback: dispatchCallback2,
            responseMethods: responseMethods[method] || {}
          };
          var encode_transport = unifyTransport(transport2);
          return sendRequest2(transport2);
        }
        message = packer.pack(message);
        transport2 = transport2 || this.getTransport();
        if (transport2)
          return transport2.send(message);
        return message;
      };
      this.decode = function(message, transport2) {
        if (!message)
          throw new TypeError("Message is not defined");
        try {
          message = packer.unpack(message);
        } catch (e) {
          return console.debug(e, message);
        }
        var id = message.id;
        var ack = message.ack;
        var method = message.method;
        var params = message.params || {};
        var from = params.from;
        var dest = params.dest;
        if (self.peerID != void 0 && from == self.peerID)
          return;
        if (id == void 0 && ack == void 0) {
          var notification = new RpcNotification(method, params);
          if (self.emit("request", notification))
            return;
          return notification;
        }
        function processRequest() {
          transport2 = unifyTransport(transport2) || self.getTransport();
          if (transport2) {
            var response = responses.get(id, from);
            if (response)
              return transport2.send(response.message);
          }
          var idAck = id != void 0 ? id : ack;
          var request2 = new RpcRequest(method, params, idAck, from, transport2);
          if (self.emit("request", request2))
            return;
          return request2;
        }
        function processResponse(request2, error2, result2) {
          request2.callback(error2, result2);
        }
        function duplicatedResponse(timeout) {
          console.warn("Response already processed", message);
          clearTimeout(timeout);
          storeProcessedResponse(ack, from);
        }
        if (method) {
          if (dest == void 0 || dest == self.peerID) {
            var request = requests.get(ack, from);
            if (request) {
              var responseMethods2 = request.responseMethods;
              if (method == responseMethods2.error)
                return processResponse(request, params);
              if (method == responseMethods2.response)
                return processResponse(request, null, params);
              return processRequest();
            }
            var processed = processedResponses.get(ack, from);
            if (processed)
              return duplicatedResponse(processed);
          }
          return processRequest();
        }
        var error = message.error;
        var result = message.result;
        if (error && error.dest && error.dest != self.peerID)
          return;
        if (result && result.dest && result.dest != self.peerID)
          return;
        var request = requests.get(ack, from);
        if (!request) {
          var processed = processedResponses.get(ack, from);
          if (processed)
            return duplicatedResponse(processed);
          return console.warn("No callback was defined for this message", message);
        }
        processResponse(request, error, result);
      };
    }
    inherits(RpcBuilder, EventEmitter);
    RpcBuilder.RpcNotification = RpcNotification;
    module.exports = RpcBuilder;
    var clients = require_clients();
    var transports = require_transports();
    RpcBuilder.clients = clients;
    RpcBuilder.clients.transports = transports;
    RpcBuilder.packers = packers;
  }
});

// node_modules/openvidu-browser/package.json
var require_package = __commonJS({
  "node_modules/openvidu-browser/package.json"(exports, module) {
    module.exports = {
      author: "OpenVidu",
      dependencies: {
        freeice: "2.2.2",
        hark: "1.2.3",
        jsnlog: "2.30.0",
        mime: "3.0.0",
        platform: "1.3.6",
        semver: "7.3.8",
        uuid: "9.0.0",
        "wolfy87-eventemitter": "5.2.9",
        events: "3.3.0",
        inherits: "2.0.4"
      },
      description: "OpenVidu Browser",
      devDependencies: {
        "@types/node": "18.11.9",
        "@types/platform": "1.3.4",
        browserify: "17.0.0",
        grunt: "1.5.3",
        "grunt-cli": "1.4.3",
        "grunt-contrib-copy": "1.0.0",
        "grunt-contrib-sass": "2.0.0",
        "grunt-contrib-uglify": "5.2.2",
        "grunt-contrib-watch": "1.1.0",
        "grunt-postcss": "0.9.0",
        "grunt-string-replace": "1.3.3",
        "grunt-ts": "6.0.0-beta.22",
        terser: "5.15.1",
        tsify: "5.0.4",
        tslint: "6.1.3",
        typedoc: "0.23.21",
        typescript: "4.9.3"
      },
      license: "Apache-2.0",
      main: "lib/index.js",
      name: "openvidu-browser",
      repository: {
        type: "git",
        url: "git://github.com/OpenVidu/openvidu"
      },
      scripts: {
        browserify: "VERSION=${VERSION:-dev}; mkdir -p static/js/ && cd src && ../node_modules/browserify/bin/cmd.js Main.ts -p [ tsify ] --exclude kurento-browser-extensions --debug -o ../static/js/openvidu-browser-$VERSION.js -v",
        "browserify-prod": "VERSION=${VERSION:-dev}; mkdir -p static/js/ && cd src && ../node_modules/browserify/bin/cmd.js --debug Main.ts -p [ tsify ] --exclude kurento-browser-extensions | ../node_modules/terser/bin/terser --source-map content=inline --output ../static/js/openvidu-browser-$VERSION.min.js",
        build: "cd src/OpenVidu && ./../../node_modules/typescript/bin/tsc && cd ../.. && ./node_modules/typescript/bin/tsc --declaration src/index.ts --outDir ./lib --sourceMap --target es5 --lib dom,es5,es2015.promise,scripthost && rm -rf ./ts4.4 && mkdir -p ./ts4.4/lib && cp -r ./lib ./ts4.4 && find ./ts4.4/lib -type f ! -iname '*.d.ts' -delete && ./config/replace_for_ts44.sh",
        docs: "./generate-docs.sh"
      },
      types: "lib/index.d.ts",
      typesVersions: {
        "<4.4": {
          "*": [
            "ts4.4/*"
          ]
        }
      },
      version: "2.28.0"
    };
  }
});

// node_modules/openvidu-browser/lib/OpenVidu/OpenVidu.js
var require_OpenVidu = __commonJS({
  "node_modules/openvidu-browser/lib/OpenVidu/OpenVidu.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OpenVidu = void 0;
    var LocalRecorder_1 = require_LocalRecorder();
    var Publisher_1 = require_Publisher();
    var Session_1 = require_Session();
    var SessionDisconnectedEvent_1 = require_SessionDisconnectedEvent();
    var StreamPropertyChangedEvent_1 = require_StreamPropertyChangedEvent();
    var OpenViduError_1 = require_OpenViduError();
    var VideoInsertMode_1 = require_VideoInsertMode();
    var OpenViduLogger_1 = require_OpenViduLogger();
    var Platform_1 = require_Platform();
    var screenSharingAuto = require_Screen_Capturing_Auto();
    var screenSharing = require_Screen_Capturing();
    var OpenViduLoggerConfiguration_1 = require_OpenViduLoggerConfiguration();
    var EventEmitter = require_EventEmitter();
    var RpcBuilder = require_kurento_jsonrpc();
    var packageJson = require_package();
    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    var platform;
    var OpenVidu = (
      /** @class */
      function() {
        function OpenVidu2() {
          var _this = this;
          this.masterNodeHasCrashed = false;
          this.publishers = [];
          this.secret = "";
          this.recorder = false;
          this.stt = false;
          this.life = -1;
          this.advancedConfiguration = {};
          this.webrtcStatsInterval = -1;
          this.sendBrowserLogs = OpenViduLoggerConfiguration_1.OpenViduLoggerConfiguration.disabled;
          this.isAtLeastPro = false;
          this.isEnterprise = false;
          this.ee = new EventEmitter();
          platform = Platform_1.PlatformUtils.getInstance();
          this.libraryVersion = packageJson.version;
          logger.info("OpenVidu initialized");
          logger.info("Platform detected: " + platform.getDescription());
          logger.info("openvidu-browser version: " + this.libraryVersion);
          if (platform.isMobileDevice() || platform.isReactNative()) {
            this.onOrientationChanged(function() {
              _this.publishers.forEach(function(publisher) {
                if (publisher.stream.isLocalStreamPublished && !!publisher.stream && !!publisher.stream.hasVideo) {
                  _this.sendNewVideoDimensionsIfRequired(publisher, "deviceRotated", 75, 10);
                }
              });
            });
          }
        }
        OpenVidu2.prototype.initSession = function() {
          this.session = new Session_1.Session(this);
          return this.session;
        };
        OpenVidu2.prototype.initPublisher = function(targetElement, param2, param3) {
          var properties;
          if (!!param2 && typeof param2 !== "function") {
            properties = param2;
            properties = {
              audioSource: typeof properties.audioSource !== "undefined" ? properties.audioSource : void 0,
              frameRate: typeof MediaStreamTrack !== "undefined" && properties.videoSource instanceof MediaStreamTrack ? void 0 : typeof properties.frameRate !== "undefined" ? properties.frameRate : void 0,
              insertMode: typeof properties.insertMode !== "undefined" ? typeof properties.insertMode === "string" ? VideoInsertMode_1.VideoInsertMode[properties.insertMode] : properties.insertMode : VideoInsertMode_1.VideoInsertMode.APPEND,
              mirror: typeof properties.mirror !== "undefined" ? properties.mirror : true,
              publishAudio: typeof properties.publishAudio !== "undefined" ? properties.publishAudio : true,
              publishVideo: typeof properties.publishVideo !== "undefined" ? properties.publishVideo : true,
              resolution: typeof MediaStreamTrack !== "undefined" && properties.videoSource instanceof MediaStreamTrack ? void 0 : typeof properties.resolution !== "undefined" ? properties.resolution : "640x480",
              videoSource: typeof properties.videoSource !== "undefined" ? properties.videoSource : void 0,
              videoSimulcast: properties.videoSimulcast,
              filter: properties.filter
            };
          } else {
            properties = {
              insertMode: VideoInsertMode_1.VideoInsertMode.APPEND,
              mirror: true,
              publishAudio: true,
              publishVideo: true,
              resolution: "640x480"
            };
          }
          var publisher = new Publisher_1.Publisher(targetElement, properties, this);
          var completionHandler;
          if (!!param2 && typeof param2 === "function") {
            completionHandler = param2;
          } else if (!!param3) {
            completionHandler = param3;
          }
          publisher.initialize().then(function() {
            if (completionHandler !== void 0) {
              completionHandler(void 0);
            }
            publisher.emitEvent("accessAllowed", []);
          }).catch(function(error) {
            if (completionHandler !== void 0) {
              completionHandler(error);
            }
            publisher.emitEvent("accessDenied", [error]);
          });
          this.publishers.push(publisher);
          return publisher;
        };
        OpenVidu2.prototype.initPublisherAsync = function(targetElement, properties) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var publisher;
            var callback = function(error) {
              if (!!error) {
                return reject(error);
              } else {
                return resolve(publisher);
              }
            };
            if (!!properties) {
              publisher = _this.initPublisher(targetElement, properties, callback);
            } else {
              publisher = _this.initPublisher(targetElement, callback);
            }
          });
        };
        OpenVidu2.prototype.initLocalRecorder = function(stream) {
          return new LocalRecorder_1.LocalRecorder(stream);
        };
        OpenVidu2.prototype.checkSystemRequirements = function() {
          if (platform.isIPhoneOrIPad()) {
            return platform.isIOSWithSafari() || platform.isChromeMobileBrowser() || platform.isFirefoxMobileBrowser() || platform.isOperaMobileBrowser() || platform.isEdgeMobileBrowser() || platform.isIonicIos();
          }
          return platform.isChromeBrowser() || platform.isChromeMobileBrowser() || platform.isFirefoxBrowser() || platform.isFirefoxMobileBrowser() || platform.isOperaBrowser() || platform.isOperaMobileBrowser() || platform.isEdgeBrowser() || platform.isEdgeMobileBrowser() || platform.isSamsungBrowser() || platform.isSafariBrowser() || platform.isAndroidBrowser() || // Android WebView & Ionic apps for Android
          platform.isElectron() || platform.isNodeJs() || // TODO: remove when updating platform detection library
          platform.isMotorolaEdgeDevice();
        };
        OpenVidu2.prototype.checkScreenSharingCapabilities = function() {
          return platform.canScreenShare();
        };
        OpenVidu2.prototype.getDevices = function() {
          return new Promise(function(resolve, reject) {
            navigator.mediaDevices.enumerateDevices().then(function(deviceInfos) {
              var _a;
              var devices = [];
              if (platform.isIonicAndroid() && typeof cordova != "undefined" && ((_a = cordova === null || cordova === void 0 ? void 0 : cordova.plugins) === null || _a === void 0 ? void 0 : _a.EnumerateDevicesPlugin)) {
                cordova.plugins.EnumerateDevicesPlugin.getEnumerateDevices().then(function(pluginDevices) {
                  var pluginAudioDevices = [];
                  var videoDevices = [];
                  var audioDevices = [];
                  pluginAudioDevices = pluginDevices.filter(function(device) {
                    return device.kind === "audioinput";
                  });
                  videoDevices = deviceInfos.filter(function(device) {
                    return device.kind === "videoinput";
                  });
                  audioDevices = deviceInfos.filter(function(device) {
                    return device.kind === "audioinput";
                  });
                  videoDevices.forEach(function(deviceInfo, index) {
                    if (!deviceInfo.label) {
                      var label = "";
                      if (index === 0) {
                        label = "Front Camera";
                      } else if (index === 1) {
                        label = "Back Camera";
                      } else {
                        label = "Unknown Camera";
                      }
                      devices.push({
                        kind: deviceInfo.kind,
                        deviceId: deviceInfo.deviceId,
                        label
                      });
                    } else {
                      devices.push({
                        kind: deviceInfo.kind,
                        deviceId: deviceInfo.deviceId,
                        label: deviceInfo.label
                      });
                    }
                  });
                  audioDevices.forEach(function(deviceInfo, index) {
                    if (!deviceInfo.label) {
                      var label = "";
                      switch (index) {
                        case 0:
                          label = "Default";
                          break;
                        case 1:
                          var defaultMatch = pluginAudioDevices.filter(function(d) {
                            return d.label.includes("Built");
                          })[0];
                          label = defaultMatch ? defaultMatch.label : "Built-in Microphone";
                          break;
                        case 2:
                          var wiredMatch = pluginAudioDevices.filter(function(d) {
                            return d.label.includes("Wired");
                          })[0];
                          if (wiredMatch) {
                            label = wiredMatch.label;
                          } else {
                            label = "Headset earpiece";
                          }
                          break;
                        case 3:
                          var wirelessMatch = pluginAudioDevices.filter(function(d) {
                            return d.label.includes("Bluetooth");
                          })[0];
                          label = wirelessMatch ? wirelessMatch.label : "Wireless";
                          break;
                        default:
                          label = "Unknown Microphone";
                          break;
                      }
                      devices.push({
                        kind: deviceInfo.kind,
                        deviceId: deviceInfo.deviceId,
                        label
                      });
                    } else {
                      devices.push({
                        kind: deviceInfo.kind,
                        deviceId: deviceInfo.deviceId,
                        label: deviceInfo.label
                      });
                    }
                  });
                  return resolve(devices);
                });
              } else {
                deviceInfos.forEach(function(deviceInfo) {
                  if (deviceInfo.kind === "audioinput" || deviceInfo.kind === "videoinput") {
                    devices.push({
                      kind: deviceInfo.kind,
                      deviceId: deviceInfo.deviceId,
                      label: deviceInfo.label
                    });
                  }
                });
                return resolve(devices);
              }
            }).catch(function(error) {
              logger.error("Error getting devices", error);
              return reject(error);
            });
          });
        };
        OpenVidu2.prototype.getUserMedia = function(options) {
          var _a, _b;
          return __awaiter(this, void 0, void 0, function() {
            var askForAudioStreamOnly, myConstraints, mustAskForAudioTrackLater, mediaStream, error_1, errorName, errorMessage, constraintsAux, mediaStream, error_2, errorName, errorMessage, error_3;
            var _this = this;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  askForAudioStreamOnly = function(previousMediaStream, constraints) {
                    return __awaiter(_this, void 0, void 0, function() {
                      var definedAudioConstraint, constraintsAux2, audioOnlyStream, error_4;
                      return __generator(this, function(_a2) {
                        switch (_a2.label) {
                          case 0:
                            definedAudioConstraint = constraints.audio === void 0 ? true : constraints.audio;
                            constraintsAux2 = { audio: definedAudioConstraint, video: false };
                            _a2.label = 1;
                          case 1:
                            _a2.trys.push([1, 3, , 4]);
                            return [4, navigator.mediaDevices.getUserMedia(constraintsAux2)];
                          case 2:
                            audioOnlyStream = _a2.sent();
                            previousMediaStream.addTrack(audioOnlyStream.getAudioTracks()[0]);
                            return [2, previousMediaStream];
                          case 3:
                            error_4 = _a2.sent();
                            previousMediaStream.getAudioTracks().forEach(function(track) {
                              track.stop();
                            });
                            previousMediaStream.getVideoTracks().forEach(function(track) {
                              track.stop();
                            });
                            throw this.generateAudioDeviceError(error_4, constraintsAux2);
                          case 4:
                            return [
                              2
                              /*return*/
                            ];
                        }
                      });
                    });
                  };
                  _c.label = 1;
                case 1:
                  _c.trys.push([1, 20, , 21]);
                  return [4, this.generateMediaConstraints(options)];
                case 2:
                  myConstraints = _c.sent();
                  if (!(!!myConstraints.videoTrack && !!myConstraints.audioTrack || !!myConstraints.audioTrack && ((_a = myConstraints.constraints) === null || _a === void 0 ? void 0 : _a.video) === false || !!myConstraints.videoTrack && ((_b = myConstraints.constraints) === null || _b === void 0 ? void 0 : _b.audio) === false))
                    return [3, 3];
                  return [2, this.addAlreadyProvidedTracks(myConstraints, new MediaStream())];
                case 3:
                  if (!!myConstraints.videoTrack) {
                    delete myConstraints.constraints.video;
                  }
                  if (!!myConstraints.audioTrack) {
                    delete myConstraints.constraints.audio;
                  }
                  mustAskForAudioTrackLater = false;
                  if (!(typeof options.videoSource === "string"))
                    return [3, 12];
                  if (!(options.videoSource === "screen" || options.videoSource === "window" || platform.isElectron() && options.videoSource.startsWith("screen:")))
                    return [3, 12];
                  mustAskForAudioTrackLater = !myConstraints.audioTrack && options.audioSource !== null && options.audioSource !== false;
                  if (!(navigator.mediaDevices["getDisplayMedia"] && !platform.isElectron()))
                    return [3, 11];
                  _c.label = 4;
                case 4:
                  _c.trys.push([4, 9, , 10]);
                  return [4, navigator.mediaDevices["getDisplayMedia"]({ video: true })];
                case 5:
                  mediaStream = _c.sent();
                  this.addAlreadyProvidedTracks(myConstraints, mediaStream);
                  if (!mustAskForAudioTrackLater)
                    return [3, 7];
                  return [4, askForAudioStreamOnly(mediaStream, myConstraints.constraints)];
                case 6:
                  return [2, _c.sent()];
                case 7:
                  return [2, mediaStream];
                case 8:
                  return [3, 10];
                case 9:
                  error_1 = _c.sent();
                  errorName = OpenViduError_1.OpenViduErrorName.SCREEN_CAPTURE_DENIED;
                  errorMessage = error_1.toString();
                  throw new OpenViduError_1.OpenViduError(errorName, errorMessage);
                case 10:
                  return [3, 11];
                case 11:
                  return [3, 12];
                case 12:
                  constraintsAux = mustAskForAudioTrackLater ? { video: myConstraints.constraints.video } : myConstraints.constraints;
                  _c.label = 13;
                case 13:
                  _c.trys.push([13, 18, , 19]);
                  return [4, navigator.mediaDevices.getUserMedia(constraintsAux)];
                case 14:
                  mediaStream = _c.sent();
                  this.addAlreadyProvidedTracks(myConstraints, mediaStream);
                  if (!mustAskForAudioTrackLater)
                    return [3, 16];
                  return [4, askForAudioStreamOnly(mediaStream, myConstraints.constraints)];
                case 15:
                  return [2, _c.sent()];
                case 16:
                  return [2, mediaStream];
                case 17:
                  return [3, 19];
                case 18:
                  error_2 = _c.sent();
                  errorName = void 0;
                  errorMessage = error_2.toString();
                  if (!(options.videoSource === "screen")) {
                    errorName = OpenViduError_1.OpenViduErrorName.DEVICE_ACCESS_DENIED;
                  } else {
                    errorName = OpenViduError_1.OpenViduErrorName.SCREEN_CAPTURE_DENIED;
                  }
                  throw new OpenViduError_1.OpenViduError(errorName, errorMessage);
                case 19:
                  return [3, 21];
                case 20:
                  error_3 = _c.sent();
                  throw error_3;
                case 21:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        OpenVidu2.prototype.enableProdMode = function() {
          logger.enableProdMode();
        };
        OpenVidu2.prototype.setAdvancedConfiguration = function(configuration) {
          this.advancedConfiguration = configuration;
        };
        OpenVidu2.prototype.onOrientationChanged = function(handler) {
          globalThis.addEventListener("orientationchange", handler);
        };
        OpenVidu2.prototype.sendNewVideoDimensionsIfRequired = function(publisher, reason, WAIT_INTERVAL, MAX_ATTEMPTS) {
          var _this = this;
          var _a, _b, _c, _d;
          var attempts = 0;
          var oldWidth = ((_b = (_a = publisher === null || publisher === void 0 ? void 0 : publisher.stream) === null || _a === void 0 ? void 0 : _a.videoDimensions) === null || _b === void 0 ? void 0 : _b.width) || 0;
          var oldHeight = ((_d = (_c = publisher === null || publisher === void 0 ? void 0 : publisher.stream) === null || _c === void 0 ? void 0 : _c.videoDimensions) === null || _d === void 0 ? void 0 : _d.height) || 0;
          var repeatUntilChangeOrMaxAttempts = setInterval(function() {
            attempts++;
            if (attempts > MAX_ATTEMPTS) {
              clearTimeout(repeatUntilChangeOrMaxAttempts);
            }
            publisher.getVideoDimensions().then(function(newDimensions) {
              if (newDimensions.width !== oldWidth || newDimensions.height !== oldHeight) {
                clearTimeout(repeatUntilChangeOrMaxAttempts);
                _this.sendVideoDimensionsChangedEvent(publisher, reason, oldWidth, oldHeight, newDimensions.width, newDimensions.height);
              }
            });
          }, WAIT_INTERVAL);
        };
        OpenVidu2.prototype.sendVideoDimensionsChangedEvent = function(publisher, reason, oldWidth, oldHeight, newWidth, newHeight) {
          var _this = this;
          publisher.stream.videoDimensions = {
            width: newWidth || 0,
            height: newHeight || 0
          };
          this.sendRequest("streamPropertyChanged", {
            streamId: publisher.stream.streamId,
            property: "videoDimensions",
            newValue: JSON.stringify(publisher.stream.videoDimensions),
            reason
          }, function(error, response) {
            if (error) {
              logger.error("Error sending 'streamPropertyChanged' event", error);
            } else {
              _this.session.emitEvent("streamPropertyChanged", [
                new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.session, publisher.stream, "videoDimensions", publisher.stream.videoDimensions, { width: oldWidth, height: oldHeight }, reason)
              ]);
              publisher.emitEvent("streamPropertyChanged", [
                new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(publisher, publisher.stream, "videoDimensions", publisher.stream.videoDimensions, { width: oldWidth, height: oldHeight }, reason)
              ]);
              _this.session.sendVideoData(publisher);
            }
          });
        };
        OpenVidu2.prototype.sendTrackChangedEvent = function(publisher, oldLabel, newLabel, propertyType) {
          var _this = this;
          var oldValue = { label: oldLabel };
          var newValue = { label: newLabel };
          var reason = "trackReplaced";
          if (publisher.stream.isLocalStreamPublished) {
            this.sendRequest("streamPropertyChanged", {
              streamId: publisher.stream.streamId,
              property: propertyType,
              newValue,
              reason
            }, function(error, response) {
              if (error) {
                logger.error("Error sending 'streamPropertyChanged' event", error);
              } else {
                _this.session.emitEvent("streamPropertyChanged", [
                  new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.session, publisher.stream, propertyType, newValue, oldValue, reason)
                ]);
                publisher.emitEvent("streamPropertyChanged", [
                  new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(publisher, publisher.stream, propertyType, newValue, oldValue, reason)
                ]);
              }
            });
          } else {
            this.session.emitEvent("streamPropertyChanged", [
              new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(this.session, publisher.stream, propertyType, newValue, oldValue, reason)
            ]);
            publisher.emitEvent("streamPropertyChanged", [
              new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(publisher, publisher.stream, propertyType, newValue, oldValue, reason)
            ]);
          }
        };
        OpenVidu2.prototype.generateMediaConstraints = function(publisherProperties) {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var myConstraints = {
              audioTrack: void 0,
              videoTrack: void 0,
              constraints: {
                audio: void 0,
                video: void 0
              }
            };
            var audioSource = publisherProperties.audioSource;
            var videoSource = publisherProperties.videoSource;
            if (audioSource === null || audioSource === false) {
              myConstraints.constraints.audio = false;
            }
            if (videoSource === null || videoSource === false) {
              myConstraints.constraints.video = false;
            }
            if (myConstraints.constraints.audio === false && myConstraints.constraints.video === false) {
              return reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.NO_INPUT_SOURCE_SET, "Properties 'audioSource' and 'videoSource' cannot be set to false or null at the same time"));
            }
            if (typeof MediaStreamTrack !== "undefined" && audioSource instanceof MediaStreamTrack) {
              myConstraints.audioTrack = audioSource;
            }
            if (typeof MediaStreamTrack !== "undefined" && videoSource instanceof MediaStreamTrack) {
              myConstraints.videoTrack = videoSource;
            }
            if (audioSource === void 0) {
              myConstraints.constraints.audio = true;
            }
            if (videoSource === void 0) {
              myConstraints.constraints.video = {
                width: {
                  ideal: 640
                },
                height: {
                  ideal: 480
                }
              };
            }
            if (videoSource !== null && videoSource !== false) {
              if (!!publisherProperties.resolution) {
                var widthAndHeight = publisherProperties.resolution.toLowerCase().split("x");
                var idealWidth = Number(widthAndHeight[0]);
                var idealHeight = Number(widthAndHeight[1]);
                myConstraints.constraints.video = {
                  width: {
                    ideal: idealWidth
                  },
                  height: {
                    ideal: idealHeight
                  }
                };
              }
              if (!!publisherProperties.frameRate) {
                myConstraints.constraints.video.frameRate = { ideal: publisherProperties.frameRate };
              }
            }
            _this.configureDeviceIdOrScreensharing(myConstraints, publisherProperties, resolve, reject);
            return resolve(myConstraints);
          });
        };
        OpenVidu2.prototype.startWs = function(onConnectSucces) {
          var config = {
            heartbeat: 5e3,
            ws: {
              uri: this.wsUri + "?sessionId=" + this.session.sessionId,
              onconnected: onConnectSucces,
              ondisconnect: this.disconnectCallback.bind(this),
              onreconnecting: this.reconnectingCallback.bind(this),
              onreconnected: this.reconnectedCallback.bind(this),
              ismasternodecrashed: this.isMasterNodeCrashed.bind(this)
            },
            rpc: {
              requestTimeout: 1e4,
              heartbeatRequestTimeout: 5e3,
              participantJoined: this.session.onParticipantJoined.bind(this.session),
              participantPublished: this.session.onParticipantPublished.bind(this.session),
              participantUnpublished: this.session.onParticipantUnpublished.bind(this.session),
              participantLeft: this.session.onParticipantLeft.bind(this.session),
              participantEvicted: this.session.onParticipantEvicted.bind(this.session),
              recordingStarted: this.session.onRecordingStarted.bind(this.session),
              recordingStopped: this.session.onRecordingStopped.bind(this.session),
              broadcastStarted: this.session.onBroadcastStarted.bind(this.session),
              broadcastStopped: this.session.onBroadcastStopped.bind(this.session),
              sendMessage: this.session.onNewMessage.bind(this.session),
              streamPropertyChanged: this.session.onStreamPropertyChanged.bind(this.session),
              connectionPropertyChanged: this.session.onConnectionPropertyChanged.bind(this.session),
              networkQualityLevelChanged: this.session.onNetworkQualityLevelChangedChanged.bind(this.session),
              filterEventDispatched: this.session.onFilterEventDispatched.bind(this.session),
              iceCandidate: this.session.recvIceCandidate.bind(this.session),
              mediaError: this.session.onMediaError.bind(this.session),
              masterNodeCrashedNotification: this.onMasterNodeCrashedNotification.bind(this),
              forciblyReconnectSubscriber: this.session.onForciblyReconnectSubscriber.bind(this.session),
              speechToTextMessage: this.session.onSpeechToTextMessage.bind(this.session),
              speechToTextDisconnected: this.session.onSpeechToTextDisconnected.bind(this.session)
            }
          };
          this.jsonRpcClient = new RpcBuilder.clients.JsonRpcClient(config);
        };
        OpenVidu2.prototype.onMasterNodeCrashedNotification = function(response) {
          console.error("Master Node has crashed");
          this.masterNodeHasCrashed = true;
          this.session.onLostConnection("nodeCrashed");
          this.jsonRpcClient.close(4103, "Master Node has crashed");
        };
        OpenVidu2.prototype.getWsReadyState = function() {
          return this.jsonRpcClient.getReadyState();
        };
        OpenVidu2.prototype.closeWs = function() {
          this.jsonRpcClient.close(4102, "Connection closed by client");
        };
        OpenVidu2.prototype.sendRequest = function(method, params, callback) {
          var _a;
          if (params && params instanceof Function) {
            callback = params;
            params = {};
          }
          logger.debug('Sending request: {method:"' + method + '", params: ' + JSON.stringify(params) + "}");
          (_a = this.jsonRpcClient) === null || _a === void 0 ? void 0 : _a.send(method, params, callback);
        };
        OpenVidu2.prototype.getWsUri = function() {
          return this.wsUri;
        };
        OpenVidu2.prototype.getSecret = function() {
          return this.secret;
        };
        OpenVidu2.prototype.getRecorder = function() {
          return this.recorder;
        };
        OpenVidu2.prototype.getStt = function() {
          return this.stt;
        };
        OpenVidu2.prototype.generateAudioDeviceError = function(error, constraints) {
          if (error.name === "Error") {
            error.name = error.constructor.name;
          }
          var errorName, errorMessage;
          switch (error.name.toLowerCase()) {
            case "notfounderror":
              errorName = OpenViduError_1.OpenViduErrorName.INPUT_AUDIO_DEVICE_NOT_FOUND;
              errorMessage = error.toString();
              return new OpenViduError_1.OpenViduError(errorName, errorMessage);
            case "notallowederror":
              errorName = OpenViduError_1.OpenViduErrorName.DEVICE_ACCESS_DENIED;
              errorMessage = error.toString();
              return new OpenViduError_1.OpenViduError(errorName, errorMessage);
            case "overconstrainederror":
              if (error.constraint.toLowerCase() === "deviceid") {
                errorName = OpenViduError_1.OpenViduErrorName.INPUT_AUDIO_DEVICE_NOT_FOUND;
                errorMessage = "Audio input device with deviceId '" + constraints.audio.deviceId.exact + "' not found";
              } else {
                errorName = OpenViduError_1.OpenViduErrorName.PUBLISHER_PROPERTIES_ERROR;
                errorMessage = "Audio input device doesn't support the value passed for constraint '" + error.constraint + "'";
              }
              return new OpenViduError_1.OpenViduError(errorName, errorMessage);
            case "notreadableerror":
              errorName = OpenViduError_1.OpenViduErrorName.DEVICE_ALREADY_IN_USE;
              errorMessage = error.toString();
              return new OpenViduError_1.OpenViduError(errorName, errorMessage);
            default:
              return new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.INPUT_AUDIO_DEVICE_GENERIC_ERROR, error.toString());
          }
        };
        OpenVidu2.prototype.addAlreadyProvidedTracks = function(myConstraints, mediaStream, stream) {
          if (!!myConstraints.videoTrack) {
            mediaStream.addTrack(myConstraints.videoTrack);
            if (!!stream) {
              if (!!myConstraints.constraints.video) {
                stream.lastVideoTrackConstraints = myConstraints.constraints.video;
              } else {
                stream.lastVideoTrackConstraints = myConstraints.videoTrack.getConstraints();
              }
            }
          }
          if (!!myConstraints.audioTrack) {
            mediaStream.addTrack(myConstraints.audioTrack);
          }
          return mediaStream;
        };
        OpenVidu2.prototype.configureDeviceIdOrScreensharing = function(myConstraints, publisherProperties, resolve, reject) {
          var _this = this;
          var audioSource = publisherProperties.audioSource;
          var videoSource = publisherProperties.videoSource;
          if (typeof audioSource === "string") {
            myConstraints.constraints.audio = { deviceId: { exact: audioSource } };
          }
          if (typeof videoSource === "string") {
            if (!this.isScreenShare(videoSource)) {
              this.setVideoSource(myConstraints, videoSource);
            } else {
              if (!this.checkScreenSharingCapabilities()) {
                var error = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_SHARING_NOT_SUPPORTED, "You can only screen share in desktop Chrome, Firefox, Opera, Safari (>=13.0), Edge (>= 80) or Electron. Detected client: " + platform.getName() + " " + platform.getVersion());
                logger.error(error);
                return reject(error);
              } else {
                if (platform.isElectron()) {
                  var prefix = "screen:";
                  var videoSourceString = videoSource;
                  var electronScreenId = videoSourceString.substr(videoSourceString.indexOf(prefix) + prefix.length);
                  myConstraints.constraints.video = {
                    mandatory: {
                      chromeMediaSource: "desktop",
                      chromeMediaSourceId: electronScreenId
                    }
                  };
                  return resolve(myConstraints);
                } else {
                  if (!!this.advancedConfiguration.screenShareChromeExtension && !(platform.isFirefoxBrowser() || platform.isFirefoxMobileBrowser()) && !navigator.mediaDevices["getDisplayMedia"]) {
                    screenSharing.getScreenConstraints(function(error2, screenConstraints) {
                      if (!!error2 || !!screenConstraints.mandatory && screenConstraints.mandatory.chromeMediaSource === "screen") {
                        if (error2 === "permission-denied" || error2 === "PermissionDeniedError") {
                          var error_5 = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_CAPTURE_DENIED, "You must allow access to one window of your desktop");
                          logger.error(error_5);
                          return reject(error_5);
                        } else {
                          var extensionId = _this.advancedConfiguration.screenShareChromeExtension.split("/").pop().trim();
                          screenSharing.getChromeExtensionStatus(extensionId, function(status) {
                            if (status === "installed-disabled") {
                              var error_6 = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_EXTENSION_DISABLED, "You must enable the screen extension");
                              logger.error(error_6);
                              return reject(error_6);
                            }
                            if (status === "not-installed") {
                              var error_7 = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_EXTENSION_NOT_INSTALLED, _this.advancedConfiguration.screenShareChromeExtension);
                              logger.error(error_7);
                              return reject(error_7);
                            }
                          });
                          return;
                        }
                      } else {
                        myConstraints.constraints.video = screenConstraints;
                        return resolve(myConstraints);
                      }
                    });
                    return;
                  } else {
                    if (navigator.mediaDevices["getDisplayMedia"]) {
                      return resolve(myConstraints);
                    } else {
                      var firefoxString = platform.isFirefoxBrowser() || platform.isFirefoxMobileBrowser() ? publisherProperties.videoSource : void 0;
                      screenSharingAuto.getScreenId(firefoxString, function(error2, sourceId, screenConstraints) {
                        if (!!error2) {
                          if (error2 === "not-installed") {
                            var extensionUrl = !!_this.advancedConfiguration.screenShareChromeExtension ? _this.advancedConfiguration.screenShareChromeExtension : "https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold";
                            var err = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_EXTENSION_NOT_INSTALLED, extensionUrl);
                            logger.error(err);
                            return reject(err);
                          } else if (error2 === "installed-disabled") {
                            var err = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_EXTENSION_DISABLED, "You must enable the screen extension");
                            logger.error(err);
                            return reject(err);
                          } else if (error2 === "permission-denied") {
                            var err = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_CAPTURE_DENIED, "You must allow access to one window of your desktop");
                            logger.error(err);
                            return reject(err);
                          } else {
                            var err = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.GENERIC_ERROR, "Unknown error when accessing screen share");
                            logger.error(err);
                            logger.error(error2);
                            return reject(err);
                          }
                        } else {
                          myConstraints.constraints.video = screenConstraints.video;
                          return resolve(myConstraints);
                        }
                      });
                      return;
                    }
                  }
                }
              }
            }
          }
        };
        OpenVidu2.prototype.setVideoSource = function(myConstraints, videoSource) {
          if (!myConstraints.constraints.video) {
            myConstraints.constraints.video = {};
          }
          myConstraints.constraints.video["deviceId"] = { exact: videoSource };
        };
        OpenVidu2.prototype.disconnectCallback = function() {
          logger.warn("Websocket connection lost");
          if (this.isRoomAvailable()) {
            this.session.onLostConnection("networkDisconnect");
          } else {
            alert("Connection error. Please reload page.");
          }
        };
        OpenVidu2.prototype.reconnectingCallback = function() {
          logger.warn("Websocket connection lost (reconnecting)");
          if (!this.isRoomAvailable()) {
            alert("Connection error. Please reload page.");
          } else {
            this.session.emitEvent("reconnecting", []);
          }
        };
        OpenVidu2.prototype.reconnectWebsocketThroughRpcConnectMethod = function(rpcSessionId) {
          var _this = this;
          this.sendRequest("connect", { sessionId: rpcSessionId, reconnect: true }, function(error, response) {
            if (!!error) {
              if (_this.isMasterNodeCrashed()) {
                logger.warn("Master Node has crashed!");
              } else {
                logger.error(error);
                var notifyLostConnection_1 = function(reason, errorMsg) {
                  logger.warn(errorMsg);
                  _this.session.onLostConnection(reason);
                  _this.jsonRpcClient.close(4101, "Reconnection fault: " + errorMsg);
                };
                var rpcSessionStatus = function() {
                  if (_this.life === -1) {
                    notifyLostConnection_1("networkDisconnect", "WS successfully reconnected but the user was already evicted due to timeout");
                  } else {
                    _this.sendRequest("sessionStatus", { sessionId: _this.session.sessionId }, function(error2, response2) {
                      if (error2 != null) {
                        console.error("Error checking session status", error2);
                      } else {
                        if (_this.life === response2.life) {
                          notifyLostConnection_1("networkDisconnect", "WS successfully reconnected but the user was already evicted due to timeout");
                        } else {
                          notifyLostConnection_1("nodeCrashed", "WS successfully reconnected to OpenVidu Server but your Master Node crashed");
                        }
                      }
                    });
                  }
                };
                if (error.code === 40007 && error.message === "reconnection error") {
                  console.error("Invalid RPC sessionId. Client network disconnection or Master Node crash");
                  rpcSessionStatus();
                } else {
                  rpcSessionStatus();
                }
              }
            } else {
              _this.jsonRpcClient.resetPing();
              _this.session.onRecoveredConnection();
            }
          });
        };
        OpenVidu2.prototype.reconnectedCallback = function() {
          logger.warn("Websocket reconnected");
          if (this.isRoomAvailable()) {
            if (!!this.session.connection) {
              this.reconnectWebsocketThroughRpcConnectMethod(this.session.connection.rpcSessionId);
            } else {
              logger.warn("There was no previous connection when running reconnection callback");
              var sessionDisconnectEvent = new SessionDisconnectedEvent_1.SessionDisconnectedEvent(this.session, "networkDisconnect");
              this.session.ee.emitEvent("sessionDisconnected", [sessionDisconnectEvent]);
              sessionDisconnectEvent.callDefaultBehavior();
            }
          } else {
            alert("Connection error. Please reload page.");
          }
        };
        OpenVidu2.prototype.isMasterNodeCrashed = function() {
          return this.masterNodeHasCrashed;
        };
        OpenVidu2.prototype.isRoomAvailable = function() {
          if (this.session !== void 0 && this.session instanceof Session_1.Session) {
            return true;
          } else {
            logger.warn("Session instance not found");
            return false;
          }
        };
        OpenVidu2.prototype.isScreenShare = function(videoSource) {
          return videoSource === "screen" || videoSource === "window" || platform.isElectron() && videoSource.startsWith("screen:");
        };
        return OpenVidu2;
      }()
    );
    exports.OpenVidu = OpenVidu;
  }
});

// node_modules/openvidu-browser/lib/OpenViduInternal/Events/Types/Types.js
var require_Types = __commonJS({
  "node_modules/openvidu-browser/lib/OpenViduInternal/Events/Types/Types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/openvidu-browser/lib/index.js
var require_lib = __commonJS({
  "node_modules/openvidu-browser/lib/index.js"(exports) {
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventDispatcher = exports.ExceptionEventName = exports.ExceptionEvent = exports.SpeechToTextEvent = exports.NetworkQualityLevelChangedEvent = exports.FilterEvent = exports.ConnectionPropertyChangedEvent = exports.StreamPropertyChangedEvent = exports.VideoElementEvent = exports.StreamManagerEvent = exports.StreamEvent = exports.SignalEvent = exports.SessionDisconnectedEvent = exports.RecordingEvent = exports.PublisherSpeakingEvent = exports.ConnectionEvent = exports.Event = exports.VideoInsertMode = exports.TypeOfVideo = exports.OpenViduErrorName = exports.OpenViduError = exports.LocalRecorderState = exports.Filter = exports.LocalRecorder = exports.Connection = exports.Stream = exports.StreamManager = exports.Subscriber = exports.Publisher = exports.Session = exports.OpenVidu = void 0;
    var jsnlog_1 = require_jsnlog();
    var OpenVidu_1 = require_OpenVidu();
    Object.defineProperty(exports, "OpenVidu", { enumerable: true, get: function() {
      return OpenVidu_1.OpenVidu;
    } });
    var Session_1 = require_Session();
    Object.defineProperty(exports, "Session", { enumerable: true, get: function() {
      return Session_1.Session;
    } });
    var Publisher_1 = require_Publisher();
    Object.defineProperty(exports, "Publisher", { enumerable: true, get: function() {
      return Publisher_1.Publisher;
    } });
    var Subscriber_1 = require_Subscriber();
    Object.defineProperty(exports, "Subscriber", { enumerable: true, get: function() {
      return Subscriber_1.Subscriber;
    } });
    var StreamManager_1 = require_StreamManager();
    Object.defineProperty(exports, "StreamManager", { enumerable: true, get: function() {
      return StreamManager_1.StreamManager;
    } });
    var Stream_1 = require_Stream();
    Object.defineProperty(exports, "Stream", { enumerable: true, get: function() {
      return Stream_1.Stream;
    } });
    var Connection_1 = require_Connection();
    Object.defineProperty(exports, "Connection", { enumerable: true, get: function() {
      return Connection_1.Connection;
    } });
    var LocalRecorder_1 = require_LocalRecorder();
    Object.defineProperty(exports, "LocalRecorder", { enumerable: true, get: function() {
      return LocalRecorder_1.LocalRecorder;
    } });
    var Filter_1 = require_Filter();
    Object.defineProperty(exports, "Filter", { enumerable: true, get: function() {
      return Filter_1.Filter;
    } });
    var LocalRecorderState_1 = require_LocalRecorderState();
    Object.defineProperty(exports, "LocalRecorderState", { enumerable: true, get: function() {
      return LocalRecorderState_1.LocalRecorderState;
    } });
    var OpenViduError_1 = require_OpenViduError();
    Object.defineProperty(exports, "OpenViduError", { enumerable: true, get: function() {
      return OpenViduError_1.OpenViduError;
    } });
    Object.defineProperty(exports, "OpenViduErrorName", { enumerable: true, get: function() {
      return OpenViduError_1.OpenViduErrorName;
    } });
    var TypeOfVideo_1 = require_TypeOfVideo();
    Object.defineProperty(exports, "TypeOfVideo", { enumerable: true, get: function() {
      return TypeOfVideo_1.TypeOfVideo;
    } });
    var VideoInsertMode_1 = require_VideoInsertMode();
    Object.defineProperty(exports, "VideoInsertMode", { enumerable: true, get: function() {
      return VideoInsertMode_1.VideoInsertMode;
    } });
    var Event_1 = require_Event();
    Object.defineProperty(exports, "Event", { enumerable: true, get: function() {
      return Event_1.Event;
    } });
    var ConnectionEvent_1 = require_ConnectionEvent();
    Object.defineProperty(exports, "ConnectionEvent", { enumerable: true, get: function() {
      return ConnectionEvent_1.ConnectionEvent;
    } });
    var PublisherSpeakingEvent_1 = require_PublisherSpeakingEvent();
    Object.defineProperty(exports, "PublisherSpeakingEvent", { enumerable: true, get: function() {
      return PublisherSpeakingEvent_1.PublisherSpeakingEvent;
    } });
    var RecordingEvent_1 = require_RecordingEvent();
    Object.defineProperty(exports, "RecordingEvent", { enumerable: true, get: function() {
      return RecordingEvent_1.RecordingEvent;
    } });
    var SessionDisconnectedEvent_1 = require_SessionDisconnectedEvent();
    Object.defineProperty(exports, "SessionDisconnectedEvent", { enumerable: true, get: function() {
      return SessionDisconnectedEvent_1.SessionDisconnectedEvent;
    } });
    var SignalEvent_1 = require_SignalEvent();
    Object.defineProperty(exports, "SignalEvent", { enumerable: true, get: function() {
      return SignalEvent_1.SignalEvent;
    } });
    var StreamEvent_1 = require_StreamEvent();
    Object.defineProperty(exports, "StreamEvent", { enumerable: true, get: function() {
      return StreamEvent_1.StreamEvent;
    } });
    var StreamManagerEvent_1 = require_StreamManagerEvent();
    Object.defineProperty(exports, "StreamManagerEvent", { enumerable: true, get: function() {
      return StreamManagerEvent_1.StreamManagerEvent;
    } });
    var VideoElementEvent_1 = require_VideoElementEvent();
    Object.defineProperty(exports, "VideoElementEvent", { enumerable: true, get: function() {
      return VideoElementEvent_1.VideoElementEvent;
    } });
    var StreamPropertyChangedEvent_1 = require_StreamPropertyChangedEvent();
    Object.defineProperty(exports, "StreamPropertyChangedEvent", { enumerable: true, get: function() {
      return StreamPropertyChangedEvent_1.StreamPropertyChangedEvent;
    } });
    var ConnectionPropertyChangedEvent_1 = require_ConnectionPropertyChangedEvent();
    Object.defineProperty(exports, "ConnectionPropertyChangedEvent", { enumerable: true, get: function() {
      return ConnectionPropertyChangedEvent_1.ConnectionPropertyChangedEvent;
    } });
    var FilterEvent_1 = require_FilterEvent();
    Object.defineProperty(exports, "FilterEvent", { enumerable: true, get: function() {
      return FilterEvent_1.FilterEvent;
    } });
    var NetworkQualityLevelChangedEvent_1 = require_NetworkQualityLevelChangedEvent();
    Object.defineProperty(exports, "NetworkQualityLevelChangedEvent", { enumerable: true, get: function() {
      return NetworkQualityLevelChangedEvent_1.NetworkQualityLevelChangedEvent;
    } });
    var SpeechToTextEvent_1 = require_SpeechToTextEvent();
    Object.defineProperty(exports, "SpeechToTextEvent", { enumerable: true, get: function() {
      return SpeechToTextEvent_1.SpeechToTextEvent;
    } });
    var ExceptionEvent_1 = require_ExceptionEvent();
    Object.defineProperty(exports, "ExceptionEvent", { enumerable: true, get: function() {
      return ExceptionEvent_1.ExceptionEvent;
    } });
    Object.defineProperty(exports, "ExceptionEventName", { enumerable: true, get: function() {
      return ExceptionEvent_1.ExceptionEventName;
    } });
    var EventDispatcher_1 = require_EventDispatcher();
    Object.defineProperty(exports, "EventDispatcher", { enumerable: true, get: function() {
      return EventDispatcher_1.EventDispatcher;
    } });
    __exportStar(require_Types(), exports);
    jsnlog_1.JL.setOptions({ enabled: false });
  }
});
export default require_lib();
/*! Bundled license information:

platform/platform.js:
  (*!
   * Platform.js v1.3.6
   * Copyright 2014-2020 Benjamin Tan
   * Copyright 2011-2013 John-David Dalton
   * Available under MIT license
   *)

wolfy87-eventemitter/EventEmitter.js:
  (*!
   * EventEmitter v5.2.9 - git.io/ee
   * Unlicense - http://unlicense.org/
   * Oliver Caldwell - https://oli.me.uk/
   * @preserve
   *)
*/
//# sourceMappingURL=openvidu-browser.js.map
