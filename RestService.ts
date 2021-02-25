class RestService
{
  private _logger: ILogger;

  constructor(logger: ILogger)
  {
    this._logger = logger || new SpreadsheetLogger();
  }

  getJsonWithQuery(url: string, queryObj: Record<string, string>): any
  {
    var queryString = "?";
    for (var key in queryObj)
    {
      var value = queryObj[key];
      queryString += key + "=" + value + "&";
    }
    var urlWithQuery = url + queryString.slice(0,-1);
    this._logger.info("GET (request) "  + urlWithQuery);
    var response = UrlFetchApp.fetch(urlWithQuery);
    this._logger.info("GET (response) " + response.getContentText());
    return JSON.parse(response.getContentText());
  }
}
