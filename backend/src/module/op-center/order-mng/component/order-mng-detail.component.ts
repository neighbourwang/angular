import { Component, OnInit, ViewChild} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ItemLoader
  , RestApi
  , RestApiCfg
  , LayoutService
  , NoticeComponent
  , PopupComponent
  , ConfirmComponent
  , SystemDictionaryService
  , SystemDictionary } from '../../../../architecture';
  import {DictService} from '../../../../architecture/core/service/dict-service';
import{OrderDetailItem,PhysicalMachine,PhysicalMachinePart} from '../model';
  
import * as _ from 'underscore';
@Component({
  // moduleId: module.id,
  selector: 'order-mng-detail',
  templateUrl: '../template/order-mng-detail.component.html',
  styleUrls: ['../style/order-mng-detail.less'],
  providers: []
}) 
export class OrderMngDetailComponent implements OnInit {

  @ViewChild("notice")
  private _notice: NoticeComponent;


  private _detailLoader:ItemLoader<OrderDetailItem> = null;
  private orderId:string;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private activatedRoute: ActivatedRoute,
    private _dictServ:DictService,
    private restApi:RestApi
  ) {
    this._detailLoader = new ItemLoader<OrderDetailItem>(null,"ORDER_MNG.PURCHASED_SERVICE_DETAILS_ERROR","op-center.order-mng.subinstance-detail.post",restApiCfg,restApi);
    
    this._detailLoader.MapFunc = (source:Array<any>, target:Array<OrderDetailItem>)=>{
			for(let item of source)
			{
				let obj:OrderDetailItem = _.extendOwn(new OrderDetailItem(), item)
				target.push(obj);
      
			}
		};

    this._detailLoader.FirstItem = new OrderDetailItem();

    	this._detailLoader.Trait = (target:Array<OrderDetailItem>)=>{
        
			//匹配历史信息
			for(let item of target ){

        if(item.itemList){
					if(item.itemList[0].pmEntity){
						for(let partItem of item.itemList[0].pmEntity.partsEntitys){
							if(partItem.partsName=='磁盘'||partItem.partsName=='内存'){
								partItem.capacity = Number(partItem.number)*Number(partItem.specValue)+'GB';//只有磁盘和内存计算总容量
								partItem.specValue+='GB';		
							}		
							if(partItem.partsName=='CPU'){
								partItem.specValue=partItem.specValue.replace('Ghz','GHZ');
							}
							if(partItem.partsName=='网卡'){
								partItem.specValue+='M';
							}
						}
					}
					// else{
					// 	// Mock数据
					// 	item.itemList[0].pmEntity = new PhysicalMachine();
					// 	let _item = new PhysicalMachinePart();
					// 	_item.partsName = 'CPU';
					// 	_item.specName = 'Xeon E5 2560';
					// 	_item.specValue = '2Ghz';
					// 	_item.number = '3';
					// 	_item.capacity = '4';
					// 		let _item2 = new PhysicalMachinePart();
					// 	_item2.partsName = '磁盘';
					// 	_item2.specName = 'Xeon E5 2560';
					// 	_item2.specValue = '2';
					// 	_item2.number = '3';
					// 	_item2.capacity = '4';
					// 	item.itemList[0].pmEntity.partsEntitys[0] = _item;
					// 	item.itemList[0].pmEntity.partsEntitys[1] = _item2;
					// 	for(let partItem of item.itemList[0].pmEntity.partsEntitys){
					// 		if(partItem.partsName=='磁盘'||partItem.partsName=='内存'){
					// 			partItem.capacity = Number(partItem.number)*Number(partItem.specValue)+'GB';//只有磁盘和内存计算总容量
					// 			partItem.specValue+='GB';		
					// 		}		
					// 		if(partItem.partsName=='CPU'){
					// 			partItem.specValue=partItem.specValue.replace('Ghz','GHZ');
					// 		}
					// 		if(partItem.partsName=='网卡'){
					// 			partItem.specValue+='M';
					// 		}
					// 	}
					// }
					if(item.itemList[0].specList){
						let getProperty = _.property("attrDisplayValue");
						if(item.productType==0||item.productType==4||item.productType==11){
							item.instanceName = getProperty(item.itemList[0].specList.find(n=>n.attrCode == 'INSTANCENAME'));
						}else{
							item.instanceName = getProperty(item.itemList[0].specList.find(n=>n.attrCode == 'DISKINSNAME'));
						}
					}	
				}

        
				if(item.hisOrderList){
					for(let hisItem of item.hisOrderList){
						// item.hisOrderList[0].type=0;
						// item.hisOrderList[1].type=0;0是订购单
						let getProperty = _.property("attrDisplayValue");
						if(hisItem.specList){
							 if(hisItem.productType==0){
								hisItem.instanceName = getProperty(hisItem.specList.find(n=>n.attrCode == 'INSTANCENAME'));
							}else{
								hisItem.instanceName = getProperty(hisItem.specList.find(n=>n.attrCode == 'DISKINSNAME'));
							}
						}
					}
				}
			}
		}
  }
  ngOnInit() {
    if(this.activatedRoute.snapshot.params["orderId"] as string)
    {
      this.orderId = this.activatedRoute.snapshot.params["orderId"] as string;
      this.showDetail(this.orderId);
    }
  }

  showMsg(msg: string)
  {
    this._notice.open("COMMON.SYSTEM_PROMPT", msg);
  }

  showDetail(orderId:string)
  {
    this.layoutService.show();
    this._detailLoader.Go(null,[{key:"subinstanceCode",value:orderId}])
    .then(success=>{
      this.layoutService.hide();
    })
    .catch(err=>{
      this.showMsg(err);
      this.layoutService.hide();
    })
  }

  back(){
    this.router.navigateByUrl('op-center/order-mng/order-mng');
  }
}