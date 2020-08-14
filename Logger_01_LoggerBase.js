class LoggerBase {
  constructor() { }
  
  debug(msg) {
    this.log(msg, "DEBUG");
  }
  
  error(msg) {
    this.log(msg, "ERROR");
  }
  
  info(msg) {
    this.log(msg, "INFO");
  }
}
