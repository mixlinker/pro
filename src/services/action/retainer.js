export default {
    retainer_list: {
        block_mapping: "retainer",
        action: "get_retainer_list"
    },
    retainer_item: {
        block_mapping: "retainer",
        action: "get_retainer_item"
    },
    retainer_create: {
        block_mapping: "retainer",
        action: "create_retainer"
    },
    retainer_update: {
        block_mapping: "retainer",
        action: "update_retainer"
    },
    retainer_delete: {
        block_mapping: "retainer",
        action: "delete_retainer"
    },
    retainer_start: {
        block_mapping: "retainer",
        action: "start_retainer"
    },
    retainer_stop: {
        block_mapping: "retainer",
        action: "stop_retainer"
    },

    retainer_result_list: {
        action: "get_retainer_result_list_v2"
    },
    retainer_result_item: {
        block_mapping: "retainer",
        action: "get_retainer_result_item"
    },
    retainer_result_with_events: {
        block_mapping: "retainer",
        action: "get_retainer_with_events"
    },
    retainer_close: {
        block_mapping: "retainer",
        action: "close"
    },
    retainer_close_by_uid: {
        block_mapping: "retainer",
        action: "close_retainer"
    },
    retainer_record_list: {
        block_mapping: "retainer",
        action: "get_service_list"
    },
    retainer_record_create: {
        block_mapping: "retainer",
        action: "create_service"
    },

    retainer_template_list: {
        block_mapping: "template",
        action: "get_retainer_template_list"
    },
    retainer_template_item: {
        block_mapping: "template",
        action: "get_retainer_template_item"
    },
    retainer_template_create: {
        block_mapping: "template",
        action: "create_retainer_template"
    },
    retainer_template_update: {
        block_mapping: "template",
        action: "update_retainer_template"
    },
    retainer_template_delete: {
        block_mapping: "template",
        action: "delete_retainer_template"
    },
    create_retainer_by_template: {
        block_mapping: "template",
        action: "create_retainer_by_template"
    },
    get_retainer_list_by_template_id: {
        block_mapping: "template",
        action: "get_retainer_list_by_template_id"
    },
    //数据导出
    export_retainer_data: {
        block_mapping: "influxdbexport",
        action: "export_retainer_data"
    },
}