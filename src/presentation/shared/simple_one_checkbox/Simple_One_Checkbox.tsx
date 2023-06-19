import React from "react";

interface Props {
  set_is_check: React.Dispatch<React.SetStateAction<boolean>>;
  is_check: boolean;
  label?: string;
  function_need_to_run?: () => void;
}

const Simple_One_Checkbox = (props: Props) => {
  const { set_is_check, is_check, label, function_need_to_run } = props;
  return (
    <>
      <label>
        <input
          onChange={() => {
            set_is_check((prev_val) => !prev_val);
            function_need_to_run && function_need_to_run();
          }}
          checked={is_check}
          type="checkbox"
        />
        {label ? label : "checkbox label"}
      </label>
    </>
  );
};

export default Simple_One_Checkbox;
