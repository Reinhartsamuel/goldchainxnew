import { NextRequest } from "next/server";

export async function GET() {
    return Response.json({
        message: "WOOOOOOOIIIII"
    })
};

// export async function POST(request: NextRequest) {
//     // const { searchParams } = new URL(request.url);
//     // const alamat_rumah = searchParams.get("alamat_rumah");

//     return Response.json({
//         address: "read",
//         searching:true
//     })
// };