import Avatar from '../../ui/Avatar';
import { IoVideocam } from 'react-icons/io5';
import Button from '../../ui/Button';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useChat } from '../../contexts/ChatContext';

function ChatHeader() {
    const { getSelectedUserData } = useChat();

    const user = getSelectedUserData();

    const userName = user?.name;

    return (
        <div className="h-20 bg-white flex items-center px-4  justify-between">
            <div className="flex items-center gap-3">
                <Avatar>MC</Avatar>
                <div className="flex items-center gap-2">
                    <div className="font-semibold text-gray-800">
                        {userName}
                    </div>
                    <div className="w-[5px] h-[5px] rounded-full bg-green-500"></div>
                </div>
            </div>
            <div className="flex align-baseline gap-3 border rounded-md [&>button:not(:last-child)]:border-r">
                <Button
                    size="default"
                    className="font-semibold text-blue-400 p-2.5"
                >
                    <FaSearch />
                </Button>
                <Button
                    size="default"
                    className="font-semibold text-blue-400 p-2.5"
                >
                    <IoVideocam />
                </Button>
                <Button
                    size="default"
                    className="font-semibold text-blue-400 p-2.5"
                >
                    <FaUser />
                </Button>
            </div>
        </div>
    );
}

export default ChatHeader;
