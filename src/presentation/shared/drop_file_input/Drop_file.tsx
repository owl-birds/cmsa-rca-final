import React, { useState, DragEvent, useRef, MouseEvent } from "react";
//import { read_file } from "../../../application/services/file.service";
//import { is_ext_allowed } from "../../../application/services/file.service";
//import { Uploaded_File_State, use_file_store } from '../../../application/states/file.state';
import classes from "./Drop_file.module.scss";

interface Props {
  is_ext_allowed: (file_name: string) => boolean;
  read_file: (file: File) => void;
}

const Drop_file = (props: Props) => {
  //const [file, set_file] = useState<any | undefined>(); // !!!!!!!!! NOT RECOMMENDED TO USE ANY, BUT IDK
  const [label, set_label] = useState<string>(
    "Drop File Here or Click to Browse"
  );
  const input_ref = useRef<null | HTMLInputElement>(null);
  const drop_ref = useRef<null | HTMLDivElement>(null);

  const { is_ext_allowed, read_file } = props;

  // STATE HERE : Zustand
  //const initiate_file_data = use_file_store((state: Uploaded_File_State)=>state.initiate_data);

  // DROP
  // PROBLEM !!!
  const drop_handler = (event: DragEvent<HTMLDivElement>) => {
    //console.log(event);
    event.preventDefault();
    //console.log(event.dataTransfer.files);

    // change LABEL
    const dropped_files = event.dataTransfer.files;
    //set_file(()=>dropped_files);
    set_label(() => dropped_files[0].name);
    if (drop_ref) {
      const drop_zone = drop_ref.current as HTMLDivElement;
      drop_zone.classList.remove(classes.file_not_allowed);
    }
    if (input_ref && input_ref.current) {
      input_ref.current.files = dropped_files;
    }
  };
  const drop_hover = (event: DragEvent<HTMLDivElement>) => {
    //console.log(event);
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    target.classList.add(classes.file_hover);
  };
  const drop_leave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    target.classList.toggle(classes.file_hover);
  };

  // CLICK
  const click_upload = (_event: MouseEvent<HTMLDivElement>) => {
    //console.log(input_ref);
    const input = input_ref.current as HTMLInputElement;
    //console.log(input);
    input.click();
  };

  // CHANGE
  const input_change = () => {
    if (input_ref) {
      const input = input_ref.current as HTMLInputElement;
      const files: FileList | null = input.files;
      if (files) {
        set_label(() => files[0].name);
        if (drop_ref) {
          const drop_zone = drop_ref.current as HTMLDivElement;
          drop_zone.classList.add(classes.file_selected);
          drop_zone.classList.remove(classes.file_not_allowed);
        }
      }
    }
  };

  const upload_file = () => {
    if (input_ref) {
      const input = input_ref.current as HTMLInputElement;
      const files: FileList | null = input.files;
      if (files && files.length !== 0) {
        //console.log(input.files[0]);
        //console.log(is_ext_allowed(input.files[0].name));
        //read_file(input.files[0]);
        if (is_ext_allowed(files[0].name)) {
          read_file(
            files[0]
            //, initiate_file_data
          );
        } else {
          if (drop_ref) {
            const drop_zone = drop_ref.current as HTMLDivElement;
            drop_zone.classList.add(classes.file_not_allowed);
            set_label(() => "Please Upload .csv file");
          }
        }
      }
    }
  };
  return (
    <div className={classes.drop_box}>
      <div
        className={classes.drop_zone}
        onDrop={drop_handler}
        onDragOver={drop_hover}
        onDragLeave={drop_leave}
        onClick={click_upload}
        ref={drop_ref}
      >
        <span id="drop-upload">{label}</span>
        <input
          className={classes.drop_input}
          type="file"
          name="uploaded-file"
          id="uploaded-file"
          ref={input_ref}
          onChange={input_change}
        />
      </div>
      <button onClick={upload_file} className={"btn_default"}>
        UPLOAD
      </button>
    </div>
  );
};

export default Drop_file;
