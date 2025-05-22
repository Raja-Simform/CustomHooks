import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, initialValue: number) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) ? Number(localStorage.getItem(key)) : initialValue;
  });

  useEffect(() => localStorage.setItem(key, String(value)), [value, key]);
  function removeValue() {
    localStorage.removeItem(key);
    setValue(initialValue);
  }
  return [value, setValue, removeValue] as const;
}
