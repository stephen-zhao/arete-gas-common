class GasLogger extends LoggerBase
{
  constructor()
  {
    super();
  }
  
  log(msg: string, sev: string): void
  {
    if (!sev) {
      sev = "DEBUG";
    }
    const logEntry = [
      CoreUtils.dateToIsoString(new Date()),
      "["+sev+"]",
      msg,
    ];
    Logger.log(logEntry.join(" "));
  }
}
