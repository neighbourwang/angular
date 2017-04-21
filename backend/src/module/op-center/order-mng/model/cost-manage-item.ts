export class CostManageItem{

     id:string;
     tenantId :string;//企业Id
     startTime:string;
     endTime:string;//记账周期

     money:string;//账单金额
     endDate:string;//账单生成日
     sentDate:string;//账单发送日
     status:string;//账单状态
     statusName:string;//用于显示

    adjustAmount:string;//调整金额

    adjustReason:string;//调整项目
}

