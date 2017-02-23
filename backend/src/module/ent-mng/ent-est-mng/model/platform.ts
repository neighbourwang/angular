
export class Platform{
    
    id : string = null;
    index :number = 0;

    name : string = null;//平台名称
    type : string = null;//平台类型
    typeName: string = null;

    status : string = null;//状态 前台模拟1启用，0禁用  
    statusName: string = null;//用于显示

    isSelected : number = 0;//0未选择平台，1已选择平台
} 