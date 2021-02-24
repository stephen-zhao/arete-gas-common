class ArrayUtils {
  /**
  * Filters an array such that only each existing value only occurs once. The first occurrence is used to determine ordering.
  *
  * @param {*[]} array - the array to filter.
  * @return {*[]} the resultant set-like array.
  */
  static distinct<TItem>(array: Array<TItem>): Array<TItem> {
    return array.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
  }
  
  /**
  * Generates the sequence of consecutive integers of the specified range.
  *
  * @param {number} start - the lower-bound (inclusive) of the range.
  * @param {number} end - the upper-bound (exclusive) of the range.
  * @return {number[]} the sequence of consecutive integers of the specified range.
  */
  static range(start: number, end: number): Array<number> {
    return (new Array<number>(end - start)).map((_, i) => {
      return i + start;
    });
  }

  static flatMap<TItemA, TItemB>(array: Array<TItemA>, f: (x: TItemA) => Array<TItemB>) {
    const concat = (x: Array<TItemB>, y: Array<TItemB>) => x.concat(y);
    return array.map(f).reduce(concat, []);
  }

  static rotate<TItem>(array: Array<TItem>, amount: number): Array<TItem> {
    return ([] as Array<TItem>).concat(array.slice(amount, array.length), array.slice(0, amount));
  }

  static firstIdxOrDefault<TItem>(array: Array<TItem>, pred: (x: TItem) => boolean, defaultValue: number) {
    for (let idx = 0; idx < array.length; ++idx) {
      if (pred(array[idx])) {
        return idx;
      }
    }
    return defaultValue;
  }

  static mergeByIndex(schemaAndData: { [key: string]: Array<any> }) {
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
        throw new Error("Error in ArrayUtils.mergeByIndex: length of data arrays must be equal.");
      }
    }
    // All are same length now, so merge by index
    const results = [];
    for (let dataIdx = 0; dataIdx < lengthOfData0; ++dataIdx) {
      const result = {} as any;
      for (let schemaIdx = 0; schemaIdx < schemaKeys.length; ++schemaIdx) {
        result[schemaKeys[schemaIdx]] = schemaAndData[schemaKeys[schemaIdx]][dataIdx];
      }
      results.push(result);
    }
    return results;
  }
}