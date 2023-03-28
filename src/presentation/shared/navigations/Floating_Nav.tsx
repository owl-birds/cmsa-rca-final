import React from "react";
import classes from "./Floating_Nav.module.scss";

interface Props {
  a_hrefs: string[];
}

const Floating_Nav = (props: Props) => {
  const { a_hrefs } = props;
  return (
    <nav className={classes.floating_nav}>
      {a_hrefs.map((href: string, idx: number) => (
        <a href={`#${href}`} key={idx}>
          {href}
        </a>
      ))}
    </nav>
  );
};

export default Floating_Nav;
