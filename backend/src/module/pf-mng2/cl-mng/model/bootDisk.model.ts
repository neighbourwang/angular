export class BootDiskModel{
    "bootStorageDescription": string;
    "bootStorageId": string;
    "bootStorageName": string;
    "bootStorageStatus": string;
    "platformId": string;
    "storageId": Array<string>;
    "storageName": Array<string>;
    "storageDisplayName":Array<string>;
    "zoneId": string;
    "zoneName": string;
    constructor(){
        this.storageId=[];
        this.storageName=[];
        this.storageDisplayName=[];
    }
}