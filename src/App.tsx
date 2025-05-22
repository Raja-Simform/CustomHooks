// // App.tsx
// import { useEffect } from "react";
// import useKeyPress from "./hooks/useKeyPress";
// // import useSessionStorage from "./hooks/useSessionStorage";

// function App() {
//   // const [value, setValue, removeValue] = useSessionStorage("test-key", 5000);
//   const value=useKeyPress('Escape');
//   useEffect(() => {
//     // removeValue();
      
//   }, []);

//   useEffect(() => {
//     console.log(value);
//   }, [value]);

//   return <></>;
// }

// export default App;
import { useEffect } from "react";
import useKeyPress from "./hooks/useKeyPress";

function App() {
  const keyPressed = useKeyPress("Escape");

  useEffect(() => {
    if (keyPressed) {
      console.log("Escape key pressed!");
    }
  }, [keyPressed]);

  return <></>;
}

export default App;

