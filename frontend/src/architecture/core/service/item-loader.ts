import { Injectable } from '@angular/core';
import { RestApiCfg, RestApi, RestApiModel } from './../../../architecture';

@Injectable()
export class ItemLoader<T>{
	private _name:string = "";//对象名称
	PageSize:number = 10;//每一页的数量
	private _items:Array<T> = [];
	TotalPages: number = 1;
	QureryParams:Array<any> = null;//query parameter
	PostParam:any = null;//传入PostParameter
	FakeDataFunc:(target:Array<T>)=>void;//传入假数据
	MapFunc:(source:Array<T>, target:Array<T>)=>void;//对服务器上的数据进行转换
	Trait:(target:Array<T>)=>void;//对组装好的数据进行处理
	private _pageName:string = "_page";
	private _sizeName:string = "_size";
	private _hasPaging:boolean = false;

	constructor(hasPaging:boolean
				,name:string
				,private _apiId:string
				,private restApiCfg:RestApiCfg
				,private restApi:RestApi)
	{
		this._hasPaging = hasPaging;
		this._name = name;
	}
	get Items():Array<T>{

		return this._items;
	}

	get FirstItem():T{
		return this._items[0];
	}

	loadArray<T>(source:any, target: T[])
	{
		if(target && source)
		{
			target.splice(0, target.length);

			if(typeof source === 'object' && typeof source.length === 'number')
			{
				for(let item of source)
				{
					target.push(item);
				}
			}
			else
			{
				target.push(source);
			}
		}
	}

	Go(pageNumber?:number, queryParams?:Array<any>, postParam?:any):Promise<any>{
		return new Promise((resolve, reject)=>{
			if(this.FakeDataFunc)
			{
				this.FakeDataFunc(this._items);
				resolve('FakeDataFunc');
				return;
			}


			this.setPageNumber(pageNumber);
			this.setQueryParams(queryParams);
			this.PostParam = postParam;

			let apiModel = this.restApiCfg.getRestApi(this._apiId);

			this.restApi.request(apiModel.method, apiModel.url, this.QureryParams, undefined, this.PostParam)
			.then(ret=>{
				if(!ret)
				{
					reject("数据获取失败");
				}
				else{
					if(ret.resultContent)
					{
						this._items.splice(0, this._items.length);//清空数据
						//设置数据
						if(this.MapFunc)
						{
							if( (typeof ret.resultContent === 'object') && (typeof ret.resultContent.length === 'number'))
							{
								this.MapFunc(ret.resultContent, this._items);
							}
							else if(typeof ret.resultContent === 'object')
							{
								this.MapFunc([ret.resultContent], this._items);
							}
						}
						else
						{
							this.loadArray(ret.resultContent, this._items);
						}

						if(this.Trait)
						{
							this.Trait(this._items);
						}

						console.log(`${this._name}:分页信息`, ret.pageInfo);

						if(ret.pageInfo)
						{
							this.TotalPages = ret.pageInfo.totalPage || 100;
						}
						else
						{
							this.TotalPages = 1;
						}

						resolve(this._items);
					}
					else
					{
						resolve(null);
					}
				}
			})
			.catch(err=>{

				console.log(`${this._name}加载错误:${this.restApiCfg.getRestApi(this._apiId).url}`, err);
				reject(`${this._name}数据加载错误`);
			});


		});
	}

	setQueryParams(queryParams: Array<any>):void
	{
		let self = this;
		let update:(obj:any)=>boolean=function(obj:any){
			let target:any = self.QureryParams.find(n=>n.key === obj.key);

			if(target)
			{
				target.value = obj.value;
				return true;
			}
			else{
				return false;
			}
		};

		if(queryParams)
		{
			this.QureryParams = this.QureryParams || [];
			if(typeof queryParams === 'object' && typeof queryParams.length === 'number')
			{
				for(let i = 0; i < queryParams.length; i++)
				{
					if(!update(queryParams[i]))
					{
						this.QureryParams.push(queryParams[i]);
					}
				}
			}
			else if(typeof queryParams === 'object')
			{
				update(queryParams);
			}
		}
	}

	setPageNumber(pageNumber:number):void
	{

		let localPageNumber: number = pageNumber;
		if(this._hasPaging)
		{
			localPageNumber = localPageNumber || 1;
		}
		if(localPageNumber)
		{
			if(localPageNumber > this.TotalPages)
			{
				localPageNumber = this.TotalPages;
			}
			this.QureryParams = this.QureryParams || [];
			
			//设置当前页
			let page = this.QureryParams.find(n=>n.key === this._pageName);
			if(page)
			{
				page.value = localPageNumber;
			}
			else{
				this.QureryParams.push({
					key:this._pageName
					,value:pageNumber
				});
			}

			//设置pageSize
			let pageSize = this.QureryParams.find(n=>n.key === this._sizeName);
			if(pageSize)
			{
				pageSize.value = this.PageSize;
			}
			else
			{
				this.QureryParams.push({
					key:this._sizeName
					,value:this.PageSize
				});
			}
			
		}
	}
}
