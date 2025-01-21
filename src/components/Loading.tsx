import "./components.css";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="flex space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-400"></div>
            </div>
            <p className="mt-4 text-gray-700 font-medium">Loading...</p>
        </div>
    );
};

export default Loading;
