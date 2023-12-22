import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { IPerson } from '../types/ChatTypes';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import axios from 'axios';
import {
    getUserFriends,
    getUsersLastConversations,
} from '../services/apiUsers';
import { checkIfIsOnline } from '../utils/helpers';

type Props = {
    children: React.ReactNode;
};

interface Message {
    _id: string;
    sender: string;
    recipient: string;
    text: string;
}

interface IChatContext {
    userContacts: [];
    onlinePeople: IPerson[];
    selectedUserId: string | null;
    messages: Message[];
    loadingMessages: boolean;
    onlineContacts: [];
    currUserIsTyping: boolean;
    selectedUserIsTyping: boolean;
    getSelectedUserData(): undefined;
    sendMessage(message: string): void;
    selectUser(userId: string): void;
    userIsTyping(): void;
    userStoppedTyping(): void;
    handleTyping(e: React.ChangeEvent<HTMLInputElement>): void;
}

const ChatContext = createContext<IChatContext | null>(null);

function ChatProvider({ children }: Props) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [onlinePeople, setOnlinPeople] = useState<IPerson[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [currUserIsTyping, setCurrUserIsTyping] = useState(false);
    const [selectedUserIsTyping, setSelectedUserIsTyping] = useState(false);

    const [contacts, setContacts] = useState([]);
    const [userContacts, setUserContacts] = useState<[]>([]);

    const ws = useRef<null | Socket>(null);
    const { user } = useAuth();
    const onlineContacts = checkIfIsOnline(contacts, onlinePeople);

    const getSelectedUserData = useCallback(() => {
        if (!selectedUserId) return null;
        return userContacts.find((contact) => {
            return contact?._id === selectedUserId;
        });
    }, [selectedUserId, userContacts]);

    useEffect(() => {
        ws.current = io('ws://localhost:5000', { withCredentials: true });
        ws.current.emit('userOnline');
        ws.current.on('get-users', showOnlinePeople);
        ws.current.on('message', handleIncomingMessage);

        return () => {
            ws.current?.off('get-users');
            ws.current?.off('message', handleIncomingMessage);

            ws.current?.disconnect();
        };
    }, []);

    const handleIncomingTyping = useCallback(
        function handleIncomingTyping(data: Message) {
            const { sender, userTypes } = data;
            console.log(sender);
            console.log(selectedUserId);

            if (sender === selectedUserId) {
                if (userTypes) {
                    setSelectedUserIsTyping(true);
                } else {
                    setSelectedUserIsTyping(false);
                }
            }
        },
        [selectedUserId]
    );

    useEffect(() => {
        setSelectedUserIsTyping(false);
    }, [selectedUserId]);

    useEffect(() => {
        ws.current?.on('get-user-typing', handleIncomingTyping);

        return () => {
            ws.current?.off('get-user-typing', handleIncomingTyping);
        };
    }, [handleIncomingTyping]);

    useEffect(() => {
        (async function () {
            try {
                const respones = await Promise.all([
                    getUsersLastConversations(),
                    getUserFriends(),
                ]);

                const [userConversations, userContacts] = respones;

                setContacts(userConversations);
                setUserContacts(userContacts);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        })();
    }, []);

    useEffect(() => {
        async function getMessages(userId: string) {
            setLoadingMessages(true);
            try {
                const res = await axios.get(`/messages/${userId}`);
                const { data: messages } = res;

                if (res.status !== 200)
                    throw new Error('Could not fetch messages');

                setMessages(messages);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            } finally {
                setLoadingMessages(true);
            }
        }

        if (selectedUserId) {
            getMessages(selectedUserId);
        }
    }, [selectedUserId]);

    function showOnlinePeople(peopleArr: IPerson[]) {
        const uniqueOnlinePeople: IPerson[] = [];
        const peopleIds = new Map();

        peopleArr.forEach((person: IPerson) => {
            if (!peopleIds.has(person.userId)) {
                uniqueOnlinePeople.push(person);
                peopleIds.set(person.userId, true);
            }
        });

        const onlinePeopleExceptSelf = uniqueOnlinePeople.filter(
            (person) => person.userId !== user?.id
        );

        setOnlinPeople(onlinePeopleExceptSelf);
    }

    function userIsTyping() {
        ws.current?.emit('user-typing', {
            recipient: selectedUserId,
            userTypes: true,
        });
    }

    function userStoppedTyping() {
        ws.current?.emit('user-stop-typing', {
            recipient: selectedUserId,
            userTypes: false,
        });
    }

    function handleTyping(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        if (value.trim()) {
            userIsTyping();
        } else {
            userStoppedTyping();
        }
    }

    function sendMessage(message: string) {
        if (!message.trim() || !selectedUserId || !user?.id) return;

        ws.current?.emit('message', {
            text: message,
            recipient: selectedUserId,
        });

        const newMessage: Message = {
            _id: Date.now().toString(),
            sender: {
                _id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
            },
            recipient: {
                _id: selectedUserId,
            },
            text: message,
            createdAt: new Date().toISOString(),
        };

        setMessages((prevMessages) => {
            return [...prevMessages, newMessage];
        });
    }

    // function showDisconnectedUserOffline(id: string) {
    //     console.log(id);

    //     setOnlinPeople((prevOnline) => {
    //         return prevOnline.filter((onlinePers) => onlinePers.userId !== id);
    //     });
    // }

    function selectUser(userId: string) {
        setSelectedUserId(userId);
    }

    function handleIncomingMessage(message: Message) {
        setMessages((prevMessages) => [...prevMessages, message]);
    }

    return (
        <ChatContext.Provider
            value={{
                selectedUserId,
                selectUser,
                onlinePeople,
                sendMessage,
                messages,
                loadingMessages,
                onlineContacts,
                userIsTyping,
                userStoppedTyping,
                currUserIsTyping,
                handleTyping,
                selectedUserIsTyping,
                userContacts,
                getSelectedUserData,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) throw new Error("Don't use context outside provider!");
    return context;
}

export default ChatProvider;
