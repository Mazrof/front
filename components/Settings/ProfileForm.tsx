"use client";
import { useRouter } from "next/navigation";
import { useSettings } from "@/store/settings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AvatarPhoto } from "./Avatar";
import { Check, Edit, Trash } from "lucide-react";
import { useEffect, useRef } from "react";
import { updateProfile } from "@/services/Settings";
import { SettingsObject } from "@/types/settings";
const ProfileSchema = z.object({
    email: z.string().email(),
    photo: z.string(),
    phone: z.string().min(11),
    username: z.string().min(5),
    screenName: z.string().min(3),
    bio: z.string(),
});

type ProfileFormFields = z.infer<typeof ProfileSchema>;
function ProfileForm() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input
    const { settings, setSettings } = useSettings();
    const {
        register,
        reset,
        trigger,
        formState: { errors },
        watch,
    } = useForm<ProfileFormFields>({
        resolver: zodResolver(ProfileSchema),
    });
    function checkEmail(fieldName: string) {
        if (fieldName === "email") router.push("/verification");
    }
    async function saveChange(fieldName: string, fieldValue: string) {
        if (!settings) return;
        const update = {
            [fieldName]: fieldValue,
        };
        await updateProfile(update);
        checkEmail(fieldName);
        const newSettings: SettingsObject = { ...settings, ...update };
        setSettings(newSettings);
        //to do if error but root error
    }
    const handleFieldClick = async (fieldName: keyof ProfileFormFields) => {
        const fieldValue = watch(fieldName);
        const isValid = await trigger(fieldName);
        console.log(fieldValue);
        if (!isValid) return;
        await saveChange(fieldName, fieldValue);
    };
    const handleImageClick = async() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();  
        }
    };
    const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.preventDefault()
        if (file) {
            await saveChange("photo", URL.createObjectURL(file))
        }
    }
    
    const handleDeleteImage = async () => {
        const response = await fetch("images/Avatar-2.png");
        const blob = await response.blob();
        const file = new File([blob], "avatar.png", { type: blob.type });
        await saveChange("photo", URL.createObjectURL(file))
    }
    useEffect(() => {
        if (settings) {
            reset({
                email: settings.email,
                phone: settings.phone,
                photo: settings.photo,
                username: settings.username,
                screenName: settings.screenName,
                bio: settings.bio,
            });
        }
    }, [settings, reset]);
    return (
        <form className="flex h-full w-full flex-col gap-4">
            <div className="w-full">
                <div className="mx-auto h-32 w-32" >
                    <AvatarPhoto prop={{ url: settings?.photo }} />
                </div>
                <input
                    type="file"
                    accept="image/jpeg, image/png"
                    {...register("photo")}
                    ref={fileInputRef}
                    onChange={handleChangeImage}
                    style={{ display: "none" }}
                />
                <div className="flex w-full justify-center gap-10 my-4">
                    <button  type="button"onClick={handleDeleteImage} title="delete">
                        <Trash color="red" size={30} />
                    </button>
                    <button type="button"  onClick={handleImageClick} title="change">
                        <Edit color="blue" size={30} />
                    </button>
                </div>
            </div>
            <div className="flex w-full flex-col gap-2">
                <label>Email</label>
                <div className="profile-form-field">
                    <input type="text" {...register("email")} className="profile-form-input" />
                    <button
                        type="button"
                        title="save"
                        className="mt-2 text-blue-700"
                        onClick={() => handleFieldClick("email")}
                    >
                        <Check color="blue" size={30} />
                    </button>
                </div>
                {errors.email && <div className="text-sm text-red-900">{errors.email.message}</div>}
            </div>
            <div className="flex flex-col gap-2">
                <label>Phone</label>
                <div className="profile-form-field">
                    <input type="text" {...register("phone")} className="profile-form-input" />
                    <button
                        type="button"
                        title="save"
                        className="mt-2 text-blue-700"
                        onClick={() => handleFieldClick("phone")}
                    >
                        <Check color="blue" size={30} />
                    </button>
                </div>
                {errors.phone && <div className="text-sm text-red-900">{errors.phone.message}</div>}
            </div>
            <div className="flex flex-col gap-2">
                <label>username</label>
                <div className="profile-form-field">
                    <input type="text" {...register("username")} className="profile-form-input" />
                    <button
                        type="button"
                        title="save"
                        className="mt-2 text-blue-700"
                        onClick={() => handleFieldClick("username")}
                    >
                        <Check color="blue" size={30} />
                    </button>
                </div>
                {errors.username && (
                    <div className="text-sm text-red-900">{errors.username.message}</div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label>screenName</label>
                <div className="profile-form-field">
                    <input type="text" {...register("screenName")} className="profile-form-input" />
                    <button
                        type="button"
                        title="save"
                        className="mt-2 text-blue-700"
                        onClick={() => handleFieldClick("screenName")}
                    >
                        <Check color="blue" size={30} />
                    </button>
                </div>
                {errors.screenName && (
                    <div className="text-sm text-red-900">{errors.screenName.message}</div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label>bio</label>
                <div className="profile-form-field">
                    <input type="text" {...register("bio")} className="profile-form-input" />
                    <button
                        type="button"
                        title="save"
                        className="mt-2 text-blue-700"
                        onClick={() => handleFieldClick("bio")}
                    >
                        <Check color="blue" size={30} />
                    </button>
                </div>
                {errors.bio && <div className="text-sm text-red-900">{errors.bio.message}</div>}
            </div>
        </form>
    );
}

export default ProfileForm;
