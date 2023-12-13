import Error from "next/error";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    try {
        const result = await fetch(`https://api.polygonscan.com/api?module=account&action=balance&address=${address}&apikey=8CKNFTHGX9IXX4J8756D5N1MZ2ZZ7TWFE4`)
        const res = await result.json();
        const data = { ...res };
        return Response.json(data);
    } catch (error: Error | any) {
        return Response.json({
            status: false,
            message: error?.message
        });
    };
};