import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";

export function useEffectSkipFirst(
  callback: EffectCallback,
  dependency?: DependencyList
) {
  const first = useRef(true);
  const callbackref = useRef(callback);
  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      callbackref.current();
      
    }
  }, dependency);
}
