'use client'
import { Heading, useToast } from "@chakra-ui/react";
import { Html5Qrcode, Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { QrcodeResult, QrcodeSuccessCallback } from "html5-qrcode/esm/core";
import { useEffect } from "react";

const Html5QrScanner = () => {
    const toast = useToast();




    useEffect(() => {
        function onScanSuccess(decodedText: string, decodedResult: any) {
            // handle the scanned code as you like, for example:
            // console.log(`Code matched = ${decodedText}`, decodedResult);
            toast({
                title: 'Success',
                description: `Code matched = ${decodedText}`,
                status: 'success',
                isClosable: true
            })

        }

        function onScanFailure(error: string) {
            // handle scan failure, usually better to ignore and keep scanning.
            // for example:
            console.warn(`Code scan error = ${error}`);
        }

        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }, [])

    return (
        <>
            <Heading size='md'> Html5QrScanner</Heading>
            <div id="reader" style={{ width: '300px' }}></div>
        </>
    )
}

export default Html5QrScanner