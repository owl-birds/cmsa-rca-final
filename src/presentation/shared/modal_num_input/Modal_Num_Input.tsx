import React, { useRef } from "react";
import classes from "./Modal_Num_Input.module.scss";

// TRASH, NEED MORE WORK

interface Props {
  // run the function below when clikc OK
  modal_title?: string;
  do_this: (inputed_number: number) => void;
  close_modal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal_Num_Input = (props: Props) => {
  const { modal_title, do_this, close_modal } = props;
  const input_ref = useRef(null);

  const button_handler = () => {
    if (input_ref && input_ref.current) {
      const input_html = input_ref.current as HTMLInputElement;
      const input_value = input_html.value;
      if (Number(input_value)) {
        do_this(Number(input_value));
        close_modal(() => false);
      }
    }
  };
  return (
    <div className={classes.modal}>
      <div className={classes.modal_box}>
        <div className={classes.modal_header}>
          <p className={classes.title}>
            {modal_title ? modal_title : "MODAL's TITLE"}
          </p>
          <span
            onClick={() => close_modal(() => false)}
            className={classes.close}
          >
            X
          </span>
        </div>
        <div className={classes.modal_input}>
          <input
            type="text"
            className={classes.input}
            ref={input_ref}
            placeholder={"Insert a number"}
            min={0}
          />
          <button
            onClick={button_handler}
            className={`btn_default ${classes.button}`}
          >
            {modal_title ? modal_title.toUpperCase() : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal_Num_Input;
