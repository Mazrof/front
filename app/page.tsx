import ChatLayout from "@/components/Chats/ChatLayout";
import SideBar from "@/components/SideBar/SideBar";
export default function Home() {
    return (
        <div className="flex h-[100%] min-h-[100%] w-full max-w-[1680px]">
            {/** Edit
             * <div className="flex min-h-screen  min-w-screen max-w-full">
             */}
            <SideBar />
            <ChatLayout />
        </div>
    );
}
