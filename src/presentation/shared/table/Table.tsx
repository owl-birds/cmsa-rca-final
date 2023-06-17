import React, { useRef, useState } from "react";
// import {
//   add_column_service,
//   add_row_service,
// } from "../../../application/services/data.service";
// import {
//   csv_string_to_csv_file,
//   data_to_csv_string,
// } from "../../../application/services/file.service";
// import {
//   Data,
//   //Uploaded_File_State,
//   //use_file_store
// } from "../../../application/states/file.state";
import Cell from "./Cell";
import classes from "./Table.module.scss";
import cell_classes from "./Cell.module.scss";
import Modal_Num_Input from "../modal_num_input/Modal_Num_Input";

interface Data {
  [col_name: string]: number | string | null;
}

interface Props {
  data: any[] | null; // problem here ANY, THE ROOT OF ALL EVIL
  columns: string[] | null;
  table_name?: string;
  is_download_able?: boolean;
  is_edit_able?: boolean;
  add_row_service?: (how_many: number) => void;
  add_column_service?: (column_name: string) => void;
  data_to_csv_string?: (data: any[], columns: string[]) => string;
  csv_string_to_csv_file?: (
    csv_string: string,
    silent_a: HTMLAnchorElement
  ) => void;
  update_cell_service?: (
    new_value: string | number,
    row_index: number,
    column_name: string
  ) => void;
  clear_data_service?: () => void;
  clear_ui_state?: () => void;
}

const Table = (props: Props) => {
  //const data = use_file_store((state: Uploaded_File_State) => state.data);
  //const columns = use_file_store((state: Uploaded_File_State) => state.columns);

  const {
    table_name,
    is_download_able,
    data,
    columns,
    is_edit_able,
    csv_string_to_csv_file,
    data_to_csv_string,
    add_column_service,
    add_row_service,
    update_cell_service,
    clear_data_service,
    clear_ui_state,
  } = props;

  //const table_ref = useRef<HTMLTableElement | null>(null);
  const silent_a_ref = useRef<HTMLAnchorElement | null>(null);
  const input_add_col_ref = useRef<HTMLInputElement | null>(null);

  // input row state
  // const [is_insert_row_open, set_is_insert_row_open] = useState<boolean>(false);
  const input_add_row_ref = useRef<HTMLInputElement | null>(null);

  console.log("table's name", table_name);
  // console.log("data", data);
  //console.log("columns", columns);

  const add_row = () => {
    //console.log("ADD ROW");
    // SERVICE
    // add_row_service && add_row_service();
    // set_is_insert_row_open((prev_val) => !prev_val);
    if (input_add_row_ref && input_add_row_ref.current) {
      const input_html = input_add_row_ref.current as HTMLInputElement;
      const value = input_html.value;
      if (Number(value)) {
        add_row_service && add_row_service(Number(value));
      } else {
        // input_html.value = "Input a NUMBER";
        input_html.placeholder = "INPUT A NUMBER";
        input_html.value = "";
        return;
      }
      input_html.placeholder = "Type a number here";
      input_html.value = "";
    }
  };

  const add_column = () => {
    if (input_add_col_ref) {
      //console.log(input_add_col_ref.current.value);
      // SERVICE
      const input_new_column = input_add_col_ref.current as HTMLInputElement;
      if (input_new_column && input_new_column.value) {
        //console.log("NOT EMPTY", input_add_col_ref.current.value);
        const new_column = input_new_column.value;
        add_column_service && add_column_service(new_column);
        // put some notification or some feedback to the user
        // if it failed or succeded
      }
      input_new_column.value = "";
    }
  };

  const download_data_to_csv = () => {
    if (
      data &&
      columns &&
      data.length > 0 &&
      data_to_csv_string &&
      csv_string_to_csv_file
    ) {
      const csv_string = data_to_csv_string(data, columns);
      //console.log(csv_string);
      if (silent_a_ref) {
        // SERVICE
        csv_string_to_csv_file(
          csv_string,
          silent_a_ref.current as HTMLAnchorElement
        );
      }
    }
  };

  const clear_data_handler = () => {
    clear_data_service && clear_data_service();
    clear_ui_state && clear_ui_state();
  };

  return (
    <div className={classes.table_box}>
      {/* {add_row_service && is_insert_row_open && (
        <Modal_Num_Input
          modal_title={"INSERT ROW"}
          do_this={add_row_service}
          close_modal={set_is_insert_row_open}
        />
      )} */}
      {/* <h4>{table_name ? table_name : "Table's Title"}</h4> */}
      {table_name ? <h4>{table_name}</h4> : null}
      {data && is_edit_able ? (
        <div className={classes.table_control}>
          <div className={classes.table_buttons_box}>
            <button
              className={`btn_default ${classes.btn_control}`}
              onClick={clear_data_handler}
            >
              RESET DATA
            </button>
          </div>
          <div className={classes.input_wrapper}>
            <input
              type={"text"}
              className={classes.input}
              ref={input_add_row_ref}
              placeholder={"Type a number here"}
            />
            <button className={`btn_default ${classes.btn}`} onClick={add_row}>
              INSERT ROWS
            </button>
          </div>
          <div className={classes.input_wrapper}>
            <input
              type={"text"}
              className={classes.input}
              ref={input_add_col_ref}
              placeholder={"Type a column name here"}
            />
            <button
              className={`btn_default ${classes.btn}`}
              onClick={add_column}
            >
              ADD COLUMN
            </button>
          </div>
        </div>
      ) : null}
      {/* {data.length > 0 ? ( */}
      {data && columns ? (
        <div className={classes.table_wrapper}>
          <table
            className={classes.table}
            //ref={table_ref}
          >
            <thead>
              <tr>
                {columns.map((col_name: string, idx: number) => (
                  <th key={idx}>{col_name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row: Data, row_idx: number) => (
                <tr key={row_idx}>
                  {columns.map(
                    (col_name: string, col_idx: number) =>
                      is_edit_able ? (
                        <td key={col_idx}>
                          <Cell
                            value={row[col_name]}
                            row_index={row_idx}
                            column_name={col_name}
                            update_cell_service={update_cell_service}
                          />
                        </td>
                      ) : (
                        <td key={col_idx}>
                          <div
                            className={`${
                              Number(row[col_name]) ||
                              row[col_name] === "0" ||
                              row[col_name] === 0
                                ? cell_classes.cell_align_right
                                : ""
                            }`}
                          >
                            {row[col_name] || row[col_name] === 0
                              ? Number(row[col_name]) &&
                                col_name !== "period" &&
                                col_name !== "periods"
                                ? Number.parseFloat(`${row[col_name]}`).toFixed(
                                    2
                                  )
                                : `${row[col_name]}`
                              : "-"}
                          </div>
                        </td>
                      )

                    //                                                    <td key={idx}>{row[col_name]}</td>
                    //                                                    <td key={col_idx}>
                    //                                                        <Cell
                    //                                                        value={row[col_name]}
                    //                                                        index={row_idx}
                    //                                                        column={col_name}
                    //                                                        />
                    //                                                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {is_download_able ? (
        <button onClick={download_data_to_csv} className="btn_default">
          Export
          <a ref={silent_a_ref} className={classes.silent_a}>
            SILENT A
          </a>
        </button>
      ) : null}
    </div>
  );
};

export default Table;
