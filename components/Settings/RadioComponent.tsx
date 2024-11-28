import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateProfile } from "@/services/Settings";
import { useSettings, useWhoCanAttributes } from "@/store/settings";
import { PrivacyOptionsEnum, SettingsObject } from "@/types/settings";
export function RadioGroupDemo() {
    const { attribute, setWhoCanAttributes } = useWhoCanAttributes();
    const { setSettings, settings } = useSettings();

    const handleChange = async (value: PrivacyOptionsEnum) => {
        if (!attribute) return; 

        const newAttribute = { ...attribute, value };
        setWhoCanAttributes(newAttribute);

        const updates = {
            [attribute.privacyName]: value,
        };
        await updateProfile(updates);

        if (settings) {
            const newSettings: SettingsObject = { ...settings, [attribute.privacyName]: value };
            setSettings(newSettings);
        }
    };

    if (!attribute) return <div>Loading...</div>;

    return (
        <RadioGroup value={attribute.value} onValueChange={handleChange} className="px-6">
            <div className="flex items-center space-x-8">
                <RadioGroupItem value="everyone" id="r1" />
                <Label htmlFor="r1" className="text-lg">Everyone</Label>
            </div>
            <div className="flex items-center space-x-8">
                <RadioGroupItem value="contacts" id="r2" />
                <Label htmlFor="r2" className="text-lg">Contacts</Label>
            </div>
            <div className="flex items-center space-x-8">
                <RadioGroupItem value="nobody" id="r3" />
                <Label htmlFor="r3" className="text-lg">Nobody</Label>
            </div>
        </RadioGroup>
    );
}
