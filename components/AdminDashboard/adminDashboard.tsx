"use client";

import { useEffect, useState } from "react";
import { GetUsers, GetGroups, FilterandRemovefilter, BanandUnban } from "@/services/User";
import { genericResponse, successResponse } from "@/types/api";
import { Group, user } from "@/types/user";

const AdminDashboard = () => {
    const [selectedOption, setSelectedOption] = useState<string>("users");
    const [groups, setGroups] = useState<Group[]>([]);
    const [users, setUsers] = useState<user[]>([]);

    // Fetch users
    const fetchUsers = async () => {
        try {
            const response: genericResponse<{ users: user[] }> = await GetUsers();
            if (response.status === "fail") {
                console.error("Failed to fetch users");
            } else {
                const successApiResponse = response as successResponse<{ users: user[] }>;
                setUsers(successApiResponse.data.users);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Fetch groups
    const fetchGroups = async () => {
        try {
            const response: genericResponse<Group[]> = await GetGroups();
            if (response.status === "fail") {
                console.error("Failed to fetch groups");
            } else {
                setGroups(response.data.groups || []);
            }
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchUsers();
        fetchGroups();
    }, []);

    // Filter content based on selected option
    const getContent = () => {
        switch (selectedOption) {
            case "users":
                return users.filter((user) => user.status === true); // Active users
            case "bannedUsers":
                return users.filter((user) => user.status === false); // Banned users
            case "groups":
                return groups;
            default:
                return [];
        }
    };

    // Event Handlers
    const handleBanUnban = async (id: string, status: boolean) => {
        try {
            await BanandUnban(id);
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === id ? { ...user, status: !status } : user))
            );
        } catch (error) {
            console.error("Error banning/unbanning user:", error);
        }
    };

    const handleFilterToggle = async (id: string, hasFilter: boolean) => {
        try {
            await FilterandRemovefilter(id);
            setGroups((prevGroups) =>
                prevGroups.map((group) =>
                    group.id === id ? { ...group, hasFilter: !hasFilter } : group
                )
            );
        } catch (error) {
            console.error("Error toggling filter:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="mb-4 rounded bg-blue-900 px-2 py-2 text-2xl font-bold text-white">
                Admin Dashboard
            </h1>

            {/* Combo Box */}
            <div>
                <label className="mb-2 block text-gray-600">Select a Category</label>
                <select
                    className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="users">Users</option>
                    <option value="bannedUsers">Banned Users</option>
                    <option value="groups">Groups</option>
                </select>
            </div>

            {/* Display Content */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold capitalize text-gray-700">
                    {selectedOption.replace(/([A-Z])/g, " $1")}
                </h2>
                <ul className="mt-4 space-y-2">
                    {getContent().map((item: user | Group, index) => (
                        <li
                            key={index}
                            className="rounded-lg bg-gray-200 p-4 text-blue-900 shadow-sm"
                        >
                            {selectedOption === "groups" ? (
                                <div className="flex justify-between">
                                    <p className="font-bold">
                                        Group Name:{" "}
                                        <span className="font-normal">{item.community.name}</span>
                                    </p>
                                    <p className="font-bold">
                                        Group Size:{" "}
                                        <span className="font-normal">{item.groupSize}</span>
                                    </p>
                                    <p className="font-bold">
                                        Privacy:{" "}
                                        <span className="font-normal">
                                            {item.community.privacy ? "Private" : "Public"}
                                        </span>
                                    </p>
                                    <button
                                        className={`rounded-lg px-4 py-2 font-bold ${
                                            item.hasFilter
                                                ? "bg-blue-700 text-white hover:bg-blue-900"
                                                : "text-blue-600 hover:text-blue-900"
                                        }`}
                                        onClick={() => handleFilterToggle(item.id, item.hasFilter)}
                                    >
                                        {item.hasFilter ? "Remove Filter" : "Apply Filter"}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between">
                                    <p>{item.username}</p>
                                    <p>{item.email}</p>
                                    <button
                                        className={`font-bold ${
                                            item.status
                                                ? "text-red-600 hover:text-red-900"
                                                : "text-blue-600 hover:text-blue-900"
                                        }`}
                                        onClick={() => handleBanUnban(item.id, item.status)}
                                    >
                                        {item.status ? "Ban User" : "Unban User"}
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
