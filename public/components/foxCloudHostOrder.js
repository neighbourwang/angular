import React from 'react'
import FoxCloudRadio from './foxCloudRadio'
import FoxCloudCounter from './foxCloudCounter'
import FoxCloudEstimation from './foxCloudEstimation'

const FoxCloudHostOrder = React.createClass({
  // 组件初期化，后台取得计算资源信息，然后整理成前台需要的格式
  getInitialState: function() {
	  var component = this;

	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var json_data = JSON.parse(xhr.responseText);
				var result_content = json_data.resultContent;

				var data_structure = component.data_structure;

				  for (var i = 0; i < result_content.length; i ++ )
				  {
					var content = result_content[i];

					switch (content.attrCode)
					{
						// 区域
						case 'REGION': 
							var value_list = content.valueList || [];

							for (var j = 0; j < value_list.length; j ++)
							{
								var value = value_list[j];
								data_structure.region_options.push({"value": value.code, "label": value.displayName});

								if (j == 0)
								{
									data_structure.region_value = value.code;
								}

								data_structure.region_mappings[value.code] = { "attr_value_id": value.id, "label": value.displayName, "price": 0 };
							}

							break;
						// 可用区
						case 'ZONE': 
							var value_list = content.valueList || [];

							for (var j = 0; j < value_list.length; j ++)
							{
								var value = value_list[j];
								data_structure.zone_options.push({"value": value.code, "label": value.displayName});

								if (j == 0)
								{
									data_structure.zone_value = value.code;
								}

								data_structure.zone_mappings[value.code] = { "attr_value_id": value.id, "label": value.displayName, "price": 0 };
							}

							break;
						// CPU
						case 'CPU': 
							var value_list = content.valueList || [];

							for (var j = 0; j < value_list.length; j ++)
							{
								var value = value_list[j];
								data_structure.cpu_options.push({"value": value.code, "label": value.displayName});

								if (j == 0)
								{
									data_structure.cpu_value = value.code;
								}

								data_structure.cpu_mappings[value.code] = { "attr_value_id": value.id, "label": value.displayName, "price": 0 };
							}

							break;
						// 内存
						case 'MEM': 
							var map_value_list = content.mapValueList || {};
							
							var counter = 0;

							for (var key in map_value_list)
							{
								var map_value = map_value_list[key];

								var map_value_options = [];

								data_structure.mem_mappings[key] = {};

								for (var j = 0; j < map_value.length; j ++)
								{
									var value = map_value[j];

									map_value_options.push({"value": value.code, "label": value.displayName});

									data_structure.mem_mappings[key][value.code] = { "attr_value_id": value.id, "label": value.displayName, "price": 0 };
								}

								data_structure.mem_map_value_list[key] = map_value_options;

								if (counter == 0)
								{
									for (var j = 0; j < map_value_options.length; j ++)
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
							var value_list = content.valueList || [];

							for (var j = 0; j < value_list.length; j ++)
							{
								var value = value_list[j];
								data_structure.imagetype_options.push({"value": value.code, "label": value.displayName, "price": 0});

								if (j == 0)
								{
									data_structure.imagetype_value = value.code;
								}

								data_structure.imagetype_mappings[value.code] = { "attr_value_id": value.id, "label": value.displayName, "price": 0 };
							}

							break;
						// 操作系统类型
						case 'OSTYPE': 
							var value_list = content.valueList || [];

							for (var j = 0; j < value_list.length; j ++)
							{
								var value = value_list[j];
								data_structure.ostype_options.push({"value": value.code, "label": value.displayName, "price": 0});

								if (j == 0)
								{
									data_structure.ostype_value = value.code;
								}

								data_structure.ostype_mappings[value.code] = { "attr_value_id": value.id, "label": value.displayName, "price": 0 };
							}

							break;
						// 操作系统版本
						case 'OSVERSION': 
							var map_value_list = content.mapValueList || {};

							var counter = 0;

							for (var key in map_value_list)
							{
								var map_value = map_value_list[key];

								var map_value_options = [];

								data_structure.osversion_mappings[key] = {};

								for (var j = 0; j < map_value.length; j ++)
								{
									var value = map_value[j];

									map_value_options.push({"value": value.code, "label": value.displayName});

									data_structure.osversion_mappings[key][value.code] = { "attr_value_id": value.id, "label": value.displayName, "price": 0 };
								}

								data_structure.osversion_map_value_list[key] = map_value_options;

								if (counter == 0)
								{
									for (var j = 0; j < map_value_options.length; j ++)
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
							var value_list = content.valueList || [];

							for (var j = 0; j < value_list.length; j ++)
							{
								var value = value_list[j];
								data_structure.storage_options.push({"value": value.code, "label": value.displayName, "price": 0});

								if (j == 0)
								{
									data_structure.storage_value = value.code;
								}

								data_structure.storage_mappings[value.code] = { "attr_value_id": value.id, "label": value.displayName, "price": 0 };
							}

							break;
						// 购买时长
						case 'TIMELINE': 
							var value_list = content.valueList || [];

							for (var j = 0; j < value_list.length; j ++)
							{
								var value = value_list[j];
								data_structure.timeline_options.push({"value": value.code, "label": value.displayName, "price": 0});

								if (j == 0)
								{
									data_structure.timeline_value = value.code;
								}

								data_structure.timeline_mappings[value.code] = { "attr_value_id": value.id, "label": value.displayName, "price": 0 };
							}

							break;
						default:
							break;
					}
				  }
				}
				} 
			}
		// 注意，这里不能使用异步
		xhr.open("GET", this.props.url, false);
		xhr.send();
	return null;
  },
  // 前台计算使用的数据格式，详细信息请参照组件初期化 数据整理步骤
  data_structure: {
		region_options: [],
		region_value: null,
		region_mappings: {},

		zone_options: [],
		zone_value: null,
		zone_mappings: {},

		cpu_options: [],
		cpu_value: null,
		cpu_mappings: {},

		mem_map_value_list: {},
		mem_options: [],
		mem_value: null,
		mem_mappings: {},

		imagetype_options: [],
		imagetype_value: null,
		imagetype_mappings: {},

		ostype_options: [],
		ostype_value: null,
		ostype_mappings: {},

		osversion_map_value_list: {},
		osversion_options: [],
		osversion_value: null,
		osversion_mappings: {},

		storage_options: [],
		storage_value: null,
		storage_mappings: {},

		timeline_options: [],
		timeline_value: null,
		timeline_mappings: {}
	},
  // 该组建所参照的所有子组件的引用
  component_cache: {
	"region": null,
	"zone": null,
	"cpu": null,
	"mem": null,
	"imagetype": null,
	"ostype": null,
	"osversion": null,
	"storage": null,
	"timeline": null,
	"hostcount": null,
	"estimation": null,
  },
  // 该组建所参照的所有子组件调用此方法将自身注册到本组件中
  state_bridge: function(name, component) {
		this.component_cache[name] = component;
  },
  // 画面上<CPU/系统类型>以外的选项切换时处理，主要目的是重新计算预购价
  handlerRadioChange: function(name, value) {
	  estimation();
  },
  // CPU切换时，内存自动切换
  handlerCpuChange: function(name, value) {
	  var mem_map_value_list = this.data_structure.mem_map_value_list;

	  var attr_value_id = this.data_structure.cpu_mappings[value].attr_value_id;

	  var mem_options = mem_map_value_list[attr_value_id];
	  
	  this.component_cache.mem.setState({value: mem_options[0].value, options: mem_options});

	estimation();
  },
  // 系统类型切换时，系统版本自动切换
  handlerOsTypeChange: function(name, value) {
    var osversion_map_value_list = this.data_structure.osversion_map_value_list;

    var attr_value_id = this.data_structure.ostype_mappings[value].attr_value_id;

    var osversion_options = osversion_map_value_list[attr_value_id];

    this.component_cache.osversion.setState({value: osversion_options[0].value, options: osversion_options});

    estimation();
  },
  // 重置处理，全部计算资源选项使用默认值
  handleResetButtonClick: function() {
	if (this.existItemInArray(this.data_structure.region_options))
	{
		this.component_cache.region.setState({value: this.data_structure.region_options[0].value});
	}

	if (this.existItemInArray(this.data_structure.zone_options))
	{
		this.component_cache.zone.setState({value: this.data_structure.zone_options[0].value});
	}

	if (this.existItemInArray(this.data_structure.cpu_options))
	{
		var cpu_value = this.data_structure.cpu_options[0].value;

		this.component_cache.cpu.setState({value: cpu_value});

		var mem_map_value_list = this.data_structure.mem_map_value_list;
		var attr_value_id = this.data_structure.cpu_mappings[cpu_value].attr_value_id;
		var mem_options = mem_map_value_list[attr_value_id];
		if (this.existItemInArray(mem_options))
		{
			this.component_cache.mem.setState({value: mem_options[0].value, options: mem_options});
		}
	}

	if (this.existItemInArray(this.data_structure.imagetype_options))
	{
		this.component_cache.imagetype.setState({value: this.data_structure.imagetype_options[0].value});
	}

	if (this.existItemInArray(this.data_structure.ostype_options))
	{
		var ostype_value = this.data_structure.ostype_options[0].value;
		this.component_cache.ostype.setState({value: ostype_value});

		var osversion_map_value_list = this.data_structure.osversion_map_value_list;
		var attr_value_id = this.data_structure.ostype_mappings[ostype_value].attr_value_id;
		var osversion_options = osversion_map_value_list[attr_value_id];
		if (this.existItemInArray(osversion_options))
		{
			this.component_cache.osversion.setState({value: osversion_options[0].value, options: osversion_options});
		}
	}

	if (this.existItemInArray(this.data_structure.storage_options))
	{
		this.component_cache.storage.setState({value: this.data_structure.storage_options[0].value});
	}

	if (this.existItemInArray(this.data_structure.timeline_options))
	{
		this.component_cache.timeline.setState({value: this.data_structure.timeline_options[0].value});
	}


	this.component_cache.hostcount.setState({value: 0});
	this.component_cache.estimation.setState({value: "1"});
	

	estimation();
  },
  // 加入购物车处理，提示用户选择的计算资源，然后提交至后台
  handleCartButtonClick: function() {
	if (parseInt(this.component_cache.estimation.state.value, 10) == 0)
	{
		alert("请正确选择配置");
		return;
	}

	var result = ["<请确认您选择的以下配置>"];

	var region_code= this.component_cache.region.state.value;
	var region_mapping = this.data_structure.region_mappings[region_code];
	result.push("地域 ： " + region_mapping.label);

	var zone_code= this.component_cache.zone.state.value;
	var zone_mapping = this.data_structure.zone_mappings[zone_code];
	result.push("可用区 ： " + zone_mapping.label);

	var cpu_code = this.component_cache.cpu.state.value;
	var cpu_mapping = this.data_structure.cpu_mappings[cpu_code];
	result.push("CPU ： " + cpu_mapping.label);
	var attr_value_id = this.data_structure.cpu_mappings[cpu_code].attr_value_id;
	var mem_code = this.component_cache.mem.state.value;
	var mem_mapping = this.data_structure.mem_mappings[attr_value_id][mem_code];
	result.push("内存 ： " + mem_mapping.label);

	var imagetype_code = this.component_cache.imagetype.state.value;
	var imagetype_mapping = this.data_structure.imagetype_mappings[imagetype_code];
	result.push("镜像类型 ： " + imagetype_mapping.label);

	var ostype_code = this.component_cache.ostype.state.value;
	var ostype_mapping = this.data_structure.ostype_mappings[ostype_code];
	result.push("系统类型 ： " + ostype_mapping.label);
	var attr_value_id = this.data_structure.ostype_mappings[ostype_code].attr_value_id;
	var osversion_code = this.component_cache.osversion.state.value;
	var osversion_mapping = this.data_structure.osversion_mappings[attr_value_id][osversion_code];
	result.push("系统版本 ： " + osversion_mapping.label);

	var storage_code = this.component_cache.storage.state.value;
	var storage_mapping = this.data_structure.storage_mappings[storage_code];
	result.push("数据盘 ： " + storage_mapping.label);

	var timeline_code = this.component_cache.timeline.state.value;
	var timeline_mapping = this.data_structure.timeline_mappings[timeline_code];
	result.push("购买时长 ： " + timeline_mapping.label);

	result.push("购买数量 ： " + this.component_cache.hostcount.state.value + "台");
	result.push("预购价 ： ￥" + this.component_cache.estimation.state.value);

	var dash_borad = result.join("\r\n");

	if (confirm(dash_borad))
	{
		alert("将为您提交该配置申请，请敬请稍候！");

		var payload = {};

		payload.serviceId = "1";
		payload.serviceCode = "VM";
		payload.serviceName = "云主机";
		payload.totalPrice = parseInt(this.component_cache.estimation.state.value, 10);

		payload.attrList = [];

		var region = {"attrId": 1, "attrCode": "REGION", "attrName": "区域", "attrValueId": region_mapping.attr_value_id, "attrValue": region_code, "description": region_mapping.label};
		payload.attrList.push(region);

		var zone = {"attrId": 12, "attrCode": "ZONE", "attrName": "可用区", "attrValueId": zone_mapping.attr_value_id, "attrValue": zone_code, "description": zone_mapping.label};
		payload.attrList.push(zone);

		var cpu = {"attrId": 2, "attrCode": "CPU", "attrName": "CPU", "attrValueId": cpu_mapping.attr_value_id, "attrValue": cpu_code, "description": cpu_mapping.label};
		payload.attrList.push(cpu);

		var mem = {"attrId": 3, "attrCode": "MEM", "attrName": "内存", "attrValueId": mem_mapping.attr_value_id, "attrValue": mem_code, "description": mem_mapping.label};
		payload.attrList.push(mem);

		var imagetype = {"attrId": 7, "attrCode": "IMAGETYPE", "attrName": "镜像类型", "attrValueId": imagetype_mapping.attr_value_id, "attrValue": imagetype_code, "description": imagetype_mapping.label};
		payload.attrList.push(imagetype);

		var ostype = {"attrId": 5, "attrCode": "OSTYPE", "attrName": "操作系统类型", "attrValueId":ostype_mapping.attr_value_id, "attrValue": ostype_code, "description": ostype_mapping.label};
		payload.attrList.push(ostype);

		var osversion = {"attrId": 15, "attrCode": "OSVERSION", "attrName": "操作系统版本", "attrValueId": osversion_mapping.attr_value_id, "attrValue": osversion_code, "description": osversion_mapping.label};
		payload.attrList.push(osversion);

		var storage = {"attrId": 11, "attrCode": "STORAGE", "attrName": "数据盘", "attrValueId": storage_mapping.attr_value_id, "attrValue": storage_code, "description": storage_mapping.label};
		payload.attrList.push(storage);

		var timeline = {"attrId": 10, "attrCode": "TIMELINE", "attrName": "购买时长", "attrValueId": timeline_mapping.attr_value_id, "attrValue": timeline_code, "description": timeline_mapping.label};
		payload.attrList.push(timeline);

		alert(JSON.stringify(payload));
	}
  },
  // 画面表示的预购价计算，此处为假计算，请用实际计算逻辑替换
  estimation: function() {
	  var estimation = 10000 * Math.random() * this.component_cache.hostcount.state.value;
	  this.component_cache.estimation.setState({value: Math.round(estimation)});
  },
  // 判断数组是否有元素
  existItemInArray: function(e) {
	  return e.length > 0;
  },
  // 组件运行
  render: function() {
    return (
      <div className="fc-container">
          <div className="fc-header">
              <span className="fc-title fc-icon-instance">订购</span>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">
                订购 ： 
              </div>
              <div className="fc-row-content">
                <label className="fc-label">云主机</label>
              </div>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">
                地域 ：
              </div>
              <div className="fc-row-content">
				<FoxCloudRadio name="region" value={this.data_structure.region_value} state_bridge={this.state_bridge} options={this.data_structure.region_options} callback={this.estimation} />
			  </div>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">
                可用区 ：
              </div>
              <div className="fc-row-content">
				<FoxCloudRadio name="zone" value={this.data_structure.zone_value} state_bridge={this.state_bridge} options={this.data_structure.zone_options} callback={this.estimation} />
			  </div>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">网络类型 ： </div>
              <div className="">
                <label className="fc-label">经典网络</label>
              </div>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">CPU ： </div>
              <div className="fc-row-content">
				<FoxCloudRadio name="cpu" value={this.data_structure.cpu_value} state_bridge={this.state_bridge} options={this.data_structure.cpu_options} callback={this.handlerCpuChange} />
			  </div>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">内存 ： </div>
              <div className="fc-row-content">
				<FoxCloudRadio name="mem" value={this.data_structure.mem_value} state_bridge={this.state_bridge} options={this.data_structure.mem_options} callback={this.estimation} />
			  </div>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">镜像类型 ： </div>
              <div className="fc-row-content">
                <FoxCloudRadio name="imagetype" value={this.data_structure.imagetype_value} state_bridge={this.state_bridge} options={this.data_structure.imagetype_options} callback={this.estimation} />
              </div>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">系统类型 ： </div>
              <div className="fc-row-content">
				<FoxCloudRadio name="ostype" value={this.data_structure.ostype_value} state_bridge={this.state_bridge} options={this.data_structure.ostype_options} callback={this.handlerOsTypeChange} />
			  </div>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">选择版本 ： </div>
              <div className="fc-row-content">
				<FoxCloudRadio name="osversion" value={this.data_structure.osversion_value} state_bridge={this.state_bridge} options={this.data_structure.osversion_options} callback={this.estimation} />
			  </div>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">数据盘 ： </div>
              <div className="fc-row-content">
				<FoxCloudRadio name="storage" value={this.data_structure.storage_value} state_bridge={this.state_bridge} options={this.data_structure.storage_options} callback={this.estimation} />
			  </div>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">购买时长 ： </div>
              <div className="fc-row-content">
				<FoxCloudRadio name="timeline" value={this.data_structure.timeline_value} state_bridge={this.state_bridge} options={this.data_structure.timeline_options} callback={this.estimation} />
			  </div>
          </div>

          <div className="fc-row">
              <div className="fc-row-title">购买数量 ： </div>
              <div className="fc-row-content">
				<FoxCloudCounter name="hostcount" value="0" state_bridge={this.state_bridge} callback={this.estimation} />
			  </div>
          </div>

          <div className="fc-estimation">
			 <FoxCloudEstimation name="estimation" value="0" state_bridge={this.state_bridge} reset_evebt={this.handleResetButtonClick} cart_event={this.handleCartButtonClick} />
		  </div>

            <div className="fc-cart-price">
                <div className="cart">
                    <div className="fc-icon-cart"></div>
                    <div className="title">购物车</div>
                </div>
                <div className="price">
                    <div className="fc-icon-price"></div>
                    <div className="title">价格表</div>
                </div>
            </div>
    </div>
    );
  }
});

export default FoxCloudHostOrder;