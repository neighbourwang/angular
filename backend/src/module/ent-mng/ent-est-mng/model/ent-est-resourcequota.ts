import { ResourceQuota } from './resourcequota';

export class EntEstResourceQuota {
    enterpriseId: string = null; //企业id
    platformVMQuota: number = null;//可创建云主机数量
    physicalMachineQuota: number = null;//可创建物理机数量
    storageQuota: number = null; //可用存储额度
    snapQuota: number = null; //可创建快照数量
    imageQuota: number = null; //可创建镜像数量

    //ui operation
    checked: boolean = false;
    referredResourceQuota : ResourceQuota = null;

    reset(){
    	this.enterpriseId = null;
    	this.platformVMQuota = null;
    	this.physicalMachineQuota = null;
    	this.storageQuota = null;
    	this.snapQuota = null;
    	this.imageQuota = null;
    }
}
