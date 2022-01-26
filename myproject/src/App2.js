// For useRef Hook

import React, { useRef } from "react";

const App2 = () => {
  let inputRef = useRef(null);

  const doSomething = () => {
    console.log(inputRef.current);
    inputRef.current.value = "hello";
    inputRef.current.style.color = "red";
    inputRef.current.focus();
    inputRef.current.style.margin = "10px";
    inputRef.current.style.padding = "5px";
    inputRef.current.select();
  };

  return (
    <div>
      <b id="data"></b>
      <input type="text" ref={inputRef} />
      <button onClick={() => doSomething()}>Click me</button>
    </div>
  );
};

export default App2;
