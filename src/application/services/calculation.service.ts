// u should try and catch here
import { use_calculation_store } from "../states/calculation.state";
import { Decimal } from "decimal.js";
import { CMSA_Three_Level_Result } from "../analyser_module/three_level";
import { CMSA_Two_Level_Result } from "../analyser_module/two_level";
import { CMSA_One_Level_Result } from "../analyser_module/one_level";
import {
  Validate_Data_Column,
  validate_data_columns,
} from "../analyser_module/data_module";

export const clear_calculation_service = () => {
  const clear_state = use_calculation_store.getState().clear_state;
  clear_state();
};

export const set_result_service = (new_result: any[]) => {
  const set_result = use_calculation_store.getState().set_result;
  set_result(new_result);
};

export const add_result_service = (new_result: {}) => {
  const add_result = use_calculation_store.getState().add_result;
  add_result(new_result);
};

/////////////////// CMSA /////////////////////////
export const calculation_cmsa_one_level_module_service = async (
  world_data: { [index: string]: any }, // what if the user doesnt want to find the total export,
  // they hust put all the data in there,
  // need to be reconsidered
  country_data: { [index: string]: any },
  country_name: string,
  first_period: string,
  second_period: string,
  country_columns: string[]
  // world_columns: string[]
) => {
  //
  let validate_data_result: Validate_Data_Column;

  // validate country
  validate_data_result = validate_data_columns(
    country_columns,
    ["country"],
    "country"
  );
  if (!validate_data_result.is_pass)
    return { is_error: true, message: validate_data_result.message };
  // validate country

  // validate world
  // world data only consist of year column
  // validate world

  try {
    const { oneLevelCMSA } = await import("../analyser_module/one_level");
    const temp_result: any = oneLevelCMSA(
      world_data,
      country_data,
      first_period,
      second_period,
      country_name
    );
    const result: { [col_name: string]: string | number } = {};
    for (let key of Object.keys(temp_result)) {
      result[key] = temp_result[key].toString();
      // console.log(key, temp_result[key].toString());
    }
    result["periods"] = `${first_period}-${second_period}`;
    return { is_error: false, result };
  } catch (error: any) {
    return {
      is_error: true,
      message: `DATA MUST BE IN NUMBER, error in calculation, ${error.message}`,
    };
  }
};

export const calculation_cmsa_two_level_module_service = async (
  world_data: { [index: string]: any }[],
  country_data: { [index: string]: any }[],
  country_name: string,
  first_period: string,
  second_period: string,
  country_columns: string[],
  world_columns: string[],
  two_level_type: string, // commodity or region/partner
  isTotalExist: boolean = true,
  totalIndicator: string = "total"
) => {
  const { cmsa_types } = await import("../../infrastructure/all_methods");
  //
  let validate_data_result: Validate_Data_Column;

  // validate country
  validate_data_result = validate_data_columns(
    country_columns,
    ["country", two_level_type === cmsa_types[1] ? "commodity" : "region"],
    "country"
  );
  if (!validate_data_result.is_pass)
    return { is_error: true, message: validate_data_result.message };
  // validate country
  // validate world
  validate_data_result = validate_data_columns(
    world_columns,
    [two_level_type === cmsa_types[1] ? "commodity" : "region"],
    "world"
  );
  if (!validate_data_result.is_pass)
    return { is_error: true, message: validate_data_result.message };
  // validate world

  try {
    const { twoLevelCMSA } = await import("../analyser_module/two_level");
    const temp_result: any = twoLevelCMSA(
      country_name,
      country_data,
      world_data,
      first_period,
      second_period,
      two_level_type === cmsa_types[1] ? "commodity" : "region",
      totalIndicator
    );
    const result: { [col_name: string]: string | number } = {};
    for (let key of Object.keys(temp_result)) {
      result[key] = temp_result[key].toString();
      // console.log(key, temp_result[key].toString());
    }
    result["periods"] = `${first_period}-${second_period}`;
    return { is_error: false, result };
  } catch (error: any) {
    return {
      is_error: true,
      message: `DATA MUST BE IN NUMBER, error in calculation, ${error.message}`,
    };
  }
};

export const calculation_cmsa_three_level_module_service = async (
  world_data: { [index: string]: any }[],
  country_data: { [index: string]: any }[],
  country_name: string,
  first_period: string,
  second_period: string,
  country_columns: string[],
  world_columns: string[],
  isTotalExist: boolean = true,
  totalIndicator: string = "total",
  first_col: string = "commodity",
  second_col: string = "region"
) => {
  //
  let validate_data_result: Validate_Data_Column;

  // validate country
  validate_data_result = validate_data_columns(
    country_columns,
    [first_col, second_col, "country"],
    "country"
  );
  if (!validate_data_result.is_pass)
    return { is_error: true, message: validate_data_result.message };
  // validate country
  // validate world
  validate_data_result = validate_data_columns(
    world_columns,
    [first_col],
    "world"
  );
  if (!validate_data_result.is_pass)
    return { is_error: true, message: validate_data_result.message };
  // validate world

  try {
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
    result["periods"] = `${first_period}-${second_period}`;
    return { is_error: false, result };
  } catch (error: any) {
    return {
      is_error: true,
      message: `DATA MUST BE IN NUMBER, error in calculation, ${error.message}`,
    };
  }
  // for (let key of Object.keys(test)) {
  //   console.log(key, test[key].toString());
  // }
};
/////////////////// CMSA /////////////////////////

/////////////////// RCA /////////////////////////
export const calculation_rca_basic_service = async (
  world_data: { [index: string]: any }[], // what if the user doesnt want to find the total export,
  country_data: { [index: string]: any }[],
  country_name: string,
  period: string,
  country_columns: string[],
  world_columns: string[],
  unique_country_years: number[] | string[],
  unique_world_years: number[] | string[],
  unique_commodities: string[],
  total_indicator: string = "total",
  commodity_indicator: string = "commodity",
  country_indicator: string = "country"
) => {
  // validate data
  let validate_data_result: Validate_Data_Column;
  // validate country
  validate_data_result = validate_data_columns(
    country_columns,
    [country_indicator, commodity_indicator],
    country_indicator
  );
  if (!validate_data_result.is_pass)
    return { is_error: true, message: validate_data_result.message };

  // validate world
  validate_data_result = validate_data_columns(
    world_columns,
    [commodity_indicator],
    "world"
  );
  if (!validate_data_result.is_pass)
    return { is_error: true, message: validate_data_result.message };

  // validate data

  try {
    const { rca_basic, total_col_export_year } = await import(
      "../analyser_module/rca"
    );
    const country_total_export_com_year = total_col_export_year(
      country_data,
      unique_country_years,
      commodity_indicator,
      total_indicator
    );
    const world_total_export_com_year = total_col_export_year(
      world_data,
      unique_world_years,
      commodity_indicator,
      total_indicator
    );
    const result: { [index: string]: any }[] = [];
    for (let commodity of unique_commodities) {
      const rca_result = rca_basic(
        country_total_export_com_year[commodity][period],
        world_total_export_com_year[commodity][period],
        country_total_export_com_year[total_indicator][period],
        world_total_export_com_year[total_indicator][period]
      );
      const temp_row: { [index: string]: any } = {};
      temp_row[commodity_indicator] = commodity;
      temp_row[country_indicator] = country_name;
      temp_row["period"] = period;
      temp_row["rca"] = rca_result.toString();
      result.push(temp_row);
    }
    return { is_error: false, result };

    // console.log(total_export_com_year);
    // // TEST
    // return [
    //   unique_commodities,
    //   country_total_export_com_year,
    //   world_total_export_com_year,
    // ];
    // // TEST
  } catch (error: any) {
    return {
      is_error: true,
      message: `DATA MUST BE IN NUMBER, error in calculation, ${error.message}`,
    };
  }
};
/////////////////// RCA /////////////////////////
