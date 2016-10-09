import { ResourceQuota } from './resourcequota';

export class EntEstResourceQuota {
    enterpriseId: string = null;
    networkQuota: number = 0;
    platformId: string = null;
    platformStorageQuota: number = 0;
    platformVMQuota: number = 0;
    regionId: string = null;
    regionName: string = null;
    storageQuota: number = 0;
    vmQuota: number = 0;

    //ui operation
    checked: boolean = false;
    referredResourceQuota : ResourceQuota = null;
}