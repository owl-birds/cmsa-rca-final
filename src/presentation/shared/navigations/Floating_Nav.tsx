import React from "react";
import classes from "./Floating_Nav.module.scss";

interface Props {
  // a_hrefs: string[];
  a_hrefs: any[][];
}

// a_hrefs: any[][] :::
// [
//  [id_name, func_need_to_run_when_clicked],
//  ...
// ]

// new proposal
// a_hrefs: any[] :::>
// [[is_id, id_name, function_need_to_run], ...]
// or [
//  {id_id: bool, id_name: string, run_func: Func}
//  , ...
// ]
const Floating_Nav = (props: Props) => {
  const { a_hrefs } = props;
  return (
    <nav className={classes.floating_nav}>
      {a_hrefs.map((href: any[], idx: number) =>
        a_hrefs[1] ? (
          <a href={`#${href[0]}`} key={idx} onClick={href[1]}>
            {href[0]}
          </a>
        ) : (
          <a href={href[0]} key={idx}>
            {href[0]}
          </a>
        )
      )}
    </nav>
  );
};

export default Floating_Nav;
