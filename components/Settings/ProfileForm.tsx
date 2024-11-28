"use client";
import { useRouter } from "next/navigation";
import { useSettings } from "@/store/settings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AvatarPhoto } from "./Avatar";
import { Check, Edit, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { updateProfile } from "@/services/Settings";
import { convertToBase64 } from "@/utils/inputMessage";
import { SettingsObject, UpdatedSettingResponse } from "@/types/settings";
import { failResponse, genericResponse, successResponse } from "@/types/api";
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
    const [isError, setIsError] = useState(false);
    const { settings, setSettings } = useSettings();
    const {
        register,
        reset,
        trigger,
        setError,
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
        const updates = {
            [fieldName]: fieldValue,
        };
        callDB(updates, fieldName);
    }
    async function callDB(updates: { [x: string]: string }, fieldName: string) {
        const response: genericResponse<UpdatedSettingResponse> = await updateProfile(updates);
        console.log(response)
        if (response.status === "fail"||response.status==="error") {
            const failApiResponse = response as failResponse;
            if (
                failApiResponse?.error?.statusCode === 401 ||
                failApiResponse?.error?.statusCode === 404
            ) {
                router.push("/login");
            } else if (failApiResponse?.error?.statusCode === 500) {
                setIsError(true);
                setError("root", {
                    type: "manual",
                    message: "username and email must be unique",
                });
            } else {
                setIsError(true);
                setError("root", {
                    type: "manual",
                    message: failApiResponse.message,
                });
            }
        } else {
            const data: UpdatedSettingResponse = (
                response as successResponse<UpdatedSettingResponse>
            ).data;

            checkEmail(fieldName);
            const user: SettingsObject = data.updatedUser;
            setSettings(user);
        }
    }
    const handleFieldClick = async (fieldName: keyof ProfileFormFields) => {
        setIsError(false);
        const fieldValue = watch(fieldName);
        const isValid = await trigger(fieldName);
        if (!isValid) return;
        await saveChange(fieldName, fieldValue);
    };
    const handleImageClick = async () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.preventDefault();

        convertToBase64(file as File, async (base64, error) => {
            if (error) {
                setError("photo", { type: "manual", message: error });
            } else {
                await saveChange("photo", base64 as string);
            }
        });
    };

    const handleDeleteImage = async () => {
        const response = await fetch("images/Avatar-2.png");
        const blob = await response.blob();
        const file = new File([blob], "avatar.png", { type: blob.type });
        convertToBase64(file, async (base64, error) => {
            if (error) {
                setIsError(true);
                setError("photo", { type: "manual", message: error });
            } else {
                await saveChange("photo", base64 as string);
            }
        });
    };
    useEffect(() => {
        if (settings && !isError) {
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
                <div className="mx-auto h-32 w-32">
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
                <div className="my-4 flex w-full justify-center gap-10">
                    <button type="button" onClick={handleDeleteImage} title="delete">
                        <Trash color="red" size={30} />
                    </button>
                    <button type="button" onClick={handleImageClick} title="change">
                        <Edit color="blue" size={30} />
                    </button>
                </div>
                {errors.photo && (
                    <div className="w-full text-center text-red-400">{errors.photo.message}</div>
                )}
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
            {errors.root && <div className="my-5 text-lg text-red-900">{errors.root.message}</div>}
        </form>
    );
}

export default ProfileForm;
