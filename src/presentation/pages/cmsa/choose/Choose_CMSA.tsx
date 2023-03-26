import React from "react";
import classes from "./Choose_CMSA.module.scss";
// import { Link } from "react-router-dom";
import Menu_Box from "../../../shared/menu_box/Menu_Box";
import Link_Box_Text from "../../../shared/link_box_text/Link_Box_Text";
// import { clear_world_data_service } from "../../../../application/services/world_data.service";
// import { clear_country_data_service } from "../../../../application/services/country_data.service";
// import { clear_calculation_service } from "../../../../application/services/calculation.service";

const Choose_CMSA = () => {
  // clear_world_data_service();
  // clear_country_data_service();
  // clear_calculation_service();
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
