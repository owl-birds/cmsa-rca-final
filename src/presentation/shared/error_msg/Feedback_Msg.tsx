import React from "react";
import classes from "./Feedback_Msg.module.scss";

interface Props {
  message: string;
  is_error: boolean;
}

const Feedback_Msg = (props: Props) => {
  const { message, is_error } = props;
  return (
    <div className={classes.feedback_box}>
      <span className={is_error ? classes.error : classes.success}>
        {message}
      </span>
    </div>
  );
};

export default Feedback_Msg;
