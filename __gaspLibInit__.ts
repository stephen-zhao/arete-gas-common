// GASP library v0.0.1-build0001
//=====================================================================================
// LIBRARY SCOPED VARIABLE SUPPORT

// Global static variables defined using the following functions
// are not instance-specific, meaning that they are shared across all
// running instances of this library

function __gasp__defineLibraryScopedVariable__<TValue>(key: string, value: TValue): TValue {
  __gasp__setLibraryScopedVariable__(key, value);
  return value;
}
function __gasp__setLibraryScopedVariable__<TValue>(key: string, value: TValue) {
  const scriptProperties = PropertiesService.getScriptProperties();
  switch (typeof (value)) {
    case 'function':
      throw new Error('Error in __gasp__setLibraryScopedVariable__: function-typed variable is not supported.');
    case 'object':
      scriptProperties.setProperty(key, JSON.stringify(value));
      break;
    default:
      scriptProperties.setProperty(key, ''+value);
      break;
  }
}
function __gasp__getLibraryScopedVariable__(key: string) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

//=====================================================================================
// GASP TEST support (very crude)

function __gasp__assert__(test: boolean | (() => boolean)) {
  let result = false;
  if (typeof test === 'boolean') {
    result = test;
  }
  else {
    result = test();
  }
  if (!result) {
    Logger.log('Test failed!');
  }
}

// ============================================================================
// GASP-internal library utilities

function __gasp__runTests() {
  const TEST_OBJECT_NAME_PREFIX = "__gaspTestSuite__";
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

function __gaspLibExplicitInit__() {
  const keys = Object.keys(globalThis);
  const inits = new Array<string>();
  for (let i = 0; i < keys.length; ++i) {
    const funcName = keys[i];
    if (funcName.indexOf("__gaspFileExplicitInit__") == 0) {
      inits.push(funcName);
    }
  }
  // Sort all inits for initialization order
  inits.sort();
  for (let i = 0; i < inits.length; i += 1) {
    Logger.log("Initializing " + inits[i]);
    // @ts-expect-error
    globalThis[inits[i]].call(globalThis);
  }
}

(function() {
  __gaspLibExplicitInit__();
})();
