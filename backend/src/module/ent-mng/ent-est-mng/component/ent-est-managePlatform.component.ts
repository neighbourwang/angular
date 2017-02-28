import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DicLoader,ItemLoader, RestApi, RestApiCfg,LayoutService, NoticeComponent, PopupComponent, SystemDictionaryService, SystemDictionary  } from '../../../../architecture';
import { EntProdItem, EntEst,Platform} from '../model';

import { EntEstCreService, Paging } from '../service/ent-est-cre.service';
import {DictService} from '../../../../architecture/core/service/dict-service';

@Component({
  // moduleId: module.id,
  selector: 'ent-est-managePlatform',
  templateUrl: '../template/ent-est-managePlatform.component.html',
  styleUrls: ['../style/ent-est-managePlatform.less'],
  providers: [EntEstCreService]
}) 
export class EntEstManagePlatformComponent implements OnInit {
  @ViewChild("notice")
  notice: NoticeComponent;

  entId : string='';

  private statusDic:DicLoader = null;//状态字典
  private typeDic:DicLoader = null;//平台类型字典
  private platformLoader : ItemLoader<Platform> = null; //未选择可用平台 

  private selectedPlatformLoader : ItemLoader<Platform> = null; //已选择可用平台 

  private saveLoader : ItemLoader<Platform> = null; //保存

  itemIsSelected: boolean[] = [];
  
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi,
    private _dictServ:DictService
  ) {
     //字典配置
      this.statusDic = new DicLoader(restApiCfg, restApi, "SUBINSTANCE", "STATUS");
      this.statusDic.SourceName = "status";
      this.statusDic.TargetName = "statusName";
      this.typeDic = new DicLoader(restApiCfg, restApi, "PLATFORM", "TYPE");
      this.typeDic.SourceName = "type";
      this.typeDic.TargetName = "typeName";
    this.platformLoader = new ItemLoader<Platform>(false,'加载未选择可用平台列表错误','ent-mng.ent-est-mng.enterprise.platform',restApiCfg,restApi);
    this.selectedPlatformLoader = new ItemLoader<Platform>(false,'加载已选择可用平台列表错误','ent-mng.ent-est-mng.enterprise.platform.selected',restApiCfg,restApi);

    this.saveLoader = new ItemLoader<Platform>(false,'保存数据错误','ent-mng.ent-est-mng.enterprise.platform.save',restApiCfg,restApi);

    this.platformLoader.MapFunc = (source:Array<any>,target:Array<Platform>)=>{
      let obj = new Platform();
      for(let item of source){
        obj.id = item.id;
        obj.name = item.name;
        obj.type = item.platformType;
        obj.status = item.status;
        obj.isSelected = 0;
        target.push(obj);
      }
    }

    //处理数据字典
    // this.platformLoader.Trait = (target:Array<Platform>)=>{
      
    // }

    // this.platformLoader.FakeDataFunc = (target:Array<Platform>)=>{
    //   target.splice(0, target.length);

    //   let _platform = new Platform();
    //   _platform.name = '上海A平台';
    //   _platform.type = '777';
    //   _platform.status = '1';
    //   target.push(_platform);  

    //   let _platform2 = new Platform();
    //   _platform2.name = '上海B平台';
    //   _platform2.type = '666';
    //   _platform2.status = '1';
    //    target.push(_platform2); 

    //     let _platform3 = new Platform();
    //    _platform3.name = '上海C平台';
    //   _platform3.type = '888';
    //   _platform3.status = '0';
    //    target.push(_platform3); 
    // }

    this.selectedPlatformLoader.MapFunc = (source:Array<any>,target:Array<Platform>)=>{
      let obj = new Platform();

      for(let item of source){
        obj.id = item.id;
        obj.name = item.name;
        obj.type = item.platformType;
        obj.status = item.status;
        obj.isSelected = 1;
        target.push(obj);
      }
    }

    // this.selectedPlatformLoader.FakeDataFunc = (target:Array<Platform>)=>{

    //   target.splice(0, target.length);

    //   let _platform = new Platform();
    //   _platform.name = '上海B平台';
    //   _platform.type = '888';
    //   _platform.status = '1';
    //   target.push(_platform);  
    // }
  }

  ngOnInit() {

    this.entId = this.activatedRouter.snapshot.params["entId"] as string;
    this.statusDic.Go()
    .then(succuss=>{
      this.typeDic.Go();
    })
    this.searchSelectedPlatform(null);
    this.searchPlatform(null);
  }

 searchPlatform(page:number){
    this.layoutService.show();
   
    this.platformLoader.Go(page,[{key:'_enterpriseId',value:this.entId}])
    .then(success=>{
      this.statusDic.UpdateWithDic(success);
      this.typeDic.UpdateWithDic(success);
      this.layoutService.hide();
    }) 
    .catch(err=>{
      this.layoutService.hide();
    })
 }

 searchSelectedPlatform(page:number){
  this.layoutService.show();
   
    this.selectedPlatformLoader.Go(null,[{key:'_enterpriseId',value:this.entId}])
    .then(success=>{
      this.statusDic.UpdateWithDic(success);
      this.layoutService.hide();
    })
    .catch(err=>{
      this.layoutService.hide();
    })
 }

  selectItem(index:number){
    let items = this.platformLoader.Items;
    let items2 = this.selectedPlatformLoader.Items;
    // this.platformLoader.Items.map(n=>{n.isSelected = 0;});
    this.itemIsSelected[index] = !this.itemIsSelected[index];
    this.platformLoader.Items[index].isSelected = 1;
    console.log(this.itemIsSelected)
  }

//返回/取消
cancel(){
  this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
}

//保存
save(){
  let params:Array<string>= [];

  for(let item of this.platformLoader.Items){
    if(item.isSelected == 1){
      let index = this.platformLoader.Items.indexOf(item);
      this.platformLoader.Items.splice(index,1);  
      this.selectedPlatformLoader.Items.push(item);
    }
  }
  for(let item of this.selectedPlatformLoader.Items){
     let index = this.selectedPlatformLoader.Items.indexOf(item);
     params[index] = item.id; 
  }
  this.layoutService.show();
  this.saveLoader.Go(null,[{key:'_enterpriseId',value:this.entId}],params)
  .then(success=>{
    this.searchPlatform(null);
    this.searchSelectedPlatform(null);
    this.layoutService.hide();
  })
  .catch(err=>{
    this.showMsg(err);
    this.layoutService.hide();
  })

}

  showMsg(msg: string)
  {
    this.notice.open("COMMON.SYSTEM_PROMPT", msg);
  }
	// //翻译订单状态
	// updateStatusName(){
	// 	let list:Array<Platform> = []
	// 	list.map(n=>{
	// 		let item = this.statusDic.Items.find(m=>m.value == n.status);
	// 		if(item) n.statusName = item.displayValue as string;
	// 	});

	// }

}