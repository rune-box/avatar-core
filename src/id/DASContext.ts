import Das, { AccountInfo } from "das-sdk";
import { Settings } from "../Settings";

export class DASContext {
    das: Das;

    DID: string = "";
    AvatarUri: string = "";
    //DIDAccount: AccountInfo;
    constructor() {
        this.das = new Das({
            url: Settings.RPCEndpoint_DAS,
        });
    }

    async getDID(address: string, coin_type: string = "60") {
        const did = await this.das.reverseRecord({
            type: 'blockchain',
            key_info: {
                coin_type: coin_type,
                key: address
            }
        });
        return did;
    }

    async process(address: string){
        // // https://github.com/satoshilabs/slips/blob/master/slip-0044.md
        this.DID = await this.getDID(address, "60"); // ETH
        if(!this.DID)
            this.DID = await this.getDID(address, "714"); // BSC
        if(!this.DID)
            this.DID = await this.getDID(address, "966"); // MATIC
        if(!this.DID)
            this.DID = await this.getDID(address, "195"); // TRX
        
        let account = await this.das.account(this.DID);
        this.AvatarUri = account.avatar;
    }

}