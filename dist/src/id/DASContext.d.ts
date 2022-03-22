import Das from "das-sdk";
export declare class DASContext {
    das: Das;
    DID: string;
    AvatarUri: string;
    constructor();
    getDID(address: string, coin_type?: string): Promise<string>;
    process(address: string): Promise<void>;
}
