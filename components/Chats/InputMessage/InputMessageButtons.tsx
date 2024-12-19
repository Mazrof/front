"\
e client";
import { SendMsIcon } from "@/utils/icons";
import { useInputTextMessage, useIsRecording } from "@/store/inputMessage";
import VoiceNoteHandler from "@/components/Chats/InputMessage/VoiceNoteHandler"; // Import VoiceNoteHandler
import { useMessagesStore, useSelectedChatRoom, useWhoAmI } from "@/store/user";
import { sendMessageBE } from "@/utils/inputMessage";
function InputMessageButtons() {
    const { textMessage, setTextMessage } = useInputTextMessage();
    const { isRecording } = useIsRecording();
    const { selectedChatRoom } = useSelectedChatRoom();
    const { setMessage } = useMessagesStore();
    const { chatMessages } = useMessagesStore();
    console.log("chat message", chatMessages);
    const { user } = useWhoAmI();
    // Regular message sending logic
    function handleOnSendMesage(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        sendMessageBE(
            selectedChatRoom,
            user,
            setMessage,
            { text: textMessage, type: "message" },
            undefined
        );
        setTextMessage("");
    }

    return (
        <>
            {isRecording === false && textMessage !== "" ? (
                <button
                    className="rounded-full bg-blue-700 p-3 text-white transition-colors duration-200 hover:bg-blue-800"
                    data-testid="sendMsIcon"
                    onClick={handleOnSendMesage}
                >
                    <SendMsIcon />
                </button>
            ) : (
                <VoiceNoteHandler />
            )}
        </>
    );
}

export default InputMessageButtons;
