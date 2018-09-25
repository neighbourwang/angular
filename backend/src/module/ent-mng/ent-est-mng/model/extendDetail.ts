
export class ExtendDetailItem{
    orderForAudit : number = 0;//待审批订单
    serviceToExpired : number = 0;//即将过期订单

    ticketNew : number = 0;//新创建工单数
    ticketProcessing : number = 0;//处理中工单数
    ticketDone : number = 0;//已完成工单数

    userEnabled : number = 0;//启用的用户数量
    userDisabled : number = 0;//禁用的用户数量

    //云主机
    vmRunning : number = 0; 
    vmPaused : number = 0;
    //物理机

    pcRunning : number = 0; 
    pcPaused : number = 0;

    //存储

    storageRunning : number = 0; 
    storagePaused : number = 0;

    //数据库
    dbRunning : number = 0; 
    dbPaused : number = 0;

    //快照、镜像
    snapshotRunning : number = 0; 
    snapshotPaused : number = 0;
}


// EnterpriseExtItem {
// dbPaused (integer, optional),
// dbRunning (integer, optional),
// id (string, optional),
// orderForAudit (integer, optional),
// orderToExpired (integer, optional),
// pcPaused (integer, optional),
// pcRunning (integer, optional),
// snapshotPaused (integer, optional),
// snapshotRunning (integer, optional),
// storagePaused (integer, optional),
// storageRunning (integer, optional),
// ticketDone (integer, optional),
// ticketNew (integer, optional),
// ticketProcessing (integer, optional),
// userDisabled (integer, optional),
// userEnabled (integer, optional),
// vmPaused (integer, optional),
// vmRunning (integer, optional)
// }


