import React, { useRef, useState, memo, ChangeEvent } from "react";
//import { update_cell_service } from '../../../application/services/data.service';
import classes from "./Cell.module.scss";

interface Props {
  value: string | number | null;
  row_index: number;
  column_name: string;
  update_cell_service?: (
    new_value: string | number,
    row_index: number,
    column_name: string
  ) => void;
}

const Cell = memo((props: Props) => {
  const { value, row_index, column_name, update_cell_service } = props;
  const [is_input, set_is_input] = useState(false);
  const input_ref = useRef<HTMLInputElement | null>(null);

  // making input GROWABLE
  const [input_value, set_input_value] = useState(value);

  const out_of_focus = () => {
    set_is_input(() => false);
    if (input_ref && input_ref.current) {
      const new_value = input_ref.current.value;
      // console.log("new", new_value);
      if (
        new_value !== "-" &&
        (new_value === "0" || new_value) &&
        (`${new_value}` !== `${value}` || !value)
      ) {
        //console.log("new",new_value);
        //console.log("old",value);
        update_cell_service &&
          update_cell_service(new_value, row_index, column_name);
      }
      //            if (Number(value)){
      //                console.log(`number: ${value}, ${new_value}`);
      //                if (Number(new_value)){
      //                    console.log("NUMBER INPUTTED");
      //                    update_cell_service(Number(new_value), index, column);
      //                }
      //            }else{
      //                console.log(`string: ${value}, ${new_value}`);
      //                if (!Number(new_value)){
      //                    console.log("STRING INPUTTED");
      //                    update_cell_service(new_value, index, column);
      //                }
      //            }
    }
  };

  const enter_input_mode = () => {
    set_is_input(() => true);
  };

  const input_size_handler = (event: ChangeEvent<HTMLInputElement>) => {
    if (input_ref && input_ref.current) {
      set_input_value(() => event.target.value);
      // console.log("HELLO CELL");
    }
  };
  // console.log("CELL");
  return (
    <>
      {is_input ? (
        <input
          // MAKE IT GROWABLE
          ref={input_ref}
          type={"text"}
          defaultValue={value || value === 0 ? `${value}` : "-"}
          size={
            `${input_value}`.length === 0 ||
            !input_value ||
            input_value === null
              ? column_name.length + 1
              : //
                // `${value}`.length + 1
                `${input_value}`.length + 1
          }
          autoFocus
          onBlur={out_of_focus}
          className={classes.cell}
          onChange={input_size_handler}
        />
      ) : (
        <div onClick={enter_input_mode} className={`${classes.cell_span}`}>
          {value || value === 0 ? `${value}` : "-"}
        </div>
      )}
    </>
  );
});

export default Cell;
