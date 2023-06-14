import React, { useRef } from "react";
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

interface Data {
  [col_name: string]: number | string | null;
}

interface Props {
  data: any[] | null; // problem here ANY, THE ROOT OF ALL EVIL
  columns: string[] | null;
  table_name?: string;
  is_download_able?: boolean;
  is_edit_able?: boolean;
  add_row_service?: () => void;
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

  console.log("table's name", table_name);
  // console.log("data", data);
  //console.log("columns", columns);

  const add_row = () => {
    //console.log("ADD ROW");
    // SERVICE
    add_row_service && add_row_service();
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
            <button
              className={`btn_default ${classes.btn_control}`}
              onClick={add_row}
            >
              ADD ROW
            </button>
          </div>
          <div className={classes.add_column_wrapper}>
            <input
              type={"text"}
              className={classes.input_add_column}
              ref={input_add_col_ref}
            />
            <button
              className={`btn_default ${classes.btn_add_column}`}
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
