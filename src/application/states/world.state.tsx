import produce from "immer";
import { create } from "zustand";

export interface Data {
  [col_name: string]: number | string | null;
}

export interface Uploaded_World_File_State {
  data: any[] | null; // BAND AID
  columns: string[] | null;
  // MORE COMPLEXIIES YAY, AHAHHAHA
  // not a number columns
  str_columns: string[];
  // a number columns
  // num_columns: number[] | null;
  // MORE COMPLEXIIES YAY, AHAHHAHA
  year: number[];
  add_year: (year_or_years: number[] | number | string | string[]) => void;
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
  add_row: (how_many: number) => void;
  add_column: (new_column: string) => void;
  get_years: () => number[];
  get_unique_values_columns: (col_name: string, is_lower: boolean) => string[];
}

export const use_world_file_store = create<Uploaded_World_File_State>()(
  (set: any, get: any) => ({
    // PROBLEM HERE, BAND AID, NEED TO FIND OUT MORE
    data: null,
    columns: null,
    // MORE COMPLEXIIES YAY, AHAHHAHA
    str_columns: [],
    // num_columns: null,
    // MORE COMPLEXIIES YAY, AHAHHAHA
    year: [],
    add_year: (year_or_years: number[] | number | string | string[]) =>
      set(
        produce((state: Uploaded_World_File_State) => {
          //
          if (Number(year_or_years)) {
            const year: number = new Date(`${year_or_years}`).getFullYear();
            if (!Number.isNaN(year)) {
              state.year.push(year);
              state.year.sort((a, b) => a - b);
            }
            // state.year.push(year_or_years);
            // state.year.sort((a, b) => a - b);
          }
          if (typeof year_or_years === "object") {
            for (let year of year_or_years) {
              const temp_year: number = new Date(year).getFullYear();
              // if (Number(col)) years.push(Number(col));
              if (!Number.isNaN(temp_year)) {
                state.year.push(temp_year);
                state.year.sort((a, b) => a - b);
              }
            }
          }
        })
      ),
    clear_state: () =>
      set(() => ({ data: null, columns: null, str_columns: [], year: [] })),
    initiate_data: (new_data: any[], new_columns: string[]) =>
      set(
        produce((state: Uploaded_World_File_State) => {
          state.data = new_data;
          state.columns = new_columns;
          for (let col of new_columns) {
            const temp_year: number = new Date(col).getFullYear();
            // if (Number(col)) years.push(Number(col));
            if (!Number.isNaN(temp_year)) state.year.push(temp_year);
            // MORE COMPLEXIIES YAY, AHAHHAHA
            else state.str_columns.push(col);
            // MORE COMPLEXIIES YAY, AHAHHAHA
            state.year.sort((a, b) => a - b);
          }
        })
      ),
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
        return {
          columns: new_columns,
          data: starting_data,
          // MORE COMPLEXITIES
          str_columns: new_columns,
          // MORE COMPLEXITIES
        };
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
    add_row: (how_many: number) => {
      set(
        produce((state: Uploaded_World_File_State) => {
          // const new_row: Data = {};
          // if (state.columns && state.data) {
          //   for (const col of state.columns) {
          //     // new_row[col] = null;
          //     new_row[col] = "-";
          //   }
          //   state.data.push(new_row);
          // }
          if (state.columns && state.data && state.columns.length > 0) {
            for (let i = 0; i < how_many; i += 1) {
              const new_row: Data = {};
              for (const col of state.columns) {
                // new_row[col] = null;
                new_row[col] = "-";
              }
              state.data.push(new_row);
            }
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
            const year: number = new Date(new_column).getFullYear();
            if (!Number.isNaN(year)) {
              state.year.push(year);
              state.year.sort((a, b) => a - b);
            }
            // MORE COMPLEXIIES YAY, AHAHHAHA
            else {
              state.str_columns.push(new_column);
            }
            // MORE COMPLEXIIES YAY, AHAHHAHA
            for (const row of state.data) {
              row[new_column] = null;
            }
          }
        })
      );
    },
    get_years: () => {
      const year = get().year;
      return year;
      // const current_columns: string[] | null = get().columns;
      // const years: number[] = [];
      // if (current_columns) {
      //   for (let col of current_columns) {
      //     const temp_year: number = new Date(col).getFullYear();
      //     // if (Number(col)) years.push(Number(col));
      //     if (!Number.isNaN(temp_year)) years.push(temp_year);
      //   }
      // }
      // return years;
    },
    // get_unique_values_columns: (col_name: string) => {
    //   const unique_values: Set<string> = new Set();
    //   const data = get().data;
    //   for (let row of data) {
    //     if (row[col_name]) {
    //       unique_values.add(`${row[col_name]}`.trim().toLowerCase());
    //     }
    //   }
    //   return [...unique_values];
    // },
    get_unique_values_columns: (col_name: string, is_lower: boolean = true) => {
      const unique_values: Set<string> = new Set();
      const data = get().data;
      if (is_lower) {
        for (let row of data) {
          if (row[col_name]) {
            unique_values.add(`${row[col_name]}`.trim().toLowerCase());
          }
        }
      } else {
        for (let row of data) {
          if (row[col_name]) {
            unique_values.add(`${row[col_name]}`.trim());
          }
        }
      }
      return [...unique_values];
    },
  })
);
