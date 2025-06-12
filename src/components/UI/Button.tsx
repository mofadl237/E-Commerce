import type { ReactNode } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children:ReactNode;
    className?:string;
}

const Button = ({children,className,...res}:IProps) => {
  return (
    <button {...res} className={`w-full py-3 rounded-lg bg-green-600 text-white flex items-center justify-center ${className}`}>
      {children}
    </button>
  );
};

export default Button;
