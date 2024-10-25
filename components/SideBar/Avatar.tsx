// components/Avatar.js
import React from "react";
import { genAvatar } from "../../utils/genAvatar";

const Avatar = ({ name }) => {
    const avatarLetter = genAvatar(name);

    return (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
            <span className="text-lg font-bold">{avatarLetter}</span>
        </div>
    );
};

export default Avatar;
