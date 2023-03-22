import React from "react";
import classes from "./Data_Box.module.scss";
import Choose_Input_Type from "../choose_input_type/Choose_Input_Type";
import Drop_file from "../drop_file_input/Drop_file";
import Table from "../table/Table";

interface Props {
  data: any[] | null; // BAND AID HERE
  columns: string[] | null;
  //Choose Input
  is_choosed: boolean;
  is_self_input: boolean | null;
  self_input: () => void;
  upload_input: () => void;
  choose_handler: () => void;
  // Drop File
  is_ext_allowed: (file_name: string) => boolean;
  read_file_service: (file: File) => void;
  // TABLE
  table_name: string;
  is_download_able?: boolean;
  is_edit_able?: boolean;
  add_row_service: () => void;
  add_column_service: (column_name: string) => void;
  data_to_csv_string: (data: any[], columns: string[]) => string;
  csv_string_to_csv_file: (
    csv_string: string,
    silent_a: HTMLAnchorElement
  ) => void;
  update_cell_service: (
    new_value: string | number,
    row_index: number,
    column_name: string
  ) => void;
}

const Data_Box = (props: Props) => {
  const {
    data,
    columns,
    //
    choose_handler,
    upload_input,
    self_input,
    is_choosed,
    is_self_input,
    //
    table_name,
    is_ext_allowed,
    read_file_service,
    is_download_able,
    is_edit_able,
    add_column_service,
    add_row_service,
    data_to_csv_string,
    csv_string_to_csv_file,
    update_cell_service,
  } = props;
  return (
    <div className={classes.data_box}>
      {data ? null : (
        <div className={classes.input_data}>
          <h4>Input Country Data</h4>
          {is_choosed ? null : (
            <Choose_Input_Type
              is_self_input={is_self_input}
              is_choosed={is_choosed}
              self_input={self_input}
              upload_input={upload_input}
              choose_handler={choose_handler}
            />
          )}
          {data === null &&
          is_self_input === false &&
          is_self_input === false ? (
            <Drop_file
              is_ext_allowed={is_ext_allowed}
              read_file={read_file_service}
            />
          ) : null}
          {is_self_input ? <h1>SELF INPUT</h1> : null}
        </div>
      )}
      {data ? (
        <Table
          table_name={table_name}
          data={data}
          columns={columns}
          is_edit_able={is_edit_able}
          is_download_able={is_download_able}
          add_column_service={add_column_service}
          add_row_service={add_row_service}
          csv_string_to_csv_file={csv_string_to_csv_file}
          data_to_csv_string={data_to_csv_string}
          update_cell_service={update_cell_service}
        />
      ) : null}
    </div>
  );
};

export default Data_Box;
