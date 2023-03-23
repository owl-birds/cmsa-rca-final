import React, { useState } from "react";
import classes from "./Choose_Input_Type.module.scss";

interface Props {
  is_self_input: boolean | null;
  is_choosed: boolean;
  data_kind: string;
  choose_handler: () => void;
  self_input: () => void;
  upload_input: () => void;
  initiate_self_input_service: (data_kind: string) => void;
}

const Choose_Input_Type = (props: Props) => {
  const {
    is_choosed,
    is_self_input,
    data_kind,
    choose_handler,
    self_input,
    upload_input,
    initiate_self_input_service,
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

  const self_input_curried = (data_kind: string) => {
    return () => {
      choose_handler();
      self_input();
      initiate_self_input_service(data_kind);
    };
  };
  const upload_file_curried = () => () => {
    choose_handler();
    upload_input();
  };

  return (
    <div className={classes.input_type_box}>
      {/* two buttons */}
      {!is_choosed ? (
        <div className={classes.input_type}>
          <button
            onClick={
              self_input_curried(data_kind)
              // () => {
              // choose_handler();
              // self_input();
              // initiate_self_input_service(data_kind);
              // }
            }
            className="btn_default"
          >
            SELF INPUT
          </button>
          <button
            onClick={
              upload_file_curried()
              // () => {
              // choose_handler();
              // upload_input();
              // }
            }
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
