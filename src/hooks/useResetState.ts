import { useState } from "react";

export default function useResetState<T>(initialValue:T){
       const [state,setState]=useState(initialValue);

       function reset(){
          setState(initialValue);
       }
       return[state,setState,reset] as const;
}