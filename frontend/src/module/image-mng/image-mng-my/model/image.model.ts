export class Image{
                // <th class="text-center">镜像名称</th>
                // <th class="text-center">镜像类型</th>
                // <th class="text-center">操作系统</th>
                // <th class="text-center">系统位数</th>
                // <th class="text-center">创建时间</th>
                // <th class="text-center">状态</th>
                // <th class="text-center">进度</th>
                // <th class="text-center">所在区域</th>
                // <th class="text-center">描述</th>

                // <td class="text-center active"><u>MyCentOS-VM-001</u></td>
                // <td class="text-center">自定义镜像</td>
                // <td class="text-center">Windows 2012</td>
                // <td class="text-center">64</td>
                // <td class="text-center">2016/11/1 10:23</td>
                // <td class="text-center font-green">可用</td>
                // <td class="text-center">100%</td>
                // <td class="text-center">上海A区</td>
                // <td class="text-center">描述文字信息内容在这里显示</td>
    id:string;
    name:string;//镜像名称
    type:string;//镜像类型
    os:string;//操作系统
    digit:string;//系统位数
    createTime:string;//创建时间
    status:number;//状态--字典
    progress:string;//进度
    location:string//区域
    des:string;//描述
    nameEditing:boolean;//
    desEditing:boolean;//
}