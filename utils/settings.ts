import { PageNameEnum } from "@/types/settings";
function handleOnClick(
    event: React.MouseEvent<HTMLButtonElement>,
    pageName: PageNameEnum,
    setPageName: (pageName:PageNameEnum) => void
) {
    event.preventDefault();
    setPageName(pageName);
}
function getIp(setIp:(ip:string)=>void) {
    fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => setIp(data.ip))
        .catch((error) => console.error("Error fetching IP address:", error));
}
export { handleOnClick, getIp };