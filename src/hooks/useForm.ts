import { useState} from "react"

interface useFormProps<T>{
    initialValues:T,
    onSubmit:(values:T)=>void
}
export default function useForm<T>({initialValues,onSubmit}:useFormProps<T>){
     const [values,setValue]=useState<T>(initialValues);
     function handleChange(newValue:T){
        setValue((prev)=>({
           ...prev,...newValue
        }));
     }
     function handleSubmit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        onSubmit(values);
     }
     function resetForm(){
         setValue(initialValues);
     }
     return({values,handleChange,handleSubmit,resetForm});
}