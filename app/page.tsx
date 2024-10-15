import ChatLayout from "@/components/Chats/ChatLayout";
import SideBar from "@/components/SideBar/SideBar";
export default function Home() {
  return (
    <div className="basic-layout">
      <SideBar />
      <ChatLayout />
    </div>
  );
}
