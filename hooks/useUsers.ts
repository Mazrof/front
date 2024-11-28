/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAllUsers } from "@/services/Settings";
import { failResponse, genericResponse, successResponse } from "@/types/api";
import { SettingsObject } from "@/types/settings";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export const useUsers = () => {
    const [users, setusers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response: genericResponse<{ users: SettingsObject[] }> = await getAllUsers();
                if (response.status === "success") {
                    const successfulResponse = response as successResponse<{
                        users: SettingsObject[];
                    }>;
                    const filteredusers = successfulResponse.data.users as User[];
                    console.log(filteredusers);
                    setusers(filteredusers);
                } else {
                    const failedResponse = response as failResponse;
                    setError(failedResponse.message);
                }
            } catch (err) {
                console.error(`unexpected Error  happened`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, isLoading, error };
};
