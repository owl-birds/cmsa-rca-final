import { Decimal } from "decimal.js";
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

export const rca_basic = (
  country_commodity_export: number,
  world_commodity_export: number,
  total_country_export: number,
  total_world_export: number
): Decimal => {
  const upper = new Decimal(country_commodity_export).div(
    world_commodity_export
  );
  const lower = new Decimal(total_country_export).div(total_world_export);
  return upper.div(lower);
};
// console.log(rca_basic(123.7263624, 10000, 371.4100738, 558777));
