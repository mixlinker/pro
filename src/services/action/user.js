export default {
    user_list: { block_mapping: "mixauth", action: "get_user_list" },
    user_item: { block_mapping: "mixauth", action: "get_user_item" },
    user_create: { block_mapping: "mixauth", action: "create_user" },
    user_update: { block_mapping: "mixauth", action: "update_user" },
    user_delete: { block_mapping: "mixauth", action: "delete_user" },
    user_block_data: { block_mapping: "mixauth", action: "get_user_block_data_list" },
    delete_user_block_data: { block_mapping: "mixauth", action: "delete_user_block_data" },
    create_user_block_data: { block_mapping: "mixauth", action: "create_user_block_data" },

    role_list: { block_mapping: "mixauth", action: "get_role_list" },
    role_item: { block_mapping: "mixauth", action: "get_role_item" },
    role_create: { block_mapping: "mixauth", action: "create_role" },
    role_update: { block_mapping: "mixauth", action: "update_role" },
    role_delete: { block_mapping: "mixauth", action: "delete_role" },
    role_app_list: { block_mapping: "mixauth", action: "shortcut_list" },
    unbind_app: { block_mapping: "mixauth", action: "unbind_shortcut" },
    bind_app: { block_mapping: "mixauth", action: "bind_shortcut" },
    bind_mobile: { block_mapping: "mixauth", action: "create_role_menu_mobile" },
    get_user_mobile_shortcut: { block_mapping: "mixauth", action: "get_user_mobile_shortcut" },
    bind_role_shortcut_view: { block_mapping: "mixauth", action: "bind_role_shortcut_view" },
    get_role_menu_mobile: { block_mapping: "mixauth", action: "get_role_menu_mobile" },
    delete_role_menu_mobile: { block_mapping: "mixauth", action: "delete_role_menu_mobile" },

    get_authority: { block_mapping: "mixauth", action: "get_menu_and_function_by_shortcut_id" },
    create_role_menu_pc: { block_mapping: "mixauth", action: "create_role_menu_pc" },

    get_workflow_bind_list: { block_mapping: "mixauth", action: "get_workflow_bind_list" },
    create_workflow_bind: { block_mapping: "mixauth", action: "create_workflow_bind" },

    get_tableman_menu_list: { block_mapping: "tableman", action: "get_menu_function_list" },
    get_tableman_bind_list: { block_mapping: "mixauth", action: "get_bind_tableman_list" },
    create_tableman_bind: { block_mapping: "mixauth", action: "bind_tableman_menu" },
    get_new_tableman_menu_list: { block_mapping: "new_tableman", action: "get_menu_list" },
    template_list: {block_mapping: "new_tableman", action: "get_template_list"},

    //选择全部
    get_object_select: { block_mapping: "object", action: "get_object_select" },
    get_mapping_select: { block_mapping: "mapping", action: "get_mapping_select" },
    get_control_select: { block_mapping: "control", action: "get_control_select" },
    get_dashboard_select: { block_mapping: "dashboard", action: "get_dashboard_select" },
    get_terminal_select: { block_mapping: "terminal", action: "get_terminal_select" },
    get_terminal_config_select: { block_mapping: "terminal_config", action: "get_terminal_config_select" },
    get_customer_select: { block_mapping: "customer", action: "get_customer_select" },
    get_collect_select: { block_mapping: "collect", action: "get_collect_select" },
    get_retainer_select: { block_mapping: "retainer", action: "get_retainer_select" },
    get_statistics_task_select: { block_mapping: "statistics", action: "get_statistics_task_select" },
    get_calculate_task_select: { block_mapping: "calculate", action: "get_calculate_task_select" },
    get_timer_select: { block_mapping: "mixtimer", action: "get_timer_select" },
    get_timer_rule_select: { block_mapping: "mixtimer", action: "get_timer_rule_select" },
    get_plan_select: { block_mapping: "report", action: "get_plan_select" },
    get_messenger_project_select: { block_mapping: "mixmessenger", action: "get_project_select" },
    get_agent_select: { block_mapping: "agent", action: "get_agent_select" },
    get_grading_task_select: { block_mapping: "mixgrading", action: "get_grading_task_select" },
    get_file_select: { block_mapping: "mixservice", action: "get_file_select" },
    get_show_project_select: { block_mapping: "mixmanager", action: "get_show_project_select" },
    get_device_equipment_select: { block_mapping: "equipmanage", action: "get_equipment_select" },
    get_device_factory_select: { block_mapping: "equipmanage", action: "get_factory_select" },

    //控制码权限
    set_control_parameter: { block_mapping: "mixauth", action: "set_control_parameter" },
    get_control_parameter: { block_mapping: "mixauth", action: "get_control_parameter" },

    //反向授权
    get_mixiot_support_list: { block_mapping: "mixauth", action: "get_mixiot_support_list" },
    reverse_authorization: { block_mapping: "mixauth", action: "reverse_authorization" },
    cancel_authorization: { block_mapping: "mixauth", action: "cancel_authorization" },

}
