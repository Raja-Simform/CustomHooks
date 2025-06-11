import { useRef } from "react";

export default function useLongPressed(fn: () => void) {
  const timerref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnref = useRef<() => void>(fn);
  function onMouseUp() {
    if (timerref.current) {
      clearTimeout(timerref.current);
      timerref.current = null;
    }
  }
  function onMouseDown() {
    timerref.current = setTimeout(() => {
      fnref.current();
    }, 1500);
  }

  return { onMouseDown, onMouseUp };
}
