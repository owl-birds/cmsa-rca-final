import React, { useState } from "react";
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
  get_country_years_service,
} from "../../../../application/services/country_data.service";
import {
  add_world_column_service,
  add_world_row_service,
  update_cell_world_service,
  read_world_file_service,
  initiate_world_self_input_service,
  clear_world_data_service,
  get_world_years_service,
} from "../../../../application/services/world_data.service";
import {
  clear_all_state_service,
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
import Render_Tex_to_Formula from "../../../shared/math_formula/Katex_Math_Formula";
import {
  tex_cmsa_three_level,
  tex_cmsa_three_level_components,
} from "../../../../infrastructure/all_formula";
import Desc from "../../../shared/formula_description/Desc";
// import Years_Select from "../../../shared/year_select/Years_Select";
import CMSA_Calculation_Options from "../../../shared/cmsa_calculation_options/CMSA_Calculation_Options";

const Three_Level = () => {
  // component specific vars
  const data_kind = "three_level";
  const [is_info_show, set_is_info_show] = useState<boolean>(false);

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
  // const country_year = use_country_file_store(
  //   (state: Uploaded_Country_File_State) => state.year
  // );
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
  // const world_year = use_world_file_store(
  //   (state: Uploaded_World_File_State) => state.year
  // );
  // console.log("country data", country_data);
  // console.log("country columns", country_columns);
  // console.log("world data", world_data);
  // console.log("world columns", world_columns);
  // console.log("world", world_year);
  // console.log("country", country_year);
  // console.log("THREE LEVEL");

  // LOCAL UI
  const show_method_informations_handler = () => {
    set_is_info_show((prev_value: boolean) => !prev_value);
  };

  return (
    <>
      <Link_Box_Text
        click_functions_handler={clear_all_state_service}
        link="/main/cmsa"
        title="BACK"
      />
      <section className={classes.three_level_box}>
        <h1 className={classes.title}>THREE LEVEL</h1>
        {/* method information and data structure for inputting  */}
        {/* for hiding the additional information */}
        <section
          className={classes.is_info_show}
          onClick={show_method_informations_handler}
        >
          {is_info_show
            ? "Hide Method Informations"
            : "Show Method Informations"}
        </section>
        {is_info_show && (
          <section className={classes.method_informations}>
            <div className={classes.formula}>
              <Render_Tex_to_Formula tex_string={tex_cmsa_three_level} />
            </div>
            <br />
            <div className={classes.descriptions}>
              <Desc tex_symbol_string="X" explanation="Export" />
              <Desc tex_symbol_string="r" explanation="Country r" />
              <Desc tex_symbol_string="i" explanation="Commodity i" />
              <Desc tex_symbol_string="p" explanation="Partner or Region" />
              <Desc tex_symbol_string="0" explanation="First Period" />
              <Desc tex_symbol_string="1" explanation="Second Period" />
              <Desc
                tex_symbol_string="g = \frac{X^1 - X^0}{X^0}"
                explanation=""
              />
              <Desc
                tex_symbol_string="g"
                explanation="export growth rate (if there is no r in the symbol its in the value of world exports)"
              />
            </div>
            <br />
            <div
              className={`${classes.descriptions} ${classes.descriptions_effects}`}
            >
              {tex_cmsa_three_level_components.map(
                (comp: string[], idx: number) => (
                  <Desc
                    key={idx}
                    tex_symbol_string={comp[0]}
                    explanation={comp[1]}
                  />
                )
              )}
            </div>
          </section>
        )}

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
        {country_data && world_data && (
          <section className={classes.three_level_options}>
            <h4>METHOD OPTIONS</h4>
            <CMSA_Calculation_Options
              method_type="three_level"
              years={get_world_years_service()}
              // years={world_year}
              // PROBLEM HERE :: NOT UPDATING CAUSE
              // ITS A FUNCTION WHEN A NEW YEAR ADDED THE OPTIONS
              // ARE NOT UPDATED
            />
          </section>
        )}
      </section>
    </>
  );
};
export default Three_Level;
