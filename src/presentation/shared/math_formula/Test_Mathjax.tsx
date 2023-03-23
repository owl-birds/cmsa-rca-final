import React, { useRef } from "react";

interface Props {
  latex_string: string;
}

const Test_Mathjax = (props: Props) => {
  const { latex_string } = props;
  const output_ref = useRef<null | HTMLDivElement>(null);
  const input_ref = useRef<null | HTMLDivElement>(null);
  const process_handler = () => {
    if (input_ref && output_ref) {
    }
  };
  return (
    <div>
      <h1>TEST MATHJAX</h1>
      <div id="input" ref={input_ref}>
        {latex_string}
      </div>
      <button>process</button>
      <div id="output" ref={output_ref}>
        OUTPUT
      </div>
    </div>
  );
};

export default Test_Mathjax;
