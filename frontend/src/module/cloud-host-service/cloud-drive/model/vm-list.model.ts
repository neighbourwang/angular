class VmList{
    expiryDate: number;
    instanceName: string;
    itemId: string;
    networkType: string;
    osInfo: string;
    paymentType: string;
    regionZone: string;
    specification: string;
    uuid: string;
    vmState: string;
    privateIp: string; //内部IP
    publicIP : string; //外部IP
    diskCount : number; //磁盘数量
    snapshotCount : number; //快照数量
}

class HandleVm {
  actions: string;
  enterpriseIds = {
    enterpriseId: "88",
    platformId: "88"
  };
  id:string;
  uid:string;
}

export {
    VmList,
    HandleVm
}