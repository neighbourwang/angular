import{CaseDate} from "./case-list.model"
export class CloseInfo{
    id:string;         //工单ID
    closerName:string;//关闭人名字 
    closeDate:string; //关闭时间
    closeType:string=" "; //关闭类型
    closeInfo:string;//关闭信息

}
export class HandleInfo{
   
      emergency: string=" ";  //紧急程度
      emergencyChange: string;//紧急程度
      handleDate: CaseDate; //处理时间
      handleInfo: string; //处理信息 
      handlerName: string; //处理人
      workListId: string;//对应工单号
  
}

