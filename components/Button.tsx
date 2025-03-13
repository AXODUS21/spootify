import { twMerge } from '@node_modules/tailwind-merge';
import React, { forwardRef } from 'react'


// this props basically just extends the HTML properties of the normal html button so you dont have to
//initalize them yourself
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customProp?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>(({
    className,
    children,
    disabled,
    type ="button",
    ...props
},ref) => {
    return (
        <button
            type={type}
            disabled={disabled}
            ref={ref}
            {...props}
            className={twMerge("w-full rounded-full bg-green-500 border border-transparent px-3 py-4 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition", className)}
        >  
          {children}
        </button>
    )
})

Button.displayName = "Button";

export default Button