type Props = {
    size?: number;
    width?: number
};

function Loader({size = 10, width = 4}:Props) {
    return (
        // <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div
            className={`inline-block h-${size} w-${size} animate-spin rounded-full border-${width} border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] border-blue-400`}
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
        // </div>
    );
}

export default Loader;
