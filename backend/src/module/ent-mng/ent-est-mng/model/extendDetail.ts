
export class ExtendDetailItem{
    notApprveOrder : number = 0;//待审批订单
    overdueOrder : number = 0;//即将过期订单

    newOrder : number = 0;//新创建工单数
    processOrder : number = 0;//处理中工单数
    completedOrder : number = 0;//已完成工单数

    startAccount : number = 0;//启用的用户数量
    disabledAccount : number = 0;//禁用的用户数量

    //云主机

    //物理机

    //存储

    //数据库

    //快照、镜像
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


