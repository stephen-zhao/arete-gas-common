abstract class LoggerBase
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
