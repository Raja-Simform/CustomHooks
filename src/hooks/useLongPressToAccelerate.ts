import { useRef } from "react";

export default function useLongPressToAccelerate(fn: () => void) {
  const timerref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnref = useRef<() => void>(fn);
  const delayref = useRef(1000);
  const countRef = useRef(0);
  function onMouseUp() {
    if (timerref.current) {
      clearInterval(timerref.current);
      timerref.current = null;
      delayref.current = 1000;
      countRef.current = 0;
    }
  }
  function handleInterval() {
    timerref.current = setInterval(() => {
      fnref.current();
      countRef.current = countRef.current + 1;
      if (countRef.current > 5) {
        delayref.current = delayref.current / 2;
        countRef.current = 0;
        if (timerref.current) {
          clearInterval(timerref.current);
          handleInterval();
        }
      }
      console.log(delayref.current);
     
      
    }, delayref.current);
  }
  function onMouseDown() {
    handleInterval();
  }

  return { onMouseDown, onMouseUp };
}
