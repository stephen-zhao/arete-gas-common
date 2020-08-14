var CoreUtils = {
  /**
  * Extends a with b.
  *
  * @param {Object} a - the base object to extend.
  * @param {Object} b - the extension properties to merge into a.
  * @return {Object} the result of merging b into a.
  */
  extend: function(a, b) {
    for (const key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  },
  
  /**
  * Filters an array such that only each existing value only occurs once. The first occurrence is used to determine ordering.
  *
  * @param {*[]} array - the array to filter.
  * @return {*[]} the resultant set-like array.
  */
  distinct: function(array) {
    return array.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
  },
  
  /**
  * Generates the sequence of consecutive integers of the specified range.
  *
  * @param {number} start - the lower-bound (inclusive) of the range.
  * @param {number} end - the upper-bound (exclusive) of the range.
  * @return {number[]} the sequence of consecutive integers of the specified range.
  */
  range: function(start, end) {
    return Array.apply(null, Array(end - start)).map(function(n, i) {
      return i + start;
    });
  },
  
  flatMap: function(array, f) {
    const concat = function(x, y) { return x.concat(y) };
    return array.map(f).reduce(concat, []);
  },
  
  rotate: function(array/*: T[]*/, amount/*: int*/) {
    return [].concat(array.slice(amount, array.length), array.slice(0, amount));
  },
  
  firstIdxOrDefault: function(array/*: T[]*/, pred/*: T => bool*/, defalt/*: int*/) {
    for (let idx = 0; idx < array.length; ++idx) {
      if (pred(array[idx])) {
        return idx;
      }
    }
    return defalt;
  },
  
  mergeByIndex: function(schemaAndData) {
    // Get schema keys
    const schemaKeys = Object.keys(schemaAndData);
    // Early exit if schema is empty
    if (schemaKeys.length == 0) {
      return [];
    }
    // Check all data are same length
    const lengthOfData0 = schemaAndData[schemaKeys[0]].length;
    for (let idx = 0; idx < schemaKeys.length; ++idx) {
      if (schemaAndData[schemaKeys[idx]].length != lengthOfData0) {
        return [];
      }
    }
    // All are same length now, so merge by index
    const results = [];
    for (let dataIdx = 0; dataIdx < lengthOfData0; ++dataIdx) {
      const result = {};
      for (let schemaIdx = 0; schemaIdx < schemaKeys.length; ++schemaIdx) {
        result[schemaKeys[schemaIdx]] = schemaAndData[schemaKeys[schemaIdx]][dataIdx];
      }
      results.push(result);
    }
    return results;
  },
  
  dateToIsoString: function(date) {
    return Utilities.formatDate(date, 'Etc/GMT', "yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'");
  },
};
