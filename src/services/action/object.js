export default {
    object_list: {
        block_mapping: "object",
        action: "get_object_list"
    },
    object_item: {
        block_mapping: "object",
        action: "get_object_item"
    },
    object_create: {
        block_mapping: "object",
        action: "create_object"
    },
    object_create_by_tpl: {
        block_mapping: "template",
        action: "create_object_by_template"
    },
    object_update: {
        block_mapping: "object",
        action: "update_object"
    },
    object_delete: {
        block_mapping: "object",
        action: "delete_object"
    },
    object_childs: {
        block_mapping: "object",
        action: "get_object_childs"
    },
    get_object_select: {
        block_mapping: "object",
        action: "get_object_select"
    },
    get_object_columns: {
        block_mapping: "object",
        action: "get_object_columns"
    },
    edit_object_column: {
        block_mapping: "object",
        action: "edit_object_column"
    },
    batch_edit_object_column: {
        block_mapping: "object",
        action: "batch_edit_object_column"
    },
    get_object_fv_group: {
        block_mapping: "object",
        action: "get_object_fv_group"
    },
    history_mosaic: {
        block_mapping: "apim",
        action: "get_mosaic_list"
    },
    history_delete: {
        block_mapping: "influxdbexport",
        action: "delete_history"
    },
    history_export: {
        block_mapping: "influxdbexport",
        action: "export_mosaic_data"
    },
    history_export_data: {
        block_mapping: "influxdbexport",
        action: "get_mosaic_export_history_list"
    },
    history_line: {
        block_mapping: "apim",
        action: "get_mosaic_dataline"
    },
    get_object_log_list: {
        block_mapping: "object_log",
        action: "get_object_log_list"
    },
    create_object_log: {
        block_mapping: "object_log",
        action: "create_object_log"
    },
    delete_object_log: {
        block_mapping: "object_log",
        action: "delete_object_log"
    },
    export_object_log_data: {
        block_mapping: "influxdbexport",
        action: "export_object_log_data"
    },
    mapping_list: {
        block_mapping: "mapping",
        action: "get_mapping_list"
    },
    mapping_item: {
        block_mapping: "mapping",
        action: "get_mapping_item"
    },
    mapping_create: {
        block_mapping: "mapping",
        action: "create_mapping"
    },
    mapping_update: {
        block_mapping: "mapping",
        action: "update_mapping"
    },
    mapping_delete: {
        block_mapping: "mapping",
        action: "delete_mapping"
    },

    control_list: {
        block_mapping: "control",
        action: "get_control_list"
    },
    control_item: {
        block_mapping: "control",
        action: "get_control_item"
    },
    control_create: {
        block_mapping: "control",
        action: "create_control"
    },
    control_update: {
        block_mapping: "control",
        action: "update_control"
    },
    control_delete: {
        block_mapping: "control",
        action: "delete_control"
    },

    dashboard_list: {
        block_mapping: "dashboard",
        action: "get_dashboard_list"
    },
    dashboard_item: {
        block_mapping: "dashboard",
        action: "get_dashboard_item"
    },
    dashboard_create: {
        block_mapping: "dashboard",
        action: "create_dashboard"
    },
    dashboard_update: {
        block_mapping: "dashboard",
        action: "update_dashboard"
    },
    dashboard_delete: {
        block_mapping: "dashboard",
        action: "delete_dashboard"
    },
    dashboard_config: {
        block_mapping: "mixmanager",
        action: "get_dashboard_by_object"
    },

    dashboard_template_list: {
        block_mapping: "template",
        action: "get_dashboard_tpl_list"
    },
    dashboard_template_item: {
        block_mapping: "template",
        action: "get_dashboard_tpl_item"
    },
    dashboard_template_create: {
        block_mapping: "template",
        action: "create_dashboard_tpl"
    },
    dashboard_template_update: {
        block_mapping: "template",
        action: "update_dashboard_tpl"
    },
    dashboard_template_delete: {
        block_mapping: "template",
        action: "delete_dashboard_tpl"
    },
    dashboard_list_by_tpl: {
        block_mapping: "template",
        action: "get_dashboard_by_template"
    },

    object_template_list: {
        block_mapping: "template",
        action: "get_object_template_list"
    },
    object_template_item: {
        block_mapping: "template",
        action: "get_object_template_item"
    },
    object_template_create: {
        block_mapping: "template",
        action: "create_object_template"
    },
    object_template_update: {
        block_mapping: "template",
        action: "update_object_template"
    },
    object_template_delete: {
        block_mapping: "template",
        action: "delete_object_template"
    },
    object_list_by_tpl: {
        block_mapping: "template",
        action: "get_object_list_by_template_id"
    },

    mapping_template_list: {
        block_mapping: "template",
        action: "get_mapping_template_list"
    },
    mapping_template_item: {
        block_mapping: "template",
        action: "get_mapping_template_item"
    },
    mapping_template_create: {
        block_mapping: "template",
        action: "create_mapping_template"
    },
    mapping_template_update: {
        block_mapping: "template",
        action: "update_mapping_template"
    },
    mapping_template_delete: {
        block_mapping: "template",
        action: "delete_mapping_template"
    },
    mapping_list_by_tpl: {
        block_mapping: "template",
        action: "get_mapping_list_by_template_id"
    },

    control_template_list: {
        block_mapping: "template",
        action: "get_control_template_list"
    },
    control_template_item: {
        block_mapping: "template",
        action: "get_control_template_item"
    },
    control_template_create: {
        block_mapping: "template",
        action: "create_control_template"
    },
    control_template_update: {
        block_mapping: "template",
        action: "update_control_template"
    },
    control_template_delete: {
        block_mapping: "template",
        action: "delete_control_template"
    },
    control_list_by_tpl: {
        block_mapping: "template",
        action: "get_control_list_by_template_id"
    },

    indass_template_list: {
        block_mapping: "indass",
        action: "get_project_template_list"
    },
    statistics_template_list: {
        block_mapping: "template",
        action: "get_statistics_template_list"
    },
    retainer_template_list: {
        block_mapping: "template",
        action: "get_retainer_template_list"
    },

    object_get_setting_list: {
        block_mapping: "setting",
        action: "get_setting_list"
    },
    object_add_setting: {
        block_mapping: "setting",
        action: "add_setting"
    },
    object_update_setting: {
        block_mapping: "setting",
        action: "update_setting"
    },
    object_delete_setting: {
        block_mapping: "setting",
        action: "delete_setting"
    },
    app_get_object_list: {
        block_mapping: "object",
        action: "app_get_object_list"
    },
    get_region_list_by_customer: {
        block_mapping: "customer",
        action: "get_region_list"
    },
    get_region_list_by_region: {
        block_mapping: "customer",
        action: "get_customer_list"
    },
    get_control_auth: {
        block_mapping: "mixauth",
        action: "get_my_control_parameter",
    }
}