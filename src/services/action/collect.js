export default {
    collect_list: {block_mapping: "collect", action: "get_project_list"},
    collect_item: {block_mapping: "collect", action: "get_project_item"},
    collect_create: {block_mapping: "collect", action: "create_project"},
    collect_add: {block_mapping: "collect", action: "add_collect_value"},
    collect_update: {block_mapping: "collect", action: "update_project"},
    collect_delete: {block_mapping: "collect", action: "delete_project"},
    collect_start: {block_mapping: "collect", action: "start_project"},
    collect_stop: {block_mapping: "collect", action: "stop_project"},

    collect_value_list: {block_mapping: "collect", action: "get_collect_value_list"},
    collect_indass_list: {block_mapping: "indass", action: "get_all_indass_projects"},

    collect_value_item: {block_mapping: "collect", action: "get_project_item"},
    collect_value_create: {block_mapping: "mapping", action: "create_mapping"},
    collect_value_update: {block_mapping: "mapping", action: "update_mapping"},
    collect_value_delete: {block_mapping: "mapping", action: "delete_mapping"},
    collect_object_by_project: {block_mapping: "statistics", action: "get_object_for_statistics_task"},

    collect_template_list: {block_mapping: "template", action: "get_collect_template_list"},
    collect_template_item: {block_mapping: "template", action: "get_collect_template_item"},
    collect_template_create: {block_mapping: "template", action: "create_collect_template"},
    collect_template_update: {block_mapping: "template", action: "update_collect_template"},
    collect_template_delete: {block_mapping: "template", action: "delete_collect_template"},
    collect_list_by_template: {block_mapping: "template", action: "get_collect_list_by_template_id"},
    create_collect_by_template: {block_mapping: "template", action: "create_project_by_template"},
}
