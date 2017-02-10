

export class CostPandectItem{

 
}

export class  DateItem{  
    get years():Array<number>{
        let years =[];
        for(let i=2017;i>0;i--){
            years[i]=i;
        }
        return years;
    } 
     get months():Array<number>{
        let months =[1,2,3,4,5,6,7,8,9,10,11,12];
        return months;
    } 

}