import { PageNameEnum } from "@/types/settings";
function handleOnClick(
    event: React.MouseEvent<HTMLButtonElement>,
    pageName: PageNameEnum,
    setPageName: (pageName:PageNameEnum) => void
) {
    event.preventDefault();
    setPageName(pageName);
}

export {handleOnClick}