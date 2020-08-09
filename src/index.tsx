import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const github = axios.create({
  baseURL: "https://api.github.com/",
});

const App: FC = () => {
  const [query, setQuery] = useState("");
  return (
    <div>
      hello, world!
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button
        disabled={!query}
        onClick={async () => {
          const response = await github.get(
            `/search/users?per_page=1000&page=1&q=${encodeURIComponent(query)}`
          );
          github.get("/rate_limit");
          console.log(response);
        }}
      >
        search
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
