import {
    readFileSync
} from 'fs';
import {
    sdk
} from './helpers.js';

async function main() {
    const bundleModuleAddress = '0x1f118F0d511722a1587f617Eec4A7B250B7F89F5'; // your bundle module address
    const bundleModule = sdk.getBundleModule(bundleModuleAddress);

    const packModuleAddress = '0xa779BD09cD8d7C1fd3A5ed16452CFac02BEb4BcE '; // your pack module address
    const packModule = sdk.getPackModule(packModuleAddress);

    console.log('Getting all NFTs from bundle...');
    const nftsInBundle = await bundleModule.getAll();

    console.log('NFTs in bundle:');
    console.log(nftsInBundle);

    console.log('Creating a pack containing the NFTs from bundle...');
    const created = await packModule.create({
        assetContract: bundleModuleAddress,
        metadata: {
            name: 'Fancy Cars Pack!',
            image: readFileSync('./assets/fancy-cars.jpeg'),
        },
        assets: nftsInBundle.map(nft => ({
            tokenId: nft.metadata.id,
            amount: nft.supply,
        })),
    });

    console.log('Pack created!')
    console.log(created);
}

try {
    await main();
} catch (error) {
    console.error("Error minting the NFTs", error);
    process.exit(1);
}