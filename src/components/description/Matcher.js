import { Matcher } from "interweave";

export class PowerPointsMatcher extends Matcher {
  match(str) {
    const result = str.match(/Power Points/);

    if (!result) {
      return null;
    }

    return {
      index: result.index,
      length: result[0].length,
      match: result[0],
      valid: true,
    };
  }

  replaceWith(children, props) {
    return (
      <span className="Interweave-Blue" {...props}>
        {children}
      </span>
    );
  }

  asTag() {
    return "span";
  }
}
