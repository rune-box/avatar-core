import { BaseProvider } from '@ethersproject/providers';
export declare class ENSContext {
    provider: BaseProvider;
    backToRobohash: string;
    ensName: string;
    constructor(_provider: any, _backToRobohash?: string);
    getAvatarUri(address: string): Promise<string | undefined>;
}
