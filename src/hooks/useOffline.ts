import { useEffect, useState } from "react";

export default function useOffline() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOffline() {
      setOnline(false);
    }
    window.addEventListener("offline", handleOffline);
  }, [online]);
  if(!online){
    return !online;
  }
 
}
