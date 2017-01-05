export const TranslateCN = {
    LANG: '中文',
    COMMON: {
        OPERATION_ERROR:'操作错误',
        ERROR:'错误',
        PROMPT: '提示',
        CONFIRM: '确认',
        CANCEL: '取消',
        CLOSE: '关闭',
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
        ENTPRISE_OPTIONS_DATA_ERROR: "企业列表加载错误"
        ,DEPARTMENT_OPTIONS_DATA_ERROR :"部门列表加载错误"
        ,PLATFORM_DATA_ERROR:"区域加载错误"
        ,AVAILABLE_ZONE_DATA_ERROR:"可用区加载错误"
        ,REFUSE_FAILED:"拒绝处理失败"
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

        ENABLE_IMAGE_MSG: '您选择启用{{value_1}}, 请确认; 如果确认，用户将能够在订购中选择此镜像.',
        DISABLE_IMAGE_MSG: '您选择禁用{{value_1}}, 请确认; 如果确认, 用户将不能在订购中选择此镜像.',

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
        SAVE_SUCCESS: '保存成功！',

        UNSELECTED_ENTERPRISE: '未选择企业',
        SELECTED_ENTERPRISE: '已选择企业',
        ENTERPRISE_FOR_SELECT:'可选企业',

    },
    
    NET_MNG_VM_IP_MNG: {
        ENSURE: '确定',
        COMFIRM: '确认',
        CNACLE: '取消',
        RETURN: '返回上一级',
        SELECT_OPERATION: '选择操作',
        SELECT_LOCATION: '选择地域',
        PLATFORM_URL: '平台显示名称+连接URL https://192.168.1.1:443',

        FREE: '空闲',
        OCCUPIED: '已占用',
        ALL: '所有',

        OCCUPY: '占用',
        RELEASE: '释放',
        ENABLE: '启用',
        DISABLE: '禁用',
        DELETE: '删除',
        SAVE: '保存',
        CREATE: '创建',
        SYNC: '同步',
        TEST: '测试',

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
        PG_NAME: '端口组名称',
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

        CANT_NULL:'不能为空',
        EMAIL_INVALID: '邮箱地址无效',
        IP_INVALID: '不符合IP规范',
        MASK_INVALID: '不符合IP mask规范',
        IP_INVALID_OR_NULL: '不符合IP规范或不为空',
        INVALID: '不合规',
        NOT_IN_SUBNET: '不在子网中',
        NOT_FIX_SUBNET: '不符合该子网信息',

        SUBNET_MASK: '子网掩码',
        GATEWAY: '网关',
        IP_SCOPE: 'IP地址范围',

        IP_ADDRESS: 'IP地址',
        HOST_NAME: '主机名称',
        ENTERPRISE_NAME: '企业名称',
        STATUS: '状态',
        DESCRIPTION: '说明',

        PLEASE_CHOOSE_PF:'请先选择平台',
        PLEASE_CHOOSE_NET_TYPE: '请选择相应的网络类型',
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

        CREATE_STD_NET: '创建标准网络',
        EDIT_STD_NET: '编辑标准网络',
        PORTGROUP_ALLOCATION: '端口组资源分配',

        CLUSTER_DISPLAY_NAME: '可用区显示名称',

        LAST_UPDATE_DATE: '最后更新时间',
        DISPLAY_NAME: '显示名称',
        PLEASE_CHOOSE: '请选择',
        PLEASE_CHOOSE_NET: '请选择网络',
        CANT_EDIT_WHEN_ENABLED: '启用状态下不能编辑！',
        CANT_DELETE_WHEN_ENABLED: '启用状态下不能删除！',
        PLEASE_CHOOSE_DATACENTER: '请选择数据中心.',
        PLEASE_CHOOSE_CLUSTER: '请选择可用区.',
        CLS_DIS_NAME_CANT_NULL: '可用区显示名称不能为空.',
        PG_NAME_CANT_NULL: '端口组名称不能为空.',
        VLAN_ID_CANT_NULL: 'VLAN ID不能为空.',
        VLAN_ID_SCOPE: 'VLAN ID必须是0~4096的数字.',
        PG_DIS_NAME_CANT_NULL: '端口组显示名称不能为空.',
        DLR_SUBNET_DIS_NAME_CANT_NULL:'DLR子网显示名称不能为空.',

        PLEASE_CHOOSE_NET_TO_ENABLE: '请先选择需要启用的标准网络！',
        PLEASE_CHOOSE_DBT_NET_TO_ENABLE: '请先选择需要启用的分布式网络！',
        PLEASE_CHOOSE_NSX_NET_TO_ENABLE: '请先选择需要启用的NSX网络！',
        NET_ALREADY_ENABLED: '该网络已处于启用状态',
        PLEASE_CHOOSE_NET_TO_DISABLE: '请先选择需要禁用的标准网络！',
        PLEASE_CHOOSE_DBT_NET_TO_DISABLE: '请先选择需要禁用的分布式网络！',
        PLEASE_CHOOSE_NSX_NET_TO_DISABLE: '请先选择需要禁用的NSX网络！',
        NET_ALREADY_DISABLED: '该网络已处于禁用状态',
        CANT_DISABLE_AS_ENABLED_IP: 'IP占用状态下不能禁用！',
        PLEASE_CHOOSE_NET_TO_DELETE: '请先选择需要删除的标准网络！',
        
        CANT_DELETE_AS_ENABLED_IP: 'IP占用状态下不能删除！',

        ENABLE_NET: '启用网络',
        ENABLE_NET_SUCCESS: '启用成功',
        DISABLE_NET: '禁用网络',
        DISABLE_NET_SUCCESS: '禁用成功',
        DELETE_NET: '删除网络',
        DELETE_NET_SUCCESS: '删除成功',

        SYNC_DBT_NET: '同步分布式网络信息-网络信息',
        SYNC_SUCCESS: '同步成功',
        PLEASE_CHOOSE_ONE: '请选择一个',

        DBT_SWITCH_NAME: '分布式交换机名称(VDS)',
        SYNC_DBT_NETWORK: '同步分布式网络',
        DBT_PORTGROUP_NAME: '分布式虚拟端口组名称(dv Port-group)',
        DBT_PORTGROUP_DISPLAY_NAME: '分布式端口组显示名称',

        ENABLE_PORTGROUP_WARNING: '您选择启用{{value_1}}端口组，其VLAN ID为{{value_2}} ，请确认；如果确认，用户将能够在订购中选择此网络。',
        DISABLE_PORTGROUP_WARNING:'您选择禁用{{value_1}}端口组，其VLAN ID为{{value_2}} ，请确认；如果确认，用户将不能够在订购中选择此网络。',
        DELETE_PORTGROUP_WARNING:'您选择删除{{value_1}}端口组，其VLAN ID为{{value_2}} ，请确认；如果确认，此网络将被删除。',
        
        ENABLE_DBT_PORTGROUP_WARNING: '您选择启用{{value_1}}分布式端口组，其VLAN ID为{{value_2}} ，请确认；如果确认，用户将能够在订购中选择此网络。',
        DISABLE_DBT_PORTGROUP_WARNING:'您选择禁用{{value_1}}分布式端口组，其VLAN ID为{{value_2}} ，请确认；如果确认，用户将不能够在订购中选择此网络。',

        ENABLE_NSX_PORTGROUP_WARNING: '您选择启用{{value_1}}DLR接口，其lswId为{{value_2}} ，请确认；如果确认，用户将能够在订购中选择此网络。',
        DISABLE_NSX_PORTGROUP_WARNING:'您选择禁用{{value_1}}DLR接口，其lswId为{{value_2}} ，请确认；如果确认，用户将不能够在订购中选择此网络。',

        //vmware-nsx-net
        DLR_NAME: '逻辑路由器(DLR)名称',
        DLR_PORT_NAME: 'DLR接口名称',
        DLR_SUBNET_DISPLAY_NAME: 'DLR子网显示名称',
        DLR_PORT_IP_ADDRESS: 'DLR接口IP地址',
        LINKED_LSW_NAME: '连接逻辑交换机(LSW)名称',

        //vmware-navigation-page
        SET_NSX_MNG_INFO: '设置NSX管理信息',
        SET_NETWORK_TYPE: '为可用区(集群)设置网络类型',
        NSX_MNG_INFO: 'NSX管理信息',
        SET_NET_TYPE: '设置网络类型',
        STD_NET: '标准网络',
        DBT_NET: '分布式网络',
        NSX_NET: 'NSX网络',
        
        NETWORK_TYPE: '网络类型',


        SET_NSX_MNG_INFO_SUCCESS: '设置NSX管理信息成功',
        SET_NSX_MNG_INFO_FAILED: '设置NSX管理信息失败',
        SET_NSX_MNG_INFO_EXCEPTION: '设置NSX管理信息异常',

        TEST_NSX_MNG_INFO_SUCCESS: '测试NSX管理信息成功',
        TEST_NSX_MNG_INFO_FAILED: '测试NSX管理信息失败',
        TEST_NSX_MNG_INFO_EXCEPTION: '测试NSX管理信息异常',
        TEST_NSX_PASSED: 'NSX测试通过',
        TEST_NSX_FAILED: 'NSX测试失败',

        GET_NXS_STATUS_SUCCESS: '获取NXS状态成功',
        GET_NXS_STATUS_FAILED: '获取NXS状态失败',
        GET_NXS_STATUS_EXCEPTION: '获取NXS状态异常',
        
        SET_NETWORK_TYPE_SUCCESS: '设置网络类型成功',
        SET_NETWORK_TYPE_FAILED: '设置网络类型失败',
        SET_NETWORK_TYPE_EXCEPTION: '设置网络类型异常',

        NSX_VERSION: 'NSX版本',
        NSX_MNG_ADDRESS: 'NSX管理地址',
        NSX_MNG_USERNAME: '管理用户名',
        NSX_MNG_PASSWORD: '管理密码',

    },
    CHECK_CENTER: {
        //check-mng-set
        APPROVE_SET_LIST_LOAD_ERROR:"审批设置列表加载错误"
        ,APPROVE_SET_NEED_APPROVE_TIME:"请设置有效自动审批时间"
        ,APPROVE_SET_ERROR: "审批数据保存失败"
        ,APPROVE_SET_NEED_APPROVE_ENABLE: "必须设置审批选项"
        ,APPROVE_LIST_DATA_ERROR: "已审批列表加载错误"
        ,APPROVE_USER_DATA_ERROR: "审批人列表加载错误"
        ,APPROVE_SUBMITTER_DATRA_ERROR : "提交者列表加载错误"
        ,APPROVE_RESULT_DATA_ERROR : "审批结果加载错误"
        ,NOT_APPROVED_LIST_DATA_ERROR:"待审批列表加载错误"
        ,APPROVE_SET_LIST: "审批设置列表加载错误"
    },
    ENT_MNG:{
        ENT_OVERVIEW_DATA_ERROR:"企业统计数据加载错误"
        ,ENT_MNG_LIST_DATA_ERROR:"企业管理列表加载错误"
        ,ENT_CERT_UPDATE_FAILED:"认证更新失败"
        ,ENT_QUOTA_DATA_ERROR:"企业配额加载错误"
    },
    ORDER_MNG:{
        ORDER_DETAIL_DATA_ERROR:"订单详情加载错误"
        ,ORDER_LIST_DATA_ERROR:"订单查询列表加载错误"
        ,SUBINSTANCE_LIST_DATA_ERROR:"已购服务列表加载错误"
        ,BUYER_DATA_ERROR:"订购人列表加载错误"
        ,RENEW_FAILED:"订单续订失败"
        ,RENEW_INFO_DATA_ERROR:"续订费用加载失败"
    },
    NET_MNG_OPENSTACK:{
        GETTING_DATA_FAILED: '获取数据失败！',
        COMFIRM: '确认',
        CNACLE: '取消',
        SAVE:'保存',
        PROMPT: '提示',
        
        OPENSTACK_NEWWORK_MNG:'OpenStack网络管理',

        REGION: '地域',
        DATACENTER:'数据中心',
        PLATFORM:'平台',
        
        AFFILIATED_ENTERPRISE: '所属企业',
        INPUT_SEARCH:'输入企业/租户信息搜索',
        RESET:'重置',

        MORE_OPERATION: '更多操作',
        SYNC_NET: '同步网络',
        ENABLE:'启用',
        DISABLE:'禁用',

        SELECT: '选择',
        NETNAME: '网络名',
        NETNAME_DISPLAY: '网络显示名',
        SUBNET_NAME:'子网名',
        SEGMENT_CIDR:'网段信息',
        GATEwAY:'网关信息',
        NETWORK_TYPE:'类型',
        SHARED:'是否共享',
        STATE:'运行状态',
        STATUS:'状态',


        PLEASE_CHOOSE_PF:'请先选择平台',
        PLEASE_CHOOSE_NET:'请先选择一个网络',
        TITLE_ENABLE_NET:'启用网络',
        ENABLE_SUCCESS:'启用成功',
        TITLE_DISABLE_NET:'禁用网络',
        DISABLE_SUCCESS:'禁用成功',

        NOTICE_ENABLE:'您选择启用 {{value_1}} 网络,其网段为 {{value_2}} ,请确认;如果确认,用户将能够在订购中选择此网络.',
        NOTICE_DISABLE:'您选择禁用 {{value_1}} 网络,其网段为 {{value_2}} ,请确认;如果确认,用户将不能够在订购中选择此网络.',

        TITLE_CHOOSE_ENT:'请选择需要同步的企业',

        NAME_EMPTY:'名称不能为空',

        CANNOT_ENABLE:'未处于运行状态不能启用',
        HASBEEN_DISABLE:'该网络已处于禁用状态',
        
        //同步页面
        COULD:'云平台',
        RETURN: '返回上一级',
        
        SELECT_OPERATION: '选择操作',
        ADDALL:'全部添加',
        UPDATEALL:'全部更新',
        DISABLEALL:'全部禁用',

        NUMBER:'编号',
        SYNC_RESULT:'同步结果',
        SYNC_OPERATION:'同步操作',

        ADD:'添加',
        UPDATE:'更新',
        ADD_SUCCESS:'添加成功',
        ADDALL_SUCCESS:'全部添加成功',
        NONEED_ADD:'没有需要添加的网络',
        UPDATE_SUCCESS:'更新成功',
        NONEED_UPDATE:'没有需要更新的网络',
        UPDATEALL_SUCCESS:'全部更新成功',
        DISABLEALL_SUCCESS:'全部禁用成功'
    },

    HOST_OPENSTACK_MNG:{
        ENSURE: '确定',
        CONFIRM: '确认',
        SAVE: '保存',
        CANCEL: '取消',
        RETURN: '返回',
        SYNC: '同步',

        TYPE: '类型',

        COULD_PLATFORM:'云平台',
        IMAGE_MANAGEMENT: '镜像管理',
        RETURN_IMAGE_MANAGEMENT: '返回镜像管理列表',
        IMAGE_TYPE: '镜像类型',
        ALL_IMAGE: '所有镜像类型',
        PUBLIC_IMAGE: '公共镜像',
        ENTERPRISE_IMAGE: '企业镜像',
        CUSTOMED_IMAGE: '自定义镜像',

        AFFILIATED_ENTERPRISE: '所属企业',
        ALL_ENTERPRISE: '所有企业',

        SYNC_IMAGE_PUBLIC: '同步公共镜像',
        SYNC_IMAGE_ENT: '同步企业镜像',

        MORE_OPERATION: '更多操作',
        EDIT: '编辑',
        ENABLE: '启用',
        DISABLE: '禁用',

        SELECT: '选择',
        IMAGE_NAME: '镜像名称',
        IMAGE_DISPLAY_NAME: '镜像显示名称',
        OS: '操作系统',
        BIT: '系统位数',
        CAPACITY: '镜像容量',
        STATUS: '状态',

        NUMBER: '编号',
        SYNC_RESULT:'同步结果',

        DESCRIPTION:'描述',
        //ts
        ENABLE_IMAGE: '启用镜像',
        DISABLE_IMAGE: '禁用镜像',
        EDIT_IMAGE: '编辑镜像',

        ENABLE_IMAGE_MSG: '您选择启用 {{value_1}}, 请确认; 如果确认，用户将能够在订购中选择此镜像.',
        DISABLE_IMAGE_MSG: '您选择禁用 {{value_1}}, 请确认; 如果确认, 用户将不能在订购中选择此镜像.',

        UNSELECTED_ENTERPRISE: '未选择企业',
        SELECTED_ENTERPRISE: '已选择企业',

        PLEASE_CHOOSE_ENTERPRISE:'请选择企业',

        //MUST_CHOOSE_PLATFORM: '必须指定相关的平台',
        HPE_VMWARE_PLATFORM: '上海HPE OPENSATCK云平台',

        PLEASE_CHOOSE_IMAGE:'请先选择一个镜像', 
        
        IMAGE_ENABLED: '该镜像已是启用状态',
        IMAGE_ENABLE_SUCCESS: '镜像启用成功',
        IMAGE_ENABLE_FAILED: '镜像启用失败',

        IMAGE_DISABLED: '该镜像已是禁用状态',
        IMAGE_DISABLE_SUCCESS: '镜像禁用成功',
        IMAGE_DISABLE_FAILED: '镜像禁用失败',

        IMAGE_UPDATE_SUCCESS: '镜像更新成功',
        IMAGE_UPDATE_FAILED: '镜像更新失败',
        IMAGE_UPDATE_EXCEPTION: '镜像更新异常',

        PLEASE_CHOOSE_IMAGE_NEEDSYNC:'请选择要同步的镜像',
        IMAGE_SYNC_SUCCESS: '镜像同步成功',
        NO_MORE_IMAGE_NEED_TO_SYNC: '没有镜像需要同步',

        IMAGE_NAME_ENFORCED: '镜像名称不能为空',

        GETTING_DATA_FAILED: '获取数据失败！',
        SYSTEM_PROMPT: '系统提示',
        PROMPT: '提示',
        UNSET: '未设置',
        SAVE_SUCCESS: '保存成功！',
        UNKNOWN:'未知',
        ALL:'所有'
    },

    NET_MNG_VM_DBT_PORT:{
        ENSURE: '确定',
        COMFIRM: '确认',
        CNACLE: '取消',
        RETURN: '返回上一级',

        ALL: '所有',
        

        NETWORK: '网络',
        NET_MNG: '网络管理',
        MANAGE_DBT_NET: '管理分布式网络',
        PORTGROUP_ALLOCATION: '端口组资源分配',
        
        DC_NAME: '数据中心(DC)名称',
        DBT_SWITCH_NAME: '分布式交换机名称(VDS)',
        DBT_PORTGROUP_NAME: '分布式虚拟端口组名称(dv Port-group)',
        ENTERPRISE_LIST:'企业列表',

        SET_ENTERPRISE: '设置企业',
        SELECT: '选择',

        GETTING_DATA_FAILED: '获取数据失败！',
        DICTIONARY_FAILED: '数据字典出错！',
        SYSTEM_PROMPT: '系统提示',
        PROMPT: '提示',
        UNSET: '未设置',

        PLEASE_CHOOSE_PORT_NEEDSET:'请先选择需要设置的企业的端口组',

        PORTGROUP_DISPLAY_NAME: '端口组显示名称',
        SELECT_ENTERPRISE:'选择企业',

        ENTERPRISE_FOR_SELECT:'可选企业',
        SELECTED_ENTERPRISE:'选中企业',

        CLOSE:'关闭',
        SAVE:'保存',
        SAVE_SUCCESS:'保存成功！'

    },

    NET_MNG_VM_PORT:{
        ENSURE: '确定',
        COMFIRM: '确认',
        CNACLE: '取消',
        RETURN: '返回上一级',

        ALL: '所有',
        

        NETWORK: '网络',
        NET_MNG: '网络管理',
        MANAGE_STD_NET: '管理标准网络',
        PORTGROUP_ALLOCATION: '端口组资源分配',
        
        DC_NAME: '数据中心(DC)名称',
        CLUSTER_NAME: '可用区(集群)名称',
        CLUSTER_DISPLAY_NAME: '可用区显示名称',
        PORTGROUP_NAME: '标准端口组名称',
        ENTERPRISE_LIST:'企业列表',

        SET_ENTERPRISE: '设置企业',
        SELECT: '选择',

        GETTING_DATA_FAILED: '获取数据失败！',
        DICTIONARY_FAILED: '数据字典出错！',
        SYSTEM_PROMPT: '系统提示',
        PROMPT: '提示',
        UNSET: '未设置',

        PLEASE_CHOOSE_PORT_NEEDSET:'请先选择需要设置的企业的端口组',

        PORTGROUP_DISPLAY_NAME: '端口组显示名称',
        SELECT_ENTERPRISE:'选择企业',

        ENTERPRISE_FOR_SELECT:'可选企业',
        SELECTED_ENTERPRISE:'选中企业',

        BACK:'返回',
        SAVE:'保存',
        SAVE_SUCCESS:'保存成功！'

    },
    NET_VM_NSX_INDEX: {
        VMWARE_NET: 'VMware网络',
        RETURN: '返回上一级',
        LOGICAL_ROUTER_NAME: '逻辑路由器(DLR)名称',
        ALL: '所有',
        ENSURE: '确定',
        SYNC_NSX_NET_INFO: '同步NSX网络信息',
        DLR_RESOURCE_ALLOCATION: 'DLR资源分配',
        IP_ADDR_MNG: 'IP地址管理',
        SELECT_OPERATION:'选择操作',
        ENABLE: '启用',
        DISABLE: '禁用',
        SELECT: '选择',
        ROUTER_NAME: '逻辑路由器名称(DLR)',
        DLR_INTERFACE_NAME: 'DLR接口名称',
        DLR_SUBNET_DISPLAY_NAME: 'DLR子网显示名称',
        DLR_INTERFACE_IP: 'DLR接口IP地址',
        SUBNET_MASK: '子网掩码',
        DLR_INERFACE_TYPE: 'DLR接口类型',
        LSW_NAME: '连接逻辑交换机(LSW)名称',
        LSW_ID: 'LSW标示ID',
        LSW_TRANSPORT_ZONE: 'LSW所属传输区域(Tansport Zone)',
        STATUS: '状态',
        LAST_UPDATE:'最后同步时间',
        TRANSPORT_DETAIL: '传输区域{{value_1}}详细信息',
        CLUSTER_NAME: '可用区(集群)名称',
        DISPLAY_NAME: '显示名称',
        DISTRIBUTED_SWITCH:'VDS(分布式交换机)'
    }
    ,
    NET_MNG_VM_NSX_DLR:{
        ENSURE: '确定',
        COMFIRM: '确认',
        CNACLE: '取消',
        RETURN: '返回上一级',

        ALL: '所有',
        

        NETWORK: '网络',
        NET_MNG: '网络管理',
        MANAGE_NSX_NET: '管理NSX网络',
        DLR_ALLOCATION: 'DLR资源分配',
        
        DLR_NAME:'逻辑路由器名称(DLR)',

        SET_ENTERPRISE: '设置企业',
        SELECT: '选择',
        ENTERPRISE_LIST:'企业列表',

        PLEASE_CHOOSE_ONE_NETWORK: '请选择一个网络',
        

        DLR_PORT_NAME: 'DLR接口名称',
        DLR_SUBNET_DISPLAY_NAME: 'DLR子网显示名称',
        DLR_PORT_IP_ADDRESS: 'DLR接口IP地址',
        SUBNET_MASK: '子网掩码',
        DLR_PORT_TYPE: 'DLR接口类型',
        LINKED_LSW_NAME: '连接逻辑交换机(LSW)名称',

        UNSET: '未设置',
        SELECT_ENTERPRISE:'选择企业',
        SAVE:'保存',
        CLOSE:'关闭'
    }
}