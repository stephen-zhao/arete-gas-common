// This test script tests script execution order
var __gaspTestSuite__ExecutionOrder = {
  typeScriptAbstractClassInheritance_loadsAbstractClassFirst() {
    // This test simply instantiates a GasLogger which inherits from LoggerBase
    // If this test fails, then execution order is not being induced correctly

    // As of when this test was written, execution order is defined by filePushOrder in .clasp.json
    // Please use this file to ensure scripts are being loaded in the correct order to
    // ensure classes which depend on abstract classes work as intended

    var logger = new GasLogger();
    logger.debug("If you see this, then abstract class inheritance works (at least for the GasLogger)!");
  }
};
