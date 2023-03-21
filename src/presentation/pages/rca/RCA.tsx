import React from "react";
import classes from "./RCA.module.scss";
import { Link } from "react-router-dom";
import Link_Box_Text from "../../shared/link_box_text/Link_Box_Text";

const RCA = () => {
  return (
    <>
      <Link_Box_Text link="/" title="BACK" />
      <section>RCA</section>
    </>
  );
};

export default RCA;
