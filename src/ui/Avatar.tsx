import React from 'react';

interface Props {
    children?: React.ReactNode | undefined;
}

function Avatar({ children }: Props) {
    return (
        <div
            className={`w-[40px] h-[40px] border border-gray-200 rounded-full flex items-center justify-center font-medium bg-[#e3e1fc] text-gray-700 text-sm `}
        >
            {children}
        </div>
    );
}

export default Avatar;
