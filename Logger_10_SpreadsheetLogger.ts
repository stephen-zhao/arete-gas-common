/**
* Logger which logs to the specified spreadsheet sheet.
*/
class SpreadsheetLogger extends LoggerBase {
  private _logsheet: GoogleAppsScript.Spreadsheet.Sheet;
  /**
  * Constructs a Spreadsheet logger
  *
  * @param {Sheet} [logsheet] - the sheet to log to. Defaults to a sheet named "_log".
  */
  constructor(logsheet?: GoogleAppsScript.Spreadsheet.Sheet) {
    super();
    if (!logsheet) {
      this._logsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_log") ?? SpreadsheetApp.getActiveSpreadsheet().insertSheet("_log");
    }
    else {
      this._logsheet = logsheet;
    }
  }
  
  /**
  * Logs message with severity.
  *
  * @param {string} msg
  * @param {string} sev
  */
  log(msg: string, sev: string)
  {
    if (!sev) {
      sev = "DEBUG";
    }
    const logEntry = [
      CoreUtils.dateToIsoString(new Date()),
      sev,
      msg
    ];
    this._logsheet.insertRowBefore(1);
    this._logsheet.getRange("A1:C1").setValues([ logEntry ]);
  }
}
