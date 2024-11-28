import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type AvatarProp = {
    prop: {
        url: string | undefined;
      
    };
};
export function AvatarPhoto({ prop }: AvatarProp) {
    return (
        <Avatar  className="w-full h-full">
            <AvatarImage src={prop.url} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
}
