import { ResourceQuota } from './resourcequota';

export class EntEstResourceQuota {
    enterpriseId: string = null; //企业id
    platformVMQuota: number = 0;//可创建云主机数量
    physicalMachineQuota: number = 0;//可创建物理机数量
    storageQuota: number = 0; //可用存储额度
    snapQuota: number = 0; //可创建快照数量
    imageQuota: number = 0; //可创建镜像数量

    //ui operation
    checked: boolean = false;
    referredResourceQuota : ResourceQuota = null;
}