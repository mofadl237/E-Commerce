import type { InputHTMLAttributes } from "react"

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
    className?:string;
}
const Input = ({className , ...rest}:IProps) => {
  return (
    <input className={`border-[1px] border-gray-300 shadow-lg rounded-md p-3 text-sm  focus:outline-none focus:border-indigo-900 focus:ring-1  focus:ring-indigo-600 w-full bg-transparent ${className}`}  {...rest}/>
  )
}

export default Input