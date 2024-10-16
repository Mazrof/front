import ChatLayout from "@/components/Chats/ChatLayout";
import SideBar from "@/components/SideBar/SideBar";
export default function Home() {
  return (
    <div className="min-h-[100%] h-[100%] flex  w-full max-w-[1680px] ">
      <SideBar />
      <ChatLayout />
    </div>
  );
}
