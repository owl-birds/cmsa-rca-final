import "./Katex.scss";
import "./katex.min.scss";
import katex from "katex";
import { useRef, useEffect } from "react";

interface Props {
  tex_string: string;
}

const Render_Tex_to_Formula = (props: Props) => {
  const { tex_string } = props;
  const formula_ref = useRef<null | HTMLSpanElement>(null);
  useEffect(() => {
    if (formula_ref && formula_ref.current) {
      katex.render(tex_string.trim(), formula_ref.current as HTMLSpanElement);
    }
  }, [tex_string]);
  return <span ref={formula_ref}></span>;
};

export default Render_Tex_to_Formula;
