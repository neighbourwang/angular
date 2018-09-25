export class MsgAlertModel {

    edge: number = 0;
    list: Array<MsgModel> = [];
    constructor() {
        
    }

}

export class MsgModel {
    
    id: string;
    content: string;
    createTime:string;
    status: string;

    checked: boolean = false;
    
    constructor() {

    }

}