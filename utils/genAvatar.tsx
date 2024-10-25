export const genAvatar = (name: string) => {
    try {
        // Match General_Category=Letter
        const match = name.match(/\p{L}/u);
        return (match && match[0]) || null;
    } catch {
        return name[0] || null;
    }
};
