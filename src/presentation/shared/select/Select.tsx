import React, { useRef } from "react";
import classes from "./Select.module.scss";

interface Props {
  options: number[] | string[];
  is_number?: boolean;
  default_value?: string;
  set_selected_opt?: (option: any) => void;
}

const Select = (props: Props) => {
  const { options, is_number, default_value, set_selected_opt } = props;
  const select_ref = useRef<null | HTMLSelectElement>(null);

  const select_handler = () => {
    if (select_ref && set_selected_opt) {
      // console.log(select_ref.current?.value);
      const value = select_ref.current?.value;
      if (Number(value) && is_number) set_selected_opt(Number(value));
      if (typeof value === "string" && !is_number) set_selected_opt(value);
    }
  };

  return (
    <>
      <div className={classes.select_box}>
        <select
          // onSelect={select_handler}
          ref={select_ref}
          onChange={select_handler}
          defaultValue={default_value ? default_value : "default"}
        >
          <option value={default_value ? default_value : "default"}>
            {default_value ? default_value : "default"}
          </option>
          {options.map((opt: number | string, idx: number) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
