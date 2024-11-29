"use client";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateProfile } from "@/services/Settings";
import { useSettings, useWhoCanAttributes } from "@/store/settings";
import { PrivacyOptionsEnum, SettingsObject, UpdatedSettingResponse } from "@/types/settings";
import { failResponse, genericResponse, successResponse } from "@/types/api";
export function RadioGroupDemo() {
    const router = useRouter();
    const { attribute, setWhoCanAttributes } = useWhoCanAttributes();
    const { setSettings } = useSettings();

    const handleChange = async (value: PrivacyOptionsEnum) => {
        if (!attribute) return;

        const newAttribute = { ...attribute, value };
        setWhoCanAttributes(newAttribute);

        const updates = {
            [attribute.privacyName]: value,
        };
        const response: genericResponse<UpdatedSettingResponse> = await updateProfile(updates);
        if (response.status === "fail") {
            const failApiResponse = response as failResponse;
            if (
                failApiResponse?.error?.statusCode === 401 ||
                failApiResponse?.error?.statusCode === 404
            ) {
                router.push("/login");
            } else router.push("Error");
        } else {
            const data: UpdatedSettingResponse = (
                response as successResponse<UpdatedSettingResponse>
            ).data;
            const user: SettingsObject = data.updatedUser;
            setSettings(user);

        }
    };

    if (!attribute) return <div>Loading...</div>;

    return (
        <RadioGroup value={attribute.value} onValueChange={handleChange} className="px-6">
            <div className="flex items-center space-x-8">
                <RadioGroupItem value="everyone" id="r1" />
                <Label htmlFor="r1" className="text-lg">
                    Everyone
                </Label>
            </div>
            <div className="flex items-center space-x-8">
                <RadioGroupItem value="contacts" id="r2" />
                <Label htmlFor="r2" className="text-lg">
                    Contacts
                </Label>
            </div>
            <div className="flex items-center space-x-8">
                <RadioGroupItem value="nobody" id="r3" />
                <Label htmlFor="r3" className="text-lg">
                    Nobody
                </Label>
            </div>
        </RadioGroup>
    );
}
