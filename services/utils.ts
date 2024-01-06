export const trimAddress = (address: string | undefined): string => {
    if (!address || address == undefined || address == null) return "";
    const trimmed = `${address.slice(0, 6)}...${address.slice(- 6)}`;
    return trimmed;
};