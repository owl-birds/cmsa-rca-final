import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import classes from "./Layout.module.scss";

const Layout = () => {
  // const { pathname } = useLocation();
  // console.log(pathname);
  // console.log("LAYOUT");
  return (
    <div className={classes.layout}>
      {/* {pathname === "/main/rca" ? (
        <section className={classes.link_box}>
          <Link className={classes.link} to={"/"}>
            HOME
          </Link>
        </section>
      ) : null} */}
      <Outlet />
    </div>
  );
};

export default Layout;
