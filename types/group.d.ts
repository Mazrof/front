export type GroupData = {
    id: number;
    groupSize: number;
    community: {
        name: string;
        privacy: boolean;
        imageURL: string;
    };
};
