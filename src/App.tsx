import React from "react";
import { Props } from "./types";

function App({
  appVersion,
  timestamp,
}: Props) {
  return (
    <div className="App">
      Hello World ({timestamp}+{appVersion})
    </div>
  );
}

export default App;
