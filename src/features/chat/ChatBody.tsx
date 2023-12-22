import ChatHeader from './ChatHeader';
import Messages from './Messages';
import ChatInput from './ChatInput';
import { useChat } from '../../contexts/ChatContext';

function ChatBody() {
    const { selectedUserId } = useChat();

    return (
        <div className="flex flex-col flex-grow overflow-hidde  rounded-xl ">
            {selectedUserId ? (
                <>
                    <ChatHeader />
                    <Messages />
                    <ChatInput />
                </>
            ) : (
                <div className="h-full w-full shadow-inner flex justify-center items-center text-gray-500 text-xl border border-red-100 rounded-xl">
                    <span className="mr-2">&larr;</span> Select user from
                    contacts
                </div>
            )}
        </div>
    );
}

export default ChatBody;
