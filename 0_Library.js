let scriptProperties_ = PropertiesService.getScriptProperties();
function defineEnvironmentVariable_(key, value) {
  scriptProperties_.setProperty(key, value);
  return value;
}
function getEnvironmentVariable_(key) {
  return scriptProperties_.getProperty(key);
}

//=====================================================================================
// ENVIRONMENT VARIABLES

var ISDEBUG = defineEnvironmentVariable_('ISDEBUG', true);


//=====================================================================================
// INITIALIZE ALL SCRIPTS

function __libraryInit__() {
  var keys = Object.keys(this);
  var inits = new Array();
  for (var i = 0; i < keys.length; ++i) {
    var funcName = keys[i];
    if (funcName.indexOf("__init__") == 0) {
      inits.push(funcName);
    }
  }
  // Sort all inits for initialization order
  inits.sort();
  for (var i = 0; i < inits.length; i += 1) {
    Logger.log("Initializing " + inits[i]);
    this[inits[i]].call(this);
  }
}

(function() {
  __libraryInit__();
})();

//=====================================================================================
// TESTING SUPPORT

function runTests() {
  const keys = Object.keys(this);
  const testSuites = new Array();
  Logger.log("Discovering test suites...");
  for (let i = 0; i < keys.length; ++i) {
    const globalName = keys[i];
    if (globalName.indexOf("__tests__") == 0) {
      testSuites.push(globalName);
    }
  }
  Logger.log("Discovered " + testSuites.length + " test suites.");
  Logger.log("Running test suites...");
  for (let i = 0; i < testSuites.length; ++i) {
    Logger.log("Running test suite " + i + ": " + testSuites[i].substring(9));
    const testSuite = this[testSuites[i]];
    for (const testName in testSuite) {
      testSuite[testName]();
    }
    Logger.log("Successfully ran test suite " + i + ": " + testSuites[i].substring(9));
  }
  Logger.log("All " + testSuites.length + " tests passed!");
}

let Assert_ = function(test) {
  if (!test) {
    throw new Error("Test failed!");
  }
};
