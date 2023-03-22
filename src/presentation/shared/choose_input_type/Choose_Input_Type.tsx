import React, { useState } from "react";
import classes from "./Choose_Input_Type.module.scss";

interface Props {
  is_self_input: boolean | null;
  is_choosed: boolean;
  choose_handler: () => void;
  self_input: () => void;
  upload_input: () => void;
}

const Choose_Input_Type = (props: Props) => {
  const {
    is_choosed,
    is_self_input,
    choose_handler,
    self_input,
    upload_input,
  } = props;
  // const [is_self_input, set_is_self_input] = useState<boolean>(false);
  // const [is_choosed, set_is_choosed] = useState<boolean>(false);

  console.log("is self input", is_self_input);

  // const choose_handler = () => {
  //   set_is_choosed((prev_choose) => !prev_choose);
  // };

  // const self_input = () => {
  //   set_is_self_input(() => true);
  // };
  // const upload_input = () => {
  //   set_is_self_input(() => false);
  // };

  return (
    <div className={classes.input_type_box}>
      {/* two buttons */}
      {!is_choosed ? (
        <div className={classes.input_type}>
          <button
            onClick={() => {
              choose_handler();
              self_input();
            }}
            className="btn_default"
          >
            SELF INPUT
          </button>
          <button
            onClick={() => {
              choose_handler();
              upload_input();
            }}
            className="btn_default"
          >
            UPLOAD FILE
          </button>
        </div>
      ) : (
        <div className={classes.input_type}>
          <div>
            <button
              onClick={() => {
                choose_handler();
              }}
              className="btn_default"
            >
              TESTING ONLY PURPOSES
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Choose_Input_Type;
