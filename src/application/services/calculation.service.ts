import { use_calculation_store } from "../states/calculation.state";
import { Decimal } from "decimal.js";
import { CMSA_Three_Level_Result } from "../analyser_module/three_level";

export const clear_calculation_service = () => {
  const clear_state = use_calculation_store.getState().clear_state;
  clear_state();
};

export const set_result_service = (new_result: any[]) => {
  const set_result = use_calculation_store.getState().set_result;
  set_result(new_result);
};

export const calculation_three_level_module_service = async (
  world_data: any[],
  country_data: any[],
  country_name: string,
  first_period: string,
  second_period: string,
  isTotalExist: boolean = true,
  totalIndicator: string = "total",
  first_col: string = "commodity",
  second_col: string = "region"
) => {
  //
  const { threeLevelCMSA } = await import("../analyser_module/three_level");
  const temp_result: any = threeLevelCMSA(
    world_data,
    country_data,
    country_name,
    first_period,
    second_period,
    isTotalExist,
    totalIndicator,
    first_col,
    second_col
  );
  const result: { [col_name: string]: string | number } = {};
  for (let key of Object.keys(temp_result)) {
    result[key] = temp_result[key].toString();
    // console.log(key, temp_result[key].toString());
  }
  return result;
  // for (let key of Object.keys(test)) {
  //   console.log(key, test[key].toString());
  // }
};
