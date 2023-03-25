import React from "react";
import Render_Tex_to_Formula from "../math_formula/Katex_Math_Formula";
import classes from "./Desc.module.scss";

interface Props {
  tex_symbol_string: string;
  explanation: string;
}

const Desc = (props: Props) => {
  const { tex_symbol_string, explanation } = props;
  return (
    <div className={classes.desc}>
      <Render_Tex_to_Formula tex_string={tex_symbol_string} />
      {explanation.length > 0 && <span>=</span>}
      {explanation.length > 0 && <span>{explanation}</span>}
    </div>
  );
};

export default Desc;
