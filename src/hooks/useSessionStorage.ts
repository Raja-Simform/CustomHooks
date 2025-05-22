import { useEffect, useState } from "react";

export default function useSessionStorage(key: string, initialValue: number) {
  const [value, setValue] = useState(() => {
    return sessionStorage.getItem(key) ? Number(sessionStorage.getItem(key)) : initialValue;
  });

  useEffect(() => sessionStorage.setItem(key, String(value)), [value, key]);
  function removeValue() {
    sessionStorage.removeItem(key);
    setValue(initialValue);
  }
  return [value, setValue, removeValue] as const;
}
