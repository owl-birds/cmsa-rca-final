import React, { memo, useState } from "react";
import classes from "./CMSA_Calculation_Options.module.scss";
import Years_Select from "../year_select/Years_Select";
import {
  clear_calculation_service,
  set_result_service,
} from "../../../application/services/calculation.service";
import { use_world_file_store } from "../../../application/states/world.state";
import { use_country_file_store } from "../../../application/states/country.state";
import { get_unique_values_country } from "../../../application/services/country_data.service";
import {
  get_unique_values_world,
  get_world_years_service,
} from "../../../application/services/world_data.service";
import {
  Calculation_State_Interface,
  use_calculation_store,
} from "../../../application/states/calculation.state";
import { Uploaded_World_File_State } from "../../../application/states/world.state";

import { Uploaded_Country_File_State } from "../../../application/states/country.state";
import Select from "../select/Select";
// import { findColDataArr } from "../../../application/analyser_module/helpers";
// // ANALYSER MODULE
// //1
// import { threeLevelCMSA } from "../../../application/analyser_module/three_level";
// //2
// //3

interface Props {
  method_type: string;
  // years: number[];
}

const CMSA_Calculation_Options = memo((props: Props) => {
  const {
    // years,
    method_type,
  } = props;

  const [is_one_country, set_is_one_country] = useState<boolean | null>(null);
  const [country_selected, set_country_selected] = useState<string | null>(
    null
  );

  // CALCULATION PURPOSES
  const world_data = use_world_file_store(
    (state: Uploaded_World_File_State) => state.data
  );
  const country_data = use_country_file_store(
    (state: Uploaded_Country_File_State) => state.data
  );
  const unique_countries = get_unique_values_country("country");
  // const unique_commodities = get_unique_values_world("commodity");
  const unique_years = get_world_years_service();

  const one_country_menu_handler = () => {
    // if (is_one_country) {
    // idk if this is terrible or not, but hey at least it worked
    clear_calculation_service();
    set_country_selected(() => null);
    // }
    set_is_one_country((prev_val: boolean | null) => !prev_val);

    // TEST
    // const test: any = threeLevelCMSA(
    //   world_data!,
    //   findColDataArr(country_data!, "singapura", "country")!,
    //   "singapura",
    //   "2011",
    //   "2012"
    // );
    // for (let key of Object.keys(test)) {
    //   console.log(key, test[key].toString());
    // }
  };

  const process_handler = async () => {
    const { findColDataArr } = await import(
      "../../../application/analyser_module/helpers"
    );
    // const { use_country_file_store } = await import(
    //   "../../../application/states/country.state"
    // );
    // const { use_world_file_store } = await import(
    //   "../../../application/states/world.state"
    // );
    const first_period = use_calculation_store.getState().first_period;
    const second_period = use_calculation_store.getState().second_period;
    console.log("CALCULATION DATA");
    console.log("method type", method_type);
    console.log("country", country_data);
    console.log("world", world_data);
    console.log("countries", unique_countries);
    console.log("country selected", country_selected);
    // console.log("commodities", unique_commodities);
    console.log("first period", first_period);
    console.log("second period", second_period);
    if (is_one_country) {
      if (method_type === "three_level") {
        const { threeLevelCMSA } = await import(
          "../../../application/analyser_module/three_level"
        );

        return;
      }
      if (method_type === "two_level_region") {
        return;
      }
      if (method_type === "two_level_commodity") {
        return;
      }
      if (method_type === "one_level") {
        return;
      }
    }
    if (!is_one_country) {
      console.log("MULTIPLE COUNTRIES");
    }
  };

  return (
    <div className={classes.calculation_options}>
      <div className={classes.menus}>
        <div
          onClick={one_country_menu_handler}
          className={`${classes.menu} ${
            is_one_country ? classes.menu_selected : ""
          }`}
        >
          ONE COUNTRY
        </div>
        <div className={`${classes.menu}`}>MULTIPLE COUNTRY</div>
      </div>
      <div className={classes.select}>
        {is_one_country && (
          <>
            <Years_Select years={unique_years} />
            {/* BELOW FOR CHOOSING ONE OF THE COUNTRY, 
            find a way to find unique country name */}
            <Select
              options={unique_countries}
              default_value={`country`}
              is_number={false}
              set_selected_opt={set_country_selected}
            />
            <div className="btn_default" onClick={process_handler}>
              PROCESS
            </div>
          </>
        )}
      </div>
      <div className={classes.output}></div>
    </div>
  );
});

export default CMSA_Calculation_Options;
