import { useState, useCallback } from "react";

export default function useUndoRedo(initialValue: string) {
  const [history, setHistory] = useState([initialValue]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const state = history[currentIndex];

  const setState = useCallback(
    (newValue: string) => {
      const updatedHistory = history.slice(0, currentIndex + 1);
      updatedHistory.push(newValue);
      setHistory(updatedHistory);
      setCurrentIndex(updatedHistory.length - 1);
    },
    [history, currentIndex]
  );

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, history.length]);

  return [state, setState, undo, redo] as const;
}
