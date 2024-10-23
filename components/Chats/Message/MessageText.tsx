export function MessageText() {
    const message = useMessageContext();
    return <p className="container max-w-[500px] p-2">{message?.text}</p>;
}
