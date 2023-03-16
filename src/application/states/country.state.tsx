import produce from "immer";
import { create } from "zustand";

export interface Data {
  [col_name: string]: number | string | null;
}

export interface Uploaded_Country_File_State {
  data: any[]; // BAND AID
  columns: string[];
  clear_state: () => void;
  initiate_data: (new_data: any[], columns: string[]) => void;
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

export const use_country_file_store = create<Uploaded_Country_File_State>()(
  (set: any, get: any) => ({
    // PROBLEM HERE, BAND AID, NEED TO FIND OUT MORE
    data: [],
    columns: [],
    clear_state: () => set(() => ({ data: [], columns: [] })),
    initiate_data: (new_data: any[], new_columns: string[]) =>
      set(() => ({ data: new_data, columns: new_columns })),
    update_cell: (
      // REAL SLOW
      new_value: string | number,
      row_index: number,
      col_name: string
    ) => {
      set((state: Uploaded_Country_File_State) => {
        const new_data = [...state.data];
        //const new_data = state.data.map((row)=>({...row}));
        new_data[row_index][col_name] =
          Number(new_value) || Number(new_value) === 0
            ? Number(new_value)
            : new_value;
        return { data: new_data };
      });
    },
    update_cell_2: (
      new_value: string | number,
      row_index: number,
      col_name: string
    ) => {
      set(
        produce((state: Uploaded_Country_File_State) => {
          state.data[row_index][col_name] =
            Number(new_value) || Number(new_value) === 0
              ? Number(new_value)
              : new_value;
        })
      );
    },
    add_row: () => {
      set(
        produce((state: Uploaded_Country_File_State) => {
          const new_row: Data = {};
          for (const col of state.columns) {
            new_row[col] = null;
          }
          state.data.push(new_row);
        })
      );
    },
    add_column: (new_column: string) => {
      set(
        produce((state: Uploaded_Country_File_State) => {
          if (state.columns.indexOf(new_column) !== -1) return;
          state.columns.push(new_column);
          for (const row of state.data) {
            row[new_column] = null;
          }
        })
      );
    },
  })
);
