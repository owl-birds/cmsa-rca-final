import {
  read_file,
  update_cell_service,
  add_column_service,
  add_row_service,
  initiate_self_input_service,
} from "./general_data.service";
import { use_country_file_store } from "../states/country.state";

export const clear_country_data_service = () => {
  const clear_state = use_country_file_store.getState().clear_state;
  clear_state();
};

export const initiate_country_self_input_service = (data_kind: string) => {
  const initiate_self_input_state =
    use_country_file_store.getState().initiate_self_input;
  initiate_self_input_service(data_kind, initiate_self_input_state);
};

export const read_country_file_service = (file: File) => {
  const initiate_file_state_data =
    use_country_file_store.getState().initiate_data;
  read_file(file, initiate_file_state_data);
};
export const update_cell_country_service = (
  new_value: number | string,
  row_index: number,
  column_name: string
) => {
  const update_cell = use_country_file_store.getState().update_cell_2;
  update_cell_service(new_value, row_index, column_name, update_cell);
};
export const add_country_row_service = () => {
  const add_row = use_country_file_store.getState().add_row;
  add_row_service(add_row);
};
export const add_country_column_service = (new_column: string) => {
  const add_column = use_country_file_store.getState().add_column;
  add_column_service(new_column, add_column);
};
