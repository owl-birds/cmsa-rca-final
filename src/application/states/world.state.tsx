import produce from "immer";
import { create } from "zustand";

export interface Data {
  [col_name: string]: number | string | null;
}

export interface Uploaded_World_File_State {
  data: any[] | null; // BAND AID
  columns: string[] | null;
  clear_state: () => void;
  initiate_data: (new_data: any[], columns: string[]) => void;
  initiate_self_input: (data_kind: string) => void;
  update_cell: (
    new_value: string | number,
    row_index: number,
    col_name: string
  ) => void;
  update_cell_2: (
    new_value: string | number,
    row_index: number,
    col_name: string
  ) => void;
  add_row: () => void;
  add_column: (new_column: string) => void;
}

export const use_world_file_store = create<Uploaded_World_File_State>()(
  (set: any, get: any) => ({
    // PROBLEM HERE, BAND AID, NEED TO FIND OUT MORE
    data: null,
    columns: null,
    clear_state: () => set(() => ({ data: null, columns: null })),
    initiate_data: (new_data: any[], new_columns: string[]) =>
      set(() => ({ data: new_data, columns: new_columns })),
    initiate_self_input: (data_kind: string) =>
      set((_state: Uploaded_World_File_State) => {
        const new_columns: string[] = [];
        if (data_kind === "three_level") {
          new_columns.push(
            //
            // "country",
            "commodity"
            // "region/partner"
          );
        }
        if (data_kind === "two_level_commodity") {
          new_columns.push(
            // "country",
            "commodity"
            // "region/partner",
          );
        }
        if (data_kind === "two_level_region") {
          new_columns.push(
            // "country",
            // "commodity",
            "region/partner"
          );
        }
        if (data_kind === "one_level") {
          // new_columns.push(
          //   "country"
          //   // "commodity",
          //   // "region/partner"
          // );
        }
        if (data_kind === "rca") {
          new_columns.push(
            // "country"
            "commodity"
            // "region/partner"
          );
        }
        const starting_data = [];
        const starting_row: Data = {};
        for (const col of new_columns) {
          starting_row[col] = null;
        }
        starting_data.push(starting_row);
        return { columns: new_columns, data: starting_data };
      }),
    update_cell: (
      // REAL SLOW
      new_value: string | number,
      row_index: number,
      col_name: string
    ) => {
      set((state: Uploaded_World_File_State) => {
        const new_data = state.data ? [...state.data] : null;
        //const new_data = state.data.map((row)=>({...row}));
        if (new_data) {
          new_data[row_index][col_name] =
            Number(new_value) || Number(new_value) === 0
              ? Number(new_value)
              : new_value;
        }
        return { data: new_data };
      });
    },
    update_cell_2: (
      new_value: string | number,
      row_index: number,
      col_name: string
    ) => {
      set(
        produce((state: Uploaded_World_File_State) => {
          if (state.data) {
            state.data[row_index][col_name] =
              Number(new_value) || Number(new_value) === 0
                ? Number(new_value)
                : new_value;
          }
        })
      );
    },
    add_row: () => {
      set(
        produce((state: Uploaded_World_File_State) => {
          const new_row: Data = {};
          if (state.columns && state.data) {
            for (const col of state.columns) {
              new_row[col] = null;
            }
            state.data.push(new_row);
          }
        })
      );
    },
    add_column: (new_column: string) => {
      set(
        produce((state: Uploaded_World_File_State) => {
          if (state.columns && state.columns.indexOf(new_column) !== -1) return;
          if (state.columns && state.data) {
            state.columns.push(new_column);
            for (const row of state.data) {
              row[new_column] = null;
            }
          }
        })
      );
    },
  })
);
