import { useEffect, useRef } from "react";

export default function usePrevious<T>(stateValue: T) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = stateValue;
  }, [stateValue]);
  return ref.current;
}
