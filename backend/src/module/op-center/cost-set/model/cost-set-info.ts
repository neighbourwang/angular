export class CostSetInfo{
    currency :string; //货币类型 

    payType: number;//付费方式 ,

    billPeriod :number//出账周期 ,

    billCreateDate:string; // 账单生成日期 ,

    billSendDate:string; //账单发送日期 ,

    refund:number;//计费规则 0退费，1不退费

    specialBill:number //特殊计费
    
    newPriceEffect:number //生效方式


}

// {
//   "detailDescription": "string",
//   "resultCode": "string",
//   "resultContent": [
//     {
//       "billCreateDate": 0,
//       "billPeriod": 0,
//       "billSendDate": 0,
//       "currency": "string",
//       "fiscalDay": 0,
//       "fiscalMonth": 0,
//       "id": "string",
//       "name": "string",
//       "newPriceEffect": 0,
//       "payType": 0,
//       "refund": 0,
//       "specialBill": 0
//     }
//   ]
// }
// billCreateDate (integer, optional): 账单生成日期 ,
// billPeriod (integer, optional): 出账周期 ,
// billSendDate (integer, optional): 账单发送日期 ,
// currency (string, optional): 货币类型 ,
// fiscalDay (integer, optional): 企业的财年月。财年月的日，暂时不用 ,
// fiscalMonth (integer, optional): 企业的财年月。比如惠普的财年月是11月 ,
// id (string, optional): 企业/机构ID ,
// name (string, optional): 企业/机构名称 ,
// newPriceEffect (integer, optional): 价格调整生效方式 0 立即生效，1 下次订购生效 ,
// payType (integer, optional): 付费方式 ,
// refund (integer, optional): 是否退款 0 不退，1 退款 ,
// specialBill (integer, optional): 特殊计费方式