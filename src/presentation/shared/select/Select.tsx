import React from "react";
import classes from "./Select.module.scss";

interface Props {
  options: number[] | string[];
  set_selected_opt: (option: any) => void;
}

const Select = (props: Props) => {
  const { options } = props;
  return (
    <>
      <div className={classes.select_box}>
        <select>
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
