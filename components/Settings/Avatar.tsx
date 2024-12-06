import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type AvatarProp = {
    prop: {
        url: string | undefined;
      
    };
};
function AvatarPhoto({ prop }: AvatarProp) {
  return (
        <Avatar  className="w-full h-full">
            <AvatarImage src={prop.url} alt="user photo"  />
            <AvatarFallback >CN</AvatarFallback>
        </Avatar>
    );
}
export default AvatarPhoto