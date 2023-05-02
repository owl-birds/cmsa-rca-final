import {
  findColRow,
  growthRate,
  findRow2Col,
  findColDataArr,
  sumBased2Col,
  uniqueColNames,
  uniqueCols,
  findTotalExportCol,
  totalExportPerYear,
} from "./helpers";
import { Decimal } from "decimal.js";

export interface CMSA_Two_Level_Result {
  country: string;
  exportDifference: Decimal;
  worldGrowthEffect: Decimal;
  commodityEffect?: Decimal;
  regionEffect?: Decimal;
  competitivenessEffect: Decimal;
}

const growthRatesCol = (
  data: { [index: string]: any }[],
  first_period: string,
  second_period: string,
  // col: string = "commodity"
  col: string
) => {
  const result: { [commodity: string]: Decimal | string } = {};
  for (let row of data) {
    result[row[col]] = growthRate(row, first_period, second_period);
  }
  result["col"] = col;
  return result;
};

// WORLD GROWTH EFFECT
export const worldGrowthEffect = (
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

// COMMMODITY/REGIONAL EFFECT
export const commodityRegEffect = (
  world_growth_rates: {
    [index: string]: any;
  },
  world_growth_rate: Decimal,
  country_exports: { [index: string]: any }[],
  first_period: string | number,
  col: string = "commodity"
) => {
  //
  let result: Decimal = new Decimal(0);
  for (let row_commodity of country_exports) {
    result = result.plus(
      world_growth_rates[row_commodity[col]]
        .minus(world_growth_rate)
        .times(row_commodity[first_period])
    );
  }
  return result;
};

// COMPETITIVENESSS EFFECT
export const competitivenessEffect = (
  country_growth_rates: { [index: string]: any },
  world_growth_rates: { [index: string]: any },
  country_exports: { [index: string]: any }[],
  first_period: string,
  col: string
) => {
  //
  let result = new Decimal(0);
  for (let row_commodity of country_exports) {
    result = result.plus(
      country_growth_rates[row_commodity[col]]
        .minus(world_growth_rates[row_commodity[col]])
        .times(row_commodity[first_period])
    );
  }
  return result;
};

// TWO LEVEL CMSA
export const twoLevelCMSA = (
  country_name: string,
  country_data: { [index: string]: any }[],
  world_data: { [index: string]: any }[],
  first_period: string,
  second_period: string,
  cmsa_type: string, // commodity or region or partner
  // default value
  // country_col: string = "country"
  total_col_indicator: string = "total"
): CMSA_Two_Level_Result => {
  //
  const result: CMSA_Two_Level_Result = {
    country: country_name,
    exportDifference: new Decimal(0),
    worldGrowthEffect: new Decimal(0),
    competitivenessEffect: new Decimal(0),
  };
  // COUNTRY
  const country_total_exports = totalExportPerYear(
    country_data,
    total_col_indicator,
    cmsa_type
  );
  const country_growth_rates = growthRatesCol(
    country_data,
    first_period,
    second_period,
    cmsa_type
  );
  // WORLD
  const world_total_exports = totalExportPerYear(
    world_data,
    total_col_indicator,
    cmsa_type
  );
  const world_growth_rates = growthRatesCol(
    world_data,
    first_period,
    second_period,
    cmsa_type
  );
  const world_growth_rate = growthRate(
    world_total_exports!,
    first_period,
    second_period
  );
  //
  result["exportDifference"] = country_total_exports![second_period].minus(
    country_total_exports![first_period]
  );
  //
  result["worldGrowthEffect"] = worldGrowthEffect(
    world_growth_rate,
    country_total_exports!,
    first_period,
    second_period
  );
  //
  if (cmsa_type === "commodity") {
    result["commodityEffect"] = commodityRegEffect(
      world_growth_rates,
      world_growth_rate,
      country_data,
      first_period,
      cmsa_type
    );
  }
  if (cmsa_type === "region") {
    result["regionEffect"] = commodityRegEffect(
      world_growth_rates,
      world_growth_rate,
      country_data,
      first_period,
      cmsa_type
    );
  }
  //
  result["competitivenessEffect"] = competitivenessEffect(
    country_growth_rates,
    world_growth_rates,
    country_data,
    first_period,
    cmsa_type
  );
  return result;
};
