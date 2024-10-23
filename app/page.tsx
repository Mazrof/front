import ChatLayout from "@/components/Chats/ChatLayout";
import SideBar from "@/components/SideBar/SideBar";
export default function Home() {
    return (
        <div className="min-w-screen flex min-h-screen max-w-full">
            <SideBar />
            <ChatLayout/ >
       
        </div>
    );
}
