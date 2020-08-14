function SheetUtils() { }

SheetUtils.columnToletter = function(column)
{
  let temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

SheetUtils.letterToColumn = function(letter)
{
  let column = 0, length = letter.length;
  for (var i = 0; i < length; ++i) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

SheetUtils.indicesToA1Range = function(colStart, rowStart, colEnd, rowEnd)
{
  return SheetUtils.columnToletter(colStart) + rowStart + ":" + SheetUtils.columnToletter(colEnd) + rowEnd;
}

SheetUtils.indicesToA1Cell = function(col, row)
{
  return SheetUtils.columnToletter(col) + row;
}

SheetUtils.getColumnHeaders = function(sheet)
{
  return sheet.getRange("1:1");
}

SheetUtils.findColumnByHeader = function(sheet, header)
{
  const colHeaders = SheetUtils.getColumnHeaders(sheet);
  const col = RangeUtils.findFirstCellInRange(colHeaders, header).col;
  return col;
}

function RangeUtils() { }

RangeUtils.findFirstCellInRange = function(range, value) {
  const values = range.getValues();
  for (let rowIdx = 0; rowIdx < values.length; ++rowIdx) {
    const colIdx = values[rowIdx].indexOf(value);
    if (colIdx != -1) {
      return { row: range.getRow() + rowIdx, col: range.getColumn() + colIdx };
    }
  }
  return null;
}

RangeUtils.findAllCellsInRange = function(range, value) {
  const values = range.getValues();
  const foundCells = [];
  for (let rowIdx = 0; rowIdx < values.length; ++rowIdx) {
    let colIdx = 0;
    while (colIdx >= 0) {
      colIdx = values[rowIdx].indexOf(value, colIdx);
      if (colIdx != -1) {
        foundCells.push({ row: range.getRow() + rowIdx, col: range.getColumn() + colIdx });
        ++colIdx;
      }
    }
  }
  return foundCells;
}

RangeUtils.getAllCellsInRange = function(range) {
  const values = range.getValues();
  const cells = [];
  for (let rowIdx = 0; rowIdx < values.length; ++rowIdx) {
    for (let colIdx = 0; colIdx < values[rowIdx].length; ++colIdx) {
      cells.push({ row: range.getRow() + rowIdx, col: range.getColumn() + colIdx, value: values[rowIdx][colIdx] });
    }
  }
  return cells;
}

RangeUtils.getLastFilledCellInRange = function(range) {
  const values = range.getValues();
  for (let rowIdx = 0; rowIdx < values.length; ++rowIdx) {
    for (let colIdx = 0; colIdx < values[rowIdx].length; ++colIdx) {
      const value = values[rowIdx][colIdx];
      // If we are NOT filled, then search backwards for last filled cell
      if (value === undefined || value === null || value === '') {
        let row, col;
        // If we are at the first cell in the range, then there are no filled cells
        if (rowIdx === 0 && colIdx === 0) return null;
        // If we are at the first cell in the row, move to the last cell in the previous row
        if (colIdx === 0) {
          row = range.getRow() + rowIdx - 1;
          col = range.getLastColumn();
        }
        // Otherwise, move to the previous cell in the current row
        else {
          row = range.getRow() + rowIdx;
          col = range.getColumn() + colIdx - 1;
        }
        return { row: row, col: col, value: values[row][col] };
      }
    }
  }
  // Otherwise, no unfilled cells found, so return last cell
  return { row: range.getLastRow(), col: range.getLastColumn(), value: values[range.getLastRow()][range.getLastColumn()] };
}
