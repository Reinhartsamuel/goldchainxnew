import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    try {
        const result = await fetch(`https://api.polygonscan.com/api?module=contract&action=getabi&address=${address}&apikey=8CKNFTHGX9IXX4J8756D5N1MZ2ZZ7TWFE4`);
        const data = await result.json();
        console.log(data,"dataaaa")
        return Response.json({
            status: true,
            address,
            data
        })
    } catch (error: Error | any) {
        return Response.json({
            status: false,
            message: error.message
        });
    };
};