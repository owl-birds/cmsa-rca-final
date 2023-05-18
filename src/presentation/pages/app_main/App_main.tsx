import React, { useState } from "react";
import classes from "./App_main.module.scss";

import {
  use_country_file_store,
  Uploaded_Country_File_State,
} from "../../../application/states/country.state";
import {
  use_world_file_store,
  Uploaded_World_File_State,
} from "../../../application/states/world.state";

//
// COUNTRY
import {
  add_country_column_service,
  add_country_row_service,
  update_cell_country_service,
  read_country_file_service,
  initiate_country_self_input_service,
  clear_country_data_service,
  // get_country_years_service,
} from "../../../application/services/country_data.service";
// import {
//   Uploaded_Country_File_State,
//   use_country_file_store,
// } from "../../../application/states/country.state";
import {
  use_country_ui,
  Country_Ui_Interface,
} from "../../../application/states/country_ui.state";
import {
  clear_all_state_service,
  csv_string_to_csv_file,
  data_to_csv_string,
  is_ext_allowed,
} from "../../../application/services/general_data.service";
import Data_Box_2 from "../../shared/data_box/Data_Box_2";
// COUNTRY
//

//
// WORLD
import {
  add_world_column_service,
  add_world_row_service,
  update_cell_world_service,
  read_world_file_service,
  initiate_world_self_input_service,
  clear_world_data_service,
  // get_world_years_service,
} from "../../../application/services/world_data.service";
import {
  use_world_ui,
  World_Ui_Interface,
} from "../../../application/states/world_ui.state";
// import {
//   Uploaded_World_File_State,
//   use_world_file_store,
// } from "../../../application/states/world.state";
// WORLD
//

import Section_data from "../../shared/section_data/Section_data";

// METHODS
// datas
import {
  avail_methods,
  cmsa_types,
  rca_types,
} from "../../../infrastructure/all_methods";
import {
  tex_general_cmsa_dec,
  //
  tex_cmsa_one_level,
  tex_cmsa_one_level_components,
  //
  tex_cmsa_two_level_commodity,
  tex_cmsa_two_level_commodity_components,
  //
  tex_cmsa_two_level_region,
  tex_cmsa_two_level_region_components,
  //
  tex_cmsa_three_level,
  tex_cmsa_three_level_components,
  //
  tex_rca_classic,
  tex_general_rca_dec,
} from "../../../infrastructure/all_formula";
// state
import {
  use_calculation_store,
  Calculation_State_Interface,
} from "../../../application/states/calculation.state";
import Select from "../../shared/select/Select";
import Formula_Desc from "../../shared/formula_desc/Formula_Desc";

// SERVICES
import {
  get_country_years_service,
  get_unique_values_country,
} from "../../../application/services/country_data.service";
import {
  get_unique_values_world,
  get_world_years_service,
} from "../../../application/services/world_data.service";
import { get_years_intersection } from "../../../application/services/general_data.service";

// METHODS

const App_main = () => {
  const [method, set_method] = useState<string | null>(null);
  const [method_sub_type, set_method_sub_type] = useState<string | null>(null);

  //
  const [is_hover_on_info_toggle, set_is_hover_on_info_toggle] =
    useState<boolean>(false);
  const [is_info_visible, set_is_info_visible] = useState<boolean>(false);

  // global state zustand
  const set_first_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_first_period
  );
  const set_second_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_second_period
  );
  const first_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.first_period
  );
  const second_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.second_period
  );
  // pretty bad for the memmory, i think
  const country_data = use_country_file_store(
    (state: Uploaded_Country_File_State) => state.data
  );
  const world_data = use_world_file_store(
    (state: Uploaded_World_File_State) => state.data
  );
  const country_years = get_country_years_service();
  const world_years = get_world_years_service();
  const years_in_both = get_years_intersection();
  //

  // event handler
  const mouse_enter_info_toggle = () => {
    set_is_hover_on_info_toggle(() => true);
  };
  const mouse_exit_info_toggle = () => {
    set_is_hover_on_info_toggle(() => false);
  };
  const show_method_informations = () => {
    set_is_info_visible((prev_val) => !prev_val);
  };
  //

  // TEST
  console.log("method", method);
  console.log("method sub type", method_sub_type);
  console.log("country years", country_years);
  console.log("world years", world_years);
  console.log("world country years intersection", years_in_both);
  console.log("first period", first_period);
  console.log("second period", second_period);
  // TEST

  return (
    <div className={classes.main_app}>
      <Section_data />
      {/* table here should be optimised (SLOW AS FECK), 
      for ex: showing a limited number of data, and u 
      can navigate with an arrow or using search box */}

      {/* below need refactoring */}
      <section>
        <div className={classes.section_title}>
          <div></div>
          <h4>METHODS</h4>
          <div></div>
        </div>
        <div className={classes.method_selection}>
          <div className={classes.main_method}>
            <span>method</span>
            <Select
              options={avail_methods}
              is_number={false}
              default_value={"method"}
              set_selected_opt={set_method}
            />
          </div>
          {method && method !== "method" ? (
            <div className={classes.method_type}>
              <span>method type</span>
              {method === avail_methods[0] ? (
                <Select
                  options={cmsa_types}
                  is_number={false}
                  default_value={"type"}
                  set_selected_opt={set_method_sub_type}
                />
              ) : null}
              {method === avail_methods[1] ? (
                <Select
                  options={rca_types}
                  is_number={false}
                  default_value={"type"}
                  set_selected_opt={set_method_sub_type}
                />
              ) : null}
            </div>
          ) : null}
        </div>
        {/* SOME METHOD INFORMATIONS TAHT CAN BE TOGGLED */}
        {(method === avail_methods[0] &&
          method_sub_type !== null &&
          cmsa_types.indexOf(method_sub_type!) !== -1) ||
        (method === avail_methods[1] &&
          method_sub_type !== null &&
          rca_types.indexOf(method_sub_type!) !== -1) ? (
          <div className={classes.method_informations_box}>
            <div
              className={classes.info_toggle}
              onMouseEnter={mouse_enter_info_toggle}
              onMouseLeave={mouse_exit_info_toggle}
              onClick={show_method_informations}
            >
              {!is_hover_on_info_toggle ? (
                <>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGQ0lEQVR4nO1b22tcRRg/YMX6Zs2/YFvBx754qazZmY3Fqr2ZqNjLQ1tLQaiI4IMUQ2nUFxFLqQr64LUqKOiDIFaKWqq95cycpolJm24uZ2azuexuLt3NZi8j326TJs3Zc5s556TiDz4IJ3vmzO8738x8t6Np/yNYoG6zKaGzbYiydkz5SUz4JUT4ECI8gwmrgsDfcA3+B7+B39bu6TabtDsRLQZ7EBHegSjXEWEVTLnwIzfv7USEHW2m5nptJWPDRXE3onwPpuycX8KOCqHsb0T47thpsUpbScQx4QcRZcmgiFso4npc5wciV0ScsscxYUZYxJcJ4RQTtjF04g+fHboXU/ZRbROLivyCEmAO7EQsmVwdCvlmaq5HhJPIiS8TdqVZTz0UKHlMTYQJm4qerLUgyibjeqo5EPJxg23FhBeiJumoBMKLWE+1KSWfMFKtiLJy1OQ8WEIZEb5DCfm4nmpGhM+qmNhLPWnx3nBO/DA2I85NzQpjpij68nNCny6KP3IF8XV6WrQPZMTWrhEllhA3WELao8OSa/5Jg4u3B7OiNz8n3KJcFeLPXEG8em1cUhEshzuH1/oiH0smV4MrKzOBQ1fHRX/BPXErnJksiLYrEhZBmAHHtmcFYDjnJch/zCdFpSqUIFOqiFeujkksB3bcG3nCNso4Od+OzgjVmClXxYE+n0ogrNp82XzUnemfFqtkHJ0PzJwICqxYFs9eTvleChC3uHj7/KBf8rt7RsWsg91nSxXxSWpK7O8dFU9fTokE5aKte0QcGciIrpmioxLgpPC9FAz+souQlvmO6n7PFWwnP1Aoiee70w3vB2V8MTJtO8aNSlU8498K+m0jSFSL5/2Rf7E7bbvpgWXs+WfU1Vi/ZfO2SugYzPq2Akz4rsbmT9l5vwMfZ5PKTBeWkh3AkZJQwFnrt0/Mdb4HpVz8msnbOjYv2Ji+lYzPlRuOB06SzFwt02uI8A6ZQcG1bQTYG7yOx4tlW+dIZq6YsiNWCiAyg34/1vjsf82jS7u9a0SUbPaTH8dvSCkAEXZhKflus0kmezu/CU6VK8smC4GO17E+dzgJjpk5OQVQVt5sDK65tfkRvl3OpOqyt3e0FuHBmgc5kyuIHR79+EPXxsVctfHrL1Wrnse0EshvaLeOv1rRQqiSp4yU2GR4P6uB/LSFFS3GzxNy5r9gBYQfXnT88ZMqFeBH3kxOOHqRE6WKklxBTQj/cvESuBQl+XcGs7abHqBYrdYsRNUzl2yEmPDhqMi/P5wTTlEz7AlvJTNqn0344GIPMBcFedjNncjnK1XxxvUJ5c+Ggqy2SAGlsMl/6OA6z0eOB/3mAByFlSJTwOv9447ZopFi2XXwpEIBubDItxhcJAslqbBZ/RIg4W2CkPZ2It+qwNHxtgmS8I7BX2yiRnClwaUOYx5Lj0EaniNkzpYC8/F9O0JIsStsJ5DdtQJc3tLlM9Ul6wondLYtrAdDMGMFqByF9vbrEeGWBQW0dA3dLxsOu5WhBkvgm9HpMMkvDYcBsmUwmVgf4oB9vUGe+bcLO6/dDkTY0TAeDsXSz0amFpIn6blyrSYQHvmaBbQrT4piHwKFkbCfWVMAMddpVsAB9vitGGmUFgdAE2JY7jDEAxAKg/krS3K4kITOd2oOpbHrQU5gV096Wc8ApMGUx/t+SmMA6MAMagKQJ2x0DELSI/iTgO3Tgi6PYxsBc7fDT5L5foe3b7hurU3o7LEgukA/TU3ZKqBzejYQ8uDkIcN8RPMCTNkJ1ROBYMcOfkpoLuWYJ/LzTVLQq69yIjt70rbZ33eHsgGYPqe+mqQA4DBA+6lqK7BSwqlsvtYgoVgB2ZauoQc0GSA99YTqFlnY7aHACWv+VCYfyBEIjZLIMLGmAnHKn7vTWmWh3qmE/B3YLD2rvFl6yXKIqIjiUrLY4DEtSODO4bVh5Q48Sqf0huepj5iw4yvhk5mbmaxjm/r67tHCRovBN8h0lsmT58R1C2xQiJ0WqzBl+yHSCo08YdfihO1t/U7cpa0UxEARhO9ChP0VHHF+FuL5yL8XdEI9vcaOQPVFxn+of/pSG6Pd94cPUWOzMbgGcvBQiMCEf4UIv4gpG6h/MM0qdeGZ+jV24eZvDsM9MT15X9Tz1/7r+Bc+SIgGkFrSlgAAAABJRU5ErkJggg=="></img>
                  {is_info_visible ? (
                    <span>Hide Method Information</span>
                  ) : (
                    <>
                      <span>{method}</span> <span>{method_sub_type}</span>
                    </>
                  )}
                </>
              ) : null}
              {is_hover_on_info_toggle ? (
                <>
                  <img src="data:image/png;base64,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"></img>
                  {!is_info_visible ? (
                    <span>Show Method Informations</span>
                  ) : (
                    <span>Hide Method Information</span>
                  )}
                </>
              ) : null}
              {/* <a  href="https://icons8.com/icon/80684/question-mark">Question Mark</a> icon by <a href="https://icons8.com">Icons8</a> */}
            </div>
            {is_info_visible ? (
              <>
                {/* CMSA */}
                {method === avail_methods[0] &&
                method_sub_type === cmsa_types[0] ? (
                  <Formula_Desc
                    method_name={method}
                    method_sub_type={method_sub_type}
                    formula_tex={tex_cmsa_three_level}
                    formula_components_tex={tex_cmsa_three_level_components}
                    general_desc_tex={tex_general_cmsa_dec}
                  />
                ) : null}
                {method === avail_methods[0] &&
                method_sub_type === cmsa_types[1] ? (
                  <Formula_Desc
                    method_name={method}
                    method_sub_type={method_sub_type}
                    formula_tex={tex_cmsa_two_level_commodity}
                    formula_components_tex={
                      tex_cmsa_two_level_commodity_components
                    }
                    general_desc_tex={tex_general_cmsa_dec}
                  />
                ) : null}
                {method === avail_methods[0] &&
                method_sub_type === cmsa_types[2] ? (
                  <Formula_Desc
                    method_name={method}
                    method_sub_type={method_sub_type}
                    formula_tex={tex_cmsa_two_level_region}
                    formula_components_tex={
                      tex_cmsa_two_level_region_components
                    }
                    general_desc_tex={tex_general_cmsa_dec}
                  />
                ) : null}
                {method === avail_methods[0] &&
                method_sub_type === cmsa_types[3] ? (
                  <Formula_Desc
                    method_name={method}
                    method_sub_type={method_sub_type}
                    formula_tex={tex_cmsa_one_level}
                    formula_components_tex={tex_cmsa_one_level_components}
                    general_desc_tex={tex_general_cmsa_dec}
                  />
                ) : null}
                {/* RCA */}
                {method === avail_methods[1] &&
                method_sub_type === rca_types[0] ? (
                  <Formula_Desc
                    method_name={method}
                    method_sub_type={method_sub_type}
                    formula_tex={tex_rca_classic}
                    general_desc_tex={tex_general_rca_dec}
                  />
                ) : null}
              </>
            ) : null}
          </div>
        ) : null}
        {/* SOME METHOD INFORMATIONS TAHT CAN BE TOGGLED */}

        {/* METHOD OPTIONS TO DO CALCULATIONS */}
        {world_data && country_data ? (
          <div className={classes.method_options}>
            {/* CMSA */}
            {method === avail_methods[0] &&
            method_sub_type !== null &&
            cmsa_types.indexOf(method_sub_type!) !== -1 ? (
              <div className={classes.year_options}>
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
            ) : null}
            {/* RCA */}
            {method === avail_methods[1] &&
            method_sub_type !== null &&
            rca_types.indexOf(method_sub_type!) !== -1 ? (
              <div className={classes.year_options}>
                <Select
                  options={years_in_both}
                  default_value="choose year"
                  set_selected_opt={set_first_period}
                />
              </div>
            ) : null}
          </div>
        ) : null}
        {/* METHOD OPTIONS TO DO CALCULATIONS */}
      </section>
      <section>
        <div className={classes.section_title}>
          <div></div>
          <h4>OUTPUT</h4>
          <div></div>
        </div>
        <div></div>
      </section>
    </div>
  );
};

export default App_main;
// TRASH
// <section>
//   <div className={classes.section_title}>
//     <div></div>
//     <h4>DATA</h4>
//     <div></div>
//   </div>
//   <div className={classes.data}>
//     <div className={classes.data_menu}>
//       <button className="btn_default" onClick={set_country_selected}>
//         country
//       </button>
//       <button className="btn_default" onClick={set_world_selected}>
//         world
//       </button>
//     </div>
//     <div className={classes.display_data}>
//       {/* country */}
//       {is_country_data_selected && (
//         <Data_Box_2
//           id="data"
//           data_box_title={"Input Country Data"}
//           table_name={"Country Table"}
//           data={country_data}
//           columns={country_columns}
//           is_edit_able={true}
//           // is_download_able={true}
//           add_column_service={add_country_column_service}
//           add_row_service={add_country_row_service}
//           csv_string_to_csv_file={csv_string_to_csv_file}
//           data_to_csv_string={data_to_csv_string}
//           update_cell_service={update_cell_country_service}
//           is_ext_allowed={is_ext_allowed}
//           read_file_service={read_country_file_service}
//           is_choosed={is_country_choosed}
//           is_self_input={is_country_self_input}
//           self_input={set_country_self_input}
//           upload_input={set_country_upload_input}
//           choose_handler={set_country_choosed}
//           clear_data_service={clear_country_data_service}
//           clear_ui_state={clear_country_ui_state}
//           // data_kind={data_kind}
//           initiate_self_input_service={
//             initiate_country_self_input_service
//           }
//         />
//       )}
//       {/* world */}
//       {!is_country_data_selected && (
//         <Data_Box_2
//           id="data"
//           data_box_title={"Input World Data"}
//           table_name={"World Table"}
//           data={world_data}
//           columns={world_columns}
//           is_edit_able={true}
//           // is_download_able={true}
//           add_column_service={add_world_column_service}
//           add_row_service={add_world_row_service}
//           csv_string_to_csv_file={csv_string_to_csv_file}
//           data_to_csv_string={data_to_csv_string}
//           update_cell_service={update_cell_world_service}
//           is_ext_allowed={is_ext_allowed}
//           read_file_service={read_world_file_service}
//           is_choosed={is_world_choosed}
//           is_self_input={is_world_self_input}
//           self_input={set_world_self_input}
//           upload_input={set_world_upload_input}
//           choose_handler={set_world_choosed}
//           clear_data_service={clear_world_data_service}
//           clear_ui_state={clear_world_ui_state}
//           // data_kind={data_kind}
//           initiate_self_input_service={initiate_world_self_input_service}
//         />
//       )}
//     </div>
//   </div>
// </section>
