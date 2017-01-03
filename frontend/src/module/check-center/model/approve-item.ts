//审批列表

export class ApproveItem{
    approverId : string = null; //审批人ID

    approver : string = null;//审批人
    
    operateTime : string = null; //审批时间

    reason : string = null; //审批意见
    
}


// ApprovalHistoryRecord {
// approver (string, optional): 审批人名称
//  ,

// approverId (string, optional): 审批人ID
//  ,

// departmentName (string, optional): 审批人所属部门
//  ,

// operateTime (string, optional): 审批时间
//  ,

// operation (string, optional): 同意/拒绝
//  ,

// reason (string, optional): 审批意见
 
// } 