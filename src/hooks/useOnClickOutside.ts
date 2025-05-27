import { useEffect } from "react";

interface UseOnClickOutsideProps{
    ref:React.RefObject<HTMLElement|null>
    callBackFn:()=>void;
}
export default function useOnClickOutside({ref,callBackFn}:UseOnClickOutsideProps){
    useEffect(()=>{
        function handleClick(e:MouseEvent){
            if(ref.current && !ref.current.contains(e.target as Node)){
                callBackFn();
            }
        }  
        document.addEventListener('click',handleClick);
        return()=>{
        document.removeEventListener('click',handleClick);
    }

    },[ref,callBackFn])
}    