export const trimAddress = (address: string | undefined): string => {
    if (!address) return "";
    const trimmed = `${address.slice(0, 5)}...${address.slice(- 5)}`;
    return trimmed;
};