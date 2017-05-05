export class StoreInfoModel{
    order: number;
    storageId: string;
    storageName: string;
    displayName: string;
    storageType: string;
    total: number;
    copy: number;
    qurota: number; //���
    rate: number;  //������
    usage: number;
    status: string;
    capacity: number;
    allocation: number;
    allocationPercent: number;
    actual: number;
    actualPercent: number;
    startup: number;
    startupCapacity: number;
    disk: number;
    diskCapacity: number;
}