import React from "react";
import classes from "./Link_Box_Text.module.scss";
import { Link } from "react-router-dom";

interface Props {
  id?: string;
  link: string;
  title: string;
  click_functions_handler?: () => void;
}

const Link_Box_Text = (props: Props) => {
  const { id, link, title, click_functions_handler } = props;

  const run_if_exist_handler = () => {
    if (click_functions_handler) click_functions_handler();
  };

  return (
    <section id={id ? id : ""} className={classes.link_box}>
      <Link onClick={run_if_exist_handler} className={classes.link} to={link}>
        {title}
      </Link>
    </section>
  );
};

export default Link_Box_Text;
