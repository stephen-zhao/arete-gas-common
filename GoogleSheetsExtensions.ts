type CellWithValue = {
  rowIdx: number,
  colIdx: number,
  value: any,
};

type CellLocation = {
  rowIdx: number,
  colIdx: number,
};

class SheetUtils {
  static colIdxToA1(colIdx: number): string {
    let leastSig26Dig, colA1 = '';
    while (colIdx > 0) {
      leastSig26Dig = (colIdx - 1) % 26;
      colA1 = String.fromCharCode(leastSig26Dig + 65) + colA1;
      colIdx = (colIdx - leastSig26Dig - 1) / 26;
    }
    return colA1;
  }

  static colA1ToIdx(colA1: string): number {
    let colIdx = 0, length = colA1.length;
    for (var i = 0; i < length; ++i) {
      colIdx += (colA1.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
    }
    return colIdx;
  }

  static idxsToA1Range(colIdxStart: number, rowIdxStart: number, colIdxEnd: number, rowIdxEnd: number): string {
    return SheetUtils.colIdxToA1(colIdxStart) + rowIdxStart + ":" + SheetUtils.colIdxToA1(colIdxEnd) + rowIdxEnd;
  }

  static idxsToA1Cell(colIdx: number, rowIdx: number): string {
    return SheetUtils.colIdxToA1(colIdx) + rowIdx;
  }

  static getColumnHeaders(sheet: GoogleAppsScript.Spreadsheet.Sheet): GoogleAppsScript.Spreadsheet.Range {
    return sheet.getRange("1:1");
  }

  static findColIdxByHeader(sheet: GoogleAppsScript.Spreadsheet.Sheet, header: string): number | undefined {
    const colHeaders = SheetUtils.getColumnHeaders(sheet);
    const colIdx = RangeUtils.findFirstCellInRange(colHeaders, header)?.colIdx ?? undefined;
    return colIdx;
  }
}


class RangeUtils {

  static findFirstCellInRange(range: GoogleAppsScript.Spreadsheet.Range, value: any): CellWithValue | undefined {
    const values = range.getValues();
    for (let rowRidx = 0; rowRidx < values.length; ++rowRidx) {
      const colRidx = values[rowRidx].indexOf(value);
      if (colRidx != -1) {
        return {
          rowIdx: range.getRow() + rowRidx,
          colIdx: range.getColumn() + colRidx,
          value,
        };
      }
    }
    return undefined;
  }

  static findAllCellsInRange(range: GoogleAppsScript.Spreadsheet.Range, value: any): Array<CellWithValue> {
    const values = range.getValues();
    const foundCells = [];
    for (let rowRidx = 0; rowRidx < values.length; ++rowRidx) {
      let colRidx = 0;
      while (colRidx >= 0) {
        colRidx = values[rowRidx].indexOf(value, colRidx);
        if (colRidx != -1) {
          foundCells.push({
            rowIdx: range.getRow() + rowRidx,
            colIdx: range.getColumn() + colRidx,
            value,
          });
          ++colRidx;
        }
      }
    }
    return foundCells;
  }

  static getAllCellsInRange(range: GoogleAppsScript.Spreadsheet.Range): Array<CellWithValue> {
    const values = range.getValues();
    const cells = [];
    for (let rowRidx = 0; rowRidx < values.length; ++rowRidx) {
      for (let colRidx = 0; colRidx < values[rowRidx].length; ++colRidx) {
        cells.push({
          rowIdx: range.getRow() + rowRidx,
          colIdx: range.getColumn() + colRidx,
          value: values[rowRidx][colRidx],
        });
      }
    }
    return cells;
  }

  static getLastFilledCellInRange(range: GoogleAppsScript.Spreadsheet.Range): CellWithValue | undefined {
    const values = range.getValues();
    // TODO: make a binary search instead
    for (let rowRidx = values.length - 1; rowRidx >= 0; --rowRidx) {
      for (let colRidx = values[rowRidx].length - 1; colRidx >= 0; --colRidx) {
        const value = values[rowRidx][colRidx];
        // We are at the last filled cell
        if (value !== undefined && value !== null && value !== '') {
          return {
            rowIdx: range.getRow() + rowRidx,
            colIdx: range.getColumn() + colRidx,
            value: values[rowRidx][colRidx],
          }
        }
      }
    }
    // Otherwise, no filled cells found
    return undefined;
  }

  static getFirstUnfilledCellInRange(range: GoogleAppsScript.Spreadsheet.Range): CellWithValue | undefined {
    const values = range.getValues();
    // TODO: make a binary search instead
    for (let rowRidx = 0; rowRidx < values.length; ++rowRidx) {
      for (let colRidx = 0; colRidx < values[rowRidx].length; ++colRidx) {
        const value = values[rowRidx][colRidx];
        // We are at the first unfilled cell
        if (value === undefined || value === null || value === '') {
          return {
            rowIdx: range.getRow() + rowRidx,
            colIdx: range.getColumn() + colRidx,
            value: values[rowRidx][colRidx],
          }
        }
      }
    }
    // Otherwise, no unfilled cells found
    return undefined;
  }
}
