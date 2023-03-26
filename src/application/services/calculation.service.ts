import { use_calculation_store } from "../states/calculation.state";

export const clear_calculation_service = () => {
  const clear_state = use_calculation_store.getState().clear_state;
  clear_state();
};

export const set_result_service = (new_result: any[]) => {
  const set_result = use_calculation_store.getState().set_result;
  set_result(new_result);
};
