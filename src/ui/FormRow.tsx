import React from 'react';

interface Props {
    children: React.ReactNode;
    label: string;
    error?: string | undefined;
}

function FormRow({ label, error, children }: Props) {
    return (
        <div className="grid pb-2 ">
            {label && (
                <label
                    className="font-semibold text-gray-500 py-2 text-sm"
                    htmlFor={children?.props?.id}
                >
                    {label}
                </label>
            )}
            <div className="[&>input]:py-1 [&>input]:px-4 [&>input]:rounded-md [&>input]:focus-within:outline-gray-400 [&>input]:w-full  [&>input]:bg-white [&>input]:border [&>input]:border-gray-300 relative">
                {children}
            </div>
            {error && <div className='text-red-600 p-1 bg-red-50 mt-2 text-center'>{error}</div>}
        </div>
    );
}

export default FormRow;
