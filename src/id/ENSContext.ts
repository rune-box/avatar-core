import { Web3Provider, getDefaultProvider, BaseProvider } from '@ethersproject/providers';
import {RoboHash} from '../image/RoboHash';
import { Settings } from '../Settings';

export class ENSContext {
    provider: BaseProvider;
    backToRobohash: string = "set1";
    ensName: string = "";

    constructor(_provider: any, _backToRobohash: string = "set1") {
        let eth = getDefaultProvider(undefined, Settings.ProviderOptions);
        let chainId = null;
        let isEthers = false;

        // carlos: Only use the provided provider if ENS is actually on that chain
        if (_provider) {
            if (_provider.currentProvider?.chainId) {
                chainId = parseInt(_provider.currentProvider.chainId);
            } else if (_provider.network?.chainId) {
                isEthers = true;
                chainId = _provider.network.chainId;
            }

            if ([1, 3, 4, 5].includes(chainId)) {
                eth = isEthers ? (_provider as BaseProvider) : new Web3Provider(_provider.currentProvider);
            } else {
                chainId = 1;
            }
        }
        this.provider = eth;
        this.backToRobohash = _backToRobohash;
    }

    async getAvatarUri(address: string) {
        this.ensName = await this.provider.lookupAddress(address) || "";
        const robohashUri = RoboHash.getImageUri(address, this.backToRobohash);
        if (this.ensName) {
            const resolver = await this.provider.getResolver(this.ensName);
            //console.log(resolver);
            if(!resolver){
                return robohashUri;
            }
            // https://docs.ethers.io/v5/api/providers/provider/#EnsResolver
            const info = await resolver.getAvatar();//.getText('avatar');
            //console.log(info);
            if (info) {
                return info.url || robohashUri;
            }
            else{
                return robohashUri;
            }
        }
    }

}