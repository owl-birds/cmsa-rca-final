import React from "react";
import classes from "./Link_Box_Text.module.scss";
import { Link } from "react-router-dom";

interface Props {
  link: string;
  title: string;
}

const Link_Box_Text = (props: Props) => {
  const { link, title } = props;
  return (
    <section className={classes.link_box}>
      <Link className={classes.link} to={link}>
        {title}
      </Link>
    </section>
  );
};

export default Link_Box_Text;
