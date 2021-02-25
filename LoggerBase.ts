interface ILogger
{
  debug(msg: string): void;
  error(msg: string): void;
  info(msg: string): void;
  log(msg: string, sev: string): void;
}

abstract class LoggerBase implements ILogger
{
  constructor() { }
  
  debug(msg: string): void
  {
    this.log(msg, "DEBUG");
  }
  
  error(msg: string): void
  {
    this.log(msg, "ERROR");
  }
  
  info(msg: string): void
  {
    this.log(msg, "INFO");
  }

  abstract log(msg: string, sev: string): void;
}
