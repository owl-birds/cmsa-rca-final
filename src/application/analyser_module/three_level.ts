import {
  findColRow,
  growthRate,
  findRow2Col,
  findColDataArr,
  sumBased2Col,
  uniqueColNames,
  uniqueCols,
  findTotalExportCol,
} from "./helpers";
import { Decimal } from "decimal.js";

export interface CMSA_Three_Level_Result {
  country: string;
  exportDifference: Decimal;
  worldGrowthEffect: Decimal;
  commodityEffect: Decimal;
  regionalMarketEffect: Decimal;
  competitivenessEffect: Decimal;
}

// total all commodity export
const totalExportPerYear = (
  data: any[],
  colName: string = "total",
  col: string = "commodity",
  isTotalExist: boolean = true
): { [index: string]: any } => {
  // finding if there total exist in our data
  let totalExport: { [index: string]: any } | null = findColRow(
    data,
    colName,
    col
  );
  if (totalExport && isTotalExist) return totalExport;
  // below if we isTotalDoesnt exist in our data
  // so we need to find it, by summing up every
  // export value
  totalExport = {};
  // only the year get
  const cols: string[] = Object.keys(data[0]).filter((col) => Number(col));
  for (let c of cols) {
    if (!totalExport[c]) {
      totalExport[c] = 0;
      continue;
    }
  }
  for (let row of data) {
    if (row[col] === colName) continue;
    for (let c of cols) {
      totalExport[c] += row[c];
    }
  }
  totalExport[`${col}`] = colName;
  return totalExport;
};

// world growth based on col list
const growthRateListColArr = (
  data: { [index: string]: any }[],
  firstPeriod: string,
  secondPeriod: string,
  col: string = "commodity"
): { [index: string]: any }[] => {
  const growthRateList: { [index: string]: any }[] = [];
  for (let row of data) {
    const growth: { [index: string]: any } = {};
    growth[`${col}`] = row[col];
    growth[`rate`] = growthRate(row, firstPeriod, secondPeriod);
    growthRateList.push(growth);
  }
  return growthRateList;
};
const growthRateListColObj = (
  data: { [index: string]: any }[],
  firstPeriod: string,
  secondPeriod: string,
  col: string = "commodity"
): { [col: string]: Decimal } => {
  //
  const growthRates: { [col: string]: Decimal } = {};
  for (let row of data) {
    growthRates[`${row[col]}`] = growthRate(row, firstPeriod, secondPeriod);
  }
  return growthRates;
};
const growthRateNBaseExport2Col = (
  data: { [index: string]: any }[],
  firstPeriod: string,
  secondPeriod: string,
  firstCol: string = "commodity",
  secondCol: string = "region"
): { [index: string]: any }[] => {
  const result: { [index: string]: any }[] = [];
  for (let row of data) {
    const growth: { [index: string]: any } = {};
    growth[`${firstCol}`] = row[firstCol];
    growth[`${secondCol}`] = row[secondCol];
    growth["rate"] = growthRate(row, firstPeriod, secondPeriod);
    growth["baseExport"] = row[firstPeriod];
    result.push(growth);
  }
  return result;
};

// WORLD GROWTH EFFECT
const worldGrowthEffect = (
  // totalWorldExport: { [index: string]: any },
  worldGrowth: Decimal,
  totalCountryExport: { [index: string]: any },
  firstPeriod: string,
  secondPeriod: string
): Decimal => {
  // const worldGrowth: Decimal = growthRate(
  //   totalWorldExport,
  //   firstPeriod,
  //   secondPeriod
  // );
  return worldGrowth.times(totalCountryExport[firstPeriod]);
};

// COMMODITY EFFECT
const commodityEffect = (
  worldGrowth: Decimal,
  worldCommoditiesGrowth: { [index: string]: any }[],
  countryExportPerCommodities: { [index: string]: any }[],
  firstPeriod: string,
  col: string = "commodity"
): Decimal => {
  //
  let comEffect: Decimal = new Decimal(0);
  const diff: { [commodity: string]: Decimal } = {};
  // the difference for each world growth rate per commodity to the
  // total world growth rate
  for (let row of worldCommoditiesGrowth) {
    diff[`${row[col]}`] = row["rate"].minus(worldGrowth);
  }
  for (let row of countryExportPerCommodities) {
    comEffect = comEffect.plus(diff[row[col]].times(row[firstPeriod]));
  }
  return comEffect;
};
// REGIONAL MARKET EFFECT
const regionalMarketEffect = (
  worldCommoditiesGrowth: { [commodity: string]: Decimal },
  countryCommoditiesGrowth: { [commodity: string]: Decimal },
  countryExportData: { [index: string]: any }[],
  firstPeriod: string,
  col: string = "commodity"
  // partnerList: string[]
): Decimal => {
  let regMarEffect: Decimal = new Decimal(0);
  for (let commodity of Object.keys(countryCommoditiesGrowth)) {
    let diff: Decimal = countryCommoditiesGrowth[commodity].minus(
      worldCommoditiesGrowth[commodity]
    );
    for (let row of countryExportData) {
      if (row[col] === commodity) {
        regMarEffect = regMarEffect.plus(diff.times(row[firstPeriod]));
      }
    }
  }
  return regMarEffect;
};
// COMPETITIVENESS EFFECT
const competitivenessEffect = (
  countryCommodityGrowth: { [col: string]: Decimal },
  countryCommodityRegionGrowth: { [index: string]: any }[],
  col: string = "commodity"
): Decimal => {
  let compeEffect: Decimal = new Decimal(0);
  for (let row of countryCommodityRegionGrowth) {
    //
    compeEffect = compeEffect.plus(
      row["rate"]
        .minus(countryCommodityGrowth[row[col]])
        .times(row["baseExport"])
    );
  }
  return compeEffect;
};

// // three level
export const threeLevelCMSA = (
  worldData: { [index: string]: any }[],
  countryData: { [index: string]: any }[],
  countryName: string,
  firstPeriod: string,
  secondPeriod: string,
  isTotalExist: boolean = true,
  totalIndicator: string = "total",
  firstCol: string = "commodity",
  secondCol: string = "region"
): CMSA_Three_Level_Result => {
  // COUNTRY
  const totalCountryExport: { [index: string]: any } = totalExportPerYear(
    countryData,
    totalIndicator,
    firstCol,
    isTotalExist
  );
  // const totalCountryGrowth: Decimal = growthRate(
  //   totalCountryExport,
  //   firstPeriod,
  //   secondPeriod
  // );
  const totalCountryExportCommodities: any[] = findTotalExportCol(
    countryData,
    firstCol
  )!;
  const countryCommoditiesGrowth: { [commodity: string]: Decimal } =
    growthRateListColObj(
      totalCountryExportCommodities,
      firstPeriod,
      secondPeriod,
      firstCol
    );
  const countryCommoditiesRegionGrowth: { [index: string]: any }[] =
    growthRateNBaseExport2Col(
      countryData,
      firstPeriod,
      secondPeriod,
      firstCol,
      secondCol
    );
  // WORLD
  const totalWorldExport: { [index: string]: any } = totalExportPerYear(
    worldData,
    totalIndicator,
    firstCol,
    isTotalExist
  );
  const totalWorldGrowth: Decimal = growthRate(
    totalWorldExport,
    firstPeriod,
    secondPeriod
  );
  const worldCommoditiesGrowthArr: { [index: string]: any }[] =
    growthRateListColArr(worldData, firstPeriod, secondPeriod, firstCol);
  const worldCommoditiesGrowthObj: { [commodity: string]: Decimal } =
    growthRateListColObj(worldData, firstPeriod, secondPeriod, firstCol);
  //
  // world growth effect
  const wge: Decimal = worldGrowthEffect(
    // totalWorldExport,
    totalWorldGrowth,
    totalCountryExport,
    firstPeriod,
    secondPeriod
  );
  // commodities effect
  const comEffect: Decimal = commodityEffect(
    totalWorldGrowth,
    worldCommoditiesGrowthArr,
    totalCountryExportCommodities,
    firstPeriod,
    firstCol
  );
  // regional market effect
  const rge: Decimal = regionalMarketEffect(
    worldCommoditiesGrowthObj,
    countryCommoditiesGrowth,
    countryData,
    firstPeriod,
    firstCol
  );
  // competitiveness effect
  const compeEffect: Decimal = competitivenessEffect(
    countryCommoditiesGrowth,
    countryCommoditiesRegionGrowth,
    firstCol
  );
  return {
    country: countryName,
    exportDifference: new Decimal(totalCountryExport[secondPeriod]).minus(
      totalCountryExport[firstPeriod]
    ),
    worldGrowthEffect: wge,
    commodityEffect: comEffect,
    regionalMarketEffect: rge,
    competitivenessEffect: compeEffect,
  };
};
