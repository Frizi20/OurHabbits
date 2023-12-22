import { useChat } from '../../contexts/ChatContext';
import Input from '../../ui/Input';
import Contact from './Contact';
import { timePassed } from '../../utils/helpers';

function Contacts() {
    const { selectedUserId, selectUser, onlineContacts } = useChat();

    return (
        <>
            <div className="p-4">
                <Input
                    name="search"
                    type="text"
                    placeholder="Search Chats..."
                />
            </div>
            <div className="text-gray-500 px-5 font-semibold text-xl pb-2">
                Recent Chats
            </div>

            <div className="w-full overflow-y-auto flex-grow scrollbar-thumb-gray-300 scrolbar-thumb scrollbar-thin scrollbar-thumb-rounded">
                <div className="h-0">
                    {onlineContacts.map((contact) => {
                        return (
                            <Contact
                                isSelected={selectedUserId === contact._id}
                                key={contact._id}
                                name={contact.userData.name}
                                message={contact.lastMessage.text}
                                time={timePassed(contact.lastMessage.createdAt)}
                                isActive={contact.isActive}
                                onClick={() => {
                                    selectUser(contact._id);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Contacts;
