import React from "react";
import classes from "./Simple_Info_box.module.scss";

interface Props {
  info_text: string;
}

const Simple_Info_box = (props: Props) => {
  const { info_text } = props;
  return <div className={classes.info_text_box}>{info_text}</div>;
};

export default Simple_Info_box;
