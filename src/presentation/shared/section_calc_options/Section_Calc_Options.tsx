import classes from "./Section_Calc_Options.module.scss";

import { useState } from "react";
import {
  use_country_file_store,
  Uploaded_Country_File_State,
} from "../../../application/states/country.state";
import {
  use_world_file_store,
  Uploaded_World_File_State,
} from "../../../application/states/world.state";
// METHODS
// datas
import {
  avail_methods,
  cmsa_types,
  rca_types,
} from "../../../infrastructure/all_methods";
// state
import {
  use_calculation_store,
  Calculation_State_Interface,
} from "../../../application/states/calculation.state";
import Select from "../../shared/select/Select";

// SERVICES
import {
  get_country_years_service,
  get_unique_values_country,
  get_unique_values_country_v2,
} from "../../../application/services/country_data.service";
import { get_world_years_service } from "../../../application/services/world_data.service";
import { get_years_intersection } from "../../../application/services/general_data.service";
import Feedback_Msg from "../../shared/error_msg/Feedback_Msg";

// CALCULATION SERVICES
import {
  calculation_cmsa_three_level_module_service,
  calculation_cmsa_two_level_module_service,
  calculation_cmsa_one_level_module_service,
  calculation_rca_basic_service,
} from "../../../application/services/calculation.service";
import {
  findColDataArr,
  uniqueColNames,
  // uniqueCols,
} from "../../../application/analyser_module/helpers";
import Multi_Dropdown_checkbox from "../multi_dropdown_select_checkbox/Multi_Dropdown_checkbox";

interface Props {
  nav_id: string;
}

const Section_Calc_Options = (props: Props) => {
  const { nav_id } = props;
  // pretty bad for the memmory, i think
  const country_data = use_country_file_store(
    (state: Uploaded_Country_File_State) => state.data
  );
  const country_data_columns = use_country_file_store(
    (state: Uploaded_Country_File_State) => state.columns
  );
  const world_data = use_world_file_store(
    (state: Uploaded_World_File_State) => state.data
  );
  const world_data_columns = use_world_file_store(
    (state: Uploaded_World_File_State) => state.columns
  );
  //
  const country_years = get_country_years_service();
  const world_years = get_world_years_service();
  const years_in_both = get_years_intersection();
  //
  // global state zustand
  //
  const first_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.first_period
  );
  const second_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.second_period
  );
  const country_name = use_calculation_store(
    (state: Calculation_State_Interface) => state.country
  );
  const country_arr = use_calculation_store(
    (state: Calculation_State_Interface) => state.country_arr
  );
  const method = use_calculation_store(
    (state: Calculation_State_Interface) => state.method_type
  );
  const method_sub_type = use_calculation_store(
    (state: Calculation_State_Interface) => state.method_sub_type
  );
  // below need to be improved
  // cause maybe the format for every data that will
  // be inputted will maybe different
  const unique_countries = country_data
    ? get_unique_values_country("country")
    : [];
  const unique_countries_v2 = country_data
    ? get_unique_values_country_v2("country")
    : [];
  console.log("SELECTEDS COUNTRY:::MULTIPLE", country_arr);
  console.log("SELECTEDS COUNTRY NAME :::: SINGLE", country_name);
  // console.log(unique_countries_v2);
  //
  //
  const set_first_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_first_period
  );
  const set_second_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_second_period
  );
  const set_country_name = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_country
  );
  const set_country_arr = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_country_arr
  );
  //
  // result
  const add_result_advance = use_calculation_store(
    (state: Calculation_State_Interface) => state.add_result_advance
  );
  const add_multiple_result_advance = use_calculation_store(
    (state: Calculation_State_Interface) => state.add_multiple_results_advance
  );
  const result_advance = use_calculation_store(
    (state: Calculation_State_Interface) => state.result_advance
  );
  // result
  // start calculation
  // calculation process state
  const [calculation_msg, set_calculation_msg] = useState<string | null>(null);
  const [is_error, set_is_error] = useState<boolean | null>(null);

  const start_calculation = async () => {
    // there is a bug in here
    // when we cahnge the method and the conditional
    // state is still saved
    // do we need to clean calculation state everything
    // the method and sub tyoe change

    // checking the data
    if (!country_data || country_data.length === 0) {
      set_calculation_msg(() => "PLEASE INPUT COUNTRY DATA");
      set_is_error(() => true);
      return;
    }
    if (!world_data || world_data.length === 0) {
      set_calculation_msg(() => "PLEASE INPUT WORLD DATA");
      set_is_error(() => true);
      return;
    }
    // checking the data

    // console.log("start calculation");
    // validate the method options
    if (method === avail_methods[0]) {
      // CMSA
      // cheking the periods
      if (
        !first_period ||
        !second_period ||
        Number(second_period) <= Number(first_period)
      ) {
        // console.log("INVALID PERIODS", method);
        set_calculation_msg(() => "INVALID PERIODS");
        set_is_error(() => true);
        return;
      }
      // checking the country if it is selected
      // if (!country_name) {
      if (country_arr?.length === 0 || !country_arr) {
        // console.log("CHOOSE COUNTRY", method);
        set_calculation_msg(() => "CHOOSE A COUNTRY");
        set_is_error(() => true);
        return;
      }
    } else if (method === avail_methods[1]) {
      // RCA
      // cheking the periods
      if (!first_period) {
        // console.log("INVALID PERIODS", method);
        set_calculation_msg(() => "INVALID PERIODS");
        set_is_error(() => true);
        return;
      }
      // checking the country if it is selected
      // if (!country_name) {
      if (country_arr?.length === 0 || !country_arr) {
        // console.log("CHOOSE COUNTRY", method);
        set_calculation_msg(() => "CHOOSE A COUNTRY");
        set_is_error(() => true);
        return;
      }
    }

    // validate the method options

    // clean local state everytime we pass the validations
    set_calculation_msg(() => null);
    set_is_error(() => null);

    //////
    // below u can return some feedback if the
    // calculation is succesful or failed
    //////

    // start calcuilation
    if (method === avail_methods[0] && country_arr) {
      // CMSA
      switch (method_sub_type) {
        case cmsa_types[0]:
          console.log("CMSA THREE");

          // should be some kinf of error cathing here
          // to give feedback to the user
          // console.log("HELLOOOOOOOOOO");
          for (let selected of country_arr) {
            const result_three =
              await calculation_cmsa_three_level_module_service(
                world_data!,
                findColDataArr(country_data, selected.value, "country")!,
                selected.value,
                `${first_period}`,
                `${second_period}`,
                country_data_columns!,
                world_data_columns!
              );
            // console.log(result_three);
            if (result_three.is_error) {
              set_calculation_msg(() => `${result_three.message}`);
              set_is_error(() => true);
              return;
            }
            // ADDING TO GLOBAL STATE
            result_three.result &&
              add_result_advance(result_three.result, method, method_sub_type);
            // ADDING TO GLOBAL STATE
          }
          // const result_three =
          //   await calculation_cmsa_three_level_module_service(
          //     world_data!,
          //     findColDataArr(country_data, country_name!, "country")!,
          //     country_name!,
          //     `${first_period}`,
          //     `${second_period}`,
          //     country_data_columns!,
          //     world_data_columns!
          //   );
          // // console.log(result_three);
          // if (result_three.is_error) {
          //   set_calculation_msg(() => `${result_three.message}`);
          //   set_is_error(() => true);
          //   return;
          // }
          // // ADDING TO GLOBAL STATE
          // result_three.result &&
          //   add_result_advance(result_three.result, method, method_sub_type);
          // // ADDING TO GLOBAL STATE
          break;
        case cmsa_types[1]:
          console.log("CMSA TWO COM");

          for (let selected of country_arr) {
            const result_two_com =
              await calculation_cmsa_two_level_module_service(
                world_data,
                // // TEST
                // findColDataArr(country_data!, "dunia", "country")!,
                // // TEST
                findColDataArr(country_data, selected.value, "country")!,
                selected.value,
                `${first_period}`,
                `${second_period}`,
                country_data_columns!,
                world_data_columns!,
                method_sub_type
              );
            // console.log(result_two_com);
            if (result_two_com.is_error) {
              set_calculation_msg(() => `${result_two_com.message}`);
              set_is_error(() => true);
              return;
            }
            // ADDING TO GLOBAL STATE
            result_two_com.result &&
              add_result_advance(
                result_two_com.result,
                method,
                method_sub_type
              );
            // ADDING TO GLOBAL STATE
          }
          break;
        case cmsa_types[2]:
          console.log("CMSA TWO REG/PART");

          for (let selected of country_arr) {
            const result_two_reg =
              await calculation_cmsa_two_level_module_service(
                world_data,
                findColDataArr(country_data, selected.value, "country")!,
                selected.value,
                `${first_period}`,
                `${second_period}`,
                country_data_columns!,
                world_data_columns!,
                method_sub_type
              );
            // console.log(result_two_reg);
            if (result_two_reg.is_error) {
              set_calculation_msg(() => `${result_two_reg.message}`);
              set_is_error(() => true);
              return;
            }
            // ADDING TO GLOBAL STATE
            result_two_reg.result &&
              add_result_advance(
                result_two_reg.result,
                method,
                method_sub_type
              );
            // ADDING TO GLOBAL STATE
          }
          break;
        case cmsa_types[3]:
          console.log("CMSA ONE");

          for (let selected of country_arr) {
            const result_one = await calculation_cmsa_one_level_module_service(
              world_data[0], // need to reconsidered again
              findColDataArr(country_data, selected.value, "country")![0],
              selected.value,
              `${first_period}`,
              `${second_period}`,
              country_data_columns!
            );
            // console.log(result_one);
            if (result_one.is_error) {
              set_calculation_msg(() => `${result_one.message}`);
              set_is_error(() => true);
              return;
            }
            // ADDING TO GLOBAL STATE
            result_one.result &&
              add_result_advance(result_one.result, method, method_sub_type);
            // ADDING TO GLOBAL STATE
          }
          break;
        default:
          set_calculation_msg(() => "METHOD NOT FOUND");
          set_is_error(() => true);
          return; // break;
      }
      // if the calculation succed
      set_calculation_msg(() => "CALCULATION COMPLETED");
      set_is_error(() => false);
      return;
    } else if (method === avail_methods[1] && country_arr) {
      // RCA
      switch (method_sub_type) {
        case rca_types[0]:
          console.log("RCA BASIC");

          for (let selected of country_arr) {
            const result_rca_basic = await calculation_rca_basic_service(
              world_data,
              findColDataArr(country_data, selected.value, "country")!,
              selected.value,
              `${first_period}`,
              country_data_columns!,
              world_data_columns!,
              country_years,
              world_years,
              uniqueColNames(
                findColDataArr(country_data, selected.value, "country")!
              )
              // get_unique_values_country("commodity", false)
            );
            // console.log("rca basic", result_rca_basic);
            if (result_rca_basic.is_error) {
              set_calculation_msg(() => `${result_rca_basic.message}`);
              set_is_error(() => true);
              return;
            }
            // ADDING TO GLOBAL STATE
            result_rca_basic.result &&
              add_multiple_result_advance(
                result_rca_basic.result,
                method,
                method_sub_type
              );
            // ADDING TO GLOBAL STATE
          }
          break;
        default:
          set_calculation_msg(() => "METHOD NOT FOUND");
          set_is_error(() => true);
          return; // break;
      }
      // if the calculation succed
      set_calculation_msg(() => "CALCULATION COMPLETED");
      set_is_error(() => false);
      return;
    }

    ///////////////////////////////
    set_calculation_msg(
      () => "METHOD NOT FOUND, ERROR IN CALCULATION LOGIC/PROCESS"
    );
    set_is_error(() => true);
    //////////////////////////////
  };
  return (
    <section id={nav_id}>
      <div className={classes.section_title}>
        <div></div>
        <h4>CALCULATION OPTIONS</h4>
        <div></div>
      </div>
      {/* METHOD OPTIONS TO DO CALCULATIONS */}
      {world_data && // u can use some boolean value here
      country_data && // and u dont have to have the data here
      ((method === avail_methods[0] && // CMSA
        method_sub_type !== null &&
        cmsa_types.indexOf(method_sub_type!) !== -1) ||
        (method === avail_methods[1] && // RCA
          method_sub_type !== null &&
          rca_types.indexOf(method_sub_type!) !== -1)) ? (
        <div className={classes.method_options}>
          {/* CMSA */}
          {method === avail_methods[0] &&
          method_sub_type !== null &&
          cmsa_types.indexOf(method_sub_type!) !== -1 ? (
            <>
              <div className={classes.year_options}>
                <h1>{`${method} ${method_sub_type}`}</h1>
                <h4>Choose Years</h4>
                <div className={classes.year_box}>
                  <Select
                    options={years_in_both}
                    default_value="choose first period"
                    set_selected_opt={set_first_period}
                  />
                  <Select
                    options={years_in_both}
                    default_value="choose second period"
                    set_selected_opt={set_second_period}
                  />
                </div>
                <h4>Choose a country</h4>
                <Multi_Dropdown_checkbox
                  options={unique_countries_v2}
                  placeholder={"year"}
                  set_selected={set_country_arr}
                />
                {/* <Select
                  options={unique_countries}
                  default_value="choose a country"
                  set_selected_opt={set_country_name}
                /> */}
              </div>
              <div className={classes.btn_box}>
                <button onClick={start_calculation} className="btn_default">
                  process
                </button>
              </div>
              {calculation_msg && is_error !== null && (
                <Feedback_Msg message={calculation_msg} is_error={is_error} />
              )}
            </>
          ) : null}
          {/* CMSA */}

          {/* RCA */}
          {method === avail_methods[1] &&
          method_sub_type !== null &&
          rca_types.indexOf(method_sub_type!) !== -1 ? (
            <>
              <div className={classes.year_options}>
                <h1>{`${method} ${method_sub_type}`}</h1>
                <h4>Choose Years</h4>
                <div className={classes.year_box}>
                  <Select
                    options={years_in_both}
                    default_value="choose year"
                    set_selected_opt={set_first_period}
                  />
                </div>
                <h4>Choose a country</h4>
                <Multi_Dropdown_checkbox
                  options={unique_countries_v2}
                  placeholder={"year"}
                  set_selected={set_country_arr}
                />
              </div>
              <div className={classes.btn_box}>
                <button onClick={start_calculation} className="btn_default">
                  process
                </button>
              </div>
              {calculation_msg && is_error !== null && (
                <Feedback_Msg message={calculation_msg} is_error={is_error} />
              )}
            </>
          ) : null}
          {/* RCA */}
        </div>
      ) : null}
      {/* METHOD OPTIONS TO DO CALCULATIONS */}
    </section>
  );
};

export default Section_Calc_Options;
