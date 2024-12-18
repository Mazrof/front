export type ChannelData = {
    id: number;
    invitationLink: string;
    community: {
        imageURL: string;
        name: string;
        privacy: boolean;
    };
    canAddComments: boolean;
};
