import React, { FC } from "react";
import ReactDOM from "react-dom";

(async () => {
  const response = await fetch("/api/hello");
  console.log(response);
})();

const App: FC = () => {
  return <div>hello, world!</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
