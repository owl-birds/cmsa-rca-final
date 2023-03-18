import produce from "immer";
import { create } from "zustand";

export interface Country_Ui_Interface {
  is_self_input: boolean;
  is_choosed: boolean;
  set_self_input: () => void;
  set_upload_input: () => void;
  set_choosed: () => void;
}

export const use_country_ui = create<Country_Ui_Interface>()(
  //
  (set, get) => ({
    is_self_input: false,
    is_choosed: false,
    set_self_input: () => set(() => ({ is_self_input: true })),
    set_upload_input: () => set(() => ({ is_self_input: false })),
    set_choosed: () =>
      set((state: Country_Ui_Interface) => {
        const prev_value = state.is_choosed;
        return { is_choosed: !prev_value };
      }),
  })
);
