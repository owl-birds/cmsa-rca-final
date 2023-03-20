import React from "react";
import classes from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={classes.home}>
      <section>
        <span>CMSA</span>
      </section>
      <section>
        <span>RCA</span>
      </section>
    </div>
  );
};

export default Home;
