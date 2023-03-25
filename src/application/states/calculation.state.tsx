import produce from "immer";
import { create } from "zustand";

export interface Calculation_State_Interface {
  first_period: number | null;
  second_period: number | null;
  method_type: string | null;
  year_interval: number | null;
  clear_state: () => void;
  set_first_period: (new_period: number) => void;
  set_second_period: (new_period: number) => void;
  set_method_type: (new_method: string) => void;
  set_year_interval: (new_interval: number) => void;
}

export const use_calculation_store = create<Calculation_State_Interface>()(
  (set, get) => ({
    first_period: null,
    second_period: null,
    method_type: null,
    year_interval: null,
    clear_state: () =>
      set(() => ({
        first_period: null,
        second_period: null,
        method_type: null,
        year_interval: null,
      })),
    set_first_period: (new_period: number) =>
      set(() => ({ first_period: new_period })),
    set_second_period: (new_period: number) =>
      set(() => ({ second_period: new_period })),
    set_method_type: (new_method: string) =>
      set(() => ({ method_type: new_method })),
    set_year_interval: (new_interval: number) =>
      set(() => ({ year_interval: new_interval })),
  })
);
