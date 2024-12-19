import { useMessageContext } from "@/provider/MessageProvider/MessageProvider";
import Image from "next/image";
export default function PinnedMessage() {
    const message = useMessageContext();
     return (
        <div>
            {message?.imageUrl && <Image src={message?.imageUrl[0]} alt="photo" />}
            <p>{message?.text?.slice(0, 30)}...</p>
        </div>
    );
}
