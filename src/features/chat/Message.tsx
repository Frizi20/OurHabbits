import Avatar from '../../ui/Avatar';

import { CiClock1 } from 'react-icons/ci';
import { abreviate } from '../../utils/strings';

interface Props {
    children?: React.ReactNode;
    direction: 'left' | 'right';
    name: string;
    time?: string;
    isTyping?: boolean;
}

function Message({
    children,
    direction = 'left',
    name,
    time,
    isTyping = false,
}: Props) {
    const isClient = direction === 'right';

    return (
        <div className={`text-xl p-3 flex `}>
            <div
                className={`flex items-end gap-2 ${
                    isClient && 'ml-auto flex-row-reverse'
                }`}
            >
                <Avatar>{abreviate(name)}</Avatar>
                <div>
                    <div
                        className={`py-2 px-4 rounded-lg mb-2
                        ${
                            isClient
                                ? '  rounded-br-none text-white bg-custom-purple-100'
                                : ' rounded-bl-none  text-gray-700 bg-gray-100'
                        }`}
                    >
                        <div className="text-[1.1rem] flex items-baseline">{children}</div>
                        <div
                            className={`flex items-center gap-1 flex-row-reverse ${
                                !isClient ? 'justify-start' : 'justify-end'
                            }`}
                        >
                            <div className={`text-xs `}>{time}</div>
                            {!isTyping && (
                                <span className="text-sm">
                                    <CiClock1 />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className=""></div>
                    {/* <div className={`text-sm text-gray-800 pb-1 ${isClient ? 'text-right' : 'text-left'}`}>Matac Cristi</div> */}
                </div>
            </div>
        </div>
    );
}

export default Message;
