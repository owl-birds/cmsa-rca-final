import React from "react";
import classes from "./Formula_Desc.module.scss";

// components
import Desc from "../formula_description/Desc";
import Render_Tex_to_Formula from "../math_formula/Katex_Math_Formula";

interface Props {
  method_name: string;
  method_sub_type: string;
  formula_tex: string;
  general_desc_tex?: string[][];
  formula_components_tex?: string[][];
}

const Formula_Desc = (props: Props) => {
  const {
    method_name,
    method_sub_type,
    formula_tex,
    general_desc_tex,
    formula_components_tex,
  } = props;
  return (
    <>
      <div className={classes.method_descriptions}>
        <h4>
          {method_name.toUpperCase()} {method_sub_type.toUpperCase()}
        </h4>
        <div className={classes.method_formula_box}>
          <div className={classes.formula}>
            {/* one by one conditioned */}
            <Render_Tex_to_Formula tex_string={formula_tex} />
          </div>
          <div className={classes.desc}>
            {/* GENERAL DESC */}
            {general_desc_tex &&
              general_desc_tex.map((desc: string[], idx: number) => (
                <Desc
                  key={idx}
                  tex_symbol_string={desc[0]}
                  explanation={desc[1]}
                />
              ))}
            {/* COMPONENTS */}
            {method_name === "CMSA" && <h4>COMPONENTS</h4>}
            {/* bad parctice above hardcode value */}
            {formula_components_tex &&
              formula_components_tex.map((comp: string[], idx: number) => (
                <Desc
                  key={idx}
                  tex_symbol_string={comp[0]}
                  explanation={comp[1]}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Formula_Desc;

// <section className={classes.method_informations}>
//   <div className={classes.formula}>
//     <Render_Tex_to_Formula tex_string={tex_cmsa_three_level} />
//   </div>
//   <br />
//   <div className={classes.descriptions}>
//     <Desc tex_symbol_string="X" explanation="Export" />
//     <Desc tex_symbol_string="r" explanation="Country r" />
//     <Desc tex_symbol_string="i" explanation="Commodity i" />
//     <Desc tex_symbol_string="p" explanation="Partner or Region" />
//     <Desc tex_symbol_string="0" explanation="First Period" />
//     <Desc tex_symbol_string="1" explanation="Second Period" />
//     <Desc
//       tex_symbol_string="g = \frac{X^1 - X^0}{X^0}"
//       explanation=""
//     />
//     <Desc
//       tex_symbol_string="g"
//       explanation="export growth rate (if there is no r in the symbol its in the value of world exports)"
//     />
//   </div>
//   <br />
//   <div
//     className={`${classes.descriptions} ${classes.descriptions_effects}`}
//   >
//     {tex_cmsa_three_level_components.map(
//       (comp: string[], idx: number) => (
//         <Desc
//           key={idx}
//           tex_symbol_string={comp[0]}
//           explanation={comp[1]}
//         />
//       )
//     )}
//   </div>
// </section>
