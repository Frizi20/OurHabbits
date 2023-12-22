import { IoIosAttach } from 'react-icons/io';
import Input from '../../ui/Input';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';
import Button from '../../ui/Button';
import { useChat } from '../../contexts/ChatContext';
import { useEffect, useRef, useState } from 'react';
import EmojiPicker, { Emoji } from 'emoji-picker-react';

function ChatInput() {
    const [message, setMessage] = useState('');
    const { sendMessage, handleTyping, userStoppedTyping } = useChat();
    const emojiContainer = useRef<null | HTMLDivElement>(null);
    const [openEmojis, setOpenEmojis] = useState(false);

    useEffect(() => {
        document.addEventListener('click', outsideClickClose, true);

        function outsideClickClose(e) {
            if (!emojiContainer.current?.contains(e.target)) {
                setOpenEmojis(false);
            }
        }

        return () => {
            document.removeEventListener('click', outsideClickClose, true);
        };
    }, []);

    function submitMessage(e: React.FormEvent) {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
        userStoppedTyping();
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setMessage(value);
        handleTyping(e);
    }

    function handleEmojiPick(emojiEvent: unknown) {
        const { emoji: icon } = emojiEvent;
        console.log(emojiEvent);

        setMessage((prev) => prev + icon);
    }

    return (
        <div className="h-[100px] bg-white p-5 border-t border-gray-100 relative">
            <form className="flex items-center gap-4" onSubmit={submitMessage}>
                <Input
                    className="flex-grow text-sm"
                    type="text"
                    placeholder="Enter message..."
                    value={message}
                    onChange={handleChange}
                    focus={true}
                />

                <div className="flex h-full gap-1">
                    <Button
                        size="small"
                        btnType="button"
                        onClick={() => {
                            setMessage((prev) => prev + '🥕');
                        }}
                    >
                        <Emoji unified="1f955" size={30} />
                    </Button>
                    <div className="relative flex items-center">
                        <Button
                            btnType="button"
                            size="small"
                            className="w-[40px] h-full"
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(e);

                                setOpenEmojis(true);
                            }}
                        >
                            <MdOutlineEmojiEmotions />
                        </Button>
                        {openEmojis && (
                            <div
                                className="absolute right-0 bottom-[calc(100%+25px)]"
                                ref={emojiContainer}
                            >
                                <EmojiPicker
                                    onEmojiClick={handleEmojiPick}
                                    previewConfig={{}}
                                />
                            </div>
                        )}
                    </div>

                    <Button
                        btnType="button"
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        className="w-[40px]"
                    >
                        <IoIosAttach />
                    </Button>
                    <Button className="bg-custom-purple-100 text-white hover:!bg-custom-purple-hover-100 w-[50px]">
                        <FiSend />
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ChatInput;
