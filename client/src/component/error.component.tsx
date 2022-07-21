import React from "react";

interface Props {
  msg: string;
}

function ErrorComponent({ msg }: Props): JSX.Element {
  return (
    <p className="error">{ msg }</p>
  );
}

export default ErrorComponent;
