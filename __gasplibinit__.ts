//=====================================================================================
// LIBRARY GLOBAL STATIC VARIABLE SUPPORT

// Global static variables defined using the following functions
// are not instance-specific, meaning that they are shared across all
// running instances of this library

function defineLibraryGlobalStaticVariable_<TValue>(key: string, value: TValue): TValue {
  setLibraryGlobalStaticVariable_(key, value);
  return value;
}
function setLibraryGlobalStaticVariable_<TValue>(key: string, value: TValue) {
  const scriptProperties = PropertiesService.getScriptProperties();
  switch (typeof (value)) {
    case 'function':
      throw new Error('Error in defineLibraryGlobalStaticVariable_: function-typed variable is not supported.');
    case 'object':
      scriptProperties.setProperty(key, JSON.stringify(value));
      break;
    default:
      scriptProperties.setProperty(key, ''+value);
      break;
  }
}
function getLibraryGlobalStaticVariable_(key: string) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

//=====================================================================================
// LIBRARY GLOBAL STATIC VARIABLES

var ISDEBUG = defineLibraryGlobalStaticVariable_('ISDEBUG', 'true');


//=====================================================================================
// INITIALIZE ALL SCRIPTS

function __libraryInit__() {
  var keys = Object.keys(globalThis);
  var inits = new Array<string>();
  for (var i = 0; i < keys.length; ++i) {
    var funcName = keys[i];
    if (funcName.indexOf("__gaspinit__") == 0) {
      inits.push(funcName);
    }
  }
  // Sort all inits for initialization order
  inits.sort();
  for (var i = 0; i < inits.length; i += 1) {
    Logger.log("Initializing " + inits[i]);
    // @ts-expect-error
    globalThis[inits[i]].call(globalThis);
  }
}

(function() {
  __libraryInit__();
})();

//=====================================================================================
// TESTING SUPPORT

function runGasIntegrationTests() {
  const TEST_OBJECT_NAME_PREFIX = "__gasptestsuite__";
  const keys = Object.keys(globalThis);
  const testSuites = new Array<string>();
  Logger.log("Discovering GAS integration test suites...");
  for (let i = 0; i < keys.length; ++i) {
    const globalName = keys[i];
    if (globalName.indexOf(TEST_OBJECT_NAME_PREFIX) == 0) {
      testSuites.push(globalName);
    }
  }
  Logger.log(`Discovered ${testSuites.length} GAS integration test suites.`);
  Logger.log("Running test suites...");
  for (let i = 0; i < testSuites.length; ++i) {
    Logger.log(`Running test suite ${i} '${testSuites[i].substring(TEST_OBJECT_NAME_PREFIX.length)}'...`);
    // @ts-expect-error
    const testSuite = globalThis[testSuites[i]];
    const testNames = Object.keys(testSuite);
    for (const testName of testNames) {
      testSuite[testName]();
    }
    Logger.log(`Successfully ran ${testNames.length} tests in test suite ${i} '${testSuites[i].substring(TEST_OBJECT_NAME_PREFIX.length)}'.`);
  }
  Logger.log(`All ${testSuites.length} test suites passed!`);
}

function Assert_(test: boolean) {
  if (!test) {
    throw new Error("Test failed!");
  }
};
