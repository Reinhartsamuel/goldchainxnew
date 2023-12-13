import { ethers } from "ethers";
import Error from "next/error";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    try {
        const result = await fetch(`https://api.polygonscan.com/api?module=contract&action=getcontractcreation&contractaddresses=${address}&apikey=8CKNFTHGX9IXX4J8756D5N1MZ2ZZ7TWFE4`);
        console.log(result, ":::result")
        return Response.json({
            status: true,
            address,
            data: result
        })
    } catch (error: Error | any) {
        return Response.json({
            status: false,
            message: error
        });
    };
};

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const myApiToken = '8CKNFTHGX9IXX4J8756D5N1MZ2ZZ7TWFE4';

    // make an API call to the ABIs endpoint 
    const response = await fetch(`https://api.polygonscan.com/api?module=contract&action=getabi&address=${address}&apikey=${myApiToken}`);
    const data = await response.json();
  
    let abi = data.result;
    console.log(abi, "this is abi");
    return Response.json({ abi })

    const node = "wss://polygon-mumbai.infura.io/ws/v3/733a7efe57364ffd9210b582d7cd0cb3";
    const provider = new ethers.providers.WebSocketProvider(node);

    let privatekey = "fdfb72ce9754e3cbc1e79e44a8e20804cebd3c4a347605c6a3462a8de05b8784";
    let wallet = new ethers.Wallet(privatekey, provider);

    console.log("Using wallet address " + wallet.address);

    let contractaddress = "0x50802059B3A299b36bc2c71aBEDBA450032f49AB";
    let contract = new ethers.Contract(contractaddress, abi, wallet);

    let read = await contract.retrieve();
    console.log("Value stored in contract is " + read.toString());

    // call the "store" function to update the value to 420
    let write = await contract.store(420);

    // wait for 2 blocks of confirmation 
    write.wait(2)
        .then(async () => {
            // read the contract again, similar to above
            let read = await contract.retrieve();
            console.log("Updated value stored in contract is " + read.toString());
        });
};