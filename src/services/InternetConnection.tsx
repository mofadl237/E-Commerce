import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState, type ReactNode } from "react"
import { BsWifiOff } from "react-icons/bs";
interface IProps{
    children:ReactNode;
}
const InternetConnection = ({children}:IProps) => {
    //1-state
    const [isOnline,setIsOnline]=useState(true);
    const toast=useToast();
    const toastIdRef=useRef<string | number>(Math.random());
    //2- handler
    const close=()=>{
        toast.close(toastIdRef.current);
    }
    const toastAdd =()=>{
        toastIdRef.current=toast({
            title:"You Are Offline",
            description:"please make sure you have internet connection",
            status:'warning',
            duration:null,
            isClosable:true,
            icon:<BsWifiOff size={20}/>
        })
    }
    const Offline =()=>{
        setIsOnline(false)
        console.log(isOnline)
       toastAdd(); 
    }
    const OnLine =()=>{
        setIsOnline(true)
       close()
    }
    useEffect(()=>{
        setIsOnline(navigator.onLine)
        window.addEventListener("offline",Offline)
        window.addEventListener('online',OnLine)
        return ()=>{ window.removeEventListener('online' , OnLine) ; window.removeEventListener('offline' , Offline)}
    },[])
    //3-render
  return children
}

export default InternetConnection