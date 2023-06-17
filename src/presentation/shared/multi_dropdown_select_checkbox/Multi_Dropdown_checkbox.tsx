////
// CREDITS
// https://medium.com/geekculture/creating-multi-select-dropdown-with-checkbox-in-react-792ff2464ef3
////

import React, { useState } from "react";

import classes from "./Multi_Dropdown_checkbox.module.scss";

///
import { components } from "react-select";
import Select from "react-select";
///
const Option = (
  props: any // problem here ANY AHAHHAHA
) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

interface Props {
  options: { [index: string]: string | number }[];
  // {value: string|number, label: string}[]
  placeholder: string;
  set_selected: (new_selecteds: any) => void;
}

const Multi_Dropdown_checkbox = (props: Props) => {
  const { options, placeholder, set_selected } = props;
  // const [selecteds, set_selecteds] = useState(null);

  const handle_change = (s: any) => {
    // set_selecteds(() => s);
    set_selected(s);
  };
  // console.log("MULTIPLE SELECT CHECKBOXS", selecteds);
  return (
    <div
      data-toggle="popover"
      data-trigger="focus"
      data-content={`${placeholder}`}
      className={classes.multiple_select_checkboxs}
    >
      <Select
        options={options}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={handle_change}
        // allowSelectAll={true}
        // value={selecteds}
      />
    </div>
  );
};

export default Multi_Dropdown_checkbox;
