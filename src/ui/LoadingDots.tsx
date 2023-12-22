function LoadingDots() {
    return (
        <div className="flex space-x-1 justify-center items-center  h-3 w-full">
            <span className="sr-only">Loading...</span>
            <div className="h-1 w-1 bg-gray-400 rounded-full animate-bounce-custom "></div>
            <div className="h-1 w-1 bg-gray-400 rounded-full animate-bounce-custom [animation-delay:-1.1s]"></div>
            <div className="h-1 w-1 bg-gray-400 rounded-full animate-bounce-custom [animation-delay:-0.9s]"></div>
        </div>
    );
}

export default LoadingDots;
