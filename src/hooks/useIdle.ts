import { useEffect, useState, useRef } from "react";

export default function useIdle(time: number) {
  const [isIdle, setIsIdle] = useState(false);
  const lastTime = useRef(Date.now());
  useEffect(() => {
    function resetTimer() {
      lastTime.current = Date.now();
      if (isIdle) setIsIdle(false);
    }
    function checkIdle() {
      if (Date.now() - lastTime.current > time) {
        setIsIdle(true);
      }
    }
    const events = ["mousemove", "keydown", "touchstart"];
    events.forEach((event) => document.addEventListener(event, resetTimer));
    const id = setInterval(checkIdle, 1000);
    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, resetTimer)
      );
      clearInterval(id);
    };
  }, [time, isIdle]);
  return isIdle;
}
