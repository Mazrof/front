/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { initializeSocket, disconnectSocket } from "@/lib/socket";
import { useMessagesStore, useWhoAmI } from "@/store/user";
import { failResponse, genericResponse } from "@/types/api";
import { MessageTypeBE } from "@/types/Message";
import { getMessages } from "@/services/Messages";
import { MyChats } from "@/types/user";
import { getChatsListtest } from "@/services/Contacts/Contacts";
import { useRouter } from "next/navigation";

import { Socket } from "socket.io-client";

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { user } = useWhoAmI();
  const pathname = usePathname(); // Track the current URL path
  const { setMessages, checkExistChat, setMessage } = useMessagesStore();
  const router = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null); // Manage socket as a state

  // Fetch chats and messages
  const firstFetchMessages = async () => {
    const chatsData: MyChats | failResponse = await getChatsListtest();

    // Check if the response is a failure
    if ((chatsData as failResponse).status == "fail") {
      router.push("/login");
    } else {
      // Ensure that chatsData is an array before iterating
      if (Array.isArray(chatsData)) {
        console.log("chats", chatsData);
        for (const chat of chatsData) {
          const response: genericResponse<MessageTypeBE[]> = await getMessages({
            id: chat.id,
            page: 1,
            limit: 100,
          });

          if (response.status === "fail" || response.status === "error") {
            const failApiResponse = response as failResponse;
            if (failApiResponse?.error?.statusCode === 401) {
              router.push("/login");
            }
          } else {
            const data: MessageTypeBE[] = response as unknown as MessageTypeBE[];
            console.log("returned data", data);
            setMessages({
              ...chat,
              messages: data.reverse(),
            });
          }
        }
      } else {
        console.error("Expected an array but received:", chatsData);
      }
    }
  };

  // Initialize socket connection
  async function Initialize() {
    await firstFetchMessages();
    const socketInstance = initializeSocket();
    setSocket(socketInstance); // Set socket state
  }

  useEffect(() => {
    if (pathname === "/" || pathname === "/stories") {
      console.log("path", pathname);
      Initialize();
    } else {
      // Disconnect socket when pathname is not relevant
      disconnectSocket();
      setSocket(null); // Clear socket state when not needed
    }

    return () => {
      // Cleanup on unmount or path change
      disconnectSocket();
      setSocket(null); // Clear socket state
    };
  }, [pathname]); // Run this effect when pathname changes

  useEffect(() => {
    if (socket) {
      console.log("socket initialized", socket);
      // Listen for messages only when the socket is initialized
      socket.on("message:receive", (data: MessageTypeBE) => {
        console.log("received", data);

        if (!checkExistChat(data.participantId as number)) {
          console.log("new chat detected");
        } else {
          setMessage(data, data.participantId as number, user?.user.id as number);
        }
      });
    }

    return () => {
      // Cleanup socket listener when the socket changes or on unmount
      if (socket) {
        socket.off("message:receive");
      }
    };
  }, [socket]); // Dependency array with `socket`

  return <>{children}</>;
};

export default SocketProvider;
