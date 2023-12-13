export const trimAddress = (address: string): string => {
    const trimmed = `${address.slice(0, 5)}...${address.substring(address.length - 5)}`;
    return trimmed;
};