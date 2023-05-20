import produce from "immer";
import { create } from "zustand";

export interface Calculation_State_Interface {
  first_period: number | null;
  second_period: number | null;
  country: string | null;
  method_type: string | null;
  method_sub_type: string | null;
  year_interval: number | null;
  result: any[] | null;
  clear_state: () => void;
  set_first_period: (new_period: number) => void;
  set_second_period: (new_period: number) => void;
  set_country: (new_country: string) => void;
  set_method_type: (new_method: string) => void;
  set_method_sub_type: (new_method_sub_type: string) => void;
  set_year_interval: (new_interval: number) => void;
  set_result: (new_result: any[]) => void;
  add_result: (new_result: {}) => void;
}

export const use_calculation_store = create<Calculation_State_Interface>()(
  (set, get) => ({
    first_period: null,
    second_period: null,
    country: null,
    method_type: null,
    method_sub_type: null,
    year_interval: null,
    result: null,
    set_country: (new_country: string) => set(() => ({ country: new_country })),
    set_result: (new_result: any[]) => set(() => ({ result: new_result })),
    add_result: (new_result: {}) =>
      set(
        produce((state: Calculation_State_Interface) => {
          //
          if (!state.result) {
            state.result = [];
            state.result.push(new_result);
            return;
          }
          state.result.push(new_result);
        })
      ),
    clear_state: () =>
      set(() => ({
        first_period: null,
        second_period: null,
        country: null,
        method_type: null,
        method_sub_type: null,
        year_interval: null,
        result: null,
      })),
    set_first_period: (new_period: number) =>
      set(() => ({ first_period: new_period })),
    set_second_period: (new_period: number) =>
      set(() => ({ second_period: new_period })),
    set_method_type: (new_method: string) =>
      set(() => ({ method_type: new_method })),
    set_method_sub_type: (new_method_sub_type: string) =>
      set(() => ({ method_sub_type: new_method_sub_type })),
    set_year_interval: (new_interval: number) =>
      set(() => ({ year_interval: new_interval })),
  })
);
