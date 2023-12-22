
import Input from '../../ui/Input';
import Contact from './Contact';
import { useChat } from '../../contexts/ChatContext';

function ChatContacts() {
    const { selectUser, selectedUserId, userContacts } = useChat();

    return (
        <>
            <div className="p-4">
                <Input
                    name="search"
                    type="text"
                    placeholder="Search Contact.."
                />
            </div>
            <div className="text-gray-500 px-5 font-semibold text-xl pb-2">
                All contacts
            </div>

            <div className="w-full overflow-y-auto flex-grow scrollbar-thumb-gray-300 scrolbar-thumb scrollbar-thin scrollbar-thumb-rounded">
                <div className="h-0">
                    {userContacts?.map((contact) => {
                        return (
                            <Contact
                                key={contact._id}
                                name={contact.name}
                                onClick={() => {
                                    selectUser(contact._id);
                                }}
                                isSelected={selectedUserId === contact._id}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default ChatContacts;
