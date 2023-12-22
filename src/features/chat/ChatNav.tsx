import { TiMessages } from 'react-icons/ti';
import { TiGroup } from 'react-icons/ti';
import { TiContacts } from 'react-icons/ti';
import { IoSettingsOutline } from 'react-icons/io5';

import Button from '../../ui/Button';
import { NavLink } from 'react-router-dom';

function ChatNav() {
    return (
        <div className="flex justify-center items-center  z-10 bg-white py-2 px-1 h-20">
            <div className="flex flex-1 justify-between">
                <NavLink to={'messages'} className={'group'}>
                    <Button
                        size="big"
                        className="text-2xl p-3 text-gray-900 border-gray-900 rounded-lg hover:bg-gray-50 group-[.active]:text-gray-800 group-[.active]:bg-purple-100 font-semibold flex items-center gap-3"
                    >
                        <TiMessages />
                    </Button>
                </NavLink>

                <NavLink to={'contacts'} className={'group'}>
                    <Button
                        size="big"
                        className="text-2xl p-3 text-gray-900 border-gray-900 rounded-lg hover:bg-gray-50 group-[.active]:text-gray-800 group-[.active]:bg-purple-100 font-semibold flex items-center gap-3"
                    >
                        <TiContacts />
                    </Button>
                </NavLink>
                <NavLink to={'groups'} className={'group'}>
                    <Button
                        size="big"
                        className="text-2xl p-3 text-gray-900 border-gray-900 rounded-lg hover:bg-gray-50 group-[.active]:text-gray-800 group-[.active]:bg-purple-100 font-semibold flex items-center gap-3"
                    >
                        <TiGroup />
                    </Button>
                </NavLink>
                {/* <NavLink to={'settings'} className={'group'}> */}
                    <Button
                        size="big"
                        className="text-2xl p-3 text-gray-900 border-gray-900 rounded-lg hover:bg-gray-50 group-[.active]:text-gray-800 group-[.active]:bg-purple-100 font-semibold flex items-center gap-3"
                    >
                        <IoSettingsOutline />
                    </Button>
                {/* </NavLink> */}
            </div>
        </div>
    );
}

export default ChatNav;
