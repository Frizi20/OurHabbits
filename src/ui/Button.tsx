interface Props {
    children: React.ReactNode | string | undefined;
    size?: 'small' | 'default' | 'big';
    color?: string;
    className?: string | undefined;
    btnType?: 'button' | 'submit';
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

function Button({
    children,
    size = 'default',
    color,
    className,
    onClick,
    btnType = 'submit',
}: Props) {
    let fontSize: string = '';

    if (size === 'small') fontSize = 'text-base';
    if (size === 'default') fontSize = 'text-xl';
    if (size === 'big') fontSize = 'text-2xl';

    return (
        <button
            type={btnType!}
            onClick={onClick}
            className={` p-2 text-custom-purple-100 rounded-md hover:bg-purple-100 flex justify-center items-center ${fontSize} ${className}`}
        >
            {children ?? ''}
        </button>
    );
}

export default Button;
