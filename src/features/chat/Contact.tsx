import Avatar from '../../ui/Avatar';
import { abreviate } from '../../utils/strings';

interface Props {
    name: string;
    message: string;
    time: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    isSelected: boolean;
    isActive: boolean;
}

function Contact({
    name,
    message,
    time,
    isSelected,
    isActive = false,
    onClick,
}: Props) {
    const abreviatedName = abreviate(name);

    return (
        <div
            className={`w-full flex items-start justify-between  py-3 px-5 cursor-pointer bg-white hover:!bg-[#ededed] group gap-5 ${
                isSelected && '!bg-gray-100'
            }`}
            onClick={onClick}
        >
            <div className="h-full  flex justify-center items-center relative">
                <div
                    className={`w-2 h-2 rounded-full absolute bottom-0.5 right-0.5 border border-white ${
                        isActive ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                ></div>
                <Avatar>{abreviatedName}</Avatar>
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="text-sm font-semibold ">{name}</div>
                <p className="text-xs text-gray-500 whitespace-nowrap inline overflow-hidden overflow-ellipsis">
                    {message}
                </p>
            </div>
            <div className="text-xs">{time}</div>
        </div>
    );
}

export default Contact;
