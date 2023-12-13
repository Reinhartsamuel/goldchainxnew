import { sequence } from "0xsequence";
import { UseToastOptions } from "@chakra-ui/react";
import Moralis from "moralis";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Error from "next/error";

export const wallet = sequence.initWallet({
    defaultNetwork: 'mainnet',
    projectAccessKey: 'Q0ZfFkTedUvuQepZttdzEp3BAAAAAAAAA',
});

// If your dapp runs on a different EVM-compatible blockchain, you can specify its name
export const connectToSequence = async () => {
    // const wallet = sequence.getWallet();

    try {
        const connectDetails = await wallet.connect({
            app: "GoldChainX",
            authorize: true,
            projectAccessKey: 'Q0ZfFkTedUvuQepZttdzEp3BAAAAAAAAA',
            // And pass settings if you would like to customize further
            settings: {
                theme: "dark",
                bannerUrl: "https://firebasestorage.googleapis.com/v0/b/saudagar-92dc2.appspot.com/o/image-assets%2Fgoldchainx.png?alt=media&token=18ca2594-1b72-4df6-8c69-032bb3d9d86e", // 3:1 aspect ratio, 1200x400 works best
                includedPaymentProviders: ["moonpay", "ramp"],
                defaultFundingCurrency: "matic",
                lockFundingCurrencyToDefault: false,

            },
        });


        console.log("user accepted connect?", connectDetails.connected);
        console.log(
            "users signed connect proof to valid their account address:",
            connectDetails.proof
        );

        return connectDetails;

    } catch (error: Error | any) {
        console.log(error, "error connecting to sequence");

        return error;
    }

};


export const startMoralis = async () => {
    await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY
        // ...and any other configuration
    });
};


export const login = async (toast: UseToastOptions | any, router: AppRouterInstance) => {
    const wallet = sequence.getWallet();
    try {
        const result = await wallet.connect({
            app: "GoldChainX",
            authorize: true,
            settings: {
                // signInOptions: ["google"] ,
                theme: "dark",
                bannerUrl: "https://firebasestorage.googleapis.com/v0/b/saudagar-92dc2.appspot.com/o/image-assets%2Fgold.jpeg?alt=media&token=4cfb30d3-519e-4677-adf7-de1937acb015", // 3:1 aspect ratio, 1200x400 works best
                includedPaymentProviders: ["moonpay", "ramp"],
                defaultFundingCurrency: "matic",
                lockFundingCurrencyToDefault: false,
            },
        });


        if (result.connected) {
            router.refresh();
            toast({
                title: "Wallet connected!!",
                description: `Connected to wallet ${result.session?.accountAddress}`,
                status: 'success',
                isClosable: true,
                duration: 5000
            });
        } else {
            toast({
                title: "Wallet disconnected!!",
                description: `Wallet successfully disconnected on ${new Date().toString()}`,
                status: 'success',
                isClosable: true,
                duration: 5000
            });
        }

        console.log("result::", result);
        return result;
    } catch (error: Error | any) {
        console.log(error, "error login");
        toast({
            title: "Oops!",
            description: error.message,
            status: 'error',
            isClosable: true,
            duration: 9000
        });
        throw new Error(error);
    }
};


export const logout = async (toast: UseToastOptions | any, router: AppRouterInstance) => {
    const wallet = sequence.getWallet();
    try {
        wallet.disconnect()
        router.refresh();
        toast({
            title: "Wallet disconnected successfully",
            status: 'warning',
            isClosable: true,
            duration: 5000
        });
    } catch (error: Error | any) {
        console.log("error logging out:", error.message)
        toast({
            title: "Wallet connected!!",
            description: error.message,
            status: 'success',
            isClosable: true,
            duration: 5000
        });
    }
}


export const openWallet = () => {
    const wallet = sequence.getWallet();
    wallet.openWallet();
};