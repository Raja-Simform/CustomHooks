import { useState } from "react";
export default function useClipboard(){
    const [copied,setCopied]=useState(false);
    async function copy(text:string){
        navigator.clipboard.writeText(text).then(()=>{
            setCopied(true);
            setTimeout(()=>{
                    setCopied(false);
            },2000)
        }).catch(()=>{
        setCopied(false);
        })

    }

  return({copy,copied})
}


