/**
* Logger which logs to the specified spreadsheet sheet.
*/
class SpreadsheetLogger extends LoggerBase {
  /**
  * Constructs a Spreadsheet logger
  *
  * @param {Sheet} [logsheet] - the sheet to log to. Defaults to a sheet named "_log".
  */
  constructor(logsheet) {
    super();
    if (!logsheet) {
      this.logsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_log");
      if (this.logsheet === null) {
        this.logsheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("_log");
      }
    }
    else {
      this.logsheet = logsheet;
    }
  }
  
  /**
  * Logs message with severity.
  *
  * @param {string} msg
  * @param {string} sev
  */
  log(msg, sev) {
    if (!sev) {
      sev = "DEBUG";
    }
    const logEntry = [
      CoreUtils.dateToIsoString(new Date()),
      sev,
      msg
    ];
    this.logsheet.insertRowBefore(1);
    this.logsheet.getRange("A1:C1").setValues([ logEntry ]);
  }
}
