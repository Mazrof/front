import { MessageType } from "@/types/Message";
import ChatRoom from "./ChatRoom";
async function ChatLayout() {
    // const response = await fetch("http://localhost:4000/messages");
    // const messages: MessageType[] = await response.json();
    const messages: MessageType[] = [
        {
            createdAt: "2024-10-23T14:48:00Z",
            text: "Elliot's newest hack helps him share his emotions. Whiterose puts the pieces in motion. Elliot and Darlene have a disagreement and Vera plans his next move. In flashbacks, some key moments in Whiterose's life are revealed.",
            imageUrl: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ZP9zTf75vBmTD9BJWQmf3DjamXGuvzw44w&s",
            ],
        },
        {
            createdAt: "2024-10-23T14:48:00Z",
            imageUrl: [
                "https://decider.com/wp-content/uploads/2019/12/mr-robot-darlene-gone.jpg?quality=75&strip=all&w=978&h=652&crop=1",
                "https://i.pinimg.com/originals/00/88/a4/0088a48d159719613f90758553f2905c.jpg",
                "https://tvline.com/wp-content/uploads/2015/09/mr-robot-finale.jpg",
                "https://i0.wp.com/picjumbo.com/wp-content/uploads/pure-nature-landscape-single-tree-in-green-field-free-photo.jpg?w=600&quality=80",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ZP9zTf75vBmTD9BJWQmf3DjamXGuvzw44w&s",
            ],
            text: "Have You seen The New Episode of Mr. Robot?",
        },
        {
            text: "Excepturi id itaque ut. Et quo nisi et. Et numquam magnam voluptas. Repellat aut quaerat ea ducimus et et voluptas quis. Excepturi ea est nemo. Aut et nihil temporibus velit numquam quia optio nam.\n \rEligendi quia nesciunt ab aliquam earum. Aut odit est tenetur eligendi laudantium sequi sit veritatis. Nemo corrupti nostrum neque dicta voluptatem modi. Ipsa omnis repellendus similique blanditiis illum nemo voluptas et.\n \rFuga quam quo velit neque necessitatibus. Tempora nobis in quisquam vel dolores debitis quos minus rem. In et ut.",
            imageUrl: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYiJqez_OJQroq5SJE6fqyukilXgrrdyZMtQ&s",
                "https://i0.wp.com/picjumbo.com/wp-content/uploads/pure-nature-landscape-single-tree-in-green-field-free-photo.jpg?w=600&quality=80",
            ],
            createdAt: "2023-11-13T04:13:34.749Z",
        },
        {
            text: "et ad quibusdam",
            imageUrl: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYiJqez_OJQroq5SJE6fqyukilXgrrdyZMtQ&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMEsimntkZ_FbmRXW78WV2maSSyWmTotFsMQ&s",
            ],
            createdAt: "2024-08-18T16:30:49.748Z",
        },
        {
            text: "est",
            imageUrl: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYiJqez_OJQroq5SJE6fqyukilXgrrdyZMtQ&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMEsimntkZ_FbmRXW78WV2maSSyWmTotFsMQ&s",
            ],
            createdAt: "2023-12-19T10:52:43.127Z",
        },
        {
            text: "iusto autem optio fasdklfjaklsfjklasjdfaklsjfklasjfklasjf",
            imageUrl: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYiJqez_OJQroq5SJE6fqyukilXgrrdyZMtQ&s",
            ],
            createdAt: "2024-03-07T08:06:10.334Z",
        },
        {
            text: "Sunt animi esse sit eveniet expedita quisquam voluptatem inventore. Voluptatem a minima officiis. Expedita sunt quas ut illo ea enim architecto nisi. Ab enim sapiente.",
            imageUrl: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ZP9zTf75vBmTD9BJWQmf3DjamXGuvzw44w&s",
            ],
            createdAt: "2024-03-24T20:52:42.000Z",
        },
    ];
    return <ChatRoom messages={messages} />;
}

export default ChatLayout;
