import { useState, useCallback, useRef } from "react";
type History<T> = {
  history: T[];
  currentIndex: number;
};
export default function useUndoRedo<T>(initialValue: T) {
  const historyState = useRef<History<T>>({
    history: [initialValue],
    currentIndex: 0,
  });
  const [state, setState] = useState(initialValue);

  const setValue = useCallback((newValue: T) => {
    const { history, currentIndex } = historyState.current;
    if (newValue === history[currentIndex]) return;
    const temp = history.slice(0, currentIndex + 1);
    temp.push(newValue);
    historyState.current = {
      history: temp,
      currentIndex: temp.length - 1,
    };
    setState(newValue);
  }, []);

  const undo = useCallback(() => {
    const { history, currentIndex } = historyState.current;

    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      historyState.current = {
        history,
        currentIndex: newIndex,
      };
      setState(history[newIndex]);
    }
  }, []);

  const redo = useCallback(() => {
    const { history, currentIndex } = historyState.current;

    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      historyState.current = {
        history,
        currentIndex: newIndex,
      };
      setState(history[newIndex]);
    }
  }, []);

  return [state, setValue, undo, redo] as const;
}
