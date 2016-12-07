export class DetaiItem{
    id : string = null; //订单ID
    orderCode : string = null;//订单编号

    status : string = null; //状态

    productType : string = null;//产品类型OrderInstanceItem

    region : string = null;//区域？？？
                           //当前配置 ???

     createDate : string = null;//创建时间

    billingMode : string = null;//计费模式OrderInstanceItem

    exireDate : string = null;//到期时间

    oneTimePrice : string = null;//一次性费用

    billingPerson : string = null;//订购人OrderInstanceItem
    billingPersonId : string = null;//订购人IDOrderInstanceItem
 
     price : string = null;//费用

    department : string = null;//部门
    departmentId : string = null;//部门Id

     instanceName : string = null;//实例名称

    enterpirse : string = null;//企业
    enterpirseId : string = null;//企业Id

    backendApprover : string = null;//操作者是后台提交者？？？

   //orderCode,实例名称？？，productType,配置？？，productBillingItem.billingMode，orderStatus，productBillingItem.basePrice,.productBillingItem.basicPrice,completeDate
    relatedOrders : DetaiItem[] = [];//关联订单
}
   


// GeneralContentResultOfOrderDetailItem {
// detailDescription (string, optional),

// resultCode (string, optional),

// resultContent (OrderDetailItem, optional)
// }
// OrderDetailItem {
// backendApprover (string, optional): 后台审批人
//  ,

// backendApproverId (string, optional): 后台审批人ID
//  ,

// billingMode (string, optional): 计费模式
//  ,

// billingPerson (string, optional): 订购人
//  ,

// billingPersonId (string, optional): 订购人ID
//  ,

// createDate (string, optional): 创建时间
//  ,

// department (string, optional): 部门
//  ,

// departmentApprover (string, optional): 部门审批人
//  ,

// departmentApproverId (string, optional): 部门审批人ID
//  ,

// departmentId (string, optional): 部门ID
//  ,

// enterpirse (string, optional): 企业
//  ,

// enterpirseId (string, optional): 企业ID
//  ,

// exireDate (string, optional): 过期时间
//  ,

// id (string, optional): 订单ID
//  ,

// orderCode (string, optional): 订单编号
//  ,

// orderInstanceItems (Array[OrderInstanceItem], optional): 订单中的产品信息
//  ,

// relatedOrders (Array[OrderItem], optional): 关联订单
//  ,

// status (string, optional): 订单状态
//  ,

// subscriptTime (integer, optional): 购买周期
 
// }
// OrderInstanceItem {
// billingCycle (string, optional): 购买时长
//  ,

// billingMode (string, optional): 计费模式
//  ,

// createDate (string, optional): 创建时间
//  ,

// exireDate (string, optional): 过期时间
//  ,

// instanceName (string, optional): 实例名称
//  ,

// isSetPassword (string, optional): 密码设置与否，0 未设置，1 已设置
//  ,

// oneTimePrice (integer, optional): 一次性费用
//  ,

// price (integer, optional): 费用
//  ,

// productType (string, optional): 产品类型
//  ,

// quantity (string, optional): 订购数量
//  ,

// specificationItem (Array[SpecificationItem 每个实例为 可用区名称，平台名称（region）,CPU核数,内存大小,硬盘类型,硬盘大小,启动盘容量，操作系统，内部IP，外部IP 中的一项], optional): 产品规格
//  ,

// status (string, optional): 订单状态
//  ,

// subscriptTime (integer, optional): 购买周期
 
// }
// OrderItem {
// completeDate (string, optional): 完成时间
//  ,

// createDate (string, optional): 提交时间
//  ,

// departmentName (string, optional): 所属部门
//  ,

// id (string, optional): 订单ID
//  ,

// orderCode (string, optional): 订单编号
//  ,

// orderStatus (string, optional): 订单状态
//  ,

// orderType (string, optional): 订单类型
//  ,

// productBillingItem (ProductBillingItem, optional): 费用
//  ,

// productType (string, optional): 产品类型
//  ,

// submiter (string, optional): 提交者
 
// }
// SpecificationItem 每个实例为 可用区名称，平台名称（region）,CPU核数,内存大小,硬盘类型,硬盘大小,启动盘容量，操作系统，内部IP，外部IP 中的一项 {
// attrCode (string, optional): 服务属性Code
//  ,

// attrDisplayName (string, optional): 服务属性页面显示的名称
//  ,

// attrDisplayValue (string, optional): 服务属性值显示值
//  ,

// attrOrderSeq (integer, optional): 属性显示顺序, 如果为空，则忽略
//  ,

// attrValueCode (string, optional): 服务属性值Code
//  ,

// description (string, optional): 其他描述性内容，非不要
//  ,

// valueUnit (string, optional): 服务属性值的单位
 
// }
// ProductBillingItem {
// basePrice (number, optional): 一次性价格
//  ,

// basicPrice (number, optional): 周期计费-基础周期价格
//  ,

// billingId (string, optional): 产品计费ID
//  ,

// billingMode (string, optional): 计费类型，需要检索数据字典
//  ,

// cyclePrice (number, optional): 周期计费-增量周期价格
//  ,

// periodType (string, optional): 周期计费-周期类型，需要检索数据字典
//  ,

// unitPrice (number, optional): 流量计费-流量单价
//  ,

// unitType (number, optional): 流量计费-流量计费类型，需要查询数据字典
 
// } 
// {
//   "detailDescription": "string",
//   "resultCode": "string",
//   "resultContent": {
//     "backendApprover": "string",
//     "backendApproverId": "string",
//     "billingMode": "string",
//     "billingPerson": "string",
//     "billingPersonId": "string",
//     "createDate": "2016-12-06T05:36:22.807Z",
//     "department": "string",
//     "departmentApprover": "string",
//     "departmentApproverId": "string",
//     "departmentId": "string",
//     "enterpirse": "string",
//     "enterpirseId": "string",
//     "exireDate": "2016-12-06T05:36:22.807Z",
//     "id": "string",
//     "orderCode": "string",
//     "orderInstanceItems": [
//       {
//         "billingCycle": "string",
//         "billingMode": "string",
//         "createDate": "2016-12-06T05:36:22.807Z",
//         "exireDate": "2016-12-06T05:36:22.807Z",
//         "instanceName": "string",
//         "isSetPassword": "string",
//         "oneTimePrice": 0,
//         "price": 0,
//         "productType": "string",
//         "quantity": "string",
//         "specificationItem": [
//           {
//             "attrCode": "string",
//             "attrDisplayName": "string",
//             "attrDisplayValue": "string",
//             "attrOrderSeq": 0,
//             "attrValueCode": "string",
//             "description": "string",
//             "valueUnit": "string"
//           }
//         ],
//         "status": "string",
//         "subscriptTime": 0
//       }
//     ],
//     "relatedOrders": [
//       {
//         "completeDate": "2016-12-06T05:36:22.807Z",
//         "createDate": "2016-12-06T05:36:22.807Z",
//         "departmentName": "string",
//         "id": "string",
//         "orderCode": "string",
//         "orderStatus": "string",
//         "orderType": "string",
//         "productBillingItem": {
//           "basePrice": 0,
//           "basicPrice": 0,
//           "billingId": "string",
//           "billingMode": "string",
//           "cyclePrice": 0,
//           "periodType": "string",
//           "unitPrice": 0,
//           "unitType": 0
//         },
//         "productType": "string",
//         "submiter": "string"
//       }
//     ],
//     "status": "string",
//     "subscriptTime": 0
//   }
// }