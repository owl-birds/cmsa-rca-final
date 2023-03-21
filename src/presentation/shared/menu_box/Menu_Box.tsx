import React from "react";
import classes from "./Menu_box.module.scss";
import { Link } from "react-router-dom";

interface Props {
  link: string;
  title: string;
}

const Menu_Box = (props: Props) => {
  const { link, title } = props;
  return (
    <div className={classes.cmsa_menu}>
      <Link className={classes.link} to={link}>
        {title}
      </Link>
    </div>
  );
};

export default Menu_Box;
