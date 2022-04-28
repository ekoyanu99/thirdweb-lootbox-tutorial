import {
    ThirdwebSDK
} from "@3rdweb/sdk";
import ethers from "ethers";

// Read environment variables from .env
import dotenv from "dotenv";
dotenv.config();

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;

if (!walletPrivateKey) {
    console.error("Wallet private key missing")
    process.exit(1)
}

export const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        // Wallet private key. NEVER CHECK THE KEY IN. ALWAYS USE ENVIRONMENT VARIABLES.
        process.env.WALLET_PRIVATE_KEY,
        // We use Polygon Mumbai network
        ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com")
    ),
);

const appAddress = '0x2d0e03f11C7A8a00Fd170Bd8627d1AB2B125CB04'; // your project address from thirdweb

export async function getApp() {
    const app = await sdk.getAppModule(appAddress);
    return app;
}