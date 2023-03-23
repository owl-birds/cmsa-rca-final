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
      const output_element = output_ref.current as HTMLDivElement;
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

// %
// % Enter TeX commands below
// %
// x = {-b \pm \sqrt{b^2-4ac} \over 2a} \eth \Sigma \over a.
// %
// %c = \summation{n}{i=1} i=\frac{n(n+1)}{2}

// \Sigma_{i=1}^k x_i \qquad \sum_{j=1}^k x_i
