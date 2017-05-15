export class AlarmListModel{


    itemId:string;
    name:string;
    threshold:Array<Threshold>;
    switch:string;
    method:string;
    description:string;
    period:string;
    repeat:number;
    receiver:Array<Receiver>;
    isSelect=false;
}

export class Threshold{
    name:string;
    symbol:string="";
    value:number;
    level:string;
}
 
export class Receiver{
    name: string;
    email: string;
    account: string;
    role:string;
    isSelect=false;
}