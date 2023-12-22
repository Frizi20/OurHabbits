import { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';
import Message from './Message';
import { timeToHourMinutes } from '../../utils/helpers';
import LoadingDots from '../../ui/LoadingDots';
import typingSound from '../../audio/typing.mp3';

function Messages() {
    const { messages, selectedUserIsTyping } = useChat();
    const { user } = useAuth();
    const audiRef = useRef(new Audio(typingSound));
    const timeoutRef = useRef<number>(0);

    const messageBodyRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        const messageBodyDiv = messageBodyRef.current;

        if (messageBodyDiv && 'scrollTop' in messageBodyDiv) {
            messageBodyDiv.scrollTop = messageBodyDiv?.scrollHeight;
        }
    }, [messages.length, selectedUserIsTyping]);

    useEffect(() => {
        if (selectedUserIsTyping) {
            (function play() {
                audiRef.current.play();
                audiRef.current.addEventListener('ended', () => {
                    timeoutRef.current = setTimeout(() => {
                        audiRef.current.play();
                    }, 1500);
                });
            })();
        } else {
            audiRef.current.pause();
            clearTimeout(timeoutRef.current);
        }

        const currAudioRef = audiRef.current;

        return () => {
            currAudioRef.pause();
        };
    }, [selectedUserIsTyping]);

    return (
        <div
            className="flex-1 px-4  py-4 overflow-y-auto scrollbar-thumb-gray-300 scrolbar-thumb scrollbar-thin scrollbar-thumb-rounded mr-1 rounded-xl"
            ref={messageBodyRef}
        >
            <div className=" h-0">
                {messages.map((message) => {
                    return (
                        <Message
                            name={message.sender.name}
                            key={message._id}
                            time={timeToHourMinutes(message.createdAt)}
                            direction={
                                user?.id === message.sender._id
                                    ? 'right'
                                    : 'left'
                            }
                        >
                            {message.text}
                        </Message>
                    );
                })}

                {/* {messages.length === 0 && (
                    <div className="p-5 flex justify-center">
                        <div className='bg-gray-100 p-2 text-center rounded-md text-lg font-semibold text-gray-600 inline-block'>Start conversation...</div>
                    </div>
                )} */}

                {selectedUserIsTyping && (
                    <Message
                        name={messages[0]?.sender?.name ?? 'xx'}
                        direction="left"
                        isTyping={true}
                    >
                        <span className="text-gray-500">typing</span>{' '}
                        <span className="relative top-0.5">
                            <LoadingDots />
                        </span>
                    </Message>
                )}
            </div>
        </div>
    );
}

export default Messages;
