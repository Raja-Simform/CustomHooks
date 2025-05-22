import { useState } from "react";

export default function useOffline(){
    const[online,setOnline]=useState(navigator.onLine);
    document.addEventListener(navigator.onLine,);
}