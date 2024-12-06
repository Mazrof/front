import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type AvatarProp = {
    prop: {
        url: string | undefined;
    };
};
function AvatarPhoto({ prop }: AvatarProp) {
    return (
        <Avatar className="h-full w-full">
            <AvatarImage src={prop.url} alt="user photo" data-test="settings-profile-image" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
}
export default AvatarPhoto;
