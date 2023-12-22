import ChatBody from '../features/chat/ChatBody';
import Contacts from '../features/chat/Contacts';
import ChatProvider from '../contexts/ChatContext.tsx';
import ChatNav from '../features/chat/ChatNav.tsx';
import { Outlet } from 'react-router-dom';
import ChatLayout from '../features/chat/ChatLayout.tsx';

function Chat() {
    return (
        <>
            {/* <PageHeader>Chat</PageHeader> */}
            <ChatProvider>
                <div className=" min-h-[calc(100vh-4rem)] flex bg-[#fbfdff] ">
                    <div className='flex flex-col'>
                        <ChatNav />
                        <ChatLayout>
                            <Outlet />
                        </ChatLayout>
                    </div>
                    <ChatBody />
                </div>
            </ChatProvider>
        </>
    );
}

export default Chat;
