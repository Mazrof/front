export type ChannelData = {
    name: string;
    canAddComments: boolean;
    privacy: boolean;
};

export type JoinRequest = {
    role: "member" | "admin";
};
