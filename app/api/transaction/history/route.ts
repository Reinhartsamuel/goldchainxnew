import Moralis from "moralis";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json()
  const address = body.address;
  // return Response.json(body)

  try {
    await Moralis.start({
      apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFkN2ZhYTRhLTNlZWYtNGY4MC1iNDUwLTUyZDQwMTgxYmY1ZiIsIm9yZ0lkIjoiMzY1ODUzIiwidXNlcklkIjoiMzc2MDAxIiwidHlwZUlkIjoiYmFjYzhjMTYtOTJhNi00ZTE4LWE2ZjAtZjZkNzRhY2VlMDg3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDEwMDEwNTIsImV4cCI6NDg1Njc2MTA1Mn0.KZa9YIqf2n4WX4gkMa3Z-RA4yfJ3uwWaeXuKHaWaydM"
    });

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: "0x89",
      format: "decimal",
      mediaItems: false,
      address: address
    });
    console.log(response);
    return Response.json(response)

  } catch (error: Error | any) {
    return Response.json({
      status: false,
      message: error.message
    })
  }


}