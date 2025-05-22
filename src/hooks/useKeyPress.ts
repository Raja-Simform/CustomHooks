import { useState, useEffect } from "react";

export default function useKeyPress(targetKey: string) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    function downHandler({ key }: KeyboardEvent) {
        if (key === targetKey) {
          setKeyPressed(true);
        }
      }
    document.addEventListener("keydown", downHandler);

    return () => {
      document.removeEventListener("keydown", downHandler);

    };
  }, [targetKey]);

  return keyPressed;
}




