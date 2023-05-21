export interface Validate_Data_Column {
  is_pass: boolean;
  message: string;
}

export const is_data_empty = (): boolean => {
  return false;
};

export const validate_data_columns = (
  columns: string[],
  column_must_exist: string[] = ["region", "commodity"],
  data_name: string = "country"
  // default three level
): Validate_Data_Column => {
  const col_set: Set<string> = new Set(columns);
  for (let col of column_must_exist) {
    if (!col_set.has(col))
      return {
        is_pass: false,
        message: `${col} not found on ${data_name} data`,
      };
  }
  return { is_pass: true, message: "passed" };
};

export const validate_multiple_data_columns = (
  // country_columns: string[],
  // world_columns: string[],
  data_columns: string[][],
  column_must_exist: string[] = ["region", "commodity"]
): Validate_Data_Column => {
  // const country_columns_set: Set<string> = new Set(country_columns);
  // const world_columns_set: Set<string> = new Set(world_columns);
  const data_columns_set: Set<string>[] = [];
  for (let cols of data_columns) {
    data_columns_set.push(new Set(cols));
  }
  for (let col of column_must_exist) {
    for (let col_set of data_columns_set) {
      if (!col_set.has(col))
        return { is_pass: false, message: `${col} column not found` };
    }

    // if (!country_columns_set.has(col))
    //   return {
    //     is_pass: false,
    //     message: `${col} column doesnt exist in country data`,
    //   };
    // if (!world_columns_set.has(col))
    //   return {
    //     is_pass: false,
    //     message: `${col} column doesnt exist in world data`,
    //   };
  }

  return { is_pass: true, message: "passed" };
};
