import { Decimal } from "decimal.js";

// FIND DATA

// ROW
export const findColRow = (
  data: any[],
  colName: string,
  col: string = "country"
): { [index: string]: any } | null => {
  for (let row of data) {
    if (row[col].trim().toLowerCase() === colName.trim().toLowerCase())
      return row;
  }
  return null;
};

export const findRow2Col = (
  data: any[],
  col1Name: string,
  col2Name: string,
  col1: string = "commodity",
  col2: string = "region"
): { [index: string]: any } | null => {
  for (let row of data) {
    if (
      row[col1].trim() === col1Name.trim() &&
      row[col2].trim() === col2Name.trim()
    ) {
      return row;
    }
  }
  return null;
};

// ARRAY
export const findColDataArr = (
  data: any[],
  colName: string,
  col: string = "country"
): any[] | null => {
  if (data[0][col] === undefined) return null;
  return data.filter(
    (row) => row[col].trim().toLowerCase() === colName.trim().toLowerCase()
  );
};

export const uniqueCols = (row: { [index: string]: any }): string[] => {
  return Object.keys(row);
};
export const uniqueColNames = (
  data: any[],
  col: string = "commodity"
): string[] => {
  const colNames: { [colName: string]: boolean } = {};
  for (let row of data) {
    if (!colNames[row[col]]) {
      colNames[row[col]] = true;
    }
  }
  return Object.keys(colNames);
};

export const findTotalExportCol = (
  data: any[],
  col: string = "commodity"
): any[] | null => {
  //
  const colNames: string[] = uniqueColNames(data, col);
  const cols: string[] = uniqueCols(data[0]).filter((col) => Number(col));
  const totalExports: any[] = [];
  for (let colName of colNames) {
    const exportCommodity: { [index: string]: any } = {};
    exportCommodity[`${col}`] = colName;
    for (let col of cols) {
      exportCommodity[`${col}`] = 0;
    }
    for (let row of data) {
      if (row[col] === colName) {
        for (let col of cols) {
          exportCommodity[`${col}`] += row[col];
        }
      }
    }
    totalExports.push(exportCommodity);
  }
  return totalExports;
};

// return into a value
export const growthRate = (
  row: { [index: string]: any },
  firstPeriod: string,
  secondPeriod: string
): Decimal => {
  const firstData: Decimal = new Decimal(row[firstPeriod]);
  const secondData: Decimal = new Decimal(row[secondPeriod]);
  const growth: Decimal = secondData.minus(firstData).div(firstData);
  return growth;
};
export const sumBased2Col = (
  data: any[],
  numColName: string,
  categoricColName: string,
  categoricCol: string = "commodity"
): Decimal => {
  //
  let totalSum: Decimal = new Decimal(0);
  for (let row of data) {
    if (row[categoricCol].trim() === categoricColName.trim()) {
      totalSum = totalSum.plus(row[numColName]);
    }
  }
  return totalSum;
};
