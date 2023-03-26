import React, { useState } from "react";
import {
  Calculation_State_Interface,
  use_calculation_store,
} from "../../../application/states/calculation.state";
import Select from "../select/Select";
import classes from "./Years_Select.module.scss";

interface Props {
  years: number[];
}

const Years_Select = (props: Props) => {
  const { years } = props;
  const [first_years, set_first_years] = useState(years);
  const [second_years, set_second_years] = useState(years);
  //
  const [is_interval, set_is_interval] = useState<boolean>(false);
  //
  const set_first_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_first_period
  );
  const set_second_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_second_period
  );
  const set_year_interval = use_calculation_store(
    (state: Calculation_State_Interface) => state.set_year_interval
  );

  //
  const interval_handler = () => {
    set_is_interval((prev_val: boolean) => true);
  };
  const two_points_handler = () => {
    set_is_interval((prev_val: boolean) => false);
  };

  // TEST
  const first_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.first_period
  );
  const second_period = use_calculation_store(
    (state: Calculation_State_Interface) => state.second_period
  );
  // console.log("first period", first_period);
  // console.log("second_period", second_period);

  return (
    <div className={classes.years_select}>
      <div className={classes.menu}>
        <div
          onClick={interval_handler}
          className={is_interval ? classes.menu_selected : ""}
        >
          interval
        </div>
        <div
          onClick={two_points_handler}
          className={is_interval ? "" : classes.menu_selected}
        >
          two points
        </div>
      </div>

      {/* first and second period selection */}
      {is_interval ? (
        <div>INTERVAL HERE</div>
      ) : (
        <div className={classes.two_points}>
          <Select
            is_number={true}
            options={first_years}
            set_selected_opt={set_first_period}
            default_value={"year"}
          />
          <Select
            is_number={true}
            options={second_years}
            set_selected_opt={set_second_period}
            default_value={"year"}
          />
        </div>
      )}
    </div>
  );
};

export default Years_Select;
