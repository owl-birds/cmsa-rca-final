import React from "react";
import classes from "./Choose_CMSA.module.scss";
import { Link } from "react-router-dom";
import Menu_Box from "../../../shared/menu_box/Menu_Box";
import Link_Box_Text from "../../../shared/link_box_text/Link_Box_Text";

const Choose_CMSA = () => {
  return (
    <>
      <Link_Box_Text link="/" title="BACK" />
      <section className={classes.cmsa_menu_box}>
        <Menu_Box link="/main/cmsa/one-level" title="ONE LEVEL" />
        <Menu_Box link="/main/cmsa/two-level" title="TWO LEVEL" />
        <Menu_Box link="/main/cmsa/three-level" title="THREE LEVEL" />
      </section>
    </>
  );
};

export default Choose_CMSA;
