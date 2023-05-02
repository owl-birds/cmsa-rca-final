// helpers methods/funcs
import { findColRow, growthRate } from "./helpers";
import { Decimal } from "decimal.js";

export interface CMSA_One_Level_Result {
  country: string;
  exportDifference: Decimal;
  worldGrowthEffect: Decimal;
  competitivenessEffect: Decimal;
}

export const worldGrowthEffect = (
  //   worldRow: { [index: string]: any },
  //   countryRow: { [index: string]: any },
  //   firstPeriod: string,
  //   secondPeriod: string
  worldGrowthRate: Decimal,
  countryFirstPeriodExport: Decimal
): Decimal => {
  //   const worldGrowthRate: Decimal = new Decimal(
  //     growthRate(worldRow, firstPeriod, secondPeriod)
  //   );
  //   const countryFirstPeriodExport: Decimal = new Decimal(
  //     countryRow[firstPeriod]
  //   );
  return worldGrowthRate.times(countryFirstPeriodExport);
};

export const competitivenessEffect = (
  worldGrowthRate: Decimal,
  countryGrowthRate: Decimal,
  countryFirstPeriodExport: Decimal
): Decimal => {
  return countryGrowthRate
    .minus(worldGrowthRate)
    .times(countryFirstPeriodExport);
};

export const oneLevelCMSA = (
  worldRow: { [index: string]: any },
  countryRow: { [index: string]: any },
  firstPeriod: string,
  secondPeriod: string,
  country: string
): CMSA_One_Level_Result => {
  const worldGrowthRate: Decimal = growthRate(
    worldRow,
    firstPeriod,
    secondPeriod
  );
  const countryGrowthRate: Decimal = growthRate(
    countryRow,
    firstPeriod,
    secondPeriod
  );
  const worldGrowthEffectResult: Decimal = worldGrowthEffect(
    worldGrowthRate,
    countryRow[firstPeriod]
  );
  const competitivenessEffectResult: Decimal = competitivenessEffect(
    worldGrowthRate,
    countryGrowthRate,
    countryRow[firstPeriod]
  );
  return {
    country,
    worldGrowthEffect: worldGrowthEffectResult,
    competitivenessEffect: competitivenessEffectResult,
    exportDifference: new Decimal(countryRow[secondPeriod]).minus(
      countryRow[firstPeriod]
    ),
  };
};
