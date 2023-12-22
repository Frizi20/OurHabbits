import React from 'react';

interface Props {
    name?: string;
    type: string;
    placeholder?: string;
    label?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    value?:string;
    className?:string;
    autoFocus?:React.HTMLAttributes<HTMLInputElement> | undefined
    focus?:boolean
   
}

function Input({ className, name, type = 'text', placeholder, label, onChange, value, focus = false }: Props) {


    return (
        <div className="flex-1">
            {label && (
                <label>
                    {label[0].toUpperCase() + label.slice(1).toLowerCase()}
                </label>
            )}
            <input
                className={`w-full p-2 rounded-md text-gray-800 text-base bg-gray-100 font-semibold outline-none px-5 ${className ?? ''}`}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                autoFocus={focus}
            />
        </div>
    );
}

export default Input;
