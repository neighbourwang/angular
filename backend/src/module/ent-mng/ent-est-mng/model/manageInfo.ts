

export class OrderCounter{//订单与审批
    notApprveOrder : number = 0;//待审批订单
    overdueOrder : number = 0;//即将过期订单
}
export class WorkCounter{//工单
    newOrder : number = 0;//新创建工单数
    processOrder : number = 0;//处理中工单数
    completedOrder : number = 0;//已完成工单数
}
export class AccountCounter{//账户
    startAccount : number = 0;//启用的用户数量
    disabledAccount : number = 0;//禁用的用户数量
}

