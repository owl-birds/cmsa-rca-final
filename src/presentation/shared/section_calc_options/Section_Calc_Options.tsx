import classes from "./Section_Calc_Options.module.scss";

import { useRef, useState } from "react";
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
import {
  get_years_intersection,
  get_years_intersection_v2,
} from "../../../application/services/general_data.service";
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
import Simple_One_Checkbox from "../simple_one_checkbox/Simple_One_Checkbox";

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
  const years_in_both_v2 = get_years_intersection_v2();

  //
  // global state zustand ::: FOR CALCULATION STATE
  //
  const first_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.first_period
  );
  // const first_period_obj = use_calculation_store(
  //   (state: Calculation_State_Interface) => state.first_period_obj
  // );
  const second_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.second_period
  );
  const second_period_arr = use_calculation_store(
    (state: Calculation_State_Interface) => state.second_period_arr
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
  // console.log("SELECTEDS COUNTRY:::MULTIPLE", country_arr);
  // console.log("SELECTEDS COUNTRY NAME :::: SINGLE", country_name);
  // console.log(unique_countries_v2);
  //
  // console.log("new years_v2", years_in_both_v2);
  // console.log("second period::MULTIPLE", second_period_arr);
  // console.log("NEW FIRST PERIOD:::", first_period_obj);
  //
  //
  //

  // CALCULATION STATE FUNCTIONS
  const set_first_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_first_period
  );
  // const set_first_period_obj = use_calculation_store(
  //   (state: Calculation_State_Interface) => state.set_first_period_obj
  // );
  const set_second_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_second_period
  );
  const set_second_period_arr = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_second_period_arr
  );
  const set_country_name = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_country
  );
  const set_country_arr = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_country_arr
  );
  // CLEAN STATE EXCEPT METHOD and RESULT
  const clean_calc_state_ex_result_method = use_calculation_store(
    (state: Calculation_State_Interface) =>
      state.clear_state_except_result_method
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
  // const [is_check_inc_second_period, set_is_check_inc_second_period] =
  //   useState<boolean>(false);

  // INCREMENT OPTIONS
  const [is_check_inc_both_period, set_is_check_inc_both_period] =
    useState<boolean>(false);
  // REF FOR INCREMENTS
  const first_period_increment_input = useRef<null | HTMLInputElement>(null);
  const second_period_increment_input = useRef<null | HTMLInputElement>(null);

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
      // if (
      //   !first_period ||
      //   !second_period ||
      //   Number(second_period) <= Number(first_period)
      // ) {
      if (!first_period) {
        // console.log("INVALID PERIODS", method);
        set_calculation_msg(() => "SELECT FIRST PERIODS");
        set_is_error(() => true);
        return;
      }
      if (!is_check_inc_both_period) {
        if (!second_period_arr || second_period_arr?.length === 0) {
          set_calculation_msg(() => "SELECT SECOND PERIOD");
          set_is_error(() => true);
          return;
        } else if (second_period_arr && second_period_arr.length > 0) {
          // check the seconc period
          for (let year_arr of second_period_arr) {
            if (Number(first_period) >= Number(year_arr.value)) {
              set_calculation_msg(
                () =>
                  "SECOND PERIOD CANT BE THE SAME OR LOWER THEN FIRST PERIOD"
              );
              set_is_error(() => true);
              return;
            }
          }
        }
      } else if (is_check_inc_both_period) {
        if (!second_period) {
          set_calculation_msg(() => "SELECT SECOND PERIODS");
          set_is_error(() => true);
          return;
        }
        if (first_period === second_period) {
          set_calculation_msg(
            () => "SECOND PERIOD CANT BE THE SAME AS FIRST PERIOD"
          );
          set_is_error(() => true);
          return;
        }
        if (Number(first_period) > Number(second_period)) {
          set_calculation_msg(
            () => "FIRST PERIOD CANT BE LOWER THEN FIRST PERIOD"
          );
          set_is_error(() => true);
          return;
        }
        if (first_period_increment_input && second_period_increment_input) {
          const first_inc =
            first_period_increment_input.current as HTMLInputElement;
          const second_inc =
            second_period_increment_input.current as HTMLInputElement;
          if (!Number(first_inc.value)) {
            set_calculation_msg(() => "PLEASE A INPUT NUMBER IN INCREMENT_1");
            set_is_error(() => true);
            return;
          }
          if (!Number(second_inc.value)) {
            set_calculation_msg(() => "PLEASE A INPUT NUMBER IN INCREMENT_2");
            set_is_error(() => true);
            return;
          }
          if (Number(first_inc.value) > Number(second_inc.value)) {
            set_calculation_msg(
              () => "INCREMENT_2 MUST BIGGER THEN OR THE SAME AS INCREMENT_1"
            );
            set_is_error(() => true);
            return;
          }
        }
      }
      // checking the country if it is selected
      // if (!country_name) {
      if (country_arr?.length === 0 || !country_arr) {
        // console.log("CHOOSE COUNTRY", method);
        set_calculation_msg(() => "SELECT A COUNTRY");
        set_is_error(() => true);
        return;
      }
    } else if (method === avail_methods[1]) {
      // RCA
      // cheking the periods
      // if (!first_period) {
      if (!second_period_arr || second_period_arr.length === 0) {
        // console.log("INVALID PERIODS", method);
        set_calculation_msg(() => "SELECT PERIOD");
        set_is_error(() => true);
        return;
      }
      // checking the country if it is selected
      // if (!country_name) {
      if (country_arr?.length === 0 || !country_arr) {
        // console.log("CHOOSE COUNTRY", method);
        set_calculation_msg(() => "SELECT A COUNTRY");
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
    if (
      method === avail_methods[0] &&
      country_arr
      // && second_period_arr
    ) {
      // CMSA
      switch (method_sub_type) {
        case cmsa_types[0]:
          console.log("CMSA THREE");

          // should be some kinf of error cathing here
          // to give feedback to the user
          // console.log("HELLOOOOOOOOOO");
          if (!is_check_inc_both_period && second_period_arr) {
            for (let selected of country_arr) {
              const country_selected_data = findColDataArr(
                country_data,
                selected.value,
                "country"
              )!;
              for (let second_period_obj of second_period_arr) {
                const result_three =
                  await calculation_cmsa_three_level_module_service(
                    world_data!,
                    // findColDataArr(country_data, selected.value, "country")!,
                    country_selected_data,
                    selected.value,
                    `${first_period}`,
                    `${second_period_obj.value}`,
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
                  add_result_advance(
                    result_three.result,
                    method,
                    method_sub_type
                  );
                // ADDING TO GLOBAL STATE
              }
            }
          } else if (is_check_inc_both_period) {
            const first_inc = first_period_increment_input.current
              ? Number(first_period_increment_input.current.value)
              : 1;
            const second_inc = second_period_increment_input.current
              ? Number(second_period_increment_input.current.value)
              : 1;
            const max_year = Math.max(...years_in_both);

            for (let selected of country_arr) {
              const country_selected_data = findColDataArr(
                country_data,
                selected.value,
                "country"
              )!;
              let start_first = Number(first_period);
              let start_second = Number(second_period);
              while (
                start_first < start_second &&
                start_first < max_year &&
                start_second <= max_year
              ) {
                //chech
                if (
                  !country_selected_data[0][start_first] ||
                  !country_selected_data[0][start_second]
                ) {
                  start_first += first_inc;
                  start_second += second_inc;
                  continue;
                }
                //check
                const result_three =
                  await calculation_cmsa_three_level_module_service(
                    world_data!,
                    // findColDataArr(country_data, selected.value, "country")!,
                    country_selected_data,
                    selected.value,
                    `${start_first}`,
                    `${start_second}`,
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
                  add_result_advance(
                    result_three.result,
                    method,
                    method_sub_type
                  );
                // ADDING TO GLOBAL STATE
                start_first += first_inc;
                start_second += second_inc;
              }
            }
            // console.log(
            //   `MAX${max_year}\nfirst${start_first}\nsecond${start_second}`
            // );
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

          if (!is_check_inc_both_period && second_period_arr) {
            for (let selected of country_arr) {
              const country_selected_data = findColDataArr(
                country_data,
                selected.value,
                "country"
              )!;
              for (let second_period_obj of second_period_arr) {
                const result_two_com =
                  await calculation_cmsa_two_level_module_service(
                    world_data,
                    // // TEST
                    // findColDataArr(country_data!, "dunia", "country")!,
                    // // TEST
                    // findColDataArr(country_data, selected.value, "country")!,
                    country_selected_data,
                    selected.value,
                    `${first_period}`,
                    `${second_period_obj.value}`,
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
            }
          } else if (is_check_inc_both_period) {
            const first_inc = first_period_increment_input.current
              ? Number(first_period_increment_input.current.value)
              : 1;
            const second_inc = second_period_increment_input.current
              ? Number(second_period_increment_input.current.value)
              : 1;
            const max_year = Math.max(...years_in_both);

            for (let selected of country_arr) {
              const country_selected_data = findColDataArr(
                country_data,
                selected.value,
                "country"
              )!;
              let start_first = Number(first_period);
              let start_second = Number(second_period);
              while (
                start_first < start_second &&
                start_first < max_year &&
                start_second <= max_year
              ) {
                //chech
                if (
                  !country_selected_data[0][start_first] ||
                  !country_selected_data[0][start_second]
                ) {
                  start_first += first_inc;
                  start_second += second_inc;
                  continue;
                }
                //check
                const result_two_com =
                  await calculation_cmsa_two_level_module_service(
                    world_data,
                    // // TEST
                    // findColDataArr(country_data!, "dunia", "country")!,
                    // // TEST
                    // findColDataArr(country_data, selected.value, "country")!,
                    country_selected_data,
                    selected.value,
                    `${start_first}`,
                    `${start_second}`,
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
                start_first += first_inc;
                start_second += second_inc;
              }
            }
            // console.log(
            //   `MAX${max_year}\nfirst${start_first}\nsecond${start_second}`
            // );
          }
          break;
        case cmsa_types[2]:
          console.log("CMSA TWO REG/PART");

          if (!is_check_inc_both_period && second_period_arr) {
            for (let selected of country_arr) {
              const country_selected_data = findColDataArr(
                country_data,
                selected.value,
                "country"
              )!;
              for (let second_period_obj of second_period_arr) {
                const result_two_reg =
                  await calculation_cmsa_two_level_module_service(
                    world_data,
                    // findColDataArr(country_data, selected.value, "country")!,
                    country_selected_data,
                    selected.value,
                    `${first_period}`,
                    `${second_period_obj.value}`,
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
            }
          } else if (is_check_inc_both_period) {
            const first_inc = first_period_increment_input.current
              ? Number(first_period_increment_input.current.value)
              : 1;
            const second_inc = second_period_increment_input.current
              ? Number(second_period_increment_input.current.value)
              : 1;
            const max_year = Math.max(...years_in_both);

            for (let selected of country_arr) {
              const country_selected_data = findColDataArr(
                country_data,
                selected.value,
                "country"
              )!;
              let start_first = Number(first_period);
              let start_second = Number(second_period);
              while (
                start_first < start_second &&
                start_first < max_year &&
                start_second <= max_year
              ) {
                //chech
                if (
                  !country_selected_data[0][start_first] ||
                  !country_selected_data[0][start_second]
                ) {
                  start_first += first_inc;
                  start_second += second_inc;
                  continue;
                }
                //check
                const result_two_reg =
                  await calculation_cmsa_two_level_module_service(
                    world_data,
                    // findColDataArr(country_data, selected.value, "country")!,
                    country_selected_data,
                    selected.value,
                    `${start_first}`,
                    `${start_second}`,
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
                start_first += first_inc;
                start_second += second_inc;
              }
            }
            // console.log(
            //   `MAX${max_year}\nfirst${start_first}\nsecond${start_second}`
            // );
          }
          break;
        case cmsa_types[3]:
          console.log("CMSA ONE");

          if (!is_check_inc_both_period && second_period_arr) {
            for (let selected of country_arr) {
              const country_selected_data = findColDataArr(
                country_data,
                selected.value,
                "country"
              )!;
              for (let second_period_obj of second_period_arr) {
                const result_one =
                  await calculation_cmsa_one_level_module_service(
                    world_data[0], // need to reconsidered again
                    // findColDataArr(country_data, selected.value, "country")![0],
                    country_selected_data[0],
                    selected.value,
                    `${first_period}`,
                    `${second_period_obj.value}`,
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
                  add_result_advance(
                    result_one.result,
                    method,
                    method_sub_type
                  );
                // ADDING TO GLOBAL STATE
              }
            }
          } else if (is_check_inc_both_period) {
            const first_inc = first_period_increment_input.current
              ? Number(first_period_increment_input.current.value)
              : 1;
            const second_inc = second_period_increment_input.current
              ? Number(second_period_increment_input.current.value)
              : 1;
            const max_year = Math.max(...years_in_both);

            for (let selected of country_arr) {
              const country_selected_data = findColDataArr(
                country_data,
                selected.value,
                "country"
              )!;
              let start_first = Number(first_period);
              let start_second = Number(second_period);
              while (
                start_first < start_second &&
                start_first < max_year &&
                start_second <= max_year
              ) {
                //chech
                if (
                  !country_selected_data[0][start_first] ||
                  !country_selected_data[0][start_second]
                ) {
                  start_first += first_inc;
                  start_second += second_inc;
                  continue;
                }
                //check
                const result_one =
                  await calculation_cmsa_one_level_module_service(
                    world_data[0], // need to reconsidered again
                    // findColDataArr(country_data, selected.value, "country")![0],
                    country_selected_data[0],
                    selected.value,
                    `${start_first}`,
                    `${start_second}`,
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
                  add_result_advance(
                    result_one.result,
                    method,
                    method_sub_type
                  );
                // ADDING TO GLOBAL STATE

                start_first += first_inc;
                start_second += second_inc;
              }
            }
            // console.log(
            //   `MAX${max_year}\nfirst${start_first}\nsecond${start_second}`
            // );
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
    } else if (
      method === avail_methods[1] &&
      country_arr &&
      second_period_arr
    ) {
      // RCA
      switch (method_sub_type) {
        case rca_types[0]:
          console.log("RCA BASIC");

          for (let selected of country_arr) {
            for (let year_selected of second_period_arr) {
              const result_rca_basic = await calculation_rca_basic_service(
                world_data,
                findColDataArr(country_data, selected.value, "country")!,
                selected.value,
                `${year_selected.value}`,
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
                <Simple_One_Checkbox
                  is_check={is_check_inc_both_period}
                  set_is_check={set_is_check_inc_both_period}
                  label={"INCREMENT FOR BOTH PERIODS"}
                  function_need_to_run={clean_calc_state_ex_result_method}
                />
                <h4>Choose First and Second Period</h4>
                <div className={classes.year_box}>
                  {!is_check_inc_both_period && (
                    <>
                      <Select
                        options={years_in_both}
                        default_value="choose first period"
                        set_selected_opt={set_first_period}
                      />
                      <Multi_Dropdown_checkbox
                        options={years_in_both_v2}
                        placeholder={"second period"}
                        set_selected={set_second_period_arr}
                      />
                    </>
                  )}

                  {is_check_inc_both_period && (
                    <>
                      <div className={classes.inc_selects}>
                        <Select
                          options={years_in_both}
                          default_value="choose starting first period"
                          set_selected_opt={set_first_period}
                        />
                        <label>
                          <span>increment_1:</span>
                          <input
                            ref={first_period_increment_input}
                            type="number"
                            min={1}
                            max={
                              years_in_both[years_in_both.length - 1] -
                              years_in_both[0]
                            }
                            defaultValue={1}
                          />
                        </label>
                      </div>
                      <div className={classes.inc_selects}>
                        <Select
                          options={years_in_both}
                          default_value="choose starting second period"
                          set_selected_opt={set_second_period}
                        />
                        <label>
                          <span>increment_2:</span>
                          <input
                            ref={second_period_increment_input}
                            type="number"
                            min={1}
                            max={
                              years_in_both[years_in_both.length - 1] -
                              years_in_both[0]
                            }
                            defaultValue={1}
                          />
                        </label>
                      </div>
                    </>
                  )}
                  {/* <Select
                    options={years_in_both}
                    default_value="choose second period"
                    set_selected_opt={set_second_period}
                  /> */}
                </div>
                {/* <Select
                  options={unique_countries}
                  default_value="choose a country"
                  set_selected_opt={set_country_name}
                /> */}
              </div>
              <h4>Choose a country</h4>
              {!is_check_inc_both_period && (
                <Multi_Dropdown_checkbox
                  options={unique_countries_v2}
                  placeholder={"country"}
                  set_selected={set_country_arr}
                />
              )}
              {is_check_inc_both_period && (
                <Multi_Dropdown_checkbox
                  options={unique_countries_v2}
                  placeholder={"country"}
                  set_selected={set_country_arr}
                />
              )}
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
                  <Multi_Dropdown_checkbox
                    options={years_in_both_v2}
                    placeholder={"second period"}
                    set_selected={set_second_period_arr}
                  />
                  {/* <Select
                    options={years_in_both}
                    default_value="choose year"
                    set_selected_opt={set_first_period}
                  /> */}
                </div>
              </div>
              <h4>Choose a country</h4>
              <Multi_Dropdown_checkbox
                options={unique_countries_v2}
                placeholder={"year"}
                set_selected={set_country_arr}
              />
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
