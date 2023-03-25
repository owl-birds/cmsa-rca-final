import React, { memo, useState } from "react";
import classes from "./Calculation_Options.module.scss";
import Years_Select from "../year_select/Years_Select";
// import {
//   Uploaded_World_File_State,
//   use_world_file_store,
// } from "../../../application/states/world.state";

interface Props {
  method_type: string;
  years: number[];
}

const Calculation_Options = memo((props: Props) => {
  const { years, method_type } = props;

  // const world_year = use_world_file_store(
  //   (state: Uploaded_World_File_State) => state.year
  // );

  const [is_year, set_is_year] = useState<boolean | null>(null);

  const year_menu_handler = () => {
    set_is_year((prev_val: boolean | null) => !prev_val);
  };

  return (
    <div className={classes.calculation_options}>
      <div className={classes.menus}>
        <div
          onClick={year_menu_handler}
          className={`${classes.menu} ${is_year ? classes.menu_selected : ""}`}
        >
          YEARS
        </div>
        <div className={`${classes.menu}`}>OTHER</div>
        <div className={`${classes.menu}`}>OTHER</div>
        <div className={`${classes.menu}`}>OTHER</div>
      </div>
      <div className={classes.select}>
        {is_year && <Years_Select years={years} />}
      </div>
    </div>
  );
});

export default Calculation_Options;
