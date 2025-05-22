import { useState, useCallback, useRef } from "react";

export default function useUndoRedo<T>(initialValue: T) {
  const history = useRef<T[]>([initialValue]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState(initialValue);

  const setValue = useCallback(
    (newValue: T) => {
      if (newValue === history.current[currentIndex]) return;
      history.current = history.current.slice(0, currentIndex + 1);
      history.current.push(newValue);
      setCurrentIndex(history.current.length - 1);
      setState(newValue);
    },
    [currentIndex]
  );

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setState(history.current[newIndex]);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.current.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setState(history.current[newIndex]);
    }
  }, [currentIndex]);

  return [state, setValue, undo, redo] as const;
}
