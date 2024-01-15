export default {
    //统计
    get_statistics_task_list: {
        block_mapping: "statistics",
        action: "get_statistics_task_list"
    },
    create_statistics_task: {
        block_mapping: "statistics",
        action: "create_statistics_task"
    },
    create_statistics_task_by_template: {
        block_mapping: "template",
        action: "create_statistics_task_by_template"
    },
    start_statistics_task: {
        block_mapping: "statistics",
        action: "start_statistics_task"
    },
    stop_statistics_task: {
        block_mapping: "statistics",
        action: "stop_statistics_task"
    },
    update_statistics_task: {
        block_mapping: "statistics",
        action: "update_statistics_task"
    },
    delete_statistics_task: {
        block_mapping: "statistics",
        action: "cancel_statistics_task"
    },
    get_statistics_task_detail: {
        block_mapping: "statistics",
        action: "get_statistics_task_detail"
    },
    get_statistics_history_list: {
        block_mapping: "statistics",
        action: "get_statistics_history_list"
    },
    recalculate_statistics: {
        block_mapping: "statistics",
        action: "recalculate_statistics"
    },

    //计算
    get_calculate_task_list: {
        block_mapping: "statistics",
        action: "get_calculate_task_list"
    },
    get_calculate_task_detail: {
        block_mapping: "statistics",
        action: "get_calculate_task_detail"
    },
    create_calculate_task: {
        block_mapping: "statistics",
        action: "create_calculate_task"
    },
    update_calculate_task: {
        block_mapping: "statistics",
        action: "update_calculate_task"
    },
    delete_calculate_task: {
        block_mapping: "statistics",
        action: "cancel_calculate_task"
    },
    start_calculate_task: {
        block_mapping: "statistics",
        action: "start_calculate_task"
    },
    stop_calculate_task: {
        block_mapping: "statistics",
        action: "stop_calculate_task"
    },
    get_calculate_history_list: {
        block_mapping: "statistics",
        action: "get_calculate_history_list"
    },
    //过滤模型
    get_filter_list: {
        block_mapping: "statistics",
        action: "get_filter_list"
    },
    get_filter_detail: {
        block_mapping: "statistics",
        action: "get_filter_detail"
    },
    create_filter_model: {
        block_mapping: "statistics",
        action: "create_filter_model"
    },
    update_filter_model: {
        block_mapping: "statistics",
        action: "update_filter_model"
    },
    delete_filter_model: {
        block_mapping: "statistics",
        action: "delete_filter_model"
    },
    //条件模型
    get_condition_list: {
        block_mapping: "statistics",
        action: "get_condition_list"
    },
    get_condition_detail: {
        block_mapping: "statistics",
        action: "get_condition_detail"
    },
    create_condition_model: {
        block_mapping: "statistics",
        action: "create_condition_model"
    },
    update_condition_model: {
        block_mapping: "statistics",
        action: "update_condition_model"
    },
    delete_condition_model: {
        block_mapping: "statistics",
        action: "delete_condition_model"
    },
    //统计结果
    get_statistics_result_list: {
        block_mapping: "statistics",
        action: "get_statistics_result_list"
    },
    //计算结果
    get_calculate_result_list: {
        block_mapping: "statistics",
        action: "get_calculate_result_list"
    },
    //计算重算
    recalculate_calculate: { 
        block_mapping: "statistics", 
        action: "recalculate_calculate" 
    },
    //快速配置
    statistics_ymd_create: {
        block_mapping: "statistics-ymd",
        action: "create_statistics_task"
    },
    statistics_ymd_start: {
        block_mapping: "statistics-ymd",
        action: "start_statistics_task"
    },
    statistics_ymd_stop: {
        block_mapping: "statistics-ymd",
        action: "stop_statistics_task"
    },
    statistics_ymd_delete: {
        block_mapping: "statistics-ymd",
        action: "cancel_statistics_task"
    },
    statistics_ymd_list: {
        block_mapping: "statistics-ymd",
        action: "get_statistics_task_list"
    },
    statistics_ymd_sub_list: {
        block_mapping: "statistics-ymd",
        action: "get_sub_statistics_list"
    },
    statistics_ymd_value: {
        block_mapping: "statistics-ymd",
        action: "get_statistics_value"
    },
    statistics_ymd_newest_value: {
        block_mapping: "statistics-ymd",
        action: "get_newest_statistics_value"
    },
    statistics_ymd_stat: {
        block_mapping: "statistics-ymd",
        action: "get_statistics_stat"
    },
    statistics_ymd_detail: {
        block_mapping: "statistics-ymd",
        action: "get_statistics_task_detail"
    },
    //统计模板
    get_statistics_template_list: {
        block_mapping: "template",
        action: "get_statistics_template_list"
    },
    create_statistics_template: {
        block_mapping: "template",
        action: "create_statistics_template"
    },
    update_statistics_template: {
        block_mapping: "template",
        action: "update_statistics_template"
    },
    delete_statistics_template: {
        block_mapping: "template",
        action: "delete_statistics_template"
    },
    get_statistics_template_item: {
        block_mapping: "template",
        action: "get_statistics_template_item"
    },
    get_project_list_by_template_id: {
        block_mapping: "template",
        action: "get_project_list_by_template_id"
    },
    //数据导出
    export_statistics_data: {
        block_mapping: "influxdbexport",
        action: "export_statistics_data"
    },

    get_statistics_object_task_list: {
        block_mapping: 'statistics',
        action: "get_statistics_object_task_list"
    },

    statistics_append_object: {
        block_mapping: 'statistics',
        action: "statistics_append_object"
    },

    statistics_delete_object: {
        block_mapping: 'statistics',
        action: "statistics_delete_object"
    },

    start_statistics_object_task: {
        block_mapping: 'statistics',
        action: "start_statistics_object_task"
    },

    stop_statistics_object_task: {
        block_mapping: 'statistics',
        action: "stop_statistics_object_task"
    },
}