import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type AvatarProp = {
    prop: {
        url: string | undefined;
    };
};
export function AvatarPhoto({ prop }: AvatarProp) {
    return (
        <Avatar className="h-full w-full">
            <AvatarImage src={prop.url} alt="@shadcn" data-test="settings-profile-image" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
}
