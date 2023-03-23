import produce from "immer";
import { create } from "zustand";

export interface World_Ui_Interface {
  is_self_input: boolean | null;
  is_choosed: boolean;
  clear_state: () => void;
  set_self_input: () => void;
  set_upload_input: () => void;
  set_choosed: () => void;
}

export const use_world_ui = create<World_Ui_Interface>()(
  //
  (set, get) => ({
    is_self_input: null,
    is_choosed: false,
    clear_state: () => set(() => ({ is_self_input: null, is_choosed: false })),
    set_self_input: () => set(() => ({ is_self_input: true })),
    set_upload_input: () => set(() => ({ is_self_input: false })),
    set_choosed: () =>
      set((state: World_Ui_Interface) => {
        const prev_value = state.is_choosed;
        return { is_choosed: !prev_value };
      }),
  })
);
