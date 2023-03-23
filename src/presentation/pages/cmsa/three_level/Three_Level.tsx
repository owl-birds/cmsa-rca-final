import React from "react";
import classes from "./Three_Level.module.scss";
import Link_Box_Text from "../../../shared/link_box_text/Link_Box_Text";
import {
  use_country_ui,
  Country_Ui_Interface,
} from "../../../../application/states/country_ui.state";
import {
  use_world_ui,
  World_Ui_Interface,
} from "../../../../application/states/world_ui.state";
import {
  add_country_column_service,
  add_country_row_service,
  update_cell_country_service,
  read_country_file_service,
  initiate_country_self_input_service,
  clear_country_data_service,
} from "../../../../application/services/country_data.service";
import {
  add_world_column_service,
  add_world_row_service,
  update_cell_world_service,
  read_world_file_service,
  initiate_world_self_input_service,
  clear_world_data_service,
} from "../../../../application/services/world_data.service";
import {
  csv_string_to_csv_file,
  data_to_csv_string,
  is_ext_allowed,
} from "../../../../application/services/general_data.service";
// import Choose_Input_Type from "../../../shared/choose_input_type/Choose_Input_Type";
// import Drop_file from "../../../shared/drop_file_input/Drop_file";
import {
  Uploaded_Country_File_State,
  use_country_file_store,
} from "../../../../application/states/country.state";
import {
  Uploaded_World_File_State,
  use_world_file_store,
} from "../../../../application/states/world.state";
// import Table from "../../../shared/table/Table";
import Data_Box from "../../../shared/data_box/Data_Box";

const Three_Level = () => {
  // component specific vars
  const data_kind = "three_level";

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
  // COUNTRY DATA
  const country_data = use_country_file_store(
    (state: Uploaded_Country_File_State) => state.data
  );
  const country_columns = use_country_file_store(
    (state: Uploaded_Country_File_State) => state.columns
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
  // WORLD DATA
  const world_data = use_world_file_store(
    (state: Uploaded_World_File_State) => state.data
  );
  const world_columns = use_world_file_store(
    (state: Uploaded_World_File_State) => state.columns
  );
  // console.log("country data", country_data);
  // console.log("country columns", country_columns);
  // console.log("world data", world_data);
  // console.log("world columns", world_columns);
  return (
    <>
      <Link_Box_Text link="/main/cmsa" title="BACK" />
      <section className={classes.three_level_box}>
        <h1 className={classes.title}>THREE LEVEL</h1>
        {/* <div className={classes.country_data_box}>
          {country_data ? null : (
            <div className={classes.input_data}>
              <h4>Input Country Data</h4>
              {is_country_choosed ? null : (
                <Choose_Input_Type
                  is_self_input={is_country_self_input}
                  is_choosed={is_country_choosed}
                  self_input={set_country_self_input}
                  upload_input={set_country_upload_input}
                  choose_handler={set_country_choosed}
                />
              )}
              {country_data === null &&
              is_country_self_input === false &&
              is_country_self_input === false ? (
                <Drop_file
                  is_ext_allowed={is_ext_allowed}
                  read_file={read_country_file_service}
                />
              ) : null}
              {is_country_self_input ? <h1>SELF INPUT</h1> : null}
            </div>
          )}
          {country_data ? (
            <Table
              table_name={"Country Table"}
              data={country_data}
              columns={country_columns}
              is_edit_able={true}
              add_column_service={add_country_column_service}
              add_row_service={add_country_row_service}
              csv_string_to_csv_file={csv_string_to_csv_file}
              data_to_csv_string={data_to_csv_string}
              update_cell_service={update_cell_country_service}
            />
          ) : null}
        </div> */}
        <Data_Box
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
          data_kind={data_kind}
          initiate_self_input_service={initiate_country_self_input_service}
        />
        <Data_Box
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
          data_kind={data_kind}
          initiate_self_input_service={initiate_world_self_input_service}
        />
      </section>
      <section className={classes.three_level_options}>OPTIONS</section>
    </>
  );
};
export default Three_Level;
