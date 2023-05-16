import React, { useState } from "react";
import classes from "./Section_data.module.scss";
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
import {
  Uploaded_Country_File_State,
  use_country_file_store,
} from "../../../application/states/country.state";
import {
  use_country_ui,
  Country_Ui_Interface,
} from "../../../application/states/country_ui.state";
import {
  // clear_all_state_service,
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
import {
  Uploaded_World_File_State,
  use_world_file_store,
} from "../../../application/states/world.state";
// WORLD
//
const Section_data = () => {
  const [is_country_data_selected, set_is_country_data_selected] =
    useState<Boolean>(true);

  // COUNTRY
  // COUNTRY DATA
  const country_data = use_country_file_store(
    (state: Uploaded_Country_File_State) => state.data
  );
  const country_columns = use_country_file_store(
    (state: Uploaded_Country_File_State) => state.columns
  );
  //
  // COUNTRY UI
  const clear_country_ui_state = use_country_ui(
    (state: Country_Ui_Interface) => state.clear_state
  );
  const is_country_self_input = use_country_ui(
    (state: Country_Ui_Interface) => state.is_self_input
  );
  const is_country_choosed = use_country_ui(
    (state: Country_Ui_Interface) => state.is_choosed
  );
  const set_country_self_input = use_country_ui(
    (state: Country_Ui_Interface) => state.set_self_input
  );
  const set_country_upload_input = use_country_ui(
    (state: Country_Ui_Interface) => state.set_upload_input
  );
  const set_country_choosed = use_country_ui(
    (state: Country_Ui_Interface) => state.set_choosed
  );
  // COUNTRY

  // WORLD
  // WORLD DATA
  const world_data = use_world_file_store(
    (state: Uploaded_World_File_State) => state.data
  );
  const world_columns = use_world_file_store(
    (state: Uploaded_World_File_State) => state.columns
  );
  // WORLD UI
  const clear_world_ui_state = use_world_ui(
    (state: World_Ui_Interface) => state.clear_state
  );
  const is_world_self_input = use_world_ui(
    (state: World_Ui_Interface) => state.is_self_input
  );
  const is_world_choosed = use_world_ui(
    (state: World_Ui_Interface) => state.is_choosed
  );
  const set_world_self_input = use_world_ui(
    (state: World_Ui_Interface) => state.set_self_input
  );
  const set_world_upload_input = use_world_ui(
    (state: World_Ui_Interface) => state.set_upload_input
  );
  const set_world_choosed = use_world_ui(
    (state: World_Ui_Interface) => state.set_choosed
  );
  // WORLD

  // data state handler
  const set_country_selected = () => {
    set_is_country_data_selected(() => true);
  };
  const set_world_selected = () => {
    set_is_country_data_selected(() => false);
  };
  return (
    <section>
      <div className={classes.section_title}>
        <div></div>
        <h4>DATA</h4>
        <div></div>
      </div>
      <div className={classes.data}>
        <div className={classes.data_menu}>
          <button
            className={`btn_default ${
              is_country_data_selected ? classes.menu_selected : ""
            }`}
            onClick={set_country_selected}
          >
            country
          </button>
          <button
            className={`btn_default ${
              !is_country_data_selected ? classes.menu_selected : ""
            }`}
            onClick={set_world_selected}
          >
            world
          </button>
        </div>
        <div className={classes.display_data}>
          {/* country */}
          {is_country_data_selected && (
            <Data_Box_2
              id="data"
              data_box_title={"Input Country Data"}
              table_name={"Country Table"}
              data={country_data}
              columns={country_columns}
              is_edit_able={true}
              // is_download_able={true}
              add_column_service={add_country_column_service}
              add_row_service={add_country_row_service}
              csv_string_to_csv_file={csv_string_to_csv_file}
              data_to_csv_string={data_to_csv_string}
              update_cell_service={update_cell_country_service}
              is_ext_allowed={is_ext_allowed}
              read_file_service={read_country_file_service}
              is_choosed={is_country_choosed}
              is_self_input={is_country_self_input}
              self_input={set_country_self_input}
              upload_input={set_country_upload_input}
              choose_handler={set_country_choosed}
              clear_data_service={clear_country_data_service}
              clear_ui_state={clear_country_ui_state}
              // data_kind={data_kind}
              initiate_self_input_service={initiate_country_self_input_service}
            />
          )}
          {/* world */}
          {!is_country_data_selected && (
            <Data_Box_2
              id="data"
              data_box_title={"Input World Data"}
              table_name={"World Table"}
              data={world_data}
              columns={world_columns}
              is_edit_able={true}
              // is_download_able={true}
              add_column_service={add_world_column_service}
              add_row_service={add_world_row_service}
              csv_string_to_csv_file={csv_string_to_csv_file}
              data_to_csv_string={data_to_csv_string}
              update_cell_service={update_cell_world_service}
              is_ext_allowed={is_ext_allowed}
              read_file_service={read_world_file_service}
              is_choosed={is_world_choosed}
              is_self_input={is_world_self_input}
              self_input={set_world_self_input}
              upload_input={set_world_upload_input}
              choose_handler={set_world_choosed}
              clear_data_service={clear_world_data_service}
              clear_ui_state={clear_world_ui_state}
              // data_kind={data_kind}
              initiate_self_input_service={initiate_world_self_input_service}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Section_data;
