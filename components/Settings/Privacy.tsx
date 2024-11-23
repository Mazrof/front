
"use client"
import { useSettingsPageType, useWhoCanAttributes } from "@/store/settings";
import Nav from "./Nav";
import { RadioGroupDemo } from "./RadioComponent";
function Privacy() {
    const { settingPageName } = useSettingsPageType();
   const {attribute}=useWhoCanAttributes()
    const isShowPrivacy = settingPageName === "Privacy";
    return <div className={` ${!isShowPrivacy && "hidden"} settings-layout`}>
        <Nav />
        <h2 className="text-violet-500 p-2">Who can see my {attribute.title}</h2>
        <RadioGroupDemo />
        
    </div>;

}

export default Privacy
