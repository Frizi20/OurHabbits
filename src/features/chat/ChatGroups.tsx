import React from 'react';
import Input from '../../ui/Input';

function ChatGroups() {
    return (
        <>
            <div className="p-4">
                <Input
                    name="search"
                    type="text"
                    placeholder="Search Group..."
                />
            </div>
            <div className="text-gray-500 px-5 font-semibold text-xl pb-2">
                Your groups
            </div>

            <div className="w-full overflow-y-auto flex-grow scrollbar-thumb-gray-300 scrolbar-thumb scrollbar-thin scrollbar-thumb-rounded">
                <div className="h-0"></div>
            </div>
        </>
    );
}

export default ChatGroups;
