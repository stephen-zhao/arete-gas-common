class CoreUtils {
  /**
  * Extends a with b.
  *
  * @param {object} a - the base object to extend.
  * @param {object} b - the extension properties to merge into a.
  * @return {object} the result of merging b into a.
  */
  static extend(a: Record<string | number | symbol, any>, b: Record<string | number | symbol, any>): Record<string | number | symbol, any> {
    for (const key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }
  
  static dateToIsoString(date: Date) {
    return Utilities.formatDate(date, 'Etc/GMT', "yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'");
  }
};
