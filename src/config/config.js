//按钮映射对应关系
import { iconMapping } from './button.js'
//通用搜索筛选条件
const CONDITION = [{
    label: 'contain',
    value: "like"
},
{
    label: 'equal',
    value: "="
},
{
    label: 'not_equal',
    value: "<>"
},
{
    label: 'lt',
    value: "<"
},
{
    label: 'lte',
    value: "<="
},
{
    label: 'gt',
    value: ">"
},
{
    label: 'gte',
    value: ">="
}
];

const CONDITION_MAPPING = {
    "like": "contain",
    "=": "equal",
    "<>": "not_equal",
    "<": "lt",
    "<=": "lte",
    ">": "gt",
    ">=": "gte"
}

const CONDITION_MAPPING_TIME = {
    "=": "at",
    ">=": "net",//不早于
    "<=": "nlt",//不晚于
    "<": "before",
    ">": "after"
}

const CONDITION_MAPPING_SELECT = {
    "=": "equal",
    "<>": "not_equal",
}

//分页配置
const PAGINATION = {
    current: 1,
    pageSize: 20,
    total: 0,
    hideOnSinglePage: false,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    showSizeChanger: true,
    pageSizeOptions: ['20', '50', '100', '200'], // 每页数量选项
}

//离线采集初始化数据类型
const COLLECT_INIT = {
    data_type: {
        Float: "Float",
        Integer: "Integer",
        String: "String",
        Bool: "Bool"
    },
    source_list: {
        API: "API",
        STT: "统计值",
        CAL: "计算值",
        // INDASS: "Indass"
    }
}

const STA_FUNC = {
    max: '最大值',
    min: '最小值',
    sum: '总和',
    avg: '平均值',
    accumulate: '读数转用量',
    integral: '数值积分',
    last: '终值（最后一个值）',
    first: '始值（第一个值）',
    median: '中位数',
    spread: '极差（最大减最小）',
    count: '计数',
    distinct: '去重计数（重复值不统计）',
    hour: '时长',
    stddev: '标准差',
}

const STA_HOUR_PARAM = {
    1: { label: "退化区间(单值)", value: ['[', ']'], demo: '[a]' },
    2: { label: "闭区间", value: ['[', ']'], demo: '[a,b]' },
    3: { label: "开区间", value: ['(', ')'], demo: '(a,b)' },
    4: { label: "左闭右开区间", value: ['[', ')'], demo: '[a,b)' },
    5: { label: "左开右闭区间", value: ['(', ']'], demo: '(a,b]' },
    6: { label: "单侧无界,有下界但无上界,左闭", value: ['[', ',)'], demo: '[a,)' },
    7: { label: "单侧无界,有下界但无上界,左开", value: ['(', ',)'], demo: '(a,)' },
    8: { label: "单侧无界,有上界但无下界,右闭", value: ['(,', ']'], demo: '(,a]' },
    9: { label: "单侧无界,有上界但无下界,右开", value: ['(,', ')'], demo: '(,a)' }
}
//历程类型
const RETAINER_CATEGORY = {
    EVENT: "事件",
    ALERT: "报警",
    FAULT: "故障",
    OTHER: "其他"
}

//流程状态
const WORKFLOW_STATUS = {
    OP: "开放",
    CL: "关闭",
    SU: "挂起",
    CA: "取消"
}

//导出状态
const EXPORT_STATUS = {
    Success: "成功",
    Fail: "失败",
    Executing: "执行中",
    Wait: "等待中"
}
const EXPORT_CLASS = {
    Success: "green",
    Fail: "red",
    Executing: "blue",
    Wait: "orange"
}
const TPL_OPTION = {
    0: "no_template",
    1: "template"
}

const CHART_MAPPING = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J'
}

const CATEGOEY_LIST = ['boiler', 'electric', 'compressor', 'injection', 'energy', 'photovoltaic', 'feed', 'food', 'farming', 'power', 'machining']

const ICON_PATH = iconMapping
const BLOCK_MAPPING = {
    'object': 'object_list',
    'mapping': 'mapping_list',
    'control': 'control_list',
    'pro': 'dashboard_list',
    'app': 'dashboard_list',
    'show': 'dashboard_list',
    'terminal': 'terminal_list',
    'terminal_config': 'terminal_config_list',
    'customer': 'customer_list',
    'collect': 'collect_list',
    'retainer_project': 'retainer_list',
    'statistics': 'get_statistics_task_list',
    'calculate': 'get_calculate_task_list',
    'filter': 'get_filter_list',
    'condition': 'get_condition_list',
    'feature': 'get_adaps_project_list',
    'mixgrading_task': 'mixtask_list',
    'mixtimer': 'get_timer_project_list',
    'report': 'plan_list',
    'messenger_project': 'messenger_project_list',
    'messenger_router': 'messenger_route_list',
    'agent': 'get_agent_list',
    'msg_template': 'get_template_list',
    'dispatching': 'dispatching_get_system_list',
    'mixservice': 'file_list',
    'equipmanage_equipment': 'device_equipment_list',
    'equipmanage_factory': 'device_factory_list',
    'data_source': 'get_dataservice_list',//数据源
    'bill_account': 'billing_account_list',
    'bill_expenses': 'billing_expenses_list',
    'mixtimer_rule': 'get_timer_rule_list',//维保规则列表
    'template': 'get_object_tpl_list',
    'index': 'index.get_project_list',
    'stability': 'stability.get_project_list',
    'deviation': 'deviation.get_project_list',
    'balance': 'balance.get_project_list',
    'increment': 'increment.get_project_list',
    'risk': 'risk.get_project_list',
    'ufs': 'ufs_list'
}
const BLOCK_ALL_MAPPING = {
    'object': 'get_object_select',
    'mapping': 'get_mapping_select',
    'control': 'get_control_select',
    'dashboard': 'get_dashboard_select',
    'terminal': 'get_terminal_select',
    'terminal_config': 'get_terminal_config_select',
    'customer': 'get_customer_select',
    'collect': 'get_collect_select',
    'retainer_project': 'get_retainer_select',
    'statistics': 'get_statistics_task_select',
    'calculate': 'get_calculate_task_select',
    'mixtimer': 'get_timer_project_select',
    'report': 'get_plan_select',
    'messenger_project': 'get_messenger_project_select',
    'agent': 'get_agent_select',
    'mixgrading_task': 'get_grading_task_select',
    'mixservice': 'get_file_select',
    'mixmanager': 'get_show_project_select',
    'equipmanage_equipment': 'get_device_equipment_select',
    'equipmanage_factory': 'get_device_factory_select',
    'data_source': 'get_datadef_select',//数据源
    'bill_account': 'get_account_select',
    'bill_expenses': 'get_rate_select',
    "mixtimer_rule": "get_timer_rule_select"
}

export default {
    api_proxy_url: '/apiproxy/api',
    middle_platform_url: '/http/middle_platform/api', //中台地址
    equipmanage_import: "/http/file/equipmanage_import", //设备管理导入
    upload_url: '/http/file/upload', //中台上传文件地址
    upload_report_url: '/http/file/upload_file', //报表上传文件地址
    file_url: '/mixservice/storage/', //文件访问地址
    middle_webscoket: '/websocket/object/fv',
    export_company: "/http/file/company_export",
    condition: CONDITION,
    condition_mapping: CONDITION_MAPPING,
    collect_init: COLLECT_INIT,
    retainer_category: RETAINER_CATEGORY,
    workflow_status: WORKFLOW_STATUS,
    pagination: PAGINATION,
    sta_func: STA_FUNC,
    sta_hour_param: STA_HOUR_PARAM,
    modal_width: "45%", //通用的弹窗宽度
    export_status: EXPORT_STATUS,
    export_class: EXPORT_CLASS,
    tpl_option: TPL_OPTION,
    chart_mapping: CHART_MAPPING,
    category_list: CATEGOEY_LIST,
    icon_path: ICON_PATH,
    block_mapping: BLOCK_MAPPING,
    block_all_mapping: BLOCK_ALL_MAPPING,
    condition_mapping_time: CONDITION_MAPPING_TIME,
    condition_mapping_select: CONDITION_MAPPING_SELECT,
    url_mapping: {
        login: '/http/user/login',
        login_config: '/http/user/no_login_config',
        check_mobile: '/http/user/check_company_mobile',
        get_verify: '/http/user/send_mobile_verify',
        check_verify: '/http/user/check_mobile_verify',
        register_company: '/http/user/register_company',
        get_public_config: '/http/user/no_login_config',
        bind_account: '/http/wechat/bind',
        check_namespace_exists: "/http/user/check_namespace_exists",
        get_ticket_url: "/http/user/loginGetTicket",
        check_img_ticket: "/http/user/checkImageTicket",
        check_sms_login: "/http/user/checkSmsLogin"
    },
}