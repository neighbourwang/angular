export class StorageModel {
    order: number;
    storageId: string;
    storageName: string;
    displayName: string;
    storageType: string;
    capacity: string;
    copy: number; //副本数
    qurota: string;
    rate: number;//分配率
    usage: number;//利用率
    status: string;
}