import { Message } from "@/components/Chats/Message/Message";
import { MessageImage } from "@/components/Chats/Message/MessageImage";
import { MessageText } from "@/components/Chats/Message/MessageText";
import { MessageCreatedAt } from "@/components/Chats/Message/MessageCreatedAt";
import { VoiceMessage } from "@/components/Chats/Message/VoiceMessage";
import { MessageType } from "@/types/Message";

type AnnouncementProps = {
    announcement: MessageType;
};
function getRandomColor(): string {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF4"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
export function Announcement({ announcement }: AnnouncementProps) {
    return (
        <Message message={announcement}>
            <div
                className="h-2 w-full"
                style={{
                    backgroundColor: getRandomColor(),
                }}
            ></div>
            <MessageText />
            <div className="flex flex-wrap gap-2">
                <MessageImage />
            </div>
            <VoiceMessage />
            <MessageCreatedAt />
        </Message>
    );
}
