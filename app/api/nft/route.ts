import Moralis from "moralis";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { wallet_address, token_address } = body;
console.log(Moralis.Core.isStarted)
    try {
        if (!Moralis.Core.isStarted) {

            await Moralis.start({
                apiKey: process.env.MORALIS_API_KEY
            });
        }
    } catch (error: Error | any) {
        return Response.json({
            status: false,
            message: error.message
        })
    }


    try {
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            "chain": "0x89",
            "format": "decimal",
            "tokenAddresses": [
                token_address
            ],
            "mediaItems": false,
            "address": wallet_address,
        });
        console.log(response);
        return Response.json(response.raw)

    } catch (error: Error | any) {
        return Response.json({
            status: false,
            message: error.message
        })
    }


}