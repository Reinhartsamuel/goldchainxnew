import { NextRequest } from "next/server";

const CryptoJS = require("crypto-js");

export async function POST(request: NextRequest) {
    let { product, qty, price, amount, returnUrl, notifyUrl, referenceId, buyerName, buyerPhone, buyerEmail, target, va, apikey } = await request.json();

    // let apikey; // development mode
    // let va;
    let url = 'https://my.ipaymu.com/api/v2/payment'; // production mode
    if (target === "development") {
        url = 'https://sandbox.ipaymu.com/api/v2/payment';
    }

    const body = {
        "product": product, //array of strings
        "qty": qty, //array of strings
        "price": price, //array of strings
        "amount": amount,
        "returnUrl": returnUrl, //your thank you page url
        "cancelUrl": "https://your-website.com/cancel-page", // your cancel page url
        "notifyUrl": notifyUrl, // your callback url
        "referenceId": referenceId, // your reference id or transaction id
        "buyerName": buyerName, // optional
        "buyerPhone": buyerPhone, // optional
        "buyerEmail": buyerEmail, // optional
    };


    // generate signature
    const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
    const stringtosign = "POST:" + va + ":" + bodyEncrypt + ":" + apikey;
    const signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringtosign, apikey));


    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'signature': signature,
                'va': va,
                'timestamp': JSON.stringify(Date.now())
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        return Response.json(data);
    } catch (error: Error | any) {
        return Response.json(error);
    };
};