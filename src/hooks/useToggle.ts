import { useState } from "react";
  
export default function useToggle(){
   const[value,setValue]=useState<boolean>();
   function toggle(){
      setValue((prev)=>!prev);
   }
   return ([value,toggle,setValue]) as const;
}