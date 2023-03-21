import React from "react";
import classes from "./Home.module.scss";
import { Link } from "react-router-dom";
import Menu_Box from "../../shared/menu_box/Menu_Box";

const Home = () => {
  return (
    <div className={classes.home}>
      <Menu_Box link="/main/cmsa" title="CMSA" />
      <Menu_Box link="/main/rca" title="RCA" />
      {/* <section>
        <Link className={classes.link} to={"/main/cmsa"}>
          CMSA
        </Link>
      </section>
      <section>
        <Link className={classes.link} to={"/main/rca"}>
          RCA
        </Link>
      </section> */}
    </div>
  );
};

export default Home;
