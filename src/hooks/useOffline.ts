import { useEffect, useState } from "react";

export default function useOffline() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOffline() {
      setOnline(false);
    }
    function handleOnline(){
      setOnline(true);
    }
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online",handleOnline);
    return()=>{
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online",handleOnline);
    }
  }, [online]);
  if(!online){
    return !online;
  }
 
}
