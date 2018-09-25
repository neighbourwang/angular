export class AlarmListModel{

    order: number;
    itemId:string;
    name:string;
    threshold:Array<Threshold>=[];
    switching:string;
    method:number;
    description:string;
    period:string;
    repeat:number;
    receiver:Array<Receiver>;
    isSelect=false;
}

export class Threshold{
    id:string;
    content:string;
    name:string;
    symbol:string;
    value:number;
    level:string="";
    itemId:string;
}
 
export class Receiver{
    id:string;
    name: string;
    email: string;
    account: string;
    role:string;
    isSelect=false;
}