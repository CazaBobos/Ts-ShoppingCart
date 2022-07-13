import { useEffect, useState } from "react";

export default function useSessionStorage<T>(
    key:string, initialValue: T | (()=>T)
){
    //uses a function as default value to invoke only once
    const[value,setValue] = useState<T>(()=>{
        const jsonValue = sessionStorage.getItem(key)

        if(jsonValue != null) return JSON.parse(jsonValue)
        if (typeof initialValue === "function")
            return (initialValue as ()=>T)
        else
            return initialValue
    })

    useEffect(()=>{
        sessionStorage.setItem(key,JSON.stringify(value))
    },[key,value])

    return [value,setValue] as [typeof value,typeof setValue]
}