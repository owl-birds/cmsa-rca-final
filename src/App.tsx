import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import Drop_file from "./presentation/shared/drop_file_input/Drop_file";
import {
  add_country_column_service,
  add_country_row_service,
  read_country_file_service,
  update_cell_country_service,
} from "./application/services/country_data.service";
import {
  csv_string_to_csv_file,
  data_to_csv_string,
  is_ext_allowed,
} from "./application/services/general_data.service";
import {
  Uploaded_Country_File_State,
  use_country_file_store,
} from "./application/states/country.state";
import Table from "./presentation/shared/table/Table";

function App() {
  const data = use_country_file_store(
    (state: Uploaded_Country_File_State) => state.data
  );
  const column = use_country_file_store(
    (state: Uploaded_Country_File_State) => state.columns
  );

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <Drop_file
        read_file={read_country_file_service}
        is_ext_allowed={is_ext_allowed}
      />
      <Table
        is_download_able={true}
        is_edit_able={true}
        data={data}
        columns={column}
        add_row_service={add_country_row_service}
        add_column_service={add_country_column_service}
        data_to_csv_string={data_to_csv_string}
        csv_string_to_csv_file={csv_string_to_csv_file}
        update_cell_service={update_cell_country_service}
      />
    </div>
  );
}

export default App;
