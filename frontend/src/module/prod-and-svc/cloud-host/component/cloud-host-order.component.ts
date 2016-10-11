import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Services } from '../model/service';
import { Order } from '../model/order';
import { Payload } from '../model/payload';
import { OrderService } from '../service/cloud-host-order.service';
import { LayoutService } from '../../../../architecture';


@Component({
  // moduleId: module.id,
  selector: 'fc-cloud-host-order',
  templateUrl: '../template/cloud-host-order.component.html',
  styleUrls: [
    '../style/cloud-host-order.component.css'
  ],
  providers: [

  ]
})
export class HostOrderComponent implements OnInit {

  services: Services;
  order: Order;
  storageId: string;
  timelineId: string;
  totalPrice: number = 4350;

  payload: Payload;

  constructor(
    private orderService: OrderService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.services = new Services();
    this.order = new Order();
    this.layoutService.setLoading(false);

    this.getServices();
  }

  getServices() {
      this.layoutService.setLoading(true);

      this.orderService
          .getServices()
          .then(ret => {
              if (!ret) {
                  this.showError('', '可订购列表数据获取失败。');
              } else {
                this.services = this.fmtServicesData(ret);
                this.fmtDefaultOrder();
              }
              this.layoutService.setLoading(false);
          })
          .catch(error => {
              this.showError('', '可订购列表数据获取失败。');
              this.layoutService.setLoading(false);
          });
  }

  fmtServicesData(ret: any): Services {
    let data_structure = new Services();
    let result_content;

    if (ret && ret.resultContent) {
      result_content = ret.resultContent;
    }

    for (let i = 0; i < result_content.length; i ++ )
    {
      let content = result_content[i];
      let value_list = content.valueList || [];
      let map_value_list = content.mapValueList || {};
      let counter;

      switch (content.attrCode)
        {
          // 区域
          case 'REGION': 
    
            data_structure.region_org_data = content;
            for (let j = 0; j < value_list.length; j ++)
            {
              let value = value_list[j];
              data_structure.region_options.push({"id": value.id, "code": value.code, "value": value.value, "label": value.displayName});
    
              if (j == 0)
              {
                data_structure.region_value = value.code;
              }
    
              data_structure.region_mappings[value.code] = { "attr_value_id": value.id, "value": value.value, "label": value.displayName, "price": 0 };
            }
    
            break;
          // 可用区
          case 'ZONE': 
            
            data_structure.zone_org_data = content;
            for (let j = 0; j < value_list.length; j ++)
            {
              let value = value_list[j];
              data_structure.zone_options.push({"id": value.id, "code": value.code, "value": value.value, "label": value.displayName});
    
              if (j == 0)
              {
                data_structure.zone_value = value.code;
              }
    
              data_structure.zone_mappings[value.code] = { "attr_value_id": value.id, "value": value.value, "label": value.displayName, "price": 0 };
            }
    
            break;
          // CPU
          case 'CPU': 
            
            data_structure.cpu_org_data = content;
            for (let j = 0; j < value_list.length; j ++)
            {
              let value = value_list[j];
              data_structure.cpu_options.push({"id": value.id, "code": value.code, "value": value.value, "label": value.displayName});
    
              if (j == 0)
              {
                data_structure.cpu_value = value.code;
              }
    
              data_structure.cpu_mappings[value.code] = { "attr_value_id": value.id, "value": value.value, "label": value.displayName, "price": 0 };
            }
    
            break;
          // 内存
          case 'MEM': 
            
            
            counter = 0;
            
            data_structure.mem_org_data = content;
            for (let key in map_value_list)
            {
              let map_value = map_value_list[key];
    
              let map_value_options = [];
    
              data_structure.mem_mappings[key] = {};
    
              for (let j = 0; j < map_value.length; j ++)
              {
                let value = map_value[j];
    
                map_value_options.push({"id": value.id, "code": value.code, "value": value.value, "label": value.displayName});
    
                data_structure.mem_mappings[key][value.code] = { "attr_value_id": value.id, "value": value.value, "label": value.displayName, "price": 0 };
              }
    
              data_structure.mem_map_value_list[key] = map_value_options;
    
              if (counter == 0)
              {
                for (let j = 0; j < map_value_options.length; j ++)
                {
                  data_structure.mem_options.push(map_value_options[j]);
    
                  if (j == 0)
                  {
                    data_structure.mem_value = map_value_options[j].value;
                  }
                }
              }
    
              counter ++;
            }
    
            break;
          // 镜像类型
          case 'IMAGETYPE': 
            
            data_structure.imagetype_org_data = content;
            for (let j = 0; j < value_list.length; j ++)
            {
              let value = value_list[j];
              data_structure.imagetype_options.push({"id": value.id, "code": value.code, "value": value.value, "label": value.displayName, "price": 0});
    
              if (j == 0)
              {
                data_structure.imagetype_value = value.code;
              }
    
              data_structure.imagetype_mappings[value.code] = { "attr_value_id": value.id, "value": value.value, "label": value.displayName, "price": 0 };
            }
    
            break;
          // 操作系统类型
          case 'OSTYPE': 
            
            data_structure.ostype_org_data = content;
            for (let j = 0; j < value_list.length; j ++)
            {
              let value = value_list[j];
              data_structure.ostype_options.push({"id": value.id, "code": value.code, "value": value.value, "label": value.displayName, "price": 0});
    
              if (j == 0)
              {
                data_structure.ostype_value = value.code;
              }
    
              data_structure.ostype_mappings[value.code] = { "attr_value_id": value.id, "value": value.value, "label": value.displayName, "price": 0 };
            }
    
            break;
          // 操作系统版本
          case 'OSVERSION': 
            
    
            counter = 0;
            
            data_structure.osversion_org_data = content;
            for (let key in map_value_list)
            {
              let map_value = map_value_list[key];
    
              let map_value_options = [];
    
              data_structure.osversion_mappings[key] = {};
    
              for (let j = 0; j < map_value.length; j ++)
              {
                let value = map_value[j];
    
                map_value_options.push({"id": value.id, "code": value.code, "value": value.value, "label": value.displayName});
    
                data_structure.osversion_mappings[key][value.code] = { "attr_value_id": value.id, "value": value.value, "label": value.displayName, "price": 0 };
              }
    
              data_structure.osversion_map_value_list[key] = map_value_options;
    
              if (counter == 0)
              {
                for (let j = 0; j < map_value_options.length; j ++)
                {
                  data_structure.osversion_options.push(map_value_options[j]);
    
                  if (j == 0)
                  {
                    data_structure.osversion_value = map_value_options[j].value;
                  }
                }
              }
    
              counter ++;
            }
    
            break;
          // 数据盘
          case 'STORAGE': 
            
            
            data_structure.storage_org_data = content;
            for (let j = 0; j < value_list.length; j ++)
            {
              let value = value_list[j];
              data_structure.storage_options.push({"id": value.id, "code": value.code, "value": value.value, "label": value.displayName, "price": 0});
    
              if (j == 0)
              {
                data_structure.storage_value = value.code;
              }
    
              data_structure.storage_mappings[value.code] = { "attr_value_id": value.id, "value": value.value, "label": value.displayName, "price": 0 };
            }
    
            break;
          // 购买时长
          case 'TIMELINE': 
            
            
            data_structure.timeline_org_data = content;
            for (let j = 0; j < value_list.length; j ++)
            {
              let value = value_list[j];
              data_structure.timeline_options.push({"id": value.id, "code": value.code, "value": value.value, "label": value.displayName, "price": 0});
    
              if (j == 0)
              {
                data_structure.timeline_value = value.code;
              }
    
              data_structure.timeline_mappings[value.code] = { "attr_value_id": value.id, "value": value.value, "label": value.displayName, "price": 0 };
            }
    
            break;
          default:
            break;
        }
    }

    return data_structure;
  }

  fmtDefaultOrder() {
    this.order = new Order();

    this.order.region = this.services.region_options[0];
    this.order.zone = this.services.zone_options[0];
    this.order.cpu = this.services.cpu_options[0];
    this.services.mem_options_disp = this.getMemList(this.order.cpu.id);
    this.order.imagetype = this.services.imagetype_options[0]
    this.order.mem = this.services.mem_options_disp[0]
    this.order.ostype = this.services.ostype_options[0];
    this.services.osversion_options_disp = this.getOsVerList(this.order.ostype.id);
    this.order.osversion = this.services.osversion_options_disp[0];
    this.order.storage = this.services.storage_options[0];
    this.order.timeline = this.services.timeline_options[0];
    this.order.count = 1;
    this.order.totalPrice = 4350;

    this.storageId = this.order.storage.id;
    this.timelineId = this.order.timeline.id;
  }

  getMemList(key: string) {
    let memOps = [];
    memOps = this.services.mem_map_value_list[key]; 

    return memOps;
  }

  getOsVerList(key: string) {
    let osVerOps = [];
    osVerOps = this.services.osversion_map_value_list[key]; 

    return osVerOps;
  }

  purching_adjust(num: number) {
    this.order.count += num;
    if (this.order.count <= 1) {
      this.order.count = 1;
    } else if (this.order.count >= 99) {
      this.order.count = 99;
    }

    this.order.totalPrice = 4350 * this.order.count;
  }

  changeOpt(type: string, item: any) {
    switch (type) {
        // region
        case 'region': 
          this.order.region = item;
        break;

        // zone
        case 'zone': 
          this.order.zone = item;
        break;

        // cpu
        case 'cpu': 
          this.order.cpu = item;
          this.services.mem_options_disp = this.getMemList(this.order.cpu.id);
          this.order.mem = this.services.mem_options_disp[0]
        break;

        // mem
        case 'mem': 
          this.order.mem = item;
        break;

        // imagetype
        case 'imagetype': 
          this.order.imagetype = item;
        break;

        // ostype
        case 'ostype': 
          this.order.ostype = item;
          this.services.osversion_options_disp = this.getOsVerList(this.order.ostype.id);
          this.order.osversion = this.services.osversion_options_disp[0];
        break;

        // osversion
        case 'osversion': 
          this.order.osversion = item;
        break;

        // storage
        case 'storage': 
          // this.order.storage = this.services.storage_mappings[this.storageId];
          this.services.storage_options.forEach(element => {
            if (element.id == this.storageId) {
              this.order.storage = element;
            }
          });
        break;

        // timeline
        case 'timeline': 
          // this.order.timeline = this.services.timeline_mappings[this.timelineId];
          this.services.timeline_options.forEach(element => {
            if (element.id == this.timelineId) {
              this.order.timeline = element;
            }
          });
        break;
    
      default:
        break;
    }
  }

  reset() {
    this.fmtDefaultOrder();
  }

  save() {
    this.fmtOrderData();

    this.layoutService.setLoading(true);
    this.orderService
        .saveOrder(this.payload)
        .then(ret => {
            if (!ret) {
                this.showError('', '配置申请提交失败，请重新尝试或者联络管理员。');
            } else {
              this.fmtDefaultOrder();
              this.showError('', '配置申请提交成功，请等待。');
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showError('', '配置申请提交失败，请重新尝试或者联络管理员。');
            this.layoutService.setLoading(false);
        });
  }

  fmtOrderData() {

    this.payload = new Payload();

    this.payload.serviceId = '1';
    this.payload.quality = this.order.count;
    this.payload.totalPrice = this.order.totalPrice;
    this.payload.serviceCode = 'VM';
    this.payload.serviceName = "云主机";

    // region
    let region = {
      "attrId": (this.services.region_org_data as any).attrId, 
      "attrCode": (this.services.region_org_data as any).attrCode, 
      "attrName": (this.services.region_org_data as any).attrDisplayName, 
      "attrValueId": (this.order.region as any).id,
      "attrValue": (this.order.region as any).value, 
      "description": (this.order.region as any).label
    };

    let zone = {
      "attrId": (this.services.zone_org_data as any).attrId,
      "attrCode": (this.services.zone_org_data as any).attrCode, 
      "attrName": (this.services.zone_org_data as any).attrDisplayName, 
      "attrValueId": (this.order.zone as any).id,
      "attrValue": (this.order.zone as any).value, 
      "description": (this.order.zone as any).label
    };

    let cpu = {
      "attrId": (this.services.cpu_org_data as any).attrId,
      "attrCode": (this.services.cpu_org_data as any).attrCode, 
      "attrName": (this.services.cpu_org_data as any).attrDisplayName, 
      "attrValueId": (this.order.cpu as any).id,
      "attrValue": (this.order.cpu as any).value, 
      "description": (this.order.cpu as any).label
    };

    let mem = {
      "attrId": (this.services.mem_org_data as any).attrId, 
      "attrCode": (this.services.mem_org_data as any).attrCode, 
      "attrName": (this.services.mem_org_data as any).attrDisplayName, 
      "attrValueId": (this.order.mem as any).id,
      "attrValue": (this.order.mem as any).value, 
      "description": (this.order.mem as any).label
    };

    let imagetype = {
      "attrId": (this.services.imagetype_org_data as any).attrId, 
      "attrCode": (this.services.imagetype_org_data as any).attrCode, 
      "attrName": (this.services.imagetype_org_data as any).attrDisplayName, 
      "attrValueId": (this.order.imagetype as any).id,
      "attrValue": (this.order.imagetype as any).value, 
      "description": (this.order.imagetype as any).label
    };

    let ostype = {
      "attrId": (this.services.ostype_org_data as any).attrId, 
      "attrCode": (this.services.ostype_org_data as any).attrCode, 
      "attrName": (this.services.ostype_org_data as any).attrDisplayName, 
      "attrValueId": (this.order.ostype as any).id,
      "attrValue": (this.order.ostype as any).value, 
      "description": (this.order.ostype as any).label
    };

    let osversion = {
      "attrId": (this.services.osversion_org_data as any).attrId, 
      "attrCode": (this.services.osversion_org_data as any).attrCode, 
      "attrName": (this.services.osversion_org_data as any).attrDisplayName, 
      "attrValueId": (this.order.osversion as any).id,
      "attrValue": (this.order.osversion as any).value, 
      "description": (this.order.osversion as any).label
    };

    let storage = {
      "attrId": (this.services.storage_org_data as any).attrId, 
      "attrCode": (this.services.storage_org_data as any).attrCode, 
      "attrName": (this.services.storage_org_data as any).attrDisplayName, 
      "attrValueId": (this.order.storage as any).id,
      "attrValue": (this.order.storage as any).value, 
      "description": (this.order.storage as any).label
    };

    let timeline = {
      "attrId": (this.services.timeline_org_data as any).attrId, 
      "attrCode": (this.services.timeline_org_data as any).attrCode, 
      "attrName": (this.services.timeline_org_data as any).attrDisplayName, 
      "attrValueId": (this.order.timeline as any).id,
      "attrValue": (this.order.timeline as any).value, 
      "description": (this.order.timeline as any).label
    };

    this.payload.attrList.push(region);
    this.payload.attrList.push(zone);
    this.payload.attrList.push(cpu);
    this.payload.attrList.push(mem);
    this.payload.attrList.push(imagetype);
    this.payload.attrList.push(ostype);
    this.payload.attrList.push(osversion);
    this.payload.attrList.push(storage);
    this.payload.attrList.push(timeline);
  }

  showError(title: string, msg: string) {
    alert(msg);
  }
}
