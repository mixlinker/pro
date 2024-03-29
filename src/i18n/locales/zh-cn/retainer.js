export default {
    all: "所有记录",
    open: "开放状态",
    close: "关闭状态",
    EVENT: "事件",
    ALERT: "报警",
    FAULT: "故障",
    OTHER: "其他",
    info: "详情",
    name_cn: "名称（中文）",
    name_en: "名称（英文）",
    code: "历程编码",
    code_name: "编码",
    object: "历程对象",
    project: {
        uid: "项目编号",
        alias: "项目别名",
        name: "项目名称",
        category: "历程类型",
        type: "历程类型",
        object_list: "对象（可多选）",
        object: "对象",
        script: "脚本",
        json_tip: "请输入json格式",
        description: "描述",
        is_active: "状态",
        add_title: "添加项目",
        edit_title: "编辑项目",
        other: "其他",
        validate_msg: {
            object_list: "请选择对象",
            template_id: "请选择模板",
            name: "请输入名称",
            script: "请输入JSON脚本"
        },
        template_id: "选择模板",
        start_uid: "开始条件标识",//TODO:
        end_uid: "结束条件标识",
        anti_shake: "防抖动",
        sta_func: "统计方法",
        sta_param: "统计参数",
        filter: "过滤模型",
        item: "历程项"
    },
    result: {
        uid: "历程编号",
        list: "列表",
        id: "编号",
        code: "编码",
        EVENT: "事件",
        ALERT: "报警",
        FAULT: "故障",
        OTHER: "其他",
        close: "关闭",
        open: "开放",
        label_cn: "历程名称（中文）",
        label_en: "历程名称（英文）",
        category: "历程类型",
        template_id: "模板编号",
        object_name: "对象名称",
        model: "型号",
        customer_name: "客户名称",
        opened_at: "开始时间",
        elapsed: "持续时长",
        statis_result: "统计结果",
        statis_expr: "统计函数",
        fault_status: "故障状态",
        retainer_status: "历程状态",
        open: "开放",
        close: "关闭",
        keys: "参数触发值",
        diagram: "曲线图",
        handle_record: "处理记录",
        handler: "处理人",
        description: "处理描述",
        service_at: "处理时间",
        picture: "现场图片",
        end_value: "结束值",
        close_at: "结束时间",
        handle_id: "处理编号",
        object_id: "对象编号",
        select_time: "选择时间",
        upload_image: "上传图片",
        add_title: "添加处理记录",
        mode: "设备类型",
        custom: "客户名称",
        retainer_line: "历程曲线",
        select_object: "选择历程对象",
        select_project_empty_tip: "请先选择历程项目",
        project_object_empty_tip: "当前历程项目未关联对象"
    },
    template: {
        uid: "模板编号",
        name: "模板名称",
        description: "描述",
        script: "脚本",
        add_title: "添加模板",
        edit_title: "编辑模板",
        retainer: {
            uid: "历程编号",
            name: "历程名称"
        },
        retainer_list: "历程列表",
        category: "历程类型",
    },
    export: {
        code: "历程编码",
        name: "历程名称",
        project: '历程项目',
        object_name: "对象名称",
        file_name: "文件名称",
        code_tips: '请输入JSON格式，示例：["R01","R02"]',
        code_error: '历程编码填写不正确，请输入JSON格式！',
        object_select_tips: '请选择对象（可多选）',
        filename_tips: '请输入文件名称',
        name_tips: '请输入历程名称',
        project_select_tips: '请选择历程项目',
        project_select_time: '请选择时间范围',
    }
}