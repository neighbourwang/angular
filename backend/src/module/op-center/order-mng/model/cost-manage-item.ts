export class CostManageItem{

     id:string;
     circleTime:string;//记账周期
     money:string;//账单金额
     endDate:string;//账单生成日
     sentDate:string;//账单发送日
     status:string;//账单状态
     statusName:string;//用于显示

}

export class CostManageImprove{
    id:string;
    // money:string;//本期账单金额
    name:string; //项目名称
    money_improve:string;//调整金额
}