export const TranslateCN = {
    LANG: '中文',
    COMMON: {
        PROMPT: '提示',
        CONFIRM: '确认',
        CANCEL: '取消',
        EXIT: '退出',
        RESET: '重置',
        NUMBER: '编号',
        OPERATION: '操作',
        TYPE: '类型',
        DESCRIPTION: '描述',
        ORDER: '订购',
        OVERVIEW: '概览',
        LABEL: '标签',
        EXPENSE: '费用',
        ONE_TIME_COSTS: '一次性费用',
        TOTAL_COST: '费用总计',
        BY_VOLUMN:'按量',
        DETAILS: '详情',
        BUY_NOW: '立即购买',
        SHOPPING_CART:'购物车',
        ADD_TO_SHOPPING_CART: '加入购物车',
        CHECK_SHOPPING_CART: '查看购物车',
        EMPTY_SHOPPING_CART: '清空购物车',
        NAME: '名称',
        NONE: '无',
        ALL:'所有',
        
        //单位
        $:"￥",

        //状态名词
        ENABLED: '已启用',
        NOT_ENABLED: '未启用',
        NOT_APPROVED: '未审批',
        APPROVED: '已审批',
        NEWLY_CREATED: '新创建',
        IN_PROCESS: '处理中',
        COMPLETED: '已完成',

        //专业术语
        MIRROR: '镜像',
        CLOUD_HOSTING: '云主机',
        CLOUD_HOST_NAME:'云主机名称',
        CLOUD_HARD_DISK: '云硬盘',
        CLOUD_HRAD_DISK_NAME: '云硬盘名称',
        ENTER_CLOUD_HARD_DISK_INFORMATION_TO_SEARCH:'输入云硬盘信息搜索',
        CLOUD_PLATFORM:'云平台',     
        RAM: '内存',
        CONFIGURATION:'配置',
        STORAGE: '存储',
        STORAGE_TYPE: '储存类型',
        SNAPSHOT: '快照',
        CONSOLE: '控制台',
        PHYSICAL_MACHINE: '物理机',
        FLOAT: '浮动',
        PATH: '地址',
        SERVICES: '服务',
        INSTANCE: '实例',
        CAPATITY: '容量',
        CAPACITY_GB:'容量(GB)',
        MOUNT: '挂载',
        AVAILABLE_ZONE: '可用区',
        PURCHASE_AMOUNT:'购买量',
    },
    HOST_VMWARE_MNG: {
        ENSURE: '确定',
        CONFIRM: '确认',
        SAVE: '保存',
        CANCEL: '取消',
        RETURN: '返回',
        SYNC: '同步',

        TYPE: '类型',

        IMAGE_MANAGEMENT: '镜像管理',
        RETURN_IMAGE_MANAGEMENT: '返回镜像管理列表',
        IMAGE_TYPE: '镜像类型',
        SELECT_IMAGE: '选择镜像',
        PUBLIC_IMAGE: '公共镜像',
        ENTERPRISE_IMAGE: '企业镜像',
        CUSTOMED_IMAGE: '自定义镜像',

        AFFILIATED_ENTERPRISE: '所属企业',
        SELECT_ENTERPRISE: '选择企业',

        SYNC_IMAGE: '同步镜像',
        SET_ENTERPRISE: '设置企业',

        MORE_OPERATION: '更多操作',
        EDIT: '编辑',
        ENABLE: '启用',
        DISABLE: '禁用',

        SELECT: '选择',
        SERIAL_NUMBER: '编号',
        IMAGE_NAME: '镜像名称',
        IMAGE_DISPLAY_NAME: '镜像显示名称',
        OS: '操作系统',
        BIT: '系统位数',
        CAPACITY: '镜像容量',
        STATUS: '状态',
        SYNC_RESULT: '同步结果',

        
        DETAIL: '详细',
        ALL_ENTERPRISE: '所有企业',
        ALL: '所有',

        DESCRIPTION: '描述',

        ENABLE_IMAGE: '启用镜像',
        DISABLE_IMAGE: '禁用镜像',
        EDIT_IMAGE: '编辑镜像',

        ENABLE_IMAGE_MSG: '您选择启用 {{selectedimg.displayName || "image"}}, 请确认; 如果确认，用户将能够在订购中选择此镜像.',
        DISABLE_IMAGE_MSG: '您选择禁用 {{selectedimg.displayName || "image"}}, 请确认; 如果确认, 用户将不能在订购中选择此镜像.',

        UNSELECTED_ENTERPRISE: '未选择企业',
        SELECTED_ENTERPRISE: '已选择企业',
        MOVE_IN: '移入',
        MOVE_OUT: '移出',

        MUST_CHOOSE_PLATFORM: '必须指定相关的平台',
        HPE_VMWARE_PLATFORM: '上海HPE VMware云平台',
        PLEASE_CHOOSE_IMAGE: '请选择相应的镜像',

        IMAGE_ENABLED: '镜像已启用',
        IMAGE_ENABLE_SUCCESS: '镜像启用成功',
        IMAGE_ENABLE_FAILED: '镜像启用失败',
        IMAGE_ENABLE_EXCEPTION: '镜像启用异常',

        IMAGE_DISABLED: '镜像已被禁用',
        IMAGE_DISABLE_SUCCESS: '镜像禁用成功',
        IMAGE_DISABLE_FAILED: '镜像禁用失败',
        IMAGE_DISABLE_EXCEPTION: '镜像禁用异常',

        IMAGE_UPDATE_SUCCESS: '镜像更新成功',
        IMAGE_UPDATE_FAILED: '镜像更新失败',
        IMAGE_UPDATE_EXCEPTION: '镜像更新异常',

        IMAGE_SYNC_SUCCESS: '镜像同步成功',
        NO_MORE_IMAGE_NEED_TO_SYNC: '没有镜像需要同步',

        NO_EMPTY: '不能为空',
        EMAIL_INVALID: '邮箱地址无效',

        ONLY_ENT_IMAGE_CAN_SET_ENT: '只有企业镜像才能设置企业，其他类型的镜像不能设置',
        IMAGE_NAME_ENFORCED: '镜像名称不能为空',

        GETTING_DATA_FAILED: '获取数据失败！',
        SYSTEM_PROMPT: '系统提示',
        PROMPT: '提示',
        UNSET: '未设置',
        SAVE_SUCCESS: '保存成功！'

    },
    NET_MNG_VM_IP_MNG: {
        ENSURE: '确定',
        COMFIRM: '确认',
        CNACLE: '取消',
        RETURN: '返回上一级',
        SELECT_OPERATION: '选择操作',

        FREE: '空闲',
        OCCUPIED: '已占用',
        ALL: '所有',

        OCCUPY: '占用',
        RELEASE: '释放',

        NETWORK: '网络',
        NET_MNG: '网络管理',
        MANAGE_STD_NET: '管理标准网络',
        MANAGE_DBT_NET: '管理分布式网络',
        MANAGE_NSX_NET: '管理NSX网络',
        IP_ADDRESS_MNG: 'IP地址管理',
        MANAGE_IP_ADDRESS: '管理IP地址',

        
        DC_NAME: '数据中心(DC)名称',
        CLUSTER_NAME: '可用区(集群)名称',
        VDS_NAME: '分布式交换机名称',
        

        SET_IP_SUBNET: '设置IP子网',
        SET_IP_POOL: '设置IP地址范围',

        SELECT: '选择',

        DC: '数据中心(DC)',
        PORTGROUP_NAME: '标准端口组名称',
        PORTGROUP_DISPLAY_NAME: '标准端口组显示名称',
        VDS_PORTGROUP_NAME: '分布式虚拟端口组名称',
        VDS_PORTGROUP_DISPLAY_NAME: '分布式端口组显示名称',
        VLAN_ID: 'VLAN ID',
        SUBNET_INFORMATION: '子网信息',
        GATEWAY_ADDRESS: '网关地址',
        IP_NUMBER: 'IP地址池数量',
        USED_IP_NUMBER: '已使用IP地址数量',
        REST_IP_NUMBER: '剩余IP地址数量',

        

        SUBNET_MASK: '子网掩码',
        GATEWAY: '网关',
        IP_SCOPE: 'IP地址范围',

        IP_ADDRESS: 'IP地址',
        HOST_NAME: '主机名称',
        ENTERPRISE_NAME: '企业名称',
        STATUS: '状态',
        DESCRIPTION: '说明',

        GETTING_DATA_FAILED: '获取数据失败！',
        DICTIONARY_FAILED: '数据字典出错！',
        PLEASE_CHOOSE_PG: '请选择相应的PortGroup',
        PLEASE_CHOOSE_DC: '请选择相应的dataCenter',
        PLEASE_CHOOSE_ITEM: '请选择相应的行',
        SET_IP_POOL_SUCCESS: '设置IP地址范围成功',
        SET_IP_POOL_FAILED: '设置IP地址范围失败',
        SET_IP_POOL_EXCEPTION: '设置IP地址范围异常',
        SET_SUBNET_SUCCESS: '设置IP子网成功',
        SET_SUBNET_FAILED: '设置IP子网失败',
        SET_SUBNET_EXCEPTION: '设置IP子网异常',
        SYSTEM_PROMPT: '系统提示',
        PROMPT: '提示',
        UNSET: '未设置',
        PLEASE_INPUT_DESCRIPTION: '请填写说明',

        IP_OCCUPIED: 'IP已被占用',
        IP_OCCUPIED_SUCCESS: 'IP占用成功',
        IP_OCCUPIED_FAILED: 'IP占用失败',
        IP_OCCUPIED_EXCEPTION: 'IP占用异常',
        IP_RELEASED: 'IP未被占用, 无法释放',
        IP_RELEASED_SUCCESS: 'IP释放成功',
        IP_RELEASED_FAILED: 'IP释放失败',
        IP_RELEASED_EXCEPTION: 'IP释放异常',
    },
}