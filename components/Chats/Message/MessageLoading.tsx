function MessageLoading() {
    const messagePlaceholder = Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="h-96 w-1/3 rounded-md bg-white dark:bg-[rgb(39,39,39)]"></div>
    ));

    return (
        <div className="mt-8 flex animate-pulse flex-col items-center justify-center space-y-8">
            {messagePlaceholder}
        </div>
    );
}
export default MessageLoading;
