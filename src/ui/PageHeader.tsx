import React from 'react';

interface Props {
    children: React.ReactNode;
}

function PageHeader({ children }: Props) {
    return (
        <div className="text-3xl pt-5  pl-5 pr-5 pb-5 text-gray-900">
            <div className="px-5 border-solid border-0 border-b pb-5">
                {children}
            </div>
        </div>
    );
}

export default PageHeader;
