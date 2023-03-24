import React, { useEffect, useRef } from "react";
import katex from "katex";

import "./katex.min.scss";
import "./Katex.scss";

interface Props {
  latex_string: string;
}

const Test_Katex = (props: Props) => {
  const { latex_string } = props;
  const output_ref = useRef<null | HTMLDivElement>(null);
  const input_ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (output_ref) {
      katex.render(latex_string.trim(), output_ref.current as HTMLElement);
    }
  }, [latex_string]);

  console.log("KATEX", latex_string);

  return (
    <div>
      <h1>TEST KATEX</h1>
      <div ref={input_ref}>{latex_string}</div>
      <hr />
      <span ref={output_ref}></span>
    </div>
  );
};

export default Test_Katex;

// %
// % Enter TeX commands below
// %
// x = {-b \pm \sqrt{b^2-4ac} \over 2a} \eth \Sigma \over a.
// %
// %c = \summation{n}{i=1} i=\frac{n(n+1)}{2}

// \Sigma_{i=1}^k x_i \qquad \sum_{j=1}^k x_i
