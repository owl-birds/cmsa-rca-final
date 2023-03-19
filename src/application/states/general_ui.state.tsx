import produce from "immer";
import { create } from "zustand";

export interface General_UI_Interface {
  choosed_method: string;
  set_method: (new_method: string) => void;
}
