import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function AvatarPhoto({ props }: { props:string |undefined}) {
    return (
        <Avatar className=" w-32 h-32">
            <AvatarImage src={props} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
