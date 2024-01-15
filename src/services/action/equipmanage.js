export default {
    /* 首页 */
    get_timer_statistics: {block_mapping: "equipmanage", action: "get_timer_statistics"},//日历维保

    /* 巡检项目 */
    create_inspection_project: {block_mapping: "equipmanage", action: "create_routing_inspection_project"},
    update_inspection_project: {block_mapping: "equipmanage", action: "update_routing_inspection_project"},
    delete_inspection_project: {block_mapping: "equipmanage", action: "delete_routing_inspection_project"},
    get_inspection_project_list: {block_mapping: "equipmanage", action: "get_routing_inspection_project_list"},
    get_inspection_project_item: {block_mapping: "equipmanage", action: "get_routing_inspection_project_item"},
    /* 巡检规则 */
    create_inspection_rule: {block_mapping: "equipmanage", action: "create_routing_inspection_rule"},
    update_inspection_rule: {block_mapping: "equipmanage", action: "update_routing_inspection_rule"},
    delete_inspection_rule: {block_mapping: "equipmanage", action: "delete_routing_inspection_rule"},
    get_inspection_rule_list: {block_mapping: "equipmanage", action: "get_routing_inspection_rule_list"},
    get_inspection_rule_item: {block_mapping: "equipmanage", action: "get_routing_inspection_rule_item"},

    /* 巡检任务、设备详情-巡检项 */
    create_inspection_task: {block_mapping: "equipmanage", action: "create_routing_inspection_task"},
    update_inspection_task: {block_mapping: "equipmanage", action: "update_routing_inspection_task"},
    delete_inspection_task: {block_mapping: "equipmanage", action: "delete_routing_inspection_task"},
    get_inspection_task_list: {block_mapping: "equipmanage", action: "get_routing_inspection_task_list"},
    get_inspection_task_item: {block_mapping: "equipmanage", action: "get_routing_inspection_task_item"},
    start_inspection_task: {block_mapping: "equipmanage", action: "start_routing_inspection_task"},
    stop_inspection_task: {block_mapping: "equipmanage", action: "stop_routing_inspection_task"},
    copy_routing_inspection_project: {block_mapping: "equipmanage", action: "copy_routing_inspection_project"},
    /* 巡检记录 */
    get_inspection_list: {block_mapping: "equipmanage", action: "get_routing_inspection_list"}, //设备详情-巡检任务
    get_inspection_item: {block_mapping: "equipmanage", action: "get_routing_inspection_item"}, //设备详情-巡检任务详情
    delete_inspection: {block_mapping: "equipmanage", action: "delete_routing_inspection"}, //设备详情-删除巡检记录
    handle_inspection: {block_mapping: "equipmanage", action: "handle_routing_inspection"}, //设备详情-添加巡检记录
    handle_inspection_list: {block_mapping: "equipmanage", action: "handle_routing_inspection_list"}, //设备详情-添加巡检记录

    get_handle_inspection_item: {block_mapping: "equipmanage", action: "get_handle_routing_inspection_item"}, //设备详情-巡检记录详情
    get_handle_inspection_list: {block_mapping: "equipmanage", action: "get_handle_routing_inspection_list"}, //设备详情-巡检记录
    verify_handle_inspection: {block_mapping: "equipmanage", action: "verify_handle_routing_inspection"}, //验收巡检记录

    /* 临时计划任务  */
    get_temporary_inspection_list: {block_mapping: "equipmanage", action: "get_temporary_inspection_list"},
    get_temporary_inspection_item: {block_mapping: "equipmanage", action: "get_temporary_inspection_item"},
    create_temporary_inspection: {block_mapping: "equipmanage", action: "create_temporary_inspection"},
    update_temporary_inspection: {block_mapping: "equipmanage", action: "update_temporary_inspection"},
    delete_temporary_inspection: {block_mapping: "equipmanage", action: "delete_temporary_inspection"},

    /* 临时计划记录  */
    get_handle_temporary_inspection_list: {block_mapping: "equipmanage", action: "get_handle_temporary_inspection_list"},
    get_handle_temporary_inspection_item: {block_mapping: "equipmanage", action: "get_handle_temporary_inspection_item"},
    handle_temporary_inspection: {block_mapping: "equipmanage", action: "handle_temporary_inspection"},
    verify_handle_temporary_inspection: {block_mapping: "equipmanage", action: "verify_handle_temporary_inspection"},

    /* 旧接口 */
    device_factory_list: {block_mapping: "equipmanage", action: "get_factory_list"},
    device_factory_item: {block_mapping: "equipmanage", action: "get_factory"},
    device_factory_create: {block_mapping: "equipmanage", action: "create_factory"},
    device_factory_update: {block_mapping: "equipmanage", action: "update_factory"},
    device_factory_delete: {block_mapping: "equipmanage", action: "delete_factory"},

    manufacturer_list: {block_mapping: "equipmanage", action: "get_manufacturer_list"},
    manufacturer_item: {block_mapping: "equipmanage", action: "get_manufacturer"},
    manufacturer_create: {block_mapping: "equipmanage", action: "create_manufacturer"},
    manufacturer_update: {block_mapping: "equipmanage", action: "update_manufacturer"},
    manufacturer_delete: {block_mapping: "equipmanage", action: "delete_manufacturer"},

    equipment_type_list: {block_mapping: "equipmanage", action: "get_equipment_type_list"},
    equipment_type_item: {block_mapping: "equipmanage", action: "get_equipment_type"},
    equipment_type_create: {block_mapping: "equipmanage", action: "create_equipment_type"},
    equipment_type_update: {block_mapping: "equipmanage", action: "update_equipment_type"},
    equipment_type_delete: {block_mapping: "equipmanage", action: "delete_equipment_type"},

    priority_list: {block_mapping: "equipmanage", action: "get_priority_list"},
    priority_item: {block_mapping: "equipmanage", action: "get_priority"},
    priority_create: {block_mapping: "equipmanage", action: "create_priority"},
    priority_update: {block_mapping: "equipmanage", action: "update_priority"},
    priority_delete: {block_mapping: "equipmanage", action: "delete_priority"},

    timer_rule_list: {block_mapping: "equipmanage", action: "get_timer_rule_list"},
    timer_rule_item: {block_mapping: "equipmanage", action: "get_timer_rule"},
    timer_rule_create: {block_mapping: "equipmanage", action: "create_timer_rule"},
    timer_rule_update: {block_mapping: "equipmanage", action: "update_timer_rule"},
    timer_rule_delete: {block_mapping: "equipmanage", action: "delete_timer_rule"},
    handle_first_timer: {block_mapping: "equipmanage", action: "update_timer"},

    timer_rule_group_list: {block_mapping: "equipmanage", action: "get_timer_rule_group_list"},
    timer_rule_group_create: {block_mapping: "equipmanage", action: "create_timer_rule_group"},
    timer_rule_group_update: {block_mapping: "equipmanage", action: "update_timer_rule_group"},
    timer_rule_group_delete: {block_mapping: "equipmanage", action: "delete_timer_rule_group"},
    timer_rule_group_item: {block_mapping: "equipmanage", action: "get_timer_rule_group_item"},

    device_timer_list: {block_mapping: "equipmanage", action: "get_timer_list"},
    device_timer_item: {block_mapping: "equipmanage", action: "get_timer"},
    create_timer_device: {block_mapping: "equipmanage", action: "create_timer"},
    create_timers_device: {block_mapping: "equipmanage", action: "create_timers"},
    handle_timer_device: {block_mapping: "equipmanage", action: "handle_timer"},
    update_timer_device: {block_mapping: "equipmanage", action: "update_timer"},
    delete_timer_device: {block_mapping: "equipmanage", action: "delete_timer"},
    start_timer_device: {block_mapping: "equipmanage", action: "start_timer"},
    stop_timer_device: {block_mapping: "equipmanage", action: "stop_timer"},
    copy_timer_rule_group: {block_mapping: "equipmanage", action: "copy_timer_rule_group"},

    device_equipment_list: {block_mapping: "equipmanage", action: "get_equipment_list"},
    device_equipment_item: {block_mapping: "equipmanage", action: "get_equipment"},
    device_equipment_delete: {block_mapping: "equipmanage", action: "delete_equipment"},
    device_equipment_create: {block_mapping: "equipmanage", action: "create_equipment"},
    device_equipment_update: {block_mapping: "equipmanage", action: "update_equipment"},

    get_threshold: {block_mapping: "equipmanage", action: "get_threshold"},
    set_threshold: {block_mapping: "equipmanage", action: "set_threshold"},

    handle_record_list: {block_mapping: "equipmanage", action: "get_handle_record_list"},
    handle_record_list_export: {block_mapping: "equipmanage", action: "get_handle_record_list_export"},
    verify_timer_record: {block_mapping: "equipmanage", action: "verify_timer_record"},

    /* 工单 */
    get_workflow_case_id_list: {block_mapping: "equipmanage", action: "get_handle_workflow_case_id_list"},
    create_handle_workflow: {block_mapping: "equipmanage", action: "get_handle_workflow_case_id_list"},
    get_handle_workflow_info: {block_mapping: "equipmanage", action: "get_handle_workflow_info"},
    get_handle_workflow_bar_graph: {block_mapping: "equipmanage", action: "get_handle_workflow_bar_graph"},
    get_handle_workflow_statistics: {block_mapping: "equipmanage", action: "get_handle_workflow_statistics"},

    /* 导出 */
    export_inspect_handle_data: {block_mapping: "influxdbexport", action: "export_routing_inspection_handle_data"},
    export_timer_handle_data: {block_mapping: "influxdbexport", action: "export_timer_handle_data"},
    export_plan_handle_data: {block_mapping: "influxdbexport", action: "export_temporary_inspection_handle_data"},
    get_export_data_list: {block_mapping: "influxdbexport", action: "get_history_list"}
}
